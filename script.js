const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const contactSuccess = document.getElementById("contact-success");
if (contactSuccess && new URLSearchParams(window.location.search).get("message") === "sent") {
  contactSuccess.hidden = false;
  history.replaceState({}, "", `${window.location.pathname}#contact`);
}

const kineticHero = document.querySelector("[data-kinetic-hero]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (kineticHero && !reducedMotion.matches) {
  let kineticFrame = null;

  const updateKineticHero = () => {
    const rect = kineticHero.getBoundingClientRect();
    const travel = Math.max(1, kineticHero.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    const horizontal = Math.min(window.innerWidth * .12, 170);

    kineticHero.style.setProperty("--kinetic-x-one", `${-progress * horizontal}px`);
    kineticHero.style.setProperty("--kinetic-y-one", `${-52 - progress * 38}px`);
    kineticHero.style.setProperty("--kinetic-x-two", `${progress * horizontal * .58}px`);
    kineticHero.style.setProperty("--kinetic-y-two", `${-20 - progress * 14}px`);
    kineticHero.style.setProperty("--kinetic-x-three", `${-progress * horizontal * .35}px`);
    kineticHero.style.setProperty("--kinetic-y-three", `${14 + progress * 14}px`);
    kineticHero.style.setProperty("--kinetic-x-four", `${progress * horizontal * .82}px`);
    kineticHero.style.setProperty("--kinetic-y-four", `${48 + progress * 38}px`);
    kineticFrame = null;
  };

  const requestKineticUpdate = () => {
    if (kineticFrame === null) kineticFrame = requestAnimationFrame(updateKineticHero);
  };

  updateKineticHero();
  window.addEventListener("scroll", requestKineticUpdate, { passive: true });
  window.addEventListener("resize", requestKineticUpdate);
}
