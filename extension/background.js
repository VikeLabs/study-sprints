let timer = {
    seconds: 0,
    intervalID: null
};

function updateTimer() {
    timer.seconds++;
    chrome.storage.sync.set({ "time passed": timer.seconds });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ "time passed": 0 });
});

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get("time passed", function (data) {
        timer.seconds = data["time passed"] || 0;
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "start") {
        if (timer.intervalID === null) {
            timer.intervalID = setInterval(updateTimer, 1000);
        }
    } else if (request.command === "stop") {
        clearInterval(timer.intervalID);
        timer.intervalID = null;
    } else if (request.command === "reset") {
        clearInterval(timer.intervalID);
        timer.intervalID = null;
        timer.seconds = 0;
        chrome.storage.sync.set({ "time passed": 0 });
    }
});
