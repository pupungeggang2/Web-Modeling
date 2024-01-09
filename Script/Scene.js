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
    drawFloor()
    drawModel()
    drawSketch()
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
        } else if (pointInsideRectArray(x, y, UI.buttonMove)) {
            stateEdit = 'CameraMove'
        } else if (pointInsideRectArray(x, y, UI.buttonRotate)) {
            stateEdit = 'CameraRotate'
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