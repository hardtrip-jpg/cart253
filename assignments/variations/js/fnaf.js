const fnafTerminal = new Terminal(
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

let fnafState = 'terminal'

let door1 = {
    doorOpen: true,
    isAttacked: false
}
let door2 = {
    doorOpen: true,
    isAttacked: false
}
let door3 = {
    doorOpen: true,
    isAttacked: false
}

const doorsHolder = [door1,door2,door3];


class DoorButton extends Button{
    
    constructor(x, y, width, length, door){
        super(x,y,width,length);
        this.door = door;
        this.notify =() => { doorButton(this.door) };
    }

    
}

const officeButtons = [
    new DoorButton (200, 300, 50, 50, door1),
    new DoorButton (300, 300, 50, 50, door2),
    new DoorButton (400, 300, 50, 50, door3),
];


const changeToOfficeButton = new Button(180, 10, 300, 60, 
    () => {
        fnafChangeState("hallway");
    }
);

const changeToTerminalButton = new Button(180, 400, 300, 60, 
    () => {
        fnafChangeState("terminal");
    }
);







function fnafDraw() {
    

    switch (fnafState) {
        case ('terminal'):
            attackTimer();
            fnafTerminal.drawTerminal();
            push();
            fill(255, 255, 255, 100);
            const col = changeToOfficeButton.col
            rect(col.x, col.y, col.width, col.height);
            pop();
            break;
        case ('hallway'):
            attackTimer();
            background("#FFFFFF");
            text("woah youre office", 320, 240);

            push();
            fill(255, 255, 255, 100);
            const col2 = changeToTerminalButton.col
            rect(col2.x, col2.y, col2.width, col2.height);
            pop();

            
            for(i = 0; i < officeButtons.length; i++){
                push();
                const col = officeButtons[i].col
                if (officeButtons[i].door.doorOpen){
                    fill("#FF0000");
                }else{
                    fill("#00FF00"); 
                }
                
                rect(col.x, col.y, col.width, col.height);
                pop();
            }
            
            break;
        case 'dead':
            background("#000000");
            break;
    }

}

function fnafStart() {
    fnafTerminal.reset();
    fnafTerminal.print("     Welcome to the Office game ");
    fnafTerminal.print("When you feel ready, you may look up... ");
    resetAttack();
}

function fnafMouseCheck() {

    switch (fnafState) {
        case 'terminal':
            changeToOfficeButton.checkMouseCollision();
            break;
        case 'hallway':
            changeToTerminalButton.checkMouseCollision();
            for(i = 0; i < officeButtons.length; i++){
                officeButtons[i].checkMouseCollision();
            }
            break;
    }

}

function fnafKeyCheck() {
    switch (fnafState) {
        case 'terminal':
            fnafTerminal.keyCheck();
            break;
        case 'hallway':
            break;
    }

}

function fnafEndState() {
    switch (fnafState) {
        case 'terminal':
            break;
        case 'hallway':
            break;
    }

}

function fnafStartState() {
    switch (fnafState) {
        case 'terminal':
            break;
        case 'hallway':
            break;
    }

}

function fnafChangeState(newState) {
    if (newState != fnafState) {
        fnafEndState();
        fnafState = newState;
        fnafStartState();
    }
}

function doorButton(door){
    door.doorOpen = !door.doorOpen;
}



let waitTime = {
    low: 5,
    high: 10,
    time: 5
};
let waiting = true;
let currentFrame = 0;
let attackTime = 5;
let currentDoor;

function attackTimer(){
    currentFrame += 0.0166667;
    // console.log(currentFrame);
    if (waiting && (currentFrame >= waitTime.time)){
        waiting = false;
        currentFrame = 0;
        currentDoor.isAttacked = true;
        console.log(currentDoor);
    }
    else if(!waiting && currentFrame >= attackTime){
        checkAttackSuccessful();
    }

}

function resetAttack(){
    const randomElement = doorsHolder[Math.floor(Math.random() * doorsHolder.length)];
    currentDoor = randomElement;
    waitTime.time = Math.floor(Math.random() * waitTime.low) + waitTime.high;
    currentFrame = 0;
    waiting = true;
}

function checkAttackSuccessful(){
    if (currentDoor.doorOpen){
        console.log("you died");
        changeState('dead');
    }
    else{
        currentDoor.isAttacked = false;
        resetAttack();
    }
}