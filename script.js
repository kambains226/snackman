//this is the main js file that is responisble for most of the functionality of the game 

// global variables 
//movement key checks
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

//used for the score
let num =0 ;
let score =0;
// selects the main tag 
const main = document.querySelector('main');

//lives global variables
const liveIcon = document.querySelector('.lives ul ');
let aliveCheck =true ;
let canRemoveLife = true;
let lastCalled = 0;
const delay = 1500;
let counter = 0;
let hearts = 3;

let block;


    

//creates  the  random maze 

randomMaze(height, width, maze);
MazeAssignment();




    

// always displays the leaderBoard 

leaderboardAlways();
function lives(){

    // add the 3 lives at the start of the game 
    let lives = 3;

    for (let i =0; i<lives; i++){
        let life = document.createElement('li');
        liveIcon.append(life); 
    }

   }
lives();


// the function that starts the game on start button 
function play(event){
    // checks if a player collects a point 
    function pointCheck(){
        const points = document.querySelectorAll('.point');
        const postion = player.getBoundingClientRect()
        const pointOpacity = 0.1; //sets the opacity of the point when collected
        
        for (let i =0; i< points.length; i++) {
            let pointPostion = points[i].getBoundingClientRect()
            if (postion.right > pointPostion.left && postion.left < pointPostion.right && postion.bottom > pointPostion.top && postion.top < pointPostion.bottom){
                if (points[i].classList.contains('extraLife') && points[i].style.opacity !=pointOpacity ){
                   
                    addLife();
                
            }
                if (points[i].style.opacity !=pointOpacity){
                    points[i].style.opacity = pointOpacity;
                    scoreupdate(points.length);
                    
                }
                
                
            }
            
        }

    }

    // function to update the score called when a point is collected 
    function scoreupdate(points){
        let totalPoints= points;
       
        num+=1;
        const pElement =document.querySelector('.score p')

        score = Number(pElement.innerText);
        score ++;
        pElement.innerText = score
        // when a player gets all the points on the level  go to a next level 
        if(num == totalPoints){
            
        
            
            enemyMoveEnable = false;

            setTimeout(() => {
                clearMaze();
                // allows the player to move once the level is clear
                play(event);
                
                
                
            },2000);

        }
     }

    // will display gameover message 
    function gameOver(){
        
        clearInterval(Maininterval);
        enemyMoveEnable = false;
        let gameOver = document.querySelector('.menu h1');
        let menu = document.querySelector('.menu');
        menu.style.display = 'flex';
        leaderBoard()
        gameOver.textContent = 'GAMEOVER!  RESTART?'
        gameOver.addEventListener('click',function(event){
            // reloads the screen 
            event.stopPropagation();
            location.reload();
        });

        
    }
    

 
    // checks if an enemy hits the player 
    
    function enemyCheck(){
        const enemys = document.querySelectorAll('.enemy');
    
        // gets the players postion 
        let playerPostion = player.getBoundingClientRect();
        for (let enemy of enemys) {
            
            
            let enemyPostion = enemy.getBoundingClientRect();
            if (playerPostion.left < enemyPostion.right && playerPostion.right > enemyPostion.left && playerPostion.bottom > enemyPostion.top && playerPostion.top < enemyPostion.bottom){
                
                if(aliveCheck && canRemoveLife){
                    
                    canRemoveLife = false;
                    removeLife();
                    // makes its so the player is invincable for 5 seconds 
                    setTimeout(() =>{
                        
                        canRemoveLife = true;
                        aliveCheck = true;
                        
                    },5000)
                }


            } 
            
            
        }

    }
    
    
        
    
//    removes a life on hit 
   function removeLife(){
        
           
        // checks to see if the player is dead 
        counter ++;
        // adds the dead animation when the player loses all the lives 
        if (counter == hearts ){
            aliveCheck = false;
            player.classList.add('dead')
            liveIcon.lastElementChild.remove();
            setTimeout(() => {
                // adds game over message when dead 
                gameOver();
                

            }, 1500); 
        }
        // if collision it adds the hit class  and removes a life 
        else{
            player.classList.add('hit')
        
            if (liveIcon.lastElementChild) {
                liveIcon.lastElementChild.remove();
            }
            // makes it so the player cant move for 1.5 seconds after getting hit 
            aliveCheck =false;
            setTimeout(() => {
                aliveCheck = true;
                player.classList.remove('hit')
            }, 1500);
        
    }
            
    
    
        
   }


//    player viarables 
    
    
    const player = document.querySelector('#player');
    const playerMouth = player.querySelector('.mouth');
    let playerTop = 0;
    let playerLeft = 0;

    // calls the powerup function 
    
    powerups();
    
    let Maininterval = setInterval(function() {
        let postion = player.getBoundingClientRect();
        
        
        
        
        enemyCheck();
     
        pointCheck();
        
       
       

        //movement controls
        
       //down
        if((downPressed ) )  {
                
                // finds the next postion 
                
                let new_bottom = postion.bottom + 1;

                let btml =document.elementFromPoint(postion.left, new_bottom);
                let btmr =document.elementFromPoint(postion.right, new_bottom);

                // only moves if the next square isnt a wall 
                if(btml && btmr &&(btml.classList.contains('wall') == false && btmr.classList.contains('wall') == false) && aliveCheck){
                    playerTop++;
                    player.style.top = playerTop + 'px';

                }
                else if(btml& btmr &(btml.classList.contains('wall') == true && btmr.classList.contains('wall') == true)){
                    downPressed =false;
                }
                
                if (playerMouth){
                    playerMouth.classList = 'down';
                }
            }
        //up
        else if((upPressed  ) ) {
            

            
            let newTop =postion.top -1;
            let topL = document.elementFromPoint(postion.left, newTop);
            let topR = document.elementFromPoint(postion.right, newTop);

            if(topL &&  topR &&(topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) && aliveCheck) {
                playerTop--;
                player.style.top = playerTop + 'px';
            }
            else if(topL && topR &&(topL.classList.contains('wall') == true && topR.classList.contains('wall') == true)){
                upPressed =false;
            }
            if (playerMouth){
                playerMouth.classList = 'up';
            }
        }
        //left
        else if((leftPressed ) ) {
            
            
            
            let newLeft = postion.left -1;
            
            let leftT = document.elementFromPoint(newLeft,postion.top )
            let leftB = document.elementFromPoint(newLeft,postion.bottom)
            
            if(leftT && leftB &&(leftT.classList.contains('wall') == false && leftB.classList.contains('wall') == false )&& aliveCheck){
                playerLeft--;
                player.style.left = playerLeft + 'px';
            }
          
            
            else if(leftT && leftB &&(leftT.classList.contains('wall') == true && leftB.classList.contains('wall') == true)){
                leftPressed =false;
            }
            if (playerMouth){
                playerMouth.classList = 'left';
            }
        
        }
        //right
        else if((rightPressed ) ) {
            
            
            
            let newRight = postion.right +1;

            let rightT = document.elementFromPoint(newRight , postion.top )
            let rightB = document.elementFromPoint(newRight,postion.bottom )

            if(rightT &&rightB &&(rightT.classList.contains('wall') == false && rightB.classList.contains('wall') == false )&& aliveCheck){

                
                playerLeft++;
                player.style.left = playerLeft + 'px';
                
                }
            else if(rightT&rightB&(rightT.classList.contains('wall') == true && rightB.classList.contains('wall') == true)){
                    rightPressed =false;
                }
            
            if (playerMouth){
                    playerMouth.classList = 'right';
                }
            }
                    
    }, 10);






    // start button 

    
        let start = document.querySelector('.menu')
        // if the start div is clicked or if a child of the start div is clicked it will dissapear
        if (start.contains(event.target)) {
            start.style.display = 'none';
            
            //arrow buttons functions
            
            
            // makes the enemies start moving once the game has started 
            enemyMove();
            
               
            //down arrow

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