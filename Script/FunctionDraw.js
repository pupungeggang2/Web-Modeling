function drawSceneInit() {
    gl.uniformMatrix4fv(currentCamera, false, matrixCamera)
    gl.lineWidth(2)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

function drawAxis() {
    let tempAxis
    tempAxis = [0.1, 0, 0]
    tempAxis = applyTransform(matrixViewRotate, tempAxis)
    tempAxis = applyTransform(matrix4Translate(-0.9, -0.9, -0.9), tempAxis)
    gl.uniform4f(currentColor, 1.0, 0.0, 0.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.9, -0.9, -0.9, tempAxis[0], tempAxis[1], tempAxis[2]]), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)

    tempAxis = [0, 0.1, 0]
    tempAxis = applyTransform(matrixViewRotate, tempAxis)
    tempAxis = applyTransform(matrix4Translate(-0.9, -0.9, -0.9), tempAxis)
    gl.uniform4f(currentColor, 0.0, 1.0, 0.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.9, -0.9, -0.9, tempAxis[0], tempAxis[1], tempAxis[2]]), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)

    tempAxis = [0, 0, 0.1]
    tempAxis = applyTransform(matrixViewRotate, tempAxis)
    tempAxis = applyTransform(matrix4Translate(-0.9, -0.9, -0.9), tempAxis)
    gl.uniform4f(currentColor, 0.0, 0.0, 1.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.9, -0.9, -0.9, tempAxis[0], tempAxis[1], tempAxis[2]]), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)
}