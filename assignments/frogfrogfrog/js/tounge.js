//tounge
// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};
// Our fly
// Has a position, size, and speed of horizontal movement
const baseFly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

let fly1 = structuredClone(baseFly);

let flyHolder = [fly1,]

const shopButton = new
    button(15, 15, 50, 50, () => {
        changeState('Shop');
    });
let toungeStateButtons = [shopButton,]


/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {

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
 * Draws the fly as a black circle
 */
function drawFly() {

    for (let i = 0; i < flyHolder.length; i++) {
        push();
        noStroke();
        fill("#000000");
        ellipse(flyHolder[i].x, flyHolder[i].y, flyHolder[i].size);
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
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -curInventory.toungeSpeed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += curInventory.toungeSpeed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

function drawMoney() {
    push();
    color("#000000");
    textAlign(RIGHT)
    textSize(30);
    text("$ " + str(curInventory.money), 620, 40);
    pop();
}

function drawShopButton() {
    push();
    rect(shopButton.col.x, shopButton.col.y, shopButton.col.width, shopButton.col.height);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    for (let i = 0; i < flyHolder.length; i++) {
        const d = dist(frog.tongue.x, frog.tongue.y, flyHolder[i].x, flyHolder[i].y);
        // Check if it's an overlap
        const eaten = (d < frog.tongue.size / 2 + flyHolder[i].size / 2);
        if (eaten) {
            ateFly(flyHolder[i]);
        }
    }
}



function ateFly(fly) {
    // Reset the fly
    resetFly(fly);
    // Bring back the tongue
    frog.tongue.state = "inbound";
    //Add to money
    curInventory.money++;
}

function toungeDraw() {
    push();
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    drawMoney();
    checkTongueFlyOverlap();
    for (let i = 0; i < toungeStateButtons.length; i++) {
        push();
        rect(toungeStateButtons[i].col.x, toungeStateButtons[i].col.y, toungeStateButtons[i].col.width, toungeStateButtons[i].col.height)
        pop();
    }
    pop();
}

function toungMousePress() {
    for (let i = 0; i < toungeStateButtons.length; i++) {
        if (toungeStateButtons[i].checkMouseCollision()) {
            return;
        }
    }

    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }

}