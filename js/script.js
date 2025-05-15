// Main Script for Sakura Tours Website
document.addEventListener('DOMContentLoaded', function () {
    // Navigation menu toggle for mobile
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll animations for elements
    window.addEventListener('scroll', function () {
        animateOnScroll();
    });

    // Initialize animations on page load
    animateOnScroll();
    createCherryBlossomEffect();

    // Set up theme switcher
    setupThemeSwitcher();

    // Form validation and localStorage
    setupFormValidation();
    loadSavedFormData();

    // JavaScript for the itinerary page animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        function animateTimeline() {
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (itemTop < windowHeight - 100) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            });
        }

        window.addEventListener('scroll', animateTimeline);
    }

    // JavaScript for the Registration Page
    const registrationForm = document.getElementById('tourForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                // Simulate form submission
                const formData = new FormData(registrationForm);
                let bookingDetails = {};

                for (let [key, value] of formData.entries()) {
                    bookingDetails[key] = value;
                }

                // Show success message
                showNotification('Your booking request has been submitted!');

                // Reset form
                registrationForm.reset();

                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                // Clear saved form data
                clearFormData();
            }
        });
    }
});

// Animate elements when they come into view
function animateOnScroll() {
    const itineraryItems = document.querySelectorAll('.itinerary li');
    itineraryItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (itemPosition < screenPosition) {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 100);
        }
    });

    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        const tablePosition = tableContainer.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (tablePosition < screenPosition) {
            tableContainer.classList.add('animate');
        }
    }
}

// Create falling cherry blossom petals effect
function createCherryBlossomEffect() {
    const hero = document.querySelector('.hero');
    const numberOfPetals = 30;

    if (hero) {
        for (let i = 0; i < numberOfPetals; i++) {
            createPetal(hero);
        }
    }
}

function createPetal(parent) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const size = Math.random() * 10 + 5;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;

    const startPositionX = Math.random() * 100;
    petal.style.left = `${startPositionX}%`;
    petal.style.top = '-20px';

    parent.appendChild(petal);
    animatePetal(petal);
}

function animatePetal(petal) {
    const duration = Math.random() * 8000 + 7000;
    const endPositionX = parseInt(petal.style.left) + (Math.random() * 40 - 20);

    const animation = petal.animate(
        [
            {
                top: '-20px',
                left: petal.style.left,
                opacity: Math.random() * 0.5 + 0.3,
                transform: `rotate(${Math.random() * 360}deg)`
            },
            {
                top: '100%',
                left: `${endPositionX}%`,
                opacity: 0,
                transform: `rotate(${Math.random() * 360 + 360}deg)`
            }
        ],
        {
            duration: duration,
            easing: 'linear',
            iterations: 1
        }
    );

    animation.onfinish = () => {
        petal.remove();
        createPetal(document.querySelector('.hero'));
    };
}

// Form validation and localStorage functionality
function setupFormValidation() {
    const tourForm = document.getElementById('tourForm');

    if (tourForm) {
        const formInputs = tourForm.querySelectorAll('input, select');
        formInputs.forEach(input => {
            input.addEventListener('change', saveFormData);
        });

        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', checkPasswordMatch);
        }
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('passwordError');

    if (errorMessage) {
        if (password !== confirmPassword) {
            errorMessage.style.display = 'block';
            return false;
        } else {
            errorMessage.style.display = 'none';
            return true;
        }
    }
    return true;
}

function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            highlightField(field);
        } else {
            resetField(field);
        }
    });

    if (!checkPasswordMatch()) {
        isValid = false;
    }

    return isValid;
}

function highlightField(field) {
    field.style.borderColor = '#ff3860';
    field.style.boxShadow = '0 0 5px rgba(255, 56, 96, 0.3)';
}

function resetField(field) {
    field.style.borderColor = '#ddd';
    field.style.boxShadow = 'none';
}

function showNotification(message) {
    let notification = document.querySelector('.notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

function saveFormData() {
    const formData = {};
    const formInputs = document.getElementById('tourForm').querySelectorAll('input:not([type="password"]), select');

    formInputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            if (input.checked) {
                if (!formData[input.name]) {
                    formData[input.name] = [];
                }
                formData[input.name].push(input.value);
            }
        } else {
            formData[input.name] = input.value;
        }
    });

    localStorage.setItem('sakuraTourFormData', JSON.stringify(formData));
}

function loadSavedFormData() {
    const savedData = localStorage.getItem('sakuraTourFormData');

    if (savedData) {
        const formData = JSON.parse(savedData);
        const form = document.getElementById('tourForm');

        if (form) {
            Object.keys(formData).forEach(key => {
                const input = form.querySelector(`[name="${key}"]:not([type="radio"]):not([type="checkbox"])`);
                if (input) {
                    input.value = formData[key];
                }

                const radioCheckboxes = form.querySelectorAll(`[name="${key}"][type="radio"], [name="${key}"][type="checkbox"]`);
                radioCheckboxes.forEach(element => {
                    if (Array.isArray(formData[key])) {
                        if (formData[key].includes(element.value)) {
                            element.checked = true;
                        }
                    } else if (element.value === formData[key]) {
                        element.checked = true;
                    }
                });
            });

            showNotification('Your form data has been restored from your previous session.');
        }
    }
}

function clearFormData() {
    localStorage.removeItem('sakuraTourFormData');
}