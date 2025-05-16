document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    } else {
        // Use system preference if no theme is stored
        if (prefersDarkScheme.matches) {
            document.body.setAttribute('data-theme', 'dark');
        }
    }
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', function() {
        let theme;
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            theme = 'light';
            themeToggle.innerHTML = '<span class="material-icons">dark_mode</span>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            theme = 'dark';
            themeToggle.innerHTML = '<span class="material-icons">light_mode</span>';
        }
        localStorage.setItem('theme', theme);
    });
    
    // Update icon based on current theme
    if (document.body.getAttribute('data-theme') === 'dark') {
        themeToggle.innerHTML = '<span class="material-icons">light_mode</span>';
    }
    
    // Back button functionality
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.history.back();
    });
    
    // Add scroll animation
    const policyItems = document.querySelectorAll('.policy-section');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );
    
    policyItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});
