// connects to html
let cells = document.querySelectorAll('.row>div');
let winmsg = document.getElementsByClassName('win-msg')[0]

//defines winning combinations
let winningCombos = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]],
    [cells[0], cells[4], cells[8]],
    [cells[2], cells[4], cells[6]],
];

//will restart game later
let gameOver = false;

let firstPlayer = 'X';
let secondPlayer = 'O';
let clickCount = 0;

console.log(cells);

// loops events in cells
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClicked);
};

// listens for clicks, adds character, resets board after 9 moves. 
function cellClicked(e) {
    if (gameOver) {
        reset();
    }

       if (clickCount > 2) {
        checkWinner();
    } else if (clickCount === 9) {
        itsADraw();
        
    }

    togglePlayer(event)
}

function togglePlayer(event) {
    if (clickCount % 2 == 0) {
        event.target.textContent = firstPlayer;
        clickCount++;
        console.log(clickCount);
    } else {
        event.target.textContent = secondPlayer;
        clickCount++;
        console.log(clickCount);
    };
    checkWinner();
}

function itsADraw() {
    winmsg.innerText = "It's a draw! Click to Play Again!";
    gameOver = true;
}

// main function that that checks for winner and draw
function checkWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        let xSum = 0
        let oSum = 0
        for (let j = 0; j < winningCombos[i].length; j++) {
            if (winningCombos[i][j].textContent === firstPlayer) {
                xSum++
                
            }
            else if (winningCombos[i][j].textContent === secondPlayer) {
                oSum++
            }
            if (xSum === 3) {
                winmsg.innerText = "X Wins! Click to Play Again!";
                gameOver = true;
            } else if (oSum === 3) {
                winmsg.innerText = "O Wins! Click to Play Again!";
                gameOver = true;
            }
                else if (clickCount > 8 && xSum == !3 || clickCount > 8 && oSum == !3) {
                gameOver = true;
                itsADraw();
            } else if (clickCount === 10) {               
                reset();
            };
        };
    };
};

//resets board after win or draw
function reset() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    };
    clickCount = 0;
    winmsg.innerText = ""
    gameOver = false;
    location.reload();
}

