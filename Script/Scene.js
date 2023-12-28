function loopScene() {
    drawSceneUIInit()
    drawUpperUI()
    displayScene()
}

function displayScene() {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, 0, 0, 1, 0, 0, 0, 0]), gl.STATIC_DRAW)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}