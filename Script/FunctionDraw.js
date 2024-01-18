function drawSceneInit() {
    gl.uniformMatrix4fv(currentCamera, false, matrixCamera)
    gl.lineWidth(3)
    gl.clearColor(0.0, 0.2, 0.2, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

function drawAxis() {
    gl.enable(gl.DEPTH_TEST)
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

    for (let i = 0; i < planeSketchConnection.length; i++) {
        for (let j = 0; j < planeSketchConnection[i].length; j++) {
            let vertice = []
            let index = planeSketchConnection[i][j]

            if (i === selectedSketch) {
                gl.uniform4f(currentColor, 0.0, 1.0, 0.0, 0.5)
                vertice = [planeSketch[index]['Vertice'][0], planeSketch[index]['Vertice'][1], planeSketch[index]['Vertice'][2], planeSketch[index]['Vertice'][3], planeSketch[index]['Vertice'][4], planeSketch[index]['Vertice'][5], planeSketch[index]['Vertice'][6], planeSketch[index]['Vertice'][7], planeSketch[index]['Vertice'][8]]
                vertice = applyTransformArray(matrixView, vertice)

                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
                gl.drawArrays(gl.TRIANGLES, 0, 3)
                gl.uniform4f(currentColor, 0.0, 0.0, 0.0, 1.0)
            }

            if (j === 0) {
                vertice = [planeSketch[index]['Vertice'][0], planeSketch[index]['Vertice'][1], planeSketch[index]['Vertice'][2], planeSketch[index]['Vertice'][3], planeSketch[index]['Vertice'][4], planeSketch[index]['Vertice'][5]]
                vertice = applyTransformArray(matrixView, vertice)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }

            vertice = [planeSketch[index]['Vertice'][3], planeSketch[index]['Vertice'][4], planeSketch[index]['Vertice'][5], planeSketch[index]['Vertice'][6], planeSketch[index]['Vertice'][7], planeSketch[index]['Vertice'][8]]
            vertice = applyTransformArray(matrixView, vertice)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
            gl.drawArrays(gl.LINES, 0, 2)

            if (j === planeSketchConnection[i].length - 1) {
                vertice = [planeSketch[index]['Vertice'][6], planeSketch[index]['Vertice'][7], planeSketch[index]['Vertice'][8], planeSketch[index]['Vertice'][0], planeSketch[index]['Vertice'][1], planeSketch[index]['Vertice'][2]]
                vertice = applyTransformArray(matrixView, vertice)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }
        }
    }
}

function drawPlane() {
    gl.enable(gl.DEPTH_TEST)
    for (let i = 0; i < planeGConnection.length; i++) {
        for (let j = 0; j < planeGConnection[i].length; j++) {
            let index = planeGConnection[i][j]
            let vertice = [planeG[index]['Vertice'][0], planeG[index]['Vertice'][1], planeG[index]['Vertice'][2], planeG[index]['Vertice'][3], planeG[index]['Vertice'][4], planeG[index]['Vertice'][5], planeG[index]['Vertice'][6], planeG[index]['Vertice'][7], planeG[index]['Vertice'][8]]
            let verticeEdge = []
            let normal = planeG[index]['Normal']
            
            vertice = applyTransformArray(matrixView, vertice)
            normal = applyTransform(matrixViewRotate, normal)

            let colorFactor = Math.max(Math.cos(vector3Angle(normal, lightReverse)), 0.1)

            if (i === selectedPlane) {
                gl.uniform4f(currentColor, 0.5, 1.0, 0.5, 1.0)
            } else {
                if (i === 0) {
                    gl.uniform4f(currentColor, 1.0 * colorFactor, 1.0 * colorFactor, 1.0 * colorFactor, 1.0)
                } else {
                    gl.uniform4f(currentColor, 1.0 * colorFactor, 0.0 * colorFactor, 1.0 * colorFactor, 1.0)
                }
            }
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
            gl.drawArrays(gl.TRIANGLES, 0, 3)

            gl.uniform4f(currentColor, 0.0, 0.0, 0.0, 1.0)

            if (j === 0) {
                verticeEdge = [planeG[index]['Vertice'][0], planeG[index]['Vertice'][1], planeG[index]['Vertice'][2], planeG[index]['Vertice'][3], planeG[index]['Vertice'][4], planeG[index]['Vertice'][5]]
                verticeEdge = applyTransformArray(matrixView, verticeEdge)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeEdge), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }

            verticeEdge = [planeG[index]['Vertice'][3], planeG[index]['Vertice'][4], planeG[index]['Vertice'][5], planeG[index]['Vertice'][6], planeG[index]['Vertice'][7], planeG[index]['Vertice'][8]]
            verticeEdge = applyTransformArray(matrixView, verticeEdge)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeEdge), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
            gl.drawArrays(gl.LINES, 0, 2)

            if (j === planeGConnection[i].length - 1) {
                verticeEdge = [planeG[index]['Vertice'][6], planeG[index]['Vertice'][7], planeG[index]['Vertice'][8], planeG[index]['Vertice'][0], planeG[index]['Vertice'][1], planeG[index]['Vertice'][2]]
                verticeEdge = applyTransformArray(matrixView, verticeEdge)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeEdge), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }
        }
    }
}

