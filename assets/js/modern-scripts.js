// Modern JavaScript for Portfolio Website

$(document).ready(function() {
    'use strict';

    // Initialize all modern features
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initNavbarEffects();
    initParticleEffect();

    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        $('.modern-section').each(function() {
            $(this).addClass('fade-in');
            observer.observe(this);
        });

        $('.timeline-item').each(function(index) {
            $(this).addClass('slide-in-left');
            $(this).css('animation-delay', (index * 0.2) + 's');
            observer.observe(this);
        });

        $('.project-card').each(function(index) {
            $(this).addClass('fade-in');
            $(this).css('animation-delay', (index * 0.1) + 's');
            observer.observe(this);
        });
    }

    // Skill Bars Animation
    function initSkillBars() {
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = $(entry.target).find('.skill-progress');
                    const width = progressBar.data('width');
                    
                    setTimeout(() => {
                        progressBar.css('width', width);
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        $('.skill-item').each(function() {
            skillObserver.observe(this);
        });
    }

    // Contact Form
    function initContactForm() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            const form = $(this);
            const submitBtn = form.find('button[type="submit"]');
            const messages = $('#form-messages');
            
            // Show loading state
            submitBtn.addClass('loading');
            messages.hide().removeClass('success error');
            
            // Get form data
            const formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                subject: $('#subject').val(),
                message: $('#message').val()
            };
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Simulate success (replace with actual AJAX call)
                if (validateForm(formData)) {
                    showMessage('success', 'Thank you! Your message has been sent successfully.');
                    form[0].reset();
                    
                    // Reset labels
                    form.find('label').css({
                        'top': '15px',
                        'font-size': '16px',
                        'color': '#94a3b8'
                    });
                } else {
                    showMessage('error', 'Please fill in all required fields correctly.');
                }
                
                submitBtn.removeClass('loading');
            }, 2000);
        });
        
        function validateForm(data) {
            return data.name && data.email && data.subject && data.message && 
                   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        }
        
        function showMessage(type, text) {
            const messages = $('#form-messages');
            messages.removeClass('success error')
                   .addClass(type)
                   .text(text)
                   .fadeIn();
        }
    }

    // Smooth Scrolling
    function initSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            
            const target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'easeInOutExpo');
            }
        });
    }

    // Navbar Effects
    function initNavbarEffects() {
        $(window).on('scroll', function() {
            const scrollTop = $(this).scrollTop();
            const navbar = $('.modern-nav');
            
            if (scrollTop > 100) {
                navbar.addClass('sticked');
            } else {
                navbar.removeClass('sticked');
            }
            
            // Update active nav item
            updateActiveNavItem();
        });
        
        function updateActiveNavItem() {
            const scrollPos = $(window).scrollTop() + 100;
            
            $('.modern-nav-links a[href^="#"]').each(function() {
                const target = $($(this).attr('href'));
                if (target.length) {
                    const targetTop = target.offset().top;
                    const targetBottom = targetTop + target.outerHeight();
                    
                    if (scrollPos >= targetTop && scrollPos < targetBottom) {
                        $('.modern-nav-links li').removeClass('active');
                        $(this).parent().addClass('active');
                    }
                }
            });
        }
    }

    // Particle Effect for Hero Section
    function initParticleEffect() {
        const canvas = $('<canvas>').attr({
            width: window.innerWidth,
            height: window.innerHeight
        }).css({
            position: 'absolute',
            top: 0,
            left: 0,
            'pointer-events': 'none',
            'z-index': 1
        });
        
        $('.hero-particles').append(canvas);
        
        const ctx = canvas[0].getContext('2d');
        const particles = [];
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        // Resize handler
        $(window).on('resize', function() {
            canvas.attr({
                width: window.innerWidth,
                height: window.innerHeight
            });
        });
    }

    // Typing Effect for Hero Title
    function initTypingEffect() {
        const titles = ['Full Stack Developer', 'Computer Engineer', 'Problem Solver', 'Tech Enthusiast'];
        let currentTitle = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const current = titles[currentTitle];
            const typeSpeed = isDeleting ? 50 : 100;
            
            if (isDeleting) {
                $('.hero-subtitle').text(current.substring(0, currentChar - 1));
                currentChar--;
            } else {
                $('.hero-subtitle').text(current.substring(0, currentChar + 1));
                currentChar++;
            }
            
            if (!isDeleting && currentChar === current.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentTitle = (currentTitle + 1) % titles.length;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Uncomment to enable typing effect
        // typeEffect();
    }

    // Scroll to Top Button
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.return-to-top').fadeIn();
        } else {
            $('.return-to-top').fadeOut();
        }
    });

    $('.return-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Preloader (if needed)
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // Mobile Menu Toggle
    $('.navbar-toggle').on('click', function() {
        $(this).toggleClass('active');
        $('.hamburger-line').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.modern-nav-links a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
        $('.navbar-toggle').removeClass('active');
        $('.hamburger-line').removeClass('active');
    });

    // Add hover effects to project cards
    $('.project-card').hover(
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1)');
        }
    );

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add parallax effect to hero section
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.hero-particles');
        const speed = scrolled * 0.5;
        
        parallax.css('transform', `translateY(${speed}px)`);
    });

    // Initialize tooltips (if using Bootstrap tooltips)
    $('[data-toggle="tooltip"]').tooltip();

    // Add loading animation to buttons
    $('.btn-modern').on('click', function() {
        const btn = $(this);
        if (!btn.hasClass('loading')) {
            btn.addClass('loading');
            setTimeout(() => {
                btn.removeClass('loading');
            }, 2000);
        }
    });

    // Counter animation for stats
    function animateCounters() {
        $('.stat-item h4').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.text().replace(/\D/g, ''));
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum) + '+');
                },
                complete: function() {
                    $this.text(countTo + '+');
                }
            });
        });
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Custom easing function
$.easing.easeInOutExpo = function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};