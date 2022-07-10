function initMark() {
    const startMark = <HTMLButtonElement>document.getElementById("startMark");
    let imgDom = <HTMLImageElement>document.getElementById("imgDom");

    startMark.addEventListener("click", (event) => {
        async function doMark(imgPath) {
            let a = <HTMLLinkElement>document.getElementById("srcImgLink");
            // console.log(a);
            let downloadLink = a.href;
            startMark.disabled = true;
            let res_img = await eel.landmark_entry(downloadLink)();
            return res_img;
        }

        if (imgDom.src !== '') {
            doMark(imgDom.src).then((res_img) => {
                const imgMark = <HTMLImageElement>document.getElementById("imgMark");
                if (res_img !== '' && res_img !== 'ErrorMark') {
                    imgMark.src = res_img;
                } else if (res_img === 'ErrorMark') {
                    window.alert("居然没有检测到人脸:(");
                }
                startMark.disabled = false;
            });
        }
    });
}

initMark();