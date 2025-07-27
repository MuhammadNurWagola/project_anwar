// ===== GLOBAL VARIABLES =====
let currentUser = null;
let appData = {
    users: [],
    mataPelajaran: [],
    ruangan: [],
    siswa: [],
    jadwal: []
};

// ===== UTILITY FUNCTIONS =====
class Utils {
    // Show loading overlay
    static showLoading() {
        document.getElementById('loadingOverlay').classList.add('active');
    }

    // Hide loading overlay
    static hideLoading() {
        document.getElementById('loadingOverlay').classList.remove('active');
    }

    // Show notification
    static showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const messageElement = notification.querySelector('.notification-message');
        
        messageElement.textContent = message;
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Generate unique ID
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Format date
    static formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Format time
    static formatTime(time) {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Validate email
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Save data to localStorage
    static saveData() {
        localStorage.setItem('eduSchedulerData', JSON.stringify(appData));
        localStorage.setItem('eduSchedulerCurrentUser', JSON.stringify(currentUser));
    }

    // Load data from localStorage
    static loadData() {
        const savedData = localStorage.getItem('eduSchedulerData');
        const savedUser = localStorage.getItem('eduSchedulerCurrentUser');
        
        if (savedData) {
            appData = JSON.parse(savedData);
        } else {
            // Initialize with demo data
            Utils.initializeDemoData();
        }
        
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
        }
    }

    // Initialize demo data
    static initializeDemoData() {
        appData = {
            users: [
                {
                    id: 'admin1',
                    name: 'Administrator',
                    email: 'admin@sekolah.com',
                    password: 'admin123',
                    role: 'admin'
                },
                {
                    id: 'guru1',
                    name: 'Budi Santoso',
                    email: 'guru@sekolah.com',
                    password: 'guru123',
                    role: 'guru'
                },
                {
                    id: 'siswa1',
                    name: 'Andi Pratama',
                    email: 'siswa@sekolah.com',
                    password: 'siswa123',
                    role: 'siswa',
                    kelas: 'XII IPA 1',
                    nis: '2021001'
                }
            ],
            mataPelajaran: [
                {
                    id: 'mp1',
                    kode: 'MAT',
                    nama: 'Matematika',
                    durasi: 120,
                    tingkat: 'XII IPA'
                },
                {
                    id: 'mp2',
                    kode: 'FIS',
                    nama: 'Fisika',
                    durasi: 120,
                    tingkat: 'XII IPA'
                },
                {
                    id: 'mp3',
                    kode: 'KIM',
                    nama: 'Kimia',
                    durasi: 120,
                    tingkat: 'XII IPA'
                },
                {
                    id: 'mp4',
                    kode: 'BIO',
                    nama: 'Biologi',
                    durasi: 120,
                    tingkat: 'XII IPA'
                },
                {
                    id: 'mp5',
                    kode: 'ING',
                    nama: 'Bahasa Inggris',
                    durasi: 120,
                    tingkat: 'XII'
                }
            ],
            ruangan: [
                {
                    id: 'r1',
                    kode: 'R001',
                    nama: 'Ruang Kelas A',
                    kapasitas: 30,
                    lokasi: 'Lantai 1',
                    status: 'aktif'
                },
                {
                    id: 'r2',
                    kode: 'R002',
                    nama: 'Ruang Kelas B',
                    kapasitas: 30,
                    lokasi: 'Lantai 1',
                    status: 'aktif'
                },
                {
                    id: 'r3',
                    kode: 'R003',
                    nama: 'Ruang Kelas C',
                    kapasitas: 35,
                    lokasi: 'Lantai 2',
                    status: 'aktif'
                },
                {
                    id: 'r4',
                    kode: 'LAB1',
                    nama: 'Laboratorium IPA',
                    kapasitas: 25,
                    lokasi: 'Lantai 2',
                    status: 'aktif'
                }
            ],
            siswa: [
                {
                    id: 'siswa1',
                    nis: '2021001',
                    nama: 'Andi Pratama',
                    kelas: 'XII IPA 1',
                    email: 'siswa@sekolah.com'
                },
                {
                    id: 's1',
                    nis: '2021002',
                    nama: 'Budi Setiawan',
                    kelas: 'XII IPA 1',
                    email: 'budi@sekolah.com'
                },
                {
                    id: 's2',
                    nis: '2021003',
                    nama: 'Citra Dewi',
                    kelas: 'XII IPA 1',
                    email: 'citra@sekolah.com'
                },
                {
                    id: 's3',
                    nis: '2021004',
                    nama: 'Dani Kurniawan',
                    kelas: 'XII IPA 2',
                    email: 'dani@sekolah.com'
                },
                {
                    id: 's4',
                    nis: '2021005',
                    nama: 'Eka Sari',
                    kelas: 'XII IPA 2',
                    email: 'eka@sekolah.com'
                }
            ],
            jadwal: []
        };
        Utils.saveData();
    }
}

// ===== MATHEMATICAL CALCULATIONS =====
class MathCalculations {
    // Calculate factorial
    static factorial(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }

    // Calculate combination C(n,r) = n! / (r! * (n-r)!)
    static combination(n, r) {
        if (r > n) return 0;
        if (r === 0 || r === n) return 1;
        
        // Optimize calculation to avoid large numbers
        let result = 1;
        for (let i = 0; i < r; i++) {
            result = result * (n - i) / (i + 1);
        }
        return Math.round(result);
    }

