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

    if (stateEdit === 'SketchPolygon' || stateEdit === 'SketchFree') {
        drawTempSketch()
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
            newFile()
            matrixViewRotate = matrix4Identity()
            matrixViewRotateInv = matrix4Identity()
            matrixViewTranslate = matrix4Identity()
            matrixViewTranslateInv = matrix4Identity()
            matrixView = matrix4Identity()
            matrixViewInv = matrix4Identity()
            stateEdit = ''
            selectedPlane = -1
            selectedSketch = -1
        } else if (pointInsideRectArray(x, y, UI.buttonSave)) {
            state = 'Save'
            fileName = ''
            selectedPlane = -1
            selectedSketch = -1
        }
        
        if (pointInsideRectArray(x, y, UI.buttonPointer)) {
            stateEdit = ''
            selectedPlane = -1
            selectedSketch = -1
        } else if (pointInsideRectArray(x, y, UI.buttonMove)) {
            stateEdit = 'CameraMove'
            selectedPlane = -1
            selectedSketch = -1
        } else if (pointInsideRectArray(x, y, UI.buttonRotate)) {
            stateEdit = 'CameraRotate'
            selectedPlane = -1
            selectedSketch = -1
        } else if (pointInsideRectArray(x, y, UI.buttonReset)) {
            matrixViewRotate = matrix4Identity()
            matrixViewRotateInv = matrix4Identity()
            matrixViewTranslate = matrix4Identity()
            matrixViewTranslateInv = matrix4Identity()
            matrixView = matrix4Identity()
            matrixViewInv = matrix4Identity()
            stateEdit = ''
            selectedPlane = -1
            selectedSketch = -1
        } else if (pointInsideRectArray(x, y, UI.buttonPolygon)) {
            stateEdit = 'PlanePolygon'
            selectedPlane = -1
            selectedSketch = -1
        } else if (pointInsideRectArray(x, y, UI.buttonFree)) {
            stateEdit = 'PlaneFree'
            selectedPlane = -1
            selectedSketch = -1
        } else if (pointInsideRectArray(x, y, UI.buttonExtrude)) {
            stateEdit = 'ExtrudeSelect'
            selectedPlane = -1
            selectedSketch = -1
        }

        if (stateEdit === 'SketchPolygon') {
            if (pointInsideRectArray(x, y, UI.buttonCancel)) {
                stateEdit = ''
                selectedPlane = -1
            } else if (pointInsideRectArray(x, y, UI.buttonDown)) {
                if (sketchVar.polygonNum > 3) {
                    sketchVar.polygonNum -= 1
                }
                if (sketchVar.polygonMode === 2) {
                    sketchVar.tempVertice = []
                    let index = planeGConnection[selectedPlane][0]
                    for (let i = 0; i < sketchVar.polygonNum; i++) {
                        let matrixRotate = matrix4RotateAxis(planeG[index]['Normal'], 360 / sketchVar.polygonNum * i)
                        let matrixTranslate = matrix4Translate(-sketchVar.polygonCenter[0], -sketchVar.polygonCenter[1], -sketchVar.polygonCenter[2])
                        let matrixTranslateInv = matrix4Translate(sketchVar.polygonCenter[0], sketchVar.polygonCenter[1], sketchVar.polygonCenter[2])
                        let matrixTransform = matrix4Mul(matrixTranslateInv, matrix4Mul(matrixRotate, matrixTranslate))
                        sketchVar.tempVertice = sketchVar.tempVertice.concat(applyTransform(matrixTransform, sketchVar.polygonVertice))
                    }
                }
            } else if (pointInsideRectArray(x, y, UI.buttonUp)) {
                if (sketchVar.polygonNum < 9) {
                    sketchVar.polygonNum += 1
                }
                
                if (sketchVar.polygonMode === 2) {
                    sketchVar.tempVertice = []
                    let index = planeGConnection[selectedPlane][0]
                    for (let i = 0; i < sketchVar.polygonNum; i++) {
                        let matrixRotate = matrix4RotateAxis(planeG[index]['Normal'], 360 / sketchVar.polygonNum * i)
                        let matrixTranslate = matrix4Translate(-sketchVar.polygonCenter[0], -sketchVar.polygonCenter[1], -sketchVar.polygonCenter[2])
                        let matrixTranslateInv = matrix4Translate(sketchVar.polygonCenter[0], sketchVar.polygonCenter[1], sketchVar.polygonCenter[2])
                        let matrixTransform = matrix4Mul(matrixTranslateInv, matrix4Mul(matrixRotate, matrixTranslate))
                        sketchVar.tempVertice = sketchVar.tempVertice.concat(applyTransform(matrixTransform, sketchVar.polygonVertice))
                    }
                }
            } else if (pointInsideRectArray(x, y, UI.buttonConfirm)) {
                let index = planeGConnection[selectedPlane][0]
                let tempConnection = []
                for (let i = 3; i < sketchVar.tempVertice.length - 3; i += 3) {
                    let tempTriangle = [sketchVar.tempVertice[0], sketchVar.tempVertice[1], sketchVar.tempVertice[2], sketchVar.tempVertice[i], sketchVar.tempVertice[i + 1], sketchVar.tempVertice[i + 2], sketchVar.tempVertice[i + 3], sketchVar.tempVertice[i + 4], sketchVar.tempVertice[i + 5]]
                    addSketchNormal(tempTriangle, planeG[index]['Normal'])
                    tempConnection.push(planeSketchID)
                    planeSketchID += 1
                }
                planeSketchConnection.push(tempConnection)
                stateEdit = ''
                selectedPlane = -1
            }
        } else if (stateEdit === 'SketchFree') {
            if (pointInsideRectArray(x, y, UI.buttonConfirm)) {
                if (sketchVar.tempVertice.length > 8) {
                    let index = planeGConnection[selectedPlane][0]
                    let tempConnection = []
                    for (let i = 3; i < sketchVar.tempVertice.length - 3; i += 3) {
                        let tempTriangle = [sketchVar.tempVertice[0], sketchVar.tempVertice[1], sketchVar.tempVertice[2], sketchVar.tempVertice[i], sketchVar.tempVertice[i + 1], sketchVar.tempVertice[i + 2], sketchVar.tempVertice[i + 3], sketchVar.tempVertice[i + 4], sketchVar.tempVertice[i + 5]]
                        addSketchNormal(tempTriangle, planeG[index]['Normal'])
                        tempConnection.push(planeSketchID)
                        planeSketchID += 1
                    }
                    planeSketchConnection.push(tempConnection)
                    stateEdit = ''
                    selectedPlane = -1
                }
            } else if (pointInsideRectArray(x, y, UI.buttonErase)) {
                sketchVar.tempVertice = []
            } else if (pointInsideRectArray(x, y, UI.buttonCancel)) {
                sketchEdit = ''
                selectedPlane = -1
            }
        }
    } else if (state === 'Save') {
        if (pointInsideRectArray(x, y, UI.buttonConfirm)) {
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
        } else if (pointInsideRectArray(x, y, UI.buttonCancel)) {
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
                let matrixRotateY = matrix4Rotate(1, -diff[0] * 40)
                let matrixRotateYInv = matrix4Rotate(1, diff[0] * 40)
                let matrixRotateX = matrix4Rotate(0, diff[1] * 40)
                let matrixRotateXInv = matrix4Rotate(0, -diff[1] * 40)
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
            if (stateEdit === 'PlanePolygon') {
                let tempSelect = selectPlane(positionG)
                
                if (tempSelect != -1) {
                    selectedPlane = tempSelect
                    stateEdit = 'SketchPolygon'
                    sketchVar.available = false
                    sketchVar.polygonNum = 3
                    sketchVar.polygonMode = 0
                    sketchVar.polygonCenter = [0, 0, 0]
                    sketchVar.polygonVertice = [0, 0, 0]
                    sketchVar.tempVertice = []
                }
            } else if (stateEdit === 'SketchPolygon') {
                if (sketchVar.polygonMode === 0) {
                    let index = planeGConnection[selectedPlane][0]
                    sketchVar.polygonCenter = linePlaneIntersection(positionG, planeG[index]['Vertice'], planeG[index]['Normal'])[1]
                    sketchVar.polygonMode = 1
                } else if (sketchVar.polygonMode === 1) {
                    let index = planeGConnection[selectedPlane][0]
                    sketchVar.polygonVertice = linePlaneIntersection(positionG, planeG[index]['Vertice'], planeG[index]['Normal'])[1]
                    sketchVar.available = true
                    sketchVar.polygonMode = 2

                    sketchVar.tempVertice = []
                    for (let i = 0; i < sketchVar.polygonNum; i++) {
                        let matrixRotate = matrix4RotateAxis(planeG[index]['Normal'], 360 / sketchVar.polygonNum * i)
                        let matrixTranslate = matrix4Translate(-sketchVar.polygonCenter[0], -sketchVar.polygonCenter[1], -sketchVar.polygonCenter[2])
                        let matrixTranslateInv = matrix4Translate(sketchVar.polygonCenter[0], sketchVar.polygonCenter[1], sketchVar.polygonCenter[2])
                        let matrixTransform = matrix4Mul(matrixTranslateInv, matrix4Mul(matrixRotate, matrixTranslate))
                        sketchVar.tempVertice = sketchVar.tempVertice.concat(applyTransform(matrixTransform, sketchVar.polygonVertice))
                    }
                } else if (sketchVar.polygonMode === 2) {
                    sketchVar.available = false
                    sketchVar.polygonMode = 0
                    sketchVar.polygonCenter = [0, 0, 0]
                    sketchVar.polygonVertice = [0, 0, 0]
                    sketchVar.tempVertice = []
                }
            } else if (stateEdit === 'PlaneFree') {
                let tempSelect = selectPlane(positionG)
                
                if (tempSelect != -1) {
                    selectedPlane = tempSelect
                    stateEdit = 'SketchFree'
                    sketchVar.available = false
                    sketchVar.tempVertice = []
                }
            } else if (stateEdit === 'SketchFree') {
                let index = planeGConnection[selectedPlane][0]
                let tempVertice = linePlaneIntersection(positionG, planeG[index]['Vertice'], planeG[index]['Normal'])[1]
                sketchVar.tempVertice = sketchVar.tempVertice.concat(tempVertice)
            } else if (stateEdit === 'ExtrudeSelect') {
                let tempSelect = selectSketch(positionG)
                
                if (tempSelect != -1) {
                    stateEdit = 'ExtrudeSketch'
                    selectedSketch = tempSelect
                    extrudeDistance = 0
                }
            } else if (stateEdit === 'ExtrudeSketch') {
                
            }
        }
    }
}