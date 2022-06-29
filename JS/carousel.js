let names;
let slides;
let dots;
let names_track;
let slides_track;
let next_btn;
let prev_btn;
let nav_dots;
let initialized = false;

const createCarousel = function (carousel) {
  let nameWidth = names_track.getBoundingClientRect().width;
  let slideWidth = slides_track.getBoundingClientRect().width;
  names = Array.from(names_track.children);
  names[0].classList.add("current-slide");
  slides = Array.from(slides_track.children);
  slides[0].classList.add("current-slide");
  dots = Array.from(nav_dots.children);
  dots[0].classList.add("current-slide");
  // Arrange names
  const setNamePosition = (name, index) => {
    nameWidth = names_track.getBoundingClientRect().width;
    name.style.right = index * nameWidth + "px";
    name.style.zIndex = -1;
  };
  names.forEach(setNamePosition);
  names[0].style.zIndex = 1;
  // Arrange slides
  const setSlidePosition = (slide, index) => {
    slideWidth = slides_track.getBoundingClientRect().width;
    slide.style.left = index * slideWidth + "px";
    slide.style.zIndex = -1;
  };
  slides.forEach(setSlidePosition);
  slides[0].style.zIndex = 1;
  const fixNamePos = (currentName, currentIndex, targetName, targetIndex) => {
    if (
      parseInt(currentName.style.right, 10) -
        (currentIndex + 1 - (targetIndex + 1)) * parseInt(nameWidth, 10) !==
      parseInt(targetName.style.right, 10)
    ) {
      names.forEach(setNamePosition);
    }
  };
  const fixSlidePos = (
    currentSlide,
    currentIndex,
    targetSlide,
    targetIndex
  ) => {
    if (
      parseInt(currentSlide.style.left, 10) -
        (currentIndex + 1 - (targetIndex + 1)) * parseInt(slideWidth, 10) !==
      parseInt(targetSlide.style.left, 10)
    ) {
      slides.forEach(setSlidePosition);
    }
  };
  const moveToSlide = (slides_track, currentSlide, targetSlide) => {
    // move to next slide
    slides_track.style.transform =
      "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
    currentSlide.style.zIndex = -1;
    targetSlide.style.zIndex = 1;
  };
  const updateNames = (names_track, currentName, targetName) => {
    // move to next slide
    names_track.style.transform = "translateX(" + targetName.style.right + ")";
    currentName.classList.remove("current-slide");
    targetName.classList.add("current-slide");
    currentName.style.zIndex = -1;
    targetName.style.zIndex = 1;
  };
  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
  };
  // Slides left, when clicked left
  prev_btn.addEventListener("click", (e) => {
    const currentName = names_track.querySelector(".current-slide");
    let prevName = currentName.previousElementSibling;
    if (!prevName) {
      prevName = names[names.length - 1];
    }
    const currentSlide = slides_track.querySelector(".current-slide");
    let prevSlide = currentSlide.previousElementSibling;
    if (!prevSlide) {
      prevSlide = slides[slides.length - 1];
    }
    const currentDot = nav_dots.querySelector(".current-slide");
    let prevDot = currentDot.previousElementSibling;
    if (!prevDot) {
      prevDot = dots[dots.length - 1];
    }
    const currentIndex = slides.findIndex((slide) => slide === currentSlide);
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);
    fixNamePos(currentName, currentIndex, prevName, prevIndex);
    fixSlidePos(currentSlide, currentIndex, prevSlide, prevIndex);
    moveToSlide(slides_track, currentSlide, prevSlide);
    updateNames(names_track, currentName, prevName);
    updateDots(currentDot, prevDot);
  });
  // Slides right, when clicked right
  next_btn.addEventListener("click", (e) => {
    const currentName = names_track.querySelector(".current-slide");
    let nextName = currentName.nextElementSibling;
    if (!nextName) {
      nextName = names[0];
    }
    const currentSlide = slides_track.querySelector(".current-slide");
    let nextSlide = currentSlide.nextElementSibling;
    if (!nextSlide) {
      nextSlide = slides[0];
    }
    const currentDot = nav_dots.querySelector(".current-slide");
    let nextDot = currentDot.nextElementSibling;
    if (!nextDot) {
      nextDot = dots[0];
    }
    const currentIndex = slides.findIndex((slide) => slide === nextSlide);
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    fixNamePos(currentName, currentIndex, nextName, nextIndex);
    fixSlidePos(currentSlide, currentIndex, nextSlide, nextIndex);
    moveToSlide(slides_track, currentSlide, nextSlide);
    updateNames(names_track, currentName, nextName);
    updateDots(currentDot, nextDot);
  });
  // Slides nav
  nav_dots.addEventListener("click", (e) => {
    //Which indicator got clicked

    names.forEach(setNamePosition);
    slides.forEach(setSlidePosition);
    const targetDot = e.target.closest("button");
    if (!targetDot) return;

    const currentName = names_track.querySelector(".current-slide");
    const currentSlide = slides_track.querySelector(".current-slide");
    const currentDot = nav_dots.querySelector(".current-slide");
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetName = names[targetIndex];
    const targetSlide = slides[targetIndex];
    const currentIndex = slides.findIndex((slide) => slide === currentSlide);
    fixNamePos(currentName, currentIndex, targetName, targetIndex);
    fixSlidePos(currentSlide, currentIndex, targetSlide, targetIndex);
    moveToSlide(slides_track, currentSlide, targetSlide);
    updateNames(names_track, currentName, targetName);
    updateDots(currentDot, targetDot);
  });
};

const refreshCarousel = function (carousel) {
  names_track = carousel.querySelector("#names-track");
  slides_track = carousel.querySelector("#carousel-track");
  next_btn = carousel.querySelector("#carousel-right");
  prev_btn = carousel.querySelector("#carousel-left");
  nav_dots = carousel.querySelector(".carousel-nav");
  createCarousel(carousel);
  let transition = slides_track.style.transition;
  names_track.style.transition = "none";
  names_track.style.transform = "translateX(0px)";
  slides_track.style.transition = "none";
  slides_track.style.transform = "translateX(0px)";
  const fixNameVars = (name, index) => {
    nameWidth = names_track.getBoundingClientRect().width;
    name.style.right = index * nameWidth + "px";
    name.style.zIndex = -1;
    name.classList.remove("current-slide");
  };
  names = Array.from(names_track.children);
  names.forEach(fixNameVars);
  names[0].classList.add("current-slide");
  names[0].style.zIndex = 1;
  const fixSlideVars = (slide, index) => {
    slideWidth = slides_track.getBoundingClientRect().width;
    slide.style.left = index * slideWidth + "px";
    slide.style.zIndex = -1;
    slide.classList.remove("current-slide");
  };
  slides = Array.from(slides_track.children);
  slides.forEach(fixSlideVars);
  slides[0].classList.add("current-slide");
  slides[0].style.zIndex = 1;
  const fixDotsVars = (dot, index) => {
    dot.classList.remove("current-slide");
  };
  dots = Array.from(nav_dots.children);
  dots.forEach(fixDotsVars);
  dots[0].classList.add("current-slide");
  names_track.style.transition = transition;
  slides_track.style.transition = transition;
};
