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
    tree_object = new YardObject(30, 40, 233, 420, 1);
    bush_1_object = new YardObject(200, 200, 150, 153, 4);
    bush_2_object = new YardObject(80, 330, 120, 85, 7);
    bush_3_object = new YardObject(290, 300, 400, 131, 6);
    bush_front_object = new YardObject(1, 1, 640, 480, 0.01);
    monkey_object = new YardObject(260, 260, 75, 75, 6);
    squirel_object = new YardObject(500, 260, 50, 53, 5);
    
    yard_objects = [this.monkey_object, this.squirel_object, this.bush_1_object, this.bush_2_object, this.bush_3_object, this.tree_object, this.bush_front_object];

    game_preload(){
        super.game_preload();
        this.collision_1.img = this.back_button;
        this.yard_sky_img = loadImage('assets/images/yard-sky.jpg');
        this.yard_img = loadImage('assets/images/yard.png');
        this.bush_1_object.img = loadImage('assets/images/yard_objects/bush_1.png');
        this.bush_2_object.img = loadImage('assets/images/yard_objects/bush_2.png');
        this.bush_3_object.img = loadImage('assets/images/yard_objects/bush_3.png');
        this.tree_object.img = loadImage('assets/images/yard_objects/tree.png');
        this.squirel_object.img = loadImage('assets/images/yard_objects/squirel.png');
        this.monkey_object.img = loadImage('assets/images/yard_objects/monkey.png');
        this.bush_front_object.img = loadImage('assets/images/yard_objects/bush_front.png')
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
        image(this.yard_img, 320, this.bg_position[1]);
        push();
        imageMode(CORNER);
        for (let i = 0; i < this.yard_objects.length; i++) {
            if (this.yard_objects[i].cleaned_up == false) {
                let col = this.yard_objects[i].collision

                push();
                fill("000000");
                let new_pos = get_3D_effect(col.location_x, col.location_y, this.yard_objects[i].weight)
                if (this.yard_objects[i].img){
                    image(this.yard_objects[i].img, col.location_x, new_pos[1])
                }
                else{
                    rect(col.location_x, new_pos[1], col.size_x, col.size_y);
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
        let col_clicked = false;
        for (let i = current_length - 1; i > -1; i--) {
            console.log(i)
            

            if (this.yard_objects[i].cleaned_up) {
                check_cleaned++;
            }
            else if (
                !col_clicked && check_collisions(this.yard_objects[i].collision)
            ) {
                this.yard_objects[i].cleaned_up = true;
                check_cleaned++;
                col_clicked = true;
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


