
let onBeat = true;
let beatLength = 60 / 128.9;
let beatValue = 0;


function rythymDraw() {
    beatValue += 0.01666;
    if (beatValue > beatLength) {
        onBeat = true;
        beatValue = 0;
    }
    push();

    if (onBeat) {
        fill("#FFFFFF");
        console.log("beat")
    }
    else {
        fill("#000000")
    }
    rect(100, 100, 100);
    pop();
    onBeat = false;
}

function rythymReset() {
    rythymSong.play()
}