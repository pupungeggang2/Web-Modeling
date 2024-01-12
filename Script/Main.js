window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvasUI = document.getElementById('LeftUI')
    contextUI = canvasUI.getContext('2d')
    canvasG = document.getElementById('Screen')
    gl = canvasG.getContext('webgl')
    debug = document.getElementById('Debug')

    if (!gl) {
        alert('No GL!')
        return
    }

    window.addEventListener('keydown', keyDownUI, false)
    window.addEventListener('keyup', keyUpUI, false)
    
    canvasUI.addEventListener('mouseup', mouseUpUI, false)

    canvasG.addEventListener('mousedown', mouseDownG, false)
    canvasG.addEventListener('mousemove', mouseMoveG, false)
    canvasG.addEventListener('mouseup', mouseUpG, false)
    canvasG.addEventListener('touchstart', touchStartG, false)
    canvasG.addEventListener('touchmove', touchMoveG, false)
    canvasG.addEventListener('touchend', touchEndG, false)

    imageLoad()
    glInit()

    matrixViewRotate = matrix4Identity()
    matrixViewRotateInv = matrix4Identity()
    matrixViewTranslate = matrix4Identity()
    matrixViewTranslateInv = matrix4Identity()
    matrixView = matrix4Identity()
    matrixViewInv = matrix4Identity()
    matrixCamera = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, -0.5, 0,
        0, 0, 0, 1
    ]

    programFrameCurrent = Date.now()
    programFramePrevious = Date.now() - 16
    programInstance = requestAnimationFrame(loop)
}

function glInit() {
    let sourceShaderVertex = `
        attribute vec4 a_position;
        uniform mat4 u_matrix;

        void main() {
            gl_Position = u_matrix * a_position;
            gl_PointSize = 10.0;
        }
    `
    let sourceShaderFragment = `
        precision mediump float;
        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
        }
    `
    shaderProgram = gl.createProgram()

    shaderVertex = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(shaderVertex, sourceShaderVertex)
    gl.compileShader(shaderVertex)

    shaderFragment = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shaderFragment, sourceShaderFragment)
    gl.compileShader(shaderFragment)

    gl.attachShader(shaderProgram, shaderVertex)
    gl.attachShader(shaderProgram, shaderFragment)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)

    bufferVertex = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex)
    bufferIndex = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferIndex)

    currentColor = gl.getUniformLocation(shaderProgram, 'u_color')
    currentCamera = gl.getUniformLocation(shaderProgram, 'u_matrix')

    let coord = gl.getAttribLocation(shaderProgram, 'a_position')
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(coord)
}

function loop() {
    programFrameCurrent = Date.now()
    delta = programFrameCurrent - programFramePrevious

    loopScene()

    programFramePrevious = Date.now()
    programInstance = requestAnimationFrame(loop)
}

function mouseUpUI(event) {
    let canvasUIRect = canvasUI.getBoundingClientRect()
    let x = event.clientX - canvasUIRect.left
    let y = event.clientY - canvasUIRect.top
    let button = event.button

    mouseUpUIScene(x, y, button)
}

function mouseDownG(event) {
    let canvasGRect = canvasG.getBoundingClientRect()
    let x = event.clientX - canvasGRect.left
    let y = event.clientY - canvasGRect.top
    let button = event.button

    mouseDownGScene(x, y, button)
}

function mouseMoveG(event) {
    let canvasGRect = canvasG.getBoundingClientRect()
    let x = event.clientX - canvasGRect.left
    let y = event.clientY - canvasGRect.top
    
    mouseMoveGScene(x, y)
}

function mouseUpG(event) {
    let canvasGRect = canvasG.getBoundingClientRect()
    let x = event.clientX - canvasGRect.left
    let y = event.clientY - canvasGRect.top
    let button = event.button

    mouseUpGScene(x, y, button)
}

function touchStartG(event) {
    let canvasGRect = canvasG.getBoundingClientRect()
    let x = event.changeTouches[0].pageX - canvasGRect.left
    let y = event.changeTouches[0].pageY - canvasGRect.top

    mouseDownGScene(x, y, 0)
    event.preventDefault()
}

function touchMoveG(event) {
    let canvasGRect = canvasG.getBoundingClientRect()
    let x = event.changeTouches[0].pageX - canvasGRect.left
    let y = event.changeTouches[0].pageY - canvasGRect.top

    mouseMoveGScene(x, y)
    event.preventDefault()
}

function touchEndG(event) {
    let canvasGRect = canvasG.getBoundingClientRect()
    let x = event.changeTouches[0].pageX - canvasGRect.left
    let y = event.changeTouches[0].pageY - canvasGRect.top

    mouseUpGScene(x, y, 0)
    event.preventDefault()
}

function keyDownUI(event) {
    let key = event.key

    keyDownUIScene(key)
}

function keyUpUI(event) {
    let key = event.key

    keyUpUIScene(key)
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(programInstance)
    }
}

function rightClick() {
    return false
}