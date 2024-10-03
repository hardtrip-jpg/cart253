/**
 * Museum of Housing - Eyes
 * Jeremy Dumont
 * 
 * Eyes follow player wherever they go.
 */

"use strict";
/**
 * Define Eye class.
 */
class Eyes extends Base {

    //Define level button
    collision_1 = new LevelButton(10, 10, 100, 100, 0)

    //Define all the eye object positions
    eye_1 = new EyeObject(400, 210)
    eye_2 = new EyeObject(160, 300)
    eye_3 = new EyeObject(360, 370)
    eye_4 = new EyeObject(540, 310)
    eye_5 = new EyeObject(40, 360)

    //Holders for eyes and button
    collision_array = [this.collision_1]
    eyes_array = [this.eye_1, this.eye_2, this.eye_3, this.eye_4, this.eye_5]

    /**
     * Preload all required resources
     */
    game_preload() {
        super.game_preload();

        //load images
        this.fence_img = loadImage('assets/images/fence.png');
        this.eye_img = loadImage('assets/images/eye.png');
        this.lids_img = loadImage('assets/images/lids.png');
        this.shut_lids_img = loadImage('assets/images/shut_lids.png');
        this.eyes_bg_img = loadImage('assets/images/eyes_bg.jpeg');
        this.collision_1.img = this.back_button;

        //load sounds
        this.bg_sound = loadSound('assets/sounds/eyes_music.ogg');

    }

    /**
     * Stop current audio, play this levels background audio
     */
    game_setup() {
        main_audio.stop();
        main_audio = this.bg_sound
        main_audio.loop();

    }

    /**
     * Draws all components such as eyes, background, and foreground elements.
     */
    game_draw() {
        //BACKGROUND
        let bg_position = get_3D_effect(320, 240, 0.1);

        //define basic background
        image(this.eyes_bg_img, bg_position[0], bg_position[1]);
        text("eyes", 100, 200);

        //for collision debugs
        super.game_draw();


        //EYES
        //cycle through eyes in eye array
        for (let i = 0; i < this.eyes_array.length; i++) {

            //calculate the pupil position based on mouse
            this.eyes_array[i].get_pupil_pos();

            //if mouse is hovering eye, draw it closed
            if (
                check_collisions(this.eyes_array[i].hover_col)
            ) {
                push();
                image(this.shut_lids_img, this.eyes_array[i].base_pos_x, this.eyes_array[i].base_pos_y)
                pop();
            }
            //if mouse isnt hovering, draw full eye and pupil.
            else {
                push();
                image(this.eye_img, this.eyes_array[i].pupil_pos_x, this.eyes_array[i].pupil_pos_y)
                pop();
                push();
                image(this.lids_img, this.eyes_array[i].base_pos_x, this.eyes_array[i].base_pos_y)
                pop();
            }

        }

        //FOREGROUND
        //get 3d position for fence and calculate
        let fence_position = get_3D_effect(320, 240, 3)
        image(this.fence_img, fence_position[0], fence_position[1])




    }

    //used only for back button in the level
    game_mousePressed() {
        super.game_mousePressed();
    }


}

/**
 * Defines Eye object.
 */
class EyeObject {

    //pupil position to be manipulated
    pupil_pos_x = 0
    pupil_pos_y = 0


    //constructor
    constructor(base_pos_x, base_pos_y) {
        this.base_pos_x = base_pos_x
        this.base_pos_y = base_pos_y
        this.hover_col = new Collision(this.base_pos_x - 40, this.base_pos_y - 30, 80, 50)
    }

    /**
     * Creates direction based on mouse position and current position. Offsets current position based on direction.
     */
    get_pupil_pos() {

        let dir = createVector((mouseX - this.base_pos_x), (mouseY - this.base_pos_y))
        let dir_normed = p5.Vector.normalize(dir);
        this.pupil_pos_x = this.base_pos_x + ((dir_normed.x * 15) - 2.5)
        this.pupil_pos_y = this.base_pos_y + ((dir_normed.y * 10) - 5)
    }



}

