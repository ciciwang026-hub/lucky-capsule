// =========================================================
// Lucky Capsule — Mistake Pool Demo Data
// 3 subjects × 5 questions each. Designed for 5-min review.
// =========================================================

const MISTAKE_POOL = {
  math: {
    label: 'Math',
    emoji: '📐',
    color: '#6E5BE9',
    accent: '#a78bfa',
    tagline: 'Algebra · Geometry · Calculus',
    mistakes: [
      {
        id: 'm1',
        topic: 'Quadratic Equations',
        question: 'What are the roots of  x² − 5x + 6 = 0 ?',
        options: ['x = 1, 6', 'x = 2, 3', 'x = −2, −3', 'x = 5, 6'],
        correct: 1,
        userAnswer: 0,
        explanation: 'Factor as (x−2)(x−3) = 0, so x = 2 or x = 3. You picked roots that sum to 5 but don\'t multiply to 6.',
        whyMissed: 'Common slip: confusing sum-of-roots with product-of-roots.'
      },
      {
        id: 'm2',
        topic: 'Derivatives',
        question: 'What is  d/dx [ sin(x) · cos(x) ] ?',
        options: ['sin²(x) − cos²(x)', '2 sin(x) cos(x)', 'cos²(x) − sin²(x)', '−sin(2x)'],
        correct: 2,
        userAnswer: 3,
        explanation: 'Use product rule: cos(x)·cos(x) + sin(x)·(−sin(x)) = cos²(x) − sin²(x) = cos(2x).',
        whyMissed: 'Sign flip — you took the derivative of cos(2x) instead of differentiating directly.'
      },
      {
        id: 'm3',
        topic: 'Integration',
        question: '∫ 2x dx  = ?',
        options: ['x² + C', '2x² + C', 'x² / 2 + C', '2', ],
        correct: 0,
        userAnswer: 1,
        explanation: 'Power rule reverse: ∫2x dx = 2·(x²/2) + C = x² + C. You forgot to divide by the new power.',
        whyMissed: 'You forgot the +1/(n+1) coefficient when integrating.'
      },
      {
        id: 'm4',
        topic: 'Logarithms',
        question: 'If  log₂(x) = 5,  what is x?',
        options: ['10', '25', '32', '64'],
        correct: 2,
        userAnswer: 1,
        explanation: 'log₂(x) = 5 means 2⁵ = x, so x = 32. You multiplied 2×5 instead of computing 2⁵.',
        whyMissed: 'Mixed up logarithm definition with simple multiplication.'
      },
      {
        id: 'm5',
        topic: 'Geometry',
        question: 'Area of a circle with radius 3 is approximately:',
        options: ['9.42', '18.84', '28.27', '113.10'],
        correct: 2,
        userAnswer: 1,
        explanation: 'A = πr² = π × 9 ≈ 28.27. You used circumference formula (2πr) instead of area.',
        whyMissed: 'Confused circumference (2πr ≈ 18.84) with area (πr²).'
      }
    ]
  },

  history: {
    label: 'History',
    emoji: '📜',
    color: '#d4814f',
    accent: '#fbbf24',
    tagline: 'World Wars · Civil Rights · Cold War',
    mistakes: [
      {
        id: 'h1',
        topic: 'World War II',
        question: 'Who famously declared "I shall return" when leaving the Philippines in 1942?',
        options: ['Dwight D. Eisenhower', 'Douglas MacArthur', 'George Patton', 'Chester Nimitz'],
        correct: 1,
        userAnswer: 0,
        explanation: 'General Douglas MacArthur made that pledge in March 1942 after FDR ordered him to Australia. He kept the promise in October 1944.',
        whyMissed: 'You confused MacArthur (Pacific theater) with Eisenhower (European theater).'
      },
      {
        id: 'h2',
        topic: 'Civil Rights Era',
        question: 'In what year did the Voting Rights Act become law?',
        options: ['1957', '1964', '1965', '1968'],
        correct: 2,
        userAnswer: 1,
        explanation: 'Signed Aug 6, 1965 by LBJ. The Civil Rights Act (1964) is the year you picked — easy to mix up.',
        whyMissed: 'Confused Civil Rights Act (1964) with Voting Rights Act (1965).'
      },
      {
        id: 'h3',
        topic: 'Cold War',
        question: 'The Cuban Missile Crisis occurred in:',
        options: ['October 1961', 'October 1962', 'October 1963', 'November 1962'],
        correct: 1,
        userAnswer: 2,
        explanation: '13 days in October 1962 (Oct 16–28). 1963 is when JFK was assassinated — different year.',
        whyMissed: 'Anchored to JFK\'s assassination year instead of the crisis year.'
      },
      {
        id: 'h4',
        topic: 'Founding Era',
        question: 'Who wrote the majority of the Federalist Papers?',
        options: ['John Adams', 'James Madison', 'Alexander Hamilton', 'Thomas Jefferson'],
        correct: 2,
        userAnswer: 1,
        explanation: 'Hamilton wrote 51 of the 85 essays. Madison wrote 29 (also major). Jay wrote 5. Adams & Jefferson wrote none.',
        whyMissed: 'Madison was a major author but Hamilton wrote the most.'
      },
      {
        id: 'h5',
        topic: 'Industrial Revolution',
        question: 'Who invented the cotton gin in 1793?',
        options: ['Eli Whitney', 'James Watt', 'Samuel Morse', 'Cyrus McCormick'],
        correct: 0,
        userAnswer: 3,
        explanation: 'Eli Whitney. McCormick invented the mechanical reaper (1831). Watt → steam engine. Morse → telegraph.',
        whyMissed: 'You confused two American inventors of agricultural machines.'
      }
    ]
  },

  physics: {
    label: 'Physics',
    emoji: '⚡',
    color: '#3b82f6',
    accent: '#10b981',
    tagline: 'Mechanics · E&M · Energy',
    mistakes: [
      {
        id: 'p1',
        topic: 'Newton\'s Second Law',
        question: 'Newton\'s Second Law of Motion is:',
        options: ['F = ma', 'F = mv', 'F = mg', 'F = m/a'],
        correct: 0,
        userAnswer: 1,
        explanation: 'Force = mass × acceleration. You wrote momentum (p = mv), which is conserved but not Newton\'s 2nd Law.',
        whyMissed: 'Confused momentum (mv) with force (ma).'
      },
      {
        id: 'p2',
        topic: 'Kinetic Energy',
        question: 'The kinetic energy of a moving object is:',
        options: ['KE = mv', 'KE = mv²', 'KE = ½ mv²', 'KE = 2mv²'],
        correct: 2,
        userAnswer: 1,
        explanation: 'KE = ½mv². The ½ comes from integrating F·dx with a = dv/dt. You dropped the factor of ½.',
        whyMissed: 'Forgot the 1/2 coefficient — a top-3 most-missed physics mistake.'
      },
      {
        id: 'p3',
        topic: 'Ohm\'s Law',
        question: 'Ohm\'s Law relates voltage, current, and resistance as:',
        options: ['V = I/R', 'V = IR', 'V = R/I', 'I = VR'],
        correct: 1,
        userAnswer: 0,
        explanation: 'V = IR. From R = V/I (definition of resistance), rearranged. You inverted the relationship.',
        whyMissed: 'Algebra slip when rearranging the formula.'
      },
      {
        id: 'p4',
        topic: 'Waves',
        question: 'The wave speed equation is:',
        options: ['v = f × λ', 'v = f / λ', 'v = λ / f', 'v = f + λ'],
        correct: 0,
        userAnswer: 1,
        explanation: 'v = fλ (frequency × wavelength). Period T = 1/f, so v = λ/T is the same equation.',
        whyMissed: 'Confused frequency with period — they\'re reciprocals.'
      },
      {
        id: 'p5',
        topic: 'Coulomb\'s Law',
        question: 'Coulomb\'s Law for electric force between two charges:',
        options: ['F = kq₁q₂ / r', 'F = kq₁q₂ / r²', 'F = kq₁q₂ × r²', 'F = q₁q₂ / kr²'],
        correct: 1,
        userAnswer: 0,
        explanation: 'F = kq₁q₂/r² — inverse square law, just like gravity. You forgot to square the distance.',
        whyMissed: 'Missed the inverse-SQUARE — distance is squared, not linear.'
      }
    ]
  }
};

// Convenience getter
function getMistakes(subject) {
  return MISTAKE_POOL[subject] || MISTAKE_POOL.math;
}
