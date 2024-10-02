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
    collision_1 = new LevelButton(10, 10, 100, 100, 0);
    collision_array = [this.collision_1];

    //define yard objects
    object_1 = new YardObject(250, 250, 100, 100, 3);
    object_2 = new YardObject(400, 300, 100, 100, 3);
    tree_object = new YardObject(30, 40, 233, 420, 1);
    yard_objects = [this.object_1, this.object_2, this.tree_object];

    game_preload(){
        super.game_preload();
        this.collision_1.img = this.back_button;
        this.yard_sky_img = loadImage('assets/images/yard-sky.jpg');
        this.yard_img = loadImage('assets/images/yard.png');
        this.bush_1_img = loadImage('assets/images/yard_objects/bush_1.png');
        this.bush_2_img = loadImage('assets/images/yard_objects/bush_2.png');
        this.bush_3_img = loadImage('assets/images/yard_objects/bush_3.png');
        this.tree_object.img = loadImage('assets/images/yard_objects/tree.png');
        this.squirel_img = loadImage('assets/images/yard_objects/squirel.png');
        this.monkey_img = loadImage('assets/images/yard_objects/monkey.png');
    }
    

    game_setup() {
        for (let i = 0; i < this.yard_objects.length; i++) {
            this.yard_objects[i].cleaned_up = false;
        }
    }

    //draw basic background and text
    game_draw() {
        image(this.yard_sky_img, 320, 240);
        text("yard", 320, 240);

        super.game_draw();

        this.bg_position = get_3D_effect(320, 240, 5);
        image(this.yard_img, this.bg_position[0], this.bg_position[1]);
        push();
        imageMode(CORNER);
        for (let i = 0; i < this.yard_objects.length; i++) {
            if (this.yard_objects[i].cleaned_up == false) {
                let col = this.yard_objects[i].collision

                push();
                fill("000000");
                let new_pos = get_3D_effect(col.location_x, col.location_y, this.yard_objects[i].weight)
                if (this.yard_objects[i].img){
                    image(this.yard_objects[i].img, new_pos[0], new_pos[1])
                }
                else{
                    rect(new_pos[0], new_pos[1], col.size_x, col.size_y);
                }
                pop();
            }

        }
        pop();

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
                i = current_length;
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

    constructor(pos_x, pos_y, size_x, size_y, weight) {
        this.collision = new Collision(pos_x, pos_y, size_x, size_y)
        this.weight = weight;
        this.img
        this.sound
    };

    cleaned_up = false;
}


