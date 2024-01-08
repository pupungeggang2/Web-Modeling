function drawSceneInit() {
    gl.uniformMatrix4fv(currentCamera, false, matrixCamera)
    gl.lineWidth(3)
    gl.clearColor(0, 0, 0, 1)
    gl.enable(gl.DEPTH_TEST)
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

function drawFloor() {
    let floor = [-0.7, -0.7, 0, 0.7, 0.7, 0, -0.7, 0.7, 0, -0.7, -0.7, 0, 0.7, -0.7, 0, 0.7, 0.7, 0]
    floor = applyTransformArray(matrixView, floor)
    let angle = vector3Angle(lightReverse, vector3Cross([floor[3] - floor[0], floor[4] - floor[1], floor[5] - floor[2]], [floor[6] - floor[0], floor[7] - floor[1], floor[8] - floor[2]]))
    let colorFactor = Math.max(Math.cos(angle), 0.1)
    gl.uniform4f(currentColor, 1.0 * colorFactor, 1.0 * colorFactor, 1.0 * colorFactor, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(floor), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 3, 4, 5]), gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function drawFace(vetrice, normal) {
    
}

function drawSketch() {
    
}

function drawModel() {
    for (let i = 0; i < modelFace.length; i++) {
        for (let j = 1; j + 1 < modelFace[i].length; j++) {
            let vertice = [modelFace[i][0][0], modelFace[i][0][1], modelFace[i][0][2], modelFace[i][j][0], modelFace[i][j][1], modelFace[i][j][2], modelFace[i][j + 1][0], modelFace[i][j + 1][1], modelFace[i][j + 1][2]]
            let normal = modelFaceNormal[i]
            vertice = applyTransformArray(matrixView, vertice)
            normal = applyTransform(matrixView, normal)
            
            let colorFactor = Math.max(Math.cos(vector3Angle(normal, lightReverse)), 0.1)
            gl.uniform4f(currentColor, 0.5 * colorFactor, 1.0 * colorFactor, 0.5 * colorFactor, 1.0)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }
    }
}