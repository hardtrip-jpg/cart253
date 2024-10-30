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

function collision(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

class button{

    constructor(x, y, width, height, notify) {
        this.col = new collision(x,y,width,height)
        this.notify = notify;
    }


    checkMouseCollision(){
        if (
            (mouseX > this.col.x && mouseX < (this.col.x + this.col.width))
            &&
            (mouseY > this.col.y && mouseY < (this.col.y + this.col.height))
        ) {
            this.notify();
            return true;
        }
        else{
            return false;
        }
    }
}

let state;

//tounge
// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};
// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

const shopButton = new button(15,15,50,50,() => {
    changeState('Shop');
});
let toungeStateButtons = [shopButton,]

//shop
const exitShopButton = new button(15,15,50,50,() => {
    changeState('Tounge');
})

let shopStateButtons = [exitShopButton,]



let money = 0;
let rebirths = 0;




/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();

    changeState('Tounge');
}

function draw() {
    stateMachine();
}


/**
 * Main state machine controller with all the different states
 */
function stateMachine(){
    console.log(state);
    switch (state){
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

function changeState(newState){
    if (newState != state){
        endState();
        state = newState;
        startState();
    }
}

function endState(){
    console.log("end for " + state);
    switch (state){
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

function startState(){
    console.log("start for " + state);
    switch (state){
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
    switch (state){
        case 'Tounge':
            toungMousePress();
            break;
        case 'Shop':
            shopMousePress();
            break;
        case 'Menu':
            return;
            break;
    }

}

