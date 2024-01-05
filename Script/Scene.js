function loopScene() {
    displayScene()
}

function displayScene() {
    drawSceneUIInit()
    drawSceneInit()
    drawUpperUI()
    drawAxis()
    drawFloor()
    drawModel()
}

function keyDownUIScene(key) {
}

function keyUpUIScene(key) {
    if (state === '') {

    }
}

function mouseUpUIScene(x, y, button) {
    if (state === '') {
        if (pointInsideRectArray(x, y, UI.buttonNew)) {
            
        } else if (pointInsideRectArray(x, y, UI.buttonSave)) {
            state = 'Save'
        }
        
        if (pointInsideRectArray(x, y, UI.buttonPointer)) {
            stateEdit = ''
        } else if (pointInsideRectArray(x, y, UI.buttonMove)) {
            stateEdit = 'CameraMove'
        } else if (pointInsideRectArray(x, y, UI.buttonRotate)) {
            stateEdit = 'CameraRotate'
        }
    } else if (state === 'Save') {
        state = ''
        let a = document.createElement('a')
        a.setAttribute('id', 'TempSave')
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('123'))
        a.setAttribute('download', '123.txt')
        document.body.appendChild(a)
        a.click()
        document.removeChild(a)
    }
}

function mouseDownGScene(x, y, button) {
    mousePressed = true
    if (state === '') {
        
    }
}

function mouseMoveGScene(x, y, button) {
    let positionG = [(x - 240) / 240, (240 - y) / 240]

    if (state === '') {
        if (stateEdit === 'CameraRotate') {
            if (mousePressed === true) {
                let diff = [positionG[0] - mousePositionPrevious[0], positionG[1] - mousePositionPrevious[1]]
                let matrixRotateY = matrix4Rotate(1, diff[0] * 40)
                let matrixRotateX = matrix4Rotate(0, -diff[1] * 40)
                let matrixRotateTemp = matrix4Mul(matrixRotateY, matrixRotateX)
                matrixViewRotate = matrix4Mul(matrixRotateTemp, matrixViewRotate)
                matrixView = matrix4Mul(matrixViewTranslate, matrixViewRotate)
            }
        } else if (stateEdit === 'CameraMove') {
            if (mousePressed === true) {
                let diff = [positionG[0] - mousePositionPrevious[0], positionG[1] - mousePositionPrevious[1]]
                let matrixTranslateTemp = matrix4Translate(diff[0], diff[1], 0)
                matrixViewTranslate = matrix4Mul(matrixTranslateTemp, matrixViewTranslate)
                matrixView = matrix4Mul(matrixViewTranslate, matrixViewRotate)
            }
        }
    }

    mousePositionPrevious = [positionG[0], positionG[1]]
}

function mouseUpGScene(x, y, button) {
    mousePressed = false
    if (state === '') {
        
    }
}