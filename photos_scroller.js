let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');

// 1. Automatically generate dots based on the number of slides
function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active'); // First dot is active
    
    // Make dots clickable to jump directly to a photo
    dot.addEventListener('click', () => jumpToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

// 2. Handle arrow navigation
function changeSlide(direction) {
  let newIndex = currentSlideIndex + direction;
  
  if (newIndex >= slides.length) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = slides.length - 1;
  }
  
  updateDOM(newIndex);
}

// 3. Handle jumping to a specific slide when a dot is clicked
function jumpToSlide(index) {
  updateDOM(index);
}

// 4. Shared function to swap classes on slides and dots
function updateDOM(newIndex) {
  const dots = document.querySelectorAll('.dot');
  
  // Remove active classes
  slides[currentSlideIndex].classList.remove('active');
  dots[currentSlideIndex].classList.remove('active');
  
  // Update index tracker
  currentSlideIndex = newIndex;
  
  // Add active classes to new slide/dot
  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex].classList.add('active');
}

// Initialize the dots when the script loads
createDots();