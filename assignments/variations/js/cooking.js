/**
 * COOKING GAME SCRIPT
 * by: Jeremy Dumont
 * 
 * Absolutly cursed code. Fair warning before going ahead...
 * 
 * 
 */

const cookingTerminal = new Terminal(
    (commands) => {
        cookingTerminal.displayWithBuffer = false;
        currentAngle += 6;

        if (pot.item_state === 'boiling') {
            potTimer++;
            console.log(potTimer);
        }

        debugAmount++;
        console.log(debugAmount);

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

let all_words = ["sink", "counter", "box", "stove", "pot", "spoon", "package"]

let playerCurrentItem = "";


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

let counter = new cookingPlace([], ['normal'],
    () => {
        placeLooks('COUNTER', counter);
    },
    (word) => {

    },

);

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
            if (pot.item_state === 'boiling') {
                pot.item_state = 'done'
            }
            cookingTerminal.print("The stoves whir quites down");
            stove.place_state = 'off';
        }
    },

);



/**
 * ITEMS
 */
let box = new cookingItem("BOX", ["unopen", "open", "empty"],
    (word) => {
        itemLooks(box);
    },
    (word) => {
        console.log(word);

        if (box.item_state === "unopen") {
            cookingTerminal.print("You open the KD box");
            box.item_state = 'open'
        }
        else if (box.item_state === "open") {
            if (word === pot) {
                cookingTerminal.print("The empty the box into the POT. The cheese PACKAGE is set aside");
                if (pot.item_state === 'empty') {
                    pot.item_state = "filled and dry";
                } else {
                    pot.item_state = "filled";
                }
                box.item_state = 'empty'
                return;
            }
            cookingTerminal.print("You can't empty the box here");
        } else {
            cookingTerminal.print("The box is already empty");
        }

    },

)

let potTimer = 0;
let potTimeRequired = 13;

let noodlesNotStuck = false;

let pot = new cookingItem("POT", ["empty", "filled and dry", "wet and empty", "filled", "boiling", "done", "has_ingredients"],
    (word) => {
        itemLooks(pot);
    },
    (word) => {
        console.log(sink.place_state);
        if (word === sink && sink.place_state === 'on') {
            if (pot.item_state === "filled and dry") {
                pot.item_state = "filled";
            } else {
                pot.item_state = "wet and empty";
            }
            cookingTerminal.print("The POT gets filled with cold running water");
            return;
        } else if (word === sink && sink.place_state === 'off') {
            cookingTerminal.print("The POT gets nothing since the sink is not on");
            return;
        }
        cookingTerminal.print("The POT can't be used like this");
    },
)

let spoon = new cookingItem("SPOON", ["null"],
    (word) => {
        itemLooks(spoon);
    },
    (word) => {
        if (word === pot) {
            if (pot.item_state === "boiling") {
                cookingTerminal.print("You stir the POT, seperating the noodles");
            } else if (pot.item_state === "has_ingredients") {
                cookingCheckWin();
            } else { cookingTerminal.print("You stir the POT, but it's kind of pointless right now"); }
        }
        else {
            cookingTerminal.print("You bang the SPOON to a distinct 3/4 polyrythym");
        }

    },
)


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


        } else if (word) {
            cookingTerminal.print("You can't use the PACKAGE like this");
        } else {
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
/**
 * FUNCTIONS
 */

let debugAmount = 0;
let currentAngle = 0;
let clock = {
    x: 575,
    y: 65,
}

function drawClock() {
    push();
    stroke("#40FD90");
    fill(0, 0, 0, 0)
    circle(clock.x, clock.y, 80)
    angleMode(DEGREES);
    push();
    translate(clock.x, clock.y);
    rotate(currentAngle);
    strokeWeight(2);
    line(0, 0, 0, -50);
    for (let ticks = 0; ticks < 60; ticks += 1) {
        point(0, -50);
        rotate(6);
    }
    pop();
    pop();
}

function cookingReset() {
    debugAmount = 0;
    currentAngle = 0;

    counter.items = [box, spoon,];
    stove.items = [pot,]
}

function placeLooks(name, place) {
    cookingTerminal.print("The " + name + " is " + place.place_state);
    placeLookItems(place);
}

function placeLookItems(place) {
    let printItems = "It currently has"
    if (place.items.length > 0) {
        for (i = 0; i < place.items.length; i++) {
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

function itemLooks(item) {
    cookingTerminal.print("The " + item.name + " is " + item.item_state);
}

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

function cookingCheckWin() {
    if (pot.item_state === 'has_ingredients') {
        cookingTerminal.reset();
        for (i = 0; i <= 45; i++) {
            rythymTerminal.print("You WIN!!!!!!!!");
        }
        cookingTerminal.print("Might not be the best, but good enough!");
    }

}


/**
 * ALL FUNCTIONS USED FOR THE COMMANDS
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

function cookingLook(second_word) {
    if (!second_word) {
        cookingTerminal.print("There is a STOVE to cook things on");
        cookingTerminal.print("There is a FRIDGE that stores food");
        cookingTerminal.print("There is a SINK with access to water");
        cookingTerminal.print("There is a COUNTER with available utilities");
        return;
    }
    for (i = 0; i < all_words.length; i++) {
        if (second_word === all_words[i]) {
            eval(second_word + '.look()');
            return;
        }
    }
    cookingTerminal.print("You can't seem to find a " + second_word + " anywhere");
};

function cookingUse(second_word, third_word) {
    if (second_word === playerCurrentItem) {
        eval(second_word + '.use(' + third_word + ')');
    } else if (second_word === 'sink' || second_word === 'stove') {
        eval(second_word + '.use(' + third_word + ')');
    } else {
        cookingTerminal.print("You aren't holding a " + second_word.toUpperCase());
    }
};

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

function cookingWait(second_word) {
    if (parseInt(second_word)) {
        currentAngle += 6 * (parseInt(second_word) - 1)
        cookingTerminal.print("You wait " + second_word + " minutes");
    } else {
        cookingTerminal.print("ERROR: " + second_word + " IS NOT A VALID");
    }
};