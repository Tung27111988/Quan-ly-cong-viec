# NOVASTARS LIGHTWEIGHT TCP WEB SERVER (PowerShell)
# Exposes port 3000 and saves database.json locally. No Node.js required!

$port = 3000
$localIPs = [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) | Where-Object { $_.AddressFamily -eq 'InterNetwork' }

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
$listener.Start()

Write-Host "===================================================="
Write-Host "NOVASTARS LOCAL SERVER STARTED SUCCESSFULLY!"
Write-Host "Open in browser on this machine: http://localhost:$port"
Write-Host "----------------------------------------------------"
Write-Host "Other machines on LAN can connect at:"
foreach ($ip in $localIPs) {
    Write-Host "--> http://$($ip.IPAddressToString):$port"
}
Write-Host "===================================================="

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        
        # Read request headers and initial body chunk
        $buffer = New-Object System.Byte[] 8192
        $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        if ($bytesRead -eq 0) {
            $client.Close()
            continue
        }
        
        $request = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
        
        # Split headers and body
        $doubleCRLF = $request.IndexOf("`r`n`r`n")
        if ($doubleCRLF -eq -1) {
            $client.Close()
            continue
        }
        
        $headersText = $request.Substring(0, $doubleCRLF)
        $body = $request.Substring($doubleCRLF + 4)
        
        # Parse Request Line (first line of headers)
        $lines = $headersText -split "`r`n"
        $reqParts = $lines[0] -split " "
        if ($reqParts.Length -lt 2) {
            $client.Close()
            continue
        }
        
        $method = $reqParts[0]
        $url = $reqParts[1]
        $pathname = ($url -split "\?")[0] # Strip query params
        
        # Handle CORS preflight
        if ($method -eq "OPTIONS") {
            $response = "HTTP/1.1 204 No Content`r`n" +
                        "Access-Control-Allow-Origin: *`r`n" +
                        "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
                        "Access-Control-Allow-Headers: Content-Type`r`n`r`n"
            $respBytes = [System.Text.Encoding]::UTF8.GetBytes($response)
            $stream.Write($respBytes, 0, $respBytes.Length)
            $client.Close()
            continue
        }
        
        # API Endpoint: /api/data
        if ($pathname -eq "/api/data") {
            $dbFile = Join-Path $PSScriptRoot "database.json"
            
            if ($method -eq "GET") {
                if (Test-Path $dbFile) {
                    $body = Get-Content -Raw -Path $dbFile -Encoding UTF8
                    $status = "200 OK"
                    $contentType = "application/json; charset=utf-8"
                } else {
                    $body = '{"error":"Database file not found"}'
                    $status = "404 Not Found"
                    $contentType = "application/json; charset=utf-8"
                }
            } elseif ($method -eq "POST") {
                # Find Content-Length to read the rest of the body if it's large
                $contentLength = 0
                if ($headersText -match 'Content-Length:\s*(\d+)') {
                    $contentLength = [int]$matches[1]
                }
                
                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
                while ($bodyBytes.Length -lt $contentLength) {
                    $moreBytes = New-Object System.Byte[] 8192
                    $readNow = $stream.Read($moreBytes, 0, $moreBytes.Length)
                    if ($readNow -eq 0) { break }
                    $body += [System.Text.Encoding]::UTF8.GetString($moreBytes, 0, $readNow)
                    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
                }
                
                # Write to database.json
                [System.IO.File]::WriteAllText($dbFile, $body, [System.Text.Encoding]::UTF8)
                
                $body = '{"success":true}'
                $status = "200 OK"
                $contentType = "application/json; charset=utf-8"
            }
            
            $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
            $response = "HTTP/1.1 $status`r`n" +
                        "Access-Control-Allow-Origin: *`r`n" +
                        "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
                        "Access-Control-Allow-Headers: Content-Type`r`n" +
                        "Content-Type: $contentType`r`n" +
                        "Content-Length: $($bodyBytes.Length)`r`n`r`n"
            $respHeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($response)
            $stream.Write($respHeaderBytes, 0, $respHeaderBytes.Length)
            $stream.Write($bodyBytes, 0, $bodyBytes.Length)
        } else {
            # Serve static assets
            $fileName = if ($pathname -eq "/") { "index.html" } else { $pathname.TrimStart('/') }
            $filePath = Join-Path $PSScriptRoot $fileName
            
            # Check Directory Traversal
            $resolvedPath = [System.IO.Path]::GetFullPath($filePath)
            $rootPath = [System.IO.Path]::GetFullPath($PSScriptRoot)
            
            if (-not $resolvedPath.StartsWith($rootPath)) {
                $body = "Forbidden"
                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
                $response = "HTTP/1.1 403 Forbidden`r`n" +
                            "Content-Length: $($bodyBytes.Length)`r`n`r`n"
                $respHeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($response)
                $stream.Write($respHeaderBytes, 0, $respHeaderBytes.Length)
                $stream.Write($bodyBytes, 0, $bodyBytes.Length)
            } elseif (Test-Path $resolvedPath) {
                $ext = [System.IO.Path]::GetExtension($resolvedPath)
                $contentType = "text/html"
                if ($ext -eq ".js") { $contentType = "text/javascript" }
                elseif ($ext -eq ".css") { $contentType = "text/css" }
                elseif ($ext -eq ".json") { $contentType = "application/json" }
                elseif ($ext -eq ".png") { $contentType = "image/png" }
                elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
                
                $fileBytes = [System.IO.File]::ReadAllBytes($resolvedPath)
                $response = "HTTP/1.1 200 OK`r`n" +
                            "Access-Control-Allow-Origin: *`r`n" +
                            "Content-Type: $contentType`r`n" +
                            "Content-Length: $($fileBytes.Length)`r`n`r`n"
                $respHeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($response)
                $stream.Write($respHeaderBytes, 0, $respHeaderBytes.Length)
                $stream.Write($fileBytes, 0, $fileBytes.Length)
            } else {
                $body = "File Not Found: $fileName"
                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
                $response = "HTTP/1.1 404 Not Found`r`n" +
                            "Content-Type: text/plain`r`n" +
                            "Content-Length: $($bodyBytes.Length)`r`n`r`n"
                $respHeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($response)
                $stream.Write($respHeaderBytes, 0, $respHeaderBytes.Length)
                $stream.Write($bodyBytes, 0, $bodyBytes.Length)
            }
        }
        $client.Close()
    } catch {
        Write-Error $_
        if ($client) { $client.Close() }
    }
}
