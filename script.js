
function openProject(projectId) {
    const modal = document.getElementById("projectModal");
    const title = document.getElementById("modal-title");
    const desc = document.getElementById("modal-description");
    const img = document.getElementById("modal-img"); // New line

    if (projectData[projectId]) {
        title.innerText = projectData[projectId].title;
        desc.innerText = projectData[projectId].description;
        img.src = projectData[projectId].image; // Sets the project image
        modal.style.display = "flex";
    }
}

function closeProject() {
    document.getElementById("projectModal").style.display = "none";
}
// 1. Navigation & Burger Menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// 2. Portfolio Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        items.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => { item.style.opacity = '1'; }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => { item.style.display = 'none'; }, 300);
            }
        });
    });
});

// Replace Section 3 with Magnetic Navbar Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = "1rem 3%";
        navbar.style.background = "rgba(5, 25, 27, 0.95)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    } else {
        navbar.style.padding = "1.5rem 3%";
        navbar.style.background = "rgba(8, 30, 41, 0.8)";
        navbar.style.boxShadow = "none";
    }
});

// Subtle Parallax for Images
document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const heroImg = document.querySelector('.hero-content');
    if(heroImg) {
        heroImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

const track = document.querySelector('.testimonial-track');
const cards = document.querySelectorAll('.testimonial-card');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;

function updateCarousel() {
    // Calculate width including the 40px margin (20px left + 20px right)
    const cardWidth = cards[0].offsetWidth + 40; 
    track.style.transform = `translateX(${-index * cardWidth}px)`;

    // Highlight the active card
    cards.forEach((card, i) => {
        card.classList.remove('active-card');
        // i === index + 1 assumes 3 cards are visible and we want the middle one
        if (i === index + 1) {
            card.classList.add('active-card');
        }
    });
}

nextBtn.addEventListener('click', () => {
    if (index < cards.length - 3) {
        index++;
    } else {
        index = 0; 
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
    } else {
        index = cards.length - 3;
    }
    updateCarousel();
});

// Initial call to set the first active card
updateCarousel();

// 5. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('resize', updateCarousel);


// Auto-play for testimonials
setInterval(() => {
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.click();
}, 4000); // Moves every 5 seconds

// Dynamic Navbar Animation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        nav.style.padding = "10px 3%";
        nav.style.background = "rgba(5, 25, 27, 0.98)";
        nav.style.borderBottom = "1px solid var(--primary)";
    } else {
        nav.style.padding = "25px 3%";
        nav.style.background = "rgba(8, 30, 41, 0.8)";
        nav.style.borderBottom = "none";
    }
    { passive: true }
});

// Add this to your script.js
const hero = document.querySelector('.hero-content');

document.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    if(hero) {
        hero.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
});


const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off walls
        if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
        if (p.y > canvas.height || p.y < 0) p.speedY *= -1;

        // Draw particle
        ctx.fillStyle = 'rgba(0, 242, 254, 0.5)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect lines
        for (let j = i; j < particles.length; j++) {
            let p2 = particles[j];
            let dx = p.x - p2.x;
            let dy = p.y - p2.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(0, 242, 254, ${1 - distance/120})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
        
        // Interaction with mouse
        let mdx = p.x - mouse.x;
        let mdy = p.y - mouse.y;
        let mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouse.radius) {
            ctx.strokeStyle = 'rgba(79, 172, 254, 0.8)';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("GVWkiI5huams0t1rY"); 
})();

const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = contactForm.querySelector('.send-btn');
    const btnText = btn.querySelector('span');
    
    // Start Animation
    btn.classList.add('sending');
    btnText.innerText = "Sending...";

    // Send the email
    emailjs.sendForm('service_0ceqjkz', 'template_umv86ah', this)
        .then(function() {
            // Success Animation
            btnText.innerText = "Message Sent!";
            btn.style.background = "#28a745";
            statusMsg.innerHTML = `<p style="color: #00f2fe; margin-top:10px;">I'll get back to you soon!</p>`;
            contactForm.reset();
            
            setTimeout(() => {
                btn.classList.remove('sending');
                btnText.innerText = "Send Message";
                btn.style.background = "";
            }, 5000);
        }, function(error) {
            // Error Handling
            btnText.innerText = "Error!";
            btn.style.background = "#ff4b2b";
            console.log('FAILED...', error);
        });
});