document.addEventListener('DOMContentLoaded', function() {

    // --- Theme Toggle (Light/Dark Mode) with System Preference Detection ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    function checkSystemPreference() {
        // Check if the user has a system preference for dark mode
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Determine the initial theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = checkSystemPreference();
    
    // Priority: 1. Saved theme, 2. System preference, 3. Default to light
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);


    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // Listen for changes in system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Only change if the user hasn't manually set a theme
        if (!localStorage.getItem('theme')) {
            const newTheme = event.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });


    // --- Mobile Sidebar Toggle ---
    // This code remains the same and will work on all pages
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    const closeSidebar = () => {
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    };
    
    if(mainContent) mainContent.addEventListener('click', closeSidebar);
    document.querySelectorAll('.nav-item').forEach(item => {
        // Check if it's a link to another page before adding the close listener
        if (item.getAttribute('href').startsWith('#')) {
            item.addEventListener('click', closeSidebar);
        }
    });

    // --- Post Rendering ---
    // This will only run on the Home Page (index.html)
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer && typeof postsData !== 'undefined') {
        postsData.forEach(post => {
            const postElement = document.createElement('a');
            postElement.href = '#'; 
            postElement.classList.add('post-item');

            postElement.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.excerpt}</p>
                <time>${post.date}</time>
            `;

            postsContainer.appendChild(postElement);
        });
    }

});
