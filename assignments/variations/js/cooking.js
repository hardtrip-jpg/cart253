/**
 * COOKING GAME SCRIPT
 * by: Jeremy Dumont
 * 
 * Absolutly cursed code. Fair warning before going ahead...
 * 
 * In this game, players will interact with different ingredients using the LOOK, USE, GRAB, DROP, and WAIT commands to cook a bowl of Kraft Dinner.
 * 
 * Every action typed (other then Help and Menu) will advance a timer. Once that timer reaches 60, they lose the game.
 */


/**
 * This terminal connects to the functions provided throughout this script. Additionally, whenever interacted with it increases the timer and determines if the game is lost.
 */
const cookingTerminal = new Terminal(
    (commands) => {
        cookingTerminal.displayWithBuffer = false;
        currentAngle += 6;

        if (pot.item_state === 'boiling') {
            potTimer++;
            console.log(potTimer);
        }

        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];


        switch (first_word) {
            case 'hello':
                cookingTerminal.displayWithBuffer = true;
                cookingTerminal.print("Well hello there my friend!");
                if (currentAngle != 0) {
                    currentAngle -= 6;
                    debugAmount--;
                }
                break;
            case 'menu':
                changeState('menu');
                break;
            case 'help':
                cookingHelp();
                break;
            case 'look':
                cookingLook(second_word);
                break;
            case 'use':
                cookingUse(second_word, third_word);
                break;
            case 'grab':
                cookingGrab(second_word);
                break;
            case 'drop':
                cookingDrop(second_word);
                break;
            case 'wait':
                cookingWait(second_word);
                break;

            default:
                cookingTerminal.print("ERROR: " + first_word + " IS NOT VALID");
                break;
        }

        if (currentAngle >= 360) {
            cookingTerminal.reset();
            cookingTerminal.print("YOU LOSE");
        }

    }
);

/**VARIABLES*/

//used for eval() safety
let all_words = ["sink", "counter", "box", "stove", "pot", "spoon", "package"]

let playerCurrentItem = "";

let currentAngle = 0;
let clock = {
    x: 575,
    y: 65,
}

let potTimer = 0;
let potTimeRequired = 13;

/**
 * INTERACTABLES - All interactables have references to the commands Look and Use which are then called in the terminal. This allows items to hold their own logic.
 */

//Cooking Places are locations that have minor functionality while holding an array of items.
class cookingPlace {
    constructor(items, states, look, use) {
        this.items = items
        this.states = states
        this.look = look;
        this.use = use;
        this.place_state = states[0];
    }

    reset() {
        this.place_state = states[0];
    }

}

//Cooking Items are objects that can be held with major functionality
class cookingItem {
    constructor(name, states, look, use) {
        this.name = name;
        this.states = states;
        this.look = look;
        this.use = use;
        this.item_state = states[0];
    }

    reset() {
        this.item_state = states[0];
    }

}



/**PLACES*/

//When used, it either is turned on or off.
let sink = new cookingPlace([], ['off', 'on'],
    () => {
        placeLooks('SINK', sink);
    },
    (word) => {
        if (sink.place_state === 'off') {
            cookingTerminal.print("The sink begins to shoot water");
            sink.place_state = sink.states[1];
        } else {
            cookingTerminal.print("The sink fizzles one last drop");
            sink.place_state = sink.states[0];
        }
    },

);

// Only has look functionality
let counter = new cookingPlace([], ['normal'],
    () => {
        placeLooks('COUNTER', counter);
    },
    (word) => {
    },

);

//When it is turned on, it checks to see if the pot is being held. If not, the pot is set to boiling.
//When turned off, it checks to see if the pot is boling and the timer is done. If yes, the set the pot to done.
let stove = new cookingPlace([], ['off', 'on'],
    () => {
        placeLooks('STOVE', stove);
    },
    (word) => {
        if (stove.place_state === 'off') {
            cookingTerminal.print("The stove lights a red glow");
            stove.place_state = 'on';
            if (playerCurrentItem === '' && pot.item_state === 'filled') {
                pot.item_state = 'boiling';
            }
        } else {
            if (pot.item_state === 'boiling' && potTimer === potTimeRequired) {
                pot.item_state = 'done'
            }
            cookingTerminal.print("The stoves whir quites down");
            stove.place_state = 'off';
        }
    },

);



/**ITEMS*/

/**
 * The use function either opens the box, empties the box in the pot, or warns user that the box is already emptied.
 */
let box = new cookingItem("BOX", ["unopen", "open", "empty"],
    (word) => {
        itemLooks(box);
    },
    (word) => {

        if (box.item_state === "unopen") {
            cookingTerminal.print("You open the KD box");
            box.item_state = 'open'
        }
        else if (box.item_state === "open") {

            if (word === pot) {
                cookingTerminal.print("The empty the box into the POT. The cheese PACKAGE is set aside");

                //Check if pot has water or not
                if (pot.item_state === 'empty') {
                    pot.item_state = "filled and dry";
                }
                else {
                    pot.item_state = "filled";
                }

                box.item_state = 'empty'
                return;
            }
            cookingTerminal.print("You can't empty the box here");
        }
        else {
            cookingTerminal.print("The box is already empty");
        }

    },

)


