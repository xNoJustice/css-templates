const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");

const initSortableList = (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  sortableList.insertBefore(draggingItem, nextSibling);
};

items.forEach((item) => {
  item.addEventListener("dragstart", () =>
    setTimeout(() => item.classList.add("dragging"), 0)
  );
  item.addEventListener("dragend", () => item.classList.remove("dragging"));
  item.addEventListener("dragover", (e) => e.preventDefault());
  item.addEventListener("drop", initSortableList);
});
