async function initDet() {
    /*
    *   Load model and configs of the blaze face 1000e model
    * */
    const modelURL = './blazeface_1000e/model.onnx'
    const modelConfig = './blazeface_1000e/configs.json'
    window.model = new WebAI.Det(modelURL, modelConfig);
}


async function detect(srcImgId, dstCanvasId) {
    /*
    *   Input:  source image id in html document,
    *           destination canvas id where the result is expected to be printed
    *   Output:
    *           training result of the face detection
    * */
    const canvasDet = document.getElementById(dstCanvasId);
    const imgDom = document.getElementById(srcImgId);
    let imgRGBA = cv.imread(imgDom);
    let bboxes = await model.infer(imgRGBA);
    let imgShow = imgRGBA;
    for (let i = 0, len = bboxes.length; i < len; i++) {
        let point1 = new cv.Point(bboxes[i]['x1'], bboxes[i]['y1']);
        let point2 = new cv.Point(bboxes[i]['x2'], bboxes[i]['y2']);
        cv.rectangle(imgShow, point1, point2, [255, 0, 0, 255]);
        cv.putText(imgShow, `face ${i}`, point1, 0, 0.5, [0, 255, 0, 255], 1.5, 8);
    }
    cv.imshow(canvasDet, imgShow)
    // imgRGBA.delete()
    imgShow.delete()
    return bboxes;
}



