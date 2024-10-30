const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Что является столицей Казахстана?",
        choice1: "Алматы",
        choice2: "Нур-Султан",
        choice3: "Шымкент",
        choice4: "Атырау",
        answer: 2 // (Нур-Султан)
    },
    {
        question: "Какое озеро является самым большим в Казахстане?",
        choice1: "Алаколь",
        choice2: "Балхаш",
        choice3: "Зайсан",
        choice4: "Каспийское море",
        answer: 4 // (Каспийское море)
    },
    {
        question: "Какой известный поэт является основателем казахской письменной литературы?",
        choice1: "Абылай хан",
        choice2: "Абай Кунанбаев",
        choice3: "Амангельды Иманов",
        choice4: "Чокан Валиханов",
        answer: 2 // (Абай Кунанбаев)
    },
    {
        question: "В каком году Казахстан получил независимость?",
        choice1: "1990",
        choice2: "1991",
        choice3: "1992",
        choice4: "1993",
        answer: 2 // (1991)
    },
    {
        question: "Как называется национальное блюдо Казахстана, приготовленное из мяса и теста?",
        choice1: "Бешбармак",
        choice2: "Манты",
        choice3: "Плов",
        choice4: "Шашлык",
        answer: 1 // (Бешбармак)
    }
];

const correct_bonus = 10;
const max_questions = 5;

startGame = () => {
    questionCounter =0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= max_questions) {
        localStorage.setItem("recentScore", score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${max_questions}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];

    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
                
        if (classToApply === 'correct') {
            incrementScore(correct_bonus);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();