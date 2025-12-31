// Fetching Necessary elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const title = document.querySelector(".title");

// At the start of the game Player O will play first
let turnO = true;

// These are the 8 cases in which we can get a winner
const winPatterns = [[0,1,2], [3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


// When one of the 8 cases is found then Congratulations message with player name will come at the top, Title will be hide, Boxes got disabled and Reset Button text will be replaced with "New Game".
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    title.classList.add("hide");
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetBtn.innerText = "New Game";
}

// Disable Box Function
const disableBoxes  = () => {
    for(let box of boxes){
    box.disabled = true;
    }
}
// Enable Box Function
const enableBoxes  = () => {
    for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
    }
}

// Reset Game Function : After clicking on the Reset Button or New Game Button The Game will be reset and you can start the game again, O has turn again, Boxes got enabled, Winner message got vanished, Title of the game come back
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.innerText = "Reset";
    title.classList.remove("hide");
}
// Winner Checking Function : Here we are checking all 8 patterns and in each pattern checking all 3 boxes that has the same value as well as none of the boxes should be empty
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "" ){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
            }
        }
    }
}

//Here we are adding text "O and X" alternatively to each box after clicking and disabling it after one input, checking for winner if we got or not
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false
        }else{
            box.innerText = "X";
            turnO = true
        }
        box.disabled = true;
        checkWinner();
    } )
})

// Adding Click event listener on Reset Button
resetBtn.addEventListener("click", resetGame);