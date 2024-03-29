let loopsObject = {};
let loopEnum = {};
let loopLetter = ["A", "B", "C", "D"];
let state = "A"
let counter = 0;
let loopNumber = 0;

//Shows a title screen, a setup screen for the timer, and a simple counter display
function titleToConfig() {
    //document.getElementById("title").style.display = "none";
    document.getElementById("config").style.zIndex = "-1";
    document.getElementById("config").style.display = "flex";
    document.getElementById("title").classList.add("animate__animated","animate__fadeOutDown");
    document.getElementById("config").classList.add("animate__animated","animate__fadeInUp");
    document.body.style.overflow = "hidden";
    setTimeout(titleToConfigAnimationCleanUp, 1000)
}
function titleToConfigAnimationCleanUp() {
    document.getElementById("title").style.display = "none";
    document.body.style.overflow = "auto";
}
function configToRunning() {
    document.getElementById("running").style.zIndex = "-2";
    document.getElementById("running").style.display = "flex";
    document.getElementById("config").classList.add("animate__animated","animate__fadeOutDown");
    document.getElementById("running").classList.add("animate__animated","animate__fadeInUp");
    window.scrollTo(0,0);
    document.body.style.overflow = "hidden";
    setTimeout(configToRunningAnimationCleanUp, 1000);
}
function configToRunningAnimationCleanUp() {
    document.getElementById("running").style.zIndex = "-1";
    document.getElementById("config").style.display = "none";
    document.getElementById("config").classList.remove("animate__animated","animate__fadeOutDown");
    document.getElementById("running").classList.remove("animate__animated","animate__fadeInUp");
    document.body.style.overflow = "auto";
}
function runningToConfig() {
    document.getElementById("config").style.zIndex = "-2";
    document.getElementById("config").style.display = "flex";
    document.getElementById("running").classList.add("animate__animated","animate__fadeOutDown");
    document.getElementById("config").classList.add("animate__animated","animate__fadeInUp");
    document.body.style.overflow = "hidden";
    setTimeout(runningToConfigAnimationCleanUp, 1000);
}
function runningToConfigAnimationCleanUp() {
    document.getElementById("config").style.zIndex = "-1";
    document.getElementById("running").style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("running").classList.remove("animate__animated","animate__fadeOutDown");
    document.getElementById("config").classList.remove("animate__animated","animate__fadeInUp");
}
function clearTimer() {
    runningToConfig(); 
    counter=0; 
    document.getElementById('timecounter').classList.remove('animate__animated','animate__pulse');
}
function loadAllVars() {
    loopLetter.forEach((letter) => {
        loopsObject[`time${letter}`] = document.getElementById(`time${letter}`);
        loopsObject[`everySecond${letter}`] = document.getElementById(`everySecond${letter}`);
        loopsObject[`halfInterval${letter}`] = document.getElementById(`halfInterval${letter}`);
        loopsObject[`countDown${letter}`] = document.getElementById(`countDown${letter}`);
        loopsObject[`loop${letter}`] = false;
    });
    loopsObject.loopA = true;
    loopsObject.loopB = false;
    loopsObject.loopC = false;
    loopsObject.loopD = false;
    loopEnum = {0: document.getElementById("loopA"),
                1: document.getElementById("loopB"),
                2: document.getElementById("loopC"),
                3: document.getElementById("loopD"),
    }
}

function loop() {
    let f = setInterval(loopBySeconds, 1000);
    document.getElementById("clear").value = f;
}

function loopBySeconds() {
    //update counter
    
    document.getElementById("timecounter").innerText = counter;
    document.getElementById("timecounter").classList.add("animate__animated","animate__pulse");
    if (loopsObject["time"+state].value == counter) {
        //plays high beep
        document.getElementById("high").play();
        counter = 0;
        //loop controls; changes to the next appropriate loop
        if (state === "A" && loopsObject.loopB) {state="B";}
        else if (state === "B" && loopsObject.loopC) {state="C";}
        else if (state === "C" && loopsObject.loopD) {state="D";}
        else {state="A";}
    }
    else if (loopsObject["everySecond"+state].value == true) {
        //play lowBeep
        document.getElementById("low").play();
    }

    //logic for auxillary "low" beeps
    else {
        if (loopsObject["halfInterval"+state].value == true) {
            if (parseInt(loopsObject["time"+state].value)/2 >> 0 == counter) {
                document.getElementById("low").play();
            }
        } 
        if (loopsObject["countDown"+state].value == true) {   
            if (counter >= parseInt(loopsObject["time"+state].value)-3) {
                document.getElementById("low").play();
            }
        }
    }
    counter++;
}

setTimeout(titleToConfig, 2000);

const o = document.getElementsByClassName("checkbutton");
for (let el of o){
    el.addEventListener("click", () => {
        el.classList.toggle('clickedcheck');
        el.value = Boolean(el.value) ? "" : "1";
    });
}

//logic for activating and animating different loops and via clicking 
document.getElementById("plus").addEventListener("click", () =>{
    if (loopNumber < 3) {
        loopNumber += 1;
        let next = loopEnum[loopNumber];
        next.classList.toggle("invis");
        loopsObject[next.id] = true;
        if (loopNumber === 3) {
            document.getElementById("plus").style.setProperty('opacity', 0);
        }
        else if (loopNumber === 1) {
            document.getElementById("minus").style.setProperty('opacity', 1);
        }
    }
});

document.getElementById("minus").addEventListener("click", () =>{
    if (loopNumber > 0) {
        let curr = loopEnum[loopNumber];
        curr.classList.toggle("invis");
        loopsObject[curr.id] = false;
        loopNumber -= 1;
        if (loopNumber === 0) {
            document.getElementById("minus").style.setProperty('opacity', 0);
        }
        else if (loopNumber === 2) {
            document.getElementById("plus").style.setProperty('opacity', 1);
        }
    }
});
