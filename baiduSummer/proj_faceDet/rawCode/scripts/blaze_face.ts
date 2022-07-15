async function initDet() {
    const imgDom = <HTMLImageElement>document.getElementById('imgDom')

    const inputFile = <HTMLInputElement>document.getElementById('inputFile')
    const modelURL = '../blazeface_1000e/model.onnx'
    const modelConfig = '../blazeface_1000e/configs.json'
    window.model = new WebAI.Det(modelURL, modelConfig);
    inputFile.disabled = false;
    inputFile.addEventListener("change", (event) => {
        if (event.target.files[0]) {
            imgDom.src = URL.createObjectURL(event.target.files[0]);
            downloadCanvasImage("imgDom", "srcImg");
        }
    });
    const startDet = document.getElementById("startDet");
    startDet.addEventListener("click", (event) => {
        detect();
    });
}


async function detect() {
    const canvasDet = document.getElementById('canvasDet');
    const imgDom = document.getElementById('imgDom');
    let imgRGBA = cv.imread(imgDom);
    let bboxes = await model.infer(imgRGBA);
    // let imgShow = await WebAI.drawBBoxes(imgRGBA, bboxes);
    let imgShow = imgRGBA;
    for (let i = 0, len = bboxes.length; i < len; i++) {
        let point1 = new cv.Point(bboxes[i]['x1'], bboxes[i]['y1']);
        let point2 = new cv.Point(bboxes[i]['x2'], bboxes[i]['y2']);
        cv.rectangle(imgShow, point1, point2, [255, 0, 0, 255]);
        cv.putText(imgShow, `face ${i}`, point1, 0, 0.5, [0, 255, 0, 255], 1.5, 8);
    }
    console.log(bboxes);
    const detTab = document.getElementById("detTab");
    let htmlStr = ``;
    htmlStr += `<thead>
                <tr>
                    <th>编号</th>
                    <th>左上坐标</th>
                    <th>右下坐标</th>
                    <th>确信度</th>
                </tr>
             </thead>`;
    detTab.innerHTML = htmlStr;
    htmlStr = `<tbody>`;
    for (let i = 0; i < bboxes.length; i++) {
        htmlStr +=
            `
            <tr>
            <td>${i}</td>
            <td>(${bboxes[i].x1}, ${bboxes[i].y1})</td>
            <td>(${bboxes[i].x2}, ${bboxes[i].y2})</td>
            <td>${bboxes[i].score.toFixed(5) * 100}%</td>
            </tr>
            `;
    }
    htmlStr += `<tr><td>检测到的人脸总数：${bboxes.length}</td></tr>`;
    htmlStr += `</tbody>`;
    detTab.innerHTML += htmlStr;
    cv.imshow(canvasDet, imgShow)
    imgRGBA.delete()
    imgShow.delete()
}

window.onload = initDet;


function downloadCanvasImage(imgID, name) {
    let image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL('image/png');
        // 生成一个a元素
        let a = <HTMLLinkElement>document.getElementById("srcImgLink");
        a.download = name || 'downLoadImg';
        // 将生成的URL设置为a.href属性
        a.href = url;
        // console.log(a.href);

    }

    image.src = (<HTMLImageElement>document.getElementById(imgID)).src
}
