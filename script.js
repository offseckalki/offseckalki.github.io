document.addEventListener('DOMContentLoaded', () => {
    const particles = document.querySelectorAll('.particle-bg .particle');
    const heroSection = document.querySelector('.hero-section');

    // Particle Movement with Mouse
    heroSection.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        particles.forEach(particle => {
            const speed = particle.getAttribute('data-speed');
            const x = (window.innerWidth - mouseX * speed) / 100;
            const y = (window.innerHeight - mouseY * speed) / 100;

            particle.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // Create particles dynamically
    const particleCount = 50; // Adjust the number of particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random animation duration between 5s and 10s
        particle.style.opacity = Math.random(); // Random opacity
        document.querySelector('.particle-bg').appendChild(particle);
    }
});

document.getElementById("apkFile").addEventListener("change", function () {
    let file = this.files[0];
    if (file) {
        document.getElementById("selectedFileName").innerText = file.name;
    }
});

document.getElementById("uploadBtn").addEventListener("click", function () {
    let fileInput = document.getElementById("apkFile");
    if (fileInput.files.length === 0) {
        alert("Please select an APK file.");
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    document.getElementById("uploadProgress").classList.remove("hidden");
    
    fetch("/upload", { method: "POST", body: formData })
        .then(response => response.json())
        .then(data => {
            if (data.filename) {
                document.getElementById("scanBtn").classList.remove("hidden");
                document.getElementById("scanBtn").setAttribute("data-filename", data.filename);
            }
        });
});

