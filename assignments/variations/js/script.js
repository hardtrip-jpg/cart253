/**
 * It's Terminal
 * Jeremy Dumont
 * 
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
            background("#000000");

            toDisplayCheck();

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
let toDisplay = [];
let bufferLength = 5;
let displayBuffer = bufferLength;


function keyTyped() {
    if (key.length === 1){
        test_string += key;
    }

    if (keyCode === ENTER){
        parseCommand(test_string);
        test_string = "";
    }

    if (keyCode === DELETE || keyCode === BACKSPACE){
        test_string = test_string.slice(0, -1);
    }
}

function printTerminalText(text){
    all_commands.push(text);

        if (all_commands.length > 15){
            all_commands.shift();
        }
}

function toDisplayCheck(){
    if (displayBuffer === bufferLength){
        if(toDisplay[0]){
            printTerminalText(toDisplay[0]);
            toDisplay.shift();
            bufferLength = 0;
        }
    }
    else(
        bufferLength++
    )

    
}

function parseCommand(text){
    if (text === ''){
        toDisplay.push("ERROR: ENTER VALID COMMAND");
        return;
    }

    
    toDisplay.push(text);
    let commands = text.toLowerCase().trim().split(/\s+/);
    //console.log(commands);
    let first_word = commands[0];

    switch (first_word){
        case 'hello':
            //toDisplay.push("");
            toDisplay.push("Well hello there my friend!");
            break;
        default:
            toDisplay.push("ERROR: " + first_word + " IS NOT A VALID COMMAND");
    }

}