/**
 * The use function checks if pot is being used with sink. If so, fill the pot. If either the sink is turned off or the pot is not being used under the sink, give a warning.
 */
let pot = new cookingItem("POT", ["empty", "filled and dry", "wet and empty", "filled", "boiling", "done", "has_ingredients"],
    (word) => {
        itemLooks(pot);
    },
    (word) => {

        if (word === sink && sink.place_state === 'on') {
            if (pot.item_state === "filled and dry") {
                pot.item_state = "filled";
            }
            else {
                pot.item_state = "wet and empty";
            }

            cookingTerminal.print("The POT gets filled with cold running water");
            return;

        }
        else if (word === sink && sink.place_state === 'off') {

            cookingTerminal.print("The POT gets nothing since the sink is not on");
            return;

        }

        cookingTerminal.print("The POT can't be used like this");
    },
)

/**
 * If the spoon is used on pot while boiling, give message. If pot is at final stage, check the win state. Else, give a warning
 */
let spoon = new cookingItem("SPOON", ["null"],
    (word) => {
        itemLooks(spoon);
    },
    (word) => {
        if (word === pot) {
            if (pot.item_state === "boiling") {
                cookingTerminal.print("You stir the POT, seperating the noodles");
            }

            else if (pot.item_state === "has_ingredients") {
                cookingCheckWin();
            }

            else {
                cookingTerminal.print("You stir the POT, but it's kind of pointless right now");
            }
        }

        else {
            cookingTerminal.print("You bang the SPOON to a distinct 3/4 polyrythym");
        }

    },
)

/**
 * If used with pot, run a couple of checks and attribute to the correct state. Else, check if used with another item and give a warning. If used without another keyword, check if the package is open or not.
 */
let package = new cookingItem("PACKAGE", ["unopen", "open", "empty"],
    (word) => {
        itemLooks(package);
    },
    (word) => {
        if (word === pot) {
            switch (package.item_state) {
                case 'unopen':
                    cookingTerminal.print("The PACKAGE isn't open");
                    break;
                case 'open':
                    if (pot.item_state === 'done') {
                        cookingTerminal.print("You pour the PACKAGE into the POT");
                        package.item_state = 'empty';
                        pot.item_state = 'has_ingredients';
                    }
                    else {
                        cookingTerminal.print("The POT isn't ready for the PACKAGE");
                    }

                    break;
                case 'empty':
                    cookingTerminal.print("The PACKAGE is already empty.");
                    break;
            }

        }

        else if (word) {
            cookingTerminal.print("You can't use the PACKAGE like this");
        }

        else {
            switch (package.item_state) {
                case 'unopen':
                    cookingTerminal.print("You open the PACKAGE");
                    package.item_state = 'open';
                    break;
                case 'open':
                    cookingTerminal.print("The PACKAGE is already open. It might be used in something else now");
                    break;
                case 'empty':
                    cookingTerminal.print("The PACKAGE is already empty.");
                    break;
            }


        }

    },
)
/**FUNCTIONS*/

/**
 * Draws a circular clock in the top right. Draws 60 ticks in a circular motion and a line based on the current angle.
 */
function drawClock() {
    push();
    //Draw the clock background
    stroke("#40FD90");
    fill(0, 0, 0, 0)
    circle(clock.x, clock.y, 80)
    angleMode(DEGREES);

    push();

    translate(clock.x, clock.y);
    rotate(currentAngle);
    strokeWeight(2);
    //Draw the line
    line(0, 0, 0, -50);

    for (let ticks = 0; ticks < 60; ticks += 1) {
        point(0, -50);
        rotate(6);
    }
    pop();
    pop();
}

/**
 * Called when reseting the cooking game. Adds items to locations and resets current timer.
 */
function cookingReset() {
    currentAngle = 0;

    counter.items = [box, spoon,];
    stove.items = [pot,]
}

/**
 * Called when the cooking game is started. Resets everything and displays helpful starting message.
 */
function cookingStart() {
    cookingTerminal.reset();
    cookingReset();
    cookingTerminal.print("       Welcome to Cooking");
    cookingTerminal.print("In this game you must cook a bowl of");
    cookingTerminal.print("          KRAFT DINNER!");
    cookingTerminal.print(" ");
    cookingTerminal.print("You can start with the LOOK command");
    cookingTerminal.print("Type HELP to see the command reference");
}


/**
 * Grabs a Name and Place and prints out the name and state of the place. Then passes the place to another function.
 */
function placeLooks(name, place) {
    cookingTerminal.print("The " + name + " is " + place.place_state);
    placeLookItems(place);
}

