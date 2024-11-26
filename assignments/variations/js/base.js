/**
 * Base FrogFrogFrog script
 * by: Jeremy Dumont
 * 
 * This script defines the basic most reused components including collisions, buttons, and inventory. Additionaly, this script defines and preloads the assets used in the game.
 */
"use strict";


// This function is a constructor for collision objects. When created, collision objects simply define a position on the screen.
function collision(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}


/** This class defines button objects. 
 * Buttons hold a collision object and a function to compare mouse position to the collision object.
 * When constructed, buttons are given a unique anonymous function that gets used when button is activated.
*/

class button {

    //This constructor recieves a creates a new collision object and recieves a new anonymous function that is later used.
    constructor(x, y, width, height, notify) {
        this.col = new collision(x, y, width, height)

        //This is specifically used to hold a function
        this.notify = notify;
    }

    //Compares current mouse position to buttons collision object. If true, returns true and calls previously defined functon.
    checkMouseCollision() {
        if (
            (mouseX > this.col.x && mouseX < (this.col.x + this.col.width))
            &&
            (mouseY > this.col.y && mouseY < (this.col.y + this.col.height))
        ) {
            this.notify();
            return true;
        }
        else {
            return false;
        }
    }
}


let state;



/**
 * This section of the script defines all the assets used in the game.
 */


function preload() {

};