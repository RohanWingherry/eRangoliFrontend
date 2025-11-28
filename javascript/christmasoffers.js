document.querySelectorAll(".category-box").forEach((box) => {
  const btn = box.querySelector(".explore-btn");

  box.addEventListener("mouseenter", () => {
    btn.style.bottom = "12px";
    btn.style.opacity = "1";
  });

  box.addEventListener("mouseleave", () => {
    btn.style.bottom = "-60px";
    btn.style.opacity = "0";
  });
});

const customerSlider = document.getElementById("customer-slider");
  const leftBtn = document.getElementById("customer-leftArrow");
  const rightBtn = document.getElementById("customer-rightArrow");
  const customerCards = Array.from(document.querySelectorAll(".customer-card"));
  const sliderWindow = document.querySelector(".customer-slider-window");

  let index1 = 0;
  let cardsPerView = 1;

  // Get card width including gap
  function cardFullWidth() {
    const card = customerCards[0];
    if (!card) return 0;

    const style = getComputedStyle(card);
    const gap = 20; // your CSS gap
    return card.offsetWidth + gap;
  }

  // Read cards per view from screen-size (SAME AS CATEGORY SLIDER)
function getCardsPerView() {
  if (window.matchMedia("(min-width:1441px)").matches) return 4;   // XL Desktop
  if (window.matchMedia("(min-width:1025px)").matches) return 3;   // Desktop
  if (window.matchMedia("(min-width:768px)").matches) return 2;    // Tablet
  if (window.matchMedia("(min-width:425px)").matches) return 1;    // Small tablet
  return 1;                                                        // Mobile
}


  function updateButtons() {
    const total = customerCards.length;

    leftBtn.disabled = index1 === 0;
    rightBtn.disabled = index1 + cardsPerView >= total;
  }

  function updateSlider() {
    const total = customerCards.length;
    const width = cardFullWidth();

    const totalWidth = total * width;
    const containerWidth = sliderWindow.offsetWidth;

    // If all cards fit → center them
    if (totalWidth <= containerWidth) {
      const offset = (containerWidth - totalWidth) / 2;
      customerSlider.style.transform = `translateX(${offset}px)`;
      leftBtn.disabled = true;
      rightBtn.disabled = true;
      return;
    }

    // Normal sliding
    let translateX = -(index1 * width);

    // Clamp last slide
    if (index1 + cardsPerView >= total) {
      const overflow = totalWidth - cardsPerView * width;
      translateX = -overflow;
    }

    customerSlider.style.transform = `translateX(${translateX}px)`;
    updateButtons();
  }

  function recalcLayout() {
    cardsPerView = getCardsPerView();

    const total = customerCards.length;
    if (index1 + cardsPerView > total) {
      index1 = Math.max(0, total - cardsPerView);
    }

    updateSlider();
  }

  // Navigation buttons
  rightBtn.addEventListener("click", () => {
    index1 += cardsPerView;
    const total = customerCards.length;

    if (index1 + cardsPerView > total) {
      index1 = total - cardsPerView;
    }

    updateSlider();
  });

  leftBtn.addEventListener("click", () => {
    index1 -= cardsPerView;
    if (index1 < 0) index1 = 0;
    updateSlider();
  });

  // Resize observer (same as category slider)
  window.addEventListener("resize", recalcLayout);

  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(recalcLayout);
    ro.observe(sliderWindow);
    ro.observe(customerSlider);
  }

  requestAnimationFrame(recalcLayout);

