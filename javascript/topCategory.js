// Categories Carousel
const catGrid = document.getElementById("categoriesGrid");
const catItems = document.querySelectorAll(".category-item");

const catLeft = document.querySelector(".categories-container .nav-arrow.left");
const catRight = document.querySelector(".categories-container .nav-arrow.right");

let catIndex = 0;

function getCatCardWidth() {
  return catItems[0].clientWidth + 20;  
}

function updateCatSlider() {
  const cardWidth = getCatCardWidth();
  const total = catItems.length;


  const visible = Math.floor(catGrid.parentElement.clientWidth / cardWidth);

  const maxIndex = Math.max(0, total - visible);

  if (catIndex < 0) catIndex = 0;
  if (catIndex > maxIndex) catIndex = maxIndex;

  catGrid.style.transform = `translateX(-${catIndex * cardWidth}px)`;


  catLeft.classList.toggle("disabled", catIndex === 0);
  catRight.classList.toggle("disabled", catIndex === maxIndex);
}

function scrollCategories(direction) {
  catIndex += direction;
  updateCatSlider();
}

// Load & resize adjust
updateCatSlider();
window.addEventListener("resize", updateCatSlider);



      // State Carousel

const stateSlides = document.getElementById("stateSlides");
const stateSlideItems = document.querySelectorAll(".state-slide");

const stateLeftArrow = document.querySelector(".state-controls .state-arrow.prev");
const stateRightArrow = document.querySelector(".state-controls .state-arrow.next");

let stateIndex = 0;

function getStateSlideWidth() {

  return stateSlideItems[0].clientWidth;
}

function updateStateSlider() {
  const slideWidth = getStateSlideWidth();
  const totalSlides = stateSlideItems.length;

  // scroll to exact width * index
  stateSlides.style.transform = `translateX(-${stateIndex * slideWidth}px)`;

  // left arrow disable
  if (stateIndex === 0) {
    stateLeftArrow.classList.add("disabled");
  } else {
    stateLeftArrow.classList.remove("disabled");
  }

  // right arrow disable
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
}

// INITIAL LOAD
updateStateSlider();

window.addEventListener("resize", updateStateSlider);



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
window.addEventListener("resize", updateProdSlider);