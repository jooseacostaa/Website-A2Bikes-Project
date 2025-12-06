function listenToEvents() {
    let contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", validateContactForm);
}

function validateContactForm(event) {

    let name = event.target["name"].value.trim();
    let email = event.target["email"].value.trim();
    let favoriteBike = event.target["favorite-bike"].value.trim();
    let currentBike = event.target["current-bike"].value.trim();

    let hasError = false;

    function toggleErrorVisibility(field, errorElementId) {
        if (field === "") {
            document.getElementById(errorElementId).style.visibility = "visible";
            return true;
        } else {
            document.getElementById(errorElementId).style.visibility = "hidden";
            return false;
        }
    }

    hasError |= toggleErrorVisibility(name, "name-error");
    hasError |= toggleErrorVisibility(email, "email-error");
    hasError |= toggleErrorVisibility(favoriteBike, "favorite-bike-error");
    hasError |= toggleErrorVisibility(currentBike, "current-bike-error");

    if (hasError) {
        event.preventDefault();
    }
}

listenToEvents();