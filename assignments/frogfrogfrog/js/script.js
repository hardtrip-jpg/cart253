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

    // Give the fly its first random position
    resetFly(flyHolder[0]);

    // Makes sure game is on frog screen at the start
    changeState('Tounge');

    // Sets upgrades to their base values
    resetUpgrades();

    textFont(mainFont);
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
        // This draws the main gameplay with the frog, flies, and tounge.
        case 'Tounge':
            toungeDraw();
            break;
        // This draws the main shop screen with buttons and all.
        case 'Shop':
            shopDraw();
            break;
        // This draws the main win screen when the win upgrade is purchased.
        case 'Win':
            winDraw();
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
        case 'Tounge':
            return;
            break;
        case 'Shop':
            return;
            break;
        case 'Win':
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
        case 'Tounge':
            return;
            break;
        case 'Shop':
            shopStart();
            break;
        case 'Menu':
            return;
            break;
        case 'Win':
            return;
            break;
    }
}



/**
 * Calles the mouse pressed function uniquely based on which state currently in.
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

