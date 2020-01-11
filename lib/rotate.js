"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pointFinder = require("./point-finder");

exports.default = function (_ref, onUpdate) {
  var x = _ref.x,
      y = _ref.y,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      width = _ref.width,
      height = _ref.height,
      angle = _ref.angle,
      startX = _ref.startX,
      startY = _ref.startY,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY;


  var center = (0, _pointFinder.getCenter)({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height });

  var pressAngle = Math.atan2(startY - offsetY - center.y, startX - offsetX - center.x) * 180 / Math.PI;

  return function (event) {

    var degree = Math.atan2(event.pageY - offsetY - center.y, event.pageX - offsetX - center.x) * 180 / Math.PI;

    var ang = angle + degree - pressAngle;

    if (event.shiftKey) {
      ang = (ang / 15 >> 0) * 15;
    }

    onUpdate({
      angle: ang
    });
  };
};