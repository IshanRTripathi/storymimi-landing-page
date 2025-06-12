// Scroll Module

// Section Loading
export function loadSections() {
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
    })
    .catch(error => {
        console.error('Error in section loading process:', error);
    });
}
