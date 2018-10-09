// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const PIXI = require('pixi.js');
const Square = require('./src/square.js');

let delta = 0;
let prev = performance.now();
let now = performance.now();

const MILLSECONDS_PER_SECOND = 1000;

//webGL renderer
let renderer = PIXI.autoDetectRenderer(
    window.innerWidth,
    window.innerHeight,
    {
        backgroundColor: 0x000000
    }
);
document.body.appendChild(renderer.view);

//container for objects to render
let stage = new PIXI.Container();

//graphics object for drawing shapes to
let graphics = new PIXI.Graphics();
stage.addChild(graphics);

let square = new Square({x: 0, y: 0}, {width: 100, height: 100}, 0xffffff);

var init = function(){
    render();
}

var render = function(){
    now = performance.now();
    delta = now - prev;

    graphics.clear();
    square.draw(graphics);
    renderer.render(stage);

    prev = performance.now();
    requestAnimationFrame(render);
}

var curX = 0;
var click = function(){
    console.log('click!');
    curX += 40;
    square.targetx = curX;
}
window.addEventListener('click', click);

init();
