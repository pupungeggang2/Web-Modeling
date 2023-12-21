window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvasUI = document.getElementById('LeftUI')
    contextUI = canvasUI.getContext('2d')
    canvasG = document.getElementById('Screen')
    contextG = canvasG.getContext('webgl')

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