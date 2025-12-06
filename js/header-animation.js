const SCROLL_THRESHOLD = 100;

const headerElement = document.querySelector("header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > SCROLL_THRESHOLD) {
    if (window.scrollY > lastScrollY) {
      headerElement.classList.add("header-hidden");
    } else {
      headerElement.classList.remove("header-hidden");
    }
  } else {
    headerElement.classList.remove("header-hidden");
  }

  lastScrollY = window.scrollY;
});
