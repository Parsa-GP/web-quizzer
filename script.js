let currentTest;
let questions;
let answers = [];
let grade;

function loadTest(testName) {
    // Fetch questions for the selected test (Assuming you have JSON files for each test)
    fetch(`api/get_testdata.php?testname=${testName}`)
        .then(response => response.json())
        .then(data => {
            currentTest = testName;
            questions = data;
            displayTest();
        })
        .catch(error => console.error('Error fetching test data:', error));
}

function displayTest() {
    document.getElementById('header').style.display = 'none';
    document.getElementById('test-title').innerText = `${currentTest} Test`;
    document.getElementById('test-selection').style.display = 'none';
    document.getElementById('test-content').style.display = 'block';

    // Display questions
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList = ["question"];
        questionElement.innerHTML = `<p>${index + 1}. ${question.q}</p>`;

        // Display answer options as radio buttons
        question.options.forEach(option => {
            const radioBtn = document.createElement('input');
            radioBtn.type = 'radio';
            radioBtn.name = `q${index}`;
            radioBtn.value = option.value;

            const span = document.createElement('span');
            span.textContent = option;

            const label = document.createElement('label');
            label.appendChild(radioBtn);
            label.appendChild(span);

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
    calculateFinalScore();
    displayFinalScore();
}

function calculateFinalScore() {
    fetch(`api/get_result.php?data=${btoa(JSON.stringify(answers))}&testname=${currentTest}`)
    .then(response => response.json())
    .then(data => {
        grade = data;
        displayFinalScore();
    })
    .catch(error => console.error('Error fetching test data:', error));

    return grade;
}

function displayFinalScore() {
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.innerText = `Your final score for the ${currentTest} Test is: ${grade}`;
    finalScoreElement.style.display = 'block';
}
