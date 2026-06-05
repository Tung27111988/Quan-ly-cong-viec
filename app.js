/* ==========================================================================
   NOVASTARS TASK MANAGEMENT SYSTEM - CORE LOGIC
   ========================================================================== */

console.log("NOVASTARS Task Manager loaded - Version 2.0.4");

// --- INITIAL SEED DATA ---
const INITIAL_TAGS = [
    { id: "tag-1", name: "Gấp rút", color: "#ef4444" },
    { id: "tag-2", name: "Quan trọng", color: "#f59e0b" },
    { id: "tag-3", name: "Lên kế hoạch", color: "#3b82f6" },
    { id: "tag-4", name: "Đang soạn thảo", color: "#10b981" }
];

const INITIAL_PROJECTS = [
    { id: "proj-1", name: "Xây dựng Giáo án Scratch Tiểu học", desc: "Soạn thảo tài liệu giảng dạy, bài tập lập trình Scratch cho học sinh lớp 3, 4, 5 theo chuẩn STEAM.", status: "active", department: "Đào tạo", tagIds: ["tag-4"] },
    { id: "proj-2", name: "Phát triển App học từ vựng Tiếng Anh", desc: "Ứng dụng di động giúp học sinh NOVASTARS ghi nhớ từ vựng qua phương pháp lặp khoảng cách.", status: "active", department: "Công nghệ", tagIds: ["tag-3"] },
    { id: "proj-3", name: "Tập huấn Giáo viên hè 2026", desc: "Chương trình đào tạo kỹ năng sư phạm và công nghệ dạy học mới cho toàn bộ giáo viên hệ thống.", status: "completed", department: "Đào tạo", tagIds: ["tag-2"] }
];

const INITIAL_MEMBERS = [
    { id: "mem-1", name: "Phan Minh Trí", role: "Trưởng phòng Đào tạo", color: "#4f46e5", email: "tri.pm@novastars.edu.vn", phone: "0987654321" },
    { id: "mem-2", name: "Lê Thị Thu Hà", role: "Chuyên viên Nội dung", color: "#10b981", email: "ha.ltt@novastars.edu.vn", phone: "0912345678" },
    { id: "mem-3", name: "Trần Hoàng Nam", role: "Lập trình viên Fullstack", color: "#06b6d4", email: "nam.th@novastars.edu.vn", phone: "0909998888" }
];

const INITIAL_TASKS = [
    { 
        id: "task-1", 
        title: "Soạn bài giảng Scratch bài 1-5", 
        projectId: "proj-1", 
        assigneeId: "mem-2", 
        dueDate: "2026-06-15", 
        isUrgent: true, 
        status: "working", 
        desc: "Yêu cầu: Nội dung tập trung vào các câu lệnh di chuyển cơ bản và vẽ hình. Thiết kế hình ảnh minh họa sinh động, phù hợp lứa tuổi tiểu học.",
        completedFile: null,
        tagIds: ["tag-1", "tag-4"]
    },
    { 
        id: "task-2", 
        title: "Thiết kế slide tập huấn phương pháp STEAM", 
        projectId: "proj-1", 
        assigneeId: "mem-1", 
        dueDate: "2026-06-08", 
        isUrgent: true, 
        status: "new", 
        desc: "Thiết kế slide giới thiệu tổng quan về xu hướng giáo dục STEAM toàn cầu và cách ứng dụng vào hệ thống giáo án NOVASTARS.",
        completedFile: null,
        tagIds: ["tag-1", "tag-2"]
    },
    { 
        id: "task-3", 
        title: "Lập trình thuật toán Spaced Repetition", 
        projectId: "proj-2", 
        assigneeId: "mem-3", 
        dueDate: "2026-06-25", 
        isUrgent: false, 
        status: "new", 
        desc: "Nghiên cứu và viết thuật toán SuperMemo-2 phục vụ việc tính toán khoảng cách ôn tập từ vựng cho học sinh.",
        completedFile: null,
        tagIds: ["tag-3"]
    },
    { 
        id: "task-4", 
        title: "Kiểm thử chương trình học Scratch khối 3", 
        projectId: "proj-1", 
        assigneeId: "mem-2", 
        dueDate: "2026-06-03", 
        isUrgent: true, 
        status: "completed", 
        desc: "Đã hoàn thành chạy thử nghiệm trên lớp mẫu. Kiểm tra lại toàn bộ lỗi chính tả và các lỗi logic lập trình.",
        completedFile: {
            name: "Bao_cao_kiem_thu_Scratch_khoi_3.txt",
            size: "12.5 KB",
            type: "text/plain",
            content: "data:text/plain;base64,QkFPIENBTyBLSUVNIFRIVSBHSUFPIFRSSU5IIFNDUkFUQ0ggS0hPSSAzDQotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQ0KMS4gVGjhu7FjIG5naGnhu4dtIGzhu5twIDNBMjogMTAwJSBo4buNYyBzaW5oIGhvw6BuIHRow6BuaCBiYWkgdOG6rXAgdsG6vSBoxrDhu5tuZyBk4bqrbi4NCjIuIEzhu5dpIGNow61uaCB04bqjOiBCw6BpIDIgKGTDsm5nIDUpLCBCw6BpIDQgKGTDsm5nIDEyKSAtPiDEkMOjIHPhu61hLg0KMy4gxJDDoW5oIGdpw6E6IEdpw6FvIHRyw6xuaCBwaMO5IGjhu6NwLCBk4buFEiBoaeG7g3Uu"
        },
        tagIds: ["tag-2"]
    },
    { 
        id: "task-5", 
        title: "Tạo liên kết phòng họp và tài liệu tập huấn", 
        projectId: "proj-3", 
        assigneeId: "mem-3", 
        dueDate: "2026-05-30", 
        isUrgent: false, 
        status: "completed", 
        desc: "Đã tạo link Zoom, thiết lập mật khẩu phòng họp, gửi thư mời kèm tài liệu PDF cho toàn bộ 50 giáo viên đăng ký.",
        completedFile: null,
        tagIds: []
    }
];

// --- INITIAL SEED ACCOUNTS ---
const INITIAL_ACCOUNTS = [
    { id: "acc-1", username: "admin", password: "123456", fullName: "Quản trị viên hệ thống", role: "admin" },
    { id: "acc-2", username: "tri.pm", password: "123", fullName: "Phan Minh Trí", role: "admin" },
    { id: "acc-3", username: "ha.ltt", password: "123", fullName: "Lê Thị Thu Hà", role: "employee" },
    { id: "acc-4", username: "nam.th", password: "123", fullName: "Trần Hoàng Nam", role: "employee" }
];

// --- CLOUD SYNC CONFIGURATION ---
const CLOUD_BUCKET = "E8vHacB3rUMdEr7RcYHuNT";
const IS_LOCAL_SERVER = window.location.protocol !== 'file:' && 
    !window.location.hostname.toLowerCase().endsWith('vercel.app') &&
    !window.location.hostname.toLowerCase().endsWith('github.io');
const CLOUD_URL = IS_LOCAL_SERVER ? '/api/data' : `https://kvdb.io/${CLOUD_BUCKET}/novastars_data`;

// Keep track of sync state
let syncState = {
    status: "idle", // "idle" | "syncing" | "synced" | "error"
    lastSyncTime: 0,
    saveTimeout: null
};

// --- APP STATE ---
let state = {
    projects: [],
    members: [],
    tasks: [],
    tags: [],
    accounts: [],
    currentUser: null,
    currentRole: "admin", // "admin" hoặc "mem-X" (Tương thích ngược)
    themeMode: "auto",   // "light", "dark", "auto"
    activePanel: "dashboard",
    projectLayout: "grid", // "grid" | "table"
    projectColumnsVisibility: { dept: true, status: true, progress: true, tags: true },
    lastUpdated: 0
};

// --- DOM ELEMENTS ---
const elements = {
    // Layout & Core
    sidebar: document.getElementById("sidebar"),
    menuToggle: document.getElementById("menuToggle"),
    menuItems: document.querySelectorAll(".menu-item"),
    pageTitle: document.getElementById("pageTitle"),
    roleSwitcher: document.getElementById("roleSwitcher"),
    currentUserName: document.getElementById("currentUserName"),
    currentUserRole: document.getElementById("currentUserRole"),
    currentUserAvatar: document.getElementById("currentUserAvatar"),
    btnLogout: document.getElementById("btnLogout"),
    
    // Theme buttons
    themeAuto: document.getElementById("themeAuto"),
    themeLight: document.getElementById("themeLight"),
    themeDark: document.getElementById("themeDark"),
    
    // Panels
    panels: {
        dashboard: document.getElementById("panel-dashboard"),
        projects: document.getElementById("panel-projects"),
        members: document.getElementById("panel-members"),
        assignment: document.getElementById("panel-assignment"),
        tasks: document.getElementById("panel-tasks"),
        tags: document.getElementById("panel-tags"),
        accounts: document.getElementById("panel-accounts")
    },

    // Backup Data Buttons
    btnExportData: document.getElementById("btnExportData"),
    btnImportData: document.getElementById("btnImportData"),
    importFile: document.getElementById("importFile"),
    
    // Stats on dashboard
    statUrgentTasks: document.getElementById("statUrgentTasks"),
    statPendingTasks: document.getElementById("statPendingTasks"),
    statCompletedTasks: document.getElementById("statCompletedTasks"),
    statTotalTasks: document.getElementById("statTotalTasks"),
    urgentCountBadge: document.getElementById("urgentCountBadge"),
    dashboardUrgentTasksList: document.getElementById("dashboardUrgentTasksList"),
    dashboardProjectList: document.getElementById("dashboardProjectList"),
    
    // Projects Panel
    projectSearch: document.getElementById("projectSearch"),
    btnNewProject: document.getElementById("btnNewProject"),
    projectList: document.getElementById("projectList"),
    filterProjectDept: document.getElementById("filterProjectDept"),
    viewProjGrid: document.getElementById("viewProjGrid"),
    viewProjTable: document.getElementById("viewProjTable"),
    viewOptionsDropdownWrapper: document.getElementById("viewOptionsDropdownWrapper"),
    projectTableContainer: document.getElementById("projectTableContainer"),
    projectTableBody: document.getElementById("projectTableBody"),
    
    // Members Panel
    memberSearch: document.getElementById("memberSearch"),
    btnNewMember: document.getElementById("btnNewMember"),
    memberList: document.getElementById("memberList"),

    // Assignment Panel
    assignmentSearch: document.getElementById("assignmentSearch"),
    btnAssignmentNewTask: document.getElementById("btnAssignmentNewTask"),
    assignmentBoard: document.getElementById("assignmentBoard"),
    
    // Tasks Panel
    taskSearch: document.getElementById("taskSearch"),
    filterProject: document.getElementById("filterProject"),
    filterMember: document.getElementById("filterMember"),
    filterStatus: document.getElementById("filterStatus"),
    filterUrgent: document.getElementById("filterUrgent"),
    btnNewTask: document.getElementById("btnNewTask"),
    taskList: document.getElementById("taskList"),
    
    // Modals
    modals: {
        project: document.getElementById("modalProject"),
        member: document.getElementById("modalMember"),
        task: document.getElementById("modalTask"),
        taskProgress: document.getElementById("modalTaskProgress"),
        tag: document.getElementById("modalTag"),
        projectDetail: document.getElementById("modalProjectDetail"),
        account: document.getElementById("modalAccount")
    },
    
    // Project Form
    projectForm: document.getElementById("projectForm"),
    projectId: document.getElementById("projectId"),
    projectName: document.getElementById("projectName"),
    projectDesc: document.getElementById("projectDesc"),
    projectStatus: document.getElementById("projectStatus"),
    projectModalTitle: document.getElementById("projectModalTitle"),
    projectDept: document.getElementById("projectDept"),
    projectTagSelector: document.getElementById("projectTagSelector"),
    
    // Member Form
    memberForm: document.getElementById("memberForm"),
    memberId: document.getElementById("memberId"),
    memberName: document.getElementById("memberName"),
    memberRole: document.getElementById("memberRole"),
    memberEmail: document.getElementById("memberEmail"),
    memberPhone: document.getElementById("memberPhone"),
    memberColor: document.getElementById("memberColor"),
    memberModalTitle: document.getElementById("memberModalTitle"),
    
    // Task Form
    taskForm: document.getElementById("taskForm"),
    taskId: document.getElementById("taskId"),
    taskTitle: document.getElementById("taskTitle"),
    taskProject: document.getElementById("taskProject"),
    taskAssignee: document.getElementById("taskAssignee"),
    taskDueDate: document.getElementById("taskDueDate"),
    taskIsUrgent: document.getElementById("taskIsUrgent"),
    taskDesc: document.getElementById("taskDesc"),
    taskModalTitle: document.getElementById("taskModalTitle"),
    taskTagSelector: document.getElementById("taskTagSelector"),

    // Task Detail & Progress Modal
    detailUrgentBadge: document.getElementById("detailUrgentBadge"),
    detailTitle: document.getElementById("detailTitle"),
    detailProject: document.getElementById("detailProject").querySelector("span"),
    detailAssigneeAvatar: document.getElementById("detailAssigneeAvatar"),
    detailAssigneeName: document.getElementById("detailAssigneeName"),
    detailDueDate: document.getElementById("detailDueDate"),
    detailDesc: document.getElementById("detailDesc"),
    detailStatusBadge: document.getElementById("detailStatusBadge"),
    
    // Employee Action Panel
    employeeActionArea: document.getElementById("employeeActionArea"),
    employeeStatusSelect: document.getElementById("employeeStatusSelect"),
    fileUploadContainer: document.getElementById("fileUploadContainer"),
    fileDropzone: document.getElementById("fileDropzone"),
    taskFileAttachment: document.getElementById("taskFileAttachment"),
    attachedFileInfo: document.getElementById("attachedFileInfo"),
    attachedFileName: document.getElementById("attachedFileName"),
    attachedFileSize: document.getElementById("attachedFileSize"),
    btnRemoveFile: document.getElementById("btnRemoveFile"),
    btnSaveProgress: document.getElementById("btnSaveProgress"),
    
    // Admin Action Panel
    adminActionArea: document.getElementById("adminActionArea"),
    submittedFileBox: document.getElementById("submittedFileBox"),
    submittedFileName: document.getElementById("submittedFileName"),
    submittedFileSize: document.getElementById("submittedFileSize"),
    btnDownloadFile: document.getElementById("btnDownloadFile"),
    adminReviewActions: document.getElementById("adminReviewActions"),
    btnApproveTask: document.getElementById("btnApproveTask"),
    btnRejectTask: document.getElementById("btnRejectTask"),
    adminStandardStatus: document.getElementById("adminStandardStatus"),
    adminStatusSelect: document.getElementById("adminStatusSelect"),
    btnAdminSaveStatus: document.getElementById("btnAdminSaveStatus"),

    // Login Overlay & Forms
    loginOverlay: document.getElementById("loginOverlay"),
    loginForm: document.getElementById("loginForm"),
    loginUsername: document.getElementById("loginUsername"),
    loginPassword: document.getElementById("loginPassword"),

    // Account Panel & Form
    accountSearch: document.getElementById("accountSearch"),
    btnNewAccount: document.getElementById("btnNewAccount"),
    accountList: document.getElementById("accountList"),
    accountForm: document.getElementById("accountForm"),
    accountId: document.getElementById("accountId"),
    accountUsername: document.getElementById("accountUsername"),
    accountPassword: document.getElementById("accountPassword"),
    accountFullName: document.getElementById("accountFullName"),
    accountRole: document.getElementById("accountRole"),
    accountModalTitle: document.getElementById("accountModalTitle"),
    // Tag Management Elements
    tagSearch: document.getElementById("tagSearch"),
    btnNewTag: document.getElementById("btnNewTag"),
    tagList: document.getElementById("tagList"),
    tagForm: document.getElementById("tagForm"),
    filterProjDetailTaskStatus: document.getElementById("filterProjDetailTaskStatus"),

    syncStatusIndicator: document.getElementById("syncStatusIndicator"),
    syncIcon: document.getElementById("syncIcon"),

    toastContainer: document.getElementById("toastContainer")
};

