// meet our artisan
    const maTrack = document.getElementById("ma-track");
    let maCards = Array.from(document.querySelectorAll(".ma-card"));

    let maCurrent = 2;

    function maCenterCard() {
        const maWrapWidth = document.querySelector(".ma-carousel-wrapper").offsetWidth;
        const maCardWidth = maCards[0].offsetWidth;

        let maTranslateX =
            maWrapWidth / 2 - maCardWidth / 2 - maCurrent * maCardWidth;

        maTrack.style.transform = `translateX(${maTranslateX}px)`;
    }

    function maUpdateActive() {
        maCards.forEach(c => c.classList.remove("ma-active"));
        maCards[maCurrent].classList.add("ma-active");
    }

    function maSlide(dir = 1) {
        maCurrent += dir;

        if (maCurrent < 0) maCurrent = maCards.length - 1;
        if (maCurrent >= maCards.length) maCurrent = 0;

        maUpdateActive();
        maCenterCard();
    }

    // Button actions
    document.querySelector(".ma-next").onclick = () => {
        maSlide(1);
        maRestartAuto();
    };

    document.querySelector(".ma-prev").onclick = () => {
        maSlide(-1);
        maRestartAuto();
    };

    // AUTO PLAYS EVERY 3 SECONDS
    let maAuto = setInterval(() => maSlide(1), 3000);

    function maRestartAuto() {
        clearInterval(maAuto);
        maAuto = setInterval(() => maSlide(1), 3000);
    }

    // HOVER → PAUSE
    document.querySelector(".ma-carousel-wrapper").addEventListener("mouseenter", () => {
        clearInterval(maAuto);
    });

    // MOUSE LEAVE → RESUME
    document.querySelector(".ma-carousel-wrapper").addEventListener("mouseleave", () => {
        maAuto = setInterval(() => maSlide(1), 3000);
    });

    // Initial setup
    maUpdateActive();
    maCenterCard();

    window.onresize = maCenterCard;
// end

// featured
    const fsWrapper = document.getElementById("fs-wrapper");
    const fsSlides = document.querySelectorAll(".fs-slide");
    let fsIndex = 0;

    function fsSlide() {
        fsIndex++;
        if (fsIndex >= fsSlides.length) fsIndex = 0;
        fsWrapper.style.transform = `translateX(-${fsIndex * 100}%)`;
    }

    let fsAutoSlide = setInterval(fsSlide, 3000);

    // NEXT Button
    document.querySelector(".fs-next").onclick = () => {
        fsSlide();
        fsRestart();
    };

    // PREV Button
    document.querySelector(".fs-prev").onclick = () => {
        fsIndex--;
        if (fsIndex < 0) fsIndex = fsSlides.length - 1;
        fsWrapper.style.transform = `translateX(-${fsIndex * 100}%)`;
        fsRestart();
    };

    function fsRestart() {
        clearInterval(fsAutoSlide);
        fsAutoSlide = setInterval(fsSlide, 3000);
    }

    document.querySelector(".fs-wrapper").addEventListener("mouseenter", () => {
    clearInterval(fsAutoSlide);
});

document.querySelector(".fs-wrapper").addEventListener("mouseleave", () => {
    fsAutoSlide = setInterval(fsSlide, 3000);
});

// end