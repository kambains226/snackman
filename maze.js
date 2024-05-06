// maze gloabl variables 
let walls = 9;
let enemyCount = 1;

let height =9;
let width = 9;

let maze = [];

let powerupEnable =1;
let x, y;

// generates the new maze 
function clearMaze() {
    

    
    let blockContents = document.querySelectorAll('.block');
    blockContents.forEach((block) => {
        block.remove();
    });
    maze=[];
    clearEnemyMovement(); 
    //makes the level more dificult 
    mazeDifficulty();
    // creates the maze after deleting it 
    
    randomMaze(height,width,maze)
    widthIncrease(width);
    MazeAssignment();
    
    
    // allows the enemy to move 
    enemyMoveEnable=true;
    enemyMove();
    
    // resets the score 
    num =0;

    //powerups
    powerups();
    powerupEnable =1;
}

// makes the enemies stop moving  when level is completed 

function clearEnemyMovement(){
    clearInterval(enemyMovementInterval)
    clearInterval(enemySecondInterval)
}

// assigns the maze array with its class 
const MazeAssignment =() =>{
    for (let y of maze) {
        
        for (let x of y) {
            block = document.createElement('div');
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
}
// generates the random maze 
function randomMaze(height, width,maze)  {


    
    // intialise the array with all points


    for (let i = 0; i < height; i++) {
        maze.push([])
        for (let j = 0; j < width; j++) {
            maze[i].push(0)
        }

    }


    // places the walls on the outside



    for (let i = 0; i < height; i++) {
        maze[i][0] = 1
        maze[i][width - 1] = 1
    }

    for (let i =0; i< width; i++) {
        maze[0][i] = 1
        maze[height - 1][i] = 1
    }


    // player postion 
    const numOfRows = maze.length;
    const rowLength =maze[0].length;

    maze[1][1]=2;

    // enemy postion 
    for (let i =0; i < enemyCount; i++) {
        const mazearray = Math.floor(Math.random() * numOfRows)
        const rowArray = Math.floor(Math.random() * rowLength)

        if (maze[mazearray][rowArray] === 0) {
            maze[mazearray][rowArray] = 3
        } else {
            i--
        }
    }

    // walls inside maze not border  postion 

    for (let i =0; i < walls; i++) {
        const mazearray = Math.floor(Math.random() * numOfRows)
        const rowArray = Math.floor(Math.random() * rowLength)

        if (maze[mazearray][rowArray] === 0  && 
            // limits where the walls can spawn trying to prevent unplayable game
            !(mazearray+1 < numOfRows && rowArray+1 < rowLength && maze[mazearray+1][rowArray+1] == 1) &&
            !(mazearray-1 >= 0 && rowArray+1 < rowLength && maze[mazearray-1][rowArray+1] == 1) &&
            !(mazearray+1 < numOfRows && rowArray-1 >= 0 && maze[mazearray+1][rowArray-1] == 1) &&
            !(mazearray-1 >= 0 && rowArray-1 >= 0 && maze[mazearray-1][rowArray-1] == 1)) {
            maze[mazearray][rowArray] = 1
        } else {
            i--
        }
    }

    return maze
    
}

// makes the maze more difficult 

const mazeDifficulty = () =>{
    enemyCount  ++;
    height ++;
    widthIncrease(++width);
    walls +=3;
    
    

    
}




    
    

// changes the width depending on what the width variable is set to
// increase the width 
function widthIncrease(width){
    
    
    let mainWidth = document.querySelector('main');
    mainWidth.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    
        
    
}

// makes sure the width increase loads in 
document.addEventListener('DOMContentLoaded', (event) => {
    widthIncrease(width);
    
    
});
function powerups(){


    for (let i = 0; i < height; i++) {
        
        for (let j = 0; j < width; j++) {
        
            
            if (maze[i][j] === 0 && powerupEnable === 1) {
                
                
                
                    
                    let randomTime = Math.floor(Math.random() * (1000 - 3000 + 1)) + 20000;
                    powerupEnable = 0;
                    
                    //need to find a way to get the point to be added  when the class is being added to non point 
                    setTimeout(() => {
                        let points = document.querySelectorAll('.point');
                        pointSelection(points.length);
                        
                            // adds the extra life class when collected 
                        
                            points[x].classList.add('extraLife')
                            console.log(points[x])
                            powerupEnable=2;

                        
                        
                        
                        
                        }, randomTime);
                        
                }
            }
    }
    
}


//gets a random point on the maze
function pointSelection(pointsArr){
    
    // selects a random point
    x = Math.floor(Math.random() * pointsArr);
   

    
    
    

};

// adds the life 
function addLife (){
    let extraLife = document.createElement('li');

    liveIcon.appendChild(extraLife);
    hearts++;
}


