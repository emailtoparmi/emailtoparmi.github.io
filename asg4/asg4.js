let VSHADER_SOURCE = `
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   attribute vec3 a_Normal;
   varying vec2 v_UV;
   varying vec3 v_Normal;
   varying vec4 v_VertPos;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_GlobalRotateMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;
   uniform mat3 u_NormalMatrix;
   uniform bool u_Clicked;
   void main() {
      if (u_Clicked) {
         gl_Position = vec4(1.0, 1.0, 1.0, 1.0);
         return;
      }
      vec4 transformedPosition = u_ModelMatrix * a_Position;
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * transformedPosition;
      v_Normal = normalize(u_NormalMatrix * a_Normal);
      v_UV = a_UV;
      v_VertPos = transformedPosition;
   }`;
let FSHADER_SOURCE = `
   precision mediump float;
   varying vec2 v_UV;
   varying vec3 v_Normal;
   varying vec4 v_VertPos;
   uniform vec4 u_FragColor;
   uniform sampler2D u_Sampler0;
   uniform sampler2D u_Sampler1;
   uniform int u_whichTexture;
   uniform vec3 u_lightPos;
   uniform vec3 u_cameraPos;
   uniform bool u_lightOn;

   void main() {
      if (u_whichTexture == -2) {
         gl_FragColor = u_FragColor;
      } else if (u_whichTexture == -1) {
         gl_FragColor = vec4(v_UV, 1.0, 1.0);
      } else if (u_whichTexture == 0) {
         gl_FragColor = texture2D(u_Sampler0, v_UV);
      } else if (u_whichTexture == 1) {
         gl_FragColor = texture2D(u_Sampler1, v_UV);
      } else {
         vec3 normal = normalize(v_Normal);
         vec3 lightDirection = normalize(u_lightPos - v_VertPos.xyz);
         vec3 lightVector = u_lightPos-vec3(v_VertPos);
         float r = length(lightVector);
         if(r<1.0){
            gl_FragColor = vec4(1,0,0,1);
         } else if (r<2.0){
            gl_FragColor = vec4(0,1,0,1);
         }
         float diffuse = max(dot(normal, lightDirection), 0.0);
         vec3 reflectDirection = reflect(-lightDirection, normal);
         vec3 viewDirection = normalize(u_cameraPos - v_VertPos.xyz);
         float specular = pow(max(dot(viewDirection, reflectDirection), 0.0), 10.0)* 0.5;
         
         // vec4 ambientColor = vec4(0.2, 0.2, 0.2, 1.0);
         // vec4 diffuseColor = vec4(1.0, 0.2, 0.2, 1.0);
         vec4 specularColor = vec4(1.0, 1.0, 1.0, 1.0);
         
         vec4 ambientColor = vec4(gl_FragColor) * diffuse * 0.7;
         vec4 diffuseColor = vec4(gl_FragColor) * 0.3;
         // vec4 specularColor = vec4(gl_FragColor) * 0.3;
         
         vec4 finalColor;
         if (u_lightOn) {
            finalColor = ambientColor + diffuseColor * diffuse + specularColor * specular;
         } else {
            finalColor = ambientColor;
         }
         gl_FragColor = finalColor;
      }
   }`;
let gl;
let canvas;
let a_Position;
let a_UV;
let u_NormalMatrix;
let u_lightOn;
let u_FragColor;
let u_lightPos;
let u_cameraPos;
let u_Size;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix;
let u_Sampler0;
let u_Sampler1;
let u_whichTexture;
let a_Normal;
let u_Clicked;
let g_camera;
let gAnimalGlobalRotation = 0;
let head_animation = 0;
let g_Animation = false;
let g_normalOn = false;
let g_lightOn = true;
let g_lightPos = [0, 1, 1];
let g_startTime = performance.now() / 1000.0;
let g_seconds = performance.now() / 1000.0 - g_startTime;

