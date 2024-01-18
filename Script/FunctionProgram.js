// New file
function newFile() {
    state = ''
    planeSketch = []
    planeSketchConnection = []
    planeSketchID = 0
    planeG = {
        0 : {'Vertice' : [-0.7, -0.7, 0, 0.7, -0.7, 0, 0.7, 0.7, 0], 'Normal' : [0, 0, 1]},
        1 : {'Vertice' : [-0.7, -0.7, 0, 0.7, 0.7, 0, -0.7, 0.7, 0], 'Normal' : [0, 0, 1]},
    }
    planeGconnection = [[0, 1]]
    planeGBody = []
    planeGID = 2
}

// Related to sketch
function addSketch(vertice) {
    let normal = vector3Normalize(vector3Cross([vertice[3] - vertice[0], vertice[4] - vertice[1], vertice[5] - vertice[2]], [vertice[6] - vertice[0], vertice[7] - vertice[1], vertice[8] - vertice[2]]))
    let tempSketch = {
        'Vertice' : vertice,
        'Normal' : normal
    }

    planeSketch[planeSketchID] = tempSketch
}

function addSketchNormal(vertice, normal) {
    let tempSketch = {
        'Vertice' : vertice,
        'Normal' : normal
    }

    planeSketch[planeSketchID] = tempSketch
}

// Related fo body
function extrudeSketch(selectedSketch, distance) {
    let tempBodyConnection = []
    let tempPlaneConnection = []

    // Extruded Plane
    for (let i = 0; i < planeSketchConnection[selectedSketch].length; i++) {
        let index = planeSketchConnection[selectedSketch][i]
        let extrudeVector = vector3Normalize(planeSketch[index]['Normal'])
        let movedVertice = [planeSketch[index]['Vertice'][0] + extrudeVector[0] * distance, planeSketch[index]['Vertice'][1] + extrudeVector[1] * distance, planeSketch[index]['Vertice'][2] + extrudeVector[2] * distance, planeSketch[index]['Vertice'][3] + extrudeVector[0] * distance, planeSketch[index]['Vertice'][4] + extrudeVector[1] * distance, planeSketch[index]['Vertice'][5] + extrudeVector[2] * distance, planeSketch[index]['Vertice'][6] + extrudeVector[0] * distance, planeSketch[index]['Vertice'][7] + extrudeVector[1] * distance, planeSketch[index]['Vertice'][8] + extrudeVector[2] * distance]

        if (distance > 0) {
            planeG[planeGID] = {'Vertice' : JSON.parse(JSON.stringify(movedVertice)), 'Normal' : vector3Normalize(planeSketch[index]['Normal'])}
        } else if (distance < 0) {
            planeG[planeGID] = ({'Vertice' : JSON.parse(JSON.stringify(movedVertice)), 'Normal' : vector3ScalaMul(vector3Normalize(planeSketch[index]['Normal']), -1)})
        }

        tempPlaneConnection.push(planeGID)
        tempBodyConnection.push(planeGID)
        planeGID += 1
    }

    planeGConnection.push(tempPlaneConnection)

    tempPlaneConnection = []

    // Start Plane
    for (let i = 0; i < planeSketchConnection[selectedSketch].length; i++) {
        let index = planeSketchConnection[selectedSketch][i]
        let vertice = [planeSketch[index]['Vertice'][0], planeSketch[index]['Vertice'][1], planeSketch[index]['Vertice'][2], planeSketch[index]['Vertice'][3], planeSketch[index]['Vertice'][4], planeSketch[index]['Vertice'][5], planeSketch[index]['Vertice'][6], planeSketch[index]['Vertice'][7], planeSketch[index]['Vertice'][8]]

        if (distance < 0) {
            planeG[planeGID] = {'Vertice' : JSON.parse(JSON.stringify(vertice)), 'Normal' : vector3Normalize(planeSketch[index]['Normal'])}
        } else if (distance > 0) {
            let normal = [vector3Normalize(planeSketch[index]['Normal'])[0] * -1, vector3Normalize(planeSketch[index]['Normal'])[1] * -1, vector3Normalize(planeSketch[index]['Normal'])[2] * -1]
            planeG[planeGID] = {'Vertice' : JSON.parse(JSON.stringify(vertice)), 'Normal' : normal}
        }

        tempPlaneConnection.push(planeGID)
        tempBodyConnection.push(planeGID)
        planeGID += 1
    }

    planeGConnection.push(tempPlaneConnection)

    // Side
    for (let i = 0; i < planeSketchConnection[selectedSketch].length; i++) {
        let index = planeSketchConnection[selectedSketch][i]
        let extrudeVector = vector3Normalize(planeSketch[index]['Normal'])
        let vertice = [planeSketch[index]['Vertice'][0], planeSketch[index]['Vertice'][1], planeSketch[index]['Vertice'][2], planeSketch[index]['Vertice'][3], planeSketch[index]['Vertice'][4], planeSketch[index]['Vertice'][5], planeSketch[index]['Vertice'][6], planeSketch[index]['Vertice'][7], planeSketch[index]['Vertice'][8]]
        let movedVertice = [planeSketch[index]['Vertice'][0] + extrudeVector[0] * distance, planeSketch[index]['Vertice'][1] + extrudeVector[1] * distance, planeSketch[index]['Vertice'][2] + extrudeVector[2] * distance, planeSketch[index]['Vertice'][3] + extrudeVector[0] * distance, planeSketch[index]['Vertice'][4] + extrudeVector[1] * distance, planeSketch[index]['Vertice'][5] + extrudeVector[2] * distance, planeSketch[index]['Vertice'][6] + extrudeVector[0] * distance, planeSketch[index]['Vertice'][7] + extrudeVector[1] * distance, planeSketch[index]['Vertice'][8] + extrudeVector[2] * distance]

        if (i === 0) {
            tempPlaneConnection = []
            let side1Vertice = [vertice[0], vertice[1], vertice[2], vertice[3], vertice[4], vertice[5], movedVertice[3], movedVertice[4], movedVertice[5]]
            let side1Normal = vector3Normalize(vector3Cross([side1Vertice[3] - side1Vertice[0], side1Vertice[4] - side1Vertice[1], side1Vertice[5] - side1Vertice[2]], [side1Vertice[6] - side1Vertice[0], side1Vertice[7] - side1Vertice[1], side1Vertice[8] - side1Vertice[2]]))
            let side2Vertice = [vertice[0], vertice[1], vertice[2], movedVertice[3], movedVertice[4], movedVertice[5], movedVertice[0], movedVertice[1], movedVertice[2]]
            let side2Normal = vector3Normalize(vector3Cross([side2Vertice[3] - side2Vertice[0], side2Vertice[4] - side2Vertice[1], side2Vertice[5] - side2Vertice[2]], [side2Vertice[6] - side2Vertice[0], side2Vertice[7] - side2Vertice[1], side2Vertice[8] - side2Vertice[2]]))

            if (distance > 0) {
                planeG[planeGID] = ({'Vertice' : side1Vertice, 'Normal' : side1Normal})
                tempPlaneConnection.push(planeGID)
                tempBodyConnection.push(planeGID)
                planeGID += 1
    
                planeG[planeGID] = ({'Vertice' : side2Vertice, 'Normal' : side2Normal})
                tempPlaneConnection.push(planeGID)
                tempBodyConnection.push(planeGID)
                planeGID += 1
                planeGConnection.push(tempPlaneConnection)
            } else if (distance < 0) {
                planeG[planeGID] = {'Vertice' : side1Vertice, 'Normal' : vector3ScalaMul(side1Normal, -1)}
                tempPlaneConnection.push(planeGID)
                tempBodyConnection.push(planeGID)
                planeGID += 1
    
                planeG[planeGID] = {'Vertice' : side2Vertice, 'Normal' : vector3ScalaMul(side2Normal, -1)}
                tempPlaneConnection.push(planeGID)
                tempBodyConnection.push(planeGID)
                planeGID += 1
                planeGConnection.push(tempPlaneConnection)
            }
        }

        tempPlaneConnection = []
        let side1Vertice = [vertice[3], vertice[4], vertice[5], vertice[6], vertice[7], vertice[8], movedVertice[6], movedVertice[7], movedVertice[8]]
        let side1Normal = vector3Normalize(vector3Cross([side1Vertice[3] - side1Vertice[0], side1Vertice[4] - side1Vertice[1], side1Vertice[5] - side1Vertice[2]], [side1Vertice[6] - side1Vertice[0], side1Vertice[7] - side1Vertice[1], side1Vertice[8] - side1Vertice[2]]))
        let side2Vertice = [vertice[3], vertice[4], vertice[5], movedVertice[6], movedVertice[7], movedVertice[8], movedVertice[3], movedVertice[4], movedVertice[5]]
        let side2Normal = vector3Normalize(vector3Cross([side2Vertice[3] - side2Vertice[0], side2Vertice[4] - side2Vertice[1], side2Vertice[5] - side2Vertice[2]], [side2Vertice[6] - side2Vertice[0], side2Vertice[7] - side2Vertice[1], side2Vertice[8] - side2Vertice[2]]))

        if (distance > 0) {
            planeG[planeGID] = {'Vertice' : side1Vertice, 'Normal' : side1Normal}
            tempPlaneConnection.push(planeGID)
            tempBodyConnection.push(planeGID)
            planeGID += 1

            planeG[planeGID] = {'Vertice' : side2Vertice, 'Normal' : side2Normal}
            tempPlaneConnection.push(planeGID)
            tempBodyConnection.push(planeGID)
            planeGID += 1

            planeGConnection.push(tempPlaneConnection)
        } else if (distance < 0) {
            planeG[planeGID] = {'Vertice' : side1Vertice, 'Normal' : vector3ScalaMul(side1Normal, -1)}
            tempPlaneConnection.push(planeGID)
            tempBodyConnection.push(planeGID)
            planeGID += 1

            planeG[planeGID] = {'Vertice' : side2Vertice, 'Normal' : vector3ScalaMul(side2Normal, -1)}
            tempPlaneConnection.push(planeGID)
            tempBodyConnection.push(planeGID)
            planeGID += 1
            planeGConnection.push(tempPlaneConnection)
        }

        if (i === planeSketchConnection[selectedSketch].length - 1) {
            tempPlaneConnection = []
            let side1Vertice = [vertice[0], vertice[1], vertice[2], vertice[6], vertice[7], vertice[8], movedVertice[6], movedVertice[7], movedVertice[8]]
            let side1Normal = vector3Normalize(vector3Cross([side1Vertice[3] - side1Vertice[0], side1Vertice[4] - side1Vertice[1], side1Vertice[5] - side1Vertice[2]], [side1Vertice[6] - side1Vertice[0], side1Vertice[7] - side1Vertice[1], side1Vertice[8] - side1Vertice[2]]))
            let side2Vertice = [vertice[0], vertice[1], vertice[2], movedVertice[6], movedVertice[7], movedVertice[8], movedVertice[0], movedVertice[1], movedVertice[2]]
            let side2Normal = vector3Normalize(vector3Cross([side2Vertice[3] - side2Vertice[0], side2Vertice[4] - side2Vertice[1], side2Vertice[5] - side2Vertice[2]], [side2Vertice[6] - side2Vertice[0], side2Vertice[7] - side2Vertice[1], side2Vertice[8] - side2Vertice[2]]))

            if (distance > 0) {
                planeG[planeGID] = {'Vertice' : side1Vertice, 'Normal' : vector3ScalaMul(side1Normal, -1)}
                tempPlaneConnection.push(planeGID)
                tempBodyConnection.push(planeGID)
                planeGID += 1

                planeG[planeGID] = {'Vertice' : side2Vertice, 'Normal' : vector3ScalaMul(side2Normal, -1)}
                tempPlaneConnection.push(planeGID)
                tempBodyConnection.push(planeGID)
                planeGID += 1
                planeGConnection.push(tempPlaneConnection)
            } else if (distance < 0) {
                planeG[planeGID] = {'Vertice' : side1Vertice, 'Normal' : side1Normal}
                tempPlaneConnection.push(planeGID)
                tempBodyConnection.push(planeGID)
                planeGID += 1

                planeG[planeGID] = {'Vertice' : side2Vertice, 'Normal' : side2Normal}
                tempPlaneConnection.push(planeGID)
                tempBodyConnection.push(planeGID)
                planeGID += 1
                planeGConnection.push(tempPlaneConnection)
            }
        }
    }

    planeGBodyConnection.push(tempBodyConnection)
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

// Selection
function linePlaneIntersection(positionG, planeVertice, planeNormal) {
    // Applying transformation
    let transformedPlane = applyTransformArray(matrixView, planeVertice)
    let transformedNormal = applyTransform(matrixViewRotate, planeNormal)

    // Finding plane property
    let planeVerticeProjection = [transformedPlane[0], transformedPlane[1], 0, transformedPlane[3], transformedPlane[4], 0, transformedPlane[6], transformedPlane[7], 0]
    let a = transformedNormal[0]
    let b = transformedNormal[1]
    let c = transformedNormal[2]
    let d = - a * transformedPlane[0] - b * transformedPlane[1] - c * transformedPlane[2]

    // Intersection point
    let intersectionPoint = [positionG[0], positionG[1], (- a * positionG[0] - b * positionG[1] - d) / c]
    let intersect = pointInsideTriangle2D(positionG[0], positionG[1], [planeVerticeProjection[0], planeVerticeProjection[1], planeVerticeProjection[3], planeVerticeProjection[4], planeVerticeProjection[6], planeVerticeProjection[7]])
    let distance = Math.abs(intersectionPoint[2])

    intersectionPoint = applyTransform(matrixViewInv, intersectionPoint)

    return [intersect, intersectionPoint, distance]
}

function selectPlane(positionG) {
    let minimumDistance = 99999999
    let selected = -1

    for (let i = 0; i < planeGConnection.length; i++) {
        for (let j = 0; j < planeGConnection[i].length; j++) {
            let index = planeGConnection[i][j]
            let intersectionData = linePlaneIntersection(positionG, planeG[index]['Vertice'], planeG[index]['Normal'])

            if (intersectionData[0] === true) {
                if (intersectionData[2] < minimumDistance) {
                    minimumDistance = intersectionData[2]
                    selected = i
                    break
                }
            }
        }
    }

    return selected
}

function selectSketch(positionG) {
    let minimumDistance = 99999999
    let selected = -1

    for (let i = 0; i < planeSketchConnection.length; i++) {
        for (let j = 0; j < planeSketchConnection[i].length; j++) {
            let index = planeSketchConnection[i][j]
            let intersectionData = linePlaneIntersection(positionG, planeSketch[index]['Vertice'], planeSketch[index]['Normal'])

            if (intersectionData[0] === true) {
                if (intersectionData[2] < minimumDistance) {
                    minimumDistance = intersectionData[2]
                    selected = i
                    break
                }
            }
        }
    }

    return selected
}

function selectBody(positionG) {
    let minimumDistance = 99999999
    let selected = -1

    for (let i = 0; i < planeGBodyConnection.length; i++) {
        for (let j = 0; j < planeGBodyConnection[i].length; j++) {
            let index = planeGBodyConnection[i][j]
            let intersectionData = linePlaneIntersection(positionG, planeG[index]['Vertice'], planeG[index]['Normal'])

            if (intersectionData[0] === true) {
                if (intersectionData[2] < minimumDistance) {
                    minimumDistance = intersectionData[2]
                    selected = i
                    break
                }
            }
        }
    }

    return selected
}

