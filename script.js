const envelopeCards = document.querySelectorAll('.envelope-card');

const startDate = new Date('2026-09-07');
const today = new Date();
const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
const countEl = document.getElementById('days-count');

if (countEl) {
  countEl.textContent = diffInDays.toString();
}

envelopeCards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});
