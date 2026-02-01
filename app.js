/**
 * EduManager - Vanilla JS Core
 * Handles Routing, State, API, and Rendering
 */

// --- CONFIGURATION ---
const API_URL = "https://script.google.com/macros/s/AKfycbxWiEcL1brgnegMUGSTI9tQgEPtVmL4swltM9k5tbuIvai8sJw94QkTw_D4xJHm0t2j/exec";

// --- STATE ---
const state = {
    user: JSON.parse(localStorage.getItem('user')) || null, // { id, email, role, name }
    currentView: 'dashboard',
    data: {
        students: [],
        teachers: [],
        logs: [],
        courses: [
            { name: 'BCS', fullname: 'Bachelor of Computer Science', students: 120, duration: '3 Years' },
            { name: 'B.Sc', fullname: 'Bachelor of Science', students: 90, duration: '3 Years' },
            { name: 'B.Com', fullname: 'Bachelor of Commerce', students: 150, duration: '3 Years' }
        ]
    }
};

// --- API SERVICE ---
async function apiCall(action, payload = {}) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({ action, ...payload })
        });
        return await response.json();
    } catch (e) {
        console.error("API Error", e);
        return { status: 'error', message: 'Network Error' };
    }
}

// --- ROUTER ---
function navigate(view) {
    state.currentView = view;
    render();
}

function init() {
    if (!state.user) {
        renderAuth('login');
    } else {
        render(); // Main App
    }
    lucide.createIcons();
}

