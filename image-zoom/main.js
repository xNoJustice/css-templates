const img = document.getElementById("img");
const fileUpload = document.getElementById("fileUpload");

fileUpload.addEventListener("change", () => {
  const file = fileUpload.files;
  img.src = URL.createObjectURL(file[0]);
  img.alt = file[0].name;
  img.style.visibility = "visible";
  magnify("zoom", 2);
});

const lensSize = 200;

function magnify(id, zoom) {
  const el = document.getElementById(id);
  const copy = el.cloneNode(true);
  const lens = document.createElement("div");

  lens.setAttribute("id", "lens");
  lens.style.width = lensSize + "px";
  lens.style.height = lensSize + "px";

  el.appendChild(lens);
  el.getBoundingClientRect();
  copy.style.zoom = zoom;
  lens.appendChild(copy);

  copy.style.width = el.offsetWidth * zoom + "px";
  copy.style.heigth = el.offsetHeight * zoom + "px";
  copy.style.position = "absolute";

  el.addEventListener("mousemove", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const pos = getCursorPos(ev);
    lens.style.left = -(lensSize / 2) + pos.x + "px";
    lens.style.top = -(lensSize / 2) + pos.y + "px";
    copy.style.left = -(pos.x - el.offsetLeft) + (lensSize / zoom) * 0.5 + "px";
    copy.style.top = -(pos.y - el.offsetTop) + (lensSize / zoom) * 0.5 + "px";
    if (pos.x < el.offsetLeft) {
      lens.style.visibility = "hidden";
    } else if (pos.y < el.offsetTop) {
      lens.style.visibility = "hidden";
    } else {
      lens.style.visibility = "visible";
    }
  });
}

function getCursorPos(e) {
  var x = window.Event
    ? e.pageX
    : e.clientX +
      (document.documentElement.scrollLeft
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft);
  var y = window.Event
    ? e.pageY
    : e.clientY +
      (document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop);
  return { x: x, y: y };
}
