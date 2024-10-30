
"use strict";

//shop
const exitShopButton = new button(15,15,50,50,() => {
    changeState('Tounge');
})

class upgrade{
    constructor(level, price, priceRate, currentValue, maxValue){
        this.level = level;
        this.price = price;
        this.priceRate = priceRate;
        this.currentValue = currentValue;
        this.maxValue = maxValue;
    }

    is_active = true;
};

class shopUpgradeButton{

    constructor(upgrade, upgradeFunction, button){
        this.upgrade = upgrade;
        this.upgradeFunction = upgradeFunction
        this.button = button;
        button.notify = () => {
            if (this.upgrade.is_active){
                this.upgradeFunction();
            }
        };
    };  
};


let toungeSpeedUpgrade = new shopUpgradeButton(
    new upgrade(1,2,1.8,5,37),
    () => {
        if (checkMoney(toungeSpeedUpgrade.upgrade.price)){
            toungeSpeedUpgrade.upgrade.price = getNewPrice(toungeSpeedUpgrade.upgrade);
            toungeSpeedUpgrade.upgrade.currentValue = Math.round((Math.log(toungeSpeedUpgrade.upgrade.level) + toungeSpeedUpgrade.upgrade.level) * 3);
            curInventory.toungeSpeed = toungeSpeedUpgrade.upgrade.currentValue;
            console.log("New Speed: " + str(curInventory.toungeSpeed))
            toungeSpeedUpgrade.upgrade.level++;
    
            if (toungeSpeedUpgrade.upgrade.currentValue >= toungeSpeedUpgrade.upgrade.maxValue){
                toungeSpeedUpgrade.upgrade.is_active = false;
            }
        }
    },
    new button(100,400,50,50,() => {}),

);

let shopUpgradesArray = [toungeSpeedUpgrade,];

function shopStart(){
    background('#D6D6D6');
};

function shopDraw(){
    push();
    //background('#D6D6D6');
    rect(25,25,600,400);
    rect(exitShopButton.col.x,exitShopButton.col.y,exitShopButton.col.width,exitShopButton.col.height);
    for (let i = 0; i < shopUpgradesArray.length; i++){
        push();
        if (shopUpgradesArray[i].upgrade.is_active){
            color('#DADADA');
        }
        else{
            color('#FF0000');
        }
        rect(shopUpgradesArray[i].button.col.x, shopUpgradesArray[i].button.col.y, shopUpgradesArray[i].button.col.width, shopUpgradesArray[i].button.col.height )
        pop();
    }

    pop();
    drawMoney();
};

function shopMousePress(){
    exitShopButton.checkMouseCollision();

    for (let i = 0; i < shopUpgradesArray.length; i++){
        shopUpgradesArray[i].button.checkMouseCollision();  
    }
}



function resetUpgrades(){
    toungeSpeedUpgrade.upgrade = new upgrade(1,2,1.8,5,37);
}

function checkMoney(price){
    console.log("Current Price: " + str(price))
    if (curInventory.money >= price){
        curInventory.money -= price;
        return true;
    }
    else{
        return false;
    }
}

function getNewPrice(upgrade){
    let newPrice = upgrade.priceRate;
        for (let i = 0; i < upgrade.level; i++){
            newPrice = newPrice * upgrade.priceRate;
        }
    return Math.round(newPrice);
}