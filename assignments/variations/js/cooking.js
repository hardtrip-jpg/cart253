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
            case 'help':
                currentAngle -= 6;
                debugAmount--;
                cookingTerminal.print("LOOK [where you want to look]");
                cookingTerminal.print("USE [what you want to use]");
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
                cookingTerminal.print("You can't seem to find a " + second_word + " anywhere");
                break;
            case 'use':
                if (second_word === playerCurrentItem){
                    eval(second_word + '.use(' + third_word + ')');
                }else if(second_word === 'sink' || second_word === 'fridge' || second_word === 'stove'){
                    eval(second_word + '.use(' + third_word + ')');
                }else{
                    cookingTerminal.print("You can't use " + second_word.toUpperCase());
                }
                
                break;
            case 'grab':
                if (playerCurrentItem === ""){
                    if (second_word === 'sink' || second_word === 'fridge' || second_word === 'stove' || second_word === 'counter'){
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
                }else{
                    cookingTerminal.print("You are currently holding a " + playerCurrentItem.toUpperCase());
                }
                
                break;
            case 'drop':
                    if (second_word === playerCurrentItem){
                        playerCurrentItem = 0;
                        cookingTerminal.print("You put back the " + second_word.toUpperCase());
                    }
                    cookingTerminal.print("You aren't holding a " + second_word.toUpperCase());
                break;
            case 'wait':
                if (parseInt(second_word)){
                    currentAngle += 6*(parseInt(second_word) - 1)
                    cookingTerminal.print("You wait " + second_word + " minutes");
                }else{
                    cookingTerminal.print("ERROR: " + second_word + " IS NOT A VALID");
                }
                
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

let all_words = ["sink", "counter", "box", "stove", "fridge", "pot", "spoon", "milk", "butter", "sausage", "pan", "spatula", "knife", "package"]

let playerCurrentItem = "";


class cookingPlace {
    constructor(items, states, look, use) {
        this.items = items
        this.states = states
        this.look = look;
        this.use = use;
        this.place_state = states[0];
    }

    reset(){
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
        this.item_state = states[0];
    }

    reset(){
        this.active_state = states[0];
    }

}



let sink = new cookingPlace([], ['off', 'on'],
    () => {
        placeLooks('SINK', sink);
    },
    (word) => {
        if (sink.place_state === 'off'){
            cookingTerminal.print("The sink begins to shoot water");
            sink.place_state = 'on';
        }else{
            cookingTerminal.print("The sink fizzles one last drop");
            sink.place_state = 'off';
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
        if (stove.place_state === 'off'){
            cookingTerminal.print("The stove lights a red glow");
            stove.place_state = 'on';
        }else{
            cookingTerminal.print("The stoves whir quites down");
            stove.place_state = 'off';
        }
    },

);

let fridge = new cookingPlace([], ['closed', 'open'],
    () => {
        if (fridge.place_state === 'open'){
            placeLooks('FRIDGE', fridge);
        }
        else{
            cookingTerminal.print("The fridge is closed. You can't see what's inside");
        }
        
    },
    (word) => {
        if (fridge.place_state === 'closed'){
            cookingTerminal.print("The fridge lets a chilling freeze escape");
            fridge.place_state = 'open';
        }else{
            cookingTerminal.print("The door emits a loud band when shut");
            fridge.place_state = 'closed';
        }

    },
);


/**
 * ITEMS
 */
let box = new cookingItem("BOX", ["unopen", "open", "empty"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)

let pot = new cookingItem("POT", ["empty", "filled and dry", "wet and empty", "boiling", "done", "has_ingrediants"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)

let spoon = new cookingItem("SPOON", ["out", "in"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)

let milk = new cookingItem("MILK", ["cool", "warm"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)

let butter = new cookingItem("BUTTER", ["cool", "warm"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)

let sausage = new cookingItem("SAUSAGE", ["uncooked", "cooked", "burnt"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)

let pan = new cookingItem("PAN", ["empty", "has_stuff", "cooking", "cooked", "cut"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)

let spatula = new cookingItem("SPATULA", ["null"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)
let knife = new cookingItem("KNIFE", ["null"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)
let package = new cookingItem("PACKAGE", ["unopen", "open", "empty"],
    (word) => {

    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
)
/**
 * ITEMS
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

    counter.items = [box, knife, spatula,];
}

function placeLooks(name, place) {
    cookingTerminal.print("The " + name + " is " + place.place_state);
    placeLookItems(place);
}

function placeLookItems(place) {
    let printItems = "It currently has"
    if (place.items.length > 0) {
        for (i = 0; i < place.items.length; i++) {
            if (place.items[i].name.toLowerCase() === playerCurrentItem){
                
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

function cookingStart(){
    cookingTerminal.reset();
    cookingReset();
    cookingTerminal.print("       Welcome to Cooking");
    cookingTerminal.print("In this game you must cook a bowl of");
    cookingTerminal.print("  KRAFT DINNER AND SAUSAGE BITS!");
    cookingTerminal.print(" ");
    cookingTerminal.print("You can start with the LOOK command");
    cookingTerminal.print("Type HELP to see the command reference");
}