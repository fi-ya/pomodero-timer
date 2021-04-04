//get html element by class ID
const startBtn = document.getElementById("start");
const pauseBtn= document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const container = document.getElementById("container");
const bell = document.querySelector("audio");

let intervalMins = document.getElementById("interval-mins");
let intervalSecs = document.getElementById("interval-secs");

let roundCounter = document.getElementById("count");

let shortBreakMins = document.getElementById("short-break-mins");
let shortBreakSecs = document.getElementById("short-break-secs");

let longBreakMins = document.getElementById("long-break-mins")
let longBreakSecs = document.getElementById("long-break-secs")

let setIntervalMins = document.getElementById("interval-input");
let setShortBreakMins = document.getElementById("short-break-input");
let setLongBreakMins = document.getElementById("long-break-input");

const interval = document.getElementById("interval-timer");

// addEventListener() on save button 
document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    localStorage.setItem("interval-input", setIntervalMins.value);
    localStorage.setItem("short-break-input", setShortBreakMins.value);
    localStorage.setItem("long-break-input", setLongBreakMins.value);
    intervalMins.innerText = setIntervalMins.value;
    shortBreakMins.innerText = setShortBreakMins.value;
    longBreakMins.innerText = setLongBreakMins.value;
});

// initialize timers 
let roundTimer, shortBreakTimer, longBreakTimer;

// function to setInterval() for interval timer
function startRoundTimer() {
    roundTimer = setInterval( beginRound, 1000);
}

// function to start interval timer  
function beginRound(){
    document.title = intervalMins.innerText + ":" + intervalSecs.innerText;
   
    if (intervalSecs.innerText != 0){        
        intervalSecs.innerText--;
    }
    else if (intervalMins.innerText != 0 && intervalSecs.innerText == 0){  
        intervalSecs.innerText = 59;  
        intervalMins.innerText--; 
    }
    else if(intervalMins.innerText == 00 && intervalSecs.innerText == 00 ){
        container.style.border = "5px solid #e63946";
        bell.play();
        roundCounter.innerText++;
        
        stopRoundTimer();
        if(roundCounter.innerText == 4){
            startLongTimer();
        }
        else {
            startShortTimer();
        }
    }
}

// function to clear interval timer  
function stopRoundTimer() {
    // container.style.border = "5px solid rgb(69, 123, 157)";
    clearInterval(roundTimer);
    intervalMins.innerText = setIntervalMins.value; 
    intervalSecs.innerText = '00';
}

// function to setInterval() for short break timer
function startShortTimer() {
    shortBreakTimer = setInterval(beginShort,1000);
}

// function to start short break timer 
function beginShort(){
    document.title = shortBreakMins.innerText + ":" + shortBreakSecs.innerText;
    if(shortBreakSecs.innerText != 00){
        shortBreakSecs.innerText--
    } 
    else if (shortBreakMins.innerText != 00 && shortBreakSecs.innerText == 00){
        shortBreakSecs.innerText = 59;
        shortBreakMins.innerText--;
    } 
    else if (shortBreakMins.innerText == 00 && shortBreakSecs.innerText == 00){
        bell.play();
        stopShortTimer();
        startRoundTimer();
    }
} 

// function to clear short break timer 
function stopShortTimer() {
    clearInterval(shortBreakTimer);
    shortBreakMins.innerText = setShortBreakMins.value; 
    shortBreakSecs.innerText = '00';
}

// function to setInterval() for long break timer
function startLongTimer() {
    longBreakTimer = setInterval( beginLong, 1000)   
}

// function to start long break timer 
function beginLong(){
    document.title = longBreakMins.innerText + ":" + longBreakSecs.innerText;
    if(longBreakSecs.innerText != 00){
        longBreakSecs.innerText--;
    } 
    else if (longBreakMins.innerText != 00 && longBreakSecs.innerText == 00){
        longBreakSecs.innerText = 59;
        longBreakMins.innerText--;
    }
    else if (longBreakMins.innerText == 00 && longBreakSecs.innerText == 00){
        bell.play();
        stopLongTimer();
        startRoundTimer();
    }
}

// function to clear long break timer 
function stopLongTimer() {
    roundCounter.innerText = 00;
    clearInterval(longBreakTimer);
    longBreakMins.innerText = setLongBreakMins.value;
    longBreakSecs.innerText = '00';
}

// addEventListener() on start button 
startBtn.addEventListener('click', function(){
    if (!roundTimer){
        startRoundTimer();
    } 
    else {
    alert('Timer is already running. ≧◠‿◠≦ ');
    }
});   

// addEventListener() on pause button 
pauseBtn.addEventListener('click', function(){
    
    if(!roundTimer){
        alert('Cannot pause as timer is not running. ≧◠‿◠≦ ');
        return;
    }
    else if(roundTimer){
        clearInterval(roundTimer);
        roundTimer = false;
    }
});

// addEventListener() on reset button 
resetBtn.addEventListener('click', function(){
    if(!roundTimer){
        alert('Cannot reset as timer is not running. ≧◠‿◠≦ ');
        return;
    }
    else if(roundTimer){
        let confirmQuestion = confirm("Are you sure you want to reset the Pomodoro Timer?")
        if(confirmQuestion == true){
            if (roundTimer){
                stopRoundTimer();
                stopShortTimer();
                stopLongTimer();
                roundTimer = false;
            }
        }
        else {
            return;
        }
    }
});


