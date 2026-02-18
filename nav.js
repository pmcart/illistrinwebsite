// Shared navigation and footer for all pages
// Update links here once and they apply site-wide

document.addEventListener('DOMContentLoaded', function () {

    // Inject nav styles (hamburger, dropdowns, mobile)
    const style = document.createElement('style');
    style.textContent = `
        /* Hamburger */
        .hamburger {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
        }
        .hamburger span {
            display: block;
            width: 25px;
            height: 3px;
            background: #ffd700;
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 6px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -6px);
        }

        /* Dropdowns - Desktop */
        .nav-dropdown {
            position: relative;
        }
        .nav-dropdown > a {
            cursor: pointer;
        }
        .nav-dropdown > a::after {
            content: " \\25BE";
            font-size: 0.7rem;
        }
        .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            min-width: 220px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            list-style: none;
            padding: 0.5rem 0;
            z-index: 1002;
        }
        .nav-dropdown:hover .dropdown-menu,
        .nav-dropdown.touch-open .dropdown-menu {
            display: block;
        }
        .dropdown-menu li {
            border-bottom: none !important;
        }
        .dropdown-menu a {
            display: block;
            padding: 0.7rem 1.5rem !important;
            color: white !important;
            text-decoration: none;
            white-space: nowrap;
            transition: all 0.2s ease;
            border-radius: 0 !important;
        }
        .dropdown-menu a:hover {
            background: rgba(255, 215, 0, 0.15) !important;
            color: #ffd700 !important;
            transform: none !important;
        }

        /* Override page-level overflow:hidden on header so menus can appear */
        header {
            overflow: visible !important;
        }

        /* Mobile */
        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }
            .nav-links {
                display: none !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                padding: 0.5rem 0;
                gap: 0 !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1000;
            }
            .nav-links.open {
                display: flex !important;
            }
            .nav-links > li {
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            .nav-links > li:last-child {
                border-bottom: none;
            }
            .nav-links > li > a {
                display: block;
                padding: 0.8rem 1.5rem !important;
                border-radius: 0 !important;
            }

            /* Mobile dropdowns - inline expand */
            .dropdown-menu {
                position: static;
                box-shadow: none;
                min-width: 0;
                border-radius: 0;
                background: rgba(0,0,0,0.2);
                padding: 0;
            }
            .nav-dropdown .dropdown-menu {
                display: none;
            }
            .nav-dropdown.touch-open .dropdown-menu {
                display: block;
            }
            .nav-dropdown:hover .dropdown-menu {
                display: none;
            }
            .nav-dropdown.touch-open .dropdown-menu {
                display: block;
            }
            .dropdown-menu a {
                padding: 0.7rem 2.5rem !important;
                font-size: 0.95rem;
            }
        }
    `;
    document.head.appendChild(style);

    // Inject header
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `
            <div class="header-accent"></div>
            <nav>
                <a href="index.html" class="logo">Illistrin FC</a>
                <button class="hamburger" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li class="nav-dropdown">
                        <a href="#">The Club</a>
                        <ul class="dropdown-menu">
                            <li><a href="blog.html">Club Stories</a></li>
                            <li><a href="media.html">In the Media</a></li>
                            <li><a href="teams.html">Teams - 2026</a></li>
                        </ul>
                    </li>
                    <li class="nav-dropdown">
                        <a href="#">Club Info</a>
                        <ul class="dropdown-menu">
                            <li><a href="policies.html">Policies and Procedures</a></li>
                            <li><a href="safeguarding.html">Safeguarding</a></li>
                            <li><a href="supporting.html">Supporting the Club</a></li>
                        </ul>
                    </li>
                    <li><a href="contacts.html">Contacts</a></li>
                </ul>
            </nav>
        `;

        // Hamburger toggle
        const hamburger = header.querySelector('.hamburger');
        const navLinks = header.querySelector('.nav-links');
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Dropdown toggle for touch/mobile
        header.querySelectorAll('.nav-dropdown > a').forEach(function (toggle) {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                var parent = this.parentElement;
                // Close other open dropdowns
                header.querySelectorAll('.nav-dropdown').forEach(function (dd) {
                    if (dd !== parent) dd.classList.remove('touch-open');
                });
                parent.classList.toggle('touch-open');
            });
        });

        // Close menu when a sub-link is tapped
        header.querySelectorAll('.dropdown-menu a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                header.querySelectorAll('.nav-dropdown').forEach(function (dd) {
                    dd.classList.remove('touch-open');
                });
            });
        });

        // Close menu when a top-level non-dropdown link is tapped
        navLinks.querySelectorAll(':scope > li:not(.nav-dropdown) > a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function (e) {
            if (!header.contains(e.target)) {
                header.querySelectorAll('.nav-dropdown').forEach(function (dd) {
                    dd.classList.remove('touch-open');
                });
            }
        });
    }

    // Inject footer
    var footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-links">
                    <a href="safeguarding.html">Safeguarding</a>
                    <a href="#downloads">Downloads</a>
                    <a href="#links">Useful Links</a>
                    <a href="#privacy">Privacy Policy</a>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Illistrin FC - All rights reserved</p>
                    <p>Proudly serving the football community in Donegal, Ireland</p>
                </div>
            </div>
        `;
    }
});
