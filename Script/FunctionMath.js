// Functions related to math
// Vector calculation
function vector3Add(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]]
}

function vector3Sub(vec1, vec2) {
    return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]]
}

function vector3Norm(vec) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2])
}

function vector3Normalize(vec) {
    let norm = vector3Norm(vec)
    return [vec[0] / norm, vec[1] / norm, vec[2] / norm]
}

function vector3Dot(vec1, vec2) {
    return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2]
}

function vector3Cross(vec1, vec2) {
    return [vec1[1] * vec2[2] - vec1[2] * vec2[1], vec1[2] * vec2[0] - vec1[0] * vec2[2], vec1[0] * vec2[1] - vec1[1] * vec2[0]]
}

function vector3Angle(vec1, vec2) {
    return Math.acos(vector3Dot(vec1, vec2) / (vector3Norm(vec1) * vector3Norm(vec2)))
}

// Matrix calculation
function matrix3Identity() {
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ]
}

function matrix3Add(mat1, mat2) {
    return [
        mat1[0] + mat2[0], mat1[1] + mat2[1], mat1[2] + mat2[2], 
        mat1[3] + mat2[3], mat1[4] + mat2[4], mat1[5] + mat2[5],
        mat1[6] + mat2[6], mat1[7] + mat2[7], mat1[8] + mat2[8], 
    ]   
}

function matrix3Sub(mat1, mat2) {
    return [
        mat1[0] - mat2[0], mat1[1] - mat2[1], mat1[2] - mat2[2], 
        mat1[3] - mat2[3], mat1[4] - mat2[4], mat1[5] - mat2[5],
        mat1[6] - mat2[6], mat1[7] - mat2[7], mat1[8] - mat2[8], 
    ]   
}

function matrix3ScalaMul(mat, s) {
    return [
        s * mat[0], s * mat[1], s * mat[2],
        s * mat[3], s * mat[4], s * mat[5],
        s * mat[6], s * mat[7], s * mat[8],
    ]
}

function matrix3Mul(mat1, mat2) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < 9; i++) {
        let row = Math.floor(i / 3)
        let column = i - row * 3
        result[i] = mat1[row * 3 + 0] * mat2[column + 0] + mat1[row * 3 + 1] * mat2[column + 3] + mat1[row * 3 + 2] * mat2[column + 6]
    }

    return result
}

function matrix4Identity() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}

function matrix4Vector4Mult(mat, vec) {
    return [
        mat[0] * vec[0] + mat[1] * vec[1] + mat[2] * vec[2] + mat[3] * vec[3],
        mat[4] * vec[0] + mat[5] * vec[1] + mat[6] * vec[2] + mat[7] * vec[3],
        mat[8] * vec[0] + mat[9] * vec[1] + mat[10] * vec[2] + mat[11] * vec[3],
        mat[12] * vec[0] + mat[13] * vec[1] + mat[14] * vec[2] + mat[15] * vec[3],
    ]
}

function matrix4Add(mat1, mat2) {
    return [
        mat1[0] + mat2[0], mat1[1] + mat2[1], mat1[2] + mat2[2], mat1[3] + mat2[3],
        mat1[4] + mat2[4], mat1[5] + mat2[5], mat1[6] + mat2[6], mat1[7] + mat2[7],
        mat1[8] + mat2[8], mat1[9] + mat2[9], mat1[10] + mat2[10], mat1[11] + mat2[11],
        mat1[12] + mat2[12], mat1[13] + mat2[13], mat1[14] + mat2[14], mat1[15] + mat2[15],
    ]   
}

function matrix4Sub(mat1, mat2) {
    return [
        mat1[0] - mat2[0], mat1[1] - mat2[1], mat1[2] - mat2[2], mat1[3] - mat2[3],
        mat1[4] - mat2[4], mat1[5] - mat2[5], mat1[6] - mat2[6], mat1[7] - mat2[7],
        mat1[8] - mat2[8], mat1[9] - mat2[9], mat1[10] - mat2[10], mat1[11] - mat2[11],
        mat1[12] - mat2[12], mat1[13] - mat2[13], mat1[14] - mat2[14], mat1[15] - mat2[15],
    ]
}

