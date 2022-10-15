const game = document.getElementById("game")

function createButton(name) {
    let button = document.createElement("button")
    button.innerHTML = name
    return button
}
const clicks = document.createElement("p")
const click_button = createButton("Click")
const auto_clicker_buy = createButton("Buy AutoClicker")
auto_clicker_buy.style.visibility = "hidden" ;
const auto_clickers = document.createElement("p")
auto_clickers.style.visibility = "hidden" ;
const auto_clicker_cost = document.createElement("p")
auto_clicker_cost.style.visibility = "hidden" ;


const CLICKS = {
    get: () => {
        x = localStorage.getItem("GAME.clicks")
        return  x ? parseInt(x) : 0;
    },
    set: (x) => {
        localStorage.setItem("GAME.clicks", x)
    }
}

click_button.addEventListener("click",() => {
     CLICKS.set(CLICKS.get() + 1)
     clicks.innerHTML = `${CLICKS.get()} Clicks`



     if(CLICKS.get() >= 50 || AUTO_CLICKERS.get() > 0) {
        auto_clicker_buy.style.visibility = "visible" ;
        auto_clickers.style.visibility = "visible" ;
        auto_clicker_cost.style.visibility = "visible" ;
    }
})

auto_clicker_buy.addEventListener("click", () => {
    if(CLICKS.get() - getAutoClickerPrice() >= 0) {
        CLICKS.set(CLICKS.get() - getAutoClickerPrice())
        AUTO_CLICKERS.set(AUTO_CLICKERS.get() + 1)
        auto_clickers.innerHTML = `${AUTO_CLICKERS.get()} AutoClickers`
        clicks.innerHTML = `${CLICKS.get()} Clicks`
        auto_clicker_cost.innerHTML = `AutoClicker Cost: ${getAutoClickerPrice()} Clicks`
    }
})



const AUTO_CLICKERS = {
    get: () => {
        x = localStorage.getItem("GAME.auto_clickers")
        return  x ? parseInt(x) : 0;
    },
    set: (x) => {
        localStorage.setItem("GAME.auto_clickers", x)
    }
}


const getAutoClickerPrice = () =>  {
    let x = AUTO_CLICKERS.get()
    return (x > 0) ? x * x * 200 : 50;
}




const gameLoop = () => {

    CLICKS.set(CLICKS.get() + AUTO_CLICKERS.get())
    clicks.innerHTML = `${CLICKS.get()} Clicks`


}


function load_game() {
    clicks.innerHTML = `${CLICKS.get()} Clicks`
    auto_clickers.innerHTML = `${AUTO_CLICKERS.get()} AutoClickers`
    auto_clicker_cost.innerHTML = `AutoClicker Cost: ${getAutoClickerPrice()} Clicks`
    gameLoop();
    setInterval(gameLoop, 1000)
    game.appendChild(clicks)
    game.appendChild(auto_clickers)
    game.appendChild(click_button)
    game.appendChild(auto_clicker_cost)
    game.appendChild(auto_clicker_buy)




    if(CLICKS.get() >= 50 || AUTO_CLICKERS.get() > 0) {
        auto_clicker_buy.style.visibility = "visible" ;
        auto_clickers.style.visibility = "visible" ;
        auto_clicker_cost.style.visibility = "visible" ;
    }
}

load_game()