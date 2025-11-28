let index = 0;
const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const dots = document.querySelectorAll('.dot');

function showSlide(i) {
    if (i >= images.length) index = 0;
    if (i < 0) index = images.length - 1;

    slide.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

dots.forEach((dot, i) => {
    dot.onclick = () => {
        index = i;
        showSlide(index);
    };
});

// Auto slide every 3 seconds
setInterval(() => {
    index++;
    showSlide(index);
}, 3000);

// Initial render
showSlide(index);








// FEATURES SECTION INTERACTION
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('marqueeContent');
  if (!content) return;

  // capture original children (live NodeList -> convert to array)
  const originalItems = Array.from(content.children);

  // if no items, nothing to do
  if (!originalItems.length) return;

  // Wait a tick for images to load/layout
  function setupMarquee() {
    // Measure width of original content
    const originalWidth = calculateOriginalWidth();

    // If originalWidth is zero (images not loaded yet), try again
    if (!originalWidth) {
      // try again shortly
      setTimeout(setupMarquee, 60);
      return;
    }

    // Duplicate original items directly into content to form [orig][orig]
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true'); // hide from screen readers
      content.appendChild(clone);
    });

    // Now set CSS variable --move to exactly originalWidth px
    content.style.setProperty('--move', `${originalWidth}px`);

    // Determine animation duration based on desired px/sec speed
    const root = getComputedStyle(document.documentElement);
    // fallback px/sec if CSS var not read
    const pxPerSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--speed-px-per-sec')) || 120;
    const durationSec = Math.max(6, (originalWidth / pxPerSec)); // min 6s to avoid too fast

    // Apply duration to the content animation
    content.style.animationDuration = `${durationSec}s`;

    // Ensure layout won't wrap or overlap
    // If track is still too short for seamless loop (rare for very few items), duplicate once more
    requestAnimationFrame(() => {
      const viewportWidth = content.parentElement.clientWidth;
      if (content.scrollWidth < viewportWidth * 2) {
        // duplicate again to lengthen the track
        originalItems.forEach(item => {
          const clone = item.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          content.appendChild(clone);
        });
        // recalc originalWidth still same, but animation duration can remain acceptable
      }
    });
  }

  function calculateOriginalWidth() {
    // original items are the first N children where N = originalItems.length
    let width = 0;
    for (let i = 0; i < originalItems.length; i++) {
      const el = originalItems[i];
      const rect = el.getBoundingClientRect();
      // get margin gap from computed gap (we'll rely on flex gap; approximate by computed style)
      width += rect.width;
    }
    // include gaps: computed gap from CSS
    const gap = parseFloat(getComputedStyle(content).gap) || 0;
    width += gap * Math.max(0, originalItems.length - 1);
    return Math.round(width);
  }

  // run setup after small delay to let images settle
  setTimeout(setupMarquee, 50);

  // Recompute on window resize (optional)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reset clones -> keep first set only, then rerun setup
      // Remove all children after originalItems.length
      const children = Array.from(content.children);
      children.slice(originalItems.length).forEach(c => content.removeChild(c));
      // Rerun measure & duplicate
      setupMarquee();
    }, 120);
  });
});





// TOP CATEGORIES INTERACTION
const cardsWrapper = document.getElementById("cardsWrapper");
    const cards = Array.from(document.querySelectorAll(".card"));
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const carousel = document.getElementById("carousel");

    let currentIndex = 0;
    let cardsPerView = 1;

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
      if (!cards.length) return;

      cardsPerView = getCardsPerViewFromCSS();

      if (currentIndex + cardsPerView > cards.length) {
        currentIndex = Math.max(0, cards.length - cardsPerView);
      }

      updateCarousel();
    }

    function updateButtons() {
      const allVisible = cardsPerView >= cards.length;

      if (allVisible) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
      }

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = (currentIndex + cardsPerView) >= cards.length;
    }

    function updateCarousel() {
        if (!cards.length) return;

        const cardRect = cards[0].getBoundingClientRect();
        const cardFullWidth = Math.round(cardRect.width + getHorizontalMargin(cards[0]));

        const containerWidth = Math.floor(carousel.clientWidth);
        const totalCards = cards.length;
        const totalWidth = totalCards * cardFullWidth;

        if (totalWidth <= containerWidth) {
            const offset = Math.round((containerWidth - totalWidth) / 2);
            cardsWrapper.style.transform = `translateX(${offset}px)`;
        } else {
            let translateX = -currentIndex * cardFullWidth;

            const visibleWidth = cardsPerView * cardFullWidth;
            const overflow = totalWidth - visibleWidth;

            if (currentIndex + cardsPerView >= totalCards) {
                translateX = -overflow;
            }

            cardsWrapper.style.transform = `translateX(${translateX}px)`;
        }

        updateButtons();
    }

    nextBtn.addEventListener("click", () => {
      currentIndex += cardsPerView;

      if (currentIndex + cardsPerView > cards.length) {
        currentIndex = cards.length - cardsPerView;
        if (currentIndex < 0) currentIndex = 0;
      }

      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex -= cardsPerView;
      if (currentIndex < 0) currentIndex = 0;
      updateCarousel();
    });

    let resizeObserver = null;
    function startObservers() {
      window.addEventListener("resize", calculateLayout);

      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(calculateLayout);
        resizeObserver.observe(carousel);
        resizeObserver.observe(cardsWrapper);
      }
    }

    window.requestAnimationFrame(() => {
      calculateLayout();
      startObservers();
    });

