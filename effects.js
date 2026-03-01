/* =====================================================
   CODEX HUNT — Visual Effects
   Particles, Oil Lamp, Animations
   ===================================================== */

// --- Floating Embers & Dust Particles ---
export function createParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    // Create embers
    for (let i = 0; i < 15; i++) {
        createEmber(canvas, i);
    }

    // Create dust
    for (let i = 0; i < 20; i++) {
        createDust(canvas, i);
    }
}

function createEmber(container, index) {
    const ember = document.createElement('div');
    ember.className = 'particle ember';
    ember.style.left = `${Math.random() * 100}%`;
    ember.style.animationDuration = `${8 + Math.random() * 12}s`;
    ember.style.animationDelay = `${Math.random() * 10}s`;
    ember.style.opacity = `${0.3 + Math.random() * 0.7}`;

    const size = 2 + Math.random() * 3;
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;

    container.appendChild(ember);
}

function createDust(container, index) {
    const dust = document.createElement('div');
    dust.className = 'particle dust';
    dust.style.left = `${Math.random() * 100}%`;
    dust.style.top = `${Math.random() * 100}%`;
    dust.style.animationDuration = `${15 + Math.random() * 20}s`;
    dust.style.animationDelay = `${Math.random() * 15}s`;

    container.appendChild(dust);
}

// --- Oil Lamp Corner Effect ---
export function createOilLamp() {
    const lamp = document.createElement('div');
    lamp.className = 'oil-lamp';
    lamp.innerHTML = `
    <div class="lamp-flame"></div>
    <div class="lamp-base"></div>
  `;
    lamp.title = '🪔 Sacred Lamp';
    document.body.appendChild(lamp);
}

// --- Scroll Reveal Animation ---
export function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
