let boxes= document.querySelectorAll(".box");
let rstBtn= document.querySelector("#rstbtn");
let newGameBtn= document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let count=0;
let winner=false;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count=0;
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congragulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    
}

const checkWinner=()=>{
    winner = false;
    for(let pattern of winPatterns){

        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;
        
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val === pos2Val && pos2Val=== pos3Val){
                showWinner(pos1Val);
                winner=true;
                return;
            }
        }
    }
    if(!winner){
        checkDraw();
    }
}

const showDraw = () =>{
    msg.innerText="Oops !! It Ended In A Draw!!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkDraw = ()=>{
    if(count===9){
        showDraw();
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){
            box.innerText = "X";
            turnX = false;
        }else{
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;

        count++;
        checkWinner();
        
    });
});

newGameBtn.addEventListener("click", resetGame);
rstBtn.addEventListener("click", resetGame);

