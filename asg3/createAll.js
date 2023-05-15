const orange = [1.0, 0.5, 0.0, 1.0];
const brown = [0.5, 0.3, 0.0, 1.0];
const red = [1.0, 0.0, 0.0, 1.0];
const blue = [0.1, 0.6, 1.0, 1.0];
const greyblue = [0.5, 0.4, 0.4, 1.0];
const black = [0.0, 0.0, 0.0, 1.0]
const white = [1.0, 1.0, 1.0, 1.0]
const yellow = [1.0, 1.0, 0.0, 1.0];
let g_leftLegJoint = 0;
let g_rightLegJoint = 0;

// map = Array.from(Array(32), ()=> new Array(32).fill(0));
// for (let x = 0; x < 32; x++) {
//     for (let y = 0; y < 32; y++){
//         if ((x===0 && y%2===0) || (y===0 && x%2===0) || (x===31 && y%2===1) || (y===31 && x%2===1)){
//             map[x][y] = 1
//         } else if ((x===0 && y%2===1) || (y===0 && x%2===1) || (x===31 && y%2===0) || (y===31 && x%2===0)){
//             map[x][y] = -1
//         }
//     }
// }
// console.log(map);
//(z===0 && x%2===0) - left
//(x===31 && z%2===1) - back
//(z===31 && x%2===1) - right
//(x===0 && z%2===0) - front

