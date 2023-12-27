let canvasUI
let canvasG
let contextUI
let contextG

let state = ''

let programInstance
let programFrameCurrent
let programFramePrevious
let delta

// Variables related to WebGL
let program
let shaderVertex
let shaderFragment
let bufferVertex
let bufferIndex
let currentColor

// Variables related to program
let modeling
let matrixCamera
let matrixRotate
let matrixRotateInverse