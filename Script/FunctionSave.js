function modelingToObj() {
    let verticeID = 1
    let normalID = 1
    let textVertice = ''
    let textNormal = ''
    let textFace = ''

    for (let i = 1; i < planeGConnection.length; i++) {
        for (let j = 0; j < planeGConnection[i].length; j++) {
            let index = planeGConnection[i][j]
            textVertice += `v ${planeG[index]['Vertice'][0].toFixed(3)} ${planeG[index]['Vertice'][1].toFixed(3)} ${planeG[index]['Vertice'][2].toFixed(3)}\n`
            textVertice += `v ${planeG[index]['Vertice'][3].toFixed(3)} ${planeG[index]['Vertice'][4].toFixed(3)} ${planeG[index]['Vertice'][5].toFixed(3)}\n`
            textVertice += `v ${planeG[index]['Vertice'][6].toFixed(3)} ${planeG[index]['Vertice'][7].toFixed(3)} ${planeG[index]['Vertice'][8].toFixed(3)}\n`

            textNormal += `vn ${planeG[index]['Normal'][0].toFixed(3)} ${planeG[index]['Normal'][1].toFixed(3)} ${planeG[index]['Normal'][2].toFixed(3)}\n`

            textFace += `f ${verticeID}//${normalID} ${verticeID + 1}//${normalID} ${verticeID + 2}//${normalID}\n`

            verticeID += 3
            normalID += 1
        }
    }

    return textVertice + textNormal + textFace
}