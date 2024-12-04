/**
 * Terminal Varitions script
 * by: Jeremy Dumont
 * 
 * This script defines the base Terminal class. The Terminal can take text inputs and compare those inputs to a list of possible commands. Those commands are defined when a terminal is created. Terminals display a caret, text with a buffer, and will split strings that needs to be printed into seperate strings to fit the Terminal display size.
 */
class Terminal {

    //When creating a new terminal, you must define an anonymous function that will take as a parameter an array of typed commands.
    constructor(commandsCheck) {
        this.commandsCheck = commandsCheck;
    }

    //This variable holds the currently inputed text
    test_string = "";

    //This array holds all the text that is being drawn in the draw function. 
    all_commands = [];

    //This array holds all future text that will be added to the all commands array
    toDisplay = [];

    /**Variables are for the buffering logic when displaying text*/

    displayWithBuffer = true;

    //This is the potential length of the buffer
    bufferDifferential = [1, 15];
    //This value will to a random value based on the bufferDifferential
    bufferLength = 5;
    //This value will be added onto and compared to buffer length
    displayBuffer = this.bufferLength;

    /**Variables for the Caret */
    caretTime = 30;
    currentCaret = this.caretTime;
    caretVisible = false;


    inputEnabled = true;

    displaySize = 59;

    /**
     * This function resets a terminal to a blank screen
     */
    reset() {
        this.all_commands = [];
        this.toDisplay = [];
        this.inputEnabled = true;
    }

    /**
     * This function is only used outside of the Terminal class to easily add text to the Terminal
     */
    print(text) {
        this.toDisplay.push(text);
    }

    /**
     * This function will check key presses and add or remove to the test_string variable
     */
    keyCheck() {
        //Check if this terminal can take an input
        if (this.inputEnabled) {
            //If a key is pressed, add it to the string holder
            if (key.length === 1) {
                this.test_string += key;
            }
            //If ENTER is pressed, pass all currently inputed text to the parseCommand function, then reset test_string
            if (keyCode === ENTER) {
                this.parseCommand(this.test_string);
                this.test_string = "";
            }
            //If DELETE or BACKSPACE is pressed, remove the last letter from test_string
            if (keyCode === DELETE || keyCode === BACKSPACE) {
                this.test_string = this.test_string.slice(0, -1);
            }
        }
    }

    /**
    * This function takes the text that was entered and splits it up into an array which is then passed to commandsCheck function. It seperates words uniquly based on spaces.
    */
    parseCommand(text) {
        //If the text field is empty, print an error
        if (text === '') {
            this.toDisplay.push("ERROR: ENTER A COMMAND");
            return;
        }

        //Print the text that was just entered
        this.toDisplay.push(text);
        //Split the text into an array based on spaces
        let commands = text.toLowerCase().trim().split(/\s+/);
        //Pass the array created to the commandsCheck function (which was set up in the constructor)
        this.commandsCheck(commands)
    }



    /**
    * This function is called on every draw call. It passed text from the toDisplay array to the printTerminalText function. The passing is delayed at every line which a randomized buffer.
    */
    toDisplayCheck() {
        if (this.toDisplay[0]) {
            if (this.displayWithBuffer) {
                if (this.displayBuffer === this.bufferLength) {

                    //Pass text to printTermalText, reset display buffer, and assign a new randomized buffer length
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

    /**
     * This function splits text that is about to displayed into different lines if the string is too long. Additionally if the current amount of lines displayed to high, it'll remove the oldest line to make space.
     */
    printTerminalText(text) {
        let pushText = text

        //Create a new line for every string over displaySize
        while (pushText.length > this.displaySize + 1) {
            let curText = pushText.substr(0, this.displaySize);

            //Adds the new subtracted line to the all_commands array
            this.all_commands.push(curText);

            pushText = pushText.substr(this.displaySize);
            console.log(pushText.length);
        }


        this.all_commands.push(pushText);

        //If the all_commands array is too big, make it shorter
        while (this.all_commands.length > 14) {
            this.all_commands.shift();
        }

    }




    /**
     * This function manages displaying the Caret line. The caret will flash based on a pre-determined buffer. The caret is displayed to match a position passed to this function.
     */
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

    /**
     * This function is mainly called outside of the class. It draws everything related to the terminal. First, it calls the toDisplayCheck function to confirm the text it is supposed to draw. Then, it creates a variable to hold every line in the all_commands array. Every line is seperated with the string "\n". Then the actual text is drawn. First, a textbox for the allText variable. Then the current text entered by the user. Finally, the caret is drawn based on the width of the test_string textbox.
     */
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
        textWrap(CHAR);
        rectMode(CORNERS);
        text((allText), 13, 5);
        pop();
        text((this.test_string), 10, 470, 620);
        pop();
        this.displayCaret(text_width);
    }

}