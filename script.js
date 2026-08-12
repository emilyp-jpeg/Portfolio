const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const contactSuccess = document.getElementById("contact-success");
if (contactSuccess && new URLSearchParams(window.location.search).get("message") === "sent") {
  contactSuccess.hidden = false;
  history.replaceState({}, "", `${window.location.pathname}#contact`);
}
