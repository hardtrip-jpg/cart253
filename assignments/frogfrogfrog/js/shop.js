/**
 * Shop FrogFrogFrog script
 * by: Jeremy Dumont
 * 
 * This script all the functions used for the shop state.
 */

"use strict";

//Button that changes state back to tounge state
const exitShopButton = new button(15, 15, 50, 50, () => {
    changeState('Tounge');
})

//Object that holds upgrade values
class upgrade {
    constructor(level, price, priceRate, currentValue, maxValue) {
        //How many times upgrade has been purchased
        this.level = level;
        //Price of value. Will change with every upgrade
        this.price = price;
        //Determines how quick speed prices update
        this.priceRate = priceRate;
        //Current value the upgrade is at
        this.currentValue = currentValue;
        //Max value an upgrade can reach
        this.maxValue = maxValue;
    }

    is_active = true;
};

/**
 * The main upgrade system. Combines upgrade values, a unique upgrade function, and a button that can be used to purchase upgrade.
 */
class shopUpgradeButton {

    constructor(upgrade, upgradeFunction, button) {
        this.upgrade = upgrade;
        this.upgradeFunction = upgradeFunction
        this.button = button;
        //This connects the uniqly defined function to the buttons notify variable.
        button.notify = () => {
            if (this.upgrade.is_active) {
                this.upgradeFunction();
            }
        };
    };
};


/**
 * Defines upgrade for increasing tounge speed
 */
let toungeSpeedUpgrade = new shopUpgradeButton(
    new upgrade(1, 2, 1.8, 2, 37),
    () => {
        //Checks if player has enough money
        if (checkMoney(toungeSpeedUpgrade.upgrade.price)) {

            //Update upgrade price based on rate (exponentialy)
            toungeSpeedUpgrade.upgrade.price = getNewPrice(toungeSpeedUpgrade.upgrade);

            //Increase speed logrithmicaly
            toungeSpeedUpgrade.upgrade.currentValue = Math.round((Math.log(toungeSpeedUpgrade.upgrade.level) + toungeSpeedUpgrade.upgrade.level) * 2.5);
            curInventory.toungeSpeed = toungeSpeedUpgrade.upgrade.currentValue;

            //Update level
            toungeSpeedUpgrade.upgrade.level++;

            //Compare if current value matchs max value. If so, deactivate upgrade
            if (toungeSpeedUpgrade.upgrade.currentValue >= toungeSpeedUpgrade.upgrade.maxValue) {
                toungeSpeedUpgrade.upgrade.is_active = false;
            }
        }
    },
    new button(500, 100, 80, 50, () => { }),

);

/**
 * Adds one fly to the current fly holder
 */
let flySpawnUpgrade = new shopUpgradeButton(
    new upgrade(1, 2, 2, 1, 23),
    () => {
        //Checks if player has enough money
        if (checkMoney(flySpawnUpgrade.upgrade.price)) {

            //Update upgrade price based on rate (exponentialy)
            flySpawnUpgrade.upgrade.price = getNewPrice(flySpawnUpgrade.upgrade);

            //Create a new fly and change it's variables to random new ones
            flyHolder.push(structuredClone(baseFly));
            flyHolder[flySpawnUpgrade.upgrade.currentValue].speed = random(2, 3);
            flyHolder[flySpawnUpgrade.upgrade.currentValue].x = random(0, 600);
            flyHolder[flySpawnUpgrade.upgrade.currentValue].y = random(0, 400);

            //Update current value
            flySpawnUpgrade.upgrade.currentValue++;
            curInventory.flyAmount = flySpawnUpgrade.upgrade.currentValue;

            console.log("New Fly Amount: " + str(curInventory.flyAmount))
            flySpawnUpgrade.upgrade.level++;

            //Compare if current value matchs max value. If so, deactivate upgrade
            if (flySpawnUpgrade.upgrade.currentValue >= flySpawnUpgrade.upgrade.maxValue) {
                flySpawnUpgrade.upgrade.is_active = false;
            }
        }
    },
    new button(500, 190, 80, 50, () => { }),
)

let passThroughUpgrade = new shopUpgradeButton(
    new upgrade(1, 50, 0, 0, 1),
    () => {
        //Checks if player has enough money
        if (checkMoney(passThroughUpgrade.upgrade.price)) {

            //Make it so tounge can pass and deactiate upgrade
            curInventory.cannotPass = false;
            passThroughUpgrade.upgrade.is_active = false;
            console.log("Pass Through Activated");
        }
    },
    new button(500, 280, 80, 50, () => { }),
)

/**
 * Adds a new tounge to the frog
 */
