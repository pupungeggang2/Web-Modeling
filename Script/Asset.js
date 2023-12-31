let img = {
    button : {
        newFile : new Image(),
        save : new Image(),
        pointer : new Image(),
        move : new Image(),
        rotate : new Image(),
        reset : new Image(),

        selectSketch :  new Image(),
        selectBody : new Image(),
        moveObject : new Image(),
        rotateObject : new Image(),
        removeObject : new Image(),

        rectangle : new Image(),
        polygon : new Image(),
        free : new Image(),
        extrude : new Image(),
    },

    selectFrame : new Image(),
}

function imageLoad() {
    img.button.newFile.src = 'Image/ButtonNew.png'
    img.button.save.src = 'Image/ButtonSave.png'
    img.button.pointer.src = 'Image/ButtonPointer.png'
    img.button.move.src = 'Image/ButtonMove.png'
    img.button.rotate.src = 'Image/ButtonRotate.png'
    img.button.reset.src = 'Image/ButtonReset.png'

    img.button.selectSketch.src = 'Image/ButtonSelectSketch.png'
    img.button.selectBody.src = 'Image/ButtonSelectBody.png'
    img.button.moveObject.src = 'Image/ButtonMoveObject.png'
    img.button.rotateObject.src = 'Image/ButtonRotateObject.png'
    img.button.removeObject.src = 'Image/ButtonRemoveObject.png'
    
    img.button.rectangle.src = 'Image/ButtonRectangle.png'
    img.button.polygon.src = 'Image/ButtonPolygon.png'
    img.button.free.src = 'Image/ButtonFree.png'
    img.button.extrude.src = 'Image/ButtonExtrude.png'

    img.selectFrame.src = 'Image/SelectFrame.png'
}