let timerElement = document.getElementById("timer");
let seconds = 0;
let intervalID = null;
var myAudio = new Audio(chrome.runtime.getURL("alarm.mp4"));
var breakTime = false;

chrome.storage.sync.get("time passed", function (data) {

    if (isNaN(data["time passed"])) {
        chrome.storage.sync.set({ "time passed": 0 });
    }
    seconds = data["time passed"];
    timerElement.innerText = formatTime(seconds);

    if (seconds !== 0) {
        startTimer();
    }

});
function sendCommandToBackground(command) {
    chrome.runtime.sendMessage({ command: command });
}

function startTimer() {
    sendCommandToBackground("start");
    if (!intervalID) {
        intervalID = setInterval(updateDisplay, 1000);
    }
}

function stopTimer() {
    myAudio.pause();
    clearInterval(intervalID);
    intervalID = null;
}

function resetTimer() {
    sendCommandToBackground("reset");

    myAudio.pause();
    clearInterval(intervalID);
    intervalID = null;
    seconds = 0;
    timerElement.innerText = formatTime(seconds);
    chrome.storage.sync.set({ "time passed": 0 });
}

function updateDisplay() {
    seconds++;
    if (seconds > 1500) {
        timerFinished();
    }
    timerElement.innerText = formatTime(seconds);
}

function timerFinished() {
    sendCommandToBackground("reset");
    resetTimer();
    myAudio.play();
    alert("Time for a Break!");
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

document.getElementById("startbutton").addEventListener("click", startTimer);
document.getElementById("stopbutton").addEventListener("click", stopTimer);
document.getElementById("resetbutton").addEventListener("click", resetTimer);
