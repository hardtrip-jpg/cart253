class Terminal {

    constructor(commandsCheck) {
        this.commandsCheck = commandsCheck;
    }

    test_string = "";
    all_commands = [];
    toDisplay = [];

    displayWithBuffer = true;
    bufferDifferential = [1, 15];
    bufferLength = 5;
    displayBuffer = this.bufferLength;

    caretTime = 30;
    currentCaret = this.caretTime;
    caretVisible = false;

    inputEnabled = true;

    displaySize = 50;
    reset() {
        this.all_commands = [];
        this.toDisplay = [];
        this.inputEnabled = true;
    }

    print(text) {
        this.toDisplay.push(text);
    }


    keyCheck() {
        if (this.inputEnabled) {
            if (key.length === 1) {
                this.test_string += key;
            }

            if (keyCode === ENTER) {
                this.parseCommand(this.test_string);
                this.test_string = "";
            }

            if (keyCode === DELETE || keyCode === BACKSPACE) {
                this.test_string = this.test_string.slice(0, -1);
            }
        }
    }

    printTerminalText(text) {
        let pushText = text
        while (pushText.length > this.displaySize + 1) {
            let curText = pushText.substr(0, this.displaySize);
            this.all_commands.push(curText);
            pushText = pushText.substr(this.displaySize);
            console.log(pushText.length);
        }

        this.all_commands.push(pushText);

        while (this.all_commands.length > 14) {
            this.all_commands.shift();
        }

    }

    toDisplayCheck() {
        if (this.toDisplay[0]) {
            if (this.displayWithBuffer) {
                if (this.displayBuffer === this.bufferLength) {
                    this.printTerminalText(this.toDisplay[0]);
                    this.toDisplay.shift();
                    this.displayBuffer = 0;
                    this.bufferLength = Math.floor(Math.random() * this.bufferDifferential[1]) + this.bufferDifferential[0];
                }
                else {
                    this.displayBuffer++;
                }
            }
            else {
                this.printTerminalText(this.toDisplay[0]);
                this.toDisplay.shift();
            }

        }


    }



    parseCommand(text) {
        if (text === '') {
            this.toDisplay.push("ERROR: ENTER A COMMAND");
            return;
        }
        this.toDisplay.push(text);
        let commands = text.toLowerCase().trim().split(/\s+/);
        this.commandsCheck(commands)
    }

    displayCaret(pos) {
        if (this.currentCaret === this.caretTime) {
            this.caretVisible = !this.caretVisible;
            this.currentCaret = -1;
        }

        if (this.caretVisible && this.inputEnabled) {
            push();
            stroke("#40FD90");
            line(12 + pos, 445, 12 + pos, 468);
            pop();
        }

        this.currentCaret++;

    }

    drawTerminal() {
        push();
        background("#000000");

        this.toDisplayCheck();

        fill("#40FD90");
        textSize(25);
        textFont(terminalFont);

        let text_width = textWidth(this.test_string);

        let allText = ""
        for (let i = 0; i < this.all_commands.length; i++) {
            let currentText = this.all_commands[i]
            allText += "\n" + currentText;
        }
        push();
        rectMode(CORNERS);
        text((allText), 10, 5, 620, 463);
        pop();
        text((this.test_string), 10, 470, 620);
        pop();
        this.displayCaret(text_width);
    }

}