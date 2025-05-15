// // Additional JS file specifically for the home page features
// document.addEventListener('DOMContentLoaded', function() {
//     // Cherry Blossom Animation
//     createCherryBlossoms();
    
//     // Image loading optimization
//     lazyLoadImages();
    
//     // Featured tour highlight animation
//     animateFeaturedTours();
// });

// // Create falling cherry blossom effect
// function createCherryBlossoms() {
//     const hero = document.querySelector('.hero');
//     if (!hero) return;
    
//     const petalsContainer = document.createElement('div');
//     petalsContainer.className = 'cherry-blossoms';
//     petalsContainer.style.position = 'absolute';
//     petalsContainer.style.top = '0';
//     petalsContainer.style.left = '0';
//     petalsContainer.style.width = '100%';
//     petalsContainer.style.height = '100%';
//     petalsContainer.style.overflow = 'hidden';
//     petalsContainer.style.pointerEvents = 'none';
//     petalsContainer.style.zIndex = '1';
    
//     hero.appendChild(petalsContainer);
    
//     // Create 50 petals
//     for (let i = 0; i < 50; i++) {
//         createPetal(petalsContainer);
//     }
// }

// function createPetal(container) {
//     // Create petal element
//     const petal = document.createElement('div');
    
//     // Set random petal shape and style
//     const size = Math.random() * 10 + 10; // Size between 10-20px
//     const opacity = Math.random() * 0.4 + 0.4; // Semi-transparent
    
//     petal.style.position = 'absolute';
//     petal.style.width = `${size}px`;
//     petal.style.height = `${size * 0.8}px`;
//     petal.style.borderRadius = '50% 50% 50% 0';
//     petal.style.backgroundColor = Math.random() > 0.3 ? '#ffccd5' : '#ffd1dc';
//     petal.style.opacity = opacity;
//     petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    
//     // Set initial position
//     const startX = Math.random() * 100;
//     petal.style.left = `${startX}%`;
//     petal.style.top = '-20px';
    
//     // Add to container
//     container.appendChild(petal);
    
//     // Animate falling
//     animatePetal(petal);
// }

// function animatePetal(petal) {
//     // Animation variables
//     const duration = Math.random() * 10000 + 8000; // 8-18 seconds
//     const horizontalMovement = (Math.random() - 0.5) * 15; // Move side to side
    
//     // Use CSS animations
//     petal.style.animation = `falling ${duration}ms linear infinite`;
    
//     // Create keyframes
//     const style = document.createElement('style');
//     style.textContent = `
//         @keyframes falling {
//             0% {
//                 transform: translate(0, 0) rotate(${Math.random() * 360}deg);
//             }
//             25% {
//                 transform: translate(${horizontalMovement}px, 25vh) rotate(${Math.random() * 360}deg);
//             }
//             50% {
//                 transform: translate(${-horizontalMovement}px, 50vh) rotate(${Math.random() * 360}deg);
//             }
//             75% {
//                 transform: translate(${horizontalMovement * 0.5}px, 75vh) rotate(${Math.random() * 360}deg);
//             }
//             100% {
//                 transform: translate(${-horizontalMovement * 0.3}px, 100vh) rotate(${Math.random() * 360}deg);
//             }
//         }
//     `;
//     document.head.appendChild(style);
// }

// // Lazy load images
// function lazyLoadImages() {
//     const images = document.querySelectorAll('.gallery-img');
    
//     if (!('IntersectionObserver' in window)) {
//         // Fallback for browsers that don't support IntersectionObserver
//         images.forEach(img => {
//             if (img.dataset.src) {
//                 img.src = img.dataset.src;
//             }
//         });
//         return;
//     }
    
//     const imageObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 if (img.dataset.src) {
//                     img.src = img.dataset.src;
//                     img.onload = () => {
//                         img.style.opacity = 1;
//                     };
//                 }
//                 imageObserver.unobserve(img);
//             }
//         });
//     });
    
//     images.forEach(img => {
//         img.style.opacity = 0;
//         img.style.transition = 'opacity 0.3s ease';
//         imageObserver.observe(img);
//     });
// }

// // Animate featured tours
// function animateFeaturedTours() {
//     const cards = document.querySelectorAll('.highlight-card');
    
//     cards.forEach((card, index) => {
//         // Add staggered animation delay
//         card.style.opacity = 0;
//         card.style.transform = 'translateY(20px)';
//         card.style.transition = 'all 0.5s ease';
        
//         // Set timeout for staggered animation
//         setTimeout(() => {
//             card.style.opacity = 1;
//             card.style.transform = 'translateY(0)';
//         }, 200 * index);
//     });
// }