// --- CORE FUNCTIONS: LOCAL STORAGE & DATA LOADING ---
function initApp() {
    // 1. Load data from LocalStorage or seed if not present with robust try-catch
    try {
        state.projects = JSON.parse(localStorage.getItem("novastars_projects"));
        if (!Array.isArray(state.projects)) state.projects = INITIAL_PROJECTS;
    } catch (e) {
        state.projects = INITIAL_PROJECTS;
    }

    try {
        state.members = JSON.parse(localStorage.getItem("novastars_members"));
        if (!Array.isArray(state.members)) state.members = INITIAL_MEMBERS;
    } catch (e) {
        state.members = INITIAL_MEMBERS;
    }

    try {
        state.tasks = JSON.parse(localStorage.getItem("novastars_tasks"));
        if (!Array.isArray(state.tasks)) state.tasks = INITIAL_TASKS;
    } catch (e) {
        state.tasks = INITIAL_TASKS;
    }

    try {
        state.tags = JSON.parse(localStorage.getItem("novastars_tags"));
        if (!Array.isArray(state.tags)) state.tags = INITIAL_TAGS;
    } catch (e) {
        state.tags = INITIAL_TAGS;
    }

    try {
        state.accounts = JSON.parse(localStorage.getItem("novastars_accounts"));
        if (!Array.isArray(state.accounts)) state.accounts = INITIAL_ACCOUNTS;
    } catch (e) {
        state.accounts = INITIAL_ACCOUNTS;
    }
    
    // Force reset admin's default password to '123456' to ensure it is always accessible
    const adminAcc = state.accounts.find(acc => acc && acc.username && acc.username.toLowerCase() === "admin");
    if (adminAcc) {
        adminAcc.password = "123456";
    } else {
        state.accounts.push({ id: "acc-1", username: "admin", password: "123456", fullName: "Quản trị viên hệ thống", role: "admin" });
    }
    
    try {
        const storedUser = localStorage.getItem("novastars_current_user");
        if (storedUser && storedUser !== "undefined") {
            const parsed = JSON.parse(storedUser);
            if (parsed && typeof parsed === "object" && parsed.username && parsed.role) {
                state.currentUser = parsed;
                if (state.currentUser.username.toLowerCase() === "admin") {
                    state.currentUser.password = "123456";
                }
            } else {
                state.currentUser = null;
            }
        } else {
            state.currentUser = null;
        }
    } catch (e) {
        state.currentUser = null;
    }

    state.themeMode = localStorage.getItem("novastars_theme_mode") || "auto";
    state.projectLayout = localStorage.getItem("novastars_project_layout") || "grid";
    state.lastUpdated = parseInt(localStorage.getItem("novastars_last_updated")) || 0;
    
    try {
        state.projectColumnsVisibility = JSON.parse(localStorage.getItem("novastars_project_cols_visibility"));
        if (!state.projectColumnsVisibility || typeof state.projectColumnsVisibility !== "object") {
            state.projectColumnsVisibility = { dept: true, status: true, progress: true, tags: true };
        }
    } catch (e) {
        state.projectColumnsVisibility = { dept: true, status: true, progress: true, tags: true };
    }
    
    // Check login state
    if (!state.currentUser) {
        elements.loginOverlay.style.display = "flex";
        state.currentRole = "guest";
    } else {
        elements.loginOverlay.style.display = "none";
        syncUserRoleCompat();
    }
    
    saveToLocalStorageOnly();

    // 2. Set up Theme Mode
    applyTheme();
    updateThemeSelectorUI();
    
    // 3. Set up Role Switcher dropdown options
    populateRoleSwitcher();
    elements.roleSwitcher.value = state.currentRole;
    updateCurrentUserProfile();
    
    // 4. Register Event Listeners
    setupEventHandlers();
    
    // Show warning banner if running on file:/// protocol (sandbox restricts fetches)
    if (window.location.protocol === 'file:') {
        const warningBanner = document.createElement("div");
        warningBanner.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
        warningBanner.style.color = "var(--color-danger)";
        warningBanner.style.border = "1px solid rgba(239, 68, 68, 0.2)";
        warningBanner.style.padding = "10px 14px";
        warningBanner.style.borderRadius = "var(--radius-md)";
        warningBanner.style.marginBottom = "16px";
        warningBanner.style.fontSize = "12px";
        warningBanner.style.fontWeight = "600";
        warningBanner.style.textAlign = "left";
        warningBanner.style.lineHeight = "1.5";
        warningBanner.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <strong>Lưu ý quan trọng:</strong> Bạn đang mở file trực tiếp (file:///). Trình duyệt sẽ chặn kết nối đồng bộ. Vui lòng truy cập qua đường dẫn Vercel của bạn (ví dụ: https://quanlycongviec-three.vercel.app) hoặc dùng máy chủ nội bộ: <a href="http://localhost:3000" style="color:var(--color-primary); text-decoration:underline; margin-left:2px;">http://localhost:3000</a>`;
        
        if (elements.loginOverlay) {
            const loginCard = elements.loginOverlay.querySelector(".login-card");
            if (loginCard) {
                loginCard.insertBefore(warningBanner, loginCard.firstChild);
            }
        }
        
        setTimeout(() => {
            showToast("⚠️ Trình duyệt chặn đồng bộ khi mở file trực tiếp. Hãy dùng http://localhost:3000", "danger");
        }, 1500);
    }
    
    // 5. Initial Render
    if (state.currentUser) {
        renderAll();
    }
    
    // 6. Setup Theme clock check (checks every minute)
    setInterval(() => {
        if (state.themeMode === "auto") {
            applyTheme();
        }
    }, 60000);

    // 7. Setup Background Cloud Sync (every 15 seconds)
    setInterval(() => {
        syncFromCloud();
    }, 15000);
    
    // Trigger initial sync from cloud immediately
    syncFromCloud();
}

function syncUserRoleCompat() {
    if (!state.currentUser) return;
    if (state.currentUser.role === "admin") {
        state.currentRole = "admin";
    } else {
        const member = state.members.find(m => m.name.toLowerCase() === state.currentUser.fullName.toLowerCase());
        state.currentRole = member ? member.id : "guest";
    }
}

// --- CLOUD SYNC LOGIC ---

function updateSyncUI(status) {
    if (!elements.syncStatusIndicator || !elements.syncIcon) return;
    
    syncState.status = status;
    elements.syncStatusIndicator.className = "sync-status-indicator";
    elements.syncIcon.className = "fa-solid";
    
    const targetName = IS_LOCAL_SERVER ? "máy chủ nội bộ" : "đám mây";
    
    if (status === "syncing") {
        elements.syncStatusIndicator.classList.add("syncing");
        elements.syncIcon.classList.add("fa-cloud-arrow-up");
        elements.syncStatusIndicator.title = `Đang đồng bộ dữ liệu với ${targetName}...`;
    } else if (status === "synced") {
        elements.syncStatusIndicator.classList.add("synced");
        elements.syncIcon.classList.add("fa-cloud");
        const timeStr = new Date().toLocaleTimeString();
        elements.syncStatusIndicator.title = `Đồng bộ thành công với ${targetName} lúc ${timeStr}. Click để đồng bộ lại.`;
    } else if (status === "error") {
        elements.syncStatusIndicator.classList.add("sync-error");
        elements.syncIcon.classList.add("fa-cloud-slash");
        elements.syncStatusIndicator.title = `Lỗi đồng bộ với ${targetName}! Click để thử lại.`;
    } else {
        elements.syncIcon.classList.add("fa-cloud");
        elements.syncStatusIndicator.title = "Chưa đồng bộ. Click để đồng bộ ngay.";
    }
}

async function saveToCloud() {
    try {
        updateSyncUI("syncing");
        const payload = {
            projects: state.projects,
            members: state.members,
            tasks: state.tasks,
            tags: state.tags,
            accounts: state.accounts,
            lastUpdated: state.lastUpdated || Date.now()
        };
        
        const response = await fetch(CLOUD_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            updateSyncUI("synced");
            syncState.lastSyncTime = Date.now();
        } else {
            console.error("Sync save failed:", response.statusText);
            updateSyncUI("error");
        }
    } catch (err) {
        console.error("Sync save error:", err);
        updateSyncUI("error");
    }
}

async function syncFromCloud(force = false) {
    try {
        updateSyncUI("syncing");
        const response = await fetch(CLOUD_URL);
        if (response.status === 404) {
            console.log("No data on server yet, seeding server with local data...");
            await saveToCloud();
            return;
        }
        
        if (!response.ok) {
            updateSyncUI("error");
            return;
        }
        
        const text = await response.text();
        if (!text) {
            updateSyncUI("synced");
            return;
        }
        
        const cloudData = JSON.parse(text);
        if (!cloudData || typeof cloudData !== "object") {
            updateSyncUI("error");
            return;
        }
        
        const cloudLastUpdated = cloudData.lastUpdated || 0;
        const localLastUpdated = state.lastUpdated || 0;
        
        if (cloudLastUpdated > localLastUpdated || force) {
            console.log("Server data is newer or sync is forced. Updating state...", { cloudLastUpdated, localLastUpdated });
            
            if (Array.isArray(cloudData.projects)) state.projects = cloudData.projects;
            if (Array.isArray(cloudData.members)) state.members = cloudData.members;
            if (Array.isArray(cloudData.tasks)) state.tasks = cloudData.tasks;
            if (Array.isArray(cloudData.tags)) state.tags = cloudData.tags;
            if (Array.isArray(cloudData.accounts)) state.accounts = cloudData.accounts;
            if (cloudLastUpdated) state.lastUpdated = cloudLastUpdated;
            
            saveToLocalStorageOnly();
            
            // Re-render and populate UI
            populateRoleSwitcher();
            elements.roleSwitcher.value = state.currentRole;
            updateCurrentUserProfile();
            
            if (state.currentUser) {
                const updatedUser = state.accounts.find(acc => acc.id === state.currentUser.id);
                if (updatedUser) {
                    state.currentUser = updatedUser;
                } else if (state.currentUser.username.toLowerCase() !== "admin") {
                    handleLogout();
                }
            }
            
            if (state.currentUser) {
                renderAll();
                renderAccounts();
            }
        }
        
        updateSyncUI("synced");
        syncState.lastSyncTime = Date.now();
    } catch (err) {
        console.error("Server sync error:", err);
        updateSyncUI("error");
    }
}

function triggerCloudSave() {
    updateSyncUI("syncing");
    if (syncState.saveTimeout) {
        clearTimeout(syncState.saveTimeout);
    }
    syncState.saveTimeout = setTimeout(async () => {
        await saveToCloud();
    }, 1500);
}

function saveToLocalStorageOnly() {
    localStorage.setItem("novastars_projects", JSON.stringify(state.projects));
    localStorage.setItem("novastars_members", JSON.stringify(state.members));
    localStorage.setItem("novastars_tasks", JSON.stringify(state.tasks));
    localStorage.setItem("novastars_tags", JSON.stringify(state.tags));
    localStorage.setItem("novastars_accounts", JSON.stringify(state.accounts));
    localStorage.setItem("novastars_current_user", JSON.stringify(state.currentUser));
    localStorage.setItem("novastars_theme_mode", state.themeMode);
    localStorage.setItem("novastars_current_role", state.currentRole);
    localStorage.setItem("novastars_project_layout", state.projectLayout);
    localStorage.setItem("novastars_project_cols_visibility", JSON.stringify(state.projectColumnsVisibility));
    localStorage.setItem("novastars_last_updated", state.lastUpdated || 0);
}

function saveToLocalStorage() {
    state.lastUpdated = Date.now();
    saveToLocalStorageOnly();
    triggerCloudSave();
}

// --- CORE FUNCTIONS: TOAST NOTIFICATIONS ---
function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let iconClass = "fa-info-circle";
    if (type === "success") iconClass = "fa-check-circle";
    if (type === "danger") iconClass = "fa-exclamation-circle";
    if (type === "warning") iconClass = "fa-triangle-exclamation";
    
    toast.innerHTML = `
        <i class="fa-solid ${iconClass} toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    // Auto remove toast
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --- THEME MANAGEMENT ---
function applyTheme() {
    let activeTheme = "light";
    
    if (state.themeMode === "auto") {
        const hour = new Date().getHours();
        // Dark mode from 18h (6 PM) to 6h (6 AM)
        if (hour >= 18 || hour < 6) {
            activeTheme = "dark";
        }
    } else {
        activeTheme = state.themeMode;
    }
    
    document.documentElement.setAttribute("data-theme", activeTheme);
}

function updateThemeSelectorUI() {
    elements.themeAuto.classList.toggle("active", state.themeMode === "auto");
    elements.themeLight.classList.toggle("active", state.themeMode === "light");
    elements.themeDark.classList.toggle("active", state.themeMode === "dark");
}

// --- USER ROLE SWITCHER ---
function populateRoleSwitcher() {
    // Clear dynamic options
    const adminOpt = '<option value="admin">Quản trị viên (Admin)</option>';
    let optionsHtml = adminOpt;
    
    state.members.forEach(member => {
        optionsHtml += `<option value="${member.id}">Nhân viên: ${member.name}</option>`;
    });
    
    elements.roleSwitcher.innerHTML = optionsHtml;
}

function updateCurrentUserProfile() {
    if (!state.currentUser) return;
    
    // Render logged in user details
    elements.currentUserName.textContent = state.currentUser.fullName;
    elements.currentUserRole.textContent = state.currentUser.role === "admin" ? "Quản trị viên" : "Nhân viên";
    elements.currentUserAvatar.textContent = getInitials(state.currentUser.fullName);
    
    const member = state.members.find(m => m.name.toLowerCase() === state.currentUser.fullName.toLowerCase());
    elements.currentUserAvatar.style.backgroundColor = member ? member.color : "var(--color-primary)";
    
    const isAdmin = state.currentUser.role === "admin";
    
    // Toggle admin-only buttons visibility
    document.querySelectorAll(".btn-admin-only").forEach(el => {
        el.style.display = isAdmin ? "inline-flex" : "none";
    });
    
    // Toggle admin-only menu item in sidebar visibility
    const menuAccounts = document.getElementById("menu-accounts");
    if (menuAccounts) {
        menuAccounts.style.display = isAdmin ? "inline-flex" : "none";
    }
    const menuTags = document.querySelector('.menu-item[data-target="tags"]');
    if (menuTags) {
        menuTags.style.display = isAdmin ? "inline-flex" : "none";
    }
    
    // Re-render views to reflect actions permissions
    renderProjects();
    renderMembers();
    renderTasks();
}

function getInitials(name) {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
        return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

// --- TASK SORTING ALGORITHM ---
// Sắp xếp:
// 1. Việc gấp chưa hoàn thành (IsUrgent: true, status !== completed), ngày hạn gần nhất trước
// 2. Việc thường chưa hoàn thành (IsUrgent: false, status !== completed), ngày hạn gần nhất trước
// 3. Việc đã hoàn thành (status === completed) xếp cuối, ngày hạn xa hơn (đại diện cho đã hoàn thành gần đây) xếp lên
function sortTasks(tasksList) {
    return [...tasksList].sort((a, b) => {
        const aCompleted = a.status === "completed";
        const bCompleted = b.status === "completed";
        
        // 1. Một bên hoàn thành và một bên chưa
        if (!aCompleted && bCompleted) return -1;
        if (aCompleted && !bCompleted) return 1;
        
        // 2. Cả hai chưa hoàn thành
        if (!aCompleted && !bCompleted) {
            // Sắp xếp theo độ gấp
            if (a.isUrgent && !b.isUrgent) return -1;
            if (!a.isUrgent && b.isUrgent) return 1;
            
            // Nếu cùng độ gấp, xếp theo ngày hạn (Deadline gần nhất lên trước)
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        
        // 3. Cả hai đã hoàn thành
        // Hiển thị việc hoàn thành gần nhất lên trước dựa trên hạn ngày hoàn thành
        return new Date(b.dueDate) - new Date(a.dueDate);
    });
}

// --- RENDERING: ALL VIEWS ---
function renderAll() {
    renderDashboard();
    renderProjects();
    renderMembers();
    renderAssignmentBoard();
    renderTasks();
    renderTags();
    populateDropdowns();
}

// 1. Render Dashboard
function renderDashboard() {
    // Stats calculation
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.status === "completed").length;
    const workingTasks = state.tasks.filter(t => t.status === "working").length;
    const reviewingTasks = state.tasks.filter(t => t.status === "reviewing").length;
    const urgentTasks = state.tasks.filter(t => t.isUrgent && t.status !== "completed").length;
    
    elements.statUrgentTasks.textContent = urgentTasks;
    elements.statPendingTasks.textContent = `${workingTasks} / ${reviewingTasks}`;
    elements.statCompletedTasks.textContent = completedTasks;
    elements.statTotalTasks.textContent = totalTasks;

    // Dashboard Tasks Panel
    const isAdmin = state.currentRole === "admin";
    let dashboardTasks = [];
    if (isAdmin) {
        dashboardTasks = state.tasks.filter(t => t.isUrgent && t.status !== "completed");
        elements.urgentCountBadge.textContent = `${dashboardTasks.length} công việc gấp`;
    } else {
        dashboardTasks = state.tasks.filter(t => t.assigneeId === state.currentRole && t.status !== "completed");
        elements.urgentCountBadge.textContent = `${dashboardTasks.length} việc của bạn`;
    }
    
    const sortedDashTasks = sortTasks(dashboardTasks);
    
    if (sortedDashTasks.length === 0) {
        elements.dashboardUrgentTasksList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-circle-check text-success"></i>
                <p>Tuyệt vời! Không có công việc nào cần xử lý.</p>
            </div>
        `;
    } else {
        let listHtml = "";
        sortedDashTasks.forEach(task => {
            const project = state.projects.find(p => p.id === task.projectId);
            const member = state.members.find(m => m.id === task.assigneeId);
            
            // Check if task is overdue
            const isOverdue = new Date(task.dueDate) < new Date().setHours(0,0,0,0);
            const dateStr = formatDate(task.dueDate);
            const dateClass = isOverdue ? "meta-date overdue" : "meta-date";
            
            // Status label
            let statusBadge = "";
            if (task.status === "new") statusBadge = '<span class="badge badge-info">Mới giao</span>';
            if (task.status === "working") statusBadge = '<span class="badge badge-warning">Đang làm</span>';
            if (task.status === "reviewing") statusBadge = '<span class="badge badge-danger">Chờ duyệt</span>';
            
            listHtml += `
                <div class="urgent-item-card" onclick="openTaskProgressModal('${task.id}')">
                    <div class="urgent-item-left">
                        <span class="urgent-item-title">${task.title}</span>
                        <div class="urgent-item-meta">
                            <span class="meta-project"><i class="fa-solid fa-folder"></i> ${project ? project.name : "N/A"}</span>
                            <span class="${dateClass}">
                                <i class="fa-regular fa-calendar-days"></i> Hạn: ${dateStr} ${isOverdue ? "(Trễ hạn)" : ""}
                            </span>
                            <span><i class="fa-solid fa-user"></i> ${member ? member.name : "Không rõ"}</span>
                        </div>
                    </div>
                    <div class="urgent-item-right">
                        ${statusBadge}
                        <i class="fa-solid fa-chevron-right text-muted" style="font-size:12px;"></i>
                    </div>
                </div>
            `;
        });
        elements.dashboardUrgentTasksList.innerHTML = listHtml;
    }

    // Projects progress on Dashboard
    if (state.projects.length === 0) {
        elements.dashboardProjectList.innerHTML = '<p class="text-muted text-center py-3">Không có dự án nào.</p>';
    } else {
        let progressHtml = "";
        state.projects.forEach(project => {
            const projTasks = state.tasks.filter(t => t.projectId === project.id);
            const total = projTasks.length;
            const completed = projTasks.filter(t => t.status === "completed").length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            
            progressHtml += `
                <div class="project-progress-item">
                    <div class="project-progress-info">
                        <span class="project-progress-name" title="${project.name}">${project.name}</span>
                        <span class="project-progress-percent">${percent}% (${completed}/${total})</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${percent}%;"></div>
                    </div>
                </div>
            `;
        });
        elements.dashboardProjectList.innerHTML = progressHtml;
    }
}

