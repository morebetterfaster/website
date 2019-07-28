require("./styles/index.scss");

window.addEventListener("scroll", e => {
  let scrollDown = document.getElementById("scroll-down");
  if (window.scrollY === 0) {
    scrollDown.style.display = "block";
  } else {
    scrollDown.style.display = "none";
  }
});
