document.addEventListener("DOMContentLoaded", function () {

    const logoBtn = document.querySelector(".logo-btn");

    logoBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Reload the page and add a hash to land on the hero section
        window.location.href = window.location.origin + window.location.pathname + "#hero";

        // Optional: Force a reload instead of relying on browser cache
        window.location.reload();
    });

    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    menuBtn.addEventListener("click", function () {
        // Toggle the menu visibility
        navMenu.classList.toggle("active");

        // Toggle the icon between hamburger and close
        if (navMenu.classList.contains("active")) {
            menuBtn.innerHTML = '<i class="fa-solid fa-times"></i>'; // Close icon
        } else {
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Hamburger icon
        }
    });

    // Close the menu when a link is clicked (optional)
    const navMenuLinks = document.querySelectorAll("#nav-menu ul li a");
    navMenuLinks.forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Reset to hamburger icon
        });
    });



    // Header scroll effect (keeps your existing behavior)
    document.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const heroSection = document.getElementById("hero");

    function revealHero() {
        if (heroSection.getBoundingClientRect().top < window.innerHeight * 0.9) {
            heroSection.classList.add("show");
            window.removeEventListener("scroll", revealHero); // Run only once
        }
    }

    window.addEventListener("scroll", revealHero);
    revealHero(); // Run once in case it's already in view



    const navLinks = document.querySelectorAll("header nav ul li a");

    function highlightActiveLink() {
        let scrollPosition = window.scrollY + 100; // Offset to detect sections earlier

        navLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute("href"));

            if (
                section.offsetTop <= scrollPosition &&
                section.offsetTop + section.offsetHeight > scrollPosition
            ) {
                navLinks.forEach(nav => nav.classList.remove("active"));
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", highlightActiveLink);
    highlightActiveLink(); // Run on page load


    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute("href"); // Get section ID
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for header height if needed
                    behavior: "smooth" // Enables smooth scrolling
                });
            }
        });
    });

    // Intersection Observer for section animations
    const hiddenSections = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    hiddenSections.forEach(section => {
        observer.observe(section);
    });

    const steps = document.querySelectorAll(".timeline-step");

    steps.forEach(step => {
        step.addEventListener("mouseenter", () => {
            step.querySelector(".step-content").style.opacity = "1";
            step.querySelector(".step-content").style.transform = "translateY(0)";
        });

        step.addEventListener("mouseleave", () => {
            step.querySelector(".step-content").style.opacity = "0";
            step.querySelector(".step-content").style.transform = "translateY(20px)";
        });
    });

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default submission

        let formData = new FormData(form);
        let response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            alert("Your message has been sent!");
        } else {
            alert("Oops! Something went wrong. Please try again.");
        }
    });

    const backToTopBtn = document.getElementById("back-to-top");

    // Show button when scrolling past 300px
    window.addEventListener("scroll", function () {
        if (window.scrollY > 700) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default behavior

        let currentPosition = window.scrollY;
        let scrollDuration = 800; // Time in milliseconds (increase for slower effect)
        let startTime = null;

        function smoothScroll(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = timestamp - startTime;
            let easing = 1 - Math.pow(1 - progress / scrollDuration, 3); // Ease-out effect

            window.scrollTo(0, currentPosition * (1 - easing));

            if (progress < scrollDuration) {
                requestAnimationFrame(smoothScroll);
            } else {
                window.scrollTo(0, 0); // Ensure it lands exactly at the top
            }
        }

        requestAnimationFrame(smoothScroll);
    });

});