    // Calculate permutation P(n,r) = n! / (n-r)!
    static permutation(n, r) {
        if (r > n) return 0;
        if (r === 0) return 1;
        
        let result = 1;
        for (let i = 0; i < r; i++) {
            result *= (n - i);
        }
        return result;
    }

    // Generate all combinations of array elements
    static generateCombinations(arr, r) {
        const result = [];
        
        function combine(start, combo) {
            if (combo.length === r) {
                result.push([...combo]);
                return;
            }
            
            for (let i = start; i < arr.length; i++) {
                combo.push(arr[i]);
                combine(i + 1, combo);
                combo.pop();
            }
        }
        
        combine(0, []);
        return result;
    }

    // Generate all permutations of array elements
    static generatePermutations(arr) {
        if (arr.length <= 1) return [arr];
        
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
            const perms = this.generatePermutations(rest);
            
            for (const perm of perms) {
                result.push([arr[i], ...perm]);
            }
        }
        return result;
    }

    // Calculate schedule possibilities
    static calculateSchedulePossibilities(mataPelajaran, ruangan, days, sessionsPerDay) {
        const totalSlots = days * sessionsPerDay;
        const totalSubjects = mataPelajaran.length;
        const totalRooms = ruangan.length;
        
        // Combinations: Choose subjects and rooms
        const subjectCombinations = this.combination(totalSubjects, Math.min(totalSubjects, totalSlots));
        const roomCombinations = this.combination(totalRooms, Math.min(totalRooms, totalSlots));
        
        // Permutations: Arrange selected items in time slots
        const timePermutations = this.permutation(totalSlots, Math.min(totalSubjects, totalSlots));
        
        return {
            combinations: subjectCombinations * roomCombinations,
            permutations: timePermutations,
            totalPossibilities: subjectCombinations * roomCombinations * timePermutations
        };
    }
}

// ===== SCHEDULE GENERATOR =====
class ScheduleGenerator {
    static generateSchedule(params) {
        const { startDate, endDate, sessionsPerDay, examDuration, selectedMataPelajaran, selectedRuangan } = params;
        
        // Calculate days between dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        
        // Generate time slots
        const timeSlots = this.generateTimeSlots(days, sessionsPerDay, examDuration, start);
        
        // Generate subject-room combinations
        const combinations = MathCalculations.generateCombinations(
            selectedMataPelajaran.map(mp => ({ type: 'subject', data: mp })), 
            Math.min(selectedMataPelajaran.length, timeSlots.length)
        );
        
        // Generate room assignments
        const roomAssignments = this.assignRooms(combinations[0] || [], selectedRuangan);
        
        // Create schedule
        const schedule = this.createSchedule(timeSlots, roomAssignments);
        
        // Validate for conflicts
        const validatedSchedule = this.validateSchedule(schedule);
        
        return validatedSchedule;
    }

    static generateTimeSlots(days, sessionsPerDay, examDuration, startDate) {
        const slots = [];
        const sessionTimes = this.getSessionTimes(sessionsPerDay, examDuration);
        
        for (let day = 0; day < days; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + day);
            
            // Skip weekends
            if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
                continue;
            }
            
            for (let session = 0; session < sessionsPerDay; session++) {
                slots.push({
                    date: currentDate.toISOString().split('T')[0],
                    session: session + 1,
                    startTime: sessionTimes[session].start,
                    endTime: sessionTimes[session].end,
                    dayName: currentDate.toLocaleDateString('id-ID', { weekday: 'long' })
                });
            }
        }
        
        return slots;
    }

    static getSessionTimes(sessionsPerDay, examDuration) {
        const sessions = [];
        const startHour = 8; // Start at 8 AM
        const breakDuration = 30; // 30 minutes break between sessions
        
        for (let i = 0; i < sessionsPerDay; i++) {
            const startMinutes = startHour * 60 + i * (examDuration + breakDuration);
            const endMinutes = startMinutes + examDuration;
            
            const startTime = this.minutesToTime(startMinutes);
            const endTime = this.minutesToTime(endMinutes);
            
            sessions.push({ start: startTime, end: endTime });
        }
        
        return sessions;
    }

    static minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }

    static assignRooms(subjectCombinations, availableRooms) {
        const assignments = [];
        
        subjectCombinations.forEach((combo, index) => {
            const room = availableRooms[index % availableRooms.length];
            assignments.push({
                subject: combo.data,
                room: room
            });
        });
        
        return assignments;
    }

    static createSchedule(timeSlots, assignments) {
        const schedule = [];
        
        timeSlots.forEach((slot, index) => {
            if (index < assignments.length) {
                const assignment = assignments[index];
                schedule.push({
                    id: Utils.generateId(),
                    tanggal: slot.date,
                    hari: slot.dayName,
                    sesi: slot.session,
                    waktuMulai: slot.startTime,
                    waktuSelesai: slot.endTime,
                    mataPelajaran: assignment.subject,
                    ruangan: assignment.room,
                    kelas: assignment.subject.tingkat,
                    status: 'scheduled'
                });
            }
        });
        
        return schedule;
    }

    static validateSchedule(schedule) {
        // Check for room conflicts
        const roomConflicts = this.checkRoomConflicts(schedule);
        
        // Check for student conflicts (same class, same time)
        const studentConflicts = this.checkStudentConflicts(schedule);
        
        // Mark conflicts
        schedule.forEach(item => {
            item.conflicts = [];
            
            if (roomConflicts.includes(item.id)) {
                item.conflicts.push('room');
                item.status = 'conflict';
            }
            
            if (studentConflicts.includes(item.id)) {
                item.conflicts.push('student');
                item.status = 'conflict';
            }
        });
        
        return schedule;
    }

    static checkRoomConflicts(schedule) {
        const conflicts = [];
        const roomTimeMap = new Map();
        
        schedule.forEach(item => {
            const key = `${item.ruangan.id}-${item.tanggal}-${item.sesi}`;
            
            if (roomTimeMap.has(key)) {
                conflicts.push(item.id);
                conflicts.push(roomTimeMap.get(key));
            } else {
                roomTimeMap.set(key, item.id);
            }
        });
        
        return [...new Set(conflicts)];
    }

    static checkStudentConflicts(schedule) {
        const conflicts = [];
        const classTimeMap = new Map();
        
        schedule.forEach(item => {
            const key = `${item.kelas}-${item.tanggal}-${item.sesi}`;
            
            if (classTimeMap.has(key)) {
                conflicts.push(item.id);
                conflicts.push(classTimeMap.get(key));
            } else {
                classTimeMap.set(key, item.id);
            }
        });
        
        return [...new Set(conflicts)];
    }
}

