
let onBeat = true;
let tickIcon = {
    x: 610,
    y: 25,
    size: 10
};
let tickBeat = 0.479;
let showTick = false;
let tickValue = 0;

let beatLength = tickBeat / 2 ;
let beatValue = 0;


function rythymDraw() {
    beatValue += 0.0166666666667;
    tickValue += 0.0166666666667;
    if (beatValue >= beatLength) {
        onBeat = true;
        beatValue -= beatLength;
        // beatValue = 0;
    }
    push();

    if(tickValue >= (tickBeat)){
        showTick = true; 
        tickValue -= tickBeat;
    }
    if(tickValue >= (tickBeat / 3)){
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
    rythymSong.loop(true);
    //rythymSong.play();
}