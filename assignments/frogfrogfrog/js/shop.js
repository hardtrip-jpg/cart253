
"use strict";

//shop
const exitShopButton = new button(15,15,50,50,() => {
    changeState('Tounge');
})




let shopStateButtons = [exitShopButton,]

function shopStart(){
    background('#D6D6D6');
};

function shopDraw(){
    push();
    //background('#D6D6D6');
    rect(25,25,600,400);
    for (let i = 0; i < shopStateButtons.length; i++){
        push();
        rect(shopStateButtons[i].col.x,shopStateButtons[i].col.y,shopStateButtons[i].col.width,shopStateButtons[i].col.height)
        pop();
    }
    pop();
    drawMoney();
};

function shopMousePress(){
    for (let i = 0; i < shopStateButtons.length; i++){
        shopStateButtons[i].checkMouseCollision();
    }
}

class upgrade{
    constructor(level, price, priceRate, currentValue, maxValue){
        this.level = level;
        this.price = price;
        this.priceRate = priceRate;
        this.currentValue = currentValue;
        this.maxValue = maxValue;
    }

    is_active = true;
}

class shopUpgradeButton{
    constructor(){
        
    }
    upgrade(){

    }
}

let upgrade1;
let upgrade2;
let upgrade3;

function resetUpgrades(){
    upgrade1 = new upgrade(1,2,2,curInventory.toungeSpeed,37);
}

function upgrade1Activate(){
    if (checkMoney(upgrade1.price)){
        upgrade1.price = getNewPrice(upgrade1);
        upgrade1.currentValue = Math.round((Math.log(upgrade1.level) + upgrade1.level) * 3);
        curInventory.toungeSpeed = curInventory;
        console.log("New Speed: " + str(curInventory.toungeSpeed))
        upgrade1.level++;

        if (upgrade1.currentValue >= upgrade1.maxValue){
            upgrade1.is_active = false;
        }
    }
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
        for (i = 0; i < upgrade.level; i++){
            newPrice = newPrice * upgrade.priceRate;
        }
    return Math.round(newPrice);
}