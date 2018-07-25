const carouselImages = document.getElementsByClassName('carousel-image');
let currentlyVisibleIndex = 0;
setInterval(function () {
  // set current to hidden
  carouselImages[currentlyVisibleIndex].classList.add('hidden');
  // increment index
  currentlyVisibleIndex = (currentlyVisibleIndex + 1) % carouselImages.length;
  // set the new current to not hidden
  carouselImages[currentlyVisibleIndex].classList.remove('hidden');
}, 5000);