function drawSketchEdit() {
    gl.disable(gl.DEPTH_TEST)
    if (selectedSketch > -1) {
        for (let i = 0; i < planeSketchConnection[selectedSketch].length; i++) {
            let index = planeSketchConnection[selectedSketch][i]
            sketchEditVertice = [planeSketch[index]['Vertice'][0], planeSketch[index]['Vertice'][1], planeSketch[index]['Vertice'][2], planeSketch[index]['Vertice'][3], planeSketch[index]['Vertice'][4], planeSketch[index]['Vertice'][5], planeSketch[index]['Vertice'][6], planeSketch[index]['Vertice'][7], planeSketch[index]['Vertice'][8]]
            let verticeLine = []
            
            sketchEditVertice = applyTransformArray(matrix4Translate(translateX * 0.1, translateY * 0.1, translateZ * 0.1), sketchEditVertice)
            sketchEditVertice = applyTransformArray(matrixView, sketchEditVertice)

            gl.uniform4f(currentColor, 0.0, 1.0, 1.0, 1.0)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sketchEditVertice), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
            gl.drawArrays(gl.TRIANGLES, 0, 3)

            gl.uniform4f(currentColor, 0.0, 0.0, 0.0, 1.0)

            if (i === 0) {
                verticeLine = [sketchEditVertice[0], sketchEditVertice[1], sketchEditVertice[2], sketchEditVertice[3], sketchEditVertice[4], sketchEditVertice[5]]
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeLine), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }

            verticeLine = [sketchEditVertice[3], sketchEditVertice[4], sketchEditVertice[5], sketchEditVertice[6], sketchEditVertice[7], sketchEditVertice[8]]
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeLine), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
            gl.drawArrays(gl.LINES, 0, 2)

            if (i === planeSketchConnection[selectedSketch].length - 1) {
                verticeLine = [sketchEditVertice[6], sketchEditVertice[7], sketchEditVertice[8], sketchEditVertice[0], sketchEditVertice[1], sketchEditVertice[2]]
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeLine), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }
        }
    }
}

function drawBodyEdit() {
    gl.enable(gl.DEPTH_TEST)
    if (selectedBody > -1) {
        for (let i = 0; i < planeGBodyConnection[selectedBody].length; i++) {
            let index = planeGBodyConnection[selectedBody][i]
            bodyEditVertice = [planeG[index]['Vertice'][0], planeG[index]['Vertice'][1], planeG[index]['Vertice'][2], planeG[index]['Vertice'][3], planeG[index]['Vertice'][4], planeG[index]['Vertice'][5], planeG[index]['Vertice'][6], planeG[index]['Vertice'][7], planeG[index]['Vertice'][8]]
            let verticeEdge = []
            let normal = planeG[index]['Normal']

            let colorFactor = Math.max(Math.cos(vector3Angle(normal, lightReverse)), 0.1)
            bodyEditVertice = applyTransformArray(matrix4Translate(translateX * 0.1, translateY * 0.1, translateZ * 0.1), bodyEditVertice)
            bodyEditVertice = applyTransformArray(matrixView, bodyEditVertice)

            gl.uniform4f(currentColor, 0.0 * colorFactor, 1.0 * colorFactor, 1.0 * colorFactor, 1.0)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bodyEditVertice), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
            gl.drawArrays(gl.TRIANGLES, 0, 3)

            gl.uniform4f(currentColor, 0.0, 0.0, 0.0, 1.0)

            if (i === 0) {
                verticeEdge = [bodyEditVertice[0], bodyEditVertice[1], bodyEditVertice[2], bodyEditVertice[3], bodyEditVertice[4], bodyEditVertice[5]]
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeEdge), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }

            verticeEdge = [bodyEditVertice[3], bodyEditVertice[4], bodyEditVertice[5], bodyEditVertice[6], bodyEditVertice[7], bodyEditVertice[8]]
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeEdge), gl.STATIC_DRAW)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
            gl.drawArrays(gl.LINES, 0, 2)

            if (i === planeGBodyConnection[selectedBody][i].length - 1) {
                verticeEdge = [bodyEditVertice[6], bodyEditVertice[7], bodyEditVertice[8], bodyEditVertice[0], bodyEditVertice[1], bodyEditVertice[2]]
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeEdge), gl.STATIC_DRAW)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINES, 0, 2)
            }
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
}