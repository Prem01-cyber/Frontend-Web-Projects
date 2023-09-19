setTimeout(() => {
    document.body.classList.remove("preload");
}, 500);

const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");
const playAgain = document.querySelector(".play-again-btn");
const scoreNumber = document.querySelector(".score_number");

const CHOICES = [
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "rock",
        beats: "scissors"
    },
    {
        name: "scissors",
        beats: "paper"
    }
]

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results_result");

// Logic
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName);
        choose(choice)
    });
});

function choose(choice) {  
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const randomChoice = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomChoice];
}

function displayResults(results) {

    resultDivs.forEach((resultDiv, index) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[index].name}">
                    <img src="images/icon-${results[index].name}.svg" alt="${results[index].name}"/>
                </div>`
        }, index * 1000);
    });

    gameDiv.classList.toggle("hidden")
    resultsDiv.classList.toggle("hidden")
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());
        if (userWins) {
            resultText.innerText = "you won!";
            resultDivs[0].classList.toggle("winner");
            updateScore(1);
        }
        else if (aiWins) {
            resultText.innerText = "you lost!";
            resultDivs[1].classList.toggle("winner");
            updateScore(-1);
        }
        else {
            resultText.innerText = "It's a tie!";
        }
    }, 1000);

    resultWinner.classList.toggle("hidden")
    resultsDiv.classList.toggle("show-winner")
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

// Play again
playAgain.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden")
    resultsDiv.classList.toggle("hidden")
    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden")
    resultsDiv.classList.toggle("show-winner")
});

// Score
let score = 0;
function updateScore(point) {
    score += point;
    scoreNumber.innerText = score
}

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});