let addTongueUpgrade = new shopUpgradeButton(
    new upgrade(1, 100, 1.8, 1, 3),
    () => {
        //Checks if player has enough money
        if (checkMoney(addTongueUpgrade.upgrade.price)) {
            //Upgrades price by 100
            addTongueUpgrade.upgrade.price += 100;
            //Create new tounge
            frog.tongueArray.push(structuredClone(tongue));

            //Determine which position the tounge will be at
            switch (addTongueUpgrade.upgrade.currentValue) {
                case 1:
                    frog.tongueArray[1].distance = -50;
                    break;
                case 2:
                    frog.tongueArray[2].distance = 50;
                    break;
            }

            addTongueUpgrade.upgrade.currentValue++;

            //Compare if current value matchs max value. If so, deactivate upgrade
            if (addTongueUpgrade.upgrade.currentValue >= 3) {
                addTongueUpgrade.upgrade.is_active = false;
            }
            console.log(frog.tongueArray)
        }

    },
    new button(500, 370, 80, 50, () => { }),
)

/**
 * Changes to win state
 */
let winUpgrade = new shopUpgradeButton(
    new upgrade(1, 450, 0, 0, 1),
    () => {
        //Checks if player has enough money 
        if (checkMoney(winUpgrade.upgrade.price)) {

            //Deactivate plugin and change to win state
            winUpgrade.upgrade.is_active = false;
            changeState('Win');
        }
    },
    new button(280, 30, 80, 50, () => { }),
)

//Holder for all the upgrade buttons
let shopUpgradesArray = [toungeSpeedUpgrade, flySpawnUpgrade, passThroughUpgrade, addTongueUpgrade, winUpgrade];

function shopStart() {
    background('#D6D6D6');
};

function shopDraw() {
    push();
    image(backgroundImage, 0, 0);
    image(shopImage, 0, 0);
    image(exitImage, exitShopButton.col.x, exitShopButton.col.y);

    textSize(20);

    push();


    textFont(shopFont);
    stroke(0);
    strokeWeight(5);
    fill("#FFFFFF");

    let upgrade1text = "Increase the speed of your tounge";
    let upgrade2text = "Increase amount of flies you can eat";
    let upgrade3text = "Tounge can pass through flies";
    let upgrade4text = "Increase amount of tounges";

    text(upgrade1text, 40, 130);
    text(upgrade2text, 40, 220);
    text(upgrade3text, 40, 310);
    text(upgrade4text, 40, 400);

    pop();

    push();

    textFont(shopFont);
    stroke(0);
    strokeWeight(5);
    fill("#FFFFFF");

    let upgrade1value = str(toungeSpeedUpgrade.upgrade.currentValue);
    let upgrade2value = str(flySpawnUpgrade.upgrade.currentValue);
    let upgrade4value = str(addTongueUpgrade.upgrade.currentValue);

    text(upgrade1value, 460, 130);
    text(upgrade2value, 460, 220);
    text(upgrade4value, 460, 400);



    pop();

    push();

    fill("#000000");

    textFont(mainFont);
    textAlign(CENTER);

    for (let i = 0; i < shopUpgradesArray.length; i++) {
        let buttonCol = shopUpgradesArray[i].button.col


        let price_text = "X";
        push();
        if (shopUpgradesArray[i].upgrade.is_active) {
            fill('#00FF00');
            price_text = "$" + str(shopUpgradesArray[i].upgrade.price);
        }
        else {
            fill('#FF0000');
        }
        rect(buttonCol.x, buttonCol.y, buttonCol.width, buttonCol.height);
        fill("#000000");
        text(price_text, buttonCol.x + 40, buttonCol.y + 32);
        pop();
    }
    pop();

    pop();
    drawMoney();
};

/**
 * When mouse pressed, check if mouse pressed shop icon or any upgrade button
 */
function shopMousePress() {
    exitShopButton.checkMouseCollision();

    for (let i = 0; i < shopUpgradesArray.length; i++) {
        shopUpgradesArray[i].button.checkMouseCollision();
    }
}


//Reset upgrades to base values
function resetUpgrades() {
    toungeSpeedUpgrade.upgrade = new upgrade(1, 2, 1.8, 2, 37);
    flySpawnUpgrade.upgrade = new upgrade(1, 2, 1.5, 1, 23);
    passThroughUpgrade.upgrade = new upgrade(1, 50, 0, 0, 1);
}

//Compares price to current money. If matching, remove price from current money.
function checkMoney(price) {
    if (curInventory.money >= price) {
        curInventory.money -= price;
        return true;
    }
    else {
        return false;
    }
}

//Updates an upgrades price based on its rate
function getNewPrice(upgrade) {
    let newPrice = upgrade.priceRate;
    for (let i = 0; i < upgrade.level; i++) {
        newPrice = newPrice * upgrade.priceRate;
    }
    return Math.round(newPrice);
}