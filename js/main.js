document.addEventListener('DOMContentLoaded', function() {

    // --- Theme Toggle (Light/Dark Mode) with System Preference Detection ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    function checkSystemPreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = checkSystemPreference();
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('theme')) {
            const newTheme = event.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });

    // --- Mobile Sidebar Toggle ---
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
        if (!item.getAttribute('href').startsWith('#')) {
             item.addEventListener('click', closeSidebar);
        }
    });

    // --- LOGIC FOR HOME PAGE (index.html) ---
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer && typeof postsData !== 'undefined') {
        postsData.forEach((post, index) => {
            const postElement = document.createElement('a');
            
            // *** UPDATED LINE ***
            // The link now points to the posts folder
            postElement.href = `/post.html?id=${index}`; 
            
            postElement.classList.add('post-item');

            postElement.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.excerpt}</p>
                <time>${post.date}</time>
            `;

            postsContainer.appendChild(postElement);
        });
    }

    // --- LOGIC FOR POST PAGE (posts/post.html) ---
    const postContentArea = document.getElementById('post-content-area');
    if (postContentArea && typeof postsData !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        
        const post = postsData[postId];

        if (post) {
            document.title = `${post.title} //offseckalki`;
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-date').textContent = post.date;
            document.getElementById('post-body').innerHTML = post.content;
        } else {
            document.getElementById('post-title').textContent = "Error: Post not found";
            document.getElementById('post-body').innerHTML = "<p>The requested post could not be found. Please check the URL or return to the <a href='../index.html'>home page</a>.</p>";
        }
    }

});
