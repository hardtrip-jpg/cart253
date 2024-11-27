let cookingTerminal = new Terminal(
    (commands) => {
        currentAngle += 6;
        debugAmount++;
        console.log(debugAmount);

        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];

    switch (first_word){
        case 'hello':
            //toDisplay.push("");
            cookingTerminal.toDisplay.push("Well hello there my friend!");
            break;
        case 'menu':
            changeState('menu');
            break;
        default:
            cookingTerminal.toDisplay.push("ERROR: " + first_word + " IS NOT A VALID COMMAND");
            break;
    }
    }
);

let debugAmount = 0;
let currentAngle = 0;
function drawClock(){
    push();
    stroke("#40FD90");
    fill("#000000")
    circle(560, 80, 80)
    angleMode(DEGREES);
    push();
        translate(560, 80);
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
