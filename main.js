

// Mouse Scroll Speed Adjuster

let scrollSpeed = 0.5; // Adjust this value to control scroll sensitivity (lower value = slower scroll)
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













// Video Scroll Full Screen Effect

let isVideoFullWidth = false; // Track if the video is full width
const scrollThreshold = 60; // Scroll threshold to start scaling the video
const maxScaleScroll = 400; // Scroll distance where the video reaches maximum scale
const maxScale = 1.5; // Maximum scale for the video
const originalScale = 0.8; // Original scale (80%)
const pullBackThreshold = 300; // Threshold to trigger pull back

window.addEventListener('scroll', () => {
    const video = document.getElementById('myVideo');
    const videoSection = document.querySelector('.video-section');
    const scrollY = window.scrollY;
    const videoSectionTop = videoSection.offsetTop;

    // Calculate how much to scale based on scroll position
    if (scrollY > scrollThreshold) {
        let scrollProgress = (scrollY - scrollThreshold) / maxScaleScroll;
        if (scrollProgress > 1) scrollProgress = 1; // Cap at full scale

        // Apply scaling based on scroll progress
        video.style.transform = `scale(${1 + (maxScale - 1) * scrollProgress})`;

        // Play video when scaling starts
        video.play();
        
        // Mark as full width if scaling is complete
        if (scrollProgress === 1) {
            isVideoFullWidth = true; // Mark as full width
        }
    }

    // Allow scrolling past the video smoothly, and reset if scrolling back up
    if (isVideoFullWidth) {
        if (scrollY < videoSectionTop - pullBackThreshold || scrollY === 0) {
            video.style.transform = `scale(${originalScale})`; // Reset to original scale (80%)
            video.pause(); // Pause video
            isVideoFullWidth = false; // Update flag
        }
    }
});
















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













AOS.init({
    duration: 200000000000000, // Adjust duration for your needs
    once: true, // Only animate once
    offset: window.innerHeight / 0.1 // Triggers when halfway down the viewport

});





































































