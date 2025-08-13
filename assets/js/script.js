const page1 = document.getElementById("page1"); // Start Page
const page2 = document.getElementById("page2"); // Quiz Page
const quiz = document.getElementById("quiz"); // Quiz Section
const end = document.getElementById("end"); // End Page

const difficultySelect = document.getElementById("difficulty"); // Difficulty Selection
const ontoPage2 = document.getElementById("ontoPage2"); // Button to Proceed to Number of Questions Page
const numberOfQuestions = document.getElementById("numberOfQuestions"); // Number of Questions Selection Min 5 Max 25
const startQuizButton = document.getElementById("startQuiz"); // Start Quiz Button
const questionNumber = document.getElementById("questionNumber"); // Question Number Display
const score = document.getElementById("score"); // Score Display
const incorrect = document.getElementById("incorrect"); // Incorrect Answers Display
const questionsDisplay = document.getElementById("questions"); // Questions Display
const choicesElement = document.getElementById("choices"); // Choices Display
const NextQuestionButton = document.getElementById("nextQuestion"); // Next Question Button
const totalScore = document.getElementById("total"); // Total Score Display
const againButton = document.getElementById("againBtn"); // Play Again Button


const state = {
    difficulty: 'mixed', // Default Difficulty
    amount: 10,     // Default Number of Questions
    questions: [], // Array to hold questions
    current: 0, // Current Question Index
    score: 0, // Current Score
    incorrect: 0 // Current Incorrect Answers
};

function showPage(sectionId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));  // Hide All Sections
    document.getElementById(sectionId).classList.remove('hidden');   // Show the Page We Want

}

function StartQuiz() {
    showPage('quiz');
    renderQuestions();

}

function renderQuestions() {
}

function NextQuestion() {
}

function selectAnswer() {
}

function EndQuiz() {
    showPage('end');
}

function ShowScore() {
}

function PlayAgain() {
    showPage('page1');
}

document.addEventListener('DOMContentLoaded', () => {
    showPage('page1'); // Show the start page by default

    ontoPage2.addEventListener('click', () => showPage('page2')); // Brings User To Number of Questions Page
    startQuizButton.addEventListener('click', StartQuiz); // Starts the Quiz
    NextQuestionButton.addEventListener('click', NextQuestion); // Proceeds to the Next Question
    againButton.addEventListener('click', PlayAgain); // Restarts the Quiz
});