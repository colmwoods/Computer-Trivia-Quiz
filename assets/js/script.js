const page1 = document.getElementById("page1"); // Difficulty Page
const page2 = document.getElementById("page2"); // Number Of Questions Page
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



const state = { // State Object to Hold Quiz Data / Defaults
    difficulty: 'mixed', // Default Difficulty
    amount: 10,     // Default Number of Questions
    questions: [], // Array to hold questions
    current: 0, // Current Question Index
    score: 0, // Current Score
    incorrect: 0 // Current Incorrect Answers
};

function decodeHTML(html) { // Function to Decode HTML Entities
    const t = document.createElement('textarea'); // Create a Textarea Element
    t.innerHTML = html; // Set Inner HTML to the Encoded String
    return t.value; // Return the Decoded Value
}

function shuffle(arr) { // Function to Shuffle an Array
    return arr.sort(() => Math.random() - 0.5); // Sort the Array Randomly
}

function showPage(sectionId) { // Function to Show a Specific Page and Hide Others
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));  // Hide All Sections
    document.getElementById(sectionId).classList.remove('hidden');   // Show the Page We Want

}

async function StartQuiz() {
    const rawStr = (numberOfQuestions.value || '').trim(); // Get The Value of Number of Questions Input
    const raw = rawStr === '' ? 10 : parseInt(rawStr, 10); // Parse the Value to an Integer, Default to 10 if Empty
    if (!Number.isInteger(raw) || raw < 5 || raw > 25) { // Validate the Input
        numberOfQuestions.setCustomValidity('Please enter a number between 5 and 25.'); // Set Custom Validity Message
        numberOfQuestions.reportValidity(); // Show Validation Message
        numberOfQuestions.focus(); // Focus on the Input Field
        return; // Exit if the input is invalid
    }
    else {
        numberOfQuestions.setCustomValidity(''); // Clear Custom Validity Message
    }

    const amount = raw; // Get the Number of Questions from Input

    const difficulty = difficultySelect.value; // or "mixed" if you added that option
    const url = `https://opentdb.com/api.php?amount=${amount}&category=18${difficulty && difficulty !== "mixed" ? `&difficulty=${difficulty}` : ""}`; // Construct the API URL with Selected Difficulty and Amount


    showPage('quiz'); // Show the Quiz Page
    questionsDisplay.textContent = 'Loading questions…'; // Display Loading Message
    choicesElement.innerHTML = ''; // Clear Previous Choices

    const qs = await fetchQuestions(url); // Fetch Questions from the API
    state.questions = qs; // Store Questions in State Object
    state.current = 0; // Reset Current Question Index
    state.score = 0; // Reset Score
    state.incorrect = 0; // Reset Incorrect Answers
    score.textContent = `Score: ${state.score}`; // Reset Score Display
    incorrect.textContent = `Incorrect: ${state.incorrect}`; // Reset Incorrect Answers Display
    renderQuestions();
}

function renderQuestions() { // Function to Render Questions and Choices
    const currentQuestion = state.questions[state.current]; // Current Question
    if (!currentQuestion) { // If There Are No Questions, Quit Quiz
        EndQuiz(); // End the Quiz if No Questions are Available
        return; // Exit If No Current Question Are Available
    }

    NextQuestionButton.classList.add('hidden'); // Hide Next Question Button Until Answer is Selected

    questionsDisplay.textContent = decodeHTML(currentQuestion.question); // Display The Current Question
    questionNumber.textContent = `Question ${state.current + 1} / ${state.questions.length}`; // Display Question Number
    choicesElement.innerHTML = ''; // Clear Previous Choices

    const answers = [
        ...currentQuestion.incorrect_answers, // Answers Array with Correct Answer and Incorrect Answers (OpenTDB Format)
        currentQuestion.correct_answer
    ];

    const shuffledAnswers = shuffle(answers); // Shuffle Answers Variable

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button'); // Create Button Element for Each Answer
        button.textContent = decodeHTML(answer); // Set Button Text to Answer
        button.classList.add('choice-button'); // Add Class for Styling
        button.addEventListener('click', () => selectAnswer(button.textContent, currentQuestion.correct_answer)); // Add Click Event to Select Answer
        choicesElement.appendChild(button); // Append Button to Choices Element
    });

    const choiceButtons = document.querySelectorAll('.choice-button'); // Get All Choice Buttons
    choiceButtons.forEach(button => { // Loop Through Each Choice Button
        button.disabled = false; // Enable All Choice Buttons
        button.classList.remove('score', 'incorrect'); // Remove Previous Classes
    });
}

