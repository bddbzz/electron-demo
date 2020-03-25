let { app, BrowserWindow, ipcMain } = require("electron")
const notifier = require('node-notifier');

let win = null
app.on("ready", function () {
    win = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile("./index.html")
    handleIPC()
})
function handleIPC() {
    ipcMain.handle("work-notification", async () => {
        notifier.notify({
            appName: "com.pomodoro.app",
            appID: "com.pomodoro.app",
            title: 'My notification',
            message: 'Hello, there!'
        });
        // let res = await new Promise((resolve, rejected) => {
        //     notifier.notify(
        //         {
        //             title: "任务结束",
        //             message: "是否开始休息?",
        //             timeout: 5, // Takes precedence over wait if both are defined.
        //             closeLabel: "继续工作", // String. Label for cancel button
        //             actions: [{ text: "开始休息", type: "button" }], // String | Array<String>. Action label or list of labels in case of dropdown
        //         },
        //         function (error, response, metadata) {
        //             console.log(response, metadata);
        //         }
        //     );
        //     notifier.on('click', function (notifierObject, options, event) {
        //         console.log(arguments)
        //     });
        // })
        // return res
    })
}
