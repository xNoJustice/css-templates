const fileUpload = document.getElementById("fileUpload");
const inputs = document.querySelectorAll("input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const newImg = new Image();

const defaultFilter = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};

const filters = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};

newImg.addEventListener(
  "load",
  function () {
    updateFilters(defaultFilter);
    window.URL.revokeObjectURL(this.src);
    document.getElementById("download-button").style.visibility = "visible";
  },
  false
);

fileUpload.addEventListener("change", () => {
  const file = fileUpload.files;
  newImg.src = URL.createObjectURL(file[0]);
  newImg.alt = file[0].name;
});

[].forEach.call(inputs, (input) => {
  input.addEventListener("input", () => {
    filters[input.id] = input.value;
    updateFilters(filters);
  });
});

const updateFilters = (f) => {
  HTMLFormControlsCollection.log;
  ctx.filter = `
    blur(${f.blur}px)
    brightness(${f.brightness}%)
    contrast(${f.contrast}%)
    grayscale(${f.grayscale}%)
    hue-rotate(${f.hueRotate}deg)
    invert(${f.invert}%)
    opacity(${f.opacity}%)
    saturate(${f.saturate}%)
    sepia(${f.sepia}%)
  `;
  ctx.drawImage(newImg, 0, 0, 300, 200);
};

const downloadImage = () => {
  const download = document.createElement("a");
  download.addEventListener(
    "click",
    () => {
      download.href = canvas.toDataURL();
      download.download = newImg.alt;
    },
    false
  );

  document.body.appendChild(download);
  download.click();
  document.body.removeChild(download);
};
