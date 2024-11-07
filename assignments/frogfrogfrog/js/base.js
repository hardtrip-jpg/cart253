
"use strict";

function collision(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

class button {

    constructor(x, y, width, height, notify) {
        this.col = new collision(x, y, width, height)
        this.notify = notify;
    }


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

class baseValueInventory {
    money = 0;
    toungeSpeed = 2;
    flySpeed = 1;
    flyAmount = 1;
    cannotPass = true;
}

let curInventory = new baseValueInventory;

let state;

let backgroundImage;
let frogheadImage;
let shopImage;
let exitImage;
let flyImage;
let cartImage;

let winImage;

let mainFont;
let shopFont;

function preload() {
    backgroundImage = loadImage("assets/images/swamp.png");
    frogheadImage = loadImage("assets/images/frog_head.png");
    shopImage = loadImage("assets/images/shop-sign.png");
    exitImage = loadImage("assets/images/xbutton.png");
    flyImage = loadImage("assets/images/fly.png");
    cartImage = loadImage("assets/images/cart.png");

    winImage = loadImage("assets/images/giphy-562340133.gif");

    mainFont = loadFont("assets/fonts/AlteHaasGroteskRegular.ttf");
    shopFont = loadFont("assets/fonts/Eastwood.ttf");



};