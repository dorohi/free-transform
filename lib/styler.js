"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transformationMatrix = require("transformation-matrix");

//https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
var roundTo = function roundTo(n) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  var test = Math.round(n) / multiplicator;
  return +test.toFixed(2);
};

exports.default = function (_ref) {
  var x = _ref.x,
      y = _ref.y,
      angle = _ref.angle,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      width = _ref.width,
      height = _ref.height,
      _ref$disableScale = _ref.disableScale,
      disableScale = _ref$disableScale === undefined ? false : _ref$disableScale;


  var changedWidth = width * (1 - scaleX);
  var newWidth = width - changedWidth;
  var changedHeight = height * (1 - scaleY);
  var newHeight = height - changedHeight;

  var transformMatrix = void 0;

  if (disableScale === false) {
    transformMatrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(roundTo(x + changedWidth / 2), roundTo(y + changedHeight / 2)), (0, _transformationMatrix.rotate)(angle * (Math.PI / 180)), (0, _transformationMatrix.scale)(scaleX, scaleY));
  } else {
    transformMatrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(roundTo(x + changedWidth), roundTo(y + changedHeight)), (0, _transformationMatrix.rotate)(angle * (Math.PI / 180)));
    width = newWidth;
    height = newHeight;
  }

  return {
    element: {
      width: width,
      height: height,
      transform: (0, _transformationMatrix.toCSS)(transformMatrix),
      position: "absolute"
    },
    controls: {
      width: newWidth,
      height: newHeight,
      transform: (0, _transformationMatrix.toCSS)((0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(roundTo(x + changedWidth), roundTo(y + changedHeight)), (0, _transformationMatrix.rotate)(angle * (Math.PI / 180)))),
      position: "absolute"
    }
  };
};