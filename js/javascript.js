/* Hover Cards */
document.getElementById("cards").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

/* Magical Text */

let index = 0,
  interval = 1000;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (star) => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
};

let timeouts = [],
  intervals = [];

const magic = document.querySelector(".magic");

magic.onmouseenter = () => {
  let index = 1;

  for (const star of document.getElementsByClassName("magic-star")) {
    timeouts.push(
      setTimeout(() => {
        animate(star);

        intervals.push(setInterval(() => animate(star), 1000));
      }, index++ * 300)
    );
  }
};

magic.onmouseleave = onMouseLeave = () => {
  for (const t of timeouts) clearTimeout(t);
  for (const i of intervals) clearInterval(i);

  timeouts = [];
  intervals = [];
};

/* Navbar */

const indicator = document.querySelector(".nav-indicator");
const items = document.querySelectorAll(".nav-item");

function handleIndicator(el) {
  items.forEach((item) => {
    item.classList.remove("is-active");
    item.removeAttribute("style");
  });

  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.left = `${el.offsetLeft}px`;
  indicator.style.backgroundColor = el.getAttribute("active-color");

  el.classList.add("is-active");
  /* el.style.color = el.getAttribute("active-color"); */
  /* el.style.color = "#fff"; */
}

items.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    handleIndicator(e.target);
  });
  item.classList.contains("is-active") && handleIndicator(item);
});

/* Page Switcher */

window.onload = () => {
  const tab_switchers = document.querySelectorAll("[data-switcher]");

  for (let i = 0; i < tab_switchers.length; i++) {
    const tab_switcher = tab_switchers[i];
    const page_id = tab_switcher.dataset.tab;

    tab_switcher.addEventListener("click", () => {
      SwitchPage(page_id);
    });
  }
};

function SwitchPage(page_id) {
  console.log(page_id);

  const current_page = document.querySelector(".pages .page.page-active");
  current_page.classList.remove("page-active");

  const next_page = document.querySelector(
    `.pages .page[data-page="${page_id}"]`
  );
  next_page.classList.add("page-active");
}