function matrix4ScalaMul(mat, s) {
    return [
        s * mat[0], s * mat[1], s * mat[2], s * mat[3],
        s * mat[4], s * mat[5], s * mat[6], s * mat[7],
        s * mat[8], s * mat[9], s * mat[10], s * mat[11],
        s * mat[12], s * mat[13], s * mat[14], s * mat[15],
    ]
}

function matrix4Mul(mat1, mat2) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < 16; i++) {
        let row = Math.floor(i / 4)
        let column = i - row * 4
        result[i] = mat1[row * 4 + 0] * mat2[column + 0] + mat1[row * 4 + 1] * mat2[column + 4] + mat1[row * 4 + 2] * mat2[column + 8] + mat1[row * 4 + 3] * mat2[column + 12]
    }

    return result
}

// Transform matrix
function matrix4Rotate(axis, degree) {
    let angle = degree * Math.PI / 180
    let s = Math.sin(angle)
    let c = Math.cos(angle)

    if (axis === 0) {
        return [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]
    } else if (axis === 1) {
        return [
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]
    }
    return [
        c, -s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}

function matrix4RotateAxis(vec, degree) {
    let angle = degree * Math.PI / 180
    let s = Math.sin(angle)
    let c = Math.cos(angle)
    let vecNormalized = vector3Normalize(vec)
    let x = vecNormalized[0]
    let y = vecNormalized[1]
    let z = vecNormalized[2]

    let K = [
        0, -z, y,
        z, 0, -x,
        -y, x, 0,
    ]

    let m1 = matrix3Identity()
    let m2 = matrix3ScalaMul(K, s)
    let m3 = matrix3ScalaMul(matrix3Mul(K, K), 1 - c)
    let result = matrix3Add(matrix3Add(m1, m2), m3)

    return [
        result[0], result[1], result[2], 0,
        result[3], result[4], result[5], 0,
        result[6], result[7], result[8], 0,
        0, 0, 0, 1
    ]
}

function matrix4Translate(tx, ty, tz) {
    return [
        1, 0, 0, tx,
        0, 1, 0, ty,
        0, 0, 1, tz,
        0, 0, 0, 1
    ]
}

function matrix4Scale(sx, sy, sz) {
    return [
        sx, 0, 0, 0,
        0, sy, 0, 0,
        0, 0, sz, 0,
        0, 0, 0, 1
    ]
}

// Applying Transform
function applyTransform(mat, vec) {
    let coordHomo = matrix4Vector4Mult(mat, [vec[0], vec[1], vec[2], 1])
    return [coordHomo[0] / coordHomo[3], coordHomo[1] / coordHomo[3], coordHomo[2] / coordHomo[3]]
}

function applyTransformArray(mat, vecArray) {
    let result = []

    for (let i = 0; i < vecArray.length; i += 3) {
        let coordHomo = matrix4Vector4Mult(mat, [vecArray[i], vecArray[i + 1], vecArray[i + 2], 1])
        result = result.concat([coordHomo[0] / coordHomo[3], coordHomo[1] / coordHomo[3], coordHomo[2] / coordHomo[3]])
    }
    
    return result
}

// Vertice : [x1, y1, x2, y2, x3, y3]
function areaTriangle2D(vertice) {
    return 0.5 * Math.abs(vertice[0] * vertice[3] + vertice[2] * vertice[5] + vertice[4] * vertice[1] - vertice[2] * vertice[1] - vertice[4] * vertice[3] - vertice[0] * vertice[5])
}

function pointInsideTriangle2D(x, y, triangle) {
    let area = areaTriangle2D(triangle)
    let area1 = areaTriangle2D([x, y, triangle[0], triangle[1], triangle[2], triangle[3]])
    let area2 = areaTriangle2D([x, y, triangle[2], triangle[3], triangle[4], triangle[5]])
    let area3 = areaTriangle2D([x, y, triangle[4], triangle[5], triangle[0], triangle[1]])

    return area1 + area2 + area3 < area + 0.01
}