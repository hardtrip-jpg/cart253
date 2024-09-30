/**
 * Museum of Housing BASE SCRIPT
 * Jeremy Dumont
 * 
 * This script is used to define base functions that all games will use. Mainly for type safety and less code redunency.
 * 
 */

class Base {

    constructor() {

    };

    game_preload(){
        this.back_button = loadImage('assets/images/back-arrow.png');
    };

    game_setup() {

    };

    game_draw() {
        imageMode(CORNER);
        //debug show collisions option
            for (let i = 0; i < this.collision_array.length; i++) {
                if (this.show_collisions) {
                push();
                fill("#000000");
                rect(this.collision_array[i].location_x, this.collision_array[i].location_y, this.collision_array[i].size_x, this.collision_array[i].size_y);
                pop();
                }
                if (this.collision_array[i].img){
                    image(this.collision_array[i].img, this.collision_array[i].location_x, this.collision_array[i].location_y)
                }
            }
        imageMode(CENTER);
    };

    game_mousePressed() {

        for (let i = 0; i < this.collision_array.length; i++) {
            if (
                check_collisions(this.collision_array[i])
            ) {
                go_to(this.collision_array[i].levelID)
            }
        }

    };

    collision_array = [];

    show_collisions = false;
}

class Collision {

    constructor(location_x, location_y, size_x, size_y) {
        this.location_x = location_x;
        this.location_y = location_y;
        this.size_x = size_x;
        this.size_y = size_y;
    }
}

class LevelButton extends Collision {
    constructor(location_x, location_y, size_x, size_y, levelID, img) {
        super(location_x, location_y, size_x, size_y);
        this.levelID = levelID;
        this.img = img;
    }

}

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
        console.log("true");
    }
    else {
        return false;
        console.log("false");
    }

}