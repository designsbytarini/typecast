// Store user answers
const userAnswers = {};

// All quiz questions
const questions = [
  {
    id: 1,
    question: "1. Your ideal protagonist is someone who",
    image: "images/Q1 photo.png",
    answers: [
      { text: "Loves deeply and quietly", value: "a" },
      { text: "Is unravelling in fascinating ways", value: "b" },
      { text: "Is flawed but lovable", value: "c" },
      { text: "Is dangerous, determined or isolating", value: "d" }
    ]
  },
  {
    id: 2,
    question: "2. You're drawn to film worlds that feel like",
    image: "images/Q2 photo.png",
    answers: [
      { text: "A soft ache that follows you out of the cinema", value: "a" },
      { text: "A slow uneasiness that has you hooked", value: "b" },
      { text: "A universe with lore, rules, and legend", value: "c" },
      { text: "A journey that tests the will to persist", value: "d" }
    ]
  },
  {
    id: 3,
    question: "3. When a film ends, what do you want to feel the most?",
    image: "images/Q3 photo.png",
    answers: [
      { text: "Emotional tenderness and nostalgia", value: "a" },
      { text: "Haunted and uneasiness", value: "b" },
      { text: "Warmness and amusement", value: "c" },
      { text: "Energised and exhilaration", value: "d" }
    ]
  },
  {
    id: 4,
    question: "4. Which character flaw can you forgive easily?",
    image: "images/Q4 photo.png",
    answers: [
      { text: "Emotional Fragility", value: "a" },
      { text: "Obsession", value: "b" },
      { text: "Cynical wit", value: "c" },
      { text: "Ruthless determination", value: "d" }
    ]
  },
  {
    id: 5,
    question: "5. What kind of film pacing do you prefer?",
    image: "images/Q5 photo.png",
    answers: [
      { text: "Slow, lingering and atmospheric pacing", value: "a" },
      { text: "Uncomfortable and unpredictable pacing", value: "b" },
      { text: "Easy, familiar and uncomplicated pacing", value: "c" },
      { text: "Intense, high energy and fast pacing", value: "d" }
    ]
  },
  {
    id: 6,
    question: "6. What feeling do you chase through cinema?",
    image: "images/Q6 photo.png",
    answers: [
      { text: "Longing", value: "a" },
      { text: "Power", value: "b" },
      { text: "Wonder", value: "c" },
      { text: "Discomfort", value: "d" }
    ]
  },
  {
    id: 7,
    question: "7. “How far from reality should a film take you?",
    image: "images/Q7 photo.png",
    answers: [
      { text: "Romanticize reality", value: "a" },
      { text: "Distort reality", value: "b" },
      { text: "Keep it grounded", value: "c" },
      { text: "Make a entirely new world", value: "d" }
    ]
  },
  {
    id: 8,
    question: "8. You're loyal to films that are",
    image: "images/Q8 photo.png",
    answers: [
      { text: "Beautiful, albeit painful", value: "a" },
      { text: "Bold, strange and disconcerting", value: "b" },
      { text: "Dependable and humorous", value: "c" },
      { text: "High adrenaline and action-y", value: "d" }
    ]
  },
  {
    id: 9,
    question: "9. If a character has power, what kind is it?",
    image: "images/Q9 photo.png",
    answers: [
      { text: "Power to cause chaos", value: "a" },
      { text: "Power to love, heal or connect", value: "b" },
      { text: "Power tied to survival, destiny or heroism", value: "c" },
      { text: "Power to disturb others to fulfil desire", value: "d" }
    ]
  },
  {
    id: 10,
    question: "10. When a film gets dark, what keeps you watching?",
    image: "images/Q10 photo.png",
    answers: [
      { text: "The tension, the not-knowing where it's going", value: "a" },
      { text: "The humour that's hiding the discomfort", value: "b" },
      { text: "The mood, even if nothing happens", value: "c" },
      { text: "The deep character connection", value: "d" }
    ]
  }
];

// Generate question pages when page loads
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('quiz-container');
  
  questions.forEach(q => {
    const questionDiv = document.createElement('div');
    questionDiv.id = `question${q.id}`;
    questionDiv.className = 'page';
    
    questionDiv.innerHTML = `
      <div class="quiz-card">
        <p class="question">${q.question}</p>
        <div class="quiz-image">
          <img src="${q.image}" alt="Question ${q.id}">
        </div>
        <div class="answers">
          ${q.answers.map(a => 
            `<button class="answer-btn" onclick="selectAnswer('q${q.id}', '${a.value}')">${a.text}</button>`
          ).join('')}
        </div>
      </div>
    `;
    
    container.appendChild(questionDiv);
  });
});

// Start the quiz
function startQuiz() {
  showPage('question1');
}

// Show specific page
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

// Handle answer selection
function selectAnswer(questionId, answerId) {
  userAnswers[questionId] = answerId;
  
  const questionNumber = parseInt(questionId.replace('q', ''));
  
  if (questionNumber < 10) {
    const nextQuestion = 'question' + (questionNumber + 1);
    showPage(nextQuestion);
  } else {
    showResults();
  }
}

// Calculate and display results
function showResults() {
  const resultType = calculateResultType();
  displayResult(resultType);
  showPage('results-page');
}

// Calculate which archetype the user gets
function calculateResultType() {
  const scores = {
    yearner: 0,
    dreamer: 0,
    chaosEnjoyer: 0,
    giggler: 0,
    fighter: 0,
    thrillSeeker: 0,
    mythIndulger: 0
  };
  
  const pointMap = {
    'q1-a': { yearner: 1, giggler: 1 },
    'q1-b': { dreamer: 1, thrillSeeker: 1 },
    'q1-c': { chaosEnjoyer: 1, giggler: 1 },
    'q1-d': { fighter: 1, mythIndulger: 1 },
    'q2-a': { yearner: 1, dreamer: 1 },
    'q2-b': { thrillSeeker: 1 },
    'q2-c': { mythIndulger: 1 },
    'q2-d': { chaosEnjoyer: 1, fighter: 1 },
    'q3-a': { yearner: 1 },
    'q3-b': { dreamer: 1 },
    'q3-c': { giggler: 1 },
    'q3-d': { fighter: 1, mythIndulger: 1 },
    'q4-a': { yearner: 1, dreamer: 1 },
    'q4-b': { thrillSeeker: 1 },
    'q4-c': { chaosEnjoyer: 1 },
    'q4-d': { fighter: 1, mythIndulger: 1 },
    'q5-a': { yearner: 1, dreamer: 1 },
    'q5-b': { thrillSeeker: 1 },
    'q5-c': { chaosEnjoyer: 1 },
    'q5-d': { fighter: 1 },
    'q6-a': { yearner: 1 },
    'q6-b': { fighter: 1 },
    'q6-c': { mythIndulger: 1 },
    'q6-d': { chaosEnjoyer: 1, thrillSeeker: 1 },
    'q7-a': { yearner: 1 },
    'q7-b': { dreamer: 1 },
    'q7-c': { giggler: 1 },
    'q7-d': { mythIndulger: 1, fighter: 1 },
    'q8-a': { yearner: 1, dreamer: 1 },
    'q8-b': { chaosEnjoyer: 1, thrillSeeker: 1 },
    'q8-c': { giggler: 1 },
    'q8-d': { fighter: 1, mythIndulger: 1 },
    'q9-a': { chaosEnjoyer: 1 },
    'q9-b': { yearner: 1, giggler: 1 },
    'q9-c': { fighter: 1, mythIndulger: 1 },
    'q9-d': { thrillSeeker: 1 },
    'q10-a': { thrillSeeker: 1 },
    'q10-b': { chaosEnjoyer: 1 },
    'q10-c': { dreamer: 1, mythIndulger: 1 },
    'q10-d': { yearner: 1, giggler: 1 }
  };
  
  for (let [question, answer] of Object.entries(userAnswers)) {
    const key = question + '-' + answer;
    const points = pointMap[key];
    
    if (points) {
      for (let [archetype, value] of Object.entries(points)) {
        scores[archetype] += value;
      }
    }
  }
  
  let maxScore = 0;
  let resultType = 'yearner';
  
  for (let [archetype, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      resultType = archetype;
    }
  }
  
  return resultType;
}

// Display the result
function displayResult(type) {
  const results = {
    yearner: {
      title: "The Yearner",
      image: "images/result-yearner.png"
    },
    dreamer: {
      title: "The Dreamer",
      image: "images/result-dreamer.png"
    },
    chaosEnjoyer: {
      title: "The Chaos Enjoyer",
      image: "images/result-chaos.png"
    },
    giggler: {
      title: "The Giggler",
      image: "images/result-giggler.png"
    },
    fighter: {
      title: "The Fighter",
      image: "images/result-fighter.png"
    },
    thrillSeeker: {
      title: "The Thrill Seeker",
      image: "images/result-thrillseeker.png"
    },
    mythIndulger: {
      title: "The Myth Indulger",
      image: "images/result-myth.png"
    }
  };
  
  const result = results[type];
  
  document.getElementById('result-image').src = result.image;
  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-description').textContent = result.description;
}