// ===== AUTHENTICATION =====
class Auth {
    static async login(email, password, role) {
        Utils.showLoading();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = appData.users.find(u => 
            u.email === email && 
            u.password === password && 
            u.role === role
        );
        
        Utils.hideLoading();
        
        if (user) {
            currentUser = user;
            Utils.saveData();
            Utils.showNotification('Login berhasil!', 'success');
            
            // Redirect to dashboard with root-relative path
            setTimeout(() => {
                if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
                    window.location.href = '/dashboard.html';
                } else {
                    window.location.href = 'dashboard.html'; // Fallback for direct file access
                }
            }, 1000);
            
            return true;
        } else {
            Utils.showNotification('Email, password, atau peran tidak valid!', 'error');
            return false;
        }
    }

    static async register(userData) {
        Utils.showLoading();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if email already exists
        const existingUser = appData.users.find(u => u.email === userData.email);
        
        Utils.hideLoading();
        
        if (existingUser) {
            Utils.showNotification('Email sudah terdaftar!', 'error');
            return false;
        }
        
        // Validate email
        if (!Utils.validateEmail(userData.email)) {
            Utils.showNotification('Format email tidak valid!', 'error');
            return false;
        }
        
        // Create new user
        const newUser = {
            id: Utils.generateId(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role
        };
        
        // Add additional fields for student
        if (userData.role === 'siswa') {
            newUser.kelas = userData.kelas;
            newUser.nis = Date.now().toString(); // Generate NIS
            
            // Also add to siswa data
            appData.siswa.push({
                id: newUser.id,
                nis: newUser.nis,
                nama: newUser.name,
                kelas: newUser.kelas,
                email: newUser.email
            });
        }
        
        appData.users.push(newUser);
        Utils.saveData();
        
        Utils.showNotification('Registrasi berhasil! Silakan login.', 'success');
        return true;
    }

    static logout() {
        currentUser = null;
        localStorage.removeItem('eduSchedulerCurrentUser');
        Utils.showNotification('Logout berhasil!', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    static checkAuth() {
        if (!currentUser) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
}

// ===== DASHBOARD MANAGER =====
class DashboardManager {
    static init() {
        if (!Auth.checkAuth()) return;
        
        this.setupSidebar();
        this.setupUserInfo();
        this.setupEventListeners();
        this.loadDashboardContent();
        this.showSection('home');
    }

    static setupSidebar() {
        const sidebarMenu = document.getElementById('sidebarMenu');
        const menuItems = this.getMenuItems(currentUser.role);
        
        sidebarMenu.innerHTML = menuItems.map(item => `
            <li>
                <a href="#" data-section="${item.section}" class="${item.section === 'home' ? 'active' : ''}">
                    <span class="icon">${item.icon}</span>
                    <span>${item.label}</span>
                </a>
            </li>
        `).join('');
    }

    static getMenuItems(role) {
        const commonItems = [
            { section: 'home', icon: '🏠', label: 'Dashboard' }
        ];

        if (role === 'admin' || role === 'guru') {
            return [
                ...commonItems,
                { section: 'dataManagement', icon: '📊', label: 'Manajemen Data' },
                { section: 'scheduleGenerator', icon: '⚙️', label: 'Generator Jadwal' },
                { section: 'scheduleView', icon: '📅', label: 'Lihat Jadwal' }
            ];
        } else if (role === 'siswa') {
            return [
                ...commonItems,
                { section: 'studentSchedule', icon: '📚', label: 'Jadwal Saya' }
            ];
        }

        return commonItems;
    }

    static setupUserInfo() {
        const userInfo = document.getElementById('userInfo');
        userInfo.innerHTML = `
            <h4>${currentUser.name}</h4>
            <p>${this.getRoleLabel(currentUser.role)}</p>
            ${currentUser.kelas ? `<p>Kelas: ${currentUser.kelas}</p>` : ''}
        `;
    }

    static getRoleLabel(role) {
        const labels = {
            'admin': 'Administrator',
            'guru': 'Guru/Panitia Ujian',
            'siswa': 'Siswa'
        };
        return labels[role] || role;
    }

    static setupEventListeners() {
        // Sidebar navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-section]')) {
                e.preventDefault();
                const section = e.target.closest('[data-section]').dataset.section;
                this.showSection(section);
            }
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            Auth.logout();
        });

        // Sidebar toggle for mobile
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });

        // Tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target);
            }
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.id === 'cancelBtn') {
                this.closeModal();
            }
        });

        // Notification close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('notification-close')) {
                document.getElementById('notification').classList.remove('show');
            }
        });
    }

    static showSection(sectionId) {
        // Update active menu
        document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update page title
        const titles = {
            'home': 'Dashboard',
            'dataManagement': 'Manajemen Data',
            'scheduleGenerator': 'Generator Jadwal',
            'scheduleView': 'Jadwal Ujian',
            'studentSchedule': 'Jadwal Saya'
        };

        document.getElementById('pageTitle').textContent = titles[sectionId] || 'Dashboard';

        // Show section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Load section content
        this.loadSectionContent(sectionId);
    }

    static loadSectionContent(sectionId) {
        switch (sectionId) {
            case 'home':
                this.loadHomeContent();
                break;
            case 'dataManagement':
                this.loadDataManagementContent();
                break;
            case 'scheduleGenerator':
                this.loadScheduleGeneratorContent();
                break;
            case 'scheduleView':
                this.loadScheduleViewContent();
                break;
            case 'studentSchedule':
                this.loadStudentScheduleContent();
                break;
        }
    }

    static loadHomeContent() {
        this.loadStats();
        this.loadQuickActions();
    }

    static loadStats() {
        const statsGrid = document.getElementById('statsGrid');
        const stats = this.getStats();

        statsGrid.innerHTML = stats.map(stat => `
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">${stat.title}</span>
                    <span class="stat-card-icon">${stat.icon}</span>
                </div>
                <div class="stat-card-value">${stat.value}</div>
                <div class="stat-card-change ${stat.changeType}">
                    ${stat.change}
                </div>
            </div>
        `).join('');
    }

    static getStats() {
        if (currentUser.role === 'siswa') {
            const studentSchedule = appData.jadwal.filter(j => 
                j.kelas === currentUser.kelas
            );
            
            return [
                {
                    title: 'Total Ujian',
                    icon: '📚',
                    value: studentSchedule.length,
                    change: 'Semester ini',
                    changeType: 'positive'
                },
                {
                    title: 'Ujian Mendatang',
                    icon: '⏰',
                    value: studentSchedule.filter(j => new Date(j.tanggal) > new Date()).length,
                    change: 'Minggu ini',
                    changeType: 'positive'
                },
                {
                    title: 'Ujian Selesai',
                    icon: '✅',
                    value: studentSchedule.filter(j => new Date(j.tanggal) < new Date()).length,
                    change: 'Sudah dilaksanakan',
                    changeType: 'positive'
                }
            ];
        } else {
            return [
                {
                    title: 'Total Mata Pelajaran',
                    icon: '📖',
                    value: appData.mataPelajaran.length,
                    change: '+2 bulan ini',
                    changeType: 'positive'
                },
                {
                    title: 'Total Ruangan',
                    icon: '🏫',
                    value: appData.ruangan.length,
                    change: 'Tersedia',
                    changeType: 'positive'
                },
                {
                    title: 'Total Siswa',
                    icon: '👥',
                    value: appData.siswa.length,
                    change: '+5 bulan ini',
                    changeType: 'positive'
                },
                {
                    title: 'Jadwal Aktif',
                    icon: '📅',
                    value: appData.jadwal.length,
                    change: 'Terjadwal',
                    changeType: 'positive'
                }
            ];
        }
    }

    static loadQuickActions() {
        const actionButtons = document.getElementById('actionButtons');
        const actions = this.getQuickActions();

        actionButtons.innerHTML = actions.map(action => `
            <div class="action-btn" data-action="${action.action}">
                <div class="action-btn-icon">${action.icon}</div>
                <div class="action-btn-content">
                    <h4>${action.title}</h4>
                    <p>${action.description}</p>
                </div>
            </div>
        `).join('');

        // Add event listeners for quick actions
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    static getQuickActions() {
        if (currentUser.role === 'siswa') {
            return [
                {
                    action: 'viewSchedule',
                    icon: '📅',
                    title: 'Lihat Jadwal',
                    description: 'Lihat jadwal ujian Anda'
                },
                {
                    action: 'downloadSchedule',
                    icon: '📄',
                    title: 'Download Jadwal',
                    description: 'Download jadwal dalam format PDF'
                }
            ];
        } else {
            return [
                {
                    action: 'addSubject',
                    icon: '➕',
                    title: 'Tambah Mata Pelajaran',
                    description: 'Tambah mata pelajaran baru'
                },
                {
                    action: 'addRoom',
                    icon: '🏫',
                    title: 'Tambah Ruangan',
                    description: 'Tambah ruangan ujian baru'
                },
                {
                    action: 'generateSchedule',
                    icon: '⚙️',
                    title: 'Generate Jadwal',
                    description: 'Buat jadwal ujian otomatis'
                },
                {
                    action: 'viewReports',
                    icon: '📊',
                    title: 'Lihat Laporan',
                    description: 'Lihat laporan dan statistik'
                }
            ];
        }
    }

    static handleQuickAction(action) {
        switch (action) {
            case 'addSubject':
                this.showSection('dataManagement');
                this.switchTab(document.querySelector('[data-tab="mataPelajaran"]'));
                break;
            case 'addRoom':
                this.showSection('dataManagement');
                this.switchTab(document.querySelector('[data-tab="ruangan"]'));
                break;
            case 'generateSchedule':
                this.showSection('scheduleGenerator');
                break;
            case 'viewSchedule':
                this.showSection('studentSchedule');
                break;
            case 'downloadSchedule':
                this.exportScheduleToPDF();
                break;
            case 'viewReports':
                this.showSection('scheduleView');
                break;
        }
    }

    static switchTab(tabBtn) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        tabBtn.classList.add('active');

        // Show corresponding tab content
        const tabId = tabBtn.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');

        // Load tab data
        this.loadTabData(tabId);
    }

    static loadTabData(tabId) {
        switch (tabId) {
            case 'mataPelajaran':
                this.loadMataPelajaranData();
                break;
            case 'ruangan':
                this.loadRuanganData();
                break;
            case 'siswa':
                this.loadSiswaData();
                break;
        }
    }

    static loadDataManagementContent() {
        this.setupDataManagementEvents();
        this.loadMataPelajaranData();
    }

    static setupDataManagementEvents() {
        // Add buttons
        document.getElementById('addMataPelajaran').addEventListener('click', () => {
            this.showDataModal('mataPelajaran');
        });

        document.getElementById('addRuangan').addEventListener('click', () => {
            this.showDataModal('ruangan');
        });

        document.getElementById('addSiswa').addEventListener('click', () => {
            this.showDataModal('siswa');
        });

        // Search functionality
        document.getElementById('searchMataPelajaran').addEventListener('input', (e) => {
            this.filterTable('mataPelajaran', e.target.value);
        });

        document.getElementById('searchRuangan').addEventListener('input', (e) => {
            this.filterTable('ruangan', e.target.value);
        });

        document.getElementById('searchSiswa').addEventListener('input', (e) => {
            this.filterTable('siswa', e.target.value);
        });
    }

    static loadMataPelajaranData() {
        const tbody = document.getElementById('mataPelajaranTableBody');
        tbody.innerHTML = appData.mataPelajaran.map(mp => `
            <tr>
                <td>${mp.kode}</td>
                <td>${mp.nama}</td>
                <td>${mp.durasi}</td>
                <td>${mp.tingkat}</td>
                <td class="table-actions">
                    <button class="btn btn-secondary" onclick="DashboardManager.editData('mataPelajaran', '${mp.id}')">Edit</button>
                    <button class="btn btn-error" onclick="DashboardManager.deleteData('mataPelajaran', '${mp.id}')">Hapus</button>
                </td>
            </tr>
        `).join('');
    }

    static loadRuanganData() {
        const tbody = document.getElementById('ruanganTableBody');
        tbody.innerHTML = appData.ruangan.map(r => `
            <tr>
                <td>${r.kode}</td>
                <td>${r.nama}</td>
                <td>${r.kapasitas}</td>
                <td>${r.lokasi}</td>
                <td><span class="status-badge ${r.status}">${r.status}</span></td>
                <td class="table-actions">
                    <button class="btn btn-secondary" onclick="DashboardManager.editData('ruangan', '${r.id}')">Edit</button>
                    <button class="btn btn-error" onclick="DashboardManager.deleteData('ruangan', '${r.id}')">Hapus</button>
                </td>
            </tr>
        `).join('');
    }

    static loadSiswaData() {
        const tbody = document.getElementById('siswaTableBody');
        tbody.innerHTML = appData.siswa.map(s => `
            <tr>
                <td>${s.nis}</td>
                <td>${s.nama}</td>
                <td>${s.kelas}</td>
                <td>${s.email}</td>
                <td class="table-actions">
                    <button class="btn btn-secondary" onclick="DashboardManager.editData('siswa', '${s.id}')">Edit</button>
                    <button class="btn btn-error" onclick="DashboardManager.deleteData('siswa', '${s.id}')">Hapus</button>
                </td>
            </tr>
        `).join('');
    }

    static showDataModal(type, data = null) {
        const modal = document.getElementById('dataModal');
        const modalTitle = document.getElementById('modalTitle');
        const formFields = document.getElementById('formFields');

        modalTitle.textContent = data ? `Edit ${this.getTypeLabel(type)}` : `Tambah ${this.getTypeLabel(type)}`;

        // Generate form fields based on type
        formFields.innerHTML = this.generateFormFields(type, data);

        modal.classList.add('active');

        // Setup form submission
        document.getElementById('dataForm').onsubmit = (e) => {
            e.preventDefault();
            this.saveData(type, data);
        };
    }

    static getTypeLabel(type) {
        const labels = {
            'mataPelajaran': 'Mata Pelajaran',
            'ruangan': 'Ruangan',
            'siswa': 'Siswa'
        };
        return labels[type] || type;
    }

    static generateFormFields(type, data) {
        switch (type) {
            case 'mataPelajaran':
                return `
                    <div class="input-group">
                        <label for="kode">Kode Mata Pelajaran</label>
                        <input type="text" id="kode" name="kode" value="${data?.kode || ''}" required>
                    </div>
                    <div class="input-group">
                        <label for="nama">Nama Mata Pelajaran</label>
                        <input type="text" id="nama" name="nama" value="${data?.nama || ''}" required>
                    </div>
                    <div class="input-group">
                        <label for="durasi">Durasi (Menit)</label>
                        <input type="number" id="durasi" name="durasi" value="${data?.durasi || 120}" min="60" max="240" required>
                    </div>
                    <div class="input-group">
                        <label for="tingkat">Tingkat</label>
                        <select id="tingkat" name="tingkat" required>
                            <option value="">Pilih Tingkat</option>
                            <option value="X" ${data?.tingkat === 'X' ? 'selected' : ''}>X</option>
                            <option value="XI" ${data?.tingkat === 'XI' ? 'selected' : ''}>XI</option>
                            <option value="XII" ${data?.tingkat === 'XII' ? 'selected' : ''}>XII</option>
                            <option value="XII IPA" ${data?.tingkat === 'XII IPA' ? 'selected' : ''}>XII IPA</option>
                            <option value="XII IPS" ${data?.tingkat === 'XII IPS' ? 'selected' : ''}>XII IPS</option>
                        </select>
                    </div>
                `;

            case 'ruangan':
                return `
                    <div class="input-group">
                        <label for="kode">Kode Ruangan</label>
                        <input type="text" id="kode" name="kode" value="${data?.kode || ''}" required>
                    </div>
                    <div class="input-group">
                        <label for="nama">Nama Ruangan</label>
                        <input type="text" id="nama" name="nama" value="${data?.nama || ''}" required>
                    </div>
                    <div class="input-group">
                        <label for="kapasitas">Kapasitas</label>
                        <input type="number" id="kapasitas" name="kapasitas" value="${data?.kapasitas || 30}" min="1" required>
                    </div>
                    <div class="input-group">
                        <label for="lokasi">Lokasi</label>
                        <input type="text" id="lokasi" name="lokasi" value="${data?.lokasi || ''}" required>
                    </div>
                    <div class="input-group">
                        <label for="status">Status</label>
                        <select id="status" name="status" required>
                            <option value="aktif" ${data?.status === 'aktif' ? 'selected' : ''}>Aktif</option>
                            <option value="maintenance" ${data?.status === 'maintenance' ? 'selected' : ''}>Maintenance</option>
                            <option value="nonaktif" ${data?.status === 'nonaktif' ? 'selected' : ''}>Non-aktif</option>
                        </select>
                    </div>
                `;

            case 'siswa':
                return `
                    <div class="input-group">
                        <label for="nis">NIS</label>
                        <input type="text" id="nis" name="nis" value="${data?.nis || ''}" required>
                    </div>
                    <div class="input-group">
                        <label for="nama">Nama Siswa</label>
                        <input type="text" id="nama" name="nama" value="${data?.nama || ''}" required>
                    </div>
                    <div class="input-group">
                        <label for="kelas">Kelas</label>
                        <select id="kelas" name="kelas" required>
                            <option value="">Pilih Kelas</option>
                            <option value="X IPA 1" ${data?.kelas === 'X IPA 1' ? 'selected' : ''}>X IPA 1</option>
                            <option value="X IPA 2" ${data?.kelas === 'X IPA 2' ? 'selected' : ''}>X IPA 2</option>
                            <option value="XI IPA 1" ${data?.kelas === 'XI IPA 1' ? 'selected' : ''}>XI IPA 1</option>
                            <option value="XI IPA 2" ${data?.kelas === 'XI IPA 2' ? 'selected' : ''}>XI IPA 2</option>
                            <option value="XII IPA 1" ${data?.kelas === 'XII IPA 1' ? 'selected' : ''}>XII IPA 1</option>
                            <option value="XII IPA 2" ${data?.kelas === 'XII IPA 2' ? 'selected' : ''}>XII IPA 2</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="${data?.email || ''}" required>
                    </div>
                `;

            default:
                return '';
        }
    }

    static async saveData(type, existingData) {
        const form = document.getElementById('dataForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        Utils.showLoading();

        try {
            if (existingData) {
                // Update existing data
                const index = appData[type].findIndex(item => item.id === existingData.id);
                if (index !== -1) {
                    appData[type][index] = { ...existingData, ...data };
                }
            } else {
                // Add new data
                const newItem = {
                    id: Utils.generateId(),
                    ...data
                };

                // Convert numeric fields
                if (type === 'mataPelajaran') {
                    newItem.durasi = parseInt(newItem.durasi);
                } else if (type === 'ruangan') {
                    newItem.kapasitas = parseInt(newItem.kapasitas);
                }

                appData[type].push(newItem);
            }

            Utils.saveData();
            Utils.hideLoading();
            this.closeModal();
            this.loadTabData(type);
            Utils.showNotification(`${this.getTypeLabel(type)} berhasil disimpan!`, 'success');

        } catch (error) {
            Utils.hideLoading();
            Utils.showNotification('Terjadi kesalahan saat menyimpan data!', 'error');
        }
    }

    static editData(type, id) {
        const data = appData[type].find(item => item.id === id);
        if (data) {
            this.showDataModal(type, data);
        }
    }

    static deleteData(type, id) {
        if (confirm(`Apakah Anda yakin ingin menghapus ${this.getTypeLabel(type)} ini?`)) {
            const index = appData[type].findIndex(item => item.id === id);
            if (index !== -1) {
                appData[type].splice(index, 1);
                Utils.saveData();
                this.loadTabData(type);
                Utils.showNotification(`${this.getTypeLabel(type)} berhasil dihapus!`, 'success');
            }
        }
    }

    static filterTable(type, searchTerm) {
        const tbody = document.getElementById(`${type}TableBody`);
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const matches = text.includes(searchTerm.toLowerCase());
            row.style.display = matches ? '' : 'none';
        });
    }

    static closeModal() {
        document.getElementById('dataModal').classList.remove('active');
    }

    static loadScheduleGeneratorContent() {
        this.setupScheduleGeneratorEvents();
        this.loadSelectedItems();
        this.updateCalculations();
    }

    static setupScheduleGeneratorEvents() {
        // Generate schedule button
        document.getElementById('generateSchedule').addEventListener('click', () => {
            this.generateSchedule();
        });

        // Reset button
        document.getElementById('resetGenerator').addEventListener('click', () => {
            this.resetGenerator();
        });

        // Parameter change listeners
        ['startDate', 'endDate', 'sessionsPerDay', 'examDuration'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.updateCalculations();
            });
        });
    }

    static loadSelectedItems() {
        // Load mata pelajaran
        const selectedMataPelajaran = document.getElementById('selectedMataPelajaran');
        selectedMataPelajaran.innerHTML = appData.mataPelajaran.map(mp => `
            <div class="selection-item">
                <span>${mp.nama} (${mp.kode})</span>
                <span class="remove" onclick="this.parentElement.remove(); DashboardManager.updateCalculations();">&times;</span>
            </div>
        `).join('');

        // Load ruangan
        const selectedRuangan = document.getElementById('selectedRuangan');
        selectedRuangan.innerHTML = appData.ruangan.filter(r => r.status === 'aktif').map(r => `
            <div class="selection-item">
                <span>${r.nama} (${r.kode})</span>
                <span class="remove" onclick="this.parentElement.remove(); DashboardManager.updateCalculations();">&times;</span>
            </div>
        `).join('');
    }

    static updateCalculations() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const sessionsPerDay = parseInt(document.getElementById('sessionsPerDay').value);

        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        // Filter weekdays only
        let weekdays = 0;
        for (let i = 0; i < days; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                weekdays++;
            }
        }

        const totalSlots = weekdays * sessionsPerDay;
        const selectedSubjects = document.querySelectorAll('#selectedMataPelajaran .selection-item').length;
        const selectedRooms = document.querySelectorAll('#selectedRuangan .selection-item').length;

        const calculations = MathCalculations.calculateSchedulePossibilities(
            Array(selectedSubjects).fill({}),
            Array(selectedRooms).fill({}),
            weekdays,
            sessionsPerDay
        );

        document.getElementById('totalCombinations').textContent = calculations.combinations.toLocaleString();
        document.getElementById('totalPermutations').textContent = calculations.permutations.toLocaleString();
        document.getElementById('possibleSchedules').textContent = Math.min(calculations.totalPossibilities, 1000000).toLocaleString();
    }

    static async generateSchedule() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const sessionsPerDay = parseInt(document.getElementById('sessionsPerDay').value);
        const examDuration = parseInt(document.getElementById('examDuration').value);

        if (!startDate || !endDate) {
            Utils.showNotification('Harap isi tanggal mulai dan selesai!', 'error');
            return;
        }

        const selectedMataPelajaran = appData.mataPelajaran;
        const selectedRuangan = appData.ruangan.filter(r => r.status === 'aktif');

        if (selectedMataPelajaran.length === 0 || selectedRuangan.length === 0) {
            Utils.showNotification('Harap pilih mata pelajaran dan ruangan!', 'error');
            return;
        }

        Utils.showLoading();

        try {
            const schedule = ScheduleGenerator.generateSchedule({
                startDate,
                endDate,
                sessionsPerDay,
                examDuration,
                selectedMataPelajaran,
                selectedRuangan
            });

            appData.jadwal = schedule;
            Utils.saveData();

            Utils.hideLoading();
            Utils.showNotification(`Jadwal berhasil dibuat! ${schedule.length} sesi ujian terjadwal.`, 'success');

            // Switch to schedule view
            setTimeout(() => {
                this.showSection('scheduleView');
            }, 1500);

        } catch (error) {
            Utils.hideLoading();
            Utils.showNotification('Terjadi kesalahan saat membuat jadwal!', 'error');
            console.error(error);
        }
    }

    static resetGenerator() {
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('sessionsPerDay').value = '2';
        document.getElementById('examDuration').value = '120';
        this.updateCalculations();
    }

    static loadScheduleViewContent() {
        this.setupScheduleViewEvents();
        this.loadScheduleTable();
    }

    static setupScheduleViewEvents() {
        // View toggle buttons
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchScheduleView(e.target.dataset.view);
            });
        });

        // Export and print buttons
        document.getElementById('exportPDF').addEventListener('click', () => {
            this.exportScheduleToPDF();
        });

        document.getElementById('printSchedule').addEventListener('click', () => {
            this.printSchedule();
        });
    }

    static loadScheduleTable() {
        const tbody = document.getElementById('scheduleTableBody');
        tbody.innerHTML = appData.jadwal.map(jadwal => `
            <tr class="${jadwal.status === 'conflict' ? 'conflict' : ''}">
                <td>${Utils.formatDate(jadwal.tanggal)}</td>
                <td>Sesi ${jadwal.sesi}</td>
                <td>${Utils.formatTime(jadwal.waktuMulai)} - ${Utils.formatTime(jadwal.waktuSelesai)}</td>
                <td>${jadwal.mataPelajaran.nama}</td>
                <td>${jadwal.ruangan.nama}</td>
                <td>${jadwal.kelas}</td>
                <td><span class="status-badge ${jadwal.status}">${jadwal.status}</span></td>
            </tr>
        `).join('');
    }

    static switchScheduleView(view) {
        // Update active button
        document.querySelectorAll('[data-view]').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Show corresponding view
        document.querySelectorAll('.schedule-display').forEach(display => {
            display.classList.remove('active');
        });
        document.getElementById(`${view}View`).classList.add('active');

        if (view === 'calendar') {
            this.loadCalendarView();
        }
    }

    static loadCalendarView() {
        // Implementation for calendar view
        const calendarGrid = document.getElementById('calendarGrid');
        // Calendar implementation would go here
        calendarGrid.innerHTML = '<p>Tampilan kalender akan segera tersedia</p>';
    }

    static exportScheduleToPDF() {
        Utils.showNotification('Fitur export PDF akan segera tersedia!', 'info');
    }

    static printSchedule() {
        window.print();
    }

    static loadStudentScheduleContent() {
        this.loadStudentInfo();
        this.loadUpcomingExams();
        this.loadStudentCalendar();
    }

    static loadStudentInfo() {
        const studentInfo = document.getElementById('studentInfo');
        studentInfo.innerHTML = `
            <div class="student-profile">
                <h3>${currentUser.name}</h3>
                <p><strong>NIS:</strong> ${currentUser.nis}</p>
                <p><strong>Kelas:</strong> ${currentUser.kelas}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
            </div>
        `;
    }

    static loadUpcomingExams() {
        const upcomingExams = document.getElementById('upcomingExams');
        const studentSchedule = appData.jadwal.filter(j => 
            j.kelas === currentUser.kelas && 
            new Date(j.tanggal) >= new Date()
        ).sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

        upcomingExams.innerHTML = studentSchedule.slice(0, 5).map(exam => `
            <div class="exam-card">
                <div class="exam-card-header">
                    <div class="exam-card-title">${exam.mataPelajaran.nama}</div>
                    <div class="exam-card-date">${Utils.formatDate(exam.tanggal)}</div>
                </div>
                <div class="exam-card-details">
                    <span>Sesi ${exam.sesi}</span>
                    <span>${exam.ruangan.nama}</span>
                    <span>${Utils.formatTime(exam.waktuMulai)}</span>
                </div>
            </div>
        `).join('');
    }

    static loadStudentCalendar() {
        const studentCalendar = document.getElementById('studentCalendar');
        // Mini calendar implementation would go here
        studentCalendar.innerHTML = '<p>Kalender mini akan segera tersedia</p>';
    }

    static loadDashboardContent() {
        // Set default date for schedule generator
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        if (document.getElementById('startDate')) {
            document.getElementById('startDate').value = today.toISOString().split('T')[0];
            document.getElementById('endDate').value = nextWeek.toISOString().split('T')[0];
        }
    }
}

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    Utils.loadData();

    // Check which page we're on
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'dashboard.html' || currentPage === '') {
        // Dashboard page
        DashboardManager.init();
    } else {
        // Login page
        initLoginPage();
    }
});

