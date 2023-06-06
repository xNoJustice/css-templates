const download = document.querySelector(".download");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const sizes = document.querySelector(".sizes");
const defaultUrl = "https://xnojustice.dev/";
let text = defaultUrl,
  size = 300;

function resolveDataUrl() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const img = document.querySelector("#qr-code img");
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }
      const canvas = document.querySelector("canvas");
      resolve(canvas.toDataURL());
    }, 50);
  });
}

async function generateQRCode() {
  qrContainer.innerHTML = "";
  new QRCode("qr-code", {
    text,
    width: size,
    height: size,
  });
  download.href = await resolveDataUrl();
}

qrText.addEventListener("input", (e) => {
  const value = e.target.value;
  text = value;
  if (!value) {
    text = defaultUrl;
  }
  generateQRCode();
});
sizes.addEventListener("change", (e) => {
  size = e.target.value;
  generateQRCode();
});

generateQRCode();
