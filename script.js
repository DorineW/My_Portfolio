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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(243, 233, 220, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'var(--glass)';
        nav.style.backdropFilter = 'blur(10px)';
    }
});

// Animate skill bars on scroll
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width') + '%';
                skillBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Typing animation for hero text
function initTypingAnimation() {
    const text = "Data Analyst & Developer";
    const element = document.querySelector('.typing-animation');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Glitch effect enhancement
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch-1 0.3s infinite linear alternate-reverse';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = '';
        });
    });
}

// Scan effect for buttons
function initScanEffects() {
    const scanButtons = document.querySelectorAll('.scan-effect');
    
    scanButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const scanLine = button.querySelector('.scan-line');
            scanLine.style.animation = 'none';
            void scanLine.offsetWidth; // Trigger reflow
            scanLine.style.animation = null;
        });
    });
}

// Floating particles background (simplified)
function initFloatingParticles() {
    const particlesContainer = document.querySelector('.animated-bg');
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--emerald);
            border-radius: 50%;
            opacity: 0.3;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${10 + Math.random() * 20}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg); opacity: 0.1; }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
}

// Video Modal Functions
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const smallVideo = document.getElementById('smallVideo');
    const largeVideo = document.getElementById('largeVideo');
    
    // Pause small video
    if (smallVideo) {
        smallVideo.pause();
    }
    
    // Show modal and play large video
    modal.style.display = 'flex';
    if (smallVideo && largeVideo) {
        largeVideo.currentTime = smallVideo.currentTime;
    }
    
    // Try to play the large video
    if (largeVideo) {
        const playPromise = largeVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }
    }
    
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const smallVideo = document.getElementById('smallVideo');
    const largeVideo = document.getElementById('largeVideo');
    
    // Pause large video and resume small video
    if (largeVideo) {
        largeVideo.pause();
        largeVideo.currentTime = 0; // Reset to beginning
    }
    
    // Resume small video
    if (smallVideo) {
        const playPromise = smallVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Small video autoplay prevented:", error);
            });
        }
    }
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize small video with user interaction
function initVideoPlayback() {
    const smallVideo = document.getElementById('smallVideo');
    const playOverlay = document.querySelector('.video-overlay');
    
    if (!smallVideo) return;
    
    // Try to autoplay on page load
    smallVideo.muted = true;
    
    // Try to play with a small delay after page load
    setTimeout(() => {
        const playPromise = smallVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented, waiting for user interaction");
                // Show play button overlay
                if (playOverlay) {
                    playOverlay.style.opacity = '1';
                }
            });
        }
    }, 1000);
    
    // Play on user interaction
    document.addEventListener('click', function firstClick() {
        if (smallVideo.paused) {
            const playPromise = smallVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Video started playing after user interaction");
                }).catch(e => {
                    console.log("Still cannot play:", e);
                });
            }
        }
        // Remove this listener after first interaction
        document.removeEventListener('click', firstClick);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start existing animations
    setTimeout(initTypingAnimation, 800);
    setTimeout(animateSkills, 1000);
    
    // Initialize effects
    initGlitchEffect();
    initScanEffects();
    initFloatingParticles();
    
    // Initialize video
    initVideoPlayback();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const videoModal = document.getElementById('videoModal');
        if (event.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeVideoModal();
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .contact-item, .about-text, .skills-preview, .skill-category, .certification-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Re-initialize any responsive elements if needed
});