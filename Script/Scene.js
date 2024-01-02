function loopScene() {
    displayScene()
}

function displayScene() {
    drawSceneUIInit()
    drawSceneInit()
    drawUpperUI()
    drawAxis()
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
    if (state === '') {

    }
}

function mouseMoveGScene(x, y, button) {
    if (state === '') {

    }
}

function mouseUpGScene(x, y, button) {
    if (state === '') {
        
    }
}