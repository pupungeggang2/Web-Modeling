// Functions related to math
function vector3Add(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]]
}

function vector3Sub(vec1, vec2) {
    return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]]
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

function matrix4Mul(mat1, mat2) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < 16; i++) {
        let row = Math.floor(i / 4)
        let column = i - row * 4
        result[i] = mat1[row * 4 + 0] * mat2[column + 0] + mat1[row * 4 + 1] * mat2[column + 4] + mat1[row * 4 + 2] * mat2[column + 8] + mat1[row * 4 + 3] * mat2[column + 12]
    }

    return result
}

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

function applyTransform(mat, vec) {
    return matrix4Vector4Mult(mat, [vec[0], vec[1], vec[2], 1]).slice(0, 3)
}