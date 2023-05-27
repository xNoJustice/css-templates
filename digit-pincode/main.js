const inputs = document.querySelectorAll("input");
const codeBlock = document.getElementById("code-block");
const code = document.getElementById("code");
const form = document.querySelector("form");

// Focus on first input on page load
window.onload = function () {
  document.querySelectorAll("input")[0].focus();
};

inputs.forEach((input, key) => {
  if (key !== 0) {
    input.addEventListener("click", () => {
      inputs[0].focus();
    });
  }
  input.addEventListener("keyup", () => {
    if (input.value) {
      if (key === 3) {
        const userCode = [...inputs].map((input) => input.value).join("");
        codeBlock.classList.remove("hidden");
        code.innerText = `"${userCode}"`;
      } else {
        inputs[key + 1].focus();
      }
    }
  });
});

const reset = () => {
  form.reset();
  codeBlock.classList.add("hidden");
  code.innerText = "";
  document.querySelectorAll("input")[0].focus();
};
