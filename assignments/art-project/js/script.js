/**
 * Museum of Housing - Main
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 * 
 * This script runs the global logic for the game.
 */

"use strict";

/**
 * Master level selection properties
*/
let level_select = [
    new MainMenu,
    new Eyes,
    new Yard,
    new Honk,
]
let current_level = 0;

let main_audio;


function preload() {
    main_audio = loadSound('assets/sounds/menu.ogg');
    for (let i = 0; i < level_select.length; i++) {
        level_select[i].game_preload();
    }

}

/**
 * Creats basic canvas
*/
function setup() {
    createCanvas(640, 480);
}


/**
 * Calls current levels draw function
*/
function draw() {
    level_select[current_level].game_draw()

}

/**
 * Calls current levels mouse_pressed function
*/
function mousePressed() {
    level_select[current_level].game_mousePressed()
}


/**
 * Changes current level and calls new level setup function
*/
function go_to(levelID) {
    current_level = levelID
    level_select[current_level].game_setup()
}

/**
 * Debug setting to see and hide collisions
 */
function keyPressed() {

    if (key === 'c') {
        level_select[current_level].show_collisions = !level_select[current_level].show_collisions
    }
}
