

// global variables 

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let num =0 ;
let score =0;
const main = document.querySelector('main');







//Populates the maze in the HTML
randomMaze(height, width,maze);

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

leaderboardAlways();
console.log(localStorage);


// i need to make sure it doesnt ask for a prompt twice 

// function that checks if player has collected the point
function play(event){
    
    function pointCheck(){
        const points = document.querySelectorAll('.point');
        const postion = player.getBoundingClientRect()
        const pointOpacity = 0.1;
        for (let i =0; i< points.length; i++) {
            let pointPostion = points[i].getBoundingClientRect()
            if (postion.right > pointPostion.left && postion.left < pointPostion.right && postion.bottom > pointPostion.top && postion.top < pointPostion.bottom){
                
                if (points[i].style.opacity !=pointOpacity){
                    points[i].style.opacity = pointOpacity;
                    scoreupdate(points.length);
                    
                }
                
            }
            

        }

    }

    // function to update the score called when a point is collected 
    function scoreupdate(points){
        const totalPoints= points;
       
        num+=1;
        const pElement =document.querySelector('.score p')

        score = Number(pElement.innerText);
        score ++;
        pElement.innerText = score

        if(num == totalPoints){
            gameOver();

        }
     }

    // will display gameover message 
    function gameOver(){
        clearInterval(interval);
        let gameOver = document.querySelector('.menu h1');
        let menu = document.querySelector('.menu');
        menu.style.display = 'flex';
        leaderBoard()
        gameOver.textContent = 'GAMEOVER!  RESTART?'
        gameOver.addEventListener('click',function(){
            location.reload();
        });

        
    }
    

 
    
    
    function enemyCheck(){
        const enemys = document.querySelectorAll('.enemy');
    
        
        let playerPostion = player.getBoundingClientRect();
        for (let enemy of enemys) {
            enemy.style.top=0;
            enemy.style.left=0;
            let enemyPostion = enemy.getBoundingClientRect();
            if (playerPostion.left < enemyPostion.right && playerPostion.right > enemyPostion.left && playerPostion.bottom > enemyPostion.top && playerPostion.top < enemyPostion.bottom){
                player.classList.add('dead');
                clearInterval(interval);
                setTimeout(gameOver, 1500);
            

            } 
            // setInterval(() => enemyMovement(enemy), 50);
            // setInterval(enemyMovement(enemy), 50);
            // enemyMovement(enemys);
            
        }

    }


    // function enemyMovement(enemy) {
    //     let randomnum = Math.floor(Math.random() * 1) + 1;
    //     let enemyTop =0;
    //     let enemy_Left =0;
    //     console.log(randomnum);
    //     if (randomnum ==1){
            
    //         setInterval( function() { 
    //             enemyTop++;
    //             enemy.style.top = enemyTop+ 'px';

            
            
    //         }, 10 );
            
    // }
        
        
    // }
    
    
   function enemyMovement(){
    const enemys = document.querySelectorAll('.enemy');
    for (let enemy of enemys) {
        
        let randomNum = Math.floor(Math.random() * 1) + 1;
        
        
        if (randomNum == 1 ){
            enemyDown(enemy,  0.5);
        }
        
        // enemyLeft(enemy, postion, 1);
        // enemyRight(enemy, postion, 1);
        // enemyUp(enemy, postion, 1);
    }
   }
// i need to make the enemy move 
    function enemyDown(enemys,  speed) {
        let position = enemys.getBoundingClientRect();
        let top = position.top;

        function move() {
            top += speed;
            enemys.style.top = top + 'px';

            // Request the next frame
            requestAnimationFrame(move);
        }

        // Start the animation
        move();

    }

    //arrow buttons functions
    //down arrow
    function downArrow() {
        return new Promise((resolve, reject) => {
            document.getElementById('dbttn').addEventListener('click', function() {
                resolve(true);
            });
        });
    }
    // upArrow
    function upArrow() {
        return new Promise((resolve, reject) => {
            document.getElementById('ubttn').addEventListener('click', function() {
                resolve(true);
            });
        });
    }
    // left arrow 
    function leftArrow() {
        return new Promise((resolve, reject) => {
            document.getElementById('lbttn').addEventListener('click', function() {
                resolve(true);
            });
        });
    }
    // right arrow

    function rightArrow() {
        return new Promise((resolve, reject) => {
            document.getElementById('rbttn').addEventListener('click', function() {
                resolve(true);
            });
        });
    }
    // got a problem with the arrows work on click anywhere but only down need to fix
    
    const player = document.querySelector('#player');
    const playerMouth = player.querySelector('.mouth');
    let playerTop = 0;
    let playerLeft = 0;
    // interval that update movement and does collision detection 
    let interval = setInterval(function() {
        let postion = player.getBoundingClientRect();
        
    
       
        

        pointCheck();
        enemyCheck();
        // enemyMovement();

        
        if(downPressed || downArrow()) {
                

                
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
        else if(upPressed || upArrow()) {
            

            
            let newTop =postion.top -1;
            let topL = document.elementFromPoint(postion.left, newTop);
            let topR = document.elementFromPoint(postion.right, newTop);

            if(topL.classList.contains('wall') == false && topR.classList.contains('wall') == false){
                playerTop--;
                player.style.top = playerTop + 'px';
            }
            
            playerMouth.classList = 'up';
        }
        
        else if(leftPressed || leftArrow()) {
            

            
            let newLeft = postion.left -1;
            
            let leftT = document.elementFromPoint(newLeft,postion.top )
            let leftB = document.elementFromPoint(newLeft,postion.bottom)
            
            if(leftT.classList.contains('wall') == false && leftB.classList.contains('wall') == false){
                playerLeft--;
                player.style.left = playerLeft + 'px';
            }
            
            playerMouth.classList = 'left';
        
        }
            
        else if(rightPressed || rightArrow()) {
            

            
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

    
        let start = document.querySelector('.menu')
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



document.addEventListener('click', play);
