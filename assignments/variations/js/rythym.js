/**
 * This is the rythym terminal. When typing, you must match your timing to the beat of the song.
 */
const rythymTerminal = new Terminal(
    (commands) => {
        let first_word = commands[0];
        let second_word = commands[1];

        switch (first_word) {
            case ("menu"):
                changeState("menu");
            case ("move"):
                mazeGoTo(second_word, rythymTerminal);
                rythymTerminal.print("Looking around...");
                rythymTerminal.commandsCheck(["look"]);
                break;
            case ("look"):
                mazeLook(rythymTerminal);
                break;
            case ("help"):
                printHelp(rythymTerminal);
                break;
            case ("jasd98j5234jasd"):
                rythymTerminal.reset();
                for (i = 0; i <= 45; i++) {
                    rythymTerminal.print("You WIN!!!!!!!!");
                }
                rythymTerminal.print("Type RESET to retry");
                rythymTerminal.drawTerminal();
                break;
            case ("reset"):
                rythymReset();
                break;
            default:
                rythymTerminal.print("ERROR: " + first_word + " IS NOT VALID");
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

let beatLength = 0.2395;
let beatValue = 0;

let ratingText = "";
let showRating = false;
let ratingOpacity = 0;
let ratingFadeSpeed = 2;

let perfectBuffer = 0.1;
let goodBuffer = 0.2;


function rythymDraw() {
    rythymTerminal.drawTerminal();

    drawTick();
    drawRating();

    beatValue += 0.0166666666667;
    tickValue += 0.0166666666667;
    if (beatValue >= beatLength) {

        onBeat = true;
        beatValue -= beatLength;
        // beatValue = 0;
    }



}

function rythymReset() {
    rythymSong.stop();
    rythymTerminal.caretTime = 0;
    rythymSong.loop(true);

    let tickValue = 0;
    let beatValue = 0;

    rythymTerminal.reset();
    rythymTerminal.print("Welcome to RYTHYM!");
    rythymTerminal.print("Can you feel it?");
    rythymTerminal.print("...");
    rythymTerminal.print("Use HELP for instructions");

    ratingText = "newRating";
    ratingOpacity = 0;
    showRating = false;

    currentMaze = rythymMaze;
    currentMazeEnd = rythymMazeEnd;
    playerPosition = rythymMazeStart;


}

function rythymKeyPress() {

    if (beatValue <= (beatLength + perfectBuffer) && beatValue >= (beatLength - perfectBuffer)) {
        updateRating('perfect');
        rythymTerminal.keyCheck();
    }
    else if (beatValue <= (beatLength + goodBuffer) && beatValue >= (beatLength - goodBuffer)) {
        updateRating('good');
        rythymTerminal.keyCheck();
    }
    else {
        updateRating('miss');
    }



}

function rythymEnd() {
    rythymSong.stop();
}

function drawTick() {
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


function drawRating() {
    if (showRating) {
        if (ratingOpacity <= 0) {
            showRating = false;
        }
        else {
            // console.log(ratingOpacity)
            push();
            fill(64, 253, 144, ratingOpacity);
            textAlign(RIGHT);
            textFont(terminalFont);
            textSize(25);
            text(ratingText, 600, 37);
            ratingOpacity -= ratingFadeSpeed;
            pop();
        }
    }

}

function updateRating(newRating) {
    ratingText = newRating;
    ratingOpacity = 255;
    showRating = true;
    console.log(ratingText);
}