/* Carousel */
/* 
var carousel = document.querySelector(".carousel");
var carouselContent = document.querySelector(".carousel-content");
var slides = document.querySelectorAll(".slide");
var arrayOfSlides = Array.prototype.slice.call(slides);
var carouselDisplaying;
var screenSize;
setScreenSize();
var lengthOfSlide;

function addClone() {
  var lastSlide = carouselContent.lastElementChild.cloneNode(true);
  lastSlide.style.left = -lengthOfSlide + "px";
  carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
}
// addClone();

function removeClone() {
  var firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
}

function moveSlidesRight() {
  var slides = document.querySelectorAll(".slide");
  var slidesArray = Array.prototype.slice.call(slides);
  var width = 0;

  slidesArray.forEach(function (el, i) {
    el.style.left = width + "px";
    width += lengthOfSlide;
  });
  addClone();
}
moveSlidesRight();

function moveSlidesLeft() {
  var slides = document.querySelectorAll(".slide");
  var slidesArray = Array.prototype.slice.call(slides);
  slidesArray = slidesArray.reverse();
  var maxWidth = (slidesArray.length - 1) * lengthOfSlide;

  slidesArray.forEach(function (el, i) {
    maxWidth -= lengthOfSlide;
    el.style.left = maxWidth + "px";
  });
}

window.addEventListener("resize", setScreenSize);

function setScreenSize() {
  if (window.innerWidth >= 500) {
    carouselDisplaying = 3;
  } else if (window.innerWidth >= 300) {
    carouselDisplaying = 2;
  } else {
    carouselDisplaying = 1;
  }
  getScreenSize();
}

function getScreenSize() {
  var slides = document.querySelectorAll(".slide");
  var slidesArray = Array.prototype.slice.call(slides);
  lengthOfSlide = carousel.offsetWidth / carouselDisplaying;
  var initialWidth = -lengthOfSlide;
  slidesArray.forEach(function (el) {
    el.style.width = lengthOfSlide + "px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfSlide;
  });
}

var rightNav = document.querySelector(".nav-right");
rightNav.addEventListener("click", moveLeft);

var moving = true;
function moveRight() {
  if (moving) {
    moving = false;
    var lastSlide = carouselContent.lastElementChild;
    lastSlide.parentNode.removeChild(lastSlide);
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    removeClone();
    var firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener("transitionend", activateAgain);
    moveSlidesRight();
  }
}

function activateAgain() {
  var firstSlide = carouselContent.firstElementChild;
  moving = true;
  firstSlide.removeEventListener("transitionend", activateAgain);
}

var leftNav = document.querySelector(".nav-left");
leftNav.addEventListener("click", moveRight);

// var moveLeftAgain = true;

function moveLeft() {
  if (moving) {
    moving = false;
    removeClone();
    var firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener("transitionend", replaceToEnd);
    moveSlidesLeft();
  }
}

function replaceToEnd() {
  var firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
  carouselContent.appendChild(firstSlide);
  firstSlide.style.left = (arrayOfSlides.length - 1) * lengthOfSlide + "px";
  addClone();
  moving = true;
  firstSlide.removeEventListener("transitionend", replaceToEnd);
}

carouselContent.addEventListener("mousedown", seeMovement);

var initialX;
var initialPos;
function seeMovement(e) {
  initialX = e.clientX;
  getInitialPos();
  carouselContent.addEventListener("mousemove", slightMove);
  document.addEventListener("mouseup", moveBasedOnMouse);
}

function slightMove(e) {
  if (moving) {
    var movingX = e.clientX;
    var difference = initialX - movingX;
    if (Math.abs(difference) < lengthOfSlide / 4) {
      slightMoveSlides(difference);
    }
  }
}

function getInitialPos() {
  var slides = document.querySelectorAll(".slide");
  var slidesArray = Array.prototype.slice.call(slides);
  initialPos = [];
  slidesArray.forEach(function (el) {
    var left = Math.floor(parseInt(el.style.left.slice(0, -2)));
    initialPos.push(left);
  });
}

function slightMoveSlides(newX) {
  var slides = document.querySelectorAll(".slide");
  var slidesArray = Array.prototype.slice.call(slides);
  slidesArray.forEach(function (el, i) {
    var oldLeft = initialPos[i];
    el.style.left = oldLeft + newX + "px";
  });
}

function moveBasedOnMouse(e) {
  var finalX = e.clientX;
  if (initialX - finalX > 0) {
    moveRight();
  } else if (initialX - finalX < 0) {
    moveLeft();
  }
  document.removeEventListener("mouseup", moveBasedOnMouse);
  carouselContent.removeEventListener("mousemove", slightMove);
} */
/* end carousel */

