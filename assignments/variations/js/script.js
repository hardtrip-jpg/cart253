/**
 * Frogfrogfrog
 * Jeremy Dumont
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies and gain money
 * - Click the shop icon to access shop
 * - Buy upgrades to increase speed and efficiancy of fly catching
 * - Save up and maybe you can unlock the mysterious 450$ upgrade?
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";



/**
 * Creates the canvas and set all basic variables
 */
function setup() {
    createCanvas(640, 480);

    changeState('test');
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
        
        case 'test':
            background("#000000")
            fill("#40FD90");
            textSize(25);
            textFont(terminalFont);

            let currentHeight = 490;
            for (let i = all_commands.length + 1; i > -1; i--){
                text((all_commands[i]), 10, currentHeight);
                currentHeight -= 30;
            }

            text((test_string), 10, 470);
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
        case 'test':
            break;
    }

}

let test_string = "";
let all_commands = [];

function keyTyped() {
    if (key.length === 1){
        test_string += key;
    }

    if (keyCode === ENTER){
        all_commands.push(test_string);
        if (all_commands.length > 15){
            all_commands.shift()
        }
        test_string = "";
    }

    if (keyCode === DELETE || keyCode === BACKSPACE){
        test_string = test_string.slice(0, -1);
    }

    console.log(all_commands);
    
}