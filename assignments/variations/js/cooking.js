let cookingTerminal = new Terminal(
    (commands) => {
        cookingTerminal.displayWithBuffer = false;
        currentAngle += 6;
        debugAmount++;
        console.log(debugAmount);

        let first_word = commands[0];
        let second_word = commands[1];
        let third_word = commands[2];
    

    switch (first_word){
        case 'hello':
            cookingTerminal.displayWithBuffer = true;
            cookingTerminal.print("Well hello there my friend!");
            if (currentAngle != 0){
                currentAngle -= 6;
            }
            break;
        case 'menu':
            changeState('menu');
            break;
        case 'look':
            if (!second_word){
                cookingTerminal.print("There is a STOVE to cook things on");
                cookingTerminal.print("There is a FRIDGE that stores food");
                cookingTerminal.print("There is a SINK with access to water");
                cookingTerminal.print("There is a COUNTER with available utilities");
                return;
            }
            for (i = 0; i < all_words.length; i++){
                if (second_word === all_words[i]){
                    eval(second_word + '.look()');
                    return;
                }
            }
            cookingTerminal.print("You can't seem to find a " + second_word + " anywhere.");
            break;
        default:
            cookingTerminal.print("ERROR: " + first_word + " IS NOT VALID");
            break;
    }

    if (currentAngle >= 360){
        cookingTerminal.reset();
        cookingTerminal.print("YOU LOSE");
    }

    }
);

let all_words =  ["sink", "counter", "box"]

class cookingPlace{
    constructor (items, states, look, place, use){
        this.items = items
        this.states = states
        this.look = look;
        this.place = place;
        this.use = use;
        this.active_state = states[0];
    }
    
}

class cookingItem{
    constructor(states, look, place, use){
       this.states = states;
        this.look = look;
        this.place = place;
        this.use = use;
        this.active_state = states[0];
    }
    
}



let sink = new cookingPlace([],['off', 'on'], 
    (word) => {
        placeLooks('SINK',sink);
    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
);

let counter = new cookingPlace([],['normal'], 
    () => {
        placeLooks('COUNTER', counter);
    },
    (secondWord, thirdWord) => {

    },
    (word) => {

    },
);


let box = new cookingItem(["unopen", "open", "empty"],
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

function drawClock(){
    push();
    stroke("#40FD90");
    fill("#000000")
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

function cookingReset(){
    debugAmount = 0;
    currentAngle = 0;

    counter.items = [box]
}

function placeLooks(name, place){
    cookingTerminal.print("The " + name + " is " + place.active_state);
}
