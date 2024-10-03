/**
 * Museum of Housing
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 */

"use strict";

class Honk extends Base {

    collision_1 = new LevelButton(10, 10, 100, 100, 0);

    interactables = [new Interactable(100, 300, 100, 100, 1), new Interactable(340, 260, 100, 60, 2)];

    collision_array = [this.collision_1];


    game_preload(){
        super.game_preload();
        this.collision_1.img = this.back_button;
        this.interior = loadImage('assets/images/honk_car_interior.png');
        this.exterior_1 = loadImage('assets/images/honk_exterior_1.jpg');

        this.bg_sound = loadSound('assets/sounds/honk_ambience.ogg');
        this.radio_sound = loadSound('assets/sounds/honk_music.ogg');
        this.honk_sound = loadSound('assets/sounds/honk.ogg');
        this.shutup_sound = loadSound('assets/sounds/honk_shutup.ogg');
        };

    game_setup() {
        main_audio.stop();
        main_audio = this.bg_sound
        main_audio.loop();
    };

    game_draw() {

        background("#0000FF");
        text("honk", 320, 240);

        let exterior_pos = get_3D_effect(320,240,1);
        let interior_pos = get_3D_effect(320,240,3);

        image(this.exterior_1, exterior_pos[0], exterior_pos[1]);
        image(this.interior,interior_pos[0],interior_pos[1]);

        super.game_draw();

        if (this.show_collisions) {
            for (let i = 0; i < this.interactables.length; i++) {
                push()
               rect(this.interactables[i].collision.location_x, this.interactables[i].collision.location_y, this.interactables[i].collision.size_x, this.interactables[i].collision.size_y)
               pop()
            }
       }


    };

    game_mousePressed() {
        super.game_mousePressed();

        for (let i = 0; i < this.interactables.length; i++) {
            //check mouse location to current collision
            if (
                check_collisions(this.interactables[i].collision)
            ) {
                switch (this.interactables[i].id){
                    case 1:
                        this.honk_sound.stop();
                        this.honk_sound.play();
                        if(Math.floor(Math.random() * 10) > 8){
                            main_audio.stop();
                            this.radio_sound.stop();
                            main_audio = this.shutup_sound
                            main_audio.play();
                        }
                        break;
                    case 2:
                        if (this.radio_sound.isPlaying()){
                            this.radio_sound.stop();
                        }
                        else{
                            this.radio_sound.loop();
                        }
                        break;
                }
            }
                
        }
    };
};



class Interactable {
    constructor(location_x, location_y, size_x, size_y, id) {
        this.collision = new Collision(location_x,location_y,size_x,size_y);
        this.id = id;
    }
};
