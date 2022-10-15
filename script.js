const ACTION_BUTTON = document.getElementsByClassName("action")[0]
const MONEY_COUNTER = document.getElementsByClassName("money")[0]

let x = localStorage.getItem("monies")
let MONIES = x ? parseInt(x) : 0

const actionButtonCallBack = () => {
    MONIES += 1;
    updateGame();
}

ACTION_BUTTON.addEventListener("click", actionButtonCallBack)


const updateGame = () => {
    MONEY_COUNTER.innerHTML = `${MONIES} Money`
    localStorage.setItem("monies", MONIES)
}
updateGame()
