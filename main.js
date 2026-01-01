// WAG Portal - Main JavaScript File
// Handles all interactive functionality and animations

class WAGPortal {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupMobileNavigation();
    }

    init() {
        // Initialize application state
        this.isSidebarCollapsed = false;
        this.currentUser = {
            name: 'John Smith',
            role: 'Senior Engineer',
            avatar: null
        };
        
        // Mock data for dashboard
        this.dashboardData = {
            officeUpdates: 3,
            pendingRequests: 5,
            todaySessions: 2,
            newKnowledge: 7,
            reservations: 4,
            wellbeingIndex: 'Good'
        };

        // Initialize modules
        this.initializeModules();
    }

    setupEventListeners() {
        // Sidebar toggle functionality
        const sidebarToggle = document.getElementById('sidebarToggle');
        const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        if (mobileSidebarToggle) {
            mobileSidebarToggle.addEventListener('click', () => this.toggleMobileSidebar());
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024 && !sidebar.contains(e.target) && !mobileSidebarToggle.contains(e.target)) {
                sidebar.classList.add('sidebar-collapsed');
                sidebar.classList.remove('sidebar-expanded');
            }
        });

        // Dashboard card interactions
        this.setupDashboardCards();

        // Module-specific event listeners
        this.setupModuleEventListeners();
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        
        if (this.isSidebarCollapsed) {
            sidebar.style.transform = 'translateX(-100%)';
            mainContent.style.marginLeft = '0';
        } else {
            sidebar.style.transform = 'translateX(0)';
            mainContent.style.marginLeft = '16rem';
        }
    }

    toggleMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        
        if (sidebar.classList.contains('sidebar-collapsed')) {
            sidebar.classList.remove('sidebar-collapsed');
            sidebar.classList.add('sidebar-expanded');
        } else {
            sidebar.classList.add('sidebar-collapsed');
            sidebar.classList.remove('sidebar-expanded');
        }
    }

    setupDashboardCards() {
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        
        dashboardCards.forEach(card => {
            const buttons = card.querySelectorAll('button');
            
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cardTitle = card.querySelector('h3').textContent;
                    this.handleCardAction(cardTitle, button);
                });
            });
        });
    }

    handleCardAction(cardTitle, button) {
        // Animate button click
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });

        // Route to appropriate module based on card
        setTimeout(() => {
            switch(cardTitle) {
                case 'Office Updates':
                    window.location.href = 'office-updates.html';
                    break;
                case 'Employee Hub':
                    window.location.href = 'employee-hub.html';
                    break;
                case 'Program Calendar':
                    window.location.href = 'program-calendar.html';
                    break;
                case 'Tech Knowledge':
                    window.location.href = 'tech-knowledge.html';
                    break;
                case 'Shared Facilities':
                    window.location.href = 'shared-facilities.html';
                    break;
                case 'Wellbeing':
                    window.location.href = 'wellbeing.html';
                    break;
                default:
                    this.showNotification('Feature coming soon!', 'info');
            }
        }, 200);
    }

    initializeAnimations() {
        // Animate dashboard cards on load
        anime({
            targets: '.dashboard-card',
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuart'
        });

        // Animate status badges
        anime({
            targets: '.status-badge',
            scale: [0.8, 1],
            opacity: [0, 1],
            delay: anime.stagger(150, {start: 800}),
            duration: 400,
            easing: 'easeOutBack'
        });

        // Animate recent activity items
        anime({
            targets: '.recent-activity-item',
            translateX: [-20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100, {start: 1200}),
            duration: 500,
            easing: 'easeOutQuart'
        });
    }

    setupMobileNavigation() {
        // Mobile navigation active state management
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        mobileNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.remove('text-gray-500');
                link.classList.add('text-gray-800');
            }
        });
    }

    initializeModules() {
        // Initialize module-specific functionality
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        switch(currentPage) {
            case 'index.html':
            case '':
                this.initializeDashboard();
                break;
            case 'office-updates.html':
                this.initializeOfficeUpdates();
                break;
            case 'employee-hub.html':
                this.initializeEmployeeHub();
                break;
            case 'program-calendar.html':
                this.initializeProgramCalendar();
                break;
            case 'tech-knowledge.html':
                this.initializeTechKnowledge();
                break;
            case 'shared-facilities.html':
                this.initializeSharedFacilities();
                break;
            case 'wellbeing.html':
                this.initializeWellbeing();
                break;
        }
    }

    initializeDashboard() {
        // Update dashboard counters with animation
        this.animateCounters();
        
        // Setup real-time updates simulation
        setInterval(() => {
            this.updateDashboardData();
        }, 30000); // Update every 30 seconds
    }

    animateCounters() {
        const counters = document.querySelectorAll('.status-badge');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const number = parseInt(text.match(/\d+/));
            
            if (number) {
                anime({
                    targets: counter,
                    innerHTML: [0, number],
                    duration: 1000,
                    round: 1,
                    easing: 'easeOutQuart',
                    update: function(anim) {
                        counter.innerHTML = text.replace(/\d+/, Math.round(anim.animatables[0].target.innerHTML));
                    }
                });
            }
        });
    }

    updateDashboardData() {
        // Simulate real-time data updates
        const updates = [
            { element: '.status-badge', key: 'officeUpdates', value: Math.floor(Math.random() * 10) },
            { element: '.status-badge', key: 'pendingRequests', value: Math.floor(Math.random() * 15) },
            { element: '.status-badge', key: 'todaySessions', value: Math.floor(Math.random() * 8) }
        ];

        updates.forEach(update => {
            const elements = document.querySelectorAll(update.element);
            elements.forEach(el => {
                if (el.textContent.includes(update.key)) {
                    el.textContent = `${update.value} New`;
                }
            });
        });
    }

    // Office Updates Module
    initializeOfficeUpdates() {
        this.setupTabs('office-updates');
        this.setupFormHandlers('office-updates');
        this.setupViewToggle();
    }

    // Employee Hub Module
    initializeEmployeeHub() {
        this.setupTabs('employee-hub');
        this.setupFormHandlers('employee-hub');
        this.setupRequestTracking();
    }

    // Program Calendar Module
    initializeProgramCalendar() {
        this.setupTabs('program-calendar');
        this.setupCalendarView();
        this.setupEventHandlers();
    }

    // Tech Knowledge Module
    initializeTechKnowledge() {
        this.setupTabs('tech-knowledge');
        this.setupKnowledgeCategories();
        this.setupSearchAndFilter();
    }

    // Shared Facilities Module
    initializeSharedFacilities() {
        this.setupTabs('shared-facilities');
        this.setupReservationSystem();
        this.setupFacilityCalendar();
    }

    // Wellbeing Module
    initializeWellbeing() {
        this.setupTabs('wellbeing');
        this.setupEnvironmentalMonitoring();
        this.setupCharts();
    }

    setupTabs(moduleName) {
        const tabButtons = document.querySelectorAll(`[data-module="${moduleName}"] .tab-button`);
        const tabContents = document.querySelectorAll(`[data-module="${moduleName}"] .tab-content`);

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Update active tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.add('hidden'));
                
                button.classList.add('active');
                document.getElementById(targetTab).classList.remove('hidden');
                
                // Animate tab transition
                anime({
                    targets: `#${targetTab}`,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
        });
    }

    setupFormHandlers(moduleName) {
        const forms = document.querySelectorAll(`[data-module="${moduleName}"] form`);
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form, moduleName);
            });
        });
    }

    handleFormSubmission(form, moduleName) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Form submitted successfully!', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Add to local storage for demo
            this.saveFormData(data, moduleName);
        }, 1500);
    }

    setupViewToggle() {
        const toggleButtons = document.querySelectorAll('.view-toggle');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetView = button.dataset.view;
                const container = document.querySelector(button.dataset.target);
                
                // Toggle between grid and list views
                if (targetView === 'grid') {
                    container.classList.remove('list-view');
                    container.classList.add('grid-view');
                } else {
                    container.classList.remove('grid-view');
                    container.classList.add('list-view');
                }
                
                // Update active button
                button.parentElement.querySelectorAll('.view-toggle').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            });
        });
    }

    setupCalendarView() {
        // Initialize calendar functionality
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            this.renderCalendar();
        }
    }

    renderCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // Simple calendar rendering (in a real app, use a calendar library)
        calendarContainer.innerHTML = `
            <div class="calendar-header flex justify-between items-center mb-4">
                <button class="prev-month p-2 hover:bg-gray-100 rounded">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h3 class="text-lg font-semibold">${currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                <button class="next-month p-2 hover:bg-gray-100 rounded">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="calendar-grid grid grid-cols-7 gap-1">
                ${this.generateCalendarDays(currentYear, currentMonth)}
            </div>
        `;
    }

    generateCalendarDays(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        let days = '';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days += '<div class="calendar-day empty"></div>';
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === new Date().getDate() && month === new Date().getMonth();
            const hasEvents = Math.random() > 0.7; // Random events for demo
            
            days += `
                <div class="calendar-day p-2 text-center cursor-pointer hover:bg-gray-100 rounded ${isToday ? 'bg-blue-100 text-blue-600' : ''} ${hasEvents ? 'font-semibold' : ''}" 
                     data-day="${day}">
                    ${day}
                    ${hasEvents ? '<div class="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>' : ''}
                </div>
            `;
        }
        
        return days;
    }

    setupEnvironmentalMonitoring() {
        // Initialize environmental monitoring charts
        this.initializeWellbeingCharts();
    }

    initializeWellbeingCharts() {
        // Initialize ECharts for environmental data
        const chartContainers = document.querySelectorAll('[data-chart]');
        
        chartContainers.forEach(container => {
            const chartType = container.dataset.chart;
            const chart = echarts.init(container);
            
            const option = this.getChartOption(chartType);
            chart.setOption(option);
            
            // Make chart responsive
            window.addEventListener('resize', () => {
                chart.resize();
            });
        });
    }

    getChartOption(chartType) {
        const baseOption = {
            backgroundColor: 'transparent',
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                axisLine: { lineStyle: { color: '#E2E8F0' } },
                axisTick: { show: false },
                axisLabel: { color: '#64748B' }
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#64748B' },
                splitLine: { lineStyle: { color: '#F1F5F9' } }
            },
            series: [{
                data: this.generateMockData(chartType),
                type: 'line',
                smooth: true,
                lineStyle: { color: '#3B82F6', width: 3 },
                itemStyle: { color: '#3B82F6' },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
                        ]
                    }
                }
            }]
        };
        
        return baseOption;
    }

    generateMockData(chartType) {
        const dataRanges = {
            temperature: [18, 24],
            humidity: [40, 70],
            co2: [400, 1000],
            noise: [35, 55],
            light: [300, 800],
            power: [5, 25]
        };
        
        const range = dataRanges[chartType] || [0, 100];
        const data = [];
        
        for (let i = 0; i < 6; i++) {
            data.push(Math.floor(Math.random() * (range[1] - range[0])) + range[0]);
        }
        
        return data;
    }

    setupModuleEventListeners() {
        // Setup module-specific event listeners
        this.setupModalHandlers();
        this.setupSearchHandlers();
        this.setupFilterHandlers();
    }

    setupModalHandlers() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.dataset.modal;
                this.showModal(modalId);
            });
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Animate modal appearance
            anime({
                targets: modal.querySelector('.modal-content'),
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutBack'
            });
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            anime({
                targets: modal.querySelector('.modal-content'),
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 200,
                easing: 'easeInQuart',
                complete: () => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }
            });
        }
    }

    setupSearchHandlers() {
        const searchInputs = document.querySelectorAll('.search-input');
        
        searchInputs.forEach(input => {
            let searchTimeout;
            
            input.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value, input.dataset.searchType);
                }, 300);
            });
        });
    }

    performSearch(query, searchType) {
        // Simulate search functionality
        console.log(`Searching for "${query}" in ${searchType}`);
        
        // Update search results with animation
        const resultsContainer = document.querySelector(`[data-search-results="${searchType}"]`);
        if (resultsContainer) {
            anime({
                targets: resultsContainer,
                opacity: [1, 0.5, 1],
                duration: 400,
                easing: 'easeInOutQuart'
            });
        }
    }

    setupFilterHandlers() {
        const filterButtons = document.querySelectorAll('.filter-button');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterType = button.dataset.filter;
                const filterValue = button.dataset.value;
                
                // Update active filter
                button.parentElement.querySelectorAll('.filter-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Apply filter
                this.applyFilter(filterType, filterValue);
            });
        });
    }

    applyFilter(filterType, filterValue) {
        const items = document.querySelectorAll(`[data-filter-type="${filterType}"]`);
        
        items.forEach(item => {
            const itemValue = item.dataset.filterValue;
            
            if (filterValue === 'all' || itemValue === filterValue) {
                item.style.display = 'block';
                anime({
                    targets: item,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            } else {
                anime({
                    targets: item,
                    opacity: [1, 0],
                    translateY: [0, -20],
                    duration: 200,
                    easing: 'easeInQuart',
                    complete: () => {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${this.getNotificationClass(type)}`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate notification appearance
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutQuart'
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    notification.remove();
                }
            });
        }, 5000);
    }

    getNotificationClass(type) {
        const classes = {
            success: 'bg-green-100 text-green-800 border border-green-200',
            error: 'bg-red-100 text-red-800 border border-red-200',
            warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            info: 'bg-blue-100 text-blue-800 border border-blue-200'
        };
        return classes[type] || classes.info;
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    saveFormData(data, moduleName) {
        // Save form data to localStorage for demo purposes
        const existingData = JSON.parse(localStorage.getItem(`${moduleName}_data`) || '[]');
        existingData.push({
            ...data,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(`${moduleName}_data`, JSON.stringify(existingData));
    }

    loadFormData(moduleName) {
        // Load form data from localStorage
        return JSON.parse(localStorage.getItem(`${moduleName}_data`) || '[]');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wagPortal = new WAGPortal();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    if (window.wagPortal) {
        // Reinitialize charts on resize
        if (window.wagPortal.initializeWellbeingCharts) {
            window.wagPortal.initializeWellbeingCharts();
        }
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WAGPortal;
}