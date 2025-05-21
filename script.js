// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Get filter value and filter projects
        const filterValue = button.getAttribute('data-filter');
        filterProjects(filterValue);
    });
});

// Add hover effect to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
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

async function renderGitHubRepos() {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;
    
    try {
        const response = await fetch('https://api.github.com/users/LoGGGG2402/repos');
        const repos = await response.json();
        
        // Sort repos by last updated date
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        
        grid.innerHTML = '';
        repos.forEach(repo => {
            // Convert language to lowercase for consistent filtering
            const lang = repo.language ? repo.language.toLowerCase() : 'other';
            const languageColors = getLanguageColor(repo.language);
            const lastUpdated = formatDate(repo.updated_at);
            const stars = repo.stargazers_count;
            const forks = repo.forks_count;
            const projectIcon = getProjectIcon(repo.language, repo.name);
            
            grid.innerHTML += `
                <div class="project-card" data-category="${lang}">
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
                            <span><i class="fas fa-star"></i> ${stars}</span>
                            <span><i class="fas fa-code-branch"></i> ${forks}</span>
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
                </div>
            `;
        });

        // Initialize with 'all' filter
        filterProjects('all');
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        grid.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
    }
}

// Gọi hàm khi trang tải xong
window.addEventListener('DOMContentLoaded', renderGitHubRepos);

// Contact section animations
function animateContactSection() {
    const contactItems = document.querySelectorAll('.contact-item');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Animate contact items with delay
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 * index);
    });
    
    // Animate social links with delay
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 200 * (index + contactItems.length));
    });
}

// Add contact section to intersection observer
const contactSection = document.querySelector('.contact');
if (contactSection) {
    observer.observe(contactSection);
    
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