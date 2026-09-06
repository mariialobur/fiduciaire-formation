(function () {
  const LINKEDIN = "https://www.linkedin.com/in/mariia-lobur/";

  const style = document.createElement("style");
  style.textContent = `
    .developer-credit{display:inline-flex;align-items:center;gap:4px;margin-top:7px;color:#0d6f69;text-decoration:none;font-size:.92rem;line-height:1.4}
    .developer-credit:hover{text-decoration:underline}
    .developer-credit:focus{outline:2px solid #0d6f69;outline-offset:3px;border-radius:4px}
    .developer-credit-label{color:#60747b;font-weight:400}
  `;
  document.head.appendChild(style);

  function enhanceFooter() {
    const footer = document.querySelector(".footer .container");
    if (!footer || footer.querySelector(".developer-credit")) return;

    const left = footer.querySelector(":scope > div:first-child") || footer;
    const link = document.createElement("a");
    link.className = "developer-credit";
    link.href = LINKEDIN;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Mariia Lobur — développeuse du projet, profil LinkedIn");
    link.innerHTML = `<span class="developer-credit-label">Développé par</span> <strong>Mariia Lobur</strong><span>· LinkedIn ↗</span>`;
    left.appendChild(link);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      enhanceFooter();
    });
  }

  const root = document.getElementById("app");
  if (root && window.MutationObserver) {
    new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
  }
  window.addEventListener("hashchange", schedule);
  window.addEventListener("load", schedule);
  schedule();

  window.FIDUCIAIRE_DEVELOPER_CREDIT = {
    author: "Mariia Lobur",
    linkedin: LINKEDIN
  };
})();
