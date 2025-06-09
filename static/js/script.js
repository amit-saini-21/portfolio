// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const scrollTopBtn = document.getElementById('scroll-top');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const contactForm = document.getElementById('contact-form');

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Custom Cursor
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

let cometMouseX = 0;
let cometMouseY = 0;
let cometPrevX = 0;
let cometPrevY = 0;

const cometColors = [
  'rgba(236, 206, 151, 0.93)',  // Neon Blue
  'rgba(250, 84, 236, 0.7)',  // Magenta
  'rgba(94, 238, 226, 0.8)', // Violet
  'rgba(130, 30, 224, 0.74)', // Deep Pink
];

let cometColorIndex = 0;

function createCometTrail(x, y) {
    const count = 10; // more bubbles = denser trail

    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-trail-dot');

        const offsetX = (Math.random() - 0.5) * 30; // random spread
        const offsetY = (Math.random() - 0.5) * 30;

        dot.style.left = `${x + offsetX}px`;
        dot.style.top = `${y + offsetY}px`;

        const size = 8 + Math.random() * 10;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;

        const color = cometColors[cometColorIndex % cometColors.length];
        dot.style.background = color;
        dot.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;

        cometColorIndex++;
        document.body.appendChild(dot);

        setTimeout(() => {
            dot.remove();
        }, 2200);
    }
}

document.addEventListener('mousemove', (e) => {
   cometMouseX = e.clientX;
    cometMouseY = e.clientY;
     //createCometTrail(mouseX, mouseY);
});
function animateCometTrail() {
    const dx = cometMouseX - cometPrevX;
    const dy = cometMouseY - cometPrevY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 4) {  // if mouse moved significantly
        createCometTrail(cometMouseX, cometMouseY);
        cometPrevX = cometMouseX;
        cometPrevY = cometMouseY;
    }

    requestAnimationFrame(animateCometTrail);
}
animateCometTrail(); // Start loop

function animateCursor() {
    const speed = 0.1;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursorFollower.style.left = cursorX + 'px';
    cursorFollower.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-chip, .certificate-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.9)';
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}
createParticles();

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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.glass-card, .skill-chip, .certificate-card, .project-card, .timeline-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Certificate Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        certificateCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
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
    });
});

// Contact Form
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch("/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert("Something went wrong.");
            }
        } catch (err) {
            alert("Error sending message.");
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});


// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation after page load
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = "Hi, I'm Amit Saini — I Build Tech That Speaks the Future.";
        // typeWriter(heroTitle, titleText, 50);
    }
}, 2500);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Skills Animation
function animateSkills() {
    const skillChips = document.querySelectorAll('.skill-chip');
    
    skillChips.forEach((chip, index) => {
        setTimeout(() => {
            chip.style.opacity = '1';
            chip.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Trigger skills animation when section is visible
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// Certificate Card Flip Animation
document.querySelectorAll('.certificate-card').forEach(card => {
    let isFlipped = false;
    
    card.addEventListener('click', () => {
        if (!isFlipped) {
            card.querySelector('.card-front').style.transform = 'rotateY(180deg)';
            card.querySelector('.card-back').style.transform = 'rotateY(0deg)';
            isFlipped = true;
        } else {
            card.querySelector('.card-front').style.transform = 'rotateY(0deg)';
            card.querySelector('.card-back').style.transform = 'rotateY(180deg)';
            isFlipped = false;
        }
    });
});

// Add glow effect to buttons on hover
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.6)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
    });
});

// Dynamic background color change based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const minHue = 70; // Blue
const maxHue = 320; // Pinkish Purple
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const easedScroll = easeInOutQuad(scrollPercent / 100);
const hue = minHue + (scrollPercent / 100) * (maxHue - minHue);
    
    document.documentElement.style.setProperty('--primary-color', `hsl(${hue}, 70%, 60%)`);
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
  if (img.complete) {
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  } else {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    });
  }
});


// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.6);
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add stagger animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add hover sound effect (optional)
    const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    
    // Preload and setup audio (commented out to avoid autoplay issues)
    // hoverSound.volume = 0.1;
    
    console.log('🚀 Portfolio loaded successfully!');
    console.log('✨ All animations and effects initialized');
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Existing scroll logic here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);