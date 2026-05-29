// =========================================================
// Lucky Capsule — App controller
// View flow: pick → machine → reveal → review → done
// =========================================================

const State = {
  subject: null,
  mistakes: [],
  current: 0,
  correctCount: 0,
  timeLeft: 300, // 5 minutes
  timerId: null,
  answered: false,
};

const Views = ['view-pick', 'view-machine', 'view-reveal', 'view-review', 'view-done'];

function showView(id) {
  Views.forEach(v => {
    const el = document.getElementById(v);
    if (el) el.classList.toggle('active', v === id);
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// =========================================================
// VIEW 1 — Subject Picker
// =========================================================
document.querySelectorAll('.subject-card').forEach(card => {
  card.addEventListener('click', () => {
    const subject = card.dataset.subject;
    pickSubject(subject);
  });
});

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickSubject(subject) {
  State.subject = subject;

  if (subject === 'random') {
    const all = [
      ...MISTAKE_POOL.math.mistakes.map(m    => ({ ...m, subject: 'Math' })),
      ...MISTAKE_POOL.history.mistakes.map(m => ({ ...m, subject: 'History' })),
      ...MISTAKE_POOL.physics.mistakes.map(m => ({ ...m, subject: 'Physics' })),
    ];
    State.mistakes = shuffle(all).slice(0, 5);
  } else {
    const subjData = getMistakes(subject);
    State.mistakes = subjData.mistakes.map(m => ({ ...m, subject: subjData.label }));
  }

  State.current = 0;
  State.correctCount = 0;
  State.timeLeft = 300;

  const label = subject === 'random' ? 'Surprise Me' : getMistakes(subject).label;
  const eyebrowText = document.getElementById('machine-eyebrow-text');
  if (eyebrowText) eyebrowText.textContent = `${label} · today's capsule`;

  showView('view-machine');
}

// =========================================================
// VIEW 2 — Machine (POP)
// =========================================================
const popBtn = document.getElementById('pop-btn');
popBtn.addEventListener('click', () => {
  if (popBtn.disabled) return;
  popBtn.disabled = true;
  triggerPop();
});

function triggerPop() {
  const globe = document.getElementById('globe');
  const globeInner = document.getElementById('globe-inner');
  const ssrBall = document.getElementById('ssr-ball');
  const tray = document.querySelector('.machine-tray');

  // 1. Shake the machine (0.6s)
  globe.classList.add('shake');

  setTimeout(() => {
    // 2. Spin balls inside (1.8s)
    globeInner.classList.add('spin');

    // 3. Crack glow at ~1.2s
    setTimeout(() => {
      globe.classList.add('crack');
    }, 1200);

    // 4. SSR ball drops at 1.8s
    setTimeout(() => {
      ssrBall.classList.add('dispensed');
    }, 1800);

    // 5. Ball lands in tray at 2.4s
    setTimeout(() => {
      tray.classList.add('has-prize');
    }, 2400);

    // 6. Transition to reveal at 3.0s
    setTimeout(() => {
      enterReveal();
    }, 3000);

  }, 600);
}

// =========================================================
// VIEW 3 — Reveal
// =========================================================
function enterReveal() {
  showView('view-reveal');

  const isRandom = State.subject === 'random';
  const subjLabel = isRandom ? 'mixed-subject' : getMistakes(State.subject).label.toLowerCase();
  const stack = document.getElementById('mistake-stack');
  const sub = document.getElementById('reveal-sub');
  sub.textContent = isRandom
    ? `5 questions from your Math, History & Physics weak spots. Time to crush them in 5 minutes.`
    : `5 ${subjLabel} questions you've gotten wrong before. Time to crush them in 5 minutes.`;

  stack.innerHTML = '';
  State.mistakes.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'm-card';
    card.innerHTML = `
      <div class="m-card-num">0${i + 1}</div>
      <div class="m-card-topic">${m.topic}</div>
      <div class="m-card-q">${truncate(m.question, 75)}</div>
      <div class="m-card-meta">
        <span>${m.subject}</span>
        <span class="miss">Missed ×${Math.floor(Math.random() * 3) + 1}</span>
      </div>
    `;
    stack.appendChild(card);
  });
}

function truncate(s, n) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + '…';
}

// =========================================================
// VIEW 4 — 5-min Review
// =========================================================
document.getElementById('start-btn').addEventListener('click', () => {
  startReview();
});

function startReview() {
  showView('view-review');
  State.current = 0;
  State.correctCount = 0;
  State.timeLeft = 300;
  State.answered = false;

  // Reset progress bar
  const bar = document.getElementById('countdown-progress');
  bar.classList.remove('warn');
  bar.style.transform = 'scaleX(1)';

  const subjLabel = State.subject === 'random' ? 'Surprise Me' : getMistakes(State.subject).label;
  document.getElementById('q-subject').textContent = subjLabel;

  renderQuestion();
  startCountdown();
}