/**
 * Loops through all items at a specific place to create a string that lists everything at said location. 
 * 
 * The game was originaly going to have more items but I ran out of time. That's why the script feels much more feature full.
 */
function placeLookItems(place) {
    //Base string to printed
    let printItems = "It currently has"

    if (place.items.length > 0) {
        for (i = 0; i < place.items.length; i++) {

            //If item is being held, don't add it to the string.
            if (place.items[i].name.toLowerCase() === playerCurrentItem) {

            }
            else if (i === (place.items.length - 1) && place.items.length > 1) {
                printItems += " and a " + place.items[i].name;
            }

            else {
                printItems += " a " + place.items[i].name + ",";
            }
        }
        cookingTerminal.print(printItems);
    }
    else {
        cookingTerminal.print("It currently holds nothing");
    }
}

/**
 * Print the items name and state
 */
function itemLooks(item) {
    cookingTerminal.print("The " + item.name + " is " + item.item_state);
}


/**
 * If pot fills winning conditions, display winning message
 */
function cookingCheckWin() {
    if (pot.item_state === 'has_ingredients') {
        cookingTerminal.reset();
        for (i = 0; i <= 45; i++) {
            rythymTerminal.print("You WIN!!!!!!!!");
        }
        cookingTerminal.print("Might not be the best, but good enough!");
    }

}


/**ALL FUNCTIONS USED FOR THE COMMANDS*/

/**
 * This command doesn't move timer. Display a list of the commands that can be used in game
 */
function cookingHelp() {
    currentAngle -= 6;
    debugAmount--;
    cookingTerminal.print("LOOK [where you want to look]");
    cookingTerminal.print("USE [what you want to use]");
    cookingTerminal.print("GRAB [what you want to pick up]");
    cookingTerminal.print("DROP [what youre holding]");
    cookingTerminal.print("WAIT [how long you want to wait]");
};

/**
 * Checks if a second word was typed. If not, list places that can be seen and used. If a second word was used, check if its safe and then call it's look function.
 */
function cookingLook(second_word) {
    if (!second_word) {
        cookingTerminal.print("There is a STOVE to cook things on");
        cookingTerminal.print("There is a SINK with access to water");
        cookingTerminal.print("There is a COUNTER with available utilities");
        return;
    }
    for (i = 0; i < all_words.length; i++) {
        //If second word is a word that can be typed
        if (second_word === all_words[i]) {
            eval(second_word + '.look()');
            return;
        }
    }
    cookingTerminal.print("You can't seem to find a " + second_word + " anywhere");
};

/**
 * If the second word matches the currently held item, call that objects 'use' function and pass the third word if any. If the second word was a location, call that locations use and pass the word. Otherwise give a warning.
 */
function cookingUse(second_word, third_word) {
    if (second_word === playerCurrentItem) {
        eval(second_word + '.use(' + third_word + ')');
    } else if (second_word === 'sink' || second_word === 'stove') {
        eval(second_word + '.use(' + third_word + ')');
    } else {
        cookingTerminal.print("You aren't holding a " + second_word.toUpperCase());
    }
};

/**
 * Check if player is holding anything. If not make sure they didn't type a location. If they did return a warning. If they didn't make sure the word typed is safe. If it is pick up the item.
 */
function cookingGrab(second_word) {
    if (playerCurrentItem === "") {
        if (second_word === 'sink' || second_word === 'stove' || second_word === 'counter') {
            cookingTerminal.print("You can't pick up the " + second_word.toUpperCase());
            return;
        }
        for (i = 0; i < all_words.length; i++) {
            if (second_word === all_words[i]) {
                playerCurrentItem = second_word;
                cookingTerminal.print("You pick up the " + second_word.toUpperCase());
                return;
            }
        }
    } else {
        cookingTerminal.print("You are currently holding a " + playerCurrentItem.toUpperCase());
    }
};

/**
 * If the player is holding something, get rid of it. However, if the player drops the a filled pot and the stove is on, change the pot state to boiling. If the player isn't holding the thing they want to to drop, give a warning.
 */
function cookingDrop(second_word) {
    if (second_word === playerCurrentItem) {
        if (second_word === 'pot' && stove.place_state === 'on' && pot.item_state === 'filled') {
            pot.item_state = 'boiling';

        }

        playerCurrentItem = "";
        cookingTerminal.print("You put back the " + second_word.toUpperCase());


        return;
    }
    cookingTerminal.print("You aren't holding a " + second_word.toUpperCase());
};

/**
 * Check if second word is a number. If it is add it to the timer. If not provide a warning.
 */
function cookingWait(second_word) {
    if (parseInt(second_word)) {
        currentAngle += 6 * (parseInt(second_word) - 1)
        cookingTerminal.print("You wait " + second_word + " minutes");
    } else {
        cookingTerminal.print("ERROR: " + second_word + " IS NOT A VALID");
    }
};