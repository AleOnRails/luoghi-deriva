const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".spot-card");
const rows = document.querySelectorAll(".spots-table tbody tr");
const sections = document.querySelectorAll("[data-section]");
const emptyState = document.getElementById("empty-state");

function applyFilter(level) {
  let visibleCards = 0;

  cards.forEach((card) => {
    const match = level === "all" || card.dataset.level === level;
    card.classList.toggle("is-hidden", !match);
    if (match) visibleCards += 1;
  });

  rows.forEach((row) => {
    const match = level === "all" || row.dataset.level === level;
    row.classList.toggle("is-hidden", !match);
  });

  sections.forEach((section) => {
    const match = level === "all" || section.dataset.section === level;
    section.classList.toggle("is-hidden", !match);
  });

  if (emptyState) {
    emptyState.hidden = visibleCards > 0;
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const level = button.dataset.filter;

    filters.forEach((other) => {
      const active = other === button;
      other.classList.toggle("is-active", active);
      other.setAttribute("aria-pressed", active ? "true" : "false");
    });

    applyFilter(level);
  });
});
