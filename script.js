
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
// Optimized Navbar Scroll Animation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

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

document.addEventListener('mousemove', (e) => {
    const portal = document.querySelector('.visual-portal');
    if (portal) {
        const x = (window.innerWidth - e.pageX * 2) / 50;
        const y = (window.innerHeight - e.pageY * 2) / 50;
        portal.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

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

const heroContent = document.querySelector('.hero-content');
const heroTitle = document.querySelector('.hero h1');

document.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 20;
    
    if(heroContent) {
        // Tilt the card
        heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        
        // Slightly move the title at a different speed for a 3D parallax look
        if(heroTitle) {
            heroTitle.style.transform = `translateZ(50px) translateX(${xAxis * 0.5}px)`;
        }
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

function openWork() {
    const gallery = document.getElementById('gallery-overlay');
    gallery.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Stop scrolling on the main page
}

function closeWork() {
    const gallery = document.getElementById('gallery-overlay');
    gallery.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function openAbout() {
    document.getElementById('about-drawer').classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scrolling
}

function closeAbout() {
    document.getElementById('about-drawer').classList.remove('active');
    document.body.style.overflow = 'auto'; // Unlock scrolling
}

function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
}