// 2. Render Projects View
function renderProjects() {
    const searchVal = elements.projectSearch.value.toLowerCase().trim();
    const deptVal = elements.filterProjectDept.value;
    
    const filteredProjects = state.projects.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchVal) || p.desc.toLowerCase().includes(searchVal);
        const matchDept = deptVal === "all" || p.department === deptVal;
        return matchSearch && matchDept;
    });
    
    const isAdmin = state.currentRole === "admin";
    
    // Toggle active classes on view buttons & show/hide wrapper
    const isGrid = state.projectLayout === "grid";
    elements.viewProjGrid.classList.toggle("active", isGrid);
    elements.viewProjTable.classList.toggle("active", !isGrid);
    elements.viewOptionsDropdownWrapper.style.display = isGrid ? "none" : "inline-block";
    
    if (isGrid) {
        elements.projectList.style.display = "grid";
        elements.projectTableContainer.style.display = "none";
        
        if (filteredProjects.length === 0) {
            elements.projectList.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fa-solid fa-folder-open text-muted"></i>
                    <p>Không tìm thấy dự án nào.</p>
                </div>
            `;
            return;
        }
        
        let cardsHtml = "";
        filteredProjects.forEach(proj => {
            const projTasks = state.tasks.filter(t => t.projectId === proj.id);
            const total = projTasks.length;
            const completed = projTasks.filter(t => t.status === "completed").length;
            const activeTasks = total - completed;
            
            let statusBadge = "";
            if (proj.status === "active") statusBadge = '<span class="badge badge-success">Đang làm</span>';
            if (proj.status === "completed") statusBadge = '<span class="badge badge-info">Hoàn thành</span>';
            if (proj.status === "on-hold") statusBadge = '<span class="badge badge-warning">Tạm dừng</span>';

            let adminActions = "";
            if (isAdmin) {
                adminActions = `
                    <div class="project-card-footer" onclick="event.stopPropagation()">
                        <button class="btn-icon-only btn-edit" onclick="editProject('${proj.id}', event)" title="Sửa dự án">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon-only btn-delete" onclick="deleteProject('${proj.id}', event)" title="Xóa dự án">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `;
            }
            
            let tagsHtml = "";
            if (proj.tagIds && proj.tagIds.length > 0) {
                proj.tagIds.forEach(tid => {
                    const tag = state.tags.find(t => t.id === tid);
                    if (tag) {
                        tagsHtml += `
                            <span class="tag-pill" style="background-color: ${tag.color}15; color: ${tag.color}; border: 1px solid ${tag.color}30; margin-right: 4px; display:inline-flex;">
                                <i class="fa-solid fa-tag" style="font-size: 8px;"></i> ${tag.name}
                            </span>
                        `;
                    }
                });
            }
            const tagsWrapper = tagsHtml ? `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:12px;">${tagsHtml}</div>` : "";

            cardsHtml += `
                <div class="project-card" onclick="openProjectDetail('${proj.id}')" style="cursor:pointer;">
                    <div class="project-card-header">
                        <span class="project-card-title">${proj.name}</span>
                        ${statusBadge}
                    </div>
                    <span style="font-size:11px; color:var(--text-muted); font-weight:600; margin-bottom:8px; display:block;"><i class="fa-solid fa-building"></i> ${proj.department || "Chưa rõ"}</span>
                    <p class="project-card-desc">${proj.desc || "Không có mô tả chi tiết cho dự án này."}</p>
                    ${tagsWrapper}
                    <div class="project-card-stats">
                        <span><i class="fa-solid fa-list-check"></i> Tổng: <strong>${total} việc</strong></span>
                        <span><i class="fa-solid fa-hourglass-half"></i> Chưa xong: <strong>${activeTasks}</strong></span>
                    </div>
                    ${adminActions}
                </div>
            `;
        });
        elements.projectList.innerHTML = cardsHtml;
    } else {
        elements.projectList.style.display = "none";
        elements.projectTableContainer.style.display = "block";
        
        if (filteredProjects.length === 0) {
            elements.projectTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; padding: 30px;" class="text-muted">
                        <i class="fa-solid fa-folder-open" style="font-size: 24px; display:block; margin-bottom:8px;"></i>
                        Không tìm thấy dự án nào.
                    </td>
                </tr>
            `;
            return;
        }
        
        let rowHtml = "";
        filteredProjects.forEach(proj => {
            const projTasks = state.tasks.filter(t => t.projectId === proj.id);
            const total = projTasks.length;
            const completed = projTasks.filter(t => t.status === "completed").length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            
            let statusBadge = "";
            if (proj.status === "active") statusBadge = '<span class="badge badge-success">Đang làm</span>';
            if (proj.status === "completed") statusBadge = '<span class="badge badge-info">Hoàn thành</span>';
            if (proj.status === "on-hold") statusBadge = '<span class="badge badge-warning">Tạm dừng</span>';
            
            let tagsHtml = "";
            if (proj.tagIds && proj.tagIds.length > 0) {
                proj.tagIds.forEach(tid => {
                    const tag = state.tags.find(t => t.id === tid);
                    if (tag) {
                        tagsHtml += `
                            <span class="tag-pill" style="background-color: ${tag.color}15; color: ${tag.color}; border: 1px solid ${tag.color}30; margin-right: 4px; display:inline-flex; align-items:center;">
                                <i class="fa-solid fa-tag" style="font-size:8px;"></i> ${tag.name}
                            </span>
                        `;
                    }
                });
            }
            
            let adminActions = "";
            if (isAdmin) {
                adminActions = `
                    <button class="btn-icon-only btn-edit" onclick="editProject('${proj.id}', event)" title="Sửa dự án" style="display:inline-flex; margin-right:4px;">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icon-only btn-delete" onclick="deleteProject('${proj.id}', event)" title="Xóa dự án" style="display:inline-flex;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                `;
            }
            
            rowHtml += `
                <tr onclick="openProjectDetail('${proj.id}')" style="cursor:pointer;">
                    <td style="padding:14px 16px; font-weight:600; color:var(--text-main);">${proj.name}</td>
                    <td class="col-dept" style="padding:14px 16px; color:var(--text-muted);">${proj.department || "Không rõ"}</td>
                    <td class="col-status" style="padding:14px 16px;">${statusBadge}</td>
                    <td class="col-progress" style="padding:14px 16px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <div class="progress-track" style="width: 80px; margin-bottom: 0;">
                                <div class="progress-fill" style="width: ${percent}%;"></div>
                            </div>
                            <span style="font-size:11.5px; font-weight:600; color:var(--text-muted);">${percent}% (${completed}/${total})</span>
                        </div>
                    </td>
                    <td class="col-tags" style="padding:14px 16px;">${tagsHtml || '<span class="text-muted" style="font-size:11px;">Không có</span>'}</td>
                    <td style="padding:14px 16px; text-align:right;" onclick="event.stopPropagation()">${adminActions}</td>
                </tr>
            `;
        });
        elements.projectTableBody.innerHTML = rowHtml;
        applyTableColumnVisibility();
    }
}

function applyTableColumnVisibility() {
    const vis = state.projectColumnsVisibility;
    const colMap = {
        dept: ".col-dept",
        status: ".col-status",
        progress: ".col-progress",
        tags: ".col-tags"
    };
    
    Object.keys(colMap).forEach(key => {
        const selector = colMap[key];
        const elementsToToggle = document.querySelectorAll(selector);
        const isVisible = vis[key];
        elementsToToggle.forEach(el => {
            if (isVisible) {
                el.classList.remove("col-hidden");
            } else {
                el.classList.add("col-hidden");
            }
        });
    });
}

// 3. Render Members View
function renderMembers() {
    const searchVal = elements.memberSearch.value.toLowerCase().trim();
    const filteredMembers = state.members.filter(m => {
        return m.name.toLowerCase().includes(searchVal) || 
               m.role.toLowerCase().includes(searchVal) ||
               (m.email && m.email.toLowerCase().includes(searchVal)) ||
               (m.phone && m.phone.toLowerCase().includes(searchVal));
    });
    
    if (filteredMembers.length === 0) {
        elements.memberList.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-users-slash text-muted"></i>
                <p>Không tìm thấy nhân viên nào.</p>
            </div>
        `;
        return;
    }

    const isAdmin = state.currentRole === "admin";
    let cardsHtml = "";
    filteredMembers.forEach(mem => {
        const memTasks = state.tasks.filter(t => t.assigneeId === mem.id);
        const total = memTasks.length;
        const pending = memTasks.filter(t => t.status !== "completed").length;
        
        let adminActions = "";
        if (isAdmin) {
            adminActions = `
                <div class="member-card-actions" style="display:flex; flex-direction:column; gap:6px; width:100%;">
                    <button class="btn btn-primary btn-sm" onclick="quickAssignToMember('${mem.id}', event)" style="width:100%;"><i class="fa-solid fa-plus"></i> Giao việc</button>
                    <div style="display:flex; gap:6px; width:100%;">
                        <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="editMember('${mem.id}', event)"><i class="fa-solid fa-user-pen"></i> Sửa</button>
                        <button class="btn btn-danger btn-sm" style="flex:1;" onclick="deleteMember('${mem.id}', event)"><i class="fa-solid fa-trash"></i> Xóa</button>
                    </div>
                </div>
            `;
        }

        const emailHtml = mem.email ? `
            <a href="mailto:${mem.email}" class="contact-item" title="Gửi email cho ${mem.name}" onclick="event.stopPropagation()">
                <i class="fa-regular fa-envelope"></i> <span>${mem.email}</span>
            </a>
        ` : '';

        const phoneHtml = mem.phone ? `
            <a href="tel:${mem.phone}" class="contact-item" title="Gọi điện cho ${mem.name}" onclick="event.stopPropagation()">
                <i class="fa-solid fa-phone"></i> <span>${mem.phone}</span>
            </a>
        ` : '';

        const contactBlock = (emailHtml || phoneHtml) ? `
            <div class="member-card-contact">
                ${emailHtml}
                ${phoneHtml}
            </div>
        ` : '';

        cardsHtml += `
            <div class="member-card">
                <div class="member-card-avatar" style="background-color: ${mem.color}">
                    ${getInitials(mem.name)}
                </div>
                <span class="member-card-name">${mem.name}</span>
                <span class="member-card-role">${mem.role}</span>
                ${contactBlock}
                <div class="member-card-tasks-info">
                    Đang phụ trách: ${pending}/${total} việc
                </div>
                ${adminActions}
            </div>
        `;
    });
    elements.memberList.innerHTML = cardsHtml;
}

