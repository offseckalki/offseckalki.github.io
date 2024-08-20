document.addEventListener('DOMContentLoaded', function () {
    const particleContainer = document.querySelector('.particle-bg');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random starting position within the container
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * -100}vh`;
        
        // Random speed and animation duration
        const animationDuration = Math.random() * 15 + 5;
        particle.style.animationDuration = `${animationDuration}s`;

        // Random size
        const size = Math.random() * 5 + 2; // size between 2px and 7px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particleContainer.appendChild(particle);

        // Remove particle after animation ends
        setTimeout(() => {
            particle.remove();
        }, animationDuration * 1000);
    }

    function initParticles() {
        setInterval(createParticle, 100); // Create a new particle every 100ms
    }

    initParticles();
});
