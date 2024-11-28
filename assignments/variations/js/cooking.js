let cookingTerminal = new Terminal(
    (commands) => {
        cookingTerminal.displayWithBuffer = false;
        currentAngle += 6;
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
            case 'look':
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
                cookingTerminal.print("You can't seem to find a " + second_word + " anywhere.");
                break;
            case 'help':
                currentAngle -= 6;
                debugAmount--;
                cookingTerminal.print("LOOK [where you want to look]");
                cookingTerminal.print("USE [what you want to use]");
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

let all_words = ["sink", "counter", "box"]

class cookingPlace {
    constructor(items, states, look, place, use) {
        this.items = items
        this.states = states
        this.look = look;
        this.place = place;
        this.use = use;
        this.active_state = states[0];
    }

}

class cookingItem {
    constructor(name, states, look, place, use) {
        this.name = name;
        this.states = states;
        this.look = look;
        this.place = place;
        this.use = use;
        this.active_state = states[0];
    }

}



let sink = new cookingPlace([], ['off', 'on'],
    (word) => {
        placeLooks('SINK', sink);
    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
);

let counter = new cookingPlace([], ['normal'],
    () => {
        placeLooks('COUNTER', counter);
    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
);


let box = new cookingItem("BOX", ["unopen", "open", "empty"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)


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

    counter.items = [box, box, box, box, box, box, box, box, box, box];
}

function placeLooks(name, place) {
    cookingTerminal.print("The " + name + " is " + place.active_state);
    placeLookItems(place);
}

function placeLookItems(place) {
    let printItems = "It currently has a "
    if (place.items.length > 0) {
        for (i = 0; i < place.items.length; i++) {
            if (i === (place.items.length - 1) && place.items.length > 1) {
                printItems += " and a " + place.items[i].name;
            }
            else if (i === 0) {
                printItems += place.items[i].name;
            }
            else {
                printItems += " a " + place.items[i].name + ",";
                // if (printItems.length > 50) {
                //     cookingTerminal.print(printItems);
                //     printItems = ""
                // }
            }
        }
        cookingTerminal.print(printItems);
    }
    else {
        cookingTerminal.print("It currently holds nothing");
    }
}
