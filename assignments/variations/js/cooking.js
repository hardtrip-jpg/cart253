let cookingTerminal = new Terminal(
    (commands) => {
        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];

    switch (first_word){
        case 'hello':
            //toDisplay.push("");
            cookingTerminal.toDisplay.push("Well hello there my friend!");
            break;
        case 'test':
            changeState('test');
            break;
        default:
            cookingTerminal.toDisplay.push("ERROR: " + first_word + " IS NOT A VALID COMMAND");
            break;
    }
    }
);

