/**
 * OFFICE GAME SCRIPT
 * by: Jeremy Dumont
 * 
 * Absolutly cursed code. Fair warning before going ahead...
 * 
 * This is an extension to the MAZE game. Players are tasked to complete the maze before a monster kills them. Players can look up and see 3 doors which can be shut by pressing 3 buttons. 
 * 
 * There is currently no fail state if players keep the doors shut.
 * 
 * Ever random amount of seconds, the monster AI will pick one of the three doors to spawn at. Then, if (or once) players look at the terminal, the monster will spawn as the chosen door. Then players have 5 seconds to shut door in the monsters face.
 * 
 * PS:The game was originally just called FNAF so all variable naming is based on that naming convention
 */

/**
 * This terminal holds a minimal amount of commands all connected to the maze logic script. You can go back to the menu or reset. Theres also a secret 'win' command if you complete the maze.
 */
const fnafTerminal = new Terminal(
    (commands) => {
        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];

        switch (first_word) {
            case ("menu"):
                changeState("menu");
                break;
            case ("reset"):
                fnafStart();
                break;
            case ("move"):
                mazeGoTo(second_word, fnafTerminal);
                fnafTerminal.print("Looking around...");
                fnafTerminal.commandsCheck(["look"]);
                break;
            case ("look"):
                mazeLook(fnafTerminal);
                break;
            case ("help"):
                printHelp(fnafTerminal);
                break;
            case ("jasd98j5234jasd"):
                fnafChangeState('win');
                break;
            default:
                fnafTerminal.print("ERROR: " + first_word + " IS NOT VALID");
                break;
        }
    }
)

/**VARIABLES */

//Main Variables for the Monster AI
let waitTime = {
    low: 5,
    high: 10,
    time: 5
};
let waiting = true;
let currentFrame = 0;
let attackTime = 5;
let currentDoor;

//Main variable to manage transition time when looking up or down
let transitionCounter = 0;

//Office game state holder
let fnafState = 'start';


//Main door variables
let door1 = {
    doorOpen: true,
    isAttacked: false,
    id: 1,
};
let door2 = {
    doorOpen: true,
    isAttacked: false,
    id: 2,
};
let door3 = {
    doorOpen: true,
    isAttacked: false,
    id: 3,
};
const doorsHolder = [door1, door2, door3];

/**
 * DoorButton is an extension of the Button class but it requires a button object when created
 */
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


//Buttons for when switching from Hallway to Terminal view
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

/**MAIN LOGIC*/

/**
 * This looks like a big function, but its pretty simple. Draw according to the state the game is currently in.
 */