function renderQuestion() {
  const m = State.mistakes[State.current];
  if (!m) {
    finishReview();
    return;
  }
  document.getElementById('q-progress').textContent = `Question ${State.current + 1} / ${State.mistakes.length}`;

  const card = document.getElementById('question-card');
  card.innerHTML = `
    <div class="q-topic">📌 ${m.topic}</div>
    <h2 class="q-text">${m.question}</h2>
    <div class="q-options">
      ${m.options.map((opt, i) => `
        <button class="q-option" data-idx="${i}">
          <span class="q-option-letter">${String.fromCharCode(65 + i)}</span>
          <span>${opt}</span>
        </button>
      `).join('')}
    </div>
    <div class="q-explain-slot"></div>
  `;

  State.answered = false;

  card.querySelectorAll('.q-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (State.answered) return;
      handleAnswer(parseInt(btn.dataset.idx, 10));
    });
  });
}

function handleAnswer(chosenIdx) {
  State.answered = true;
  const m = State.mistakes[State.current];
  const opts = document.querySelectorAll('.q-option');

  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === m.correct) btn.classList.add('correct');
    else if (i === chosenIdx) btn.classList.add('wrong');
    else btn.classList.add('dim');
  });

  const isRight = chosenIdx === m.correct;
  if (isRight) State.correctCount += 1;

  const slot = document.querySelector('.q-explain-slot');
  slot.innerHTML = `
    <div class="q-explain">
      <div class="q-explain-label">
        ${isRight ? '✓ Solvi explains' : '✗ Why you got this wrong'}
      </div>
      <p>${m.explanation}</p>
      ${!isRight ? `<span class="why-tag">Past pattern: ${m.whyMissed}</span>` : ''}
    </div>
    <div class="q-next">
      <button class="next-btn" id="next-q-btn">
        ${State.current === State.mistakes.length - 1 ? 'Finish review' : 'Next question'}
        <span>→</span>
      </button>
    </div>
  `;

  document.getElementById('next-q-btn').addEventListener('click', () => {
    State.current += 1;
    if (State.current >= State.mistakes.length) {
      finishReview();
    } else {
      renderQuestion();
    }
  });
}

function startCountdown() {
  if (State.timerId) clearInterval(State.timerId);
  updateClock();
  State.timerId = setInterval(() => {
    State.timeLeft -= 1;
    updateClock();
    if (State.timeLeft <= 0) {
      clearInterval(State.timerId);
      finishReview();
    }
  }, 1000);
}

function updateClock() {
  const m = Math.floor(State.timeLeft / 60);
  const s = State.timeLeft % 60;
  const clock = document.getElementById('clock-time');
  clock.textContent = `${m}:${s.toString().padStart(2, '0')}`;
  // Progress bar
  const bar = document.getElementById('countdown-progress');
  bar.style.transform = `scaleX(${State.timeLeft / 300})`;
  // Warn at <60s
  if (State.timeLeft <= 60) {
    bar.classList.add('warn');
    clock.classList.add('warn');
  } else {
    bar.classList.remove('warn');
    clock.classList.remove('warn');
  }
}

function finishReview() {
  if (State.timerId) clearInterval(State.timerId);
  showView('view-done');

  document.getElementById('stat-correct').textContent = State.correctCount;
  const streak = parseInt(localStorage.getItem('luckyStreak') || '7', 10) + 1;
  localStorage.setItem('luckyStreak', streak.toString());
  document.getElementById('stat-streak').textContent = streak;
  document.getElementById('streak-count').textContent = streak;
  document.getElementById('stat-mastered').textContent = `+${State.correctCount}`;

  spawnConfetti();
  updateNextTimer();
}

function spawnConfetti() {
  const layer = document.getElementById('done-confetti');
  layer.innerHTML = '';
  const colors = ['#f4d490', '#d49888', '#a78bfa', '#10b981', '#ec4899', '#3b82f6', '#f97316', '#fbbf24'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 2}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${12 + Math.random() * 14}px`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    layer.appendChild(piece);
  }
}

function updateNextTimer() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(6, 0, 0, 0);
  const diff = tomorrow - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  document.getElementById('next-timer').textContent = `${h}h ${m}m`;
}

// =========================================================
// DONE buttons
// =========================================================
document.getElementById('again-btn').addEventListener('click', () => {
  // Reset all state and go back to picker
  popBtn.disabled = false;
  document.getElementById('globe').classList.remove('shake', 'crack');
  document.getElementById('globe-inner').classList.remove('spin');
  document.getElementById('ssr-ball').classList.remove('dispensed');
  document.querySelector('.machine-tray').classList.remove('has-prize');
  showView('view-pick');
});

document.getElementById('share-btn').addEventListener('click', () => {
  // Fake share — just visual feedback
  const btn = document.getElementById('share-btn');
  const original = btn.innerHTML;
  btn.innerHTML = '<span>✓ Copied to clipboard</span>';
  setTimeout(() => { btn.innerHTML = original; }, 1800);
});
