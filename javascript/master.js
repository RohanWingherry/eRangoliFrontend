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