function drawCube(x,y,z, color){
    let w = new Cube();
    w.color = color;
    w.textureNum = -2;
    w.matrix.scale(0.05, y, 0.05);
    w.matrix.translate(x, 0, z);
    w.renderfast();
}
function drawMap() {
    for (let x = 0; x < 32; x++) {
        for (let z = 0; z < 32; z++) {
            if ((z===0 && x%2===0) || (x===31 && z%2===1) || (z===31 && x%2===1)) {
                drawCube(x+65,0.4,z-1, red);
            }
            if ((z===0 && x%2===1) || (x===31 && z%2===0) || (z===31 && x%2===0)) {
                drawCube(x+65,0.4, z-1, blue);
            }
            if ((x===31 && z%2===1) || (z===31 && x%2===1)) {
                drawCube(x+33,0.3, z+30, red);
            }
            if ((x===31 && z%2===0) || (z===31 && x%2===0)) {
                drawCube(x+33,0.3, z+30, blue);
            }
            if ((x===31 && z%2===1) || (z===31 && x%2===1)) {
                drawCube(x+1,0.5, z+61, red);
            }
            if ((x===31 && z%2===0) || (z===31 && x%2===0)) {
                drawCube(x+1,0.5, z+61, blue);
            }
            if ((x===0 && z%2===0) || (z===31 && x%2===1)) {
                drawCube(x-31,0.2, z+61, red);
            }
            if ((x===0 && z%2===1) || (z===31 && x%2===0)) {
                drawCube(x-31,0.2, z+61, blue);
            }
            if ((x===0 && z%2===0) || (z===31 && x%2===1)) {
                drawCube(x-62,0.3, z+29, red);
            }
            if ((x===0 && z%2===1) || (z===31 && x%2===0)) {
                drawCube(x-62,0.3, z+29, blue);
            }
            if ((x===0 && z%2===0)) {
                drawCube(x-62,0.2, z-1, red);
            }
            if ((x===0 && z%2===1)) {
                drawCube(x-62,0.2, z-1, blue);
            }
            if ((x===0 && z%2===0) || (z===0 && x%2===0) || (x===31 && z%2===1)){
                drawCube(x-62,0.5, z-31, red);
            }
            if ((x===0 && z%2===1) || (z===0 && x%2===1) || (x===31 && z%2===0)) {
                drawCube(x-62,0.5, z-31, blue);
            }
            if (x===31 && z%2===1){
                drawCube(x-62,0.4,z, red);
            }
            if (x===31 && z%2===0) {
                drawCube(x-62,0.4, z, blue);
            }
            if (x===31 && z%2===1 && z < 20){
                drawCube(x-62,0.4, z+31, red);
            }
            if (x===31 && z%2===0 && z < 20) {
                drawCube(x-62,0.4, z+31, blue);
            }
            if (z===0 && x%2===0 || x===31 && z%2===1){
                drawCube(x-31,0.3, z+50, red);
            }
            if (z===0 && x%2===1 || x===31 && z%2===0){
                drawCube(x-31,0.3, z+50, blue);
            }
            if ((x===0 && z%2===1) || (z===0 && x%2===1) || (x===31 && z%2===0)) {
                drawCube(x,0.2, z+51, red);
            }
            if ((x===0 && z%2===0) || (z===0 && x%2===0) || (x===31 && z%2===1)) {
                drawCube(x,0.2, z+51, blue);
            }
            //--
            if (z===31 && x%2===1 || x===0 && z%2===0) {
                drawCube(x+43,0.4, z-63,blue);
            }
            if (z===31 && x%2===0 || x===0 && z%2===1) {
                drawCube(x+43,0.4, z-63,red);
            }
            if (z===0 && x%2===0) {
                drawCube(x+11,0.2, z-63,red);
            }
            if (z===0 && x%2===1) {
                drawCube(x+11,0.2, z-63,blue);
            }
            if (z===0 && x%2===0 || x===0 && z%2===0) {
                drawCube(x-19,0.3, z-63,red);
            }
            if (z===0 && x%2===1 || x===0 && z%2===1) {
                drawCube(x-19,0.3, z-63,blue);
            }
            if (x===0 && z%2===0 || z===31 && x%2===1) {
                drawCube(x-19,0.5, z-33,red);
            }
            if (x===0 && z%2===1 || z===31 && x%2===0) {
                drawCube(x-19,0.5, z-33,blue);
            }
            if (x===31 && z%2===1) {
                drawCube(x-19,0.4,z,red);
            }
            if (x===31 && z%2===0) {
                drawCube(x-19,0.4, z, blue);
            }
            if (x===0 && z%2===0 && z > 22) {
                drawCube(x+65,0.1, z-33,red);
            }
            if (x===0 && z%2===1 && z > 21) {
                drawCube(x+65,0.1, z-33,blue);
            }
            if (z===31 && x%2===1 && x < 10) {
                drawCube(x+65,0.6, z-41,red);
            }
            if (z===31 && x%2===0 && x < 10) {
                drawCube(x+65,0.6, z-41,blue);
            }
            if ((x===0 && z%2===0 && z > 20) || (x===0 && z%2===0 && z < 10) || (z===0 && x%2===0 && x <20)){
                drawCube(x+74,0.2, z-41,red);
            }
            if ((x===0 && z%2===1 && z > 20) || (x===0 && z%2===1 && z < 10) || (z===0 && x%2===1 && x < 20)){
                drawCube(x+74,0.2, z-41,blue);
            }
            if ((z===31 && x%2===1 && x > 11) || (x===31 && z%2===1 && z > 9)) {
                drawCube(x+62,0.5, z-51,red);
            }
            if ((z===31 && x%2===0 && x > 11) || (x===31 && z%2===0 && z > 8)) {
                drawCube(x+62,0.5, z-51,blue);
            }
        }
    }
}
function drawAllShapes() {
    drawMap();

    const body = new Triangle();
    body.color = brown;
    body.textureNum = -2;
    body.matrix.rotate(-head_animation, 1, 1, 0);
    body.matrix.scale(0.3, 0.3, 0.5);
    body.matrix.translate(0, 0.5, 1);
    body.render();

    const head = new Cube();
    head.color = brown;
    head.textureNum = -2;
    head.matrix.scale(0.13, 0.18, 0.18);
    head.matrix.translate(-0.5, 2.5, 2.5);
    head.render();

    const face = new Cube();
    face.color = greyblue;
    face.textureNum = -2;
    face.matrix.scale(0.1, 0.16, 0.2);
    face.matrix.translate(-0.5, 2.8, 2.5);
    face.render();

    const rightear = new Triangle();
    rightear.color = brown;
    rightear.textureNum = -2;
    rightear.matrix.rotate(-head_animation, 1, 1, 0);
    rightear.matrix.scale(0.08, 0.18, 0.3);
    rightear.matrix.translate(-1, 3, 2);
    rightear.render();

    const leftear = new Triangle();
    leftear.color = brown;
    leftear.textureNum = -2;
    leftear.matrix.rotate(head_animation, 1, 1, 0);
    leftear.matrix.scale(0.08, 0.18, 0.3);
    leftear.matrix.translate(1, 3, 2);
    leftear.render();

    const leftleg = new Cube();
    leftleg.color = brown;
    leftleg.textureNum = -2;
    leftleg.matrix.scale(0.03, 0.1, 0.01);
    leftleg.matrix.translate(2.5, 0.8, 60);
    leftleg.render();

    const leftlegback = new Cube();
    leftlegback.color = brown;
    leftlegback.textureNum = -2;
    leftlegback.matrix.scale(-0.03, 0.1, 0.01);
    leftlegback.matrix.translate(2.5, 0.8, 50);
    leftlegback.render();

    const rightlegback = new Cube();
    rightlegback.color = brown;
    rightlegback.textureNum = -2;
    rightlegback.matrix.scale(0.03, 0.1, 0.01);
    rightlegback.matrix.translate(2.5, 0.8, 50);
    rightlegback.render();

    const rightleg = new Cube();
    rightleg.color = brown;
    rightleg.textureNum = -2;
    rightleg.matrix.scale(-0.03, 0.1, 0.01);
    rightleg.matrix.translate(2.5, 0.8, 60);
    rightleg.render();

    let sky = new Cube();
    sky.textureNum = 1;
    sky.matrix.scale(30, 30, 30);
    sky.matrix.translate(-.5, -.5, -.5);
    sky.render();

    let ground = new Cube();
    ground.textureNum = 0;
    ground.matrix.scale(10, 0, 10);
    ground.matrix.translate(-.5, 0, -.5);
    ground.render();
}
