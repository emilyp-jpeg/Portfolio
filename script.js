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
  const heroObjects = kineticHero.querySelectorAll(".hero-object");

  const clamp = (value) => Math.min(1, Math.max(0, value));

  const updateKineticHero = () => {
    const rect = kineticHero.getBoundingClientRect();
    const travel = Math.max(1, kineticHero.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / travel);
    const horizontal = Math.min(window.innerWidth * .28, 360);

    heroObjects.forEach((object) => {
      const isInner = object.dataset.depth === "inner";
      const rawObjectProgress = isInner
        ? clamp(progress / .62)
        : clamp((progress - .08) / .74);
      const objectProgress = rawObjectProgress * rawObjectProgress * (3 - 2 * rawObjectProgress);
      const isPlacedLeft = object.offsetLeft + object.offsetWidth / 2 < kineticHero.offsetWidth / 2;
      const sideDirection = isPlacedLeft ? -1 : 1;
      const verticalDirection = Number(object.dataset.y || 0);
      const distance = horizontal * (isInner ? .68 : .9);

      object.style.setProperty("--icon-shift-x", `${sideDirection * objectProgress * distance}px`);
      object.style.setProperty("--icon-shift-y", `${verticalDirection * objectProgress * (isInner ? 18 : 28)}px`);
      object.style.setProperty("--icon-opacity", `${Math.max(0, 1 - objectProgress * 1.12)}`);
    });

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
