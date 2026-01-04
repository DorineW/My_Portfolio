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
let videoModalOpen = false;

function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const smallVideo = document.getElementById('smallVideo');
    const largeVideo = document.getElementById('largeVideo');
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    videoModalOpen = true;
    
    // Initialize large video
    if (largeVideo) {
        largeVideo.currentTime = smallVideo ? smallVideo.currentTime : 0;
        largeVideo.muted = false;
        largeVideo.volume = 1.0;
        
        // Try to play with a promise
        const playPromise = largeVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Video play failed, trying with user gesture:", error);
                // Show play button overlay for user interaction
                largeVideo.controls = true;
            });
        }
    }
    
    // Hide the small video overlay when modal is open
    const videoOverlay = document.querySelector('.video-overlay');
    if (videoOverlay) {
        videoOverlay.style.display = 'none';
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const smallVideo = document.getElementById('smallVideo');
    const largeVideo = document.getElementById('largeVideo');
    
    // Hide modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    videoModalOpen = false;
    
    // Pause and reset large video
    if (largeVideo) {
        largeVideo.pause();
        largeVideo.currentTime = 0;
        largeVideo.controls = false;
    }
    
    // Show the small video overlay again
    const videoOverlay = document.querySelector('.video-overlay');
    if (videoOverlay) {
        videoOverlay.style.display = 'flex';
    }
    
    // Restart small video if it was playing
    if (smallVideo) {
        // Only restart if the small video should autoplay
        const playPromise = smallVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.log("Small video autoplay prevented after modal close:", e);
            });
        }
    }
}

// Initialize small video with better autoplay handling
function initVideoPlayback() {
    const smallVideo = document.getElementById('smallVideo');
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (!smallVideo) return;
    
    // Set video attributes for better autoplay
    smallVideo.muted = true;
    smallVideo.playsInline = true;
    smallVideo.preload = "auto";
    
    // Try to play on page load
    const tryPlay = () => {
        const playPromise = smallVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Small video autoplay successful");
                if (videoOverlay) {
                    videoOverlay.style.opacity = '0.5';
                }
            }).catch(error => {
                console.log("Autoplay prevented:", error);
                if (videoOverlay) {
                    videoOverlay.style.opacity = '1';
                    videoOverlay.style.cursor = 'pointer';
                }
            });
        }
    };
    
    // Try after a short delay
    setTimeout(tryPlay, 500);
    
    // Also try when user interacts with page
    document.addEventListener('click', function initVideoOnInteraction() {
        if (smallVideo.paused && !videoModalOpen) {
            const playPromise = smallVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Video started on user interaction");
                    if (videoOverlay) {
                        videoOverlay.style.opacity = '0.5';
                    }
                });
            }
        }
        document.removeEventListener('click', initVideoOnInteraction);
    });
    
    // Handle overlay click to play if video is paused
    if (videoOverlay) {
        videoOverlay.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the project overlay
            if (smallVideo.paused) {
                smallVideo.play().then(() => {
                    videoOverlay.style.opacity = '0.5';
                }).catch(error => {
                    console.log("Could not play video on overlay click:", error);
                    // Fallback to opening modal
                    openVideoModal();
                });
            }
        });
    }
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
        if (event.key === 'Escape' && videoModalOpen) {
            closeVideoModal();
        }
    });
    
    // Handle video ended event in modal
    const largeVideo = document.getElementById('largeVideo');
    if (largeVideo) {
        largeVideo.addEventListener('ended', function() {
            this.currentTime = 0;
        });
    }
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