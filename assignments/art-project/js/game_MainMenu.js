/**
 * Museum of Housing MENU SCREEN
 * Jeremy Dumont
 * 
 * The entrance screen to the museum.
 */

"use strict";

//define menu class
class MainMenu extends Base {

    //define collisions
    collision_1 = new LevelButton(265, 100, 100, 100, 1)
    collision_2 = new LevelButton(200, 230, 100, 100, 2)
    collision_3 = new LevelButton(330, 230, 100, 100, 3)

    collision_array = [this.collision_1, this.collision_2, this.collision_3]

    game_preload(){
        super.game_preload()
        this.bg_sound = loadSound('assets/sounds/menu.ogg');
        this.collision_1.img = loadImage('assets/images/menu_icon_fence.png');
        this.collision_2.img = loadImage('assets/images/menu_icon_yard.png');
        this.collision_3.img = loadImage('assets/images/menu_icon_honk.png');
        this.bg_image = loadImage('assets/images/menu_bg.jpg');
    }

    game_setup(){
        main_audio.stop();
        main_audio = this.bg_sound;
        main_audio.loop();
        
    }

    //draw basic background and text
    game_draw() {
        //background("#FFFF00");
        //text("museum of housing: by jeremy dumont", 200, 400);
        image(this.bg_image, 320, 240);

        super.game_draw();

    }

    //if mouse pressed, check if over collision location and act accordingly

    game_mousePressed() {
        super.game_mousePressed();
    }


}

