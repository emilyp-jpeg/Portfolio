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
    const horizontal = Math.min(window.innerWidth * .26, 390);

    kineticHero.style.setProperty("--hero-left-x", `${-progress * horizontal}px`);
    kineticHero.style.setProperty("--hero-left-x-small", `${-progress * horizontal * .8}px`);
    kineticHero.style.setProperty("--hero-right-x", `${progress * horizontal}px`);
    kineticHero.style.setProperty("--hero-right-x-small", `${progress * horizontal * .85}px`);
    kineticHero.style.setProperty("--hero-up-y", `${-progress * 95}px`);
    kineticHero.style.setProperty("--hero-up-y-small", `${-progress * 52}px`);
    kineticHero.style.setProperty("--hero-down-y", `${progress * 95}px`);
    kineticHero.style.setProperty("--hero-down-y-small", `${progress * 76}px`);
    kineticHero.style.setProperty("--hero-object-opacity", `${Math.max(0, 1 - progress * 1.45)}`);
    kineticHero.style.setProperty("--hero-copy-y", `${-progress * 32}px`);
    kineticHero.style.setProperty("--hero-copy-opacity", `${Math.max(.68, 1 - progress * .32)}`);
    kineticFrame = null;
  };

  const requestKineticUpdate = () => {
    if (kineticFrame === null) kineticFrame = requestAnimationFrame(updateKineticHero);
  };

  updateKineticHero();
  window.addEventListener("scroll", requestKineticUpdate, { passive: true });
  window.addEventListener("resize", requestKineticUpdate);
}
