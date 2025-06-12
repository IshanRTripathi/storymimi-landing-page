// Forms Module

// Waitlist Form
export function initWaitlistForm() {
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        const submitButton = waitlistForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(waitlistForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const childName = formData.get('childName');

            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Joining...';

            // Simulate API call
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
}

// Personalization Demo
export function initPersonalizationDemo() {
    const togglePersonalized = document.getElementById('togglePersonalized');
    const toggleNormal = document.getElementById('toggleNormal');
    const demoImagePersonalized = document.getElementById('demoImagePersonalized');
    const demoImageNormal = document.getElementById('demoImageNormal');
    const playDemoAudioButton = document.getElementById('playDemoAudio');
    const demoAudioPersonalized = document.getElementById('demoAudioPersonalized');
    const demoAudioNormal = document.getElementById('demoAudioNormal');

    let currentMode = 'personalized'; // Default mode

    // Set initial state based on default mode
    if (currentMode === 'personalized') {
        demoImagePersonalized.classList.remove('hidden');
        demoImageNormal.classList.add('hidden');
        togglePersonalized.classList.add('active');
        toggleNormal.classList.remove('active');
    } else {
        demoImagePersonalized.classList.add('hidden');
        demoImageNormal.classList.remove('hidden');
        togglePersonalized.classList.remove('active');
        toggleNormal.classList.add('active');
    }

    // Function to update content based on mode
    function updateDemoContent() {
        // Stop any currently playing audio
        demoAudioPersonalized.pause();
        demoAudioNormal.pause();

        playDemoAudioButton.querySelector('.button-icon').textContent = '▶️';

        if (currentMode === 'personalized') {
            demoImagePersonalized.style.opacity = '0';
            demoImagePersonalized.style.transform = 'scale(0.8)';
            setTimeout(() => {
                demoImagePersonalized.style.transition = 'all 0.5s ease-out';
                demoImagePersonalized.style.opacity = '1';
                demoImagePersonalized.style.transform = 'scale(1)';
            }, 10);
        } else {
            demoImageNormal.style.opacity = '0';
            demoImageNormal.style.transform = 'scale(0.8)';
            setTimeout(() => {
                demoImageNormal.style.transition = 'all 0.5s ease-out';
                demoImageNormal.style.opacity = '1';
                demoImageNormal.style.transform = 'scale(1)';
            }, 10);
        }
    }

    // Event listeners for toggles
    if (togglePersonalized) {
        togglePersonalized.addEventListener('click', function() {
            playButtonSound();
            currentMode = 'personalized';
            updateDemoContent();
        });
    }

    if (toggleNormal) {
        toggleNormal.addEventListener('click', function() {
            playButtonSound();
            currentMode = 'normal';
            updateDemoContent();
        });
    }

    // Event listener for play audio button
    if (playDemoAudioButton) {
        playDemoAudioButton.addEventListener('click', function() {
            playButtonSound();
            
            // Update icon and play appropriate audio
            const audio = currentMode === 'personalized' ? demoAudioPersonalized : demoAudioNormal;
            const icon = this.querySelector('.button-icon');
            
            if (audio.paused) {
                audio.play();
                icon.textContent = '⏸️';
            } else {
                audio.pause();
                icon.textContent = '▶️';
            }
        });
    }
}
