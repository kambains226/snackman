

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

//lives global variables
const liveIcon = document.querySelector('.lives ul ');
let aliveCheck =true ;
let canRemoveLife = true;
let lastCalled = 0;
const delay = 1500;
let counter = 0;
let hearts = 3;




    

//creates  the maze 
randomMaze(height, width,maze);
// might be able to use the maze function when all the points are collected 

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
function lives(){
    let lives = 3;

    for (let i =0; i<lives; i++){
        let life = document.createElement('li');
        liveIcon.append(life); 
    }

   }
lives();



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
        clearInterval(Maininterval);
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
            // enemy.style.top=0;
            // enemy.style.left=0;
            
            let enemyPostion = enemy.getBoundingClientRect();
            if (playerPostion.left < enemyPostion.right && playerPostion.right > enemyPostion.left && playerPostion.bottom > enemyPostion.top && playerPostion.top < enemyPostion.bottom){
                // player.classList.add('dead');
                
                // clearInterval(interval);
                if(aliveCheck && canRemoveLife){
                    
                    canRemoveLife = false;
                    removeLife();
                    setTimeout(() =>{
                        
                        canRemoveLife = true;
                        aliveCheck = true;
                        
                    },5000)
                }


            } 
            
            
        }

    }
    
    
        
        
    
    
    
   
   function removeLife(){
        
           
        
        counter ++;
        if (counter == hearts ){
            player.classList.add('dead')
            liveIcon.lastElementChild.remove();
            setTimeout(() => {
                clearInterval(interval);
                gameOver();

            }, 1500);
             //need to make it so it waits a bit 
        }
        else{
            player.classList.add('hit')
        
            if (liveIcon.lastElementChild) {
                liveIcon.lastElementChild.remove();
            }
            aliveCheck =false;
            setTimeout(() => {
                aliveCheck = true;
                player.classList.remove('hit')
            }, 1500);
        
    }
            
    
    
        
   }

    
    
    
    const player = document.querySelector('#player');
    const playerMouth = player.querySelector('.mouth');
    let playerTop = 0;
    let playerLeft = 0;
    

    
    let Maininterval = setInterval(function() {
        let postion = player.getBoundingClientRect();
        
        
        
        
        enemyCheck();
     
        pointCheck();
        
       
       

        //arrow controls on click
        
       
        if((downPressed ) )  {
                
                
                let new_bottom = postion.bottom + 1;

                let btml =document.elementFromPoint(postion.left, new_bottom);
                let btmr =document.elementFromPoint(postion.right, new_bottom);

                if((btml.classList.contains('wall') == false && btmr.classList.contains('wall') == false) && aliveCheck){
                    playerTop++;
                    player.style.top = playerTop + 'px';

                }
                else if(btml.classList.contains('wall') == true && btmr.classList.contains('wall') == true){
                    downPressed =false;
                }
                
                if (playerMouth){
                    playerMouth.classList = 'down';
                }
            }
            // i need to fix a problem with not being able to move when colliding 
        else if((upPressed  ) ) {
            

            
            let newTop =postion.top -1;
            let topL = document.elementFromPoint(postion.left, newTop);
            let topR = document.elementFromPoint(postion.right, newTop);

            if((topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) && aliveCheck) {
                playerTop--;
                player.style.top = playerTop + 'px';
            }
            else if(topL.classList.contains('wall') == true && topR.classList.contains('wall') == true){
                upPressed =false;
            }
            if (playerMouth){
                playerMouth.classList = 'up';
            }
        }
        
        else if((leftPressed ) ) {
            
            
            
            let newLeft = postion.left -1;
            
            let leftT = document.elementFromPoint(newLeft,postion.top )
            let leftB = document.elementFromPoint(newLeft,postion.bottom)
            
            if((leftT.classList.contains('wall') == false && leftB.classList.contains('wall') == false )&& aliveCheck){
                playerLeft--;
                player.style.left = playerLeft + 'px';
            }
          
            
            else if(leftT.classList.contains('wall') == true && leftB.classList.contains('wall') == true){
                leftPressed =false;
            }
            if (playerMouth){
                playerMouth.classList = 'left';
            }
        
        }
            
        else if((rightPressed ) ) {
            
            
            
            let newRight = postion.right +1;

            let rightT = document.elementFromPoint(newRight , postion.top )
            let rightB = document.elementFromPoint(newRight,postion.bottom )

            if((rightT.classList.contains('wall') == false && rightB.classList.contains('wall') == false )&& aliveCheck){

                
                playerLeft++;
                player.style.left = playerLeft + 'px';
                
                }
            else if(rightT.classList.contains('wall') == true && rightB.classList.contains('wall') == true){
                    rightPressed =false;
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
            
            
            enemyMove();
            // enemyMovement();
                // ... rest of your code ...
            

            function downArrow() {
        
                downPressed =true;
                rightPressed=false;
                upPressed=false;
                leftPressed=false;
            }
            // upArrow
            function upArrow() {
                upPressed =true;
                downPressed=false;
                rightPressed=false;
                leftPressed=false;
            }
            // left arrow 
            function leftArrow() {
                leftPressed =true;
                downPressed=false;
                upPressed=false;
                rightPressed=false;
            }
            // right arrow
        
            function rightArrow() {
                rightPressed =true;
                downPressed=false;
                upPressed=false;
                leftPressed=false;
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


let start = document.querySelector('.menu')
start.addEventListener('click', play);