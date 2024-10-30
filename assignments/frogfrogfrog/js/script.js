/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";



/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly(flyHolder[0]);

    changeState('Tounge');
    curInventory.money = 5000;
    resetUpgrades()
}

function draw() {
    stateMachine();
}


/**
 * Main state machine controller with all the different states
 */
function stateMachine() {
    switch (state) {
        case 'Tounge':
            toungeDraw();
            break;
        case 'Shop':
            shopDraw();
            break;
        case 'Menu':
            return;
            break;
    }
}

function changeState(newState) {
    if (newState != state) {
        endState();
        state = newState;
        startState();
    }
}

function endState() {
    console.log("End: " + state);
    switch (state) {
        case 'Tounge':
            return;
            break;
        case 'Shop':
            return;
            break;
        case 'Menu':
            return;
            break;
    }
}

function startState() {
    console.log("Start: " + state);
    switch (state) {
        case 'Tounge':
            return;
            break;
        case 'Shop':
            shopStart();
            break;
        case 'Menu':
            return;
            break;
    }
}



/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    switch (state) {
        case 'Tounge':
            toungeMousePress();
            break;
        case 'Shop':
            shopMousePress();
            break;
        case 'Menu':
            return;
            break;
    }

}

