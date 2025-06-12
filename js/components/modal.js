// Modal Module

export function initModal() {
    const modal = document.getElementById('waitlistModal');
    if (!modal) return;

    // Close modal when close button is clicked
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Utility function to open modal
export function openWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.style.display = 'block';
    }
}
