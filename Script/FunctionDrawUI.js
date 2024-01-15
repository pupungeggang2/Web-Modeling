function drawSceneUIInit() {
    contextUI.font = '24px neodgm'
    contextUI.textAlign = 'left'
    contextUI.textBaseline = 'top'
    contextUI.fillStyle = 'White'
    contextUI.strokeStyle = 'Black'
    contextUI.clearRect(0, 0, 640, 120)
    contextUI.fillRect(0, 0, 640, 120)
    contextUI.fillStyle = 'Black'
    contextUI.lineWidth = 2
}

function drawUpperUI() {
    contextUI.drawImage(img.button.newFile, UI.buttonNew[0], UI.buttonNew[1])
    contextUI.drawImage(img.button.save, UI.buttonSave[0], UI.buttonSave[1])

    contextUI.drawImage(img.button.pointer, UI.buttonPointer[0], UI.buttonPointer[1])

    if (state === '' && stateEdit === '') {
        contextUI.fillText('Simple Modeling Program', UI.text[0], UI.text[1])
        contextUI.drawImage(img.selectFrame, UI.buttonPointer[0], UI.buttonPointer[1])
    }

    contextUI.drawImage(img.button.move, UI.buttonMove[0], UI.buttonMove[1])

    if (state === '' && stateEdit === 'CameraMove') {
        contextUI.fillText('Mode : Camera Move', UI.text[0], UI.text[1])
        contextUI.drawImage(img.selectFrame, UI.buttonMove[0], UI.buttonMove[1])
    }

    contextUI.drawImage(img.button.rotate, UI.buttonRotate[0], UI.buttonRotate[1])

    if (state === '' && stateEdit === 'CameraRotate') {
        contextUI.fillText('Mode : Camera Rotate', UI.text[0], UI.text[1])
        contextUI.drawImage(img.selectFrame, UI.buttonRotate[0], UI.buttonRotate[1])
    }
    
    contextUI.drawImage(img.button.reset, UI.buttonReset[0], UI.buttonReset[1])

    contextUI.drawImage(img.button.selectSketch, UI.buttonSelectSketch[0], UI.buttonSelectSketch[1])
    contextUI.drawImage(img.button.selectBody, UI.buttonSelectBody[0], UI.buttonSelectBody[1])
    contextUI.drawImage(img.button.moveObject, UI.buttonMoveObject[0], UI.buttonMoveObject[1])
    contextUI.drawImage(img.button.rotateObject, UI.buttonRotateObject[0], UI.buttonRotateObject[1])
    contextUI.drawImage(img.button.removeObject, UI.buttonRemoveObject[0], UI.buttonRemoveObject[1])

    contextUI.drawImage(img.button.polygon, UI.buttonPolygon[0], UI.buttonPolygon[1])
    contextUI.drawImage(img.button.free, UI.buttonFree[0], UI.buttonFree[1])

    if (state === '' && stateEdit === 'PlanePolygon') {
        contextUI.drawImage(img.selectFrame, UI.buttonPolygon[0], UI.buttonPolygon[1])
        contextUI.fillText('Select Plane', UI.text[0], UI.text[1])
    }

    if (state === '' && stateEdit === 'PlaneFree') {
        contextUI.drawImage(img.selectFrame, UI.buttonFree[0], UI.buttonFree[1])
        contextUI.fillText('Select Plane', UI.text[0], UI.text[1])
    }

    if (state === '' && stateEdit === 'SketchPolygon') {
        contextUI.drawImage(img.selectFrame, UI.buttonPolygon[0], UI.buttonPolygon[1])

        contextUI.fillText(`Angle Num:`, UI.text[0], UI.text[1])
        contextUI.fillText(`${sketchVar.polygonNum}`, UI.textNum[0], UI.textNum[1])
        contextUI.strokeRect(UI.buttonDown[0], UI.buttonDown[1], UI.buttonDown[2], UI.buttonDown[3])
        contextUI.fillText(`-`, UI.textDown[0], UI.textDown[1])
        contextUI.strokeRect(UI.buttonUp[0], UI.buttonUp[1], UI.buttonUp[2], UI.buttonUp[3])
        contextUI.fillText(`+`, UI.textUp[0], UI.textUp[1])
        contextUI.strokeRect(UI.buttonCancel[0], UI.buttonCancel[1], UI.buttonCancel[2], UI.buttonCancel[3])
        contextUI.fillText(`Back`, UI.textCancel[0], UI.textCancel[1])
        contextUI.strokeRect(UI.buttonConfirm[0], UI.buttonConfirm[1], UI.buttonConfirm[2], UI.buttonConfirm[3])
        contextUI.fillText(`OK`, UI.textConfirm[0], UI.textConfirm[1])
    }

    if (state === '' && stateEdit === 'SketchFree') {
        contextUI.drawImage(img.selectFrame, UI.buttonFree[0], UI.buttonFree[1])

        contextUI.fillText(`Draw Free shape`, UI.text[0], UI.text[1])
        contextUI.strokeRect(UI.buttonErase[0], UI.buttonErase[1], UI.buttonErase[2], UI.buttonErase[3])
        contextUI.fillText(`Erase`, UI.textErase[0], UI.textErase[1])
        contextUI.strokeRect(UI.buttonCancel[0], UI.buttonCancel[1], UI.buttonCancel[2], UI.buttonCancel[3])
        contextUI.fillText(`Back`, UI.textCancel[0], UI.textCancel[1])
        contextUI.strokeRect(UI.buttonConfirm[0], UI.buttonConfirm[1], UI.buttonConfirm[2], UI.buttonConfirm[3])
        contextUI.fillText(`Done`, UI.textConfirm[0], UI.textConfirm[1])
    }

    contextUI.drawImage(img.button.extrude, UI.buttonExtrude[0], UI.buttonExtrude[1])

    if (state === '' && stateEdit === 'ExtrudeSelect') {
        contextUI.drawImage(img.selectFrame, UI.buttonExtrude[0], UI.buttonExtrude[1])

        contextUI.fillText(`Select Sketch.`, UI.text[0], UI.text[1])
    }

    if (state === '' && stateEdit === 'ExtrudeSketch') {
        contextUI.drawImage(img.selectFrame, UI.buttonExtrude[0], UI.buttonExtrude[1])

        contextUI.fillText(`Extrude Sketch.`, UI.text[0], UI.text[1])
    }

    if (state === 'Save') {
        contextUI.fillText(`Save : ${fileName}`, UI.text[0], UI.text[1])
        contextUI.strokeRect(UI.buttonCancel[0], UI.buttonCancel[1], UI.buttonCancel[2], UI.buttonCancel[3])
        contextUI.strokeRect(UI.buttonConfirm[0], UI.buttonConfirm[1], UI.buttonConfirm[2], UI.buttonConfirm[3])
        contextUI.fillText(`Cancel`, UI.textCancel[0], UI.textCancel[1])
        contextUI.fillText(`Save`, UI.textConfirm[0], UI.textConfirm[1])
    }
}