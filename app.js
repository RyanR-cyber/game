const game = () => {
    let pScore = 0;
    let cScore = 0;

    // Start the game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeout');
            match.classList.add('fadein');
        });
    };

    // Update score display
    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    // Compare hands and determine winner
    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.winner');

        if (playerChoice === computerChoice) {
            winner.textContent = 'It is a tie';
            return;
        }

        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Player Wins';
                pScore++;
            } else {
                winner.textContent = 'Computer Wins';
                cScore++;
            }
        }

        if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Computer Wins';
                cScore++;
            } else {
                winner.textContent = 'Player Wins';
                pScore++;
            }
        }

        if (playerChoice === 'scissors') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Computer Wins';
                cScore++;
            } else {
                winner.textContent = 'Player Wins';
                pScore++;
            }
        }

        updateScore();
    };

    // Play match logic
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');
        const computerOptions = ['rock', 'paper', 'scissors'];

        // Reset animations after they finish
        hands.forEach(hand => {
            hand.addEventListener('animationend', function () {
                this.style.animation = "";
            });
        });

        options.forEach(option => {
            option.addEventListener('click', function () {
                // Disable buttons during animation
                options.forEach(btn => btn.disabled = true);

                const playerChoice = this.textContent.toLowerCase();
                const computerChoice = computerOptions[Math.floor(Math.random() * 3)];

                // Set images
                playerHand.src = `./assets/${playerChoice}.png`;
                computerHand.src = `./assets/${computerChoice}.png`;

                // Animate hands
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";

                // Compare hands after animation finishes
                setTimeout(() => {
                    compareHands(playerChoice, computerChoice);
                    options.forEach(btn => btn.disabled = false);
                }, 2000);
            });
        });
    };

    // Initialize the game
    startGame();
    playMatch();
};

// Start the game
game();

