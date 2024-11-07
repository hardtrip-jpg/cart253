
"use strict";

//shop
const exitShopButton = new button(15, 15, 50, 50, () => {
    changeState('Tounge');
})

class upgrade {
    constructor(level, price, priceRate, currentValue, maxValue) {
        this.level = level;
        this.price = price;
        this.priceRate = priceRate;
        this.currentValue = currentValue;
        this.maxValue = maxValue;
    }

    is_active = true;
};

class shopUpgradeButton {

    constructor(upgrade, upgradeFunction, button) {
        this.upgrade = upgrade;
        this.upgradeFunction = upgradeFunction
        this.button = button;
        button.notify = () => {
            if (this.upgrade.is_active) {
                this.upgradeFunction();
            }
        };
    };
};


let toungeSpeedUpgrade = new shopUpgradeButton(
    new upgrade(1, 2, 1.8, 2, 37),
    () => {
        if (checkMoney(toungeSpeedUpgrade.upgrade.price)) {
            toungeSpeedUpgrade.upgrade.price = getNewPrice(toungeSpeedUpgrade.upgrade);
            toungeSpeedUpgrade.upgrade.currentValue = Math.round((Math.log(toungeSpeedUpgrade.upgrade.level) + toungeSpeedUpgrade.upgrade.level) * 2.5);
            curInventory.toungeSpeed = toungeSpeedUpgrade.upgrade.currentValue;
            console.log("New Speed: " + str(curInventory.toungeSpeed))
            toungeSpeedUpgrade.upgrade.level++;

            if (toungeSpeedUpgrade.upgrade.currentValue >= toungeSpeedUpgrade.upgrade.maxValue) {
                toungeSpeedUpgrade.upgrade.is_active = false;
            }
        }
    },
    new button(500, 100, 80, 50, () => { }),

);

let flySpawnUpgrade = new shopUpgradeButton(
    new upgrade(1, 2, 2, 1, 23),
    () => {
        if (checkMoney(flySpawnUpgrade.upgrade.price)) {
            flySpawnUpgrade.upgrade.price = getNewPrice(flySpawnUpgrade.upgrade);

            flyHolder.push(structuredClone(baseFly));
            flyHolder[flySpawnUpgrade.upgrade.currentValue].speed = random(2, 3);
            flyHolder[flySpawnUpgrade.upgrade.currentValue].x = random(0, 600);
            flyHolder[flySpawnUpgrade.upgrade.currentValue].y = random(0, 400)
            flySpawnUpgrade.upgrade.currentValue++;
            curInventory.flyAmount = flySpawnUpgrade.upgrade.currentValue;

            console.log("New Fly Amount: " + str(curInventory.flyAmount))
            flySpawnUpgrade.upgrade.level++;

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
        if (checkMoney(passThroughUpgrade.upgrade.price)) {
            curInventory.cannotPass = false;
            passThroughUpgrade.upgrade.is_active = false;
            console.log("Pass Through Activated");
        }
    },
    new button(500, 280, 80, 50, () => { }),
)

let addTongueUpgrade = new shopUpgradeButton(
    new upgrade(1, 100, 1.8, 1, 3),
    () => {
        if (checkMoney(addTongueUpgrade.upgrade.price)) {
            addTongueUpgrade.upgrade.price += 100;
            frog.tongueArray.push(structuredClone(tongue));

            switch (addTongueUpgrade.upgrade.currentValue) {
                case 1:
                    frog.tongueArray[1].distance = -50;
                    break;
                case 2:
                    frog.tongueArray[2].distance = 50;
                    break;
            }
            addTongueUpgrade.upgrade.currentValue++;
            if (addTongueUpgrade.upgrade.currentValue >= 3) {
                addTongueUpgrade.upgrade.is_active = false;
            }
            console.log(frog.tongueArray)
        }

    },
    new button(500, 370, 80, 50, () => { }),
)

let winUpgrade = new shopUpgradeButton(
    new upgrade(1, 450, 0, 0, 1),
    () => {
        if (checkMoney(winUpgrade.upgrade.price)) {
            winUpgrade.upgrade.is_active = false;
            changeState('Win');
        }
    },
    new button(280, 30, 80, 50, () => { }),
)


let shopUpgradesArray = [toungeSpeedUpgrade, flySpawnUpgrade, passThroughUpgrade, addTongueUpgrade, winUpgrade];

function shopStart() {
    background('#D6D6D6');
};

function shopDraw() {
    push();
    //background('#D6D6D6');
    // rect(25, 25, 600, 400);
    image(backgroundImage, 0, 0);
    image(shopImage, 0, 0);
    // rect(exitShopButton.col.x, exitShopButton.col.y, exitShopButton.col.width, exitShopButton.col.height);
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

function shopMousePress() {
    exitShopButton.checkMouseCollision();

    for (let i = 0; i < shopUpgradesArray.length; i++) {
        shopUpgradesArray[i].button.checkMouseCollision();
    }
}



function resetUpgrades() {
    toungeSpeedUpgrade.upgrade = new upgrade(1, 2, 1.8, 2, 37);
    flySpawnUpgrade.upgrade = new upgrade(1, 2, 1.5, 1, 23);
    passThroughUpgrade.upgrade = new upgrade(1, 50, 0, 0, 1);
}

function checkMoney(price) {
    if (curInventory.money >= price) {
        curInventory.money -= price;
        return true;
    }
    else {
        return false;
    }
}

function getNewPrice(upgrade) {
    let newPrice = upgrade.priceRate;
    for (let i = 0; i < upgrade.level; i++) {
        newPrice = newPrice * upgrade.priceRate;
    }
    return Math.round(newPrice);
}