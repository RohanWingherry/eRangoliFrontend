document.addEventListener("DOMContentLoaded", function () {
    const forgotLink = document.querySelector(".vendorLoginForgot");
    const loginPage = document.querySelector(".vendorLoginPage");
    const resetPage = document.getElementById("vendorResetPage");
    const backToLogin = document.getElementById("vendorResetBack");

    const successBox = document.getElementById("vendorLoginSuccessMsg");
    const closeBtn = document.getElementById("vendorLoginCloseSuccess");

    // reset success elements
    const resetForm = document.getElementById("vendorResetForm");
    const resetSuccess = document.getElementById("vendorLoginResetSuccess");
    const resetClose = document.getElementById("vendorLoginCloseReset");

    // reset input
    const resetUser = document.getElementById("vendorResetUser");

    // URL PARAM CHECK (for registration success)
    const urlParams = new URLSearchParams(window.location.search);
    const cameFromRegistration = urlParams.get("registered");

    if (successBox) {
        if (cameFromRegistration === "1") {
            successBox.style.display = "block";
        } else {
            successBox.style.display = "none";
        }
    }

    // close registration success
    if (closeBtn && successBox) {
        closeBtn.addEventListener("click", () => {
            successBox.style.display = "none";
        });
    }

    // ---------- Reset Password screen open ----------
    if (forgotLink && resetPage && loginPage) {
        forgotLink.addEventListener("click", function (e) {
            e.preventDefault();
            loginPage.style.display = "none";
            resetPage.style.display = "flex";
        });
    }

    // back link from reset -> login
    if (backToLogin && resetPage && loginPage) {
        backToLogin.addEventListener("click", function (e) {
            e.preventDefault();
            resetPage.style.display = "none";
            loginPage.style.display = "flex";
        });
    }

    // ----------  "Request reset link" ----------
    if (resetForm && resetPage && loginPage) {
        resetForm.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!resetUser || !resetUser.value.trim()) {
                return;
            }

            resetPage.style.display = "none";
            loginPage.style.display = "flex";

            if (successBox) {
                successBox.style.display = "none";
            }


            if (resetSuccess) {
                resetSuccess.style.display = "block";
            }
        });
    }

    // close reset success box
    if (resetClose && resetSuccess) {
        resetClose.addEventListener("click", () => {
            resetSuccess.style.display = "none";
        });
    }
});
