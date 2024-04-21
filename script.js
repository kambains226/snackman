

// global variables 

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let num =0 ;
let score =0;
const main = document.querySelector('main');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
// let maze = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
//     [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//     [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
//     [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];




   
randomMaze(height, width,maze);

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
//defined outside play so its always running 
function leaderboardAlways(){
    const scores = document.querySelector('.leaderboard ol');
    
    for (let i = 0; i < localStorage.length; i++){
        let listItem = document.createElement('li');
        scores.appendChild(listItem);
        listItem.textContent = localStorage.getItem(localStorage.key(i));
        
}
   
}

leaderboardAlways();

console.log(localStorage)

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
        console.log(totalPoints);
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
        leaderboard()
        gameOver.textContent = 'GAMEOVER!  RESTART?'
        gameOver.addEventListener('click',function(){
            location.reload();
        });

        
    }
    function leaderboard(){
        let username = prompt('Enter your name to go on to the leaderboard');
        if (username){
            const  scores = document.querySelector('.leaderboard ol');
            let listItem = document.createElement('li');
            // 
            
            localStorage.setItem(username, username+'.........'  + score);
            listItem.textContent = (localStorage.getItem(username+'.........' + score));
            // let =text= localStorage.getItem(username);
            
            
            // localStorage.clear();

           //localstorage.removeitem
            

        }
        
    }

// i neeed to get acces to the points to add to the score 
    
    
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
    
    
   

function enemyDown(enemys, postion, speed) {
    
    let aiTop = parseInt(enemys.style.top);
    
    //if (ai_btml.classList.contains('wall') == false && ai_btmr.classList.contains('wall') == false) {
        
     //   enemys.style.top = aiTop + 'px';
    //}
    //enemys.style.top = aiTop + 'px';
}
    
// score borad funtions 


    
    const player = document.querySelector('#player');
    const playerMouth = player.querySelector('.mouth');
    let playerTop = 0;
    let playerLeft = 0;
    // interval that update movement and does collision detection 
    let interval = setInterval(function() {
        let postion = player.getBoundingClientRect();
        // console.log(score);
    
       
        

        pointCheck();
        enemyCheck();
        
        if(downPressed  ) {
                

                
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
