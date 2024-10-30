
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
};

function shopMousePress(){
    for (let i = 0; i < shopStateButtons.length; i++){
        shopStateButtons[i].checkMouseCollision();
    }
}