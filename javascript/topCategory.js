// Categories Carousel
const cardsWrapper1 = document.getElementById("top-cardsWrapper");
    const cards1 = Array.from(document.querySelectorAll(".top-card"));
    const prevBtn1 = document.getElementById("top-prevBtn");
    const nextBtn1 = document.getElementById("top-nextBtn");
    const carousel1 = document.getElementById("top-carousel");

    let currentIndex1 = 0;
    let cardsPerView1 = 1;

    function getCardsPerViewFromCSS() {
      if (window.matchMedia("(min-width:1441px)").matches) return 5;
      if (window.matchMedia("(min-width:1025px) and (max-width:1440px)").matches) return 4;
      if (window.matchMedia("(min-width:768px) and (max-width:1024px)").matches) return 3;
      if (window.matchMedia("(min-width:425px) and (max-width:767px)").matches) return 2;
      return 1; // width < 425px
    }

    function getHorizontalMargin(el) {
      const style = getComputedStyle(el);
      return parseFloat(style.marginLeft || 0) + parseFloat(style.marginRight || 0);
    }

    function calculateLayout() {
      if (!cards1.length) return;

      cardsPerView1 = getCardsPerViewFromCSS();

      if (currentIndex1 + cardsPerView1 > cards1.length) {
        currentIndex1 = Math.max(0, cards1.length - cardsPerView1);
      }

      updateCarousel();
    }

    function updateButtons() {
      const allVisible = cardsPerView1 >= cards1.length;

      if (allVisible) {
        prevBtn1.disabled = true;
        nextBtn1.disabled = true;
        return;
      }

      prevBtn1.disabled = currentIndex1 === 0;
      nextBtn1.disabled = (currentIndex1 + cardsPerView1) >= cards1.length;
    }

    function updateCarousel() {
      if (!cards1.length) return;

      const cardRect = cards1[0].getBoundingClientRect();
      const cardFullWidth = Math.round(cardRect.width + getHorizontalMargin(cards1[0]));

      const containerWidth = Math.floor(carousel1.clientWidth);
      const totalCards = cards1.length;
      const totalWidth = totalCards * cardFullWidth;

      if (totalWidth <= containerWidth) {
        const offset = Math.round((containerWidth - totalWidth) / 2);
        cardsWrapper1.style.transform = `translateX(${offset}px)`;
      } else {
        let translateX = -currentIndex1 * cardFullWidth;

        const visibleWidth = cardsPerView1 * cardFullWidth;
        const overflow = totalWidth - visibleWidth;

        if (currentIndex1 + cardsPerView1 >= totalCards) {
          translateX = -overflow;
        }

        cardsWrapper1.style.transform = `translateX(${translateX}px)`;
      }

      updateButtons();
    }

    nextBtn1.addEventListener("click", () => {
      currentIndex1 += cardsPerView1;

      if (currentIndex1 + cardsPerView1 > cards1.length) {
        currentIndex1 = cards1.length - cardsPerView1;
        if (currentIndex1 < 0) currentIndex1 = 0;
      }

      updateCarousel();
    });

    prevBtn1.addEventListener("click", () => {
      currentIndex1 -= cardsPerView1;
      if (currentIndex1 < 0) currentIndex1 = 0;
      updateCarousel();
    });

    let resizeObserver1 = null;
    function startObservers() {
      window.addEventListener("resize", calculateLayout);

      if ('ResizeObserver' in window) {
        resizeObserver1 = new ResizeObserver(calculateLayout);
        resizeObserver1.observe(carousel1);
        resizeObserver1.observe(cardsWrapper1);
      }
    }

    window.requestAnimationFrame(() => {
      calculateLayout();
      startObservers();
    });

