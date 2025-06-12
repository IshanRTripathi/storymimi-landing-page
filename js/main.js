// StoryMimi Landing Page JavaScript

// Load YAML configuration (simulated for now, would be fetched in a real app)
const config = {
    assets: {
        images: {
            hero_app_screenshot: 'images/app-hero.png',
            feature_ai: 'images/feature-ai.png',
            feature_personalization: 'images/feature-personalization.png',
            feature_accessibility: 'images/feature-accessibility.png',
            feature_narration: 'images/feature-narration.png',
            demo_personalized_story: 'images/demo-child-story.png',
            demo_normal_story: 'images/demo-normal-story.png',
            testimonial_1: 'images/testimonial-1.jpg',
            testimonial_2: 'images/testimonial-2.jpg',
            testimonial_3: 'images/testimonial-3.jpg'
        },
        audio: {
            background_music: 'audio/background.mp3',
            demo_personalized_narration: 'audio/demo-narration.mp3',
            demo_normal_narration: 'audio/demo-normal-narration.mp3'
        }
    }
};

// Function to set audio volumes
function setAudioVolumes() {
    try {
        // Get audio elements
        const backgroundAudio = document.getElementById('backgroundAudio');
        const demoAudioPersonalized = document.getElementById('demoAudioPersonalized');
        const demoAudioNormal = document.getElementById('demoAudioNormal');

        // Helper function to set volume with error checks
        function setVolume(audioElement, volume, name) {
            if (!audioElement) {
                console.warn(`${name} audio element not found.`);
                return;
            }

            // Check if the audio has a valid source
            const source = audioElement.querySelector('source');
            if (!source || !source.src) {
                console.warn(`${name} audio source is missing or invalid.`);
                return;
            }

            // Set volume safely
            audioElement.volume = volume;
            console.log(`${name} volume set to ${volume * 100}%`);
        }

        setVolume(backgroundAudio, 0.3, 'Background');
        setVolume(demoAudioPersonalized, 0.5, 'Demo Personalized');
        setVolume(demoAudioNormal, 0.5, 'Demo Normal');
    } catch (error) {
        console.error('Error setting audio volumes:', error);
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setAudioVolumes();
});

