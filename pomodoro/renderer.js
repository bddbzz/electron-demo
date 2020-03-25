let { ipcRenderer } = require("electron")
const Timer = require("timer.js")

function startWork() {
    let workTimer = new Timer({
        ontick: updateTime,
        onend: notification
    })
    workTimer.start(10)
}

function _p0(t) {
    return t.toString().padStart(2, 0)
}

function updateTime(ms) {
    let timerContainer = document.getElementById("timer-container")
    let s = (ms / 1000).toFixed(0)
    let ss = s % 60
    let mm = (s / 60).toFixed(0)
    timerContainer.textContent = `${_p0(mm)}:${_p0(ss)}`
}
async function notification() {
    let res = await ipcRenderer.invoke("work-notification")
    if (res == "work") {
        startWork()
    }
    else if (res == "rest") {
        setTimeout(() => {
            alert("休息")
        }, 5000);
    }
}

startWork()