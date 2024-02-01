// get all theme buttons
const body = document.querySelector("body");
const radioBtns = document.querySelectorAll("input");
const numBtns = document.querySelectorAll("button"); // buttons
const displayResult = document.querySelector(".display p"); //display

let toCalculate;
let theme;

// check and assign appropriate theme
checkStoredTheme();

// Array of allowed keys
// keypressed will be checked against allowed keys
const allowedKeys = ["/", "*", "-", "+", ".","Backspace", "Delete", "Escape", "Enter", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

// Add event listener to cqalculator key buttons
numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", () =>{
        checkKey(numBtn.value);
    })
})

// add click event to the document
document.addEventListener("keyup", (e) => {
    if(allowedKeys.includes(e.key) == true){
        console.log(e.key);
        highlightButton(e.key);
        checkKey(e.key);
    }
})

// funtion to check key pressed or clicked and perform calculation
function checkKey(key){
    switch (key) {
        case "Escape":
            displayResult.innerHTML = 0;
            break;

        case "Backspace":
        case "Delete":
            toCalculate = displayResult.innerHTML.slice(0, displayResult.innerHTML.trim().length - 1);
            displayResult.innerHTML = toCalculate;
            break;

        case "Enter": 
            try {
                displayResult.innerHTML = eval(displayResult.innerHTML);
            } catch (error) {
                displayResult.innerHTML = `<p class="error">${error}</p>`;
            }
            break;
    
        default:
            displayResult.innerHTML += key;
            break;
    }
}

function highlightButton(key){
    numBtns.forEach((numBtn) => {
        if(key == numBtn.value){
            numBtn.style.backgroundColor = "#c40808";
            numBtn.style.color = "#ffffff";
            setTimeout(()=>{
                numBtn.removeAttribute("style");
            }, 100);
        }
    })
}

radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener("change", () => {
        theme = radioBtn.id;
        body.removeAttribute("class");
        body.classList.add(theme);
        localStorage.setItem("calc-theme", theme);
    })
})

function checkStoredTheme(){
    let localTheme = localStorage.getItem("calc-theme");
    if(localTheme){
        body.removeAttribute("class");
        body.classList.add(localTheme);
    }else{
        body.removeAttribute("class");
    }

    radioBtns.forEach((radioBtn) => {
        if(localTheme == radioBtn.id){
            radioBtn.setAttribute("checked", true);
        }
    })

}
