const { remote } = require('electron');


function close() {
    let w = remote.getCurrentWindow();
    w.close();
}
function minimize() {
    let w = remote.getCurrentWindow();
    w.minimize();
}

document.getElementById("closeButton").addEventListener("click", close)
document.getElementById("minimizeButton").addEventListener("click", minimize)