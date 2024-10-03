/**
 * Museum of Housing
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 */

"use strict";

class Honk extends Base {

    collision_1 = new LevelButton(10, 10, 100, 100, 0)

    interactables = [new BumperHonk(100, 300, 100, 100), new Radiohonk(340, 260, 100, 60)];

    collision_array = [this.collision_1]

    game_preload(){
        super.game_preload();
        this.collision_1.img = this.back_button;
        this.interior = loadImage('assets/images/honk_car_interior.png');
        this.exterior_1 = loadImage('assets/images/honk_exterior_1.jpg');
    };

    game_setup() {

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