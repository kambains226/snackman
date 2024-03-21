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





const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;

let interval = setInterval(function() {
    let collision = false;
    
    //create a boundary on the player id
    let playerbounder = document.querySelector('.block#player')
    let prect = playerbounder.getBoundingClientRect();
    
    // need to make this work it make it so i can only go down and left not up or right 
    let walls = document.querySelectorAll('.block.wall');
    
    

    walls.forEach(wall =>{
        let wrect = wall.getBoundingClientRect();
        

        if (prect.bottom > wrect.top && prect.top < wrect.bottom 
            &&prect.right > wrect.left && prect.left < wrect.right) {
                collision = true;
                console.log('player', prect.bottom + ' ' + prect.top + ' ' + prect.left + ' ' + prect.right);

                console.log('wall' ,wrect.bottom + ' ' + wrect.top + ' ' + wrect.left + ' ' + wrect.right);
                clearInterval(interval);
                
                
            }
    
        
            
    });
    
   

    if(downPressed && !collision) {
        
            playerTop++;
            player.style.top = playerTop + 'px';
            playerMouth.classList = 'down';
        }
        
    // i need to fix a problem with not being able to move when colliding 
    else if(upPressed && !collision) {
        
            playerTop--;
            player.style.top = playerTop + 'px';
            playerMouth.classList = 'up';
        }
    
    else if(leftPressed && !collision ) {
        
            playerLeft--;
            player.style.left = playerLeft + 'px';
            playerMouth.classList = 'left';
        }
    
    else if(rightPressed && !collision  ) {
        
            
            playerLeft++;
            player.style.left = playerLeft + 'px';
            playerMouth.classList = 'right';
            }
    
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