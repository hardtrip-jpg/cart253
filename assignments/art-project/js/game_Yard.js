/**
 * Museum of Housing Yard
 * Jeremy Dumont
 * 
 * Clean up your yard. Kill all the wildlife and become normal.
 */

"use strict";

//define menu class
class Yard extends Base {

    //define level button collisions
    collision_1 = new LevelButton(10, 10, 100, 100, 0)
    collision_array = [this.collision_1]

    //define yard objects
    object_1 = new YardObject(250, 250, 100, 100)
    object_2 = new YardObject(400, 300, 100, 100)
    yard_objects = [this.object_1, this.object_2,]

    game_preload(){
        super.game_preload();
        this.collision_1.img = this.back_button;
    }

    game_setup() {
        for (let i = 0; i < this.yard_objects.length; i++) {
            this.yard_objects[i].cleaned_up = false;
        }
    }

    //draw basic background and text
    game_draw() {
        background("#00FF00");
        text("yard", 320, 240);

        super.game_draw();

        for (let i = 0; i < this.yard_objects.length; i++) {
            if (this.yard_objects[i].cleaned_up == false) {
                let col = this.yard_objects[i].collision

                push();
                fill("000000");
                rect(col.location_x, col.location_y, col.size_x, col.size_y);
                pop();
            }

        }

    }

    //if mouse pressed, check if over collision location and act accordingly

    game_mousePressed() {
        super.game_mousePressed();

        let current_length = this.yard_objects.length;
        let check_cleaned = 0;
        for (let i = 0; i < current_length; i++) {
            if (
                check_collisions(this.yard_objects[i].collision)
            ) {
                this.yard_objects[i].cleaned_up = true;
            }

            if (this.yard_objects[i].cleaned_up) {
                check_cleaned++;
            }

            if (check_cleaned >= current_length) {
                console.log("All clean")
            }
        }




    }
}

class YardObject {

    constructor(pos_x, pos_y, size_x, size_y) {
        this.collision = new Collision(pos_x, pos_y, size_x, size_y)
    };

    cleaned_up = false;
}


