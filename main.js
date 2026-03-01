// Setting Game Name
let gameName = "Guess Word";
document.querySelector("h1").innerHTML = gameName;
document.querySelector('footer').innerHTML = `${gameName} Game Created By Mahmoud Ahmed`

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
const words = ["Create" ,"Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()
console.log(wordToGuess)
const message = document.querySelector(".message");
const guessButton = document.querySelector(".check")

//Manage Hints
const getHintButton = document.querySelector(".hint");
document.querySelector(".hint span").innerHTML = numberOfHints;


// Generate Inputs
function generateInput (){
    const inputContainer = document.querySelector(".inputs");
    // Creat Try Divs
    for (let i=1 ; i<=numberOfTries ; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`

        // Disabled All Div Except The First One
        if (i !== 1)tryDiv.classList.add("disabled-inputs")

            //Creat Inputs
        for (let j=1 ; j<=numberOfLetters ; j++){
            const input = document.createElement("input");
            input.classList.add(`guess-${i}-letter-${j}`);
            input.setAttribute("maxlength","1");
            input.type = "text";
            tryDiv.appendChild(input);
        }
        inputContainer.appendChild(tryDiv)
    }
    // Disabled All Inputs Except First One
    const disabledInputs = document.querySelectorAll(".disabled-inputs input");
    disabledInputs.forEach((input)=>(input.disabled = true))
    // Focus On The First Input
    inputContainer.children[0].children[1].focus();

    const inputs = document.querySelectorAll("input");
    
    inputs.forEach((input,index)=>{
        // Convert Inputs To Upper Case
        input.addEventListener("input",function(){
            input.value = input.value.toUpperCase();

        // Go To Next Input
            const nextIndex = index + 1;
            inputs[nextIndex].focus(); 
        })


        input.addEventListener("keydown",function (event){
            // Arrow Right Key
            if(event.key == "ArrowRight"){
                const nextIndex = index + 1;
                if (inputs[nextIndex])inputs[nextIndex].focus();
            }
            // Arrow Left key
            if(event.key == "ArrowLeft"){
                const prevIndex = index - 1;
                if(inputs[prevIndex])inputs[prevIndex].focus();
            }
            // Backspace Key
            if(event.key == "Backspace"){
                this.value = ""
            }
        })
    })

}
guessButton.addEventListener("click",function handeleGuesses(){
    let successGuess = true ;
    for (let i=0 ; i<numberOfLetters ; i++){
        const inputField = document.querySelectorAll(`.try-${currentTry} input`);
        const letter = inputField[i].value.toLowerCase();
        const actualLetter = wordToGuess[i];
        if (actualLetter == letter){
            // The Letter Is Correct And In Place
            inputField[i].classList.add("in-place");
        }else if (wordToGuess.includes(letter)){
            if (letter == ""){
                // The Letter Is Correct But Not In Place
                inputField[i].classList.add("no");
                successGuess = false;
            }else{
                inputField[i].classList.add("not-in-place");
                successGuess = false;
            }
        }else{
            // The Letter Is Not Exist
            inputField[i].classList.add("no");
            successGuess = false;
        }
    }
    if(successGuess == true){
        // The Input Is Correct 
        message.innerHTML= `You Win The Word Is <span>${wordToGuess}</span>`
        guessButton.disabled = true;
        getHintButton.disabled = true;
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        let currentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInput.forEach((input)=>(input.disabled = true));
    }else{
        // The Letter Is Wrong
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        let currentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInput.forEach((input)=>(input.disabled = true));

        currentTry++;
        if (currentTry <= numberOfTries){
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            currentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
            currentTryInput.forEach((input)=>(input.disabled = false));
        }else{
            message.innerHTML= `You Lose The Word Is <span>${wordToGuess}</span>`;
            guessButton.disabled = true;
            getHintButton.disabled = true;
        }
    }

})
getHintButton.addEventListener("click", function getHint(){
        const enabledInputs = Array.from(document.querySelectorAll(`.try-${currentTry} input`));
        const emptyEnabledInputs = enabledInputs.filter((input)=>(input.value == ""));
    if(numberOfHints > 0){
        numberOfHints--

        if(emptyEnabledInputs.length > 0){
            const ramdomIndex = Math.floor(Math.random()*emptyEnabledInputs.length);
            console.log(ramdomIndex);
            const randomInput = emptyEnabledInputs[ramdomIndex];
            console.log(randomInput);
            const indexToFill = enabledInputs.indexOf(randomInput);
            console.log(indexToFill);
            randomInput.value = wordToGuess[indexToFill].toLocaleUpperCase();

        }
    }
    if (numberOfHints == 0){
        getHintButton.disabled = true;
    }
    document.querySelector(".hint span").innerHTML = numberOfHints;
})

generateInput()
