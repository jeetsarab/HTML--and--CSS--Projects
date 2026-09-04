"use strict";

(() => {
    const thumbnails = Array.from(document.querySelectorAll("#gallery img[data-full]"));
    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");
    let currentIndex = 0;
    let opener = null;

    function showImage(index) {
        currentIndex = (index + thumbnails.length) % thumbnails.length;
        const thumbnail = thumbnails[currentIndex];
        image.src = thumbnail.dataset.full;
        image.alt = thumbnail.alt;
        caption.textContent = `${currentIndex + 1} / ${thumbnails.length} — ${thumbnail.alt}`;
    }

    function openLightbox(index) {
        opener = thumbnails[index];
        showImage(index);
        lightbox.showModal();
        document.body.classList.add("lightbox-open");
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => openLightbox(index));
        thumbnail.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(index);
            }
        });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
    lightbox.querySelector(".lightbox-previous").addEventListener("click", () => showImage(currentIndex - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(currentIndex + 1));
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            showImage(currentIndex + (event.key === "ArrowLeft" ? -1 : 1));
        }
    });
    // Native dialog handles Escape, traps focus, and makes the page behind it inert.
    lightbox.addEventListener("close", () => {
        document.body.classList.remove("lightbox-open");
        opener?.focus();
    });
})();