/* mouse trailer */
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
    y = e.clientY - trailer.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 4 : 1})`,
  };

  trailer.animate(keyframes, {
    /* delay */
    duration: 600,
    fill: "forwards",
  });
};

const getTrailerClass = (type) => {
  switch (type) {
    case "video":
      return "ri-play-circle-fill";
    default:
      return "ri-arrow-right-up-line";
  }
};

window.onmousemove = (r) => {
  const interactable = r.target.closest(".interactable"),
    interacting = interactable !== null;

  const icon = document.getElementById("trailer-icon");

  animateTrailer(r, interacting);

  trailer.dataset.type = interacting ? interactable.dataset.type : "";

  if (interacting) {
    icon.className = getTrailerClass(interactable.dataset.type);
  }
};

function hideTrailer() {
  var trailer = document.getElementById("trailer");
  trailer.style.opacity = "0";
}

function showTrailer() {
  var trailer = document.getElementById("trailer");
  trailer.style.opacity = "1";
}
/* end mouse trailer */

/* video play */

// MAIN PART FOR THE VIDEO AND PLAY BUTTON

const videoContainer = document.getElementById("video-container");
const playButton = document.getElementById("play-button");
const video = document.getElementById("video");

// Update the progress bar based on the video time
function updateProgressBar() {
  var progress = (video.currentTime / video.duration) * 100;
  playButton.style.setProperty("--progress", progress + "%");
}

// Pause the progress bar animation when the video ends or is paused
function pauseProgressBar() {
  playButton.style.animationPlayState = "paused";
}

// Resume the progress bar animation when the video is playing
function resumeProgressBar() {
  playButton.style.animationPlayState = "running";
}

// Listen for the 'timeupdate' event on the video element
video.addEventListener("timeupdate", updateProgressBar);

// Listen for the 'ended' event on the video element
video.addEventListener("ended", pauseProgressBar);

// Listen for the 'pause' event on the video element
video.addEventListener("pause", pauseProgressBar);

// Listen for the 'play' event on the video element
video.addEventListener("play", resumeProgressBar);

videoContainer.addEventListener("mousemove", function (event) {
  const containerRect = videoContainer.getBoundingClientRect();
  const mouseX = event.clientX - containerRect.left;
  const mouseY = event.clientY - containerRect.top;

  const buttonWidth = playButton.offsetWidth;
  const buttonHeight = playButton.offsetHeight;
  const buttonX = mouseX - buttonWidth / 2;
  const buttonY = mouseY - buttonHeight / 2;

  const maxButtonX = containerRect.width - buttonWidth;
  const maxButtonY = containerRect.height - buttonHeight;
  playButton.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
  playButton.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
});

videoContainer.addEventListener("mouseleave", function () {
  setTimeout(function () {
    playButton.style.left = "50%";
    playButton.style.top = "50%";
    playButton.style.transform = "translate(-50%, -50%) scale(1)";
    playButton.style.transition = "all 0.3s ease-out";
  }, 50);
});

videoContainer.addEventListener("mouseover", function () {
  playButton.style.transition = "transform ease-out 0.3s";
  playButton.style.transform = "scale(1.2)";
});

/* const video = document.getElementById("video"); */

videoContainer.addEventListener("mouseenter", function () {
  if (!video.paused) {
    playButton.style.opacity = "1";
  }
});

videoContainer.addEventListener("mouseleave", function () {
  if (!video.paused) {
    playButton.style.opacity = "0";
    playButton.style.transition = "opacity ease .5s";
  }
});

videoContainer.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playButton.innerHTML =
      ' <span class="pause-icon"><i class="ri-pause-circle-fill"></i></span> <div class="progress-bar-animation"> <div class="progress-bar-circle"></div> </div>';
  } else {
    video.pause();
    playButton.innerHTML =
      '<span class="play-icon"><i class="ri-play-circle-fill"></i></span><div class="progress-bar-animation"> <div class="progress-bar-circle"></div> </div>';
  }
});

video.addEventListener("ended", function () {
  playButton.innerHTML =
    '<span class="play-icon"><i class="ri-play-circle-fill"></i></span> <div class="progress-bar-animation"> <div class="progress-bar-circle"></div> </div>';
  playButton.style.opacity = "1";
});

// END OF MAIN PART FOR THE VIDEO AND PLAY BUTTON

// Optional - Code for inputting video
/* const videoSource = document.getElementById("video-source");
const videoUrl = document.getElementById("video-url");
const loadButton = document.getElementById("load-button");

function loadVideo() {
  const url = videoUrl.value.trim();
  if (!url) return;
  videoSource.setAttribute("src", url);
  video.load();
  video.play();
}

loadButton.addEventListener("click", function () {
  loadVideo();
  video.play();
  playButton.innerHTML =
    '<span class="pause-icon"><i class="ri-pause-circle-fill"></i></span> <div class="progress-bar-animation"> <div class="progress-bar-circle"></div> </div> ';
  playButton.style.opacity = "0";
  playButton.style.transition = "opacity ease .5s";
}); */
/* End Video Play */

/* Shorts */

/* const shortsContainer = document.querySelector(".shorts-container");
const shorts = document.querySelector(".shorts");
const interactable = document.querySelector(".interactable");

//Shorts nao reproduz por interferencia com a funcao de cima do OPTIONAL Mouse Video Play BTN
shortsContainer.addEventListener("click", function () {
  if (shorts.paused) {
    shorts.play();
    shorts.style.opacity = "1";
  } else {
    shorts.pause();
    shorts.style.opacity = "1";
  }
});
 */
