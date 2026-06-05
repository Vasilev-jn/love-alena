const openButton = document.querySelector("[data-scroll-to='letter']");

openButton?.addEventListener("click", () => {
  document.getElementById("letter")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

document.querySelectorAll("[data-slider]").forEach((slider) => {
  const track = slider.querySelector(".photo-slider__track");
  const dots = [...slider.querySelectorAll(".photo-slider__dot")];

  if (!track || dots.length === 0) return;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const slideWidth = track.clientWidth + 14;

      track.scrollTo({
        left: slideWidth * index,
        behavior: "smooth"
      });
    });
  });

  track.addEventListener("scroll", () => {
    const index = Math.round(track.scrollLeft / track.clientWidth);

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  });
});

// Плавное появление блоков при попадании в зону видимости
const revealTargets = document.querySelectorAll(
  ".card, .photo-slider, .arcane-card"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}