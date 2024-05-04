
let walls = 9;
let enemyCount = 1;

let height =9;
let width = 9;


// generates the maze 
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

    
}

function clearEnemyMovement(){
    clearInterval(enemyMovementInterval)
    clearInterval(enemySecondInterval)
}
const MazeAssignment =() =>{
    for (let y of maze) {
        let rowElements =[]
        for (let x of y) {
            block = document.createElement('div');
            block.classList.add('block');
            rowElements.push(block);
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
        mazeContents.push(rowElements);
    
    }
}
function randomMaze(height, width,maze)  {


    
    // intialise the array with all points


    for (let i = 0; i < height; i++) {
        maze.push([])
        for (let j = 0; j < width; j++) {
            maze[i].push(0)
        }

    }


    // places the walls on the outside

    // maze[0] shouuld equal 1 

    // maze[height - 1] = Array(width).fill(1)
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

        if (maze[mazearray][rowArray] === 0 && !unplayable(maze,mazearray,rowArray)) {
            maze[mazearray][rowArray] = 1
        } else {
            i--
        }
    }

    return maze
    
}

const mazeDifficulty = () =>{
    enemyCount  ++;
    height ++;
    widthIncrease(++width);
    walls +=3;
    
    

    console.log(enemyCount,height,width)
}
// limits where the walls can spawn trying to prevent unplayable game
function unplayable(array, column, row) {
    //&& (array[column][row+2] ==1 && array[column][row-2] ==1 && array[column +2][row] ==1 &&array[column -2][row] ==1 )
    if ((array[column-1][row] == 1 || array[column+1][row] == 1 || array[column][row-1] == 1 || array[column][row+1] == 1) &&(array[column-1][row-1] ==1 || array[column-1][row+1] ==1 || array[column+1][row-1] == 1 || array[column+1][row+1] ==1) ||  (array[column][row+2] ==1 && array[column][row-2] ==1 && array[column +2][row] ==1 &&array[column -2][row] ==1 ) ) {
        return true;
    }
    // still sometimes the maze cant be completed 

    
    
    
}

// changes the width depending on what the width variable is set to
// increase the width 
function widthIncrease(width){
    
    
    let mainWidth = document.querySelector('main');
    mainWidth.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    
        
    
}


document.addEventListener('DOMContentLoaded', (event) => {
    widthIncrease(width);
    
    
});
function powerups(){


    for (let i = 0; i < height; i++) {
        // let powerupChance = Math.floor(Math.random() * 1 + 1);
        for (let j = 0; j < width; j++) {
            
            // if (powerupChance === 1 ){

            //     addPowerup();
            // }
            if (maze[i][j] === 0 && powerupEnable === 1) {

                let randomTime = Math.floor(Math.random() * (1000 - 3000 + 1)) + 10000;
                powerupEnable ++;
                //need to find a way to get the point to be added  when the class is being added to non point 
                setTimeout(() => {
                    
                    pointSelection();
                    
                    if(mazeContents[x][y] ==0){
                        mazeContents[x][y].classList.add('extraLife')
                        console.log(mazeContents[x][y])
                    }

                    else{
                        powerupEnable =0;
                        pointSelection();
                        console.log(mazeContents[x][y],'adsasf')
                    }
                    
                    
                    console.log(powerupEnable)
                    
                    
                    
                    }, randomTime);
                    
            }
        }

    }
}
// function addPowerup(){
//     //the job of this function is to randomly stop the loop from being enabled
//     powerupEnable = t;

// }
function removePowerUp(){
    let powerupDuration =Math.floor(Math.random() * ( 20000- 5000 + 1)) + 10000;
    

    setTimeout(() => {
        powerupEnable = false

    }, powerupDuration);


    
}
//gets a random point on the maze
function pointSelection(){
    
    // selects a random postion  
    x = Math.floor(Math.random() * height);
    y = Math.floor(Math.random() * width);

    
    
    
};
// function addLife (){

// }
let maze = [];
let mazeContents =[];
let powerupEnable =1;
let x, y;

