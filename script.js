// Debounce function with improved performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized smooth scrolling with better performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Use requestAnimationFrame for smooth scrolling
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        }
    });
});

// Optimized header scroll effect with better performance
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY) {
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
    } else {
        header.classList.add('scroll-up');
        header.classList.remove('scroll-down');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

// Use passive event listener for better scroll performance
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
}, { passive: true });

// Optimized lazy loading with better performance
const lazyLoadSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            });
        }
    });
};

const sectionObserver = new IntersectionObserver(lazyLoadSection, {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
});

// Batch DOM reads
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-out');
    sectionObserver.observe(section);
});

// Optimized project filtering with better performance
const filterProjects = (() => {
    const cards = document.querySelectorAll('.project-card');
    const cardStyles = new Map();
    
    // Pre-compute initial styles
    cards.forEach(card => {
        cardStyles.set(card, {
            display: card.style.display,
            opacity: card.style.opacity,
            transform: card.style.transform
        });
    });
    
    return function(category) {
        // Batch DOM updates
        requestAnimationFrame(() => {
            const updates = [];
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    updates.push(() => {
                        card.style.display = 'flex';
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        });
                    });
                } else {
                    updates.push(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    });
                }
            });
            
            // Execute updates in batches
            updates.forEach(update => update());
        });
    };
})();

// Optimized hover effects using CSS classes
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
            card.classList.add('card-hover');
        });
    });
    
    card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            card.classList.remove('card-hover');
        });
    });
});

function getTechIcons(language, repoName) {
    let icons = '';
    if (!language && !repoName) return icons;
    const name = repoName ? repoName.toLowerCase() : '';
    
    // Programming Languages
    if (language === 'JavaScript') icons += '<i class="fab fa-js-square" title="JavaScript"></i>';
    if (language === 'Python') icons += '<i class="fab fa-python" title="Python"></i>';
    if (language === 'Java') icons += '<i class="fab fa-java" title="Java"></i>';
    if (language === 'C++') icons += '<i class="fas fa-code" title="C++"></i>';
    if (language === 'Kotlin') icons += '<i class="fas fa-mobile-alt" title="Kotlin"></i>';
    if (language === 'TypeScript') icons += '<i class="fab fa-js" title="TypeScript"></i>';
    if (language === 'HTML') icons += '<i class="fab fa-html5" title="HTML"></i>';
    if (language === 'CSS') icons += '<i class="fab fa-css3-alt" title="CSS"></i>';
    
    // Frameworks & Technologies
    if (name.includes('react')) icons += '<i class="fab fa-react" title="React"></i>';
    if (name.includes('node')) icons += '<i class="fab fa-node-js" title="Node.js"></i>';
    if (name.includes('express')) icons += '<img src="https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white" alt="Express.js">';
    if (name.includes('postgres')) icons += '<i class="fas fa-database" title="PostgreSQL"></i>';
    if (name.includes('socket')) icons += '<img src="https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io&logoColor=white" alt="Socket.io">';
    if (name.includes('dotnet') || name.includes('.net')) icons += '<img src="https://img.shields.io/badge/.NET-512BD4?style=flat&logo=dotnet&logoColor=white" alt=".NET">';
    if (name.includes('docker')) icons += '<i class="fab fa-docker" title="Docker"></i>';
    if (name.includes('aws')) icons += '<i class="fab fa-aws" title="AWS"></i>';
    if (name.includes('azure')) icons += '<i class="fab fa-microsoft" title="Azure"></i>';
    
    return icons;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': { bg: '#f7df1e', text: '#000000' },
        'Python': { bg: '#3776ab', text: '#ffffff' },
        'Java': { bg: '#007396', text: '#ffffff' },
        'TypeScript': { bg: '#3178c6', text: '#ffffff' },
        'HTML': { bg: '#e34f26', text: '#ffffff' },
        'CSS': { bg: '#1572b6', text: '#ffffff' },
        'Kotlin': { bg: '#7f52ff', text: '#ffffff' },
        'C++': { bg: '#00599c', text: '#ffffff' }
    };
    return colors[language] || { bg: '#6c5ce7', text: '#ffffff' };
}

