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

let beatLength = 0.2395;
let beatValue = 0;

let ratingText = "";
let showRating = false;
let ratingOpacity = 0;
let ratingFadeSpeed = 2;

let perfectBuffer = 0.1;
let goodBuffer = 0.2;

let comboValue = 0;

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
    rythymTerminal.reset();
    rythymSong.stop();
    rythymTerminal.caretTime = 0;
    rythymSong.loop(true);
    
    ratingText = "newRating";
    ratingOpacity = 0;
    showRating = false;

    currentMaze = rythymMaze;
    currentMazeEnd = rythymMazeEnd;
    playerPosition = rythymMazeStart;
}

function rythymKeyPress() {

    if(beatValue <= (beatLength + perfectBuffer) && beatValue >= (beatLength - perfectBuffer)){
        updateRating('perfect');
        comboValue++;
        rythymTerminal.keyCheck();
    }
    else if (beatValue <= (beatLength + goodBuffer) && beatValue >= (beatLength - goodBuffer))
    {
        updateRating('good');
        comboValue++;
        rythymTerminal.keyCheck();
    }
    else{
        updateRating('miss');
        comboValue = 0;
    }

    
    
}

function rythymEnd(){
    rythymSong.stop();
}

function drawTick(){
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

function drawCombo(){

}

function drawRating(){
    if (showRating){
        if (ratingOpacity <= 0){
            showRating = false;
        }
        else{
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

function updateRating(newRating){
    ratingText = newRating;
    ratingOpacity = 255;
    showRating = true;
    console.log(ratingText);
}