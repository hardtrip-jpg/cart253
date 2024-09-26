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
    collision_1 = new LevelButton(10, 10, 100, 100, 1)
    collision_2 = new LevelButton(200, 200, 100, 100, 2)
    collision_3 = new LevelButton(400, 400, 100, 100, 3)

    collision_array = [this.collision_1, this.collision_2, this.collision_3]

    //draw basic background and text
    game_draw() {
        background("#FFFF00");
        text("main menu", 320, 240);

        super.game_draw();

    }

    //if mouse pressed, check if over collision location and act accordingly

    game_mousePressed() {
        for (let i = 0; i < this.collision_array.length; i++) {
            if (
                check_collisions(this.collision_array[i])
            ) {
                console.log("clicked collision")
                go_to(this.collision_array[i].levelID)
            }
        }
    }



}

