/**
 * Tounge FrogFrogFrog script
 * by: Jeremy Dumont
 * 
 * This script all the functions used for the tounge state.
 */


//Our tounge
const tongue = {
    x: undefined,
    y: 480,

    size: 20,
    speed: 1,
    distance: 0,
    //Defines if the tounge should be moving or not
    tongueState: "idle",
}

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongueArray: [structuredClone(tongue)],
};
// Our fly
// Has a position, size, and speed of horizontal movement
const baseFly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3 // Will be random when first generated
};

//Holds all the flies currently in game. Can be added to through shop screen.
let flyHolder = [structuredClone(baseFly),]

//When pressed, changes from tounge screen to shop screen.
const shopButton = new button(15, 15, 50, 50, () => {
    changeState('Shop');
});

//When the money text is pressed, add 9999$ to current money value.
const cheatButton = new button(15, 15, 620, 40, () => {
    curInventory.money += 9999;
});

//Holds all buttons for this game state.
let toungeStateButtons = [shopButton, cheatButton];


/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {

    //Cycle through all the flies in the fly holder
    for (let i = 0; i < flyHolder.length; i++) {
        // Move the fly
        flyHolder[i].x += flyHolder[i].speed;
        // Handle the fly going off the canvas
        if (flyHolder[i].x > width) {
            resetFly(flyHolder[i]);
        }
    }

}

/**
 * Draws the fly as a fly image
 */
function drawFly() {

    //Cycle through all flies in fly holder
    for (let i = 0; i < flyHolder.length; i++) {
        push();
        //Draw fly image
        image(flyImage, flyHolder[i].x - 10, flyHolder[i].y - 7)
        pop();
    }

}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    for (let i = 0; i < frog.tongueArray.length; i++) {

        frog.tongueArray[i].x = frog.body.x + frog.tongueArray[i].distance;
        // If the tongue is idle, it doesn't do anything
        if (frog.tongueArray[i].tongueState === "idle") {
            // Do nothing
        }
        // If the tongue is outbound, it moves up
        else if (frog.tongueArray[i].tongueState === "outbound") {
            frog.tongueArray[i].y += -curInventory.toungeSpeed;
            // The tongue bounces back if it hits the top
            if (frog.tongueArray[i].y <= 0) {
                frog.tongueArray[i].tongueState = "inbound";
            }
        }
        // If the tongue is inbound, it moves down
        else if (frog.tongueArray[i].tongueState === "inbound") {
            frog.tongueArray[i].y += curInventory.toungeSpeed;
            // The tongue stops if it hits the bottom
            if (frog.tongueArray[i].y >= height) {
                frog.tongueArray[i].tongueState = "idle";
            }
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {

    //Cycle through tounge array and draw every tounge available.
    for (let i = 0; i < frog.tongueArray.length; i++) {
        // Draw the tongue tip
        push();
        fill("#ea93d7");
        noStroke();
        ellipse(frog.tongueArray[i].x, frog.tongueArray[i].y, frog.tongueArray[i].size);
        pop();

        // Draw the rest of the tongue
        push();
        stroke("#ea93d7");
        strokeWeight(frog.tongueArray[i].size - 10);
        line(frog.tongueArray[i].x, frog.tongueArray[i].y, frog.body.x, frog.body.y);
        pop();
    }


    // Draw the frog's body
    push();
    image(frogheadImage, frog.body.x - 73, frog.body.y - 100);
    pop();
}

function drawMoney() {
    push();
    stroke(0);
    strokeWeight(5);
    fill("#FFFFFF");
    textAlign(RIGHT)
    textSize(30);
    text("$ " + str(curInventory.money), 620, 40);
    pop();
}

function drawShopButton() {
    push();
    image(cartImage, shopButton.col.x, shopButton.col.y);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Cycle through fly holder
    for (let i = 0; i < flyHolder.length; i++) {
        // Cycle through tounge holder
        for (let e = 0; e < frog.tongueArray.length; e++) {
            // Check distance between current tounge and fly
            const d = dist(frog.tongueArray[e].x, frog.tongueArray[e].y, flyHolder[i].x, flyHolder[i].y);
            // Check if it's an overlap
            const eaten = (d < frog.tongueArray[e].size / 2 + flyHolder[i].size / 2);
            if (eaten) {
                ateFly(flyHolder[i]);
            }
        }
    }
}



function ateFly(fly) {
    // Reset the fly
    resetFly(fly);

    //Add to money
    curInventory.money++;

    if (curInventory.cannotPass == true) {
        // Bring back the tongue
        for (let i = 0; i < frog.tongueArray.length; i++) {
            frog.tongueArray[i].tongueState = "inbound";
        }
    }


}

/**
 * Combine all draw functions in tounge game state
 */
function toungeDraw() {
    push();
    background("#87ceeb");
    image(backgroundImage, 0, 0);
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    drawMoney();
    drawShopButton();
    checkTongueFlyOverlap();
    pop();
}


/**
 * Check through buttons and change all tounge state.
 */
function toungeMousePress() {
    for (let i = 0; i < toungeStateButtons.length; i++) {
        if (toungeStateButtons[i].checkMouseCollision()) {
            return;
        }
    }

    for (let e = 0; e < frog.tongueArray.length; e++) {
        if (frog.tongueArray[e].tongueState === "idle") {
            frog.tongueArray[e].tongueState = "outbound";
        }
    }


}