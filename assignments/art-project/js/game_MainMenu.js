/**
 * Museum of Housing - Menu
 * Jeremy Dumont
 * 
 * The entrance screen to the museum.
 */

"use strict";

/**
 * Define menu class
 */
class MainMenu extends Base {

    //define level buttons
    collision_1 = new LevelButton(265, 100, 100, 100, 1)
    collision_2 = new LevelButton(200, 230, 100, 100, 2)
    collision_3 = new LevelButton(330, 230, 100, 100, 3)

    //define button holder
    collision_array = [this.collision_1, this.collision_2, this.collision_3]

    /**
     * Load up all the required resources
     */
    game_preload() {
        super.game_preload()
        this.bg_sound = loadSound('assets/sounds/menu.ogg');
        this.collision_1.img = loadImage('assets/images/menu_icon_fence.png');
        this.collision_2.img = loadImage('assets/images/menu_icon_yard.png');
        this.collision_3.img = loadImage('assets/images/menu_icon_honk.png');
        this.bg_image = loadImage('assets/images/menu_bg.jpg');
    }

    /**
     * Stop current audio, play this levels background audio
     */
    game_setup() {
        main_audio.stop();
        main_audio = this.bg_sound;
        main_audio.loop();

    }

    /**
    * Draw background and draw the buttons
    */
    game_draw() {
        image(this.bg_image, 320, 240);

        super.game_draw();

    }


    /**
     * When mouse click, check if hovering over button
     */
    game_mousePressed() {
        super.game_mousePressed();
    }


}