// 4. Render Tasks View (with sorting and filters)
function renderTasks() {
    const searchVal = elements.taskSearch.value.toLowerCase().trim();
    const projFilter = elements.filterProject.value;
    const memFilter = elements.filterMember.value;
    const statusFilter = elements.filterStatus.value;
    const urgentFilter = elements.filterUrgent.value;
    
    // Apply filters
    let filteredTasks = state.tasks.filter(task => {
        // Search filter
        const matchSearch = task.title.toLowerCase().includes(searchVal) || (task.desc && task.desc.toLowerCase().includes(searchVal));
        // Project filter
        const matchProj = projFilter === "all" || task.projectId === projFilter;
        // Member filter
        let matchMem = memFilter === "all" || task.assigneeId === memFilter;
        const isAdmin = state.currentRole === "admin";
        if (!isAdmin && state.currentRole !== "guest") {
            matchMem = task.assigneeId === state.currentRole;
        }
        // Status filter
        const matchStatus = statusFilter === "all" || task.status === statusFilter;
        // Urgent filter
        const matchUrgent = urgentFilter === "all" || 
                            (urgentFilter === "urgent" && task.isUrgent) || 
                            (urgentFilter === "normal" && !task.isUrgent);
                            
        return matchSearch && matchProj && matchMem && matchStatus && matchUrgent;
    });
    
    // Apply Sorting
    const sortedTasksList = sortTasks(filteredTasks);

    if (sortedTasksList.length === 0) {
        elements.taskList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-tasks text-muted"></i>
                <p>Không tìm thấy công việc nào phù hợp với bộ lọc.</p>
            </div>
        `;
        return;
    }

    const isAdmin = state.currentRole === "admin";
    let listHtml = "";
    
    sortedTasksList.forEach(task => {
        const project = state.projects.find(p => p.id === task.projectId);
        const member = state.members.find(m => m.id === task.assigneeId);
        
        // Tags representation
        let urgentBadge = task.isUrgent ? `<span class="badge badge-danger"><i class="fa-solid fa-triangle-exclamation"></i> Cần gấp</span>` : "";
        let statusBadge = "";
        
        if (task.status === "new") {
            statusBadge = `<span class="badge badge-info"><i class="fa-solid fa-clock"></i> Mới giao</span>`;
        } else if (task.status === "working") {
            statusBadge = `<span class="badge badge-warning"><i class="fa-solid fa-spinner fa-spin"></i> Đang làm</span>`;
        } else if (task.status === "reviewing") {
            statusBadge = `<span class="badge badge-danger"><i class="fa-solid fa-circle-exclamation"></i> Chờ duyệt</span>`;
        } else if (task.status === "completed") {
            statusBadge = `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Hoàn thành</span>`;
        }
        
        const isOverdue = task.status !== "completed" && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
        const dateStr = formatDate(task.dueDate);
        
        let hasFileBadge = task.completedFile ? `<span class="badge badge-info" title="Có tệp đính kèm hoàn thành"><i class="fa-solid fa-paperclip"></i> Đã nộp file</span>` : "";

        let taskTagsHtml = "";
        if (task.tagIds && task.tagIds.length > 0) {
            task.tagIds.forEach(tid => {
                const tag = state.tags.find(t => t.id === tid);
                if (tag) {
                    taskTagsHtml += `
                        <span class="tag-pill" style="background-color: ${tag.color}15; color: ${tag.color}; border: 1px solid ${tag.color}30; display:inline-flex; align-items:center;">
                            <i class="fa-solid fa-tag" style="font-size: 8px;"></i> ${tag.name}
                        </span>
                    `;
                }
            });
        }

        // Admin actions
        let adminActionBtn = "";
        if (isAdmin) {
            adminActionBtn = `
                <div class="task-card-actions" onclick="event.stopPropagation()">
                    <button class="btn-icon-only btn-edit" onclick="editTask('${task.id}')" title="Sửa thông tin công việc">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icon-only btn-delete" onclick="deleteTask('${task.id}')" title="Xóa công việc">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        }
        
        // Highlight class for urgent unfinished tasks
        const isUrgentUnfinished = task.isUrgent && task.status !== "completed";
        const highlightClass = isUrgentUnfinished ? "urgent-highlight" : "";

        listHtml += `
            <div class="task-card ${highlightClass}" onclick="openTaskProgressModal('${task.id}')">
                <div class="task-info-side">
                    <div class="task-top-tags">
                        ${urgentBadge}
                        ${statusBadge}
                        ${hasFileBadge}
                        ${taskTagsHtml}
                        <span class="tag-project">${project ? project.name : "Dự án N/A"}</span>
                    </div>
                    <div class="task-title-area">
                        <h3 class="task-title">${task.title}</h3>
                    </div>
                    <p class="task-desc">${task.desc || "Không có mô tả chi tiết."}</p>
                    <div class="task-bottom-meta">
                        <div class="meta-item">
                            <i class="fa-solid fa-user-circle"></i>
                            <span>Người làm: <strong>${member ? member.name : "Chưa phân công"}</strong></span>
                        </div>
                        <div class="meta-item ${isOverdue ? "text-danger" : ""}">
                            <i class="fa-regular fa-calendar-days"></i>
                            <span>Hạn chót: <strong class="${isOverdue ? "text-danger" : ""}">${dateStr} ${isOverdue ? "(Quá hạn!)" : ""}</strong></span>
                        </div>
                    </div>
                </div>
                <div class="task-action-side">
                    <div class="task-status-container">
                        <!-- Vùng hiển thị vai trò phụ trách -->
                        <div class="avatar avatar-sm" style="background-color: ${member ? member.color : '#64748b'}" title="${member ? member.name : ''}">
                            ${member ? getInitials(member.name) : "?"}
                        </div>
                    </div>
                    ${adminActionBtn}
                </div>
            </div>
        `;
    });
    
    elements.taskList.innerHTML = listHtml;
}

