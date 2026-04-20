document.addEventListener("DOMContentLoaded", () => {

    // Elements
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let form = document.getElementById("contact-form");
    let statusMsg = document.getElementById("status-message");
    let statusIcon = document.getElementById("status-icon");
    let statusTitle = document.getElementById("status-title");
    let statusText = document.getElementById("status-text");
    let hireBtn = document.querySelector(".hire-btn");
    let popup = document.getElementById("hire-popup");
    let closeBtn = document.querySelector(".close-btn");
    let priceCards = document.querySelectorAll(".price-card");
    let planInput = document.getElementById("selected-plan");
    let hireForm = document.getElementById("hire-form");

    // Mobile menu
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    // Close menu on nav link click
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        });
    });

    // Show status message
    function showMessage(type, title, text) {
        statusMsg.classList.remove("success", "error");

        if (type === "success") {
            statusMsg.classList.add("success");
            statusIcon.className = "bx bx-check-circle";
        } else {
            statusMsg.classList.add("error");
            statusIcon.className = "bx bx-x-circle";
        }

        statusTitle.textContent = title;
        statusText.textContent = text;
        statusMsg.classList.add("show");

        setTimeout(() => {
            statusMsg.classList.remove("show");
        }, 4000);
    }

    // Reusable form submit handler
    async function handleFormSubmit(form, successTitle, successText, onSuccess) {
        let formData = new FormData(form);
        try {
            let response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                showMessage("success", successTitle, successText);
                form.reset();
                if (onSuccess) onSuccess();
            } else {
                showMessage("error", "Oops!", "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            showMessage("error", "Network Error", "Check your connection.");
        }
    }

    // Contact form
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormSubmit(form, "Message Sent!", "I'll get back to you soon.");
    });

    // Hire popup open
    hireBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup.classList.add("active");
        priceCards.forEach(c => c.classList.remove("active"));
        document.querySelector('.price-card[data-plan="Basic"]').classList.add("active");
        planInput.value = "Basic";
    });

    // Hire popup close
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    window.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    });

    // Price card selection
    priceCards.forEach(card => {
        card.addEventListener("click", () => {
            priceCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            planInput.value = card.dataset.plan;
        });
    });

    // Hire form
    hireForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormSubmit(hireForm, "Request Sent!", "I'll contact you soon.", () => {
            popup.classList.remove("active");
            priceCards.forEach(c => c.classList.remove("active"));
        });
    });

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }, 300); // small delay lets the transition finish
    });
});
});