document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar & Active Links
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky effect
        if (window.scrollY > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Active link highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });

        // Trigger Reveal Animations
        reveal();
    });

    // 2. Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');
    const bars = document.querySelectorAll('.bar');

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');

        // Simple animation for bars
        bars[0].style.transform = navLinksContainer.classList.contains('active') ? 'rotate(45deg) translate(5px, 6px)' : 'none';
        bars[1].style.opacity = navLinksContainer.classList.contains('active') ? '0' : '1';
        bars[2].style.transform = navLinksContainer.classList.contains('active') ? 'rotate(-45deg) translate(5px, -6px)' : 'none';

        // Prevent scroll when menu is open
        document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // 3. Scroll Reveal Logic
    function reveal() {
        const reveals = document.querySelectorAll('.reveal-up');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }

    // Initial call
    reveal();

    // 4. Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const feedback = document.getElementById('form-feedback');
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwAc7aDq83CbLXqbblk6giE0DSCZl518N28MIAhfA2IwN62-XuKQrRtXeihEpkTZmZm/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(scriptUrl, {
                    method: 'POST',
                    body: formData
                });

                const responseText = await response.text();
                console.log('Apps Script response:', {
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    body: responseText
                });

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
                }

                showFeedback('Message sent successfully!', '#25d366');
                contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                showFeedback('Error sending message.', 'red');
            }
        });
    }

    function showFeedback(msg, color) {
        if (!feedback) return;
        feedback.textContent = msg;
        feedback.style.color = color;
        feedback.style.marginTop = '15px';
        feedback.style.fontWeight = '600';
    }

    // 5. Smooth Internal Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