// traditional Marketplace Carousel

      let currentSlide = 0;
      const imageSlides = document.querySelectorAll(".market-carousel-slide");
      const contentSlides = document.querySelectorAll(".content-slide");
      const dots1 = document.querySelectorAll(".market-dot");
      const totalSlides = imageSlides.length;

      function showSlide1(index) {
        // Remove active class from all slides and dots1
        imageSlides.forEach((slide) => slide.classList.remove("active"));
        contentSlides.forEach((slide) => slide.classList.remove("active"));
        dots1.forEach((dot) => dot.classList.remove("active"));

        // Add active class to current slide and dot
        imageSlides[index].classList.add("active");
        contentSlides[index].classList.add("active");
        dots1[index].classList.add("active");
      }

      function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide1(currentSlide);
      }

      // Auto-scroll every 2 seconds
      setInterval(nextSlide, 2000);

      // Optional: Add click functionality to dots1
      dots1.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          currentSlide = index;
          showSlide1(currentSlide);
        });
      });




      // State Carousel
      const stateSlides = document.getElementById("stateSlides");
      const stateSlideItems = document.querySelectorAll(".state-slide");

      const stateLeftArrow = document.querySelector(
        ".state-controls .state-arrow.prev"
      );
      const stateRightArrow = document.querySelector(
        ".state-controls .state-arrow.next"
      );

      let stateIndex = 0;

      function getStateSlideWidth() {
        return stateSlideItems[0].clientWidth;
      }

      function updateStateSlider() {
        const slideWidth = getStateSlideWidth();
        const totalSlides = stateSlideItems.length;

        // Slide move karna
        stateSlides.style.transform = `translateX(-${
          stateIndex * slideWidth
        }px)`;

        // Active class set karna – yahi se animation trigger hoga
        stateSlideItems.forEach((slide, idx) => {
          if (idx === stateIndex) {
            slide.classList.add("active");
          } else {
            slide.classList.remove("active");
          }
        });

        // Left arrow state
        if (stateIndex === 0) {
          stateLeftArrow.classList.add("disabled");
        } else {
          stateLeftArrow.classList.remove("disabled");
        }

        // Right arrow state
        if (stateIndex === totalSlides - 1) {
          stateRightArrow.classList.add("disabled");
        } else {
          stateRightArrow.classList.remove("disabled");
        }
        
      }

      function changeStateSlide(direction) {
        const totalSlides = stateSlideItems.length;

        stateIndex += direction;

        if (stateIndex < 0) stateIndex = 0;
        if (stateIndex > totalSlides - 1) stateIndex = totalSlides - 1;

        updateStateSlider();

        // Restart auto-scroll after manual click
        restartStateAutoScroll();
      }

      updateStateSlider();
      window.addEventListener("resize", updateStateSlider);

      // Auto-scroll for State Carousel
      let stateAutoScrollInterval;

      function startStateAutoScroll() {
        stateAutoScrollInterval = setInterval(() => {
          const totalSlides = stateSlideItems.length;

          stateIndex++;

          if (stateIndex >= totalSlides) {
            stateIndex = 0;
          }

          updateStateSlider();
        }, 2000); // 2000ms = 2 seconds
      }

      function stopStateAutoScroll() {
        clearInterval(stateAutoScrollInterval);
      }

      function restartStateAutoScroll() {
        stopStateAutoScroll();
        startStateAutoScroll();
      }

      // Start auto-scroll on page load
      startStateAutoScroll();


// Products Carousel
const prodGrid = document.getElementById("productsGrid");
const prodItems = document.querySelectorAll(".product-card");

const prodLeft = document.querySelector(".products-container .nav-arrow.left");
const prodRight = document.querySelector(".products-container .nav-arrow.right");

let prodIndex = 0;

function getProdCardWidth() {
  return prodItems[0].clientWidth + 20; 
}

function updateProdSlider() {
  const cardWidth = getProdCardWidth();
  const total = prodItems.length;

  const visible = Math.floor(prodGrid.parentElement.clientWidth / cardWidth);

  const maxIndex = Math.max(0, total - visible);

  if (prodIndex < 0) prodIndex = 0;
  if (prodIndex > maxIndex) prodIndex = maxIndex;

  prodGrid.style.transform = `translateX(-${prodIndex * cardWidth}px)`;

  prodLeft.classList.toggle("disabled", prodIndex === 0);
  prodRight.classList.toggle("disabled", prodIndex === maxIndex);
}

function scrollProducts(direction) {
  prodIndex += direction;
  updateProdSlider();
}

updateProdSlider();