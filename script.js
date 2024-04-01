let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector('main');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Populates the maze in the HTML
for (let y of maze) {
    for (let x of y) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (x) {
            case 1:
                block.classList.add('wall');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }

        main.appendChild(block);
    }
}

// point check 
function pointCheck(){
    const postion = player.getBoundingClientRect();
    const point1= document.querySelectorAll('.point')[0];
    const point2= document.querySelectorAll('.point')[1];
    const point3= document.querySelectorAll('.point')[2];
    const point4= document.querySelectorAll('.point')[3];
    const point5= document.querySelectorAll('.point')[4];

    const p1Postion = point1.getBoundingClientRect();
    const p2Postion = point2.getBoundingClientRect();
    const p3Postion = point3.getBoundingClientRect();
    const p4Postion = point4.getBoundingClientRect();
    const p5Postion = point5.getBoundingClientRect();


    if (postion.right > p1Postion.left && postion.left < p1Postion.right && postion.bottom > p1Postion.top && postion.top < p1Postion.bottom){
        point1.style.display = 'none';
    }
    if(postion.right > p2Postion.left && postion.left < p2Postion.right && postion.bottom > p2Postion.top && postion.top < p2Postion.bottom){
        point2.style.display = 'none';
    }
    if(postion.right > p3Postion.left && postion.left < p3Postion.right && postion.bottom > p3Postion.top && postion.top < p3Postion.bottom){
        point3.style.display = 'none';
    }
    if (postion.right > p4Postion.left && postion.left < p4Postion.right && postion.bottom > p4Postion.top && postion.top < p4Postion.bottom){
        point4.style.display = 'none';
    }
}



const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;

let interval = setInterval(function() {
    
    pointCheck();


    if(downPressed  ) {
            let postion = player.getBoundingClientRect();
            let new_bottom = postion.bottom + 1;
            
            
            let btml =document.elementFromPoint(postion.left, new_bottom);
            let btmr =document.elementFromPoint(postion.right, new_bottom);

            if(btml.classList.contains('wall') == false && btmr.classList.contains('wall') == false){
                playerTop++;
                player.style.top = playerTop + 'px';
            }
            playerMouth.classList = 'down';
        }
        // i need to fix a problem with not being able to move when colliding 
    else if(upPressed ) {
                let postion = player.getBoundingClientRect();
                let newTop =postion.top -1;
                let topL = document.elementFromPoint(postion.left, newTop);
                let topR = document.elementFromPoint(postion.right, newTop);

                if(topL.classList.contains('wall') == false && topR.classList.contains('wall') == false){
                    playerTop--;
                    player.style.top = playerTop + 'px';
                }
               
                playerMouth.classList = 'up';
            }
        
    else if(leftPressed ) {
        let postion = player.getBoundingClientRect();
        let newLeft = postion.left -1;
        
        let leftT = document.elementFromPoint(newLeft,postion.top )
        let leftB = document.elementFromPoint(newLeft,postion.bottom)
        
        if(leftT.classList.contains('wall') == false && leftB.classList.contains('wall') == false){
            playerLeft--;
            player.style.left = playerLeft + 'px';
        }
        
        playerMouth.classList = 'left';
       
    }
        
    else if(rightPressed ) {
        let postion = player.getBoundingClientRect();
        let newRight = postion.right +1;

        let rightT = document.elementFromPoint(newRight , postion.top )
        let rightB = document.elementFromPoint(newRight,postion.bottom )

        if(rightT.classList.contains('wall') == false && rightB.classList.contains('wall') == false){

            
            playerLeft++;
            player.style.left = playerLeft + 'px';
            
            }
        playerMouth.classList = 'right';
        }
    //             }}
}, 10);






// start button 

function startButton(event) {
    let start = document.querySelector('.start')
    // if the start div is clicked or if a child of the start div is clicked it will dissapear
    if (start.contains(event.target)) {
        start.style.display = 'none';
        //Player movement
        function keyUp(event) {
            
            // only runs if the player starts the game 
            if (event.key === 'ArrowUp') {
                upPressed = false;
            } else if (event.key === 'ArrowDown') {
                downPressed = false;
            } else if (event.key === 'ArrowLeft') {
                leftPressed = false;
            } else if (event.key === 'ArrowRight') {
                rightPressed = false;
            }
        }

        function keyDown(event) {
            if (event.key === 'ArrowUp') {
                upPressed = true;
            } else if (event.key === 'ArrowDown') {
                downPressed = true;
            } else if (event.key === 'ArrowLeft') {
                leftPressed = true;
            } else if (event.key === 'ArrowRight') {
                rightPressed = true;
            }
        }
        
        // events listeners 
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

    }
    
}


document.addEventListener('click', startButton)