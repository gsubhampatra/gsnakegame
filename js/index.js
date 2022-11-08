let inputDir = { x: 0, y: 0 };
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameOver.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
let score = 0;
let speed = 6;
let lastPaintTime = 0;
let hiscoreval;
let snakeArr = [
    { x: 13, y: 15 }
]

let food = { x: 6, y: 7 };
// let inputDir = {x:0,y:0};

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    
    gameEngine();
}
function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y )
            return true;
    }
        if ( snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0) {
            return true;   
        }
    return false;  
}
function clearscore() {
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
    hiscoreBox1.innerHTML = "High Score :"+hiscoreval;


}
function gameEngine() {
    //part 1 updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over Press any key to play again");
        snakeArr = [{x:13,y:15}];
        // musicSound.play();
        score = 0;
        speed=6.5;
    }
    //if snake eaten the food increament the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score +=1;
        speed +=0.1;
        if(score> hiscoreval){
           hiscoreval = score;
           localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
           hiscoreBox1.innerHTML = "High Score :"+hiscoreval;
           speed +=0.5;
        }
        scoreBox.innerHTML="Score : "+score; 
        snakeArr.unshift({ x: snakeArr[0].x+ inputDir.x, y: snakeArr[0].y+ inputDir.y });
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }
    

    //moving the snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
         snakeArr[0].x += inputDir.x;
         snakeArr[0].y += inputDir.y;



    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox1.innerHTML = "High Score :"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
            case "ArrowDown":
                console.log("arrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;
                
                case "ArrowRight":
                    console.log("arrowright");
                    inputDir.x = 1;
                    inputDir.y = 0;
                    break;
                    
                    case "ArrowLeft":
                        console.log("arrowleft");
                        inputDir.x = -1;
                        inputDir.y = 0;
                        break;
                        
                        default:
                            
                            break;
                        }
                    });
 function up1() {
    inputDir.x = 0;
    inputDir.y = -1;
}
function down1() {
    inputDir.x = 0;
    inputDir.y = 1;
}
function right1() {
    inputDir.x = 1;
    inputDir.y = 0;
}
function left1() {
    inputDir.x = -1;
    inputDir.y = 0;
}                   
