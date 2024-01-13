function drawSceneInit() {
    gl.uniformMatrix4fv(currentCamera, false, matrixCamera)
    gl.lineWidth(3)
    gl.clearColor(0.0, 0.2, 0.2, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

function drawAxis() {
    let tempAxis
    tempAxis = [0, 0, 0, 0.1, 0, 0]
    tempAxis = applyTransformArray(matrix4Mul(matrix4Translate(-0.9, -0.9, -0.9), matrixViewRotate), tempAxis)
    gl.uniform4f(currentColor, 1.0, 0.0, 0.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempAxis), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)

    tempAxis = [0, 0, 0, 0, 0.1, 0]
    tempAxis = applyTransformArray(matrix4Mul(matrix4Translate(-0.9, -0.9, -0.9), matrixViewRotate), tempAxis)
    gl.uniform4f(currentColor, 0.0, 1.0, 0.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempAxis), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)

    tempAxis = [0, 0, 0, 0, 0, 0.1]
    tempAxis = applyTransformArray(matrix4Mul(matrix4Translate(-0.9, -0.9, -0.9), matrixViewRotate), tempAxis)
    gl.uniform4f(currentColor, 0.0, 0.0, 1.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempAxis), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)
}

function drawSketch() {
    gl.disable(gl.DEPTH_TEST)
    gl.uniform4f(currentColor, 0.0, 0.0, 0.0, 1.0)

    for (let i = 0; i < planeSketch.length; i++) {
        let vertice = [planeSketch[i]['Vertice'][0], planeSketch[i]['Vertice'][1], planeSketch[i]['Vertice'][2], planeSketch[i]['Vertice'][3], planeSketch[i]['Vertice'][4], planeSketch[i]['Vertice'][5], planeSketch[i]['Vertice'][3], planeSketch[i]['Vertice'][4], planeSketch[i]['Vertice'][5], planeSketch[i]['Vertice'][6], planeSketch[i]['Vertice'][7], planeSketch[i]['Vertice'][8], planeSketch[i]['Vertice'][6], planeSketch[i]['Vertice'][7], planeSketch[i]['Vertice'][8], planeSketch[i]['Vertice'][0], planeSketch[i]['Vertice'][1], planeSketch[i]['Vertice'][2]]
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

function drawTempSketch() {
    gl.disable(gl.DEPTH_TEST)
    gl.uniform4f(currentColor, 0.0, 0.0, 1.0, 1.0)

    if (stateEdit === 'SketchPolygon') {
        if (sketchVar.polygonMode === 1) {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(applyTransform(matrixView, sketchVar.polygonCenter)), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0]), gl.STATIC_DRAW)
            gl.drawArrays(gl.POINTS, 0, 1)
        } else if (sketchVar.polygonMode === 2) {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(applyTransform(matrixView, sketchVar.polygonCenter)), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0]), gl.STATIC_DRAW)
            gl.drawArrays(gl.POINTS, 0, 1)
            
            for (let i = 0; i < sketchVar.tempVertice.length; i += 3) {
                let point1 = applyTransform(matrixView, [sketchVar.tempVertice[i], sketchVar.tempVertice[i + 1], sketchVar.tempVertice[i + 2]])
                let point2 = applyTransform(matrixView, [sketchVar.tempVertice[(i + 3) % sketchVar.tempVertice.length], sketchVar.tempVertice[(i + 4) % sketchVar.tempVertice.length], sketchVar.tempVertice[(i + 5) % sketchVar.tempVertice.length]])
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point1.concat(point2)), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }
        }
    } else if (stateEdit === 'SketchFree') {
        for (let i = 0; i < sketchVar.tempVertice.length; i += 3) {
            for (let i = 0; i < sketchVar.tempVertice.length; i += 3) {
                let point1 = applyTransform(matrixView, [sketchVar.tempVertice[i], sketchVar.tempVertice[i + 1], sketchVar.tempVertice[i + 2]])
                let point2 = applyTransform(matrixView, [sketchVar.tempVertice[(i + 3) % sketchVar.tempVertice.length], sketchVar.tempVertice[(i + 4) % sketchVar.tempVertice.length], sketchVar.tempVertice[(i + 5) % sketchVar.tempVertice.length]])
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point1.concat(point2)), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }

            let point = applyTransform(matrixView, [sketchVar.tempVertice[i], sketchVar.tempVertice[i + 1], sketchVar.tempVertice[i + 2]])
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0]), gl.STATIC_DRAW)
            gl.drawArrays(gl.POINTS, 0, 1)
        }
    }

    gl.enable(gl.DEPTH_TEST)
}