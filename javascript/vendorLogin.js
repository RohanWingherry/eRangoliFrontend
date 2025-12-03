document.addEventListener("DOMContentLoaded", function () {

    const successBox = document.getElementById("vendorLoginSuccessMsg");
    const closeBtn = document.getElementById("vendorLoginCloseSuccess");

    // URL PARAM CHECK
    const urlParams = new URLSearchParams(window.location.search);
    const cameFromRegistration = urlParams.get("registered");

    if (cameFromRegistration === "1") {
        successBox.style.display = "block";
    } else {
        successBox.style.display = "none";
    }

    // close message manually
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            successBox.style.display = "none";
        });
    }

});
