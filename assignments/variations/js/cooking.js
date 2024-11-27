let cookingTerminal = new Terminal(
    (commands) => {
        cookingTerminal.displayWithBuffer = false;
        currentAngle += 6;
        debugAmount++;
        console.log(debugAmount);

        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];
    

    switch (first_word){
        case 'hello':
            cookingTerminal.displayWithBuffer = true;
            cookingTerminal.print("Well hello there my friend!");
            break;
        case 'menu':
            changeState('menu');
            break;
        case 'look':
            look();
            break;
        default:
            cookingTerminal.print("ERROR: " + first_word + " IS NOT VALID");
            break;
    }

    if (currentAngle >= 360){
        cookingTerminal.reset();
        cookingTerminal.print("YOU LOSE");
    }

    }
);

let debugAmount = 0;
let currentAngle = 0;
let clock = {
    x: 575,
    y: 65,
}

function drawClock(){
    push();
    stroke("#40FD90");
    fill("#000000")
    circle(clock.x, clock.y, 80)
    angleMode(DEGREES);
    push();
        translate(clock.x, clock.y);
        rotate(currentAngle);
        strokeWeight(2);
        line(0, 0, 0, -50);
        for (let ticks = 0; ticks < 60; ticks += 1) {
            point(0, -50);
            rotate(6);
          }
    pop();
    pop();
}

function cookingReset(){
    debugAmount = 0;
    currentAngle = 0;
}

function look(){
    cookingTerminal.print("There is a STOVE to cook things on");
    cookingTerminal.print("There is a FRIDGE that stores food");
    cookingTerminal.print("There is a SINK with access to water");
    cookingTerminal.print("There is a COUNTER with available utilities");
}