function getProjectIcon(language, repoName) {
    const name = repoName ? repoName.toLowerCase() : '';
    
    // Default icon based on language
    let icon = '<i class="fas fa-code"></i>';
    
    if (language === 'JavaScript') icon = '<i class="fab fa-js-square"></i>';
    if (language === 'Python') icon = '<i class="fab fa-python"></i>';
    if (language === 'Java') icon = '<i class="fab fa-java"></i>';
    if (language === 'TypeScript') icon = '<i class="fab fa-js"></i>';
    if (language === 'HTML') icon = '<i class="fab fa-html5"></i>';
    if (language === 'CSS') icon = '<i class="fab fa-css3-alt"></i>';
    if (language === 'Kotlin') icon = '<i class="fas fa-mobile-alt"></i>';
    
    // Additional icons based on project name
    if (name.includes('web') || name.includes('frontend')) icon = '<i class="fas fa-globe"></i>';
    if (name.includes('mobile') || name.includes('app')) icon = '<i class="fas fa-mobile-alt"></i>';
    if (name.includes('api') || name.includes('backend')) icon = '<i class="fas fa-server"></i>';
    if (name.includes('security') || name.includes('cyber')) icon = '<i class="fas fa-shield-alt"></i>';
    if (name.includes('data') || name.includes('ml')) icon = '<i class="fas fa-database"></i>';
    if (name.includes('game')) icon = '<i class="fas fa-gamepad"></i>';
    
    return icon;
}

// Optimized GitHub API cache with better performance
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const CACHE_KEY = 'github_repos_cache';

async function fetchGitHubRepos() {
    try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data;
            }
        }
        
        // Fetch new data
        const response = await fetch('https://api.github.com/users/LoGGGG2402/repos?sort=updated&per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repos');
        
        const data = await response.json();
        
        // Cache the new data
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
        
        return data;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

// Optimized rendering with better performance
async function renderGitHubRepos() {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;
    
    try {
        const repos = await fetchGitHubRepos();
        
        // Sort repos by last updated date
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-category', repo.language ? repo.language.toLowerCase() : 'other');
            
            // Build card content
            const languageColors = getLanguageColor(repo.language);
            const lastUpdated = formatDate(repo.updated_at);
            const projectIcon = getProjectIcon(repo.language, repo.name);
            
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-icon">
                        ${projectIcon}
                    </div>
                    <div class="project-tech">
                        <span style="background-color: ${languageColors.bg}; color: ${languageColors.text}">${repo.language || 'Other'}</span>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${repo.name}</h3>
                    <p class="project-description">${repo.description || 'No description available'}</p>
                    <div class="project-stats">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span><i class="fas fa-clock"></i> ${lastUpdated}</span>
                    </div>
                    <div class="project-tech-icons">${getTechIcons(repo.language, repo.name)}</div>
                    <div class="project-links">
                        <a href="${repo.html_url}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" class="project-link demo-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
            
            fragment.appendChild(card);
        });
        
        // Batch DOM update
        requestAnimationFrame(() => {
            grid.innerHTML = '';
            grid.appendChild(fragment);
            filterProjects('all');
        });
    } catch (error) {
        console.error('Error rendering GitHub repos:', error);
        grid.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(renderGitHubRepos);
});

// Contact section animations
const contactItems = document.querySelectorAll('.contact-item');
const socialLinks = document.querySelectorAll('.social-link');

function handleContactHover(e) {
    if (window.innerWidth <= 768) return;
    
    const item = e.currentTarget;
    item.style.transform = 'translateX(5px)';
}

function handleContactLeave(e) {
    if (window.innerWidth <= 768) return;
    
    const item = e.currentTarget;
    item.style.transform = '';
}

function handleSocialHover(e) {
    if (window.innerWidth <= 768) return;
    
    const link = e.currentTarget;
    link.style.transform = 'translateY(-3px)';
}

function handleSocialLeave(e) {
    if (window.innerWidth <= 768) return;
    
    const link = e.currentTarget;
    link.style.transform = '';
}

// Add event listeners with passive option
contactItems.forEach(item => {
    item.addEventListener('mouseenter', handleContactHover, { passive: true });
    item.addEventListener('mouseleave', handleContactLeave, { passive: true });
});

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', handleSocialHover, { passive: true });
    link.addEventListener('mouseleave', handleSocialLeave, { passive: true });
});

// Optimize for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    contactItems.forEach(item => {
        item.style.transition = 'none';
    });
    
    socialLinks.forEach(link => {
        link.style.transition = 'none';
    });
}

// Optimize lazy loading
const lazyLoadOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, lazyLoadOptions);

document.querySelectorAll('img[data-src]').forEach(img => {
    lazyLoadObserver.observe(img);
});

// Add contact section to intersection observer
const contactSection = document.querySelector('.contact');
if (contactSection) {
    sectionObserver.observe(contactSection);
    
    // Animate contact section when it becomes visible
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateContactSection();
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    contactObserver.observe(contactSection);
}

// Optimize hero section animations
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

