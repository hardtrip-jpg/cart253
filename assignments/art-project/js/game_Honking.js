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

        for (let i = 0; i < this.collision_array.length; i++) {
            //grab properties from currewnt collision
            let loc_x = this.collision_array[i].location_x
            let loc_y = this.collision_array[i].location_y
            let wid = this.collision_array[i].size_x
            let hei = this.collision_array[i].size_y
            //check mouse location to current collision
            if (
                (mouseX > loc_x && mouseX < (loc_x + wid))
                &&
                (mouseY > loc_y && mouseY < (loc_y + hei))
            ) {
                console.log("clicked collision")
                go_to(this.collision_array[i].levelID)
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