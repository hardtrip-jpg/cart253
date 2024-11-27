class Terminal {

    constructor(commandsCheck){
        this.commandsCheck = commandsCheck;
    }

    test_string = "";
    all_commands = [];
    toDisplay = [];
    bufferLength = 5;
    displayBuffer = this.bufferLength;

    caretTime = 30;
    currentCaret = this.caretTime;
    caretVisible = false;


keyCheck() {
    if (key.length === 1){
        this.test_string += key;
    }

    if (keyCode === ENTER){
        this.parseCommand(this.test_string);
        this.test_string = "";
    }

    if (keyCode === DELETE || keyCode === BACKSPACE){
        this.test_string = this.test_string.slice(0, -1);
    }
}

printTerminalText(text){
    this.all_commands.push(text);

        if (this.all_commands.length > 15){
            this.all_commands.shift();
        }
}

toDisplayCheck(){
    if (this.displayBuffer === this.bufferLength){
        if(this.toDisplay[0]){
            this.printTerminalText(this.toDisplay[0]);
            this.toDisplay.shift();
            this.bufferLength = 0;
        }
    }
    else(
        this.bufferLength++
    )

    
}


parseCommand(text){
    if (text === ''){
        this.toDisplay.push("ERROR: ENTER VALID COMMAND");
        return;
    }
    this.toDisplay.push(text);
    let commands = text.toLowerCase().trim().split(/\s+/);
    this.commandsCheck(commands)
    //console.log(commands);
}

displayCaret(pos){
    if (this.currentCaret === this.caretTime){
        this.caretVisible = !this.caretVisible;
        this.currentCaret = -1;
    }

    if (this.caretVisible){
        push();
        stroke("#40FD90");
        line(12 + pos, 445, 12 + pos, 468);
        pop();
    }

    this.currentCaret++;

}

drawTerminal(){
    push();
        background("#000000");

        this.toDisplayCheck();

        fill("#40FD90");
        textSize(25);
        textFont(terminalFont);

        let text_width = textWidth(this.test_string)

        let currentHeight = 490;
        for (let i = this.all_commands.length + 1; i > -1; i--){
            text((this.all_commands[i]), 10, currentHeight);
            currentHeight -= 30;
        }

        text((this.test_string), 10, 470);
    pop();
        this.displayCaret(text_width);
}
}