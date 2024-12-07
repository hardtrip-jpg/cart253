/**
 * It's Terminal
 * Jeremy Dumont
 * 
 * This is script that connects all other scripts to p5's main logic such as 'draw()' and 'mousePressed()'
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let state;


/**
 * Here, we create a new terminal called menuTerminal. This terminal will hold the commands 'hello', 'cooking', 'rythym', and 'office'. When those commands are called, we switch the game state to match. So if the user types cooking, we load the cooking terminal.
 */
let menuTerminal = new Terminal(
    (commands) => {
        //Only the first word typed is important
        let first_word = commands[0];

        switch (first_word) {

            //This specific command just prints out a unique text
            case 'hello':
                menuTerminal.print("Well hello there my friend!");
                break;

            case 'cooking':
                changeState('cooking');
                break;
            case 'rythym':
                changeState('rythym');
                break;
            case 'office':
                changeState('fnaf')

            //If the command entered doesn't exist, print out an error
            default:
                menuTerminal.print("ERROR: " + first_word + " IS NOT VALID");
                break;
        }
    }
)


/**
 * Creates the canvas and set all basic variables
 */
function setup() {
    createCanvas(640, 480);

    //Sets the current game state to title (which in turn will force a input event)
    changeState('title');
}

/**
 * Only calls state machine. State machine does heavy lifting.
 */
function draw() {
    stateMachine();
}


/**
 * Main state machine controller with all the different states. Will draw according to which state currently in.
 */
function stateMachine() {
    switch (state) {
        //The title state just draws the text 'It's Terminal by: Jeremy Dumont' and nothing else
        case 'title':
            push();
            background('#000000');
            textAlign(CENTER);
            textSize(50);
            textFont(terminalFont);
            fill('#40FD90');
            text("It's Terminal", 320, 230);
            push();
            textSize(25);
            text("Click to start", 320, 320);
            pop();
            pop();
            break;

        //Since the menu is just a terminal, this state only calls the menuTerminal draw function
        case 'menu':
            menuTerminal.drawTerminal();
            break;

        //The cooking game has a terminal and a clock element. We simply draw both here
        case 'cooking':
            cookingTerminal.drawTerminal();
            drawClock();
            break;

        //These remaining 2 cases have their own individual functions
        case 'rythym':
            rythymDraw();
            break;
        //This is the OFFICE gameb
        case 'fnaf':
            fnafDraw();
            break;
    }
}

/**
 * This function is called when ever the main game state needs to change. 
 * This makes sure the state is change correctly and start and end state functions can be called.
 */
function changeState(newState) {
    if (newState != state) {
        endState();
        state = newState;
        startState();
    }
}


/**
 * Calls end state functions for corresponding states.
 */
function endState() {
    switch (state) {
        //When switching out of the rythym game, we stop the rythym song.
        case 'rythym':
            rythymSong.stop();
            break;
    }
}

/**
 * Calls start state functions for corresponding states.
 */
function startState() {
    switch (state) {
        //All the states have a unique start function to keep things readable
        case 'menu':
            menuStart();
            return;
            break;
        case 'cooking':
            cookingStart();
            break;
        case 'rythym':
            rythymReset();
            break;
        //This is the OFFICE game
        case 'fnaf':
            fnafStart();
            break;
    }
}



/**
 * Calls the mouse pressed function uniquely based on which state currently in.
 */
function mousePressed() {
    switch (state) {
        //Switch to the menu when mouse is clicked on the menu
        case 'title':
            changeState('menu');
            break;

        //The OFFICE game 
        case 'fnaf':
            fnafMouseCheck();
            break;
    }

}

/**
 * Calls the mouse pressed function uniquely based on which state currently in.
 */
function keyPressed() {
    switch (state) {
        case 'title':
            changeState('menu');
            break;
        case 'menu':
            menuTerminal.keyCheck();
            break;
        case 'cooking':
            cookingTerminal.keyCheck();
            break;
        case 'fnaf':
            fnafKeyCheck();
            break;
        case 'rythym':
            rythymKeyPress();
            break;
    }
}

/**
 * Clears whats currently on the menu terminal and prints an introduction text when the menu is loaded
 */
function menuStart() {
    menuTerminal.reset();
    menuTerminal.print("   Welcome to the Menu   ");
    menuTerminal.print("     Available Games:");
    menuTerminal.print("COOKING - Turn based cooking simulator");
    menuTerminal.print("RYTHYM - Timing based dungeon crawler");
    menuTerminal.print("OFFICE - FNAF inspired game");
}