/**
 * Museum of Housing
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 */

"use strict";

class Eyes extends Base{

    collision_1 = new LevelButton(10,10,100,100, 1)
    collision_array = [this.collision_1]

    game_draw(){
        background("#FF0000");
        text("eyes", 100, 200);

        super.game_draw();

        //white
        push()
        ellipseMode(CENTER)
        ellipse(360, 240, 100, 90)
        pop()
        //pupil
        push()
        ellipseMode(CENTER)
        fill("#FF0808")
        ellipse(360, 240, 20, 20)
        pop()
    }

    game_mousePressed(){
        for (let i = 0; i < this.collision_array.length; i++){
            //grab properties from currewnt collision
            let loc_x = this.collision_array[i].location_x
            let loc_y = this.collision_array[i].location_y
            let wid = this.collision_array[i].size_x
            let hei = this.collision_array[i].size_x
            //check mouse location to current collision
            if (
                (mouseX > loc_x && mouseX < (loc_x + wid))
                &&
                (mouseY > loc_y && mouseY < (loc_y + hei))
            ){
                console.log("clicked collision")
                go_to(this.collision_array[i].levelID)
            }
        } 
    }
}

class EyeObject {

    constructor(base_pos_x, base_pos_y){
        this.base_pos_x = base_pos_x;
        this.base_pos_y = base_pos_y;
    }

    

}