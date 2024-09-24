/**
 * Museum of Housing BASE SCRIPT
 * Jeremy Dumont
 * 
 * This script is used to define base functions that all games will use. Mainly for type safety and less code redunency.
 * 
 */
    
class Base {

    constructor(){

    };

    game_setup(){

    };

    game_draw(){
        //debug show collisions option
        if (this.show_collisions){
            for (let i = 0; i < this.collision_array.length; i++){
                push()
                fill("#000000")
                rect(this.collision_array[i].location_x, this.collision_array[i].location_y, this.collision_array[i].size_x, this.collision_array[i].size_y)
                pop()
            }
        }
    };

    game_mousePressed(){
        
    };

    collision_array = [];

    show_collisions = true;
}

class Collision {

    constructor(location_x, location_y, size_x, size_y){
        this.location_x = location_x;
        this.location_y = location_y;
        this.size_x = size_x;
        this.size_y = size_y;
    }
}

class LevelButton extends Collision {
    constructor(location_x,location_y,size_x,size_y,levelID){
        super(location_x, location_y, size_x, size_y);
        this.levelID = levelID;
    }

}