async function fetchQuestions(url) { // Function to Fetch Questions from the API
    try {
        const response = await fetch(url); // Fetch Questions from the API
        if (!response.ok) { // If Response is Not OK
            throw new Error(`HTTP error! status: ${response.status}`); // Throw An Error
        }
        const data = await response.json(); // Await JSON Response

        if (data?.response_code !== 0 || !Array.isArray(data?.results) || data.results.length === 0) { // Check if Response Code is Not 0 or Results Array is Empty
            console.error('OpenTDB returned no results:', data); // Log Error to Console
            questionsDisplay.textContent = 'No questions returned. Try a different difficulty or number.'; // Display Error Message
            return [];
        }

        return data.results; // Return The Questions Array
    }


    catch (error) { // Catch Any Errors
        console.error('Error fetching questions:', error); // Log Error to Console
        questionsDisplay.textContent = 'Failed to load questions. Please try again later.'; // Display Error Message
        return []; // Return Empty Array if Fetch Fails
    }
}

function NextQuestion() { // Function To Go to the Next Question
    if (state.current < state.questions.length - 1) { // If There Are More Questions
        state.current++; // Increment Current Question Index
        renderQuestions(); // Render the Next Question
    } else { // If No More Questions Left
        EndQuiz(); // End the Quiz
    }
}

function selectAnswer(selectedAnswer, correctAnswer) { // Function to Handle Answer Selection
    const normalize = s => decodeHTML(String(s)) // Decode HTML Entities
        .replace(/\u00a0/g, ' ') // Replace Non-Breaking Spaces
        .replace(/\s+/g, ' ')  // Replace Multiple Spaces with Single Space
        .trim(); // Trim Leading and Trailing Spaces

    if (normalize(selectedAnswer) === normalize(correctAnswer)) { // If Selected Answer is Correct
        state.score++; // Increment Score
        score.textContent = `Score: ${state.score}`; // Update Score Display

    } else { // If Selected Answer is Incorrect
        state.incorrect++; // Increment Incorrect Answers
        incorrect.textContent = `Incorrect: ${state.incorrect}`; // Update Incorrect Answers Display
    }

    const choiceButtons = document.querySelectorAll('.choice-button'); // Get All Choice Buttons
    choiceButtons.forEach(button => { // Loop Through Each Choice Button
        button.disabled = true; // Disable All Choice Buttons

        if (normalize(button.textContent) === normalize(correctAnswer)) { // If Button Text Matches Correct Answer
            button.classList.add('score'); // Add Score Class to Correct Answer Button
        }
        if (
            normalize(button.textContent) === normalize(selectedAnswer) && // If Button Text Matches Selected Answer
            normalize(selectedAnswer) !== normalize(correctAnswer) // If Selected Answer is Not Correct
        ) {
            button.classList.add('incorrect'); // Add Incorrect Class to Selected Answer Button
        }
    });
    NextQuestionButton.classList.remove('hidden'); // Show Next Question Button
}

function EndQuiz() { // Function to End the Quiz
    showPage('end'); // Show End Page
    totalScore.textContent = `${state.score} / ${state.questions.length}`; // Display Total Score
}

function PlayAgain() { // Function to Restart the Quiz
    showPage('page1'); // Show Difficulty Page
}

document.addEventListener('DOMContentLoaded', () => { // Event Listener for DOMContentLoaded
    showPage('page1'); // Show the start page by default

    ontoPage2.addEventListener('click', () => showPage('page2')); // Brings User To Number of Questions Page
    startQuizButton.addEventListener('click', StartQuiz); // Starts the Quiz
    NextQuestionButton.addEventListener('click', NextQuestion); // Proceeds to the Next Question
    againButton.addEventListener('click', PlayAgain); // Restarts the Quiz
});

const isVisible = el => el && !el.classList.contains('hidden'); // Function to Check if Element is Visible

document.addEventListener('keydown', (e) => { // Keydown Event Listener for Keyboard Navigation
    if (e.key !== 'Enter') return; // Only Proceed if Enter Key is Pressed

    if (isVisible(page1)) { ontoPage2.click(); e.preventDefault(); return; } // If Page 1 is Visible, Click the Next Button
    if (isVisible(page2)) { startQuizButton.click(); e.preventDefault(); return; } // If Page 2 is Visible, Click the Start Quiz Button
    if (isVisible(quiz) && !NextQuestionButton.classList.contains('hidden')) { // If Quiz is Visible and Next Question Button is Not Hidden
        NextQuestionButton.click(); e.preventDefault(); return; // Click the Next Question Button
    }
    if (isVisible(end)) { againButton.click(); e.preventDefault(); } // If End Page is Visible, Click the Play Again Button
});