const fnafTerminal = new Terminal(
    (commands) => {
        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];

        switch (first_word) {
            case ("menu"):
                changeState("menu");
            case ("reset"):
                fnafStart();
            case ("move"):
                mazeGoTo(second_word, fnafTerminal);
                break;
            case ("look"):
                mazeLook(fnafTerminal);
                break;
            default:
                break;
        }
    }
)

let fnafState = 'terminal'

let door1 = {
    doorOpen: true,
    isAttacked: false,
    id: 1,
}
let door2 = {
    doorOpen: true,
    isAttacked: false,
    id: 2,
}
let door3 = {
    doorOpen: true,
    isAttacked: false,
    id: 3,
}

const doorsHolder = [door1, door2, door3];


class DoorButton extends Button {

    constructor(x, y, width, length, door) {
        super(x, y, width, length);
        this.door = door;
        this.notify = () => { doorButton(this.door) };
    }


}

const officeButtons = [
    new DoorButton(185, 310, 70, 55, door1),
    new DoorButton(285, 320, 75, 55, door2),
    new DoorButton(392, 323, 80, 60, door3),
];


const changeToOfficeButton = new Button(180, 10, 300, 60,
    () => {
        fnafChangeState("look_up");
    }
);

const changeToTerminalButton = new Button(180, 400, 300, 60,
    () => {
        fnafChangeState("look_down");
    }
);





let transitionCounter = 0;

function fnafDraw() {


    switch (fnafState) {
        case ('terminal'):
            attackTimer();
            push();
            fnafTerminal.drawTerminal();
            pop();
            push();
            fill(255, 255, 255, 100);
            const col = changeToOfficeButton.col
            rect(col.x, col.y, col.width, col.height);
            pop();
            break;
        case ('hallway'):
            attackTimer();
            background("#FFFFFF");
            image(fnafBackground, 0, 0);
            text("woah youre office", 320, 240);

            for (i = 0; i < officeButtons.length; i++) {
                push();
                image(drawDoor(officeButtons[i].door), 0, 0);
                const col = officeButtons[i].col

                pop();
            }

            push();
            fill(255, 255, 255, 100);
            const col2 = changeToTerminalButton.col
            rect(col2.x, col2.y, col2.width, col2.height);
            pop();




            break;
        case 'dead':
            push();
            fnafTerminal.drawTerminal();
            pop();
            break;
        case 'look_up':
            transitionCounter++;
            if (transitionCounter >= 3) {
                fnafChangeState("hallway");
            }
            image(look_up, 0, 0);
            break;
        case 'look_down':
            transitionCounter++;
            if (transitionCounter >= 3) {
                fnafChangeState("terminal");
            }
            image(look_down, 0, 0);
            break;


    }



}

function fnafStart() {
    fnafChangeState('terminal');
    fnafTerminal.reset();
    fnafTerminal.print("     Welcome to the Office game ");
    fnafTerminal.print("When you feel ready, you may look up... ");
    resetAttack();
    currentMaze = fnafMaze;
    currentMazeEnd = fnafMazeEnd;
    playerPosition = fnafMazeStart;

}

function fnafMouseCheck() {

    switch (fnafState) {
        case 'terminal':
            changeToOfficeButton.checkMouseCollision();
            break;
        case 'hallway':
            changeToTerminalButton.checkMouseCollision();
            for (i = 0; i < officeButtons.length; i++) {
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
        case 'dead':
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
        case 'look_up':
            transitionCounter = 0;
            look_up.pause();
            //look_up.reset();
            break;
        case 'look_down':
            transitionCounter = 0;
            look_down.pause();
            //look_down.reset();
            break;
    }

}

function fnafStartState() {
    switch (fnafState) {
        case 'terminal':
            break;
        case 'hallway':
            break;
        case 'look_up':
            look_up.play();
            break;
        case 'look_down':
            look_down.play();
            break;
        case 'dead':
            fnafTerminal.reset();
            fnafTerminal.print("You died ;-;");
            fnafTerminal.print("Type RESET to retry");
            fnafTerminal.drawTerminal();
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

function doorButton(door) {
    door.doorOpen = !door.doorOpen;
    if (door.isAttacked) {
        door.isAttacked = false;
        resetAttack();
    }
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

function attackTimer() {
    currentFrame += 0.0166667;
    // console.log(currentFrame);
    if (waiting && (currentFrame >= waitTime.time) && fnafState === 'terminal') {
        waiting = false;
        currentFrame = 0;
        currentDoor.isAttacked = true;
        console.log(currentDoor);
    }
    else if (!waiting && currentFrame >= attackTime) {
        checkAttackSuccessful();
    }

}

function resetAttack() {
    const randomElement = doorsHolder[Math.floor(Math.random() * doorsHolder.length)];
    currentDoor = randomElement;
    waitTime.time = Math.floor(Math.random() * waitTime.low) + waitTime.high;
    currentFrame = 0;
    waiting = true;
}

function checkAttackSuccessful() {
    if (currentDoor.doorOpen) {
        console.log("you died");
        fnafChangeState('dead');
        currentDoor.isAttacked = false;
    }
    else {
        currentDoor.isAttacked = false;
        resetAttack();
    }
}

function drawDoor(door) {
    //let currentImage = mid_closed;


    switch (door.id) {
        case 1:
            if (door.doorOpen === false) {
                return left_closed;
            }
            else if (door.isAttacked) {
                return left_enemy;
            }
            else {
                return left_open;
            }
            break;
        case 2:
            if (door.doorOpen === false) {
                return mid_closed;
            }
            else if (door.isAttacked) {
                return mid_enemy;
            }
            else {
                return mid_open;
            }
            break;
        case 3:
            if (door.doorOpen === false) {
                return right_closed;
            }
            else if (door.isAttacked) {
                return right_enemy;
            }
            else {
                return right_open;
            }
            break;
    }

}