window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvasUI = document.getElementById('LeftUI')
    contextUI = canvasUI.getContext('2d')
    canvasG = document.getElementById('Screen')
    gl = canvasG.getContext('webgl')

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

    programFrameCurrent = Date.now()
    programFramePrevious = Date.now() - 16
    programInstance = requestAnimationFrame(loop)
}

function glInit() {
    let sourceShaderVertex = `
        attribute vec4 a_position;

        void main() {
            gl_Position = a_position;
        }
    `
    let sourceShaderFragment = `
        precision mediump float;

        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `
    program = gl.createProgram()

    shaderVertex = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(shaderVertex, sourceShaderVertex)
    gl.compileShader(shaderVertex)

    shaderFragment = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shaderFragment, sourceShaderFragment)
    gl.compileShader(shaderFragment)

    gl.attachShader(program, shaderVertex)
    gl.attachShader(program, shaderFragment)
    gl.linkProgram(program)
    gl.useProgram(program)

    bufferVertex = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex)
    bufferIndex = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferIndex)

    let coord = gl.getAttribLocation(program, 'a_position')
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
    
}

function mouseDownG(event) {
    console.log(1)
}

function mouseMoveG(event) {
    console.log(2)
}

function mouseUpG(event) {
    console.log(3)
}

function touchStartG(event) {
    console.log(4)
    event.preventDefault()
}

function touchMoveG(event) {
    console.log(5)
    event.preventDefault()
}

function touchEndG(event) {
    console.log(6)
    event.preventDefault()
}

function keyDownUI(event) {

}

function keyUpUI(event) {

}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(programInstance)
    }
}

function rightClick() {
    return false
}