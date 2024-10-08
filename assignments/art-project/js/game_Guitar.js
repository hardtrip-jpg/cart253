/**
 * THIS SCRIPT IS DECRAPICATED
 * Jeremy Dumont
 * 
 * Guitar game was intended, but was out of scope.
 */

"use strict";



/**
 * Guitar level. Bezier curve that moves based on mouse.
*/
class Guitar extends Base {

    collision_1 = new LevelButton(10, 10, 100, 100, 0)

    collision_array = [this.collision_1]

    game_preload() {
        super.game_preload();
        this.collision_1.img = this.back_button;
    }

    game_draw() {
        background("#FF00FF");
        super.game_draw();

        push();
        noFill();
        stroke(0);
        strokeWeight(5);
        bezier(100, 100, mouseX, mouseY, mouseX, mouseY, 540, 380);
        pop();
    }
}