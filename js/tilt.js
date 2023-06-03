VanillaTilt.init(document.querySelector("#image-comparison-slider"), {
  max: 5,
  speed: 700,
  scale: 1.05,
});
const slider = document.querySelector("#image-comparison-slider"),
  sliderImgWrapper = document.querySelector(
    "#image-comparison-slider .img-wrapper"
  ),
  sliderHandle = document.querySelector("#image-comparison-slider .handle");
function sliderMouseMove(e) {
  if (isSliderLocked) return;
  let s = slider.offsetLeft,
    i = slider.clientWidth,
    d = sliderHandle.clientWidth,
    r = (e.clientX || e.touches[0].clientX) - s;
  r < 0 ? (r = 0) : r > i && (r = i),
    (sliderImgWrapper.style.width = `${((1 - r / i) * 100).toFixed(4)}%`),
    (sliderHandle.style.left = `calc(${((r / i) * 100).toFixed(4)}% - ${
      d / 2
    }px)`);
}
slider.addEventListener("mousemove", sliderMouseMove, { passive: !0 }),
  slider.addEventListener("touchmove", sliderMouseMove, { passive: !0 });
let isSliderLocked = !1;
function sliderMouseDown(e) {
  isSliderLocked && (isSliderLocked = !1), sliderMouseMove(e);
}
function sliderMouseUp() {
  isSliderLocked || (isSliderLocked = !0);
}
function sliderMouseLeave() {
  isSliderLocked && (isSliderLocked = !1);
}
slider.addEventListener("mousedown", sliderMouseDown, { passive: !0 }),
  slider.addEventListener("touchstart", sliderMouseDown, { passive: !0 }),
  slider.addEventListener("mouseup", sliderMouseUp, { passive: !0 }),
  slider.addEventListener("touchend", sliderMouseUp, { passive: !0 }),
  slider.addEventListener("mouseleave", sliderMouseLeave, { passive: !0 });
