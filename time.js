const quizData = [
  {
    question: 'a=40,b=35  if(a>=b)Pass Or Fail?',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: ' A=10,B=20,System.out.println(a+b),System.out.println(a-b),System.out.println(a*b),System.out.println(a/b),System.out.println(a%b) ?',
    options: ['10,-40,200,0,10','30,-10,200,1,10','30,-10,200,0,10','30,-10,200,2,10'],
    answer: '30,-10,200,0,10'
  },
  {
    question: 'a=10,b=20  if(a>=b) True Or False?',
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'a=10 if(a==10) Equal Or Not Equal?',
    options: ['Equal', 'Not Equal'], 
    answer: 'Equal',
  },
  {
    question: 'Method Overloading add(int 20),add(int 20) Same Data Type',
    options: [
      'True',
      'False',
    ],
    answer: 'False',
  },
  {
    question: 'Method Overloading add(int 10),add(float 10) Different Data Type',
    options: ['True', 'Flase',],
    answer: 'True',
  },
  {
    question: 'Method Overloading add(int 10),add(int 10,int 20)Same Data Type Different Argument',
    options: [
      'True',
      'False',
    ],
    answer: 'True',
  },
  {
    question: 'What is Types of Inheritance?',
    options: ['Single,Multiple,Hierarchical,Hybrid', 'Single,Multilevel,Hierarchical,Hybird', 'Single,Multiple,Multilevel,Hierarchical,Hybird'],
    answer: 'Single,Multilevel,Hierarchical,Hybird',
  },
  {
    question: 'What is the Another Name of Upcasting?',
    options: [
      'Widening Casting',
      'Narrowing Casting',
    ],
    answer: 'Widening Casting',
  },
  {
    question: 'What is the Another Name of Downcasting?',
    options: ['Widening Casting ', 'Narrowing Casting'],
    answer: 'Narrowing Casting',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
