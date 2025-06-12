// Animations Module

// Magnetic Button Animation
export function initMagneticButton() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        // Create magnet element
        const magnet = document.createElement('div');
        magnet.className = 'magnet';
        button.appendChild(magnet);

        // Add magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            magnet.style.transform = `
                translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)
                scale(${1 + Math.abs(x - rect.width / 2) / 100})
            `;
        });

        // Reset on mouse leave
        button.addEventListener('mouseleave', () => {
            magnet.style.transform = 'translate(0, 0) scale(1)';
        });

        // Add click animation
        button.addEventListener('click', () => {
            magnet.style.transform = 'translate(0, 0) scale(1.2)';
            setTimeout(() => {
                magnet.style.transform = 'translate(0, 0) scale(1)';
            }, 200);
        });
    });
}

// Button Animations and Sounds
export function initButtonAnimations() {
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

// Scroll Animations
export function initScrollAnimations() {
    // Add your scroll animation logic here
}

// Smooth Scrolling
export function initSmoothScrolling() {
    // Add your smooth scrolling logic here
}
