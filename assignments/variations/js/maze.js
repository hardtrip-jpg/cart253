//OFFICE
const fnafMaze = [
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0],
];

//The vectors for the starting and end positions
const fnafMazeStart = [1, 0];
const fnafMazeEnd = [1, 6];


//RYTHYM
const rythymMaze = [
    [1, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0],
]

//The vectors for the starting and end positions
const rythymMazeStart = [6, 0];
const rythymMazeEnd = [6, 6];


//Just using the the OFFICE maze as the starting point
let currentMaze = fnafMaze;
let currentMazeEnd = fnafMazeEnd;
let playerPosition = fnafMazeStart;


/**
 * This function is called by terminal commands. First, it determines the vectors for every cardinal direction based on the player. Then it passes the vectors to the checkWall function to return strings which are then printed in the terminal.
 */
function mazeLook(terminal) {
    //I could do this another way, but I ran out of time to figure out a better solution
    let north = [playerPosition[0], playerPosition[1] - 1];
    let south = [playerPosition[0], playerPosition[1] + 1];
    let west = [playerPosition[0] - 1, playerPosition[1]];
    let east = [playerPosition[0] + 1, playerPosition[1]];

    terminal.print("The NORTH" + checkWall(north));
    terminal.print("The EAST" + checkWall(east));
    terminal.print("The SOUTH" + checkWall(south));
    terminal.print("The WEST" + checkWall(west));
}


/**
 * This function takes in a vector and compares it to the currentMaze matrix. Once compared to the maze, it returns a string
 */
function checkWall(location) {

    if (location === currentMazeEnd) {
        return " has the end!";
    }

    if (location[1] <= 6 && location[1] >= 0 && location[0] <= 6 && location[0] >= 0) {
        if (currentMaze[location[1]][location[0]] === 1) {
            return " has a wall";
        } else {
            return " has nothing";
        }
    } else {
        return " is completely blocked off";
    }
}

/**
 * This function is called by terminal commands. First it compares the checks the command entered. Then it uses the checkWall function to see if the location the player wants to move to is available. If it is available, the player position is updated and the correct text is printed.
 */
function mazeGoTo(direction, terminal) {
    switch (direction) {
        case 'north':
            if (playerPosition[1] - 1 >= 0 && checkWall([playerPosition[0], playerPosition[1] - 1]) === " has nothing") {
                playerPosition[1]--;
                terminal.print("You move NORTH");
            } else {
                terminal.print("You can't go there");
            }
            break;
        case 'east':
            if (playerPosition[0] + 1 <= 6 && checkWall([playerPosition[0] + 1, playerPosition[1]]) === " has nothing") {
                playerPosition[0]++;
                terminal.print("You move EAST");
            } else {
                terminal.print("You can't go there");
            }
            break;
        case 'south':
            if (playerPosition[1] + 1 <= 6 && checkWall([playerPosition[0], playerPosition[1] + 1]) === " has nothing") {
                playerPosition[1]++;
                terminal.print("You move SOUTH");
            } else {
                terminal.print("You can't go there");
            }
            break;
        case 'west':
            if (playerPosition[0] - 1 >= 0 && checkWall([playerPosition[0] - 1, playerPosition[1]]) === " has nothing") {
                playerPosition[0]--;
                terminal.print("You move WEST");
            } else {
                terminal.print("You can't go there");
            }
            break;
    }
    if (currentMazeEnd === playerPosition) {
        terminal.commandsCheck("jasd98j5234jasd");
    }

}