const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");
const year = document.querySelector("#year");
const dialog = document.querySelector("#case-study");
const form = document.querySelector("#contact-form");
const success = document.querySelector(".form-success");
const successCopy = document.querySelector("#success-copy");
const resetButton = document.querySelector("#reset-form");

year.textContent = String(new Date().getFullYear());

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
}

toggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...nav.querySelectorAll("a[href^='#']")];

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === id);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
);

sections.forEach((section) => spy.observe(section));

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const points = (card.dataset.points || "")
      .split("|")
      .map((point) => point.trim())
      .filter(Boolean);

    dialog.querySelector("#case-meta").textContent = card.dataset.meta || "";
    dialog.querySelector("#case-title").textContent = card.dataset.title || "";
    dialog.querySelector("#case-summary").textContent = card.dataset.summary || "";

    const list = dialog.querySelector("#case-points");
    list.replaceChildren(
      ...points.map((point) => {
        const item = document.createElement("li");
        item.textContent = point;
        return item;
      }),
    );

    dialog.showModal();
  });
});

dialog.querySelector("#case-close").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const studioEmail = (form.dataset.email || "").trim();

  if (studioEmail) {
    const subject = encodeURIComponent(`Project note from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${studioEmail}?subject=${subject}&body=${body}`;
    successCopy.textContent = `Thanks, ${name}. Your mail app should open with this note addressed to the studio.`;
  } else {
    successCopy.textContent = `Thanks, ${name}. This preview keeps your note in the browser until you add an email address to the form.`;
  }

  form.hidden = true;
  success.hidden = false;
});

resetButton.addEventListener("click", () => {
  form.reset();
  form.hidden = false;
  success.hidden = true;
  form.querySelector("input[name='name']").focus();
});
