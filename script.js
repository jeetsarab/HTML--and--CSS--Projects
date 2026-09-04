// -------------------- Slideshow --------------------
// Keep track of the slide that is currently visible.
var slideNumber = 0;
var slides = document.querySelectorAll(".slide");
var dots = document.querySelectorAll(".slide-dot");
var previousButton = document.querySelector(".previous");
var nextButton = document.querySelector(".next");
var slideTimer;

function showSlide(number) {
    // Wrap around when the user moves past the first or last slide.
    if (number >= slides.length) {
        slideNumber = 0;
    } else if (number < 0) {
        slideNumber = slides.length - 1;
    } else {
        slideNumber = number;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active-slide");
        dots[i].classList.remove("active-dot");
        dots[i].setAttribute("aria-current", "false");
    }

    slides[slideNumber].classList.add("active-slide");
    dots[slideNumber].classList.add("active-dot");
    dots[slideNumber].setAttribute("aria-current", "true");
}

function changeSlide(amount) {
    showSlide(slideNumber + amount);
    restartSlideshow();
}

function chooseSlide(number) {
    showSlide(number);
    restartSlideshow();
}

function startSlideshow() {
    slideTimer = window.setInterval(function () {
        showSlide(slideNumber + 1);
    }, 5000);
}

function restartSlideshow() {
    window.clearInterval(slideTimer);
    startSlideshow();
}

previousButton.addEventListener("click", function () {
    changeSlide(-1);
});

nextButton.addEventListener("click", function () {
    changeSlide(1);
});

for (var i = 0; i < dots.length; i++) {
    (function (dotNumber) {
        dots[dotNumber].addEventListener("click", function () {
            chooseSlide(dotNumber);
        });
    })(i);
}

showSlide(slideNumber);
startSlideshow();

// -------------------- Contact pop-up --------------------
var contactPopup = document.getElementById("Contact");
var contactLink = document.querySelector('.Navbar a[href="#Contact"]');
var openContactButton = document.querySelector(".open-contact");
var closeContactButton = document.querySelector(".close-contact");
var contactBackdrop = document.querySelector(".contact-backdrop");
var lastFocusedElement;

function openContactForm(event) {
    if (event) {
        event.preventDefault();
    }

    lastFocusedElement = document.activeElement;
    contactPopup.hidden = false;
    document.body.classList.add("popup-open");
    closeContactButton.focus();
}

function closeContactForm() {
    contactPopup.hidden = true;
    document.body.classList.remove("popup-open");

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

contactLink.addEventListener("click", openContactForm);
openContactButton.addEventListener("click", openContactForm);
closeContactButton.addEventListener("click", closeContactForm);
contactBackdrop.addEventListener("click", closeContactForm);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !contactPopup.hidden) {
        closeContactForm();
    }
});

// -------------------- Form validation --------------------
var contactForm = document.getElementById("contact-form");
var nameField = document.getElementById("Name");
var emailField = document.getElementById("Email");
var messageField = document.getElementById("Message");
var successMessage = document.getElementById("form-success");

function showError(field, errorId, message) {
    field.classList.add("invalid-field");
    field.setAttribute("aria-invalid", "true");
    document.getElementById(errorId).textContent = message;
}

function clearError(field, errorId) {
    field.classList.remove("invalid-field");
    field.removeAttribute("aria-invalid");
    document.getElementById(errorId).textContent = "";
}

function isValidEmail(email) {
    // This simple pattern checks for text before and after the @ symbol and a dot.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(event) {
    event.preventDefault();
    var formIsValid = true;
    var name = nameField.value.trim();
    var email = emailField.value.trim();
    var message = messageField.value.trim();

    successMessage.textContent = "";
    clearError(nameField, "name-error");
    clearError(emailField, "email-error");
    clearError(messageField, "message-error");

    if (name === "") {
        showError(nameField, "name-error", "Please enter your name.");
        formIsValid = false;
    }

    if (email === "") {
        showError(emailField, "email-error", "Please enter your email address.");
        formIsValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailField, "email-error", "Please enter a valid email address.");
        formIsValid = false;
    }

    if (message === "") {
        showError(messageField, "message-error", "Please enter a message.");
        formIsValid = false;
    }

    if (formIsValid) {
        successMessage.textContent = "Thank you! Your information is valid. No information was sent or stored.";
        contactForm.reset();
    }
}

contactForm.addEventListener("submit", validateForm);