// Use Intersection Observer for hero section
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate hero content when it becomes visible
            requestAnimationFrame(() => {
                heroContent.classList.add('fade-in');
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

if (heroSection) {
    heroObserver.observe(heroSection);
}

// Optimize tech icons hover effects
const techIcons = document.querySelectorAll('.main-tech-icons i, .main-tech-icons img');

function handleTechIconHover(e) {
    if (window.innerWidth <= 768) return;
    
    const icon = e.currentTarget;
    requestAnimationFrame(() => {
        icon.style.transform = 'translateY(-2px)';
    });
}

function handleTechIconLeave(e) {
    if (window.innerWidth <= 768) return;
    
    const icon = e.currentTarget;
    requestAnimationFrame(() => {
        icon.style.transform = '';
    });
}

// Add event listeners with passive option
techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', handleTechIconHover, { passive: true });
    icon.addEventListener('mouseleave', handleTechIconLeave, { passive: true });
});

// Optimize CTA button hover effect
const ctaButton = document.querySelector('.cta-button');

function handleCtaHover(e) {
    if (window.innerWidth <= 768) return;
    
    const button = e.currentTarget;
    requestAnimationFrame(() => {
        button.style.transform = 'translateY(-3px)';
        button.style.background = 'rgba(255, 255, 255, 0.2)';
    });
}

function handleCtaLeave(e) {
    if (window.innerWidth <= 768) return;
    
    const button = e.currentTarget;
    requestAnimationFrame(() => {
        button.style.transform = '';
        button.style.background = 'rgba(255, 255, 255, 0.1)';
    });
}

if (ctaButton) {
    ctaButton.addEventListener('mouseenter', handleCtaHover, { passive: true });
    ctaButton.addEventListener('mouseleave', handleCtaLeave, { passive: true });
}

// Optimize for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    techIcons.forEach(icon => {
        icon.style.transition = 'none';
    });
    
    if (ctaButton) {
        ctaButton.style.transition = 'none';
    }
}

// Optimize avatar loading
const avatar = document.querySelector('.avatar');
if (avatar) {
    // Preload avatar image
    const preloadImage = new Image();
    preloadImage.src = avatar.src;
    
    // Add loading animation
    avatar.style.opacity = '0';
    preloadImage.onload = () => {
        requestAnimationFrame(() => {
            avatar.style.transition = 'opacity 0.3s ease';
            avatar.style.opacity = '1';
        });
    };
}

// Optimize about section animations
const aboutSection = document.querySelector('.about');
const aboutContent = document.querySelector('.about-content');

// Use Intersection Observer for about section
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate about content when it becomes visible
            requestAnimationFrame(() => {
                aboutContent.classList.add('fade-in');
            });
            aboutObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Optimize hover effects for about section
const aboutItems = document.querySelectorAll('.about-text, .skills, .education-content, .work-content, .exp-content, .courses');
const listItems = document.querySelectorAll('.edu-item, .work-item, .exp-item, .course-list li');

function handleAboutItemHover(e) {
    if (window.innerWidth <= 768) return;
    
    const item = e.currentTarget;
    requestAnimationFrame(() => {
        item.style.transform = 'translateY(-5px)';
    });
}

function handleAboutItemLeave(e) {
    if (window.innerWidth <= 768) return;
    
    const item = e.currentTarget;
    requestAnimationFrame(() => {
        item.style.transform = '';
    });
}

function handleListItemHover(e) {
    if (window.innerWidth <= 768) return;
    
    const item = e.currentTarget;
    requestAnimationFrame(() => {
        item.style.transform = 'translateX(5px)';
    });
}

function handleListItemLeave(e) {
    if (window.innerWidth <= 768) return;
    
    const item = e.currentTarget;
    requestAnimationFrame(() => {
        item.style.transform = '';
    });
}

// Add event listeners with passive option
aboutItems.forEach(item => {
    item.addEventListener('mouseenter', handleAboutItemHover, { passive: true });
    item.addEventListener('mouseleave', handleAboutItemLeave, { passive: true });
});

listItems.forEach(item => {
    item.addEventListener('mouseenter', handleListItemHover, { passive: true });
    item.addEventListener('mouseleave', handleListItemLeave, { passive: true });
});

// Optimize for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    aboutItems.forEach(item => {
        item.style.transition = 'none';
    });
    
    listItems.forEach(item => {
        item.style.transition = 'none';
    });
}

// Optimize text rendering
const aboutTexts = document.querySelectorAll('.about-text p, .skill-category, .edu-item, .work-item, .exp-item, .course-list li');
aboutTexts.forEach(text => {
    text.style.textRendering = 'optimizeLegibility';
});

// Optimize layout shifts
const aboutElements = document.querySelectorAll('.about-text, .skills, .education-content, .work-content, .exp-content, .courses');
aboutElements.forEach(element => {
    element.style.contain = 'layout style paint';
}); 