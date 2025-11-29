// Top Category Carousel
(function(){
      const wrapper = document.getElementById('top-cardsWrapper');
      const carousel = document.getElementById('top-carousel');
      const prevBtn = document.getElementById('top-prevBtn');
      const nextBtn = document.getElementById('top-nextBtn');

      let cards = Array.from(wrapper.querySelectorAll('.top-card'));
      let currentIndex = 0;
      let cardsPerView = 1;

      // Keep JS rules aligned with CSS breakpoints for number of cards
      function getCardsPerViewFromCSS(){
        if (window.matchMedia("(min-width:1920px)").matches) return 7;
        if (window.matchMedia("(min-width:1600px) and (max-width:1919px)").matches) return 6;
        if (window.matchMedia("(min-width:1441px) and (max-width:1599px)").matches) return 5;
        if (window.matchMedia("(min-width:1025px) and (max-width:1440px)").matches) return 4;
        if (window.matchMedia("(min-width:768px) and (max-width:1252px)").matches) return 3;
        if (window.matchMedia("(min-width:425px) and (max-width:767px)").matches) return 2;
        return 1; // <425
      }

      function getCardFullWidth(cardEl){
        const rect = cardEl.getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(wrapper).gap || 0);
        return rect.width + gap;
      }

      function centerWhenAllFit(containerWidth, totalWidth){
        if (totalWidth <= containerWidth){
          const offset = Math.round((containerWidth - totalWidth) / 2);
          wrapper.style.transform = `translateX(${offset}px)`;
          prevBtn.disabled = true;
          nextBtn.disabled = true;
          return true;
        }
        return false;
      }

      function updateLayout(){
        cards = Array.from(wrapper.querySelectorAll('.top-card'));
        cardsPerView = getCardsPerViewFromCSS();
        if (!cards.length) return;

        const cardFullWidth = Math.round(getCardFullWidth(cards[0]));
        const gap = parseFloat(getComputedStyle(wrapper).gap || 0);
        const totalCards = cards.length;
        const totalWidth = Math.round((cardFullWidth * totalCards) - gap);
        const containerWidth = Math.floor(carousel.clientWidth);

        const maxIndex = Math.max(0, totalCards - cardsPerView);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        // if all cards fit -> center row
        if (centerWhenAllFit(containerWidth, totalWidth)) return;

        // For single-card mobile view: center the active card in viewport
        let translateX;
        if (cardsPerView === 1) {
          translateX = - Math.round(currentIndex * cardFullWidth) + Math.round((containerWidth - cardFullWidth) / 2);
        } else {
          translateX = - Math.round(currentIndex * cardFullWidth);
        }

        // clamp translate so last visible chunk aligns flush right
        const visibleWidth = Math.round(cardsPerView * cardFullWidth - gap);
        const maxTranslate = -(totalWidth - visibleWidth);
        if (translateX < maxTranslate) translateX = maxTranslate;

        wrapper.style.transform = `translateX(${translateX}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
      }

      nextBtn.addEventListener('click', () => {
        currentIndex += cardsPerView;
        updateLayout();
      });

      prevBtn.addEventListener('click', () => {
        currentIndex -= cardsPerView;
        updateLayout();
      });

      // Recalc on resize (debounced)
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateLayout, 80);
      });

      // Observe element changes (images load, DOM changes)
      if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(() => updateLayout());
        ro.observe(carousel);
        ro.observe(wrapper);
        Array.from(wrapper.children).forEach(c => ro.observe(c));
      } else {
        window.addEventListener('load', updateLayout);
      }

      // Ensure images are loaded before first measurement
      window.addEventListener('load', () => {
        const imgs = Array.from(wrapper.querySelectorAll('img'));
        if (!imgs.length) { updateLayout(); return; }
        let loaded = 0;
        imgs.forEach(img => {
          if (img.complete) {
            loaded++;
            if (loaded === imgs.length) updateLayout();
          } else {
            img.addEventListener('load', () => {
              loaded++;
              if (loaded === imgs.length) updateLayout();
            }, { once: true });
            img.addEventListener('error', () => {
              loaded++;
              if (loaded === imgs.length) updateLayout();
            }, { once: true });
          }
        });
      });

      // initial layout
      requestAnimationFrame(updateLayout);
    })();

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