function initLoginPage() {
    // Auth form switching
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginForm').classList.remove('active');
        document.getElementById('registerForm').classList.add('active');
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('registerForm').classList.remove('active');
        document.getElementById('loginForm').classList.add('active');
    });

    // Show/hide class field based on role
    document.getElementById('registerRole').addEventListener('change', (e) => {
        const kelasGroup = document.getElementById('kelasGroup');
        if (e.target.value === 'siswa') {
            kelasGroup.style.display = 'block';
            document.getElementById('registerKelas').required = true;
        } else {
            kelasGroup.style.display = 'none';
            document.getElementById('registerKelas').required = false;
        }
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const role = document.getElementById('loginRole').value;

        const loginBtn = e.target.querySelector('button[type="submit"]');
        loginBtn.classList.add('loading');

        await Auth.login(email, password, role);
        
        loginBtn.classList.remove('loading');
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());

        const registerBtn = e.target.querySelector('button[type="submit"]');
        registerBtn.classList.add('loading');

        const success = await Auth.register(userData);
        
        registerBtn.classList.remove('loading');

        if (success) {
            // Switch to login form
            document.getElementById('registerForm').classList.remove('active');
            document.getElementById('loginForm').classList.add('active');
            
            // Clear form
            e.target.reset();
        }
    });

    // Close notification
    document.querySelector('.notification-close').addEventListener('click', () => {
        document.getElementById('notification').classList.remove('show');
    });
}

// ===== GLOBAL FUNCTIONS (for onclick handlers) =====
window.DashboardManager = DashboardManager;