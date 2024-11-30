let rythymTerminal = new Terminal(
    (commands) => {
        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];

        switch (first_word) {
            case ("menu"):
                changeState("menu");
            default:
                break;
        }
    }
)

let onBeat = true;
let tickIcon = {
    x: 610,
    y: 25,
    size: 10
};
let tickBeat = 0.479;
let showTick = false;
let tickValue = 0;

let beatLength = tickBeat / 2;
let beatValue = 0;


function rythymDraw() {
    rythymTerminal.drawTerminal();

    beatValue += 0.0166666666667;
    tickValue += 0.0166666666667;
    if (beatValue >= beatLength) {
        onBeat = true;
        beatValue -= beatLength;
        // beatValue = 0;
    }
    push();

    if (tickValue >= (tickBeat)) {
        rythymTerminal.caretVisible = true;
        showTick = true;
        tickValue -= tickBeat;
    }
    if (tickValue >= (tickBeat / 3)) {
        rythymTerminal.caretVisible = false;
        showTick = false;
    }



    if (showTick) {
        fill("#40FD90");
    }
    else {
        fill("#000000");
    }



    ellipse(tickIcon.x, tickIcon.y, tickIcon.size);
    pop();
    onBeat = false;

}

function rythymReset() {
    rythymTerminal.caretTime = 0;
    rythymSong.loop(true);
    //rythymSong.play();
}

function rythymKeyPress() {
    rythymTerminal.keyCheck();
}