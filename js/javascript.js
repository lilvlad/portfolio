document.getElementById("cards").onmousemove = (e) => {
  for (let t of document.getElementsByClassName("card")) {
    let a = t.getBoundingClientRect(),
      i = e.clientX - a.left,
      n = e.clientY - a.top;
    t.style.setProperty("--mouse-x", `${i}px`),
      t.style.setProperty("--mouse-y", `${n}px`);
  }
};
document.getElementById("cards2").onmousemove = (e) => {
  for (let t of document.getElementsByClassName("card")) {
    let a = t.getBoundingClientRect(),
      i = e.clientX - a.left,
      n = e.clientY - a.top;
    t.style.setProperty("--mouse-x", `${i}px`),
      t.style.setProperty("--mouse-y", `${n}px`);
  }
};
let index = 0,
  interval = 1e3;
const rand = (e, t) => Math.floor(Math.random() * (t - e + 1)) + e,
  animate = (e) => {
    e.style.setProperty("--star-left", `${rand(-10, 100)}%`),
      e.style.setProperty("--star-top", `${rand(-40, 80)}%`),
      (e.style.animation = "none"),
      e.offsetHeight,
      (e.style.animation = "");
  };
let timeouts = [],
  intervals = [];
const magic = document.querySelector(".magic");
(magic.onmouseenter = () => {
  let e = 1;
  for (let t of document.getElementsByClassName("magic-star"))
    timeouts.push(
      setTimeout(() => {
        animate(t), intervals.push(setInterval(() => animate(t), 1e3));
      }, 300 * e++)
    );
}),
  (magic.onmouseleave = onMouseLeave =
    () => {
      for (let e of timeouts) clearTimeout(e);
      for (let t of intervals) clearInterval(t);
      (timeouts = []), (intervals = []);
    });
const indicator = document.querySelector(".nav-indicator"),
  items = document.querySelectorAll(".nav-item");
function handleIndicator(e) {
  items.forEach((e) => {
    e.classList.remove("is-active"), e.removeAttribute("style");
  }),
    (indicator.style.width = `${e.offsetWidth}px`),
    (indicator.style.left = `${e.offsetLeft}px`),
    (indicator.style.backgroundColor = e.getAttribute("active-color")),
    e.classList.add("is-active");
}
function SwitchPage(e) {
  console.log(e);
  let t = document.querySelector(".pages .page.page-active");
  t.classList.remove("page-active");
  let a = document.querySelector(`.pages .page[data-page="${e}"]`);
  a.classList.add("page-active");
}
items.forEach((e, t) => {
  e.addEventListener("click", (e) => {
    handleIndicator(e.target);
  }),
    e.classList.contains("is-active") && handleIndicator(e);
}),
  (window.onload = () => {
    let e = document.querySelectorAll("[data-switcher]");
    for (let t = 0; t < e.length; t++) {
      let a = e[t],
        i = a.dataset.tab;
      a.addEventListener("click", () => {
        SwitchPage(i);
      });
    }
  });
const trailer = document.getElementById("trailer"),
  animateTrailer = (e, t) => {
    let a = e.clientX - trailer.offsetWidth / 2,
      i = e.clientY - trailer.offsetHeight / 2,
      n = { transform: `translate(${a}px, ${i}px) scale(${t ? 4 : 1})` };
    trailer.animate(n, { duration: 600, fill: "forwards" });
  },
  getTrailerClass = (e) =>
    "video" === e ? "ri-play-circle-fill" : "ri-arrow-right-up-line";
function hideTrailer() {
  document.getElementById("trailer").style.opacity = "0";
}
function showTrailer() {
  document.getElementById("trailer").style.opacity = "1";
}
window.onmousemove = (e) => {
  let t = e.target.closest(".interactable"),
    a = null !== t,
    i = document.getElementById("trailer-icon");
  animateTrailer(e, a),
    (trailer.dataset.type = a ? t.dataset.type : ""),
    a && (i.className = getTrailerClass(t.dataset.type));
};
const videoContainer = document.getElementById("video-container"),
  playButton = document.getElementById("play-button"),
  video = document.getElementById("video");
function updateProgressBar() {
  var e = (video.currentTime / video.duration) * 100;
  playButton.style.setProperty("--progress", e + "%");
}
function pauseProgressBar() {
  playButton.style.animationPlayState = "paused";
}
function resumeProgressBar() {
  playButton.style.animationPlayState = "running";
}
video.addEventListener("timeupdate", updateProgressBar),
  video.addEventListener("ended", pauseProgressBar),
  video.addEventListener("pause", pauseProgressBar),
  video.addEventListener("play", resumeProgressBar),
  videoContainer.addEventListener("mousemove", function (e) {
    let t = videoContainer.getBoundingClientRect(),
      a = e.clientX - t.left,
      i = e.clientY - t.top,
      n = playButton.offsetWidth,
      s = playButton.offsetHeight,
      o = t.width - n,
      r = t.height - s;
    (playButton.style.left = Math.min(Math.max(a - n / 2, 0), o) + "px"),
      (playButton.style.top = Math.min(Math.max(i - s / 2, 0), r) + "px");
  }),
  videoContainer.addEventListener("mouseleave", function () {
    setTimeout(function () {
      (playButton.style.left = "50%"),
        (playButton.style.top = "50%"),
        (playButton.style.transform = "translate(-50%, -50%) scale(1)"),
        (playButton.style.transition = "all 0.3s ease-out");
    }, 50);
  }),
  videoContainer.addEventListener("mouseover", function () {
    (playButton.style.transition = "transform ease-out 0.3s"),
      (playButton.style.transform = "scale(1.2)");
  }),
  videoContainer.addEventListener("mouseenter", function () {
    video.paused || (playButton.style.opacity = "1");
  }),
  videoContainer.addEventListener("mouseleave", function () {
    video.paused ||
      ((playButton.style.opacity = "0"),
      (playButton.style.transition = "opacity ease .5s"));
  }),
  videoContainer.addEventListener("click", function () {
    video.paused
      ? (video.play(),
        (playButton.innerHTML =
          ' <span class="pause-icon"><i class="ri-pause-circle-fill"></i></span> <div class="progress-bar-animation"> <div class="progress-bar-circle"></div> </div>'))
      : (video.pause(),
        (playButton.innerHTML =
          '<span class="play-icon"><i class="ri-play-circle-fill"></i></span><div class="progress-bar-animation"> <div class="progress-bar-circle"></div> </div>'));
  }),
  video.addEventListener("ended", function () {
    (playButton.innerHTML =
      '<span class="play-icon"><i class="ri-play-circle-fill"></i></span> <div class="progress-bar-animation"> <div class="progress-bar-circle"></div> </div>'),
      (playButton.style.opacity = "1");
  });