// 5. Populate Option Selectors dynamically
function populateDropdowns() {
    // Fill Project Filter & Form Project Options
    let filterProjHtml = '<option value="all">Tất cả Dự án</option>';
    let formProjHtml = '<option value="">-- Chọn dự án --</option>';
    
    state.projects.forEach(p => {
        if (p.status !== "completed" || p.id === elements.taskProject.value) {
            formProjHtml += `<option value="${p.id}">${p.name}</option>`;
        }
        filterProjHtml += `<option value="${p.id}">${p.name}</option>`;
    });
    
    elements.filterProject.innerHTML = filterProjHtml;
    elements.taskProject.innerHTML = formProjHtml;

    // Fill Member Filter & Form Member Options
    let filterMemHtml = '<option value="all">Tất cả Thành viên</option>';
    let formMemHtml = '<option value="">-- Chọn thành viên --</option>';
    
    let accountFullNameHtml = '<option value="">-- Chọn thành viên liên kết --</option>';
    accountFullNameHtml += '<option value="Quản trị viên hệ thống">Quản trị viên hệ thống (Không có thẻ thành viên)</option>';
    
    state.members.forEach(m => {
        formMemHtml += `<option value="${m.id}">${m.name} (${m.role})</option>`;
        filterMemHtml += `<option value="${m.id}">${m.name}</option>`;
        accountFullNameHtml += `<option value="${m.name}">${m.name} (${m.role})</option>`;
    });
    
    elements.filterMember.innerHTML = filterMemHtml;
    elements.taskAssignee.innerHTML = formMemHtml;
    
    // Check if accountFullName element exists (since it's dynamically populated)
    if (elements.accountFullName) {
        elements.accountFullName.innerHTML = accountFullNameHtml;
    }
}

// --- UTILITY DATE FORMAT ---
function formatDate(dateString) {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
    }
    return dateString;
}

// --- EVENT HANDLERS ---
function setupEventHandlers() {
    // 1. Sidebar Nav
    elements.menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const target = item.getAttribute("data-target");
            switchView(target);
            
            // Close mobile menu on click
            if (window.innerWidth <= 768) {
                elements.sidebar.classList.remove("active");
                const overlay = document.querySelector(".sidebar-overlay");
                if (overlay) overlay.remove();
            }
        });
    });

    // 2. Mobile Menu Toggle
    elements.menuToggle.addEventListener("click", () => {
        elements.sidebar.classList.toggle("active");
        if (elements.sidebar.classList.contains("active")) {
            const overlay = document.createElement("div");
            overlay.className = "sidebar-overlay";
            overlay.addEventListener("click", () => {
                elements.sidebar.classList.remove("active");
                overlay.remove();
            });
            document.body.appendChild(overlay);
        } else {
            const overlay = document.querySelector(".sidebar-overlay");
            if (overlay) overlay.remove();
        }
    });

    // 3. Theme Toggle Buttons
    elements.themeAuto.addEventListener("click", () => {
        state.themeMode = "auto";
        applyTheme();
        updateThemeSelectorUI();
        saveToLocalStorage();
        showToast("Đã chuyển sang giao diện tự động theo giờ hệ thống.", "info");
    });

    elements.themeLight.addEventListener("click", () => {
        state.themeMode = "light";
        applyTheme();
        updateThemeSelectorUI();
        saveToLocalStorage();
        showToast("Đã kích hoạt chế độ giao diện sáng.", "success");
    });

    elements.themeDark.addEventListener("click", () => {
        state.themeMode = "dark";
        applyTheme();
        updateThemeSelectorUI();
        saveToLocalStorage();
        showToast("Đã kích hoạt chế độ giao diện tối.", "success");
    });

    // Cloud Sync status click trigger
    if (elements.syncStatusIndicator) {
        elements.syncStatusIndicator.addEventListener("click", () => {
            syncFromCloud(true);
        });
    }

    // 4. Role Switcher
    elements.roleSwitcher.addEventListener("change", (e) => {
        state.currentRole = e.target.value;
        saveToLocalStorage();
        updateCurrentUserProfile();
        
        let label = "Quản trị viên";
        if (state.currentRole !== "admin") {
            const member = state.members.find(m => m.id === state.currentRole);
            label = member ? member.name : "Nhân viên";
        }
        showToast(`Đã chuyển vai trò sang: ${label}`, "success");
        renderDashboard(); // Update dashboard components as per role
    });

    // 5. Modals Close Events
    document.querySelectorAll(".modal-close").forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            closeAllModals();
        });
    });

    // Close modal when click outside of contents
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // 6. Project search, filters, layouts and form submit
    elements.projectSearch.addEventListener("input", renderProjects);
    elements.filterProjectDept.addEventListener("change", renderProjects);
    
    elements.viewProjGrid.addEventListener("click", () => {
        state.projectLayout = "grid";
        saveToLocalStorage();
        renderProjects();
    });
    elements.viewProjTable.addEventListener("click", () => {
        state.projectLayout = "table";
        saveToLocalStorage();
        renderProjects();
    });

    // Viewoptions Column Visibility Dropdown
    const btnViewOptions = document.getElementById("btnViewOptions");
    const viewOptionsDropdownMenu = document.getElementById("viewOptionsDropdownMenu");
    if (btnViewOptions && viewOptionsDropdownMenu) {
        btnViewOptions.addEventListener("click", (e) => {
            e.stopPropagation();
            viewOptionsDropdownMenu.classList.toggle("active");
        });
        document.addEventListener("click", (e) => {
            if (viewOptionsDropdownMenu.classList.contains("active") && !viewOptionsDropdownMenu.contains(e.target) && e.target !== btnViewOptions) {
                viewOptionsDropdownMenu.classList.remove("active");
            }
        });

        // Initialize checkboxes value and listeners
        const cols = ["dept", "status", "progress", "tags"];
        cols.forEach(col => {
            const id = "colShow" + col.charAt(0).toUpperCase() + col.slice(1);
            const cb = document.getElementById(id);
            if (cb) {
                cb.checked = state.projectColumnsVisibility[col];
                cb.addEventListener("change", (e) => {
                    state.projectColumnsVisibility[col] = e.target.checked;
                    saveToLocalStorage();
                    applyTableColumnVisibility();
                });
            }
        });
    }

    elements.btnNewProject.addEventListener("click", () => {
        elements.projectForm.reset();
        elements.projectId.value = "";
        elements.projectModalTitle.textContent = "Tạo Dự án Mới";
        elements.projectDept.value = "Đào tạo";
        renderTagSelectorInForm(elements.projectTagSelector, []);
        openModal("project");
    });
    elements.projectForm.addEventListener("submit", handleProjectSubmit);

    // 7. Member search and form submit
    elements.memberSearch.addEventListener("input", renderMembers);
    elements.btnNewMember.addEventListener("click", () => {
        elements.memberForm.reset();
        elements.memberId.value = "";
        elements.memberModalTitle.textContent = "Thêm Thành viên Mới";
        elements.memberColor.value = getRandomColor();
        openModal("member");
    });
    elements.memberForm.addEventListener("submit", handleMemberSubmit);

    // 8. Task search, filters and form submit
    elements.taskSearch.addEventListener("input", renderTasks);
    elements.filterProject.addEventListener("change", renderTasks);
    elements.filterMember.addEventListener("change", renderTasks);
    elements.filterStatus.addEventListener("change", renderTasks);
    elements.filterUrgent.addEventListener("change", renderTasks);
    elements.btnNewTask.addEventListener("click", () => {
        elements.taskForm.reset();
        elements.taskId.value = "";
        elements.taskModalTitle.textContent = "Giao Công việc Mới";
        // Default task deadline to 3 days from now
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 3);
        elements.taskDueDate.value = defaultDate.toISOString().split("T")[0];
        renderTagSelectorInForm(elements.taskTagSelector, []);
        openModal("task");
    });
    elements.taskForm.addEventListener("submit", handleTaskSubmit);

    // 8.1 Assignment search and quick task submit
    elements.assignmentSearch.addEventListener("input", renderAssignmentBoard);
    elements.btnAssignmentNewTask.addEventListener("click", () => {
        elements.taskForm.reset();
        elements.taskId.value = "";
        elements.taskModalTitle.textContent = "Giao Công việc Mới";
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 3);
        elements.taskDueDate.value = defaultDate.toISOString().split("T")[0];
        renderTagSelectorInForm(elements.taskTagSelector, []);
        openModal("task");
    });

    // 9. Employee Progress Update Form Action
    elements.btnSaveProgress.addEventListener("click", handleEmployeeProgressUpdate);
    
    // Status select change inside progress modal logic (shows/hides upload area)
    elements.employeeStatusSelect.addEventListener("change", (e) => {
        const showUpload = e.target.value === "reviewing";
        elements.fileUploadContainer.style.display = showUpload ? "block" : "none";
    });

    // 10. File attachment drag and drop simulator
    setupFileDropzone();

    // 11. Admin Review Actions inside progress modal
    elements.btnApproveTask.addEventListener("click", () => {
        handleAdminReview(true);
    });
    elements.btnRejectTask.addEventListener("click", () => {
        handleAdminReview(false);
    });
    elements.btnAdminSaveStatus.addEventListener("click", handleAdminDirectStatusUpdate);

    // 12. Backup JSON actions
    elements.btnExportData.addEventListener("click", exportDataToJSON);
    elements.btnImportData.addEventListener("click", () => {
        elements.importFile.click();
    });
    elements.importFile.addEventListener("change", importDataFromJSON);

    // 13. Tag management events
    elements.tagSearch.addEventListener("input", renderTags);
    elements.btnNewTag.addEventListener("click", () => {
        elements.tagForm.reset();
        elements.tagId.value = "";
        elements.tagModalTitle.textContent = "Tạo Thẻ Mới";
        openModal("tag");
    });
    elements.tagForm.addEventListener("submit", handleTagSubmit);

    // 14. Project detail task list filter
    elements.filterProjDetailTaskStatus.addEventListener("change", renderProjDetailTasks);

    // 15. Login & Logout events
    elements.loginForm.addEventListener("submit", handleLogin);
    elements.btnLogout.addEventListener("click", handleLogout);

    // 16. Account management events
    elements.accountSearch.addEventListener("input", renderAccounts);
    elements.btnNewAccount.addEventListener("click", () => {
        elements.accountForm.reset();
        elements.accountId.value = "";
        elements.accountModalTitle.textContent = "Tạo Tài khoản Mới";
        openModal("account");
    });
    elements.accountForm.addEventListener("submit", handleAccountSubmit);
}

// --- NAVIGATION SWITCH VIEWS ---
function switchView(panelId) {
    state.activePanel = panelId;
    
    // Toggle active classes on menu items
    elements.menuItems.forEach(item => {
        const target = item.getAttribute("data-target");
        item.classList.toggle("active", target === panelId);
    });
    
    // Toggle panels visibility
    Object.keys(elements.panels).forEach(key => {
        elements.panels[key].classList.toggle("active", key === panelId);
    });
    
    // Update header title
    let titleStr = "Tổng quan";
    if (panelId === "projects") titleStr = "Quản lý Dự án";
    if (panelId === "members") titleStr = "Thành viên Công ty";
    if (panelId === "assignment") titleStr = "Phân công & Giao việc";
    if (panelId === "tasks") titleStr = "Danh sách Công việc";
    if (panelId === "tags") titleStr = "Quản lý Thẻ";
    if (panelId === "accounts") titleStr = "Quản lý Tài khoản";
    elements.pageTitle.textContent = titleStr;
    
    // Re-render target panel content
    if (panelId === "dashboard") renderDashboard();
    if (panelId === "projects") renderProjects();
    if (panelId === "members") renderMembers();
    if (panelId === "assignment") renderAssignmentBoard();
    if (panelId === "tasks") renderTasks();
    if (panelId === "tags") renderTags();
    if (panelId === "accounts") renderAccounts();
}

// --- MODAL UTILITIES ---
function openModal(modalId) {
    elements.modals[modalId].classList.add("active");
}

function closeAllModals() {
    Object.keys(elements.modals).forEach(key => {
        elements.modals[key].classList.remove("active");
    });
    // Reset temporary file inputs/caches
    tempAttachedFile = null;
    elements.attachedFileInfo.style.display = "none";
    elements.taskFileAttachment.value = "";
}

