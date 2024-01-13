let currentTest;
let questions;
let answers = [];

function loadTest(testName) {
    // Fetch questions for the selected test (Assuming you have JSON files for each test)
    fetch(`tests.json`)
        .then(response => response.json())
        .then(data => {
            currentTest = testName;
            questions = data[testName];
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
        questionElement.classList = ["question"];
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

        // Display answer options as radio buttons
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
    answers = [];
    var divs = document.querySelectorAll('.question');
    divs.forEach(function(div) {
        var inputs = Array.from(div.querySelectorAll('input[type="radio"]'));
        
        for (let i = 0; i < inputs.length; i += 3) {
            const group = inputs.slice(i, i + 3);
            const checkedIndex = group.findIndex(item => item.checked);
            answers.push(checkedIndex + 1);
        }
    });
    displayAnswers();
}

function displayAnswers() {
    const answersContainer = document.getElementById('finalScore');
    answersContainer.innerHTML = "";
    answersContainer.style.display = "block";
    answersContainer.innerHTML = '<h2>Your Answers:</h2>';

    var i=1
    answers.forEach(answer => {
        const answerElement = document.createElement('p');
        answerElement.innerHTML = `<strong>${i}</strong>: ${answer}`;
        answersContainer.appendChild(answerElement);
        i++
    });
    displayFinalScore(calculateFinalScore());
}

function calculateFinalScore() {
    let totalScore = 0;
    var i=0
    answers.forEach(answer => {
        totalScore += questions[i].options[answer-1].score;
        i++
    });
    return totalScore;
}

function displayFinalScore(finalScore) {
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.innerText = `Your final score for the ${currentTest} Test is: ${finalScore}`;
    finalScoreElement.style.display = 'block';
}