// Run again after all assets are fully loaded
window.addEventListener('load', () => {
    setAudioVolumes();
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting initialization...');
    
    try {
        // Initialize components
        initAudioControlsWithErrorHandling();
        initAccessibilityControls();
        initPersonalizationDemo();
        initAccessibilityDemo();
        initWaitlistForm();
        initButtonAnimations();
        initFAQAccordion();
        initModal();
        initMagneticButton();
        loadSections();
        
        console.log('All components initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Section list for loading
const sections = [
    'hero',
    'problem',
    'transformation',
    'social-proof',
    'features',
    'pricing',
    'testimonials',
    'faq'
];

// Load sections in parallel with detailed error handling
Promise.all(sections.map(section => {
        return fetch(`sections/${section}.html`)
            .then(response => {
                console.log(`Loading section: ${section}`);
                if (!response.ok) {
                    console.error(`Failed to load ${section}: ${response.status} ${response.statusText}`);
                    return Promise.resolve('');
                }
                return response.text();
            })
            .then(html => {
                const sectionElement = document.getElementById(`${section}-section`);
                if (!sectionElement) {
                    console.error(`Section container not found for ${section}`);
                    return;
                }
                
                if (html) {
                    sectionElement.innerHTML = html;
                    console.log(`Successfully loaded ${section}`);
                } else {
                    console.warn(`Empty content for ${section}`);
                }
            })
            .catch(error => {
                console.error(`Error loading ${section}:`, error);
                return '';
            });
    })).then(() => {
        console.log('All sections loaded');
        
        // Ensure styles are applied
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .section-container {
                width: 100%;
                min-height: 100vh;
                padding: 2rem;
                box-sizing: border-box;
                background: var(--white);
            }
            
            .section-container section {
                width: 100%;
                max-width: 1600px;
                margin: 0 auto;
                padding: 80px 0;
            }
            
            /* Basic visibility styles */
            body {
                margin: 0;
                padding: 0;
                font-family: var(--font-secondary);
                color: var(--gray-900);
                line-height: 1.6;
            }
            
            /* Ensure sections are visible */
            section {
                display: block;
                visibility: visible;
                opacity: 1;
            }
        `;
        document.head.appendChild(styleElement);
        
        // Reinitialize components after sections are loaded
        try {
            initAudioControls();
            initAccessibilityControls();
            initPersonalizationDemo();
            initAccessibilityDemo();
            initWaitlistForm();
            console.log('Components reinitialized after section load');
        } catch (error) {
            console.error('Error reinitializing components:', error);
        }
    })
    .catch(error => {
        console.error('Error in section loading process:', error);
    });


// Add error handling to initialization functions
function initAudioControls() {
    try {
        console.log('Initializing audio controls...');
        const audioToggle = document.getElementById('audioToggle');
        const backgroundAudio = document.getElementById('backgroundAudio');
        
        if (audioToggle && backgroundAudio) {
            audioToggle.addEventListener('click', () => {
                backgroundAudio.muted = !backgroundAudio.muted;
                audioToggle.classList.toggle('active');
            });
            console.log('Audio controls initialized');
        } else {
            console.warn('Audio controls not found');
        }
    } catch (error) {
        console.error('Error in initAudioControls:', error);
    }
}

// Initialize functions
function initAudioControls() {
    const audioToggle = document.getElementById('audioToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');
    
    if (audioToggle && backgroundAudio) {
        audioToggle.addEventListener('click', () => {
            backgroundAudio.muted = !backgroundAudio.muted;
            audioToggle.classList.toggle('active');
        });
    }
}

function initAccessibilityControls() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    
    if (accessibilityToggle && accessibilityPanel) {
        accessibilityToggle.addEventListener('click', () => {
            accessibilityPanel.classList.toggle('active');
        });
    }
}

function initBackgroundAudio() {
    const backgroundAudio = document.getElementById('backgroundAudio');
    if (backgroundAudio) {
        backgroundAudio.volume = 0.3; // 30% volume for background
        // Handle missing audio files
        backgroundAudio.onerror = function() {
            console.log('Background audio not found, continuing without it');
            backgroundAudio.style.display = 'none';
        };
    }

    // Set demo audio volume to 50%
    const demoAudioPersonalized = document.getElementById('demoAudioPersonalized');
    const demoAudioNormal = document.getElementById('demoAudioNormal');
    
    if (demoAudioPersonalized) {
        demoAudioPersonalized.volume = 0.5;
        demoAudioPersonalized.onerror = function() {
            console.log('Personalized demo audio not found');
        };
    }
    
    if (demoAudioNormal) {
        demoAudioNormal.volume = 0.5;
        demoAudioNormal.onerror = function() {
            console.log('Normal demo audio not found');
        };
    }
}

function initPersonalizationDemo() {
    const togglePersonalized = document.getElementById('togglePersonalized');
    const toggleNormal = document.getElementById('toggleNormal');
    const demoImageContainer = document.getElementById('demoImageContainer');
    
    if (togglePersonalized && toggleNormal && demoImageContainer) {
        togglePersonalized.addEventListener('click', () => {
            togglePersonalized.classList.add('active');
            toggleNormal.classList.remove('active');
            // Add personalized image display logic
        });
        
        toggleNormal.addEventListener('click', () => {
            toggleNormal.classList.add('active');
            togglePersonalized.classList.remove('active');
            // Add normal image display logic
        });
    }
}

function initAccessibilityDemo() {
    const dyslexiaToggle = document.getElementById('dyslexiaToggle');
    const colorBlindToggle = document.getElementById('colorBlindToggle');
    const highContrastToggle = document.getElementById('highContrastToggle');
    
    if (dyslexiaToggle) {
        dyslexiaToggle.addEventListener('change', () => {
            document.body.classList.toggle('dyslexia-mode');
        });
    }
    
    if (colorBlindToggle) {
        colorBlindToggle.addEventListener('change', () => {
            document.body.classList.toggle('color-blind-mode');
        });
    }
    
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', () => {
            document.body.classList.toggle('high-contrast-mode');
        });
    }
}

function initWaitlistForm() {
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic
        });
    }
}

    // Initialize all components
    initAudioControls();
    initAccessibilityControls();
    initButtonAnimations();
    initFAQAccordion();
    initModal();
    initPersonalizationDemo();
    initAccessibilityDemo();
    initScrollAnimations();
    initSmoothScrolling();
    
    console.log('StoryMimi Landing Page Initialized');

// Audio Controls
function initAudioControls() {
    const audioToggle = document.getElementById('audioToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');
    let isPlaying = false;
    
    if (!audioToggle || !backgroundAudio) return;
    
    // Set initial volume
    backgroundAudio.volume = 0.3;
    
    audioToggle.addEventListener('click', function() {
        playButtonSound();
        
        if (isPlaying) {
            backgroundAudio.pause();
            audioToggle.innerHTML = '<span class="audio-icon">🔇</span>';
            isPlaying = false;
        } else {
            // Try to play audio (may be blocked by browser policy)
            const playPromise = backgroundAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audioToggle.innerHTML = '<span class="audio-icon">🔊</span>';
                    isPlaying = true;
                }).catch(error => {
                    console.log('Audio autoplay prevented:', error);
                    // Show user-friendly message
                    showNotification('Click to enable background music');
                });
            }
        }
        
        // Add click animation
        audioToggle.classList.add('button-clicked');
        setTimeout(() => {
            audioToggle.classList.remove('button-clicked');
        }, 300);
    });
    
    // Handle audio end
    backgroundAudio.addEventListener('ended', function() {
        audioToggle.innerHTML = '<span class="audio-icon">🔇</span>';
        isPlaying = false;
    });
}

// Accessibility Controls
function initAccessibilityControls() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const dyslexiaToggle = document.getElementById('dyslexiaToggle');
    const colorBlindToggle = document.getElementById('colorBlindToggle');
    const highContrastToggle = document.getElementById('highContrastToggle');
    
    if (!accessibilityToggle || !accessibilityPanel) return;
    
    // Toggle accessibility panel
    accessibilityToggle.addEventListener('click', function() {
        playButtonSound();
        accessibilityPanel.classList.toggle('active');
        
        // Add click animation
        accessibilityToggle.classList.add('button-clicked');
        setTimeout(() => {
            accessibilityToggle.classList.remove('button-clicked');
        }, 300);
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!accessibilityToggle.contains(event.target) && 
            !accessibilityPanel.contains(event.target)) {
            accessibilityPanel.classList.remove('active');
        }
    });
    
    // Dyslexia-friendly font toggle
    if (dyslexiaToggle) {
        dyslexiaToggle.addEventListener('change', function() {
            playButtonSound();
            if (this.checked) {
                document.body.classList.add('dyslexia-friendly');
                showNotification('Dyslexia-friendly font enabled');
            } else {
                document.body.classList.remove('dyslexia-friendly');
                showNotification('Standard font restored');
            }
        });
    }
    
    // Color blindness filter toggle
    if (colorBlindToggle) {
        colorBlindToggle.addEventListener('change', function() {
            playButtonSound();
            if (this.checked) {
                document.body.classList.add('color-blind-filter');
                showNotification('Color blindness filter enabled');
            } else {
                document.body.classList.remove('color-blind-filter');
                showNotification('Color filter disabled');
            }
        });
    }
    
    // High contrast toggle
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', function() {
            playButtonSound();
            if (this.checked) {
                document.body.classList.add('high-contrast');
                showNotification('High contrast mode enabled');
            } else {
                document.body.classList.remove('high-contrast');
                showNotification('High contrast mode disabled');
            }
        });
    }
}

// Button Animations and Sounds
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.cta-button, .demo-button, .demo-toggle, .pricing-cta, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            playButtonSound();
            
            // Add click animation
            this.classList.add('button-clicked');
            setTimeout(() => {
                this.classList.remove('button-clicked');
            }, 300);
            
            // Handle CTA buttons (open modal)
            if (this.id === 'heroCTA' || this.id === 'finalCTA' || this.classList.contains('pricing-cta')) {
                event.preventDefault();
                openWaitlistModal();
            }
        });
        
        // Add hover sound effect
        button.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            playButtonSound();
            
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current accordion item
            if (isActive) {
                this.classList.remove('active');
                content.classList.remove('active');
            } else {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('waitlistModal');
    const modalClose = document.getElementById('modalClose');
    const waitlistForm = document.getElementById('waitlistForm');
    
    if (!modal || !modalClose || !waitlistForm) return;
    
    // Close modal
    modalClose.addEventListener('click', function() {
        playButtonSound();
        closeWaitlistModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeWaitlistModal();
        }
    });
    
    // Handle form submission
    waitlistForm.addEventListener('submit', function(event) {
        event.preventDefault();
        playButtonSound();
        
        // Simulate form submission
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Joining...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Joined! ✓';
            showNotification('Welcome to the StoryMimi waitlist!');
            
            setTimeout(() => {
                closeWaitlistModal();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                waitlistForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Personalization Demo
function initPersonalizationDemo() {
    const togglePersonalized = document.getElementById('togglePersonalized');
    const toggleNormal = document.getElementById('toggleNormal');
    const demoImagePersonalized = document.getElementById('demoImagePersonalized');
    const demoImageNormal = document.getElementById('demoImageNormal');
    const playDemoAudioButton = document.getElementById('playDemoAudio');
    const demoAudioPersonalized = document.getElementById('demoAudioPersonalized');
    const demoAudioNormal = document.getElementById('demoAudioNormal');

    let currentMode = 'personalized'; // Default mode

    // Function to update content based on mode
    function updateDemoContent() {
        // Stop any currently playing audio
        demoAudioPersonalized.pause();
        demoAudioPersonalized.currentTime = 0;
        demoAudioNormal.pause();
        demoAudioNormal.currentTime = 0;
        playDemoAudioButton.querySelector('.button-text').textContent = 'Play Narration';
        playDemoAudioButton.querySelector('.button-icon').textContent = '▶️';

        if (currentMode === 'personalized') {
            demoImagePersonalized.src = config.assets.images.demo_personalized_story;
            demoImagePersonalized.classList.remove('hidden');
            demoImageNormal.classList.add('hidden');
            togglePersonalized.classList.add('active');
            toggleNormal.classList.remove('active');
        } else {
            demoImageNormal.src = config.assets.images.demo_normal_story;
            demoImagePersonalized.classList.add('hidden');
            demoImageNormal.classList.remove('hidden');
            togglePersonalized.classList.remove('active');
            toggleNormal.classList.add('active');
        }
        console.log('Current mode:', currentMode);
        console.log('Personalized image hidden:', demoImagePersonalized.classList.contains('hidden'));
        console.log('Normal image hidden:', demoImageNormal.classList.contains('hidden'));
    }

    // Initial setup
    updateDemoContent();

    // Event listeners for toggles
    if (togglePersonalized) {
        togglePersonalized.addEventListener('click', function() {
            playButtonSound();
            currentMode = 'personalized';
            updateDemoContent();
            showNotification('Showing personalized story example!');
        });
    }

    if (toggleNormal) {
        toggleNormal.addEventListener('click', function() {
            playButtonSound();
            currentMode = 'normal';
            updateDemoContent();
            showNotification('Showing normal story example!');
        });
    }

    // Event listener for play audio button
    if (playDemoAudioButton) {
        playDemoAudioButton.addEventListener('click', function() {
            playButtonSound();
            let audioToPlay = currentMode === 'personalized' ? demoAudioPersonalized : demoAudioNormal;

            if (audioToPlay.paused) {
                audioToPlay.play().then(() => {
                    playDemoAudioButton.querySelector('.button-text').textContent = 'Stop Narration';
                    playDemoAudioButton.querySelector('.button-icon').textContent = '⏸️';
                    showNotification('Playing ' + currentMode + ' narration...');
                }).catch(error => {
                    console.log('Audio play failed:', error);
                    showNotification('Audio demo not available');
                });
            } else {
                audioToPlay.pause();
                audioToPlay.currentTime = 0;
                playDemoAudioButton.querySelector('.button-text').textContent = 'Play Narration';
                playDemoAudioButton.querySelector('.button-icon').textContent = '▶️';
            }
        });

        demoAudioPersonalized.addEventListener('ended', function() {
            if (currentMode === 'personalized') {
                playDemoAudioButton.querySelector('.button-text').textContent = 'Play Narration';
                playDemoAudioButton.querySelector('.button-icon').textContent = '▶️';
                showNotification('Personalized narration complete!');
            }
        });

        demoAudioNormal.addEventListener('ended', function() {
            if (currentMode === 'normal') {
                playDemoAudioButton.querySelector('.button-text').textContent = 'Play Narration';
                playDemoAudioButton.querySelector('.button-icon').textContent = '▶️';
                showNotification('Normal narration complete!');
            }
        });
    }
}

// Accessibility Demo
function initAccessibilityDemo() {
    const demoText = document.getElementById('accessibilityDemoText');
    const fontToggle = document.getElementById('demoFontToggle');
    const colorToggle = document.getElementById('demoColorToggle');
    
    if (fontToggle && demoText) {
        fontToggle.addEventListener('click', function() {
            playButtonSound();
            
            if (demoText.classList.contains('dyslexia-font')) {
                demoText.classList.remove('dyslexia-font');
                this.textContent = 'Toggle Dyslexia-Friendly Font';
                showNotification('Standard font restored');
            } else {
                demoText.classList.add('dyslexia-font');
                this.textContent = 'Toggle Dyslexia-Friendly Font';
                showNotification('Dyslexia-friendly font enabled');
            }
        });
    }
    
    if (colorToggle && demoText) {
        colorToggle.addEventListener('click', function() {
            playButtonSound();
            
            if (demoText.classList.contains('color-blind-filter')) {
                demoText.classList.remove('color-blind-filter');
                this.textContent = 'Toggle Color Blind Filter';
                showNotification('Color filter disabled');
            }
        });
    }
}

// Utility Functions
function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.classList.add('active');
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

function playButtonSound() {
    // Implement button click sound (e.g., using a small audio file)
    // For now, a console log
    console.log('Button clicked sound');
}

function playHoverSound() {
    // Implement button hover sound
    // For now, a console log
    console.log('Button hover sound');
}

function openWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Scroll Animations (Fade-in effect)
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.hero-content, .hero-visual, .problem-item, .transformation-text, .transformation-visual, .social-proof-content, .feature-block, .pricing-card, .testimonial-card, .accordion-item, .final-cta p, .final-cta .cta-button');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Smooth Scrolling for internal links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