// --- RENDERERS ---
function render() {
    if (!state.user) {
        renderAuth('login');
        return;
    }

    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="flex min-h-screen bg-slate-50">
            ${Sidebar()}
            <main class="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                ${Header()}
                <div class="fade-in">
                    ${getContent()}
                </div>
            </main>
        </div>
    `;
    lucide.createIcons();
    attachListeners();
}

function getContent() {
    switch (state.currentView) {
        case 'dashboard': return Dashboard();
        case 'students': return StudentList();
        case 'teachers': return TeacherList();
        case 'courses': return CourseManager();
        case 'logs': return EmailHistory();
        // Add placeholders for others
        default: return `<h2 class="text-2xl font-bold">Coming Soon: ${state.currentView}</h2>`;
    }
}

// --- COMPONENTS ---

const Sidebar = () => `
    <aside class="w-64 bg-white border-r border-slate-100 h-screen fixed left-0 top-0 z-10 flex flex-col">
        <div class="p-6 border-b border-slate-100 flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span class="text-xl font-bold text-slate-800">EduManager</span>
        </div>
        <nav class="flex-1 p-4 space-y-1">
            ${navItem('dashboard', 'layout-dashboard', 'Dashboard')}
            ${navItem('students', 'users', 'Students')}
            ${navItem('teachers', 'graduation-cap', 'Teachers')}
            ${navItem('courses', 'book-open', 'Courses')}
            ${navItem('attendance', 'calendar', 'Attendance')}
            ${navItem('exams', 'file-text', 'Exams & Results')}
            ${navItem('fees', 'credit-card', 'Fees')}
            ${navItem('library', 'library', 'Library')}
            ${navItem('events', 'bell', 'Events')}
            ${navItem('logs', 'mail', 'Email Logs')}
        </nav>
        <div class="p-4 border-t border-slate-100">
            <button onclick="logout()" class="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full transition-colors">
                <i data-lucide="log-out" width="20"></i> <span class="font-medium">Logout</span>
            </button>
        </div>
    </aside>
`;

const navItem = (id, icon, label) => `
    <button onclick="navigate('${id}')" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${state.currentView === id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}">
        <i data-lucide="${icon}" width="20"></i> <span class="font-medium">${label}</span>
    </button>
`;

const Header = () => `
    <header class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-2xl font-bold text-slate-800 capitalize">${state.currentView}</h1>
            <p class="text-slate-500 text-sm">Welcome back, ${state.user.name || 'User'}</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            ${state.user.email.charAt(0).toUpperCase()}
        </div>
    </header>
`;

// --- PAGES ---

const Dashboard = () => `
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        ${StatCard('Total Students', '1,234', 'users', 'text-blue-600 bg-blue-100')}
        ${StatCard('Total Teachers', '56', 'graduation-cap', 'text-purple-600 bg-purple-100')}
        ${StatCard('Pending', '12', 'clock', 'text-orange-600 bg-orange-100')}
        ${StatCard('Emails Sent', '845', 'check-circle', 'text-green-600 bg-green-100')}
    </div>
    <div class="bg-white p-6 rounded-card shadow-sm border border-slate-100">
        <h3 class="font-bold text-lg mb-4">Quick Actions</h3>
         <div class="flex gap-4">
            <button onclick="navigate('students')" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Manage Students</button>
            <button onclick="navigate('logs')" class="px-4 py-2 border border-slate-200 rounded-lg">View Logs</button>
         </div>
    </div>
`;

const StatCard = (label, val, icon, colorClass) => `
    <div class="bg-white p-6 rounded-card shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center ${colorClass}">
            <i data-lucide="${icon}" width="28"></i>
        </div>
        <div>
            <p class="text-slate-500 text-sm font-medium">${label}</p>
            <h4 class="text-2xl font-bold text-slate-800">${val}</h4>
        </div>
    </div>
`;

const StudentList = () => `
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">Student Management</h2>
            <button onclick="alert('Open Modal')" class="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Add Student</button>
        </div>
        <div class="bg-white rounded-card shadow-sm border border-slate-100 overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th class="p-4">Name</th>
                        <th class="p-4">Course</th>
                        <th class="p-4">Status</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <!-- Dummy Data for Now -->
                    ${[1, 2, 3].map(i => `
                    <tr class="hover:bg-slate-50">
                        <td class="p-4 font-medium">Student ${i}</td>
                        <td class="p-4"><span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">BCS</span></td>
                        <td class="p-4"><span class="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">Active</span></td>
                        <td class="p-4 text-right">
                            <button class="text-slate-400 hover:text-blue-600"><i data-lucide="edit-2" width="18"></i></button>
                        </td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
`;

const TeacherList = () => `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${[1, 2].map(i => `
        <div class="bg-white p-6 rounded-card shadow-sm border border-slate-100">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">T</div>
                <div>
                    <h3 class="font-bold">Professor ${i}</h3>
                    <p class="text-sm text-slate-500">Computer Science</p>
                </div>
            </div>
            <p class="text-sm text-slate-500 flex items-center gap-2 mb-2"><i data-lucide="mail" width="16"></i> prof${i}@edu.com</p>
        </div>
        `).join('')}
    </div>
`;

const CourseManager = () => `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${state.data.courses.map(c => `
        <div class="bg-white p-6 rounded-card shadow-sm border border-slate-100">
            <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4"><i data-lucide="book" width="24"></i></div>
            <h3 class="font-bold text-lg">${c.name}</h3>
            <p class="text-slate-500 text-sm mb-4">${c.fullname}</p>
            <div class="flex justify-between text-sm text-slate-600 border-t pt-4">
                <span>${c.students} Students</span>
                <span>${c.duration}</span>
            </div>
        </div>
        `).join('')}
    </div>
`;

const EmailHistory = () => `
    <div class="bg-white rounded-card shadow-sm border border-slate-100 overflow-hidden">
        <div class="p-4 border-b border-slate-100"><h3 class="font-bold">Recent Logs</h3></div>
        <table class="w-full text-left">
            <thead class="bg-slate-50">
                <tr><th class="p-4">Time</th><th class="p-4">To</th><th class="p-4">Subject</th><th class="p-4">Status</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td class="p-4 text-sm text-slate-500">10:00 AM</td>
                    <td class="p-4 font-medium">student@test.com</td>
                    <td class="p-4">Welcome</td>
                    <td class="p-4"><span class="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">Success</span></td>
                </tr>
            </tbody>
        </table>
    </div>
`;

// --- AUTH RENDERER ---
function renderAuth(mode = 'login') {
    const app = document.getElementById('app');

    const formContent = mode === 'login' ? `
        <form onsubmit="handleLogin(event)" class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="email" required class="w-full p-3 border rounded-xl" placeholder="admin@college.edu">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Password</label>
                <input type="password" name="password" required class="w-full p-3 border rounded-xl" placeholder="••••••">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">Sign In</button>
        </form>
        <p class="mt-4 text-center text-sm text-slate-600">
            Need an account? <button onclick="renderAuth('register')" class="text-blue-600 font-bold">Register Student</button>
        </p>
    ` : `
        <form onsubmit="handleRegister(event)" class="space-y-4">
            <div><label class="block text-sm font-medium mb-1">Full Name</label><input type="text" name="name" required class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-medium mb-1">Email</label><input type="email" name="email" required class="w-full p-3 border rounded-xl"></div>
            <div>
                <label class="block text-sm font-medium mb-1">Course</label>
                <select name="course" class="w-full p-3 border rounded-xl bg-white">
                    <option value="BCS">BCS</option><option value="BSC">B.Sc</option><option value="B.COM">B.Com</option>
                </select>
            </div>
            <div><label class="block text-sm font-medium mb-1">Password</label><input type="password" name="password" required class="w-full p-3 border rounded-xl"></div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">Register</button>
        </form>
        <p class="mt-4 text-center text-sm text-slate-600">
            Have an account? <button onclick="renderAuth('login')" class="text-blue-600 font-bold">Sign In</button>
        </p>
    `;

    app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 fade-in">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-slate-800">${mode === 'login' ? 'Welcome Back' : 'Join EduManager'}</h1>
                    <p class="text-slate-500">College Management System</p>
                </div>
                ${formContent}
            </div>
        </div>
    `;
}

// --- ACTIONS ---
async function handleLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const oldText = btn.innerText;
    btn.innerHTML = '<div class="spinner mx-auto"></div>';

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Real API Call
    const res = await apiCall('login', data);

    if (res.status === 'success') {
        state.user = res.user;
        localStorage.setItem('user', JSON.stringify(res.user));
        render();
    } else {
        alert(res.message);
        btn.innerText = oldText;
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = 'Registering...';

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Default dummy data for required backend fields
    data.mobile = "0000000000";
    data.dob = "2000-01-01";
    data.gender = "Not Specified";
    data.address = "Not Specified";
    data.parentContact = "0000000000";

    const res = await apiCall('registerStudent', data);

    if (res.status === 'success') {
        alert("Registration Successful! Please Login.");
        renderAuth('login');
    } else {
        alert(res.message);
        btn.innerText = 'Register';
    }
}

function logout() {
    state.user = null;
    localStorage.removeItem('user');
    renderAuth('login');
}

function attachListeners() {
    // Re-initialize icons
    lucide.createIcons();
}

// --- INIT ---
window.onerror = function (msg, url, lineNo, columnNo, error) {
    document.getElementById('app').innerHTML = `
        <div class="p-4 text-red-600">
            <h1 class="font-bold text-xl">Runtime Error</h1>
            <pre>${msg}</pre>
            <p>Line: ${lineNo}</p>
        </div>
    `;
    return false;
};

try {
    init();
} catch (e) {
    document.getElementById('app').innerHTML = `
        <div class="p-4 text-red-600">
            <h1 class="font-bold text-xl">Init Error</h1>
            <pre>${e.stack}</pre>
        </div>
    `;
}
