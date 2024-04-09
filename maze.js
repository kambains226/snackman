
function randomMaze(height, width,maze)  {

// 1. FIrst i need to create a 2d array and make alle the numbers in it 0 by default
// 2. Then i need to create a function that will randomly place walls in the maze
// 3. i do this by first making it so all the outter walls are a 1
// 4. then i need to place the player 2
// 5. then i should place the walls 9
// 6. then i  should place the points 50 

const walls = 9;
const enemyCount = 3;
    
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

    // for (let i =0; i < 1; i++) {
    //     const mazearray = Math.floor(Math.random() * numOfRows)
    //     const rowArray = Math.floor(Math.random() * rowLength)

    //     if (maze[mazearray][rowArray] === 0) {
    //         maze[mazearray][rowArray] = 2
    //     } else {
    //         i--
    //     }
    // // }
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

    // inside walls postion 

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

function unplayable(array, column, row) {
    if ((array[column-1][row] == 1 || array[column+1][row] == 1 || array[column][row-1] == 1 || array[column][row+1] == 1) &&(array[column-1][row-1] || array[column-1][row+1] || array[column+1][row-1] || array[column+1][row+1])  ) {
        return true;
    }
}
const height = 10;
const width = 10;


let maze = [];

// function hello (){
//     console.log("hello");
// };



