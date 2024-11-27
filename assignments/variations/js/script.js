/**
 * It's Terminal
 * Jeremy Dumont
 * 
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";


let test_terminal = new Terminal
/**
 * Creates the canvas and set all basic variables
 */
function setup() {
    createCanvas(640, 480);

    changeState('menu');
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
        case 'menu':
            background('#FF00FF');
            break;
        
        case 'test':
            test_terminal.drawTerminal();
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
        case 'test':
            return;
            break;
    }
}

/**
 * Calls start state functions for corresponding states.
 */
function startState() {
    console.log("Start: " + state);
    switch (state) {
        case 'test':
            return;
            break;
    }
}



/**
 * Calles the mouse pressed function uniquely based on which state currently in.
 */
function mousePressed() {
    switch (state) {
        case 'menu':
            changeState('test')
        case 'test':
            break;
    }

}

function keyPressed(){
    switch (state) {
        case 'menu':
            changeState('test');
        case 'test':
            test_terminal.keyCheck();
            break;
    }
}