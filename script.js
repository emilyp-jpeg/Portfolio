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

  const clamp = (value) => Math.min(1, Math.max(0, value));

  const updateKineticHero = () => {
    const rect = kineticHero.getBoundingClientRect();
    const travel = Math.max(1, kineticHero.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / travel);
    kineticHero.style.setProperty("--runway-scroll-y", `${progress * 22}px`);
    kineticHero.style.setProperty("--runway-opacity", `${Math.max(0, 1 - progress * 1.35)}`);

    kineticHero.style.setProperty("--hero-copy-y", `${-progress * 18}px`);
    kineticHero.style.setProperty("--hero-copy-opacity", `${Math.max(.78, 1 - progress * .22)}`);
    kineticFrame = null;
  };

  const requestKineticUpdate = () => {
    if (kineticFrame === null) kineticFrame = requestAnimationFrame(updateKineticHero);
  };

  updateKineticHero();
  window.addEventListener("scroll", requestKineticUpdate, { passive: true });
  window.addEventListener("resize", requestKineticUpdate);
}
