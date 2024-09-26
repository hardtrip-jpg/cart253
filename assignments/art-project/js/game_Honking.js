/**
 * Museum of Housing
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 */

"use strict";

class Honk extends Base {


    interactables = [new BumperHonk(100, 300, 100, 100), new Radiohonk(500, 300, 100, 100)];
    collision_array = [this.interactables[0], this.interactables[1]]



    game_setup() {

    };

    game_draw() {

        background("#FFFF00");
        text("honk", 320, 240);

        super.game_draw();
    };

    game_mousePressed() {
        for (let i = 0; i < this.interactables.length; i++) {
            let loc_x = this.interactables[i].location_x
            let loc_y = this.interactables[i].location_y
            let wid = this.interactables[i].size_x
            let hei = this.interactables[i].size_y
            //check mouse location to current collision
            if (
                (mouseX > loc_x && mouseX < (loc_x + wid))
                &&
                (mouseY > loc_y && mouseY < (loc_y + hei))
            ) {
                this.interactables[i].do()
            }
        }

    };


}

class InteractableHonk extends Collision {

    do() {
    }

}

class BumperHonk extends InteractableHonk {
    do() {
        console.log("Bumper")
    }
}

class Radiohonk extends InteractableHonk {
    do() {
        console.log("Radio")
    }
}