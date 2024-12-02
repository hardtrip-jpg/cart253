/**
 * It's Terminal
 * Jeremy Dumont
 * 
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let state;

let menuTerminal = new Terminal(
    (commands) => {
        let first_word = commands[0];

        switch (first_word) {
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
        case 'title':
            push();
            background('#FFFFFF');
            textAlign(CENTER);
            textSize(50);
            text("It's Terminal", 320, 230);
            push();
            textSize(25);
            text("Click to start", 320, 320);
            pop();
            pop();
            break;

        case 'menu':
            menuTerminal.drawTerminal();
            break;

        case 'cooking':
            cookingTerminal.drawTerminal();
            drawClock();
            break;

        case 'rythym':
            rythymDraw();
            break;

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
    console.log("End: " + state);
    switch (state) {
        case 'menu':
            return;
            break;
        case 'rythym':
            console.log('test');
            rythymSong.stop();
            // rythymEnd();
            break;
    }
}

/**
 * Calls start state functions for corresponding states.
 */
function startState() {
    console.log("Start: " + state);
    switch (state) {
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
        case 'fnaf':
            fnafStart();
            break;
    }
}



/**
 * Calles the mouse pressed function uniquely based on which state currently in.
 */
function mousePressed() {
    switch (state) {
        case 'title':
            changeState('menu');
            break;
        case 'fnaf':
            fnafMouseCheck();
            break;
    }

}

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

function menuStart() {
    menuTerminal.reset();
    menuTerminal.print("   Welcome to the Menu   ");
    menuTerminal.print("     Available Games:");
    menuTerminal.print("COOKING - Turn based cooking simulator");
    menuTerminal.print("RYTHYM - Timing based dungeon crawler");
    menuTerminal.print("OFFICE - FNAF inspired game");
}