// --- PROJECT ACTIONS ---
function handleProjectSubmit(e) {
    e.preventDefault();
    const id = elements.projectId.value;
    const name = elements.projectName.value.trim();
    const desc = elements.projectDesc.value.trim();
    const status = elements.projectStatus.value;
    const department = elements.projectDept.value;
    const tagIds = Array.from(elements.projectTagSelector.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    
    if (id) {
        // Edit mode
        const index = state.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            state.projects[index] = { ...state.projects[index], name, desc, status, department, tagIds };
            showToast(`Đã cập nhật dự án: ${name}`, "success");
        }
    } else {
        // Create mode
        const newProj = {
            id: `proj-${Date.now()}`,
            name,
            desc,
            status,
            department,
            tagIds
        };
        state.projects.push(newProj);
        showToast(`Đã tạo dự án mới: ${name}`, "success");
    }
    
    saveToLocalStorage();
    closeAllModals();
    renderProjects();
    renderDashboard();
    populateDropdowns();
}

window.editProject = function(id, event) {
    if (event) event.stopPropagation();
    const proj = state.projects.find(p => p.id === id);
    if (!proj) return;
    
    elements.projectId.value = proj.id;
    elements.projectName.value = proj.name;
    elements.projectDesc.value = proj.desc;
    elements.projectStatus.value = proj.status;
    elements.projectDept.value = proj.department || "Đào tạo";
    
    renderTagSelectorInForm(elements.projectTagSelector, proj.tagIds || []);
    
    elements.projectModalTitle.textContent = "Chỉnh sửa Dự án";
    openModal("project");
};

window.deleteProject = function(id, event) {
    if (event) event.stopPropagation();
    
    // Check if tasks exist in project
    const projectTasks = state.tasks.filter(t => t.projectId === id);
    if (projectTasks.length > 0) {
        if (!confirm(`Dự án này đang có ${projectTasks.length} công việc trực thuộc. Xóa dự án sẽ xóa toàn bộ các công việc này. Bạn có chắc chắn muốn xóa?`)) {
            return;
        }
        // Cascade delete tasks
        state.tasks = state.tasks.filter(t => t.projectId !== id);
    } else {
        if (!confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
            return;
        }
    }
    
    state.projects = state.projects.filter(p => p.id !== id);
    
    saveToLocalStorage();
    showToast("Đã xóa dự án thành công.", "success");
    renderProjects();
    renderDashboard();
    populateDropdowns();
};

// --- MEMBER ACTIONS ---
function handleMemberSubmit(e) {
    e.preventDefault();
    const id = elements.memberId.value;
    const name = elements.memberName.value.trim();
    const role = elements.memberRole.value.trim();
    const email = elements.memberEmail.value.trim();
    const phone = elements.memberPhone.value.trim();
    const color = elements.memberColor.value;
    
    if (id) {
        // Edit mode
        const index = state.members.findIndex(m => m.id === id);
        if (index !== -1) {
            state.members[index] = { ...state.members[index], name, role, email, phone, color };
            showToast(`Đã cập nhật thông tin nhân viên: ${name}`, "success");
        }
    } else {
        // Create mode
        const newMem = {
            id: `mem-${Date.now()}`,
            name,
            role,
            email,
            phone,
            color
        };
        state.members.push(newMem);
        showToast(`Đã thêm nhân viên mới: ${name}`, "success");
    }
    
    saveToLocalStorage();
    closeAllModals();
    populateRoleSwitcher();
    updateCurrentUserProfile();
    renderMembers();
    renderDashboard();
    populateDropdowns();
}

window.editMember = function(id, event) {
    if (event) event.stopPropagation();
    const mem = state.members.find(m => m.id === id);
    if (!mem) return;
    
    elements.memberId.value = mem.id;
    elements.memberName.value = mem.name;
    elements.memberRole.value = mem.role;
    elements.memberEmail.value = mem.email || "";
    elements.memberPhone.value = mem.phone || "";
    elements.memberColor.value = mem.color;
    
    elements.memberModalTitle.textContent = "Chỉnh sửa Nhân viên";
    openModal("member");
};

window.deleteMember = function(id, event) {
    if (event) event.stopPropagation();
    
    // Check if tasks exist assigned to member
    const memberTasks = state.tasks.filter(t => t.assigneeId === id);
    if (memberTasks.length > 0) {
        if (!confirm(`Nhân viên này đang được phân công ${memberTasks.length} công việc. Xóa nhân viên sẽ đưa các công việc này về trạng thái 'Chưa phân công'. Bạn vẫn muốn xóa?`)) {
            return;
        }
        // Unassign member
        state.tasks.forEach(t => {
            if (t.assigneeId === id) {
                t.assigneeId = "";
            }
        });
    } else {
        if (!confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
            return;
        }
    }
    
    state.members = state.members.filter(m => m.id !== id);
    
    saveToLocalStorage();
    showToast("Đã xóa nhân viên thành công.", "success");
    populateRoleSwitcher();
    updateCurrentUserProfile();
    renderMembers();
    renderDashboard();
    populateDropdowns();
};

// --- TASK ACTIONS ---
function handleTaskSubmit(e) {
    e.preventDefault();
    const id = elements.taskId.value;
    const title = elements.taskTitle.value.trim();
    const projectId = elements.taskProject.value;
    const assigneeId = elements.taskAssignee.value;
    const dueDate = elements.taskDueDate.value;
    const isUrgent = elements.taskIsUrgent.checked;
    const desc = elements.taskDesc.value.trim();
    const tagIds = Array.from(elements.taskTagSelector.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    
    if (id) {
        // Edit mode
        const index = state.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            state.tasks[index] = { 
                ...state.tasks[index], 
                title, 
                projectId, 
                assigneeId, 
                dueDate, 
                isUrgent, 
                desc,
                tagIds
            };
            showToast(`Đã cập nhật công việc: ${title}`, "success");
        }
    } else {
        // Create mode
        const newTask = {
            id: `task-${Date.now()}`,
            title,
            projectId,
            assigneeId,
            dueDate,
            isUrgent,
            status: "new",
            desc,
            completedFile: null,
            tagIds
        };
        state.tasks.push(newTask);
        
        const member = state.members.find(m => m.id === assigneeId);
        showToast(`Đã giao công việc mới cho ${member ? member.name : "Nhân viên"}`, "success");
    }
    
    saveToLocalStorage();
    closeAllModals();
    renderTasks();
    renderDashboard();
    renderAssignmentBoard();
}

window.editTask = function(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    
    elements.taskId.value = task.id;
    elements.taskTitle.value = task.title;
    elements.taskProject.value = task.projectId;
    elements.taskAssignee.value = task.assigneeId;
    elements.taskDueDate.value = task.dueDate;
    elements.taskIsUrgent.checked = task.isUrgent;
    elements.taskDesc.value = task.desc;
    
    renderTagSelectorInForm(elements.taskTagSelector, task.tagIds || []);
    
    elements.taskModalTitle.textContent = "Chỉnh sửa Công việc";
    openModal("task");
};

window.deleteTask = function(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
        return;
    }
    
    state.tasks = state.tasks.filter(t => t.id !== id);
    
    saveToLocalStorage();
    showToast("Đã xóa công việc.", "success");
    renderTasks();
    renderDashboard();
};

// --- TASK PROGRESS UPDATING & FILE ATTACHMENTS (EMPLOYEE / ADMIN VIEW) ---
let currentViewingTaskId = null;
let tempAttachedFile = null; // Cấu trúc: { name, size, type, content: base64 }

window.openTaskProgressModal = function(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    
    currentViewingTaskId = id;
    tempAttachedFile = task.completedFile ? { ...task.completedFile } : null;
    
    // Set static data
    elements.detailTitle.textContent = task.title;
    
    // Project Name
    const proj = state.projects.find(p => p.id === task.projectId);
    elements.detailProject.textContent = proj ? proj.name : "Không thuộc dự án nào";
    
    // Assignee
    const assignee = state.members.find(m => m.id === task.assigneeId);
    if (assignee) {
        elements.detailAssigneeName.textContent = assignee.name;
        elements.detailAssigneeAvatar.textContent = getInitials(assignee.name);
        elements.detailAssigneeAvatar.style.backgroundColor = assignee.color;
    } else {
        elements.detailAssigneeName.textContent = "Chưa phân công";
        elements.detailAssigneeAvatar.textContent = "?";
        elements.detailAssigneeAvatar.style.backgroundColor = "#64748b";
    }
    
    // Deadline
    elements.detailDueDate.innerHTML = `<i class="fa-regular fa-calendar-days"></i> Hạn: ${formatDate(task.dueDate)}`;
    const isOverdue = task.status !== "completed" && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
    elements.detailDueDate.classList.toggle("text-danger", isOverdue);
    
    // Description
    elements.detailDesc.textContent = task.desc || "Không có mô tả chi tiết.";
    
    // Urgent Highlight
    elements.detailUrgentBadge.style.display = task.isUrgent ? "inline-flex" : "none";
    
    // Status Badge
    updateStatusBadgeUI(task.status);
    
    // Switch View according to Role & Status
    const isAdmin = state.currentRole === "admin";
    const isMyTask = task.assigneeId === state.currentRole;
    
    if (isAdmin) {
        elements.employeeActionArea.style.display = "none";
        elements.adminActionArea.style.display = "block";
        
        // Show file if submitted
        if (task.completedFile) {
            elements.submittedFileBox.style.display = "block";
            elements.submittedFileName.textContent = task.completedFile.name;
            elements.submittedFileSize.textContent = task.completedFile.size;
            // Config download trigger
            elements.btnDownloadFile.onclick = () => {
                downloadBase64File(task.completedFile.content, task.completedFile.name);
            };
        } else {
            elements.submittedFileBox.style.display = "none";
        }
        
        // Show review buttons or status dropdown
        if (task.status === "reviewing") {
            elements.adminReviewActions.style.display = "block";
            elements.adminStandardStatus.style.display = "none";
        } else {
            elements.adminReviewActions.style.display = "none";
            elements.adminStandardStatus.style.display = "block";
            elements.adminStatusSelect.value = task.status;
        }
    } else {
        // Employee Mode
        elements.adminActionArea.style.display = "none";
        elements.employeeActionArea.style.display = "block";
        
        // Disable edit progress if this task is not assigned to the active user
        if (!isMyTask) {
            elements.employeeActionArea.style.opacity = "0.6";
            elements.employeeActionArea.style.pointerEvents = "none";
            // Set alert toast or message inside action area
        } else {
            elements.employeeActionArea.style.opacity = "1";
            elements.employeeActionArea.style.pointerEvents = "auto";
        }
        
        elements.employeeStatusSelect.value = task.status;
        
        // Setup file UI
        if (task.status === "reviewing") {
            elements.fileUploadContainer.style.display = "block";
            updateAttachedFileUI();
        } else {
            elements.fileUploadContainer.style.display = "none";
        }
    }
    
    openModal("taskProgress");
};

function updateStatusBadgeUI(status) {
    elements.detailStatusBadge.className = "badge";
    if (status === "new") {
        elements.detailStatusBadge.classList.add("badge-info");
        elements.detailStatusBadge.innerHTML = '<i class="fa-solid fa-clock"></i> Mới giao';
    } else if (status === "working") {
        elements.detailStatusBadge.classList.add("badge-warning");
        elements.detailStatusBadge.innerHTML = '<i class="fa-solid fa-spinner"></i> Đang làm';
    } else if (status === "reviewing") {
        elements.detailStatusBadge.classList.add("badge-danger");
        elements.detailStatusBadge.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Chờ duyệt';
    } else if (status === "completed") {
        elements.detailStatusBadge.classList.add("badge-success");
        elements.detailStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Đã hoàn thành';
    }
}

// --- FILE DROPZONE SYSTEM & BASE64 SIMULATION ---
function setupFileDropzone() {
    const dropzone = elements.fileDropzone;
    const fileInput = elements.taskFileAttachment;
    
    dropzone.addEventListener("click", () => fileInput.click());
    
    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "var(--color-primary)";
        dropzone.style.backgroundColor = "var(--bg-hover)";
    });
    
    dropzone.addEventListener("dragleave", () => {
        dropzone.style.borderColor = "var(--border-color)";
        dropzone.style.backgroundColor = "var(--bg-card)";
    });
    
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "var(--border-color)";
        dropzone.style.backgroundColor = "var(--bg-card)";
        
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });
    
    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    elements.btnRemoveFile.addEventListener("click", () => {
        tempAttachedFile = null;
        updateAttachedFileUI();
        fileInput.value = "";
    });
}

function handleFileSelect(file) {
    // Validate size (max 2MB = 2097152 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
        showToast("Tệp quá lớn! Vui lòng chọn tệp dưới 2MB để tránh giới hạn bộ nhớ.", "danger");
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        tempAttachedFile = {
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
            content: e.target.result // Base64 Data URL
        };
        updateAttachedFileUI();
        showToast(`Đã tải lên tệp: ${file.name}`, "success");
    };
    reader.readAsDataURL(file);
}

