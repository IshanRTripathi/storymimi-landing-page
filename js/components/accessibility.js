// Accessibility Controls Module

// Accessibility Panel
export function initAccessibilityControls() {
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

// Accessibility Demo
export function initAccessibilityDemo() {
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