function fnafDraw() {
    switch (fnafState) {

        //TERMINAL
        case ('terminal'):

            //Call the attackTimer logic controller
            attackTimer();

            //Draw the terminal
            push();
            fnafTerminal.drawTerminal();
            pop();

            //Draw the change perspective button
            push();
            fill(255, 255, 255, 100);
            const col = changeToOfficeButton.col
            rect(col.x, col.y, col.width, col.height);
            pop();

            break;

        //HALLWAY/OFFICE
        case ('hallway'):

            //Call the attackTimer logic controller
            attackTimer();

            //Draw a background to hide seams
            image(fnafBackground, 0, 0);

            //Loop through the doors and draw their corresponding images
            for (i = 0; i < officeButtons.length; i++) {
                push();
                image(drawDoor(officeButtons[i].door), 0, 0);
                pop();
            }

            //Draw the change perspective button
            push();
            fill(255, 255, 255, 100);
            const col2 = changeToTerminalButton.col
            rect(col2.x, col2.y, col2.width, col2.height);
            pop();

            break;

        //DEAD/WIN - Draw the terminal with no logic.
        case 'dead':
            push();
            fnafTerminal.drawTerminal();
            pop();
            break;

        case 'win':
            push();
            fnafTerminal.drawTerminal();
            pop();
            break;

        //START - Draw the terminal with no logic. Draw the change perspective button.
        case 'start':
            push();
            fnafTerminal.drawTerminal();
            pop();
            push();
            fill(255, 255, 255, 100);
            const coli = changeToOfficeButton.col
            rect(coli.x, coli.y, coli.width, coli.height);
            pop();
            break;

        //LOOK UP/DOWN - Check if still transitioning, if so keep transitioning. If not, change state
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

/**
 * This function resets the OFFICE game. First sets the state to start. Then prints a starting message. Then resets monster AI. Then resets the maze logic to match OFFICE game.
 */
function fnafStart() {
    fnafChangeState('start');
    fnafTerminal.reset();
    fnafTerminal.print("     Welcome to the Office game ");
    fnafTerminal.print("A monster lurks and wants to end your life...");
    fnafTerminal.print("...");
    fnafTerminal.print(" When you feel ready, you may look up... ");
    resetAttack();
    currentMaze = fnafMaze;
    currentMazeEnd = fnafMazeEnd;
    playerPosition = fnafMazeStart;

}

/**
 * When Mouse clicked, check what state currently in. Then check if any of the buttons currently active in that sate have been clicked.
 */
function fnafMouseCheck() {
    switch (fnafState) {
        case 'start':
            changeToOfficeButton.checkMouseCollision();
            break;

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

/**
 * When is pressed, pass it on to the terminal if the correct state
 */
function fnafKeyCheck() {
    switch (fnafState) {
        case 'start':
            fnafTerminal.keyCheck();
            break;
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

/**
 * This function is called when ever the OFFICE game state needs to change. 
 * This makes sure the state is change correctly and start and end state functions can be called.
 */
function fnafChangeState(newState) {
    if (newState != fnafState) {
        fnafEndState();
        fnafState = newState;
        fnafStartState();
    }
}

/**
 * Calls end state functions for corresponding states
 */
function fnafEndState() {
    switch (fnafState) {

        //Reset transition timer and stop current transition gif
        case 'look_up':
            transitionCounter = 0;
            look_up.pause();
            break;
        case 'look_down':
            transitionCounter = 0;
            look_down.pause();
            break;

        //Clear the terminal and print helpful command
        case 'start':
            fnafTerminal.reset();
            fnafTerminal.print("Use the HELP command");
            break;
    }

}

/**
 * Calls start state functions for corresponding states
 */
function fnafStartState() {
    switch (fnafState) {

        //Start transition gifs
        case 'look_up':
            look_up.play();
            break;
        case 'look_down':
            look_down.play();
            break;

        //Clear terminal and write death message
        case 'dead':
            fnafTerminal.reset();
            fnafTerminal.print("You died ;-;");
            fnafTerminal.print("Type RESET to retry");
            fnafTerminal.drawTerminal();
            break;

        //Clear terminal and write win message
        case 'win':
            fnafTerminal.reset();
            for (i = 0; i <= 45; i++) {
                fnafTerminal.print("You WIN!!!!!!!!");
            }
            fnafTerminal.print("Type RESET to retry");
            fnafTerminal.drawTerminal();
            break;

    }

}


/**INTERACTION / AI LOGIC*/

/**
 * When door button is pressed, change the door to its opposite state. If the door was getting attacked, reset the attack.
 */
function doorButton(door) {
    door.doorOpen = !door.doorOpen;
    if (door.isAttacked) {
        door.isAttacked = false;
        resetAttack();
    }
}

/**
 * Pick a door to attack. Then, determine how long to wait before attacking. Reset the timer and begin waiting.
 */
function resetAttack() {
    const randomElement = doorsHolder[Math.floor(Math.random() * doorsHolder.length)];
    currentDoor = randomElement;
    waitTime.time = Math.floor(Math.random() * waitTime.low) + waitTime.high;
    currentFrame = 0;
    waiting = true;
}

/**
 * Increase timer. 
 * 
 * Then see if the monster is waiting. If it is and the current timer is longer then the wait time, attack the door that the monster had selected.
 * 
 * If the monster is already at a door and has been attacking for too long, check if the monster has succesfully killed the player.
 *
 */
function attackTimer() {
    currentFrame += 0.0166667;
    if (waiting && (currentFrame >= waitTime.time) && fnafState === 'terminal') {
        waiting = false;
        currentFrame = 0;
        currentDoor.isAttacked = true;
        console.log(currentDoor.id);
    }
    else if (!waiting && currentFrame >= attackTime) {
        checkAttackSuccessful();
    }

}


/**
 * If the door currently being attacked is open, kill the player. Else, reset the attack.
 */
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


/**
 * Based on the door location and state, return the image corresponding.
 */
function drawDoor(door) {
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