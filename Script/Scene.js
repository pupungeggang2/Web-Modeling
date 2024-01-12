function loopScene() {
    displayScene()
}

function displayScene() {
    // Init
    drawSceneUIInit()
    drawSceneInit()
    
    // UI
    drawUpperUI()

    // Main part
    drawAxis()
    drawPlane()
    drawSketch()
    //drawDot()

    if (sketchVar.available === true) {
        if (stateEdit === 'SketchRectangle') {
            drawTempRect()
        }
    }
}

function keyDownUIScene(key) {
    if (state === 'Save') {
        if (key.length === 1) {
            if (key >= 'a' && key <= 'z' || key >= 'A' && key <= 'Z' || key >= '0' && key <= '9') {
                fileName = fileName + key
            }
        } else if (key === 'Backspace') {
            if (fileName.length > 0) {
                fileName = fileName.slice(0, fileName.length - 1)
            }
        }
    }
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
            fileName = ''
        }
        
        if (pointInsideRectArray(x, y, UI.buttonPointer)) {
            stateEdit = ''
            selectedPlane = -1
        } else if (pointInsideRectArray(x, y, UI.buttonMove)) {
            stateEdit = 'CameraMove'
            selectedPlane = -1
        } else if (pointInsideRectArray(x, y, UI.buttonRotate)) {
            stateEdit = 'CameraRotate'
            selectedPlane = -1
        } else if (pointInsideRectArray(x, y, UI.buttonReset)) {
            matrixViewRotate = matrix4Identity()
            matrixViewTranslate = matrix4Identity()
            matrixView = matrix4Mul(matrixViewTranslate, matrixViewRotate)
        } else if (pointInsideRectArray(x, y, UI.buttonRectangle)) {
            stateEdit = 'PlaneRectangle'
        } else if (pointInsideRectArray(x, y, UI.buttonPolygon)) {
            stateEdit = 'PlanePolygon'
        } else if (pointInsideRectArray(x, y, UI.buttonFree)) {
            stateEdit = 'PlaneFree'
        }
    } else if (state === 'Save') {
        if (pointInsideRectArray(x, y, UI.buttonSaveConfirm)) {
            if (fileName.length > 0) {
                state = ''

                let a = document.createElement('a')
                a.setAttribute('id', 'TempSave')
                a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('123'))
                a.setAttribute('download', `${fileName}.txt`)
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            }
        } else if (pointInsideRectArray(x, y, UI.buttonSaveCancel)) {
            state = ''
        }
    }
}

function mouseDownGScene(x, y, button) {
    let positionG = [(x - 240) / 240, (240 - y) / 240]
    mousePressed = true

    if (button === 0) {
        if (state === '') {

        }
    }
}

function mouseMoveGScene(x, y) {
    let positionG = [(x - 240) / 240, (240 - y) / 240]

    if (state === '') {
        if (stateEdit === 'CameraRotate') {
            if (mousePressed === true) {
                let diff = [positionG[0] - mousePositionPrevious[0], positionG[1] - mousePositionPrevious[1]]
                let matrixRotateY = matrix4Rotate(1, diff[0] * 40)
                let matrixRotateYInv = matrix4Rotate(1, -diff[0] * 40)
                let matrixRotateX = matrix4Rotate(0, -diff[1] * 40)
                let matrixRotateXInv = matrix4Rotate(0, diff[1] * 40)
                matrixViewRotate = matrix4Mul(matrix4Mul(matrixRotateY, matrixRotateX), matrixViewRotate)
                matrixViewRotateInv = matrix4Mul(matrixViewRotateInv, matrix4Mul(matrixRotateXInv, matrixRotateYInv))
                matrixView = matrix4Mul(matrixViewTranslate, matrixViewRotate)
                matrixViewInv = matrix4Mul(matrixViewRotateInv, matrixViewTranslateInv)
            }
        } else if (stateEdit === 'CameraMove') {
            if (mousePressed === true) {
                let diff = [positionG[0] - mousePositionPrevious[0], positionG[1] - mousePositionPrevious[1]]
                matrixViewTranslate = matrix4Mul(matrix4Translate(diff[0], diff[1], 0), matrixViewTranslate)
                matrixViewTranslateInv = matrix4Mul(matrixViewTranslateInv, matrix4Translate(-diff[0], -diff[1], 0))
                matrixView = matrix4Mul(matrixViewTranslate, matrixViewRotate)
                matrixViewInv = matrix4Mul(matrixViewRotateInv, matrixViewTranslateInv)
            }
        }
    }

    mousePositionPrevious = [positionG[0], positionG[1]]
}

function mouseUpGScene(x, y, button) {
    let positionG = [(x - 240) / 240, (240 - y) / 240]
    mousePressed = false

    if (button === 0) {
        if (state === '') {
            
        }
    }
}