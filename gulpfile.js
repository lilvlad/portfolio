// gulpfile.js
const { src, dest } = require("gulp");
const sharpResponsive = require("gulp-sharp-responsive");

const img = () =>
  src("assets/img/*.png")
    .pipe(
      sharpResponsive({
        formats: [
          // jpeg
          { width: 640, format: "jpeg", rename: { suffix: "-sm" } },
          { width: 768, format: "jpeg", rename: { suffix: "-md" } },
          { width: 1024, format: "jpeg", rename: { suffix: "-lg" } },
          // webp
          { width: 640, format: "webp", rename: { suffix: "-sm" } },
          { width: 768, format: "webp", rename: { suffix: "-md" } },
          { width: 1024, format: "webp", rename: { suffix: "-lg" } },
          // avif
          { width: 640, format: "avif", rename: { suffix: "-sm" } },
          { width: 768, format: "avif", rename: { suffix: "-md" } },
          { width: 1024, format: "avif", rename: { suffix: "-lg" } },
        ],
      })
    )
    .pipe(dest("assets/img/responsive/"));

module.exports = {
  img,
};
