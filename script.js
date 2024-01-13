let currentTest;
let questions;
let answers = [];

function loadTest(testName) {
    // Fetch questions for the selected test (Assuming you have JSON files for each test)
    fetch(`tests/${testName}.json`)
        .then(response => response.json())
        .then(data => {
            currentTest = testName;
            questions = data.questions;
            displayTest();
        })
        .catch(error => console.error('Error fetching test data:', error));
}

function displayTest() {
    document.getElementById('testTitle').innerText = `${currentTest} Test`;
    document.getElementById('testSelection').style.display = 'none';
    document.getElementById('testContent').style.display = 'block';

    // Display questions
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

        // Assuming options are in an array within the question object
        question.options.forEach(option => {
            const radioBtn = document.createElement('input');
            radioBtn.type = 'radio';
            radioBtn.name = `q${index}`;
            radioBtn.value = option.value;

            const label = document.createElement('label');
            label.appendChild(radioBtn);
            label.appendChild(document.createTextNode(option.text));

            questionElement.appendChild(label);
        });

        questionsContainer.appendChild(questionElement);
    });
}

function completeTest() {
    // Collect answers
    answers = [];
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            const answer = {
                question: index + 1,
                selectedOption: selectedOption.value,
                score: question.options.find(option => option.value === selectedOption.value).score
            };
            answers.push(answer);
        }
    });

    // Calculate and display final score
    const finalScore = calculateFinalScore();
    displayFinalScore(finalScore);
}

function calculateFinalScore() {
    let totalScore = 0;
    answers.forEach(answer => {
        totalScore += answer.score;
    });
    return totalScore;
}

function displayFinalScore(finalScore) {
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.innerText = `Your final score for the ${currentTest} Test is: ${finalScore}`;
    finalScoreElement.style.display = 'block';
}
