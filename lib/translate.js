"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref, onUpdate) {
  var x = _ref.x,
      y = _ref.y,
      startX = _ref.startX,
      startY = _ref.startY;
  return function (dragEvent) {
    x += (dragEvent.pageX || dragEvent.targetTouches[0].pageX) - startX;
    y += (dragEvent.pageY || dragEvent.targetTouches[0].pageY) - startY;

    onUpdate({ x: x, y: y });

    startX = dragEvent.pageX || dragEvent.targetTouches[0].pageX;
    startY = dragEvent.pageY || dragEvent.targetTouches[0].pageY;
  };
};