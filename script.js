document.addEventListener('DOMContentLoaded', function() {
    // Initialize SVG gradient (must be added dynamically for Firefox compatibility)
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.visibility = "hidden";
    
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradient.setAttribute("id", "logo-gradient");
    linearGradient.setAttribute("x1", "0%");
    linearGradient.setAttribute("y1", "0%");
    linearGradient.setAttribute("x2", "100%");
    linearGradient.setAttribute("y2", "100%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#2196F3");
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#1565C0");
    
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const mobileThemeToggle = document.getElementById('nav-theme');
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = 'light_mode';
        if (mobileThemeToggle) {
            mobileThemeToggle.querySelector('.material-symbols-rounded').textContent = 'light_mode';
        }
    }
    
    function toggleTheme() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = 'dark_mode';
            if (mobileThemeToggle) {
                mobileThemeToggle.querySelector('.material-symbols-rounded').textContent = 'dark_mode';
            }
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = 'light_mode';
            if (mobileThemeToggle) {
                mobileThemeToggle.querySelector('.material-symbols-rounded').textContent = 'light_mode';
            }
        }
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // Back Button Functionality
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', function() {
        window.history.back();
    });

    // Generate Table of Contents
    function generateTOC() {
        const tocList = document.getElementById('toc-list');
        const mobileTocList = document.getElementById('mobile-toc-list');
        const sections = document.querySelectorAll('.policy-section');
        
        sections.forEach((section) => {
            const id = section.getAttribute('id');
            const title = section.querySelector('h3').textContent;
            
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = title;
            listItem.appendChild(link);
            
            if (tocList) tocList.appendChild(listItem.cloneNode(true));
            if (mobileTocList) mobileTocList.appendChild(listItem);
        });
    }
    
    generateTOC();

    // Mobile TOC Toggle
    const mobileTocToggle = document.getElementById('mobile-toc-toggle');
    const mobileToc = document.querySelector('.mobile-toc');
    
    if (mobileTocToggle && mobileToc) {
        mobileTocToggle.addEventListener('click', function() {
            mobileToc.classList.toggle('expanded');
        });
    }

    // Mobile Navigation
    const navToc = document.getElementById('nav-toc');
    const navTop = document.getElementById('nav-top');
    
    if (navToc) {
        navToc.addEventListener('click', function() {
            mobileToc.classList.toggle('expanded');
            // Scroll to mobile TOC if it's not in view
            mobileToc.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    if (navTop) {
        navTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Active TOC Highlighting
    const tocLinks = document.querySelectorAll('.toc-nav a');
    const sections = document.querySelectorAll('.policy-section');
    
    function highlightTOC() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightTOC);
    
    // Initial call to set active state
    highlightTOC();

    // Section animations on scroll
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
    
    document.querySelectorAll('.policy-section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile TOC if open
                if (mobileToc && mobileToc.classList.contains('expanded')) {
                    mobileToc.classList.remove('expanded');
                }
                
                // Scroll with offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
