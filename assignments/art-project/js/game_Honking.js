/**
 * Museum of Housing
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 */

"use strict";

class Honk extends Base {

    collision_1 = new LevelButton(10, 10, 100, 100, 0)

    interactables = [new BumperHonk(100, 300, 100, 100), new Radiohonk(500, 300, 100, 100)];

    collision_array = [this.collision_1]




    game_setup() {

    };

    game_draw() {

        background("#0000FF");
        text("honk", 320, 240);

        super.game_draw();

        if (this.show_collisions) {
            for (let i = 0; i < this.interactables.length; i++) {
                push()
                rect(this.interactables[i].location_x, this.interactables[i].location_y, this.interactables[i].size_x, this.interactables[i].size_y)
                pop()
            }
        }


    };

    game_mousePressed() {
        super.game_mousePressed();

        for (let i = 0; i < this.interactables.length; i++) {
            //check mouse location to current collision
            if (
                check_collisions(this.interactables[i])
            ) {
                this.interactables[i].do()
            }
        }
    }

};




class InteractableHonk extends Collision {

    do() {
    }

}

class BumperHonk extends InteractableHonk {
    do() {
        console.log("Bumper")
        if ((Math.floor(Math.random() * 12)) > 8) {
            console.log("SHUT UP")
        }
    }
}

class Radiohonk extends InteractableHonk {
    do() {
        console.log("Radio")
    }
}