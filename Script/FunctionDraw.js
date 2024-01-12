function drawSceneInit() {
    gl.uniformMatrix4fv(currentCamera, false, matrixCamera)
    gl.lineWidth(3)
    gl.clearColor(0.0, 0.2, 0.2, 1)
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

function drawSketch() {
    gl.disable(gl.DEPTH_TEST)
    gl.uniform4f(currentColor, 0.0, 0.0, 0.0, 1.0)

    for (let i = 0; i < modelSketch.length; i++) {
        let vertice = [modelSketch[i]['Vertice'][0], modelSketch[i]['Vertice'][1], modelSketch[i]['Vertice'][2], modelSketch[i]['Vertice'][3], modelSketch[i]['Vertice'][4], modelSketch[i]['Vertice'][5], modelSketch[i]['Vertice'][3], modelSketch[i]['Vertice'][4], modelSketch[i]['Vertice'][5], modelSketch[i]['Vertice'][6], modelSketch[i]['Vertice'][7], modelSketch[i]['Vertice'][8], modelSketch[i]['Vertice'][6], modelSketch[i]['Vertice'][7], modelSketch[i]['Vertice'][8], modelSketch[i]['Vertice'][0], modelSketch[i]['Vertice'][1], modelSketch[i]['Vertice'][2]]
        vertice = applyTransformArray(matrixView, vertice)

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 3, 4, 5]), gl.STATIC_DRAW)
        gl.drawArrays(gl.LINES, 0, 6)
    }

    gl.enable(gl.DEPTH_TEST)
}

function drawPlane() {
    for (let i = 0; i < planeGConnection.length; i++) {
        for (let j = 0; j < planeGConnection[i].length; j++) {
            let index = planeGConnection[i][j]
            let vertice = [planeG[index]['Vertice'][0], planeG[index]['Vertice'][1], planeG[index]['Vertice'][2], planeG[index]['Vertice'][3], planeG[index]['Vertice'][4], planeG[index]['Vertice'][5], planeG[index]['Vertice'][6], planeG[index]['Vertice'][7], planeG[index]['Vertice'][8]]
            let normal = planeG[index]['Normal']
            vertice = applyTransformArray(matrixView, vertice)
            normal = applyTransform(matrixViewRotate, normal)
            
            let colorFactor = Math.max(Math.cos(vector3Angle(normal, lightReverse)), 0.1)

            if (i === selectedPlane) {
                gl.uniform4f(currentColor, 0.5 * colorFactor, 1.0 * colorFactor, 0.5 * colorFactor, 1.0)
            } else {
                gl.uniform4f(currentColor, 1.0 * colorFactor, 1.0 * colorFactor, 1.0 * colorFactor, 1.0)
            }
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }
    }
}

function drawDot() {
    gl.disable(gl.DEPTH_TEST)
    gl.uniform4f(currentColor, 0.0, 0.0, 1.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(applyTransform(matrixView, tempDot)), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0]), gl.STATIC_DRAW)
    gl.drawArrays(gl.POINTS, 0, 1)
    gl.enable(gl.DEPTH_TEST)
}

function drawTempRect() {
    gl.disable(gl.DEPTH_TEST)
    gl.uniform4f(currentColor, 0.0, 0.0, 1.0, 1.0)

    gl.enable(gl.DEPTH_TEST)
}