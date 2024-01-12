let canvasUI
let canvasG
let contextUI
let contextG
let debug

let state = ''
let stateEdit = ''
let selected = [-1, -1]

let programInstance
let programFrameCurrent
let programFramePrevious
let delta

let mousePressed = false
let mousePositionPrevious = [0, 0]

// Variables related to WebGL
let shaderProgram
let shaderVertex
let shaderFragment
let bufferVertex
let bufferIndex
let currentColor
let currentCamera

// Variables related to program
let textUpper = ''
let modeling
let matrixCamera
let matrixViewRotate
let matrixViewTranslate
let matrixViewRotateInv
let matrixViewTranslateInv
let matrixView
let matrixViewInv
let lightReverse = [0, 0, 1]

let modelFace = []
let modelFaceNormal = []
let modelSketch = []
let modelSketchConnection = []

let planeG = [
    {'Vertice' : [-0.7, -0.7, 0, 0.7, 0.7, 0, -0.7, 0.7, 0], 'Normal' : [0, 0, 1]},
    {'Vertice' : [-0.7, -0.7, 0, 0.7, -0.7, 0, 0.7, 0.7, 0], 'Normal' : [0, 0, 1]},
]
let planeGConnection = [[0, 1]]

let selectedPlane = -1
let tempDot = [0, 0, 0]

let sketchVar = {
    available : false,
    positionGStart : [0, 0],
    rect1 : [0, 0, 0],
    rect2 : [0, 0, 0],
    rect3 : [0, 0, 0],
    rect4 : [0, 0, 0],
    polygonCenter : [],
    polygonVertice : [],
    polygonNum : -1,
    freePoints : [],
    tempDraw : [],
}

let fileName = ''