
function shopStart(){
    background('#D6D6D6');
};

function shopDraw(){
    push();
    //background('#D6D6D6');
    rect(25,25,600,400);
    for (let i = 0; i < shopStateButtons.length; i++){
        push();
        rect(shopStateButtons[i].x,shopStateButtons[i].y,shopStateButtons[i].width,shopStateButtons[i].height)
        pop();
    }
    pop();
};

function shopMousePress(){
    for (let i = 0; i < shopStateButtons.length; i++){
        shopStateButtons[i].checkMouseCollision();
    }
}