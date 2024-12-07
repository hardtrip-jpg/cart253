/**
 * RYTHYM GAME SCRIPT
 * by: Jeremy Dumont
 * 
 * This is an extension of the MAZE game. When typing, you must match your timing to the beat of the song. If the beat is missed, the key won't register.
 */

/**
 * This terminal holds a minimal amount of commands all connected to the maze logic script. You can go back to the menu or reset. Theres also a secret 'win' command if you complete the maze.
 */
const rythymTerminal = new Terminal(
    (commands) => {
        let first_word = commands[0];
        let second_word = commands[1];

        switch (first_word) {
            case ("menu"):
                changeState("menu");
                break;

            case ("move"):
                mazeGoTo(second_word, rythymTerminal);
                rythymTerminal.print("Looking around...");
                rythymTerminal.commandsCheck(["look"]);
                break;

            case ("look"):
                mazeLook(rythymTerminal);
                break;

            case ("help"):
                printHelp(rythymTerminal);
                break;

            case ("jasd98j5234jasd"):
                rythymTerminal.reset();
                for (i = 0; i <= 45; i++) {
                    rythymTerminal.print("You WIN!!!!!!!!");
                }
                rythymTerminal.print("Type RESET to retry");
                rythymTerminal.drawTerminal();
                break;

            case ("reset"):
                rythymReset();
                break;

            default:
                rythymTerminal.print("ERROR: " + first_word + " IS NOT VALID");
                break;
        }
    }
)

/**RYHTYM VARIABLES */


let tickIcon = {
    x: 610,
    y: 25,
    size: 10
};

//Timing variables for visuals
let tickBeat = 0.479;
let showTick = false;
let tickValue = 0;

//Timing variables for inputs
let beatLength = 0.2395;
let beatValue = 0;

let perfectBuffer = 0.1;
let goodBuffer = 0.2;

//Rating visuals
let ratingText = "";
let showRating = false;
let ratingOpacity = 0;
let ratingFadeSpeed = 2;



/**
 * This function is called as the rythym's draw state. First, it draws the rythym terminal. Then, it draws the rythym tick icon and the rating. After, it adds to the beat and tick value which will be used to see if a beat has been hit.
 */
function rythymDraw() {
    rythymTerminal.drawTerminal();
    drawTick();
    drawRating();

    beatValue += 0.0166666666667;
    tickValue += 0.0166666666667;

    if (beatValue >= beatLength) {
        beatValue -= beatLength;
    }
}


/**
 * This function is called whenever the game needs to be reset. This done either when the game is started or if the RESET command is typed.
 */
function rythymReset() {
    //First stop the song if it is currently playing
    rythymSong.stop();

    //Reset all timing variables to 0
    rythymTerminal.caretTime = 0;
    tickValue = 0;
    beatValue = 0;

    //Restart the song and make it loop
    rythymSong.loop(true);

    //Reset the text being displayed and print out a starting message
    rythymTerminal.reset();
    rythymTerminal.print("Welcome to RYTHYM!");
    rythymTerminal.print("Can you feel it?");
    rythymTerminal.print("...");
    rythymTerminal.print("Use HELP for instructions");

    //Reset the rating text and hide it
    ratingText = "newRating";
    ratingOpacity = 0;
    showRating = false;

    //Reset the maze logic and set it to the rythym game
    currentMaze = rythymMaze;
    currentMazeEnd = rythymMazeEnd;
    playerPosition = rythymMazeStart;


}

/**
 * This function checks if the player has hit a key in time frames related to the beat. It compares the current beatValue to the beatLength plus specific buffers. If the inputs are inside the timing, the keypress is passed on to the terminal. Otherwise, it is ignored.
 */
function rythymKeyPress() {

    //If beatValue is inside the beatlength +- the perfectbuffer
    if (beatValue <= (beatLength + perfectBuffer) && beatValue >= (beatLength - perfectBuffer)) {
        updateRating('perfect');
        rythymTerminal.keyCheck();
    }
    //If beatValue is inside the beatlength +- the goodbuffer
    else if (beatValue <= (beatLength + goodBuffer) && beatValue >= (beatLength - goodBuffer)) {
        updateRating('good');
        rythymTerminal.keyCheck();
    }
    else {
        updateRating('miss');
    }



}

/**
 * When the exiting the rythym game, the rythym song is stopped
 */
function rythymEnd() {
    rythymSong.stop();
}

/**
 * First, determine if the tick should be drawn. If so, change the colour of the tick to green. Then draw the tick based on the tickIcon javascript object. The tick is drawn a 2/3rds of the beat to make it look more natural.
 */
function drawTick() {
    push();

    //Check if tickValue is the tickBeat variable (a small buffer is added that shows the tick before the actual beat)
    if (tickValue >= (tickBeat - (tickBeat / 3))) {
        rythymTerminal.caretVisible = true;
        showTick = true;
    }

    //Reset tickValue if its over tickBeat
    if (tickValue >= tickBeat) {
        tickValue -= tickBeat;
    }

    //If tickValue over 1/3 of tickBeat, stop showing the tick
    if (tickValue >= (tickBeat / 3)) {
        rythymTerminal.caretVisible = false;
        showTick = false;
    }


    if (showTick) {
        fill("#40FD90");
    }
    else {
        fill("#000000");
    }

    ellipse(tickIcon.x, tickIcon.y, tickIcon.size);
    pop();
}

/** 
 * If we are showing the rating, draw the text. Lower the opacity everytime the text is drawn. If the opacity is lower then 0, stop drawing the text and ignore this function. */
function drawRating() {
    if (showRating) {
        if (ratingOpacity <= 0) {
            showRating = false;
        }
        else {
            // console.log(ratingOpacity)
            push();
            fill(64, 253, 144, ratingOpacity);
            textAlign(RIGHT);
            textFont(terminalFont);
            textSize(25);
            text(ratingText, 600, 37);
            ratingOpacity -= ratingFadeSpeed;
            pop();
        }
    }

}

/**
 * Get a new text rating, then reset the opacity and make sure the text can be shown. 
 */
function updateRating(newRating) {
    ratingText = newRating;
    ratingOpacity = 255;
    showRating = true;
}