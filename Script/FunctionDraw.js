function drawSceneUIInit() {
    contextUI.font = '32px neodgm'
    contextUI.textAlign = 'left'
    contextUI.textBaseline = 'top'
    contextUI.fillStyle = 'White'
    contextUI.strokeStyle = 'Black'
    contextUI.clearRect(0, 0, 640, 40)
    contextUI.fillRect(0, 0, 640, 40)
    contextUI.fillStyle = 'Black'
}

function drawUpperUI() {
    contextUI.drawImage(img.button.newFile, UI.buttonNew[0], UI.buttonNew[1])
    contextUI.drawImage(img.button.save, UI.buttonSave[0], UI.buttonSave[1])
    contextUI.drawImage(img.button.move, UI.buttonMove[0], UI.buttonMove[1])
    contextUI.drawImage(img.button.rotate, UI.buttonRotate[0], UI.buttonRotate[1])
    contextUI.drawImage(img.button.rectangle, UI.buttonRectangle[0], UI.buttonRectangle[1])
    contextUI.drawImage(img.button.polygon, UI.buttonPolygon[0], UI.buttonPolygon[1])
    contextUI.drawImage(img.button.free, UI.buttonFree[0], UI.buttonFree[1])
    contextUI.drawImage(img.button.extrude, UI.buttonExtrude[0], UI.buttonExtrude[1])
}