function updateAttachedFileUI() {
    if (tempAttachedFile) {
        elements.attachedFileName.textContent = tempAttachedFile.name;
        elements.attachedFileSize.textContent = tempAttachedFile.size;
        elements.attachedFileInfo.style.display = "flex";
        elements.fileDropzone.style.display = "none";
    } else {
        elements.attachedFileInfo.style.display = "none";
        elements.fileDropzone.style.display = "flex";
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// Download simulating downloader
function downloadBase64File(base64Content, fileName) {
    try {
        const link = document.createElement("a");
        link.href = base64Content;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Đang chuẩn bị tải về tệp: ${fileName}`, "success");
    } catch (e) {
        showToast("Không thể tải về tệp tin này cục bộ.", "danger");
    }
}

// Employee Progress Submit
function handleEmployeeProgressUpdate() {
    const task = state.tasks.find(t => t.id === currentViewingTaskId);
    if (!task) return;
    
    const newStatus = elements.employeeStatusSelect.value;
    
    // Validation: if user requests review, they must attach a file to prove work
    if (newStatus === "reviewing" && !tempAttachedFile) {
        showToast("Vui lòng đính kèm tệp kết quả trước khi gửi yêu cầu phê duyệt công việc.", "warning");
        return;
    }
    
    task.status = newStatus;
    task.completedFile = newStatus === "reviewing" ? tempAttachedFile : null;
    
    saveToLocalStorage();
    showToast("Đã cập nhật tiến độ công việc thành công.", "success");
    closeAllModals();
    renderTasks();
    renderDashboard();
}

// Admin Approv / Reject Actions
function handleAdminReview(isApproved) {
    const task = state.tasks.find(t => t.id === currentViewingTaskId);
    if (!task) return;
    
    if (isApproved) {
        task.status = "completed";
        showToast(`Đã phê duyệt công việc: ${task.title}`, "success");
    } else {
        task.status = "working";
        task.completedFile = null; // Clear file, ask for rework
        showToast(`Đã trả lại công việc yêu cầu nhân viên làm lại.`, "info");
    }
    
    saveToLocalStorage();
    closeAllModals();
    renderTasks();
    renderDashboard();
}

function handleAdminDirectStatusUpdate() {
    const task = state.tasks.find(t => t.id === currentViewingTaskId);
    if (!task) return;
    
    const newStatus = elements.adminStatusSelect.value;
    task.status = newStatus;
    
    // Clear attachment if going back from completed/reviewing
    if (newStatus !== "completed" && newStatus !== "reviewing") {
        task.completedFile = null;
    }
    
    saveToLocalStorage();
    showToast("Đã cập nhật trạng thái trực tiếp của công việc.", "success");
    closeAllModals();
    renderTasks();
    renderDashboard();
}

// --- UTILITY RANDOM GENERATORS ---
function getRandomColor() {
    const colors = ["#4f46e5", "#10b981", "#06b6d4", "#f59e0b", "#ec4899", "#8b5cf6", "#3b82f6", "#14b8a6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// --- DATA BACKUP: EXPORT & IMPORT JSON ---
function exportDataToJSON() {
    const backupData = {
        projects: state.projects,
        members: state.members,
        tasks: state.tasks,
        themeMode: state.themeMode
    };
    
    const jsonStr = JSON.stringify(backupData, null, 4);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `NOVASTARS_TaskData_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast("Xuất bản sao lưu dữ liệu thành công!", "success");
}

function importDataFromJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
        try {
            const data = JSON.parse(evt.target.result);
            if (data.projects && data.members && data.tasks) {
                if (confirm("Hành động này sẽ thay thế hoàn toàn dữ liệu hiện tại bằng dữ liệu trong tệp sao lưu. Bạn có đồng ý tiếp tục?")) {
                    state.projects = data.projects;
                    state.members = data.members;
                    state.tasks = data.tasks;
                    state.themeMode = data.themeMode || "auto";
                    
                    saveToLocalStorage();
                    showToast("Khôi phục dữ liệu sao lưu thành công!", "success");
                    
                    // Reinitialize UI
                    applyTheme();
                    updateThemeSelectorUI();
                    populateRoleSwitcher();
                    updateCurrentUserProfile();
                    renderAll();
                }
            } else {
                showToast("Định dạng tệp sao lưu không hợp lệ.", "danger");
            }
        } catch (err) {
            showToast("Lỗi khi đọc tệp dữ liệu JSON.", "danger");
        }
    };
    reader.readAsText(file);
    elements.importFile.value = ""; // Clear element input value cache
}

// --- PHÂN HỆ GIAO VIỆC (ASSIGNMENT BOARD RENDERING & ACTIONS) ---
function renderAssignmentBoard() {
    const searchVal = elements.assignmentSearch.value.toLowerCase().trim();
    const isAdmin = state.currentRole === "admin";
    
    // Xây dựng các cột: 1 cột cho chưa phân công + các cột cho từng nhân viên
    let boardHtml = "";
    
    // A. Cột công việc chưa phân công
    const unassignedTasks = state.tasks.filter(t => !t.assigneeId);
    boardHtml += renderMemberLane("unassigned", { name: "Chưa phân công", role: "Công việc tự do", color: "#64748b" }, unassignedTasks, searchVal, isAdmin);
    
    // B. Cột công việc của từng nhân sự
    state.members.forEach(member => {
        const memberTasks = state.tasks.filter(t => t.assigneeId === member.id);
        boardHtml += renderMemberLane(member.id, member, memberTasks, searchVal, isAdmin);
    });
    
    elements.assignmentBoard.innerHTML = boardHtml;
    
    // Ẩn/hiện các nút dành riêng cho Admin trong bảng phân công
    document.querySelectorAll(".assignment-board .btn-admin-only").forEach(el => {
        el.style.display = isAdmin ? "inline-flex" : "none";
    });
}

function renderMemberLane(memberId, member, memberTasks, searchVal, isAdmin) {
    // Lọc công việc theo tìm kiếm
    const filteredTasks = memberTasks.filter(t => {
        return t.title.toLowerCase().includes(searchVal) || (t.desc && t.desc.toLowerCase().includes(searchVal));
    });
    
    // Sắp xếp công việc (Công việc mới nhất lên đầu)
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        const aTime = a.id.startsWith("task-") ? parseInt(a.id.replace("task-", "")) : 0;
        const bTime = b.id.startsWith("task-") ? parseInt(b.id.replace("task-", "")) : 0;
        
        if (!isNaN(aTime) && !isNaN(bTime) && aTime > 10000 && bTime > 10000) {
            return bTime - aTime;
        }
        return b.id.localeCompare(a.id);
    });
    
    // Đếm số việc đang thực hiện (chưa xong)
    const activeCount = memberTasks.filter(t => t.status !== "completed").length;
    
    const initials = memberId === "unassigned" ? "?" : getInitials(member.name);
    
    let quickAssignBtn = "";
    if (isAdmin && memberId !== "unassigned") {
        quickAssignBtn = `
            <button class="btn btn-secondary btn-sm lane-quick-assign-btn" onclick="quickAssignToMember('${memberId}', event)">
                <i class="fa-solid fa-plus"></i> Giao việc nhanh
            </button>
        `;
    }
    
    let cardsHtml = "";
    if (sortedTasks.length === 0) {
        cardsHtml = `
            <div class="empty-state" style="padding: 20px 10px;">
                <p style="font-size: 11.5px; color: var(--text-muted);">Không có công việc nào.</p>
            </div>
        `;
    } else {
        sortedTasks.forEach(task => {
            const project = state.projects.find(p => p.id === task.projectId);
            
            const isOverdue = task.status !== "completed" && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
            const dateStr = formatDate(task.dueDate);
            const dateClass = isOverdue ? "mini-task-card-date overdue" : "mini-task-card-date";
            
            let statusBadge = "";
            if (task.status === "new") statusBadge = '<span class="badge badge-info">Mới</span>';
            if (task.status === "working") statusBadge = '<span class="badge badge-warning">Đang làm</span>';
            if (task.status === "reviewing") statusBadge = '<span class="badge badge-danger">Chờ duyệt</span>';
            if (task.status === "completed") statusBadge = '<span class="badge badge-success">Xong</span>';
            
            const urgentClass = task.isUrgent && task.status !== "completed" ? "urgent" : "";
            
            cardsHtml += `
                <div class="mini-task-card ${urgentClass}" onclick="openTaskProgressModal('${task.id}')">
                    <span class="mini-task-card-project">${project ? project.name : "Dự án N/A"}</span>
                    <span class="mini-task-card-title">${task.title}</span>
                    <div class="mini-task-card-meta">
                        <span class="${dateClass}"><i class="fa-regular fa-calendar-days"></i> ${dateStr}</span>
                        ${statusBadge}
                    </div>
                </div>
            `;
        });
    }
    
    return `
        <div class="member-lane">
            <div class="lane-header">
                <div class="lane-member-info">
                    <div class="avatar avatar-sm" style="background-color: ${member.color}; color: white; border: none; font-size:11px; font-weight:700;">
                        ${initials}
                    </div>
                    <div class="lane-member-details">
                        <span class="lane-member-name" title="${member.name}">${member.name}</span>
                        <span class="lane-member-role">${member.role}</span>
                    </div>
                </div>
                <div class="lane-summary">
                    <span>Số việc đang gánh:</span>
                    <span class="badge ${activeCount > 3 ? 'badge-danger' : activeCount > 0 ? 'badge-warning' : 'badge-success'}">${activeCount} việc</span>
                </div>
                ${quickAssignBtn}
            </div>
            <div class="lane-body">
                ${cardsHtml}
            </div>
        </div>
    `;
}

window.quickAssignToMember = function(memberId, event) {
    if (event) event.stopPropagation();
    elements.taskForm.reset();
    elements.taskId.value = "";
    elements.taskAssignee.value = memberId;
    elements.taskModalTitle.textContent = "Giao việc nhanh cho Nhân viên";
    
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    elements.taskDueDate.value = defaultDate.toISOString().split("T")[0];
    
    openModal("task");
};

// --- NEW UPGRADE FUNCTIONS: TAGS & VIEWOPTIONS & DETAILS ---

function getTagUsageCount(tagId) {
    const projCount = state.projects.filter(p => p.tagIds && p.tagIds.includes(tagId)).length;
    const taskCount = state.tasks.filter(t => t.tagIds && t.tagIds.includes(tagId)).length;
    return projCount + taskCount;
}

function renderTags() {
    const searchVal = elements.tagSearch.value.toLowerCase().trim();
    const filteredTags = state.tags.filter(t => t.name.toLowerCase().includes(searchVal));
    const tagList = elements.tagList;
    
    if (filteredTags.length === 0) {
        tagList.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-tags text-muted"></i>
                <p>Không tìm thấy thẻ nào.</p>
            </div>
        `;
        return;
    }
    
    const isAdmin = state.currentRole === "admin";
    let html = "";
    filteredTags.forEach(tag => {
        const usage = getTagUsageCount(tag.id);
        let adminActions = "";
        if (isAdmin) {
            adminActions = `
                <div class="tag-card-right">
                    <button class="btn-icon-only btn-edit" onclick="editTag('${tag.id}')" title="Sửa thẻ">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icon-only btn-delete" onclick="deleteTag('${tag.id}')" title="Xóa thẻ">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        }
        
        html += `
            <div class="tag-card" style="border-left: 4px solid ${tag.color};">
                <div class="tag-card-left">
                    <span class="tag-pill" style="background-color: ${tag.color}15; color: ${tag.color}; border: 1px solid ${tag.color}30; width: fit-content; font-size:12px; padding:4px 10px; font-weight:600; border-radius:var(--radius-full);">
                        <i class="fa-solid fa-tag"></i> ${tag.name}
                    </span>
                    <span class="tag-usage">Đang dùng cho: <strong>${usage} dự án/công việc</strong></span>
                </div>
                ${adminActions}
            </div>
        `;
    });
    tagList.innerHTML = html;
}

function handleTagSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("tagId").value;
    const name = document.getElementById("tagName").value.trim();
    const color = document.getElementById("tagColor").value;
    
    if (id) {
        // Edit tag
        const idx = state.tags.findIndex(t => t.id === id);
        if (idx !== -1) {
            state.tags[idx] = { ...state.tags[idx], name, color };
            showToast(`Đã cập nhật thẻ: ${name}`, "success");
        }
    } else {
        // Create tag
        const newTag = {
            id: `tag-${Date.now()}`,
            name,
            color
        };
        state.tags.push(newTag);
        showToast(`Đã tạo thẻ mới: ${name}`, "success");
    }
    
    saveToLocalStorage();
    closeAllModals();
    renderTags();
    renderProjects();
    renderTasks();
    renderDashboard();
}

