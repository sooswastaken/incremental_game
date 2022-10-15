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
        AUTO_CLICKERS.increase()
        auto_clickers.innerHTML = `${AUTO_CLICKERS.get()} AutoClickers`
        clicks.innerHTML = `${CLICKS.get()} Clicks`
        auto_clicker_cost.innerHTML = `AutoClicker Cost: ${getAutoClickerPrice()} Clicks`
    }
})



const AUTO_CLICKERS = {
    get: () => {
        let x = localStorage.getItem("GAME.auto_clickers")
        return  x ? JSON.parse(x).length : 0;
    },
    increase: () => {
        let x = localStorage.getItem("GAME.auto_clickers")
        if(x) {
            x = JSON.parse(x)
            x.push(new Date())
        } else {
            x = [new Date()] 
        }
        localStorage.setItem("GAME.auto_clickers", JSON.stringify(x))


    },
    click: () => {
        let x = localStorage.getItem("GAME.auto_clickers")
        if(!x) {x=[]}else{
        x = JSON.parse(x)}
        for(let i=0; i<x.length; i++) {
            let item = x[i].toString()
            let b = Date.parse(item)
            let elapsed_time = Math.round((new Date() - b) / 1000)
            CLICKS.set(CLICKS.get() + elapsed_time)
            x[i] = new Date()
        }
        localStorage.setItem("GAME.auto_clickers", JSON.stringify(x))

    }
}


const getAutoClickerPrice = () =>  {
    let x = AUTO_CLICKERS.get()
    return (x > 0) ? x * 55 : 50;
}




const gameLoop = () => {

    AUTO_CLICKERS.click()
    clicks.innerHTML = `${CLICKS.get()} Clicks`


}


function load_game() {
    clicks.innerHTML = `${CLICKS.get()} Clicks`
    auto_clickers.innerHTML = `${AUTO_CLICKERS.get()} AutoClickers`
    auto_clicker_cost.innerHTML = `AutoClicker Cost: ${getAutoClickerPrice()} Clicks`
    gameLoop();
    setInterval(gameLoop, 1000)
    title = document.createElement("h1")
    title.innerHTML = "Click you fucking whore"
    game.appendChild(title)
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
