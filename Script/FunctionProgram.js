function newFile() {
    state = ''
    sketch = []
    body = []
}

function addSketch(vertice) {
    modelSketch.push(vertice)
}

function extrudeSketch(sketch, length) {

}

function addFace(vertice) {
    let face = []

    for (let i = 0; i < vertice.length; i++) {
        face.push([vertice[i][0], vertice[i][1], vertice[i][2]])
    }

    let normal = vector3Cross([vertice[1][0] - vertice[0][0], vertice[1][1] - vertice[0][1], vertice[1][2] - vertice[0][2]], [vertice[2][0] - vertice[0][0], vertice[2][1] - vertice[0][1], vertice[2][2] - vertice[0][2]])

    modelFaceNormal.push(normal)
    modelFace.push(face)
}

function modelingToObj() {
    
}