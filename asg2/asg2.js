var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
'uniform mat4 u_ModelMatrix;\n' +
'uniform mat4 u_GlobalRotateMatrix;\n' +
'void main() {\n' +
' gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
'}\n';

var FSHADER_SOURCE =
'precision mediump float;\n' +
'uniform vec4 u_FragColor;\n' +
'void main() {\n' +
'  gl_FragColor = u_FragColor;\n' +
'}\n';

var canvas;
var gl;
var a_Position;
var u_FragColor;
var u_Size;
var u_ModelMatrix;
var u_GlobalRotateMatrix;
var gAnimalGlobalRotation = 0;
var g_Animation = false;
var g_startTime = performance.now() / 1000.0;
var g_seconds = performance.now() / 1000.0 - g_startTime;
var head_animation = 0;
var g_rightLegJoint=0;
var g_leftLegJoint=0;

const orange = [1.0, 0.5, 0.0, 1.0];
const brown = [0.5, 0.3, 0.0, 1.0];
const red = [1.0, 0.0, 0.0, 1.0];
const blue = [0.1, 0.6, 1.0, 1.0];
const greyblue = [0.5, 0.4, 0.4, 1.0];
const black = [0.0, 0.0, 0.0, 1.0]
const white = [1.0, 1.0, 1.0, 1.0]
const yellow = [1.0, 1.0, 0.0, 1.0];

function setupWebGL(){
    canvas = document.getElementById('asg2');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    gl = getWebGLContext(canvas, { preserveDrawingBuffer: true});
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL(){
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get u_FragColor');
        return;
    }
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get u_ModelMatrix');
        return;
    }
    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if (!u_GlobalRotateMatrix) {
        console.log('Failed to get u_GlobalRotateMatrix');
        return;
    }
    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function addActionsForHtmlUI(){
    document.getElementById('camera').addEventListener('mousemove', function() {
        gAnimalGlobalRotation = this.value;
        renderScene();
    });
    document.getElementById('animate_on').onclick = function() {
        g_Animation=true
    };
    document.getElementById('animate_off').onclick = function() {
        g_Animation=false
    };
    document.getElementById('joint').addEventListener('mousemove', function() {
        g_leftLegJoint = this.value;
        renderScene();
    });
    document.getElementById('joint2').addEventListener('mousemove', function() {
        g_rightLegJoint = this.value;
        renderScene();
    });
}

function main() {
   setupWebGL();
   connectVariablesToGLSL();
   addActionsForHtmlUI();
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   requestAnimationFrame(tick);
}

function tick() {
    g_seconds=performance.now()/1000.0-g_startTime;
    updateAnimationAngles();
    renderScene();
    requestAnimationFrame(tick);
}

function updateAnimationAngles(){
    if(g_Animation){
        g_leftLegJoint = 1*Math.sin(g_seconds)
        g_rightLegJoint = 1*Math.cos(g_seconds)
        head_animation = 15*Math.sin(g_seconds);
    }
}

function renderScene(){
    globalRotMat = new Matrix4().rotate(gAnimalGlobalRotation, 0,1,0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);

var fpsIndicator = document.getElementById('fpsIndicator');
var duration = performance.now() - g_startTime;
fpsIndicator.innerHTML = " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration);


var head = new Triangle();
head.color = brown;
head.matrix.translate(-.07, 0.5, 0.0);
head.matrix.rotate(100, 1, 0, 0);
var headCoordinatesMat = new Matrix4(head.matrix);
var headCoordinatesMat2 = new Matrix4(head.matrix);
var headCoordinatesMat3 = new Matrix4(head.matrix);
var headCoordinatesMat4 = new Matrix4(head.matrix);
head.matrix.scale(0.15, .35, .4);
head.render();

rightear =  new Triangle();
rightear.color = brown;
rightear.matrix.rotate(-head_animation, 0, 1, 0.1);
rightear.matrix.scale(0.075, 0.1, 0.1);
rightear.matrix.translate(1.5, 4.5, -0.1);
rightear.render();

leftear =  new Triangle();
leftear.color = brown;
leftear.matrix.rotate(-head_animation, 0, 1, 0.1);
leftear.matrix.scale(0.075, 0.1, 0.1);
leftear.matrix.translate(-3.5, 4.5, -0.1);
leftear.render();

var body = new Cube();
body.color = brown;
body.matrix = headCoordinatesMat;
body.matrix.translate(-0.25, 0.1, 0.3);
var bodyCoordinatesMat = new Matrix4(body.matrix);
var bodyCoordinatesMat2 = new Matrix4(body.matrix);
var bodyCoordinatesMat3 = new Matrix4(body.matrix);
body.matrix.rotate(-head_animation, 0, 1, 0.1);
body.matrix.scale(.5, .7, 0.5);
body.render();

var tail = new Triangle();
tail.color = brown;
tail.matrix = bodyCoordinatesMat;
tail.matrix.translate(0.25, 0.1, 0.1, 0);
var tailCoordinatesMat = new Matrix4(tail.matrix);
tail.matrix.rotate(-head_animation, 0, 1, 0.1);
tail.matrix.scale(0.1, 1, 0.2);
tail.render();

var leftbackleg = new Cube();
leftbackleg.color = brown;
leftbackleg.matrix = headCoordinatesMat;
leftbackleg.matrix.translate(0.05, 0.8, 0.7);
leftbackleg.matrix.rotate(-g_leftLegJoint, 0, 1, 0.1);
var legCoordinatesMat = new Matrix4(leftbackleg.matrix);
leftbackleg.matrix.scale(.2, .1, 0.5);
leftbackleg.render();

var leftbackfoot = new Cube();
leftbackfoot.color = brown;
leftbackfoot.matrix = legCoordinatesMat;
leftbackfoot.matrix.translate(0.02, -0.1, 0.5);
leftbackfoot.matrix.rotate(-g_leftLegJoint, 0, 1, 0.1);
leftbackfoot.matrix.scale(.2, .1, 0.2);
leftbackfoot.render();

var leftfrontleg = new Cube();
leftfrontleg.color = brown;
leftfrontleg.matrix = headCoordinatesMat;
leftfrontleg.matrix.translate(0.05, -7, 0.5);
leftfrontleg.matrix.rotate(-g_leftLegJoint, 0, 1, 0.1);
leftfrontleg.matrix.scale(1, 1, 0.6);
leftfrontleg.render();

var leftfrontfoot = new Cube();
leftfrontfoot.color = brown;
leftfrontfoot.matrix = legCoordinatesMat;
leftfrontfoot.matrix.translate(0.05, -7, 0.3);
leftfrontfoot.matrix.rotate(-g_leftLegJoint, 0, 1, 0.1);
leftfrontfoot.matrix.scale(1, 1, 0.6);
leftfrontfoot.render();

var rightbackleg = new Cube();
rightbackleg.color = brown;
rightbackleg.matrix = headCoordinatesMat;
rightbackleg.matrix.rotate(g_rightLegJoint, 0, 1, 0.1);
rightbackleg.matrix.scale(1, 1, 0.6);
rightbackleg.matrix.translate(3.4, 7, 0.2);
rightbackleg.render();

var rightbackfoot = new Cube();
rightbackfoot.color = brown;
rightbackfoot.matrix = legCoordinatesMat;
rightbackfoot.matrix.rotate(g_rightLegJoint, 0, 1, 0.1);
rightbackfoot.matrix.scale(1, 1, 2);
rightbackfoot.matrix.translate(3.4, 7, -0.9);
rightbackfoot.render();

var rightfrontleg = new Cube();
rightfrontleg.color = brown;
rightfrontleg.matrix = headCoordinatesMat;
rightfrontleg.matrix.translate(0.1, -7, 0.1);
rightfrontleg.matrix.rotate(g_rightLegJoint, 0, 1, 0.1);
rightfrontleg.matrix.scale(1, 1, 1.3);
rightfrontleg.render();

var rightfrontfoot = new Cube();
rightfrontfoot.color = brown;
rightfrontfoot.matrix = legCoordinatesMat;
rightfrontfoot.matrix.translate(0.1, -7, 0.7);
rightfrontfoot.matrix.rotate(g_rightLegJoint, 0, 1, 0.1);
rightfrontfoot.matrix.scale(1, 1, 0.8);
rightfrontfoot.render();
}

document.addEventListener('click', function(event) {
    if (event.shiftKey) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    var buffer = new Uint8Array(canvas.width * canvas.height * 4);
    gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    }
});