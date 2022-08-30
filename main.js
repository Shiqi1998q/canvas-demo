let canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = (document.documentElement.clientHeight) - 117;
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.strokeStyle = 'none';
ctx.lineWidth = 12;
ctx.lineCap = 'round';
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

}
let painting = false;
let last;

//手机
var isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        last = (x, y);
    };

    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;

        drawLine(last[0], last[1], x, y);
        last = [x, y];
    };

}
//电脑
else {
    canvas.onmousedown = (e) => {
        painting = true;
        last = [e.clientX, e.clientY];

    };
    canvas.onmousemove = (e) => {
        if (painting === true) {

            drawLine(last[0], last[1], e.clientX, e.clientY);
            last = [e.clientX, e.clientY];
        } else { }
    };
    canvas.onmouseup = () => {
        painting = false;
    };
}


function exportCanvasAsPNG(id, fileName) {
    var canvasElement = document.getElementById(id);
    var MIME_TYPE = "image/png";
    var imgURL = canvasElement.toDataURL(MIME_TYPE);
    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}