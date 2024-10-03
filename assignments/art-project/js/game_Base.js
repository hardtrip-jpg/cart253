/**
 * Museum of Housing - Base
 * Jeremy Dumont
 * 
 * This script is used to define base functions that all games will use. Mainly for type safety and less code redunency.
 * 
 */

/**
 * Defines base class
 */
class Base {

    constructor() {

    };

    /**
     * Loads up ubiquitous sound and image
     */
    game_preload() {
        soundFormats('ogg');
        this.back_button = loadImage('assets/images/back-arrow.png');
        this.button_sound = loadSound('assets/sounds/button.ogg');
    };

    game_setup() {

    };

    /**
     * Draws images attributed to collisions && Draws debug collisions if enabled
     */
    game_draw() {
        imageMode(CORNER);
        //cycle through collisions array
        for (let i = 0; i < this.collision_array.length; i++) {
            //draw debug collisions if enabled
            if (this.show_collisions) {
                push();
                fill("#000000");
                rect(this.collision_array[i].location_x, this.collision_array[i].location_y, this.collision_array[i].size_x, this.collision_array[i].size_y);
                pop();
            }
            //draw collision images if collision has an image
            if (this.collision_array[i].img) {
                image(this.collision_array[i].img, this.collision_array[i].location_x, this.collision_array[i].location_y)
            }
        }
        imageMode(CENTER);
    };

    /**
     * Check if mouse pressed level button. If so go to the level id.
     */
    game_mousePressed() {

        for (let i = 0; i < this.collision_array.length; i++) {
            if (
                check_collisions(this.collision_array[i])
            ) {
                go_to(this.collision_array[i].levelID);
                this.button_sound.play();
            }
        }

    };

    collision_array = [];

    show_collisions = false;
}

/** 
 * Defines base collision class.
 */
class Collision {

    constructor(location_x, location_y, size_x, size_y) {
        this.location_x = location_x;
        this.location_y = location_y;
        this.size_x = size_x;
        this.size_y = size_y;
    }
}

/**
 * Define level button by adding image and level id variables
 */
class LevelButton extends Collision {
    constructor(location_x, location_y, size_x, size_y, levelID, img) {
        super(location_x, location_y, size_x, size_y);
        this.levelID = levelID;
        this.img = img;
    }

}


/**
 * Base check collision function. Takes a collision and compares its position and size to mouse position.
 */
function check_collisions(col) {
    let loc_x = col.location_x
    let loc_y = col.location_y
    let wid = col.size_x
    let hei = col.size_y
    //check mouse location to current collision
    if (
        (mouseX > loc_x && mouseX < (loc_x + wid))
        &&
        (mouseY > loc_y && mouseY < (loc_y + hei))
    ) {
        return true;
    }
    else {
        return false;
    }

}

/**
 * Takes a position and weight, calculates a new 3d position based on mouse position
 */
function get_3D_effect(cur_x, cur_y, weight) {

    //create a normalized direction towards mouse
    let dir = createVector((mouseX - cur_x), (mouseY - cur_y))
    let dir_normed = p5.Vector.normalize(dir);

    //determine new position based on the weight and direction
    let new_x = cur_x - (((dir.x / cur_x) * weight))
    let new_y = cur_y - (((dir.y / cur_y) * weight))

    return [new_x, new_y]
}