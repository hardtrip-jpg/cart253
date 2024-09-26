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

    game_setup() {
        for (let i = 0; i < this.yard_objects.length; i++) {
            this.yard_objects[i].cleaned_up = false;
        }
    }

    //draw basic background and text
    game_draw() {
        background("#FFFF00");
        text("yard", 320, 240);

        super.game_draw();

        for (let i = 0; i < this.yard_objects.length; i++) {
            if (this.yard_objects[i].cleaned_up == false) {
                let loc_x = this.yard_objects[i].collision.location_x
                let loc_y = this.yard_objects[i].collision.location_y
                let wid = this.yard_objects[i].collision.size_x
                let hei = this.yard_objects[i].collision.size_y

                push();
                fill("000000");
                rect(loc_x, loc_y, wid, hei);
                pop();
            }

        }

    }

    //if mouse pressed, check if over collision location and act accordingly

    game_mousePressed() {
        for (let i = 0; i < this.collision_array.length; i++) {
            //grab properties from current collision
            let loc_x = this.collision_array[i].location_x
            let loc_y = this.collision_array[i].location_y
            let wid = this.collision_array[i].size_x
            let hei = this.collision_array[i].size_x
            //check mouse location to current collision
            if (
                (mouseX > loc_x && mouseX < (loc_x + wid))
                &&
                (mouseY > loc_y && mouseY < (loc_y + hei))
            ) {
                go_to(this.collision_array[i].levelID)
            }
        }

        let current_length = this.yard_objects.length;
        let check_cleaned = 0;
        for (let i = 0; i < current_length; i++) {
            //grab properties from current collision
            let loc_x = this.yard_objects[i].collision.location_x
            let loc_y = this.yard_objects[i].collision.location_y
            let wid = this.yard_objects[i].collision.size_x
            let hei = this.yard_objects[i].collision.size_x
            //check mouse location to current collision
            if (
                (mouseX > loc_x && mouseX < (loc_x + wid))
                &&
                (mouseY > loc_y && mouseY < (loc_y + hei))
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