function setupWebGL() {
    canvas = document.getElementById('asg4');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    gl = getWebGLContext(canvas, {preserveDrawingBuffer: true});
    // gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    a_UV = gl.getAttribLocation(gl.program, 'a_UV');
    if (a_UV < 0) {
        console.log('Failed to get the storage location of a_UV');
        return;
    }
    u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
    if (!u_NormalMatrix) {
        console.log('Failed to get u_NormalMatrix');
        return;
    }
    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if (!u_whichTexture) {
        console.log('Failed to get u_whichTexture');
        return;
    }
    a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
    if (a_Normal < 0) {
        console.log('Failed to get the storage location of a_Normal');
        return;
    }
    u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');
    if (!u_Clicked) {
        console.log('Failed to get u_Clicked');
        return;
    }
    u_lightOn = gl.getUniformLocation(gl.program, 'u_lightOn');
    if (!u_lightOn) {
        console.log('Failed to get u_lightOn');
        return;
    }
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get u_FragColor');
        return;
    }
    u_lightPos = gl.getUniformLocation(gl.program, 'u_lightPos');
    if (!u_lightPos) {
        console.log('Failed to get u_lightPos');
        return;
    }
    u_cameraPos = gl.getUniformLocation(gl.program, 'u_cameraPos');
    if (!u_cameraPos) {
        console.log('Failed to get u_cameraPos');
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
    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
        console.log('Failed to get u_ViewMatrix');
        return;
    }
    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    if (!u_ProjectionMatrix) {
        console.log('Failed to get u_ProjectionMatrix');
        return;
    }
    u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    if (!u_Sampler0) {
        console.log('Failed to get the storage location of u_Sampler0');
        return false;
    }
    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler1) {
        console.log('Failed to get the storage location of u_Sampler1');
        return false;
    }
    let identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function addActionsForHtmlUI() {
    document.getElementById('camera').addEventListener('mousemove', function () {
        gAnimalGlobalRotation = this.value;
        renderScene();
    });
    document.getElementById('lightx').addEventListener('mousemove', function (ev) {
        if (ev.buttons === 1) {
            g_lightPos[0] = this.value / 100;
            renderScene();
        }
    });
    document.getElementById('lighty').addEventListener('mousemove', function (ev) {
        if (ev.buttons === 1) {
            g_lightPos[1] = this.value / 100;
            renderScene();
        }
    });
    document.getElementById('lightz').addEventListener('mousemove', function (ev) {
        if (ev.buttons === 1) {
            g_lightPos[2] = this.value / 100;
            renderScene();
        }
    });
    document.getElementById('animate_on').onclick = function () {
        g_Animation = true;
    };
    document.getElementById('animate_off').onclick = function () {
        g_Animation = false;
    };
    document.getElementById('normal_on').onclick = function () {
        g_normalOn = true;
    };
    document.getElementById('normal_off').onclick = function () {
        g_normalOn = false;
    };
    document.getElementById('light_on').onclick = function () {
        g_lightOn = true;
    };
    document.getElementById('light_off').onclick = function () {
        g_lightOn = false;
    };
}

function initTextures() {
    let ground = new Image();
    let sky = new Image();
    if (!ground) {
        console.log('Failed to create the ground object');
        return false;
    }
    if (!sky) {
        console.log('Failed to create the sky object');
        return false;
    }
    ground.onload = function () {
        sendTextureToTEXTURE(ground, u_Sampler0, gl.TEXTURE0, 0);
    };
    sky.onload = function () {
        sendTextureToTEXTURE(sky, u_Sampler1, gl.TEXTURE1, 1);
    };
    sky.src = 'sky.jpg';
    ground.src = 'grass.jpeg';
    return true;
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

function sendTextureToTEXTURE(image, u_Sampler, textur, x) {
    let texture = gl.createTexture();
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(textur);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
    } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.uniform1i(u_Sampler, x);
}

function main() {
    setupWebGL();
    connectVariablesToGLSL();
    addActionsForHtmlUI();
    g_camera = new Camera();
    document.onkeydown = keydown;
    canvas.onmousemove = function (ev) {
        mouseCam(ev);
    }
    canvas.onmousedown = function (ev) {
        check(ev);
    }
    initTextures();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    requestAnimationFrame(tick);
}

function check(ev) {
    let picked = false;
    let x = ev.clientX, y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) { // inside canvas
        let x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
        gl.uniform1i(u_Clicked, 1);
        let pixels = new Uint8Array(4);
        gl.readPixels(x_in_canvas, y_in_canvas, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        if (pixels[0] === 255)
            picked = true;
        gl.uniform1i(u_Clicked, 0);
    }
    if (!picked) {
        console.log("create cube");
        let block = new Cube();
        block.color = [.90, .80, .40, 1.0];
        block.textureNum = -2;
        block.renderfast();
    }
}

function convertCoordinatesEventToGL(ev) {
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    return [x, y];
}

function mouseCam(ev) {
    let coord = convertCoordinatesEventToGL(ev);
    if (coord[0] < 0.5) { // left side
        g_camera.panMLeft(coord[0] * -10);
    } else {
        g_camera.panMRight(coord[0] * -10);
    }
}

function keydown(ev) {
    if (ev.keyCode === 39 || ev.keyCode === 68) {
        g_camera.right();
    } else if (ev.keyCode === 37 || ev.keyCode === 65) {
        g_camera.left();
    } else if (ev.keyCode === 38 || ev.keyCode === 87) {
        g_camera.forward();
    } else if (ev.keyCode === 40 || ev.keyCode === 83) {
        g_camera.back();
    } else if (ev.keyCode === 81) {
        g_camera.panLeft();
    } else if (ev.keyCode === 69) {
        g_camera.panRight();
    }
    // console.log(g_camera);
    renderScene();
}

function updateAnimationAngles() {
    if (g_Animation) {
        // g_leftLegJoint = Math.sin(g_seconds)
        // g_rightLegJoint = Math.cos(g_seconds)
        head_animation = Math.cos(g_seconds);
        g_lightPos[0] = 10*Math.cos(g_seconds);
    }
}

function tick() {
    g_seconds = performance.now() / 1000.0 - g_startTime;
    updateAnimationAngles();
    renderScene();
    requestAnimationFrame(tick);
}


function renderScene() {
    // Pass the projection matrix
    let projMat = g_camera.projMat;
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    // Pass the view matrix
    let viewMat = g_camera.viewMat;
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

    // Pass the matrix to u_ModelMatrix attribute
    let globalRotMat = new Matrix4().rotate(gAnimalGlobalRotation, 0, 1, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawAllShapes();
}
