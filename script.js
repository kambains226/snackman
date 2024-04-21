

// global variables 

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let upArrowPressed = false;
let downArrowPressed = false;
let leftArrowPressed =false;
let rightArrowPressed =false;

let num =0 ;
let score =0;
const main = document.querySelector('main');
// finds the lives 
const liveIcon = document.querySelector('.lives ul ');
let aliveCheck =true ;
let lastCalled = 0;
const delay = 1500;



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
                // player.classList.add('dead');
                
                // clearInterval(interval);
                if(aliveCheck){
                    removeLife();
                }

                


            

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
    
    
   //lives function
   function lives(){
    let lives = 3;

    for (let i =0; i<lives; i++){
        let life = document.createElement('li');
        liveIcon.append(life); 
    }

   }
   function removeLife(){
        const now = Date.now();
        console.log(now);
            if(now -lastCalled > delay){
                player.classList.add('hit')
                setTimeout
                liveIcon.remove(liveIcon.lastElementChild);
                aliveCheck =false;
                console.log(aliveCheck);
                
            
    }
    
        setTimeout(function(){
        // could try making a count variable if count = 1 then cant move 
        aliveCheck =true;
        console.log(aliveCheck);
        },1500);

   }

    
    
    
    const player = document.querySelector('#player');
    const playerMouth = player.querySelector('.mouth');
    let playerTop = 0;
    let playerLeft = 0;
    
//  sets the lives out need it out side the interval 
    lives();
    let interval = setInterval(function() {
        let postion = player.getBoundingClientRect();
        
    
       
        

        pointCheck();
        enemyCheck();
        
        // enemyMovement();

        //arrow controls on click
        
        console.log(downArrowPressed,upArrowPressed,leftArrowPressed,rightArrowPressed)
        if((downPressed || downArrowPressed) )  {
                
                
                let new_bottom = postion.bottom + 1;

                let btml =document.elementFromPoint(postion.left, new_bottom);
                let btmr =document.elementFromPoint(postion.right, new_bottom);

                if((btml.classList.contains('wall') == false && btmr.classList.contains('wall') == false) && aliveCheck){
                    playerTop++;
                    player.style.top = playerTop + 'px';

                }
                else if(btml.classList.contains('wall') == true && btmr.classList.contains('wall') == true){
                    downArrowPressed =false;
                }
                
                if (playerMouth){
                    playerMouth.classList = 'down';
                }
            }
            // i need to fix a problem with not being able to move when colliding 
        else if((upPressed || upArrowPressed ) ) {
            

            
            let newTop =postion.top -1;
            let topL = document.elementFromPoint(postion.left, newTop);
            let topR = document.elementFromPoint(postion.right, newTop);

            if((topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) && aliveCheck) {
                playerTop--;
                player.style.top = playerTop + 'px';
            }
            else if(topL.classList.contains('wall') == true && topR.classList.contains('wall') == true){
                upArrowPressed =false;
            }
            if (playerMouth){
                playerMouth.classList = 'up';
            }
        }
        
        else if((leftPressed || leftArrowPressed) ) {
            
            
            
            let newLeft = postion.left -1;
            
            let leftT = document.elementFromPoint(newLeft,postion.top )
            let leftB = document.elementFromPoint(newLeft,postion.bottom)
            
            if((leftT.classList.contains('wall') == false && leftB.classList.contains('wall') == false )&& aliveCheck){
                playerLeft--;
                player.style.left = playerLeft + 'px';
            }
          
            
            else if(leftT.classList.contains('wall') == true && leftB.classList.contains('wall') == true){
                leftArrowPressed =false;
            }
            if (playerMouth){
                playerMouth.classList = 'left';
            }
        
        }
            
        else if((rightPressed || rightArrowPressed) ) {
            
            
            
            let newRight = postion.right +1;

            let rightT = document.elementFromPoint(newRight , postion.top )
            let rightB = document.elementFromPoint(newRight,postion.bottom )

            if((rightT.classList.contains('wall') == false && rightB.classList.contains('wall') == false )&& aliveCheck){

                
                playerLeft++;
                player.style.left = playerLeft + 'px';
                
                }
            else if(rightT.classList.contains('wall') == true && rightB.classList.contains('wall') == true){
                    rightArrowPressed =false;
                }
            
            if (playerMouth){
                    playerMouth.classList = 'right';
                }
            }
        //             
    }, 10);






    // start button 

    
        let start = document.querySelector('.menu')
        // if the start div is clicked or if a child of the start div is clicked it will dissapear
        if (start.contains(event.target)) {
            start.style.display = 'none';
            //arrow buttons functions
            //down arrow
            function downArrow() {
        
                downArrowPressed =true;
                rightArrowPressed=false;
                upArrowPressed=false;
                leftArrowPressed=false;
            }
            // upArrow
            function upArrow() {
                upArrowPressed =true;
                downArrowPressed=false;
                rightArrowPressed=false;
                leftArrowPressed=false;
            }
            // left arrow 
            function leftArrow() {
                leftArrowPressed =true;
                downArrowPressed=false;
                upArrowPressed=false;
                rightArrowPressed=false;
            }
            // right arrow
        
            function rightArrow() {
                rightArrowPressed =true;
                downArrowPressed=false;
                upArrowPressed=false;
                leftArrowPressed=false;
            }  
            
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
            // interval that update movement and does collision detection 
            
                    // events listeners 
            document.addEventListener('keydown', keyDown);
            document.addEventListener('keyup', keyUp);
            document.getElementById('dbttn').addEventListener('click', downArrow);
            document.getElementById('ubttn').addEventListener('click', upArrow);
            document.getElementById('lbttn').addEventListener('click', leftArrow);
            document.getElementById('rbttn').addEventListener('click', rightArrow);

        }
        
    }



document.addEventListener('click', play);
