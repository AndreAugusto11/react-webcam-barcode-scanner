"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const library_1 = require("@zxing/library");
const react_webcam_1 = __importDefault(require("react-webcam"));
const BarcodeScannerComponent = (_a) => {
    var { width, height, onUpdate } = _a, props = __rest(_a, ["width", "height", "onUpdate"]);
    const webcamRef = react_1.default.useRef(null);
    const codeReader = new library_1.BrowserMultiFormatReader();
    const capture = react_1.default.useCallback(() => {
        var _a;
        const imageSrc = (_a = webcamRef === null || webcamRef === void 0 ? void 0 : webcamRef.current) === null || _a === void 0 ? void 0 : _a.getScreenshot();
        if (imageSrc) {
            codeReader.decodeFromImage(undefined, imageSrc).then(result => {
                onUpdate(null, result);
            }).catch((err) => {
                onUpdate(err);
            });
        }
    }, [codeReader, onUpdate]);
    react_1.default.useEffect(() => {
        setInterval(capture, 100);
    }, []);
    return (react_1.default.createElement(react_webcam_1.default, Object.assign({ audio: false, width: width, height: height, ref: webcamRef, screenshotFormat: "image/png", mirrored: true, videoConstraints: {
            facingMode: 'environment'
        } }, props)));
};
exports.default = BarcodeScannerComponent;
