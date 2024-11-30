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

}

function fnafMouseCheck(){

}

function fnafKeyCheck(){

}