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
let matrixViewRotateInverse
let matrixViewTranslateInverse

let sketch = []
let body = []