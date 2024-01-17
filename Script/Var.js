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

let planeSketch = []
let planeSketchConnection = []
let planeSketchID = 0
let planeG = [
    {'Vertice' : [-0.7, -0.7, 0, 0.7, 0.7, 0, -0.7, 0.7, 0], 'Normal' : [0, 0, 1]},
    {'Vertice' : [-0.7, -0.7, 0, 0.7, -0.7, 0, 0.7, 0.7, 0], 'Normal' : [0, 0, 1]},
]
let planeGConnection = [[0, 1]]
let planeGID = 2
let planeGBodyConnection = []
let planeGBodyID = 0

let selectedPlane = -1
let selectedSketch = -1
let selectedBody = -1
let tempDot = [0, 0, 0]

let sketchVar = {
    available : false,
    positionGStart : [0, 0],
    polygonCenter : [],
    polygonVertice : [],
    polygonMode : 0,
    polygonNum : -1,
    tempVertice : [],
    tempSketch : [],
}

let extrudeDistance = 0

let fileName = ''