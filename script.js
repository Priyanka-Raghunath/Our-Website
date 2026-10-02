const envelopeCards = document.querySelectorAll('.envelope-card');
const storyItems = document.querySelectorAll('.story-item');
const modal = document.getElementById('storyModal');
const modalTitle = document.getElementById('storyModalTitle');
const modalText = document.getElementById('storyModalText');
const modalDate = document.getElementById('storyModalDate');
const modalClose = document.querySelector('.story-modal-close');

const DAY_MS = 1000 * 60 * 60 * 24;
const toIstDate = (date) => new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
const startDate = new Date('2026-09-07T00:00:00+05:30');
const todayInIst = toIstDate(new Date());
const startDateInIst = toIstDate(startDate);
const diffInDays = Math.floor((todayInIst - startDateInIst) / DAY_MS) + 1;
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

if (storyItems.length && modal && modalTitle && modalText && modalDate) {
  const openStory = (item) => {
    const title = item.dataset.title || 'Our memory';
    const message = item.dataset.message || 'A beautiful memory from our story.';
    const date = item.querySelector('.story-date')?.textContent || 'Memory';

    modalTitle.textContent = title;
    modalText.textContent = message;
    modalDate.textContent = date;

    if (title === 'Our First “I Love You”') {
      modalText.innerHTML = `
        <div class="story-quiz">
          <p class="story-quiz-question">Who said 'I love you' first</p>
          <div class="story-quiz-options">
            <button class="story-choice maau" type="button">Maau</button>
            <button class="story-choice kanna correct" type="button">Kanna</button>
          </div>
          <div class="story-answer-success">Yeyyyy, that's correct</div>
        </div>
      `;
    }

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');

    if (title === 'Our First “I Love You”') {
      const maauButton = modal.querySelector('.story-choice.maau');
      const kannaButton = modal.querySelector('.story-choice.kanna');
      const answerSuccess = modal.querySelector('.story-answer-success');

      if (maauButton) {
        let dodgeCount = 0;
        maauButton.addEventListener('mouseenter', () => {
          const modalCard = modal.querySelector('.story-modal-card');
          const cardRect = modalCard.getBoundingClientRect();
          const maxX = Math.max(10, cardRect.width - 120);
          const maxY = Math.max(10, cardRect.height - 60);
          const nextX = Math.random() * (maxX - 20);
          const nextY = Math.random() * (maxY - 20);
          maauButton.style.left = `${nextX}px`;
          maauButton.style.top = `${nextY}px`;
          dodgeCount += 1;
          if (dodgeCount > 2) {
            maauButton.style.transform = 'scale(0.96)';
          }
        });

        maauButton.addEventListener('click', (event) => {
          event.preventDefault();
          const modalCard = modal.querySelector('.story-modal-card');
          const cardRect = modalCard.getBoundingClientRect();
          const maxX = Math.max(10, cardRect.width - 120);
          const maxY = Math.max(10, cardRect.height - 60);
          maauButton.style.left = `${Math.random() * maxX}px`;
          maauButton.style.top = `${Math.random() * maxY}px`;
        });
      }

      if (kannaButton && answerSuccess) {
        kannaButton.addEventListener('click', () => {
          answerSuccess.classList.add('visible');
          kannaButton.disabled = true;
          maauButton.disabled = true;
          maauButton.style.opacity = '0.5';
          maauButton.style.cursor = 'not-allowed';
        });
      }
    }
  };

  const closeStory = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  };

  storyItems.forEach((item) => {
    item.addEventListener('click', () => openStory(item));
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeStory);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeStory();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      closeStory();
    }
  });
}
