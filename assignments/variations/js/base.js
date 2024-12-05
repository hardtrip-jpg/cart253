/**
 * Base Varitions script
 * by: Jeremy Dumont
 * 
 * This is base script I've implemented in many projects. It comes with a very simple collision and button system that are easily configurable.
 * Additionaly, I like to stick any variables that get referenced in future scripts here such as preloaded assets.
 */
"use strict";


/**
 * This function is a constructor for collision objects. When created, collision objects simply define a position on the screen.
 */
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
class Button {

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






/**
 * This section of the script defines all the assets used in the game.
 */

let terminalFont;

let rythymSong;


//All of these are images for the OFFICE game
let fnafBackground;

let mid_open;
let mid_closed;
let mid_enemy;

let left_open;
let left_closed;
let left_enemy;

let right_open;
let right_closed;
let right_enemy;

let look_up;
let look_down;


/**
 * Preloads all assets so they can immediatly be called later on.
 */
function preload() {
    terminalFont = loadFont("assets/fonts/_decterm.otf");

    rythymSong = loadSound("assets/sounds/houseofwxloop.ogg");
    rythymSong.playMode('restart');

    fnafBackground = loadImage("assets/images/door_open.png");
    mid_open = loadImage("assets/images/pngs/mid_open.png");
    mid_closed = loadImage("assets/images/pngs/mid_closed.png");
    mid_enemy = loadImage("assets/images/pngs/mid_enemy.png");
    left_open = loadImage("assets/images/pngs/left_open.png");
    left_closed = loadImage("assets/images/pngs/left_closed.png");
    left_enemy = loadImage("assets/images/pngs/left_enemy.png");
    right_open = loadImage("assets/images/pngs/right_open.png");
    right_closed = loadImage("assets/images/pngs/right_closed.png");
    right_enemy = loadImage("assets/images/pngs/right_enemy.png");

    look_up = loadImage("assets/images/look_up_gif.gif");
    look_down = loadImage("assets/images/look_down_gif.gif");


};