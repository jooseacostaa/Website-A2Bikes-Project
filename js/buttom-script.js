const SCROLL_TO_TOP_BTN = document.getElementById("scroll-to-top-btn");

function toggleScrollButtonVisibility() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        SCROLL_TO_TOP_BTN.style.display = "block";
    } else {
        SCROLL_TO_TOP_BTN.style.display = "none";
    }
}

window.onscroll = toggleScrollButtonVisibility;

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

SCROLL_TO_TOP_BTN.addEventListener("click", scrollToTop);