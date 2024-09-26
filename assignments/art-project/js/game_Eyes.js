/**
 * Museum of Housing
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 */

"use strict";

class Eyes extends Base {

    collision_1 = new LevelButton(10, 10, 100, 100, 0)


    eye_1 = new EyeObject(360, 240)
    eye_2 = new EyeObject(100, 300)

    collision_array = [this.collision_1,]
    eyes_array = [this.eye_1, this.eye_2,]

    game_draw() {
        //define basic background
        background("#FF0000");
        text("eyes", 100, 200);

        //for collision debugs
        super.game_draw();

        ellipseMode(CENTER)

        //cycle through eyes in eye array
        for (let i = 0; i < this.eyes_array.length; i++) {
            this.eyes_array[i].get_pupil_pos();
            //draw white of eyes
            push();
            ellipse(this.eyes_array[i].base_pos_x, this.eyes_array[i].base_pos_y, 100, 90)
            pop();
            if (
                check_collisions(this.eyes_array[i].hover_col)
            ) { }
            else {
                push();
                fill("#FF08FF")
                ellipse(this.eyes_array[i].pupil_pos_x, this.eyes_array[i].pupil_pos_y, 30, 30)
                pop();
            }



        }




    }

    game_mousePressed() {
        super.game_mousePressed();
    }
}

//
class EyeObject {

    pupil_pos_x = 0
    pupil_pos_y = 0



    constructor(base_pos_x, base_pos_y) {
        this.base_pos_x = base_pos_x
        this.base_pos_y = base_pos_y
        this.hover_col = new Collision(this.base_pos_x - 50, this.base_pos_y - 50, 100, 100)
    }

    get_pupil_pos() {

        let mouse_pos = createVector(mouseX, mouseY)

        let dir = createVector((mouse_pos.x - this.base_pos_x), (mouse_pos.y - this.base_pos_y))
        let dir_normed = p5.Vector.normalize(dir);
        this.pupil_pos_x = this.base_pos_x + (dir_normed.x * 20)
        this.pupil_pos_y = this.base_pos_y + (dir_normed.y * 20)
    }



}