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
