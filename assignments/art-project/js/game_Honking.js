/**
 * Museum of Housing - Honk
 * Jeremy Dumont
 * 
 * Stuck in traffic, you can either honk at your traffic neighbors or turn on and off the radio.
 */

"use strict";

/**
 * Defines Honk level
 */
class Honk extends Base {

    //defines back button
    collision_1 = new LevelButton(10, 10, 100, 100, 0);

    //defines honk and radio interactables plus holder
    interactables = [new Interactable(100, 300, 100, 100, 1), new Interactable(340, 260, 100, 60, 2)];

    //holder for back button
    collision_array = [this.collision_1];

    /**
     * Preload all required resources
     */
    game_preload() {
        super.game_preload();
        //load images
        this.collision_1.img = this.back_button;
        this.interior = loadImage('assets/images/honk_car_interior.png');
        this.exterior_1 = loadImage('assets/images/honk_exterior_1.jpg');

        //load sounds
        this.bg_sound = loadSound('assets/sounds/honk_ambience.ogg');
        this.radio_sound = loadSound('assets/sounds/honk_music.ogg');
        this.honk_sound = loadSound('assets/sounds/honk.ogg');
        this.shutup_sound = loadSound('assets/sounds/honk_shutup.ogg');
    };

    /**
    * Stop current audio, play this levels background audio
    */
    game_setup() {
        main_audio.stop();
        main_audio = this.bg_sound
        main_audio.loop();
    };

    /**
     * Draws car interior and exterior
     */
    game_draw() {

        //get parallax position for interior and exterior
        let exterior_pos = get_3D_effect(320, 240, 1);
        let interior_pos = get_3D_effect(320, 240, 3);

        //draw interior and exterior
        image(this.exterior_1, exterior_pos[0], exterior_pos[1]);
        image(this.interior, interior_pos[0], interior_pos[1]);

        //draw debug collisions if debug enabled
        super.game_draw();
        if (this.show_collisions) {
            for (let i = 0; i < this.interactables.length; i++) {
                push()
                rect(this.interactables[i].collision.location_x, this.interactables[i].collision.location_y, this.interactables[i].collision.size_x, this.interactables[i].collision.size_y)
                pop()
            }
        }


    };

    /**
     * Check if clicked on interactables. If so, play sounds accordingly (with some minor logic)
     */
    game_mousePressed() {
        super.game_mousePressed();

        //cycle through all interactables
        for (let i = 0; i < this.interactables.length; i++) {
            //check mouse location to current collision
            if (
                check_collisions(this.interactables[i].collision)
            ) {
                //play sounds based on interactable id
                switch (this.interactables[i].id) {
                    //HONK
                    case 1:
                        this.honk_sound.stop();
                        this.honk_sound.play();

                        //when clicked, randomly determine if the spooky honk sound plays
                        if (Math.floor(Math.random() * 10) > 8) {
                            main_audio.stop();
                            this.radio_sound.stop();
                            main_audio = this.shutup_sound
                            main_audio.play();
                        }
                        break;
                    //RADIO
                    case 2:
                        if (this.radio_sound.isPlaying()) {
                            this.radio_sound.stop();
                        }
                        else {
                            this.radio_sound.loop();
                        }
                        break;
                }
            }

        }
    };
};


/**
 * Defines interactable class (basically a collision with an id)
 */
class Interactable {
    constructor(location_x, location_y, size_x, size_y, id) {
        this.collision = new Collision(location_x, location_y, size_x, size_y);
        this.id = id;
    }
};
