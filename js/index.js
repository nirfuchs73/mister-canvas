'use strict';
console.log('Mister canvas');

var gCanvas;
var gCtx;
var gColor;
var gClicks;

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    gClicks = [];
    // gCanvas.addEventListener('mousedown', onCanvasMouseDown, false);
    // console.log(gCtx);
}

function colorChanged() {
    gColor = document.getElementById('color').value;
    // console.log(gColor);
    // drawCircle();
    // drawTriangle();
}

function onCanvasMouseDown(ev) {
    var elsShape = document.querySelector('.shape');
    // console.log(elsShape.value);
    var shape = elsShape.value;
    var coord = { x: ev.offsetX, y: ev.offsetY };
    gClicks.push(coord);
    if (shape === 'line') {
        if (gClicks.length === 2) { //draw line
            drawLine(gClicks);
            emptyArry(gClicks);
        }
    }
    if (shape === 'rectangle') { //draw rectangle
        if (gClicks.length === 4) {
            drawRectangle(gClicks);
            emptyArry(gClicks);
        }
    } else if (shape === 'circle') { // draw circle
        if (gClicks.length === 2) {
            drawCircle(gClicks);
            emptyArry(gClicks);
        }
    } else { //draw triangle
        if (gClicks.length === 3) {
            drawTriangle(gClicks);
            emptyArry(gClicks);
        }
    }

    // console.log(ev.x);
    // console.log(ev.y);
}

function drawLine(clicks) {
    if (clicks.length === 2) {
        gCtx.beginPath();
        gCtx.moveTo(clicks[0].x, clicks[0].y);
        gCtx.lineTo(clicks[1].x, clicks[1].y);
        gCtx.strokeStyle = gColor;
        gCtx.closePath();
        gCtx.stroke();
    }
}

function drawRectangle(clicks) {
    if (clicks.length === 4) {
        gCtx.beginPath();
        gCtx.moveTo(clicks[0].x, clicks[0].y);
        gCtx.lineTo(clicks[1].x, clicks[1].y);
        gCtx.lineTo(clicks[2].x, clicks[2].y);
        gCtx.lineTo(clicks[3].x, clicks[3].y);
        gCtx.strokeStyle = gColor;
        gCtx.closePath();
        gCtx.stroke();
    }
}

function drawCircle(clicks) {
    // console.log('drawCircle');
    gCtx.beginPath();
    var radius = getDistance(clicks);
    gCtx.arc(clicks[0].x, clicks[0].y, radius, 0, 2 * Math.PI);
    gCtx.strokeStyle = gColor;
    gCtx.closePath();
    gCtx.stroke();
}

function drawTriangle(clicks) {
    if (clicks.length === 3) {
        gCtx.beginPath();
        gCtx.moveTo(clicks[0].x, clicks[0].y);
        gCtx.lineTo(clicks[1].x, clicks[1].y);
        gCtx.lineTo(clicks[2].x, clicks[2].y);
        gCtx.strokeStyle = gColor;
        gCtx.closePath();
        gCtx.stroke();
    }
}

function onSave() {

}

function onClear() {
    var doClear = confirm('Are you sure?');
    if (doClear) {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        emptyArry(gClicks);
    }
}

function onAbout() {
    alert('Mister canvas 1.0');
}

function emptyArry(array) {
    array.splice(0, array.length);
}

function getDistance(clicks) {
    var a = clicks[0].x - clicks[1].x;
    var b = clicks[0].y - clicks[1].y;
    // var a = x1 - x2;
    // var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}
