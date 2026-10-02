const envelopeCards = document.querySelectorAll('.envelope-card');

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
