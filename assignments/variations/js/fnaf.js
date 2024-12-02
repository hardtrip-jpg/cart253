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
            fnafTerminal.drawTerminal();
            push();
            fill(255, 255, 255, 100);
            const col = changeToOfficeButton.col
            rect(col.x, col.y, col.width, col.height);
            pop();
            break;
        case ('hallway'):
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
    }

}

function fnafStart() {
    fnafTerminal.reset();
    fnafTerminal.print("     Welcome to the Office game ");
    fnafTerminal.print("When you feel ready, you may look up... ");
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
    console.log(door.doorOpen);
}