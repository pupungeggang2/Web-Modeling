// Functions related to math
function vector3Add(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]]
}

function matrixAdd(mat1, mat2) {
    return [
        mat1[0] + mat2[0], mat1[1] + mat2[1], mat1[2] + mat2[2], mat1[3] + mat2[3],
        mat1[4] + mat2[4], mat1[5] + mat2[5], mat1[6] + mat2[6], mat1[7] + mat2[7],
        mat1[8] + mat2[8], mat1[9] + mat2[9], mat1[10] + mat2[10], mat1[11] + mat2[11],
        mat1[12] + mat2[12], mat1[13] + mat2[13], mat1[14] + mat2[14], mat1[15] + mat2[15],
    ]   
}

function matrixSub(mat1, mat2) {
    return [
        mat1[0] - mat2[0], mat1[1] - mat2[1], mat1[2] - mat2[2], mat1[3] - mat2[3],
        mat1[4] - mat2[4], mat1[5] - mat2[5], mat1[6] - mat2[6], mat1[7] - mat2[7],
        mat1[8] - mat2[8], mat1[9] - mat2[9], mat1[10] - mat2[10], mat1[11] - mat2[11],
        mat1[12] - mat2[12], mat1[13] - mat2[13], mat1[14] - mat2[14], mat1[15] - mat2[15],
    ]
}