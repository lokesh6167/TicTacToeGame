const cells = document.querySelectorAll('div');
const result = document.querySelector("#result");
let boxValues = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
// let winned=false;
let started = false;
let count = 0;
function winnerCheck(i, j) {
    let valueIncell = boxValues[i][j];
    let rowsuccess = 0;
    let colsucess = 0;
    let Ldiagonal = 0;
    let Rdiagonal = 0;
    for (let k = 0; k < 3; k++) {
        if (boxValues[k][j] === valueIncell) {
            rowsuccess++;
        }
        if (boxValues[i][k] === valueIncell) {
            colsucess++;
        }
        if (i === j && boxValues[k][k] === valueIncell) {
            Ldiagonal++;
        }
        if (i + j === 2 && boxValues[k][2 - k] === valueIncell) {
            Rdiagonal++;
        }
    }
    return rowsuccess == 3 || colsucess == 3 || Ldiagonal == 3 || Rdiagonal == 3;
}
function start() {
    started = true;
    count=0;
    console.log("Start Button Clicked...");
}
function reset() {
    cells.forEach((cell) => {
        cell.textContent = "";
    })
    boxValues = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    count = 0;
    started = false;
    // result.textContent="click start button to start the Game !!"
}
cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        if (!started) {
            return
        }
        const i = parseInt(e.target.id / 3);
        const j = e.target.id % 3 ;
        if (!e.target.textContent) {
            if (count % 2 === 0) {
                e.target.textContent = 1;
                result.textContent = "Its player 2 turn";
                boxValues[i][j] = 1;
            } else if (count % 2 === 1) {
                e.target.textContent = 2;
                result.textContent = "Its player 1 turn";
                boxValues[i][j] = 2;
            }
            if (winnerCheck(i, j)) {
                result.textContent = `player-${count % 2 === 0 ? "1" : "2"} is the winner !!`;
                reset();
            }
            if (count === 8) {
                reset();
                result.textContent = "Match draw.. Pls start a new game by pressing start button !!";
            }
            count++;
        }
    })
});