window.editTag = function(id) {
    const tag = state.tags.find(t => t.id === id);
    if (!tag) return;
    
    document.getElementById("tagId").value = tag.id;
    document.getElementById("tagName").value = tag.name;
    document.getElementById("tagColor").value = tag.color;
    document.getElementById("tagModalTitle").textContent = "Chỉnh sửa Thẻ";
    openModal("tag");
};

window.deleteTag = function(id) {
    const tag = state.tags.find(t => t.id === id);
    if (!tag) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa thẻ "${tag.name}"? Thẻ này sẽ được gỡ khỏi tất cả dự án và công việc.`)) {
        return;
    }
    
    state.tags = state.tags.filter(t => t.id !== id);
    
    // Remove tag from projects
    state.projects.forEach(p => {
        if (p.tagIds) {
            p.tagIds = p.tagIds.filter(tid => tid !== id);
        }
    });
    
    // Remove tag from tasks
    state.tasks.forEach(t => {
        if (t.tagIds) {
            t.tagIds = t.tagIds.filter(tid => tid !== id);
        }
    });
    
    saveToLocalStorage();
    showToast(`Đã xóa thẻ "${tag.name}" thành công.`, "success");
    renderTags();
    renderProjects();
    renderTasks();
    renderDashboard();
};

window.openProjectDetail = function(projId) {
    const proj = state.projects.find(p => p.id === projId);
    if (!proj) return;
    
    currentViewingProjectId = projId;
    
    document.getElementById("detailProjName").textContent = proj.name;
    document.getElementById("detailProjDept").querySelector("span").textContent = proj.department || "Không rõ";
    
    let statusText = "Đang triển khai";
    let statusClass = "badge-success";
    if (proj.status === "completed") {
        statusText = "Đã hoàn thành";
        statusClass = "badge-info";
    } else if (proj.status === "on-hold") {
        statusText = "Tạm dừng";
        statusClass = "badge-warning";
    }
    document.getElementById("detailProjStatus").querySelector("span").innerHTML = `<span class="badge ${statusClass}">${statusText}</span>`;
    document.getElementById("detailProjDesc").textContent = proj.desc || "Không có mô tả chi tiết cho dự án này.";
    
    // Render tags list
    const tagsContainer = document.getElementById("detailProjTags");
    tagsContainer.innerHTML = "";
    if (proj.tagIds && proj.tagIds.length > 0) {
        proj.tagIds.forEach(tid => {
            const tag = state.tags.find(t => t.id === tid);
            if (tag) {
                tagsContainer.innerHTML += `
                    <span class="tag-pill" style="background-color: ${tag.color}15; color: ${tag.color}; border: 1px solid ${tag.color}30; padding:3px 8px; font-size:11px;">
                        <i class="fa-solid fa-tag" style="font-size:8px;"></i> ${tag.name}
                    </span>
                `;
            }
        });
    } else {
        tagsContainer.innerHTML = '<span class="text-muted" style="font-size:11px;">Không có thẻ</span>';
    }
    
    // Reset status filter dropdown to "all"
    document.getElementById("filterProjDetailTaskStatus").value = "all";
    
    renderProjDetailTasks();
    openModal("projectDetail");
};

let currentViewingProjectId = null;

function renderProjDetailTasks() {
    if (!currentViewingProjectId) return;
    const statusFilter = document.getElementById("filterProjDetailTaskStatus").value;
    
    // Fetch tasks in project
    let tasks = state.tasks.filter(t => t.projectId === currentViewingProjectId);
    
    // Filter tasks
    if (statusFilter === "working") {
        tasks = tasks.filter(t => t.status !== "completed");
    } else if (statusFilter === "completed") {
        tasks = tasks.filter(t => t.status === "completed");
    }
    
    // Sort tasks
    const sorted = sortTasks(tasks);
    const listContainer = document.getElementById("detailProjTaskList");
    
    if (sorted.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state" style="padding: 20px 10px;">
                <p style="font-size:12px; color:var(--text-muted);">Không có công việc nào trong dự án này.</p>
            </div>
        `;
        return;
    }
    
    let html = "";
    sorted.forEach(task => {
        const member = state.members.find(m => m.id === task.assigneeId);
        
        let statusBadge = "";
        if (task.status === "new") statusBadge = '<span class="badge badge-info">Mới</span>';
        if (task.status === "working") statusBadge = '<span class="badge badge-warning">Đang làm</span>';
        if (task.status === "reviewing") statusBadge = '<span class="badge badge-danger">Chờ duyệt</span>';
        if (task.status === "completed") statusBadge = '<span class="badge badge-success">Xong</span>';
        
        const isOverdue = task.status !== "completed" && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
        
        html += `
            <div class="urgent-item-card" onclick="closeAllModals(); setTimeout(() => openTaskProgressModal('${task.id}'), 150);" style="padding:10px 12px; border-radius:var(--radius-md); background-color:var(--bg-hover); margin-bottom:0; cursor:pointer;">
                <div class="urgent-item-left">
                    <span style="font-weight:600; font-size:13px; color:var(--text-main);">${task.title}</span>
                    <div class="urgent-item-meta" style="margin-top:4px;">
                        <span><i class="fa-solid fa-user" style="font-size:10px;"></i> ${member ? member.name : "Chưa phân công"}</span>
                        <span class="${isOverdue ? 'text-danger' : ''}"><i class="fa-regular fa-calendar-days" style="font-size:10px;"></i> Hạn: ${formatDate(task.dueDate)}</span>
                    </div>
                </div>
                <div class="urgent-item-right" style="gap:8px;">
                    ${statusBadge}
                    <i class="fa-solid fa-chevron-right text-muted" style="font-size:11px;"></i>
                </div>
            </div>
        `;
    });
    listContainer.innerHTML = html;
}

function renderTagSelectorInForm(container, selectedTagIds = []) {
    if (!container) return;
    if (state.tags.length === 0) {
        container.innerHTML = '<span class="text-muted" style="font-size:12px;">Chưa có thẻ nào. Hãy tạo thẻ trong mục Quản lý Thẻ.</span>';
        return;
    }
    
    let html = "";
    state.tags.forEach(tag => {
        const isChecked = selectedTagIds.includes(tag.id) ? "checked" : "";
        html += `
            <label class="tag-selector-item" style="background-color: ${tag.color}15; color: ${tag.color}; border: 1px solid ${tag.color}30; margin-right:4px;">
                <input type="checkbox" value="${tag.id}" ${isChecked}>
                <span>${tag.name}</span>
            </label>
        `;
    });
    container.innerHTML = html;
}

// --- ACCOUNT & LOGIN MANAGEMENT LOGIC ---

async function handleLogin(e) {
    e.preventDefault();
    const username = elements.loginUsername.value.trim().toLowerCase();
    const password = elements.loginPassword.value;
    
    if (!username || !password) {
        showToast("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.", "warning");
        return;
    }
    
    let account = state.accounts.find(acc => acc.username.toLowerCase() === username && acc.password === password);
    if (!account) {
        // If not found locally, fetch latest accounts from the cloud
        showToast("Đang kiểm tra tài khoản từ hệ thống đám mây...", "info");
        try {
            await syncFromCloud(true); // Force sync from cloud immediately
            // Re-check
            account = state.accounts.find(acc => acc.username.toLowerCase() === username && acc.password === password);
        } catch (err) {
            console.error("Cloud sync failed during login check:", err);
        }
    }
    
    if (!account) {
        showToast("Tên đăng nhập hoặc mật khẩu không chính xác.", "danger");
        return;
    }
    
    state.currentUser = account;
    elements.loginUsername.value = "";
    elements.loginPassword.value = "";
    elements.loginOverlay.style.display = "none";
    
    syncUserRoleCompat();
    saveToLocalStorage();
    updateCurrentUserProfile();
    showToast(`Đăng nhập thành công! Chào mừng ${account.fullName}.`, "success");
    renderAll();
    switchView("dashboard");
}

function handleLogout() {
    state.currentUser = null;
    state.currentRole = "guest";
    saveToLocalStorage();
    
    // Show login overlay
    elements.loginOverlay.style.display = "flex";
    
    // Reset inputs
    elements.loginUsername.value = "";
    elements.loginPassword.value = "";
    
    showToast("Đã đăng xuất tài khoản thành công.", "info");
}

function renderAccounts() {
    const searchVal = elements.accountSearch.value.toLowerCase().trim();
    const filtered = state.accounts.filter(acc => {
        return acc.username.toLowerCase().includes(searchVal) ||
               acc.fullName.toLowerCase().includes(searchVal) ||
               (acc.role === "admin" ? "quản trị viên" : "nhân viên").includes(searchVal);
    });
    
    if (filtered.length === 0) {
        elements.accountList.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-user-slash text-muted"></i>
                <p>Không tìm thấy tài khoản nào.</p>
            </div>
        `;
        return;
    }
    
    let html = "";
    filtered.forEach(acc => {
        const isSelf = state.currentUser && state.currentUser.id === acc.id;
        const roleLabel = acc.role === "admin" ? "Quản trị viên" : "Nhân viên";
        const roleBadgeClass = acc.role === "admin" ? "badge-danger" : "badge-info";
        
        const deleteBtn = isSelf ? `
            <button class="btn btn-danger btn-sm" disabled title="Không thể xóa chính tài khoản đang đăng nhập" style="opacity:0.5; cursor:not-allowed;">
                <i class="fa-solid fa-trash"></i> Xóa
            </button>
        ` : `
            <button class="btn btn-danger btn-sm" onclick="deleteAccount('${acc.id}')">
                <i class="fa-solid fa-trash"></i> Xóa
            </button>
        `;
        
        html += `
            <div class="account-card">
                <div class="account-card-header">
                    <span class="account-card-name">${acc.fullName}</span>
                    <span class="badge ${roleBadgeClass}">${roleLabel}</span>
                </div>
                <div class="account-card-body">
                    <span><i class="fa-solid fa-user"></i> Tên đăng nhập: <strong>${acc.username}</strong></span>
                    <span><i class="fa-solid fa-key"></i> Mật khẩu: <strong>${acc.password}</strong></span>
                </div>
                <div class="account-card-footer">
                    <button class="btn btn-secondary btn-sm" onclick="editAccount('${acc.id}')">
                        <i class="fa-solid fa-user-pen"></i> Sửa
                    </button>
                    ${deleteBtn}
                </div>
            </div>
        `;
    });
    elements.accountList.innerHTML = html;
}

function handleAccountSubmit(e) {
    e.preventDefault();
    const id = elements.accountId.value;
    const username = elements.accountUsername.value.trim().toLowerCase();
    const password = elements.accountPassword.value;
    const fullName = elements.accountFullName.value.trim();
    const role = elements.accountRole.value;
    
    if (!username || !password || !fullName || !role) {
        showToast("Vui lòng nhập đầy đủ thông tin tài khoản.", "warning");
        return;
    }
    
    // Check duplication of username
    const isDuplicate = state.accounts.some(acc => acc.id !== id && acc.username.toLowerCase() === username);
    if (isDuplicate) {
        showToast("Tên đăng nhập đã tồn tại trong hệ thống.", "warning");
        return;
    }
    
    if (id) {
        // Edit mode
        const index = state.accounts.findIndex(acc => acc.id === id);
        if (index !== -1) {
            state.accounts[index] = { ...state.accounts[index], username, password, fullName, role };
            
            // Sync current user state if editing self
            if (state.currentUser && state.currentUser.id === id) {
                state.currentUser = state.accounts[index];
                syncUserRoleCompat();
                updateCurrentUserProfile();
            }
            showToast(`Đã cập nhật tài khoản: ${fullName}`, "success");
        }
    } else {
        // Create mode
        const newAcc = {
            id: `acc-${Date.now()}`,
            username,
            password,
            fullName,
            role
        };
        state.accounts.push(newAcc);
        showToast(`Đã tạo tài khoản mới cho: ${fullName}`, "success");
    }
    
    saveToLocalStorage();
    closeAllModals();
    renderAccounts();
}

window.editAccount = function(id) {
    const acc = state.accounts.find(a => a.id === id);
    if (!acc) return;
    
    elements.accountId.value = acc.id;
    elements.accountUsername.value = acc.username;
    elements.accountPassword.value = acc.password;
    elements.accountFullName.value = acc.fullName;
    elements.accountRole.value = acc.role;
    
    elements.accountModalTitle.textContent = "Chỉnh sửa Tài khoản";
    openModal("account");
};

window.deleteAccount = function(id) {
    const acc = state.accounts.find(a => a.id === id);
    if (!acc) return;
    
    if (state.currentUser && state.currentUser.id === id) {
        showToast("Bạn không thể xóa chính tài khoản đang đăng nhập.", "danger");
        return;
    }
    
    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản "${acc.fullName}" (Username: ${acc.username})?`)) {
        return;
    }
    
    state.accounts = state.accounts.filter(a => a.id !== id);
    saveToLocalStorage();
    showToast(`Đã xóa tài khoản "${acc.fullName}" thành công.`, "success");
    renderAccounts();
};

// --- START SYSTEM ---
document.addEventListener("DOMContentLoaded", initApp);
