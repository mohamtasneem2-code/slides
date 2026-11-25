const deck = document.getElementById("deck");
const slides = Array.from(document.querySelectorAll(".slide"));
const total = slides.length;
let index = 0;

const progressBar = document.getElementById("progressBar");
const counterEl = document.getElementById("counter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showSlide(newIndex) {
  if (newIndex < 0 || newIndex >= total) return;
  index = newIndex;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  if (progressBar) {
    progressBar.style.width = `${((index + 1) / total) * 100}%`;
  }

  if (counterEl) {
    counterEl.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  }
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

document.addEventListener("keydown", (e) => {
  // RTL: السهم الأيسر ← التالي، السهم الأيمن → السابق
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    nextSlide();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    prevSlide();
  } else if (e.key === " " || e.key === "Spacebar" || e.key === "ArrowDown" || e.key === "PageDown") {
    e.preventDefault();
    nextSlide();
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    prevSlide();
  }
});

// Touch swipe navigation
let touchStartX = null;

deck.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

deck.addEventListener("touchend", (e) => {
  if (touchStartX === null) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - touchStartX;
  touchStartX = null;
  if (Math.abs(diff) < 50) return;
  if (diff < 0) nextSlide();
  else prevSlide();
});

// Initialize
showSlide(0);
