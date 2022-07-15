"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDetector = void 0;
var KeypointDetector = /** @class */ (function () {
    function KeypointDetector(srcImgID, destCanvasID) {
        this.imgDom = document.getElementById(srcImgID);
        this.canvasDom = document.getElementById(destCanvasID);
    }
    KeypointDetector.prototype.init_again = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model, detectorConfig, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
                        detectorConfig = {
                            runtime: 'mediapipe',
                            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
                        };
                        _a = this;
                        return [4 /*yield*/, faceLandmarksDetection.createDetector(model, detectorConfig)];
                    case 1:
                        _a.detector = _b.sent();
                        return [2 /*return*/, this.detector];
                }
            });
        });
    };
    KeypointDetector.prototype.detect = function () {
        this.faces = this.detector.estimateFaces(this.imgDom);
    };
    KeypointDetector.prototype.drawPath = function (ctx, points, closePath) {
        var region = new Path2D();
        region.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; i++) {
            var point = points[i];
            region.lineTo(point[0], point[1]);
        }
        if (closePath) {
            region.closePath();
        }
        ctx.stroke(region);
    };
    KeypointDetector.prototype.drawResult = function () {
        var _this = this;
        var ctx = this.canvasDom.getContext('2d');
        ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
        if (this.faces)
            this.faces.forEach(function (face) {
                var keypoints = face.keypoints.map(function (keypoint) { return [keypoint.x, keypoint.y]; });
                // draw face boxes
                ctx.strokeStyle = '#fd252e';
                ctx.lineWidth = 1;
                var box = face.box;
                _this.drawPath(ctx, [
                    [box.xMin, box.yMin], [box.xMax, box.yMin], [box.xMax, box.yMax],
                    [box.xMin, box.yMax]
                ], true);
                // draw key points
                ctx.fillStyle = '#2ff1dd';
                for (var i = 0, NUM_KEYPOINTS = 6; i < NUM_KEYPOINTS; i++) {
                    var x = keypoints[i][0];
                    var y = keypoints[i][1];
                    ctx.beginPath();
                    ctx.arc(x, y, 3 /* radius */, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });
    };
    return KeypointDetector;
}());
var detector_online;
function initDetector() {
    detector_online = new KeypointDetector('imgDom', 'canvasOnline');
    detector_online.init_again();
    var btn = document.getElementById('startOnline');
    btn.addEventListener("click", function (event) {
        detector_online.detect();
        detector_online.drawResult();
    });
}
exports.initDetector = initDetector;
