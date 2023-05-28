/* before and after slider */

VanillaTilt.init(document.querySelector("#image-comparison-slider"), {
  // Tilt Effect - vanilla-tilt.js (https://micku7zu.github.io/vanilla-tilt.js/) is required for this
  max: 5, // max tilt rotation (degrees (deg))
  speed: 700, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
  scale: 1.05, // transform scale - 2 = 200%, 1.5 = 150%, etc..
});

const slider = document.querySelector("#image-comparison-slider");
const sliderImgWrapper = document.querySelector(
  "#image-comparison-slider .img-wrapper"
);
const sliderHandle = document.querySelector("#image-comparison-slider .handle");

slider.addEventListener("mousemove", sliderMouseMove, { passive: true });
slider.addEventListener("touchmove", sliderMouseMove, { passive: true });

function sliderMouseMove(event) {
  if (isSliderLocked) return;

  const sliderLeftX = slider.offsetLeft;
  const sliderWidth = slider.clientWidth;
  const sliderHandleWidth = sliderHandle.clientWidth;

  let mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX;
  if (mouseX < 0) mouseX = 0;
  else if (mouseX > sliderWidth) mouseX = sliderWidth;

  sliderImgWrapper.style.width = `${((1 - mouseX / sliderWidth) * 100).toFixed(
    4
  )}%`;
  sliderHandle.style.left = `calc(${((mouseX / sliderWidth) * 100).toFixed(
    4
  )}% - ${sliderHandleWidth / 2}px)`;
}

let isSliderLocked = false;

slider.addEventListener("mousedown", sliderMouseDown, { passive: true });
slider.addEventListener("touchstart", sliderMouseDown, { passive: true });
slider.addEventListener("mouseup", sliderMouseUp, { passive: true });
slider.addEventListener("touchend", sliderMouseUp, { passive: true });
slider.addEventListener("mouseleave", sliderMouseLeave, { passive: true });

function sliderMouseDown(event) {
  if (isSliderLocked) isSliderLocked = false;
  sliderMouseMove(event);
}

function sliderMouseUp() {
  if (!isSliderLocked) isSliderLocked = true;
}

function sliderMouseLeave() {
  if (isSliderLocked) isSliderLocked = false;
}
