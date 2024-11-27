let cookingTerminal = new Terminal(
    (commands) => {
        currentAngle += 6;

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

let currentAngle = 0;
function drawClock(){
    push();
    angleMode(DEGREES);
    push();
        rotate(currentAngle);
        stroke("#FFFFFF")
        strokeWeight(1);
        line(0, 0, 0, -10);
    pop();
    pop();
}
