let fnafTerminal = new Terminal(
    (commands) => {
        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];

        switch (first_word) {
            default:
                break;
        }
    }
)

let fnafState = 'terminal'



function fnafDraw(){
    switch(fnafState){
        case('terminal'):
            fnafTerminal.drawTerminal();
            break;
        case('hallway'):
            break;
    }
    
}



function fnafStart(){
    fnafTerminal.reset();
    fnafTerminal.print("     Welcome to the Office game ");
    fnafTerminal.print("When you feel ready, you may look up... ");
}

function fnafMouseCheck(){
    switch(fnafState){
        case('terminal'):
            break;
        case('hallway'):
            break;
    }

}

function fnafKeyCheck(){
    switch(fnafState){
        case('terminal'):
            break;
        case('hallway'):
            break;
    }

}


function fnafEndState(){
    switch(fnafState){
        case('terminal'):
            break;
        case('hallway'):
            break;
    }

}

function fnafStartState(){
    switch(fnafState){
        case('terminal'):
            break;
        case('hallway'):
            break;
    }

}


function fnafChangeState(newState) {
    if (newState != state) {
        fnafEndState();
        state = newState;
        fnafStartState();
    }
}