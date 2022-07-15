class KeypointDetector {
    public detector;
    public faces: null;
    public imgDom: HTMLImageElement;
    public canvasDom: HTMLCanvasElement;

    constructor(srcImgID, destCanvasID) {
        this.imgDom = <HTMLImageElement>document.getElementById(srcImgID);
        this.canvasDom = <HTMLCanvasElement>document.getElementById(destCanvasID);
    }

    async init_again() {
        // const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

        const detectorConfig = {
            runtime: 'mediapipe', // or 'tfjs'
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
        }
        this.detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        return this.detector;
    }

    detect() {
        this.faces = this.detector.estimateFaces(this.imgDom);
    }

    drawPath(ctx, points, closePath) {
        const region = new Path2D();
        region.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            region.lineTo(point[0], point[1]);
        }
        if (closePath) {
            region.closePath();
        }
        ctx.stroke(region);
    }

    drawResult() {
        const ctx = this.canvasDom.getContext('2d');
        ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
        if (this.faces)
            this.faces.forEach((face) => {
                const keypoints = face.keypoints.map((keypoint) => [keypoint.x, keypoint.y]);

                // draw face boxes
                ctx.strokeStyle = '#fd252e';
                ctx.lineWidth = 1;

                const box = face.box;
                this.drawPath(
                    ctx,
                    [
                        [box.xMin, box.yMin], [box.xMax, box.yMin], [box.xMax, box.yMax],
                        [box.xMin, box.yMax]
                    ],
                    true);

                // draw key points
                ctx.fillStyle = '#2ff1dd';

                for (let i = 0, NUM_KEYPOINTS = 6; i < NUM_KEYPOINTS; i++) {
                    const x = keypoints[i][0];
                    const y = keypoints[i][1];

                    ctx.beginPath();
                    ctx.arc(x, y, 3 /* radius */, 0, 2 * Math.PI);
                    ctx.fill();
                }

            });
    }
}

let detector_online: KeypointDetector;

export function initDetector() {
    detector_online = new KeypointDetector('imgDom', 'canvasOnline');
    detector_online.init_again();
    const btn = document.getElementById('startOnline');
    btn.addEventListener("click", (event) => {
        detector_online.detect();
        detector_online.drawResult();
    });
}

