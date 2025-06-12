// Audio Controls Module
let isPlaying = false;

export function initAudioControls() {
    const audioToggle = document.getElementById('audioToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');
    
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

// Export error handling version
export function initAudioControlsWithErrorHandling() {
    try {
        console.log('Initializing audio controls...');
        initAudioControls();
        console.log('Audio controls initialized');
    } catch (error) {
        console.error('Error in initAudioControls:', error);
    }
}
