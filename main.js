

// Mouse Scroll Speed Adjuster

let scrollSpeed = 0.34; // Adjust this value to control scroll sensitivity (lower value = slower scroll)
let currentScroll = window.scrollY;
let isScrolling = false;

window.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent default scrolling behavior

    const delta = event.deltaY * scrollSpeed; // Multiply the scroll delta by scrollSpeed
    currentScroll += delta; // Adjust current scroll position

    // Clamp the scroll value between 0 and the max scroll height
    currentScroll = Math.max(0, Math.min(currentScroll, document.body.scrollHeight - window.innerHeight));

    // Only trigger scrolling if not already in a scroll animation
    if (!isScrolling) {
        isScrolling = true;
        smoothScroll(); // Call the smooth scroll function
    }
}, { passive: false }); // Disable passive to allow event.preventDefault()

// Smooth scroll function
function smoothScroll() {
    const scrollDiff = currentScroll - window.scrollY;

    if (Math.abs(scrollDiff) > 1) {
        window.scrollBy(0, scrollDiff * 0.1); // Gradually scroll towards target position
        requestAnimationFrame(smoothScroll); // Continue animation until fully scrolled
    } else {
        isScrolling = false; // Reset the flag when done
    }
}






// Dot Cursor Follow Effect

const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

let dotX = 0;
let dotY = 0;
let mouseX = 0;
let mouseY = 0;
const speed = 0.08; // Adjust this value for slower or faster movement (0.1 is slow and smooth)

// Update the target mouse position when the mouse moves
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Update the position of the dot with delay
function updateDotPosition() {
    // Lerp (linear interpolation) between the current dot position and the mouse position
    dotX += (mouseX - dotX) * speed;
    dotY += (mouseY - dotY) * speed;

    // Update the dot position
    cursorDot.style.left = `${dotX - 5}px`;
    cursorDot.style.top = `${dotY - 5}px`;

    requestAnimationFrame(updateDotPosition);
}

// Start the animation loop
requestAnimationFrame(updateDotPosition);








// Counter Statistics Animation

// Select all elements with the class 'number'
const counters = document.querySelectorAll('.number');

// Define the function that animates the counter
const startCounterAnimation = (direction) => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const currentText = counter.innerText.replace(/[^\d]/g, '');
        let count = +currentText || 0; // Initialize count

        // Adjust increments for percentage and non-percentage counters
        const isPercentage = counter.innerText.includes('%');
        const increment = isPercentage ? target / 60 : target / 60000; // Slower for non-percentage

        const updateCounter = () => {
            if (direction === 'up' && count < target) {
                count = Math.ceil(count + increment);
                if (count > target) count = target; // Ensure it doesn't exceed target
                counter.innerText = count + (isPercentage ? '%' : '+');
                setTimeout(updateCounter, 20); // Control update frequency with delay
            } else if (direction === 'down' && count > 0) {
                count = Math.floor(count - increment);
                if (count < 0) count = 0; // Prevent going below 0
                counter.innerText = count + (isPercentage ? '%' : '+');
                setTimeout(updateCounter, 20); // Control update frequency with delay
            }
        };

        updateCounter(); // Start the animation
    });
};

// Flags to track animations
let hasAnimatedUp = false;
let hasAnimatedDown = false;

// Intersection Observer to detect when .stats-container enters and exits the viewport
const statsContainer = document.querySelector('.stats-container');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedUp) {
            startCounterAnimation('up'); // Animate up on enter
            hasAnimatedUp = true;
            hasAnimatedDown = false; // Allow for reverse animation later
        } else if (!entry.isIntersecting && !hasAnimatedDown) {
            startCounterAnimation('down'); // Animate down on exit
            hasAnimatedDown = true;
            hasAnimatedUp = false; // Reset for future entry
        }
    });
}, { threshold: 0.6 }); // Adjust threshold based on when you want the animation to trigger

// Start observing the .stats-container element
observer.observe(statsContainer);



























































































