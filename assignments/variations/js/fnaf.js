let fnafTerminal = new Terminal(
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



function fnafDraw() {
    switch (fnafState) {
        case ('terminal'):
            fnafTerminal.drawTerminal();
            break;
        case ('hallway'):
            background("#FFFFFF");
            text("woah youre office", 320, 240);
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
            fnafChangeState("hallway");
            break;
        case 'hallway':
            fnafChangeState("terminal");
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