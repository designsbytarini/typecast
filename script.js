// Store user answers
const userAnswers = {};

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
  
  // Move to next question
  const questionNumber = parseInt(questionId.replace('q', ''));
  
  if (questionNumber < 10) {
    const nextQuestion = 'question' + (questionNumber + 1);
    showPage(nextQuestion);
  } else {
    // All questions answered, show results
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
  // Point system for each archetype
  const scores = {
    yearner: 0,
    dreamer: 0,
    chaosEnjoyer: 0,
    giggler: 0,
    fighter: 0,
    thrillSeeker: 0,
    mythIndulger: 0
  };
  
  // Point mapping for each question/answer combination
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
    'q4-b': { fighter: 1 },
    'q4-c': { chaosEnjoyer: 1 },
    'q4-d': { giggler: 1, mythIndulger: 1 },
    
    'q5-a': { yearner: 1, dreamer: 1 },
    'q5-b': { fighter: 1 },
    'q5-c': { giggler: 1 },
    'q5-d': { mythIndulger: 1 },
    
    'q6-a': { yearner: 1 },
    'q6-b': { giggler: 1 },
    'q6-c': { mythIndulger: 1 },
    'q6-d': { chaosEnjoyer: 1, fighter: 1 },
    
    'q7-a': { yearner: 1 },
    'q7-b': { dreamer: 1 },
    'q7-c': { giggler: 1 },
    'q7-d': { mythIndulger: 1, fighter: 1 },
    
    'q8-a': { yearner: 1, dreamer: 1 },
    'q8-b': { chaosEnjoyer: 1, fighter: 1 },
    'q8-c': { giggler: 1 },
    'q8-d': { mythIndulger: 1 },
    
    'q9-a': { chaosEnjoyer: 1 },
    'q9-b': { yearner: 1, giggler: 1 },
    'q9-c': { mythIndulger: 1 },
    'q9-d': { fighter: 1 },
    
    'q10-a': { fighter: 1 },
    'q10-b': { chaosEnjoyer: 1 },
    'q10-c': { dreamer: 1, mythIndulger: 1 },
    'q10-d': { yearner: 1, giggler: 1 }
  };
  
  // Calculate scores based on user answers
  for (let [question, answer] of Object.entries(userAnswers)) {
    const key = question + '-' + answer;
    const points = pointMap[key];
    
    if (points) {
      for (let [archetype, value] of Object.entries(points)) {
        scores[archetype] += value;
      }
    }
  }
  
  // Find archetype with highest score
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
      description: "YOUR DESCRIPTION FOR THE YEARNER HERE",
      image: "images/resultyearner.png"
    },
    dreamer: {
      title: "The Dreamer",
      description: "YOUR DESCRIPTION FOR THE DREAMER HERE",
      image: "images/resultdreamer.png"
    },
    chaosEnjoyer: {
      title: "The Chaos Enjoyer",
      description: "YOUR DESCRIPTION FOR THE CHAOS ENJOYER HERE",
      image: "images/resultchaos.png"
    },
    giggler: {
      title: "The Giggler",
      description: "YOUR DESCRIPTION FOR THE GIGGLER HERE",
      image: "images/resultgiggler.png"
    },
    fighter: {
      title: "The Fighter",
      description: "YOUR DESCRIPTION FOR THE FIGHTER HERE",
      image: "images/resultfighter.png"
    },
    thrillSeeker: {
      title: "The Thrill Seeker",
      description: "YOUR DESCRIPTION FOR THE THRILL SEEKER HERE",
      image: "images/resultthrillseeker.png"
    },
    mythIndulger: {
      title: "The Myth Indulger",
      description: "YOUR DESCRIPTION FOR THE MYTH INDULGER HERE",
      image: "images/resultmyth.png"
    }
  };
  
  const result = results[type];
  
  document.getElementById('result-image').src = result.image;
  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-description').textContent = result.description;
