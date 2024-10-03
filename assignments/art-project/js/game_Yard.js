/**
 * Museum of Housing - Yard
 * Jeremy Dumont
 * 
 * Clean up your yard. Kill all the wildlife and become normal.
 */

"use strict";

/**
 * Define Yard Class
 */
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
    //yard objects array
    yard_objects = [this.monkey_object, this.squirel_object, this.bush_1_object, this.bush_2_object, this.bush_3_object, this.tree_object, this.bush_front_object];


    /**
     * Load up all the required resources
     */
    game_preload() {
        //set back button
        super.game_preload();
        this.collision_1.img = this.back_button;

        //load the images for all the objects
        this.yard_sky_img = loadImage('assets/images/yard-sky.jpg');
        this.yard_img = loadImage('assets/images/yard.png');
        this.bush_1_object.img = loadImage('assets/images/yard_objects/bush_1.png');
        this.bush_2_object.img = loadImage('assets/images/yard_objects/bush_2.png');
        this.bush_3_object.img = loadImage('assets/images/yard_objects/bush_3.png');
        this.tree_object.img = loadImage('assets/images/yard_objects/tree.png');
        this.squirel_object.img = loadImage('assets/images/yard_objects/squirel.png');
        this.monkey_object.img = loadImage('assets/images/yard_objects/monkey.png');
        this.bush_front_object.img = loadImage('assets/images/yard_objects/bush_front.png')
        //load the sounds
        this.bush_front_object.sound = loadSound('assets/sounds/yard_bush_fx.ogg')
        this.bush_1_object.sound = loadSound('assets/sounds/yard_bush_fx.ogg');
        this.bush_2_object.sound = loadSound('assets/sounds/yard_bush_fx.ogg');
        this.bush_3_object.sound = loadSound('assets/sounds/yard_bush_fx.ogg');
        this.tree_object.sound = loadSound('assets/sounds/yard_wood.ogg');
        this.squirel_object.sound = loadSound('assets/sounds/yard_squirrel.ogg');
        this.monkey_object.sound = loadSound('assets/sounds/yard_monkey.ogg');
        this.bg_sound_1 = loadSound('assets/sounds/yard_ambience.ogg');
        this.bg_sound_2 = loadSound('assets/sounds/yard_music.ogg');
    }

    /**
     * Reset level to its init state & play level music
     */
    game_setup() {
        for (let i = 0; i < this.yard_objects.length; i++) {
            this.yard_objects[i].cleaned_up = false;
        }
        main_audio.stop();
        main_audio = this.bg_sound_1
        main_audio.loop();
    }

    /**
     * Draw the yard objects that havent been cleaned up and additional backgrounds
     */
    game_draw() {
        //BACKGROUND
        //sky image
        image(this.yard_sky_img, 320, 240);

        super.game_draw();

        //calculate fence and ground paralax and then draw fence and ground
        this.bg_position = get_3D_effect(320, 240, 5);
        image(this.yard_img, 320, this.bg_position[1]);

        //YARD OBJECTS
        //cycle through objects and draw them
        push();
        imageMode(CORNER);
        for (let i = 0; i < this.yard_objects.length; i++) {
            //check if object cleaned
            if (this.yard_objects[i].cleaned_up == false) {
                //hold current unclean objects collision info
                let col = this.yard_objects[i].collision

                push();
                fill("000000");

                //get paralax position for object
                let new_pos = get_3D_effect(col.location_x, col.location_y, this.yard_objects[i].weight)

                //if object has image, draw image. else, draw the collision.
                if (this.yard_objects[i].img) {
                    image(this.yard_objects[i].img, col.location_x, new_pos[1])
                }
                else {
                    rect(col.location_x, new_pos[1], col.size_x, col.size_y);
                }
                pop();
            }

        }
        pop();

    }


    /**
     * If mouse pressed, check if current mouse pos matches collisions
     */
    game_mousePressed() {
        super.game_mousePressed();

        //variables to see if all objects cleaned
        let current_length = this.yard_objects.length;
        let check_cleaned = 0;

        //variable to make sure we dont clean up more objects then 1 in loop
        let col_clicked = false;

        //cycle through all collision positions and react accordingly
        for (let i = current_length - 1; i > -1; i--) {

            //if object is already cleaned, add to check cleaned
            if (this.yard_objects[i].cleaned_up) {
                check_cleaned++;
            }
            //check if collision hasnt already been clicked. if not, check if mouse hovering current object
            else if (
                !col_clicked && check_collisions(this.yard_objects[i].collision)
            ) {
                //indicate site is cleaned & play objects appropriate sound
                this.yard_objects[i].cleaned_up = true;
                check_cleaned++;

                col_clicked = true;

                if (this.yard_objects[i].sound) {
                    this.yard_objects[i].sound.play();
                }
            }

            //if all objects clean, change background audio
            if (check_cleaned >= current_length) {
                main_audio.stop();
                main_audio = this.bg_sound_2;
                main_audio.loop();
            }
        }




    }
}

/**
 * YardObject constructs with collision and additional variables for game feel and looks
 */
class YardObject {

    constructor(pos_x, pos_y, size_x, size_y, weight) {
        this.collision = new Collision(pos_x, pos_y, size_x, size_y)
        this.weight = weight;
        this.img
        this.sound
    };

    cleaned_up = false;
}


