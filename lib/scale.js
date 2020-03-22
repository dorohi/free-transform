'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pointFinder = require('./point-finder');

/**
 * Perform Scaling based on a positioned handle
 *
 * @param {string} scaleType scale point position name
 * @param {Object} payload an object holding element information
 * @param {event} payload.event the mousedown event object
 * @param {number} payload.x position of x
 * @param {number} payload.y position of y
 * @param {number} payload.scaleX amount of scale for x (width)
 * @param {number} payload.scaleY amount of scale for y (height)
 * @param {number} payload.width original width
 * @param {number} payload.height original height
 * @param {number} payload.angle the angle of rotation
 * @param {number} payload.scaleLimit minimum scale limit
 * @param {boolean} payload.scaleFromCenter by default scale from center
 * @param {boolean|number} payload.aspectRatio by default scale on aspect ration
 * @param {boolean} payload.enableScaleFromCenter completely disable scale from center
 * @param {boolean} payload.enableAspectRatio completely disable enforced aspect ratios
 * @param {Function} onUpdate a callback on mouse up
 *
 * @returns {Function} a function for mouse move
 */
exports.default = function (scaleType, _ref, onUpdate) {
  var event = _ref.event,
      x = _ref.x,
      y = _ref.y,
      startX = _ref.startX,
      startY = _ref.startY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      width = _ref.width,
      height = _ref.height,
      angle = _ref.angle,
      scaleLimit = _ref.scaleLimit,
      _ref$scaleFromCenter = _ref.scaleFromCenter,
      scaleFromCenter = _ref$scaleFromCenter === undefined ? false : _ref$scaleFromCenter,
      _ref$enableScaleFromC = _ref.enableScaleFromCenter,
      enableScaleFromCenter = _ref$enableScaleFromC === undefined ? true : _ref$enableScaleFromC,
      _ref$aspectRatio = _ref.aspectRatio,
      aspectRatio = _ref$aspectRatio === undefined ? false : _ref$aspectRatio,
      _ref$enableAspectRati = _ref.enableAspectRatio,
      enableAspectRatio = _ref$enableAspectRati === undefined ? true : _ref$enableAspectRati;


  // allow ratio to be set at a specific ratio
  var ratio = aspectRatio && aspectRatio !== true ? aspectRatio : width * scaleX / (height * scaleY);

  var point = void 0;
  var oppositePoint = void 0;
  // let startX; // uncomment when removing them as arguments
  // let startY;
  if (!event) {
    // prevents breaking change
    event = {
      pageX: startX,
      pageY: startY,
      altKey: scaleFromCenter,
      shiftKey: aspectRatio
    };

    scaleFromCenter = false;
    aspectRatio = false;
  }

  var currentProps = { x: x, y: y, scaleX: scaleX, scaleY: scaleY };

  var prevScaleFromCenterToggled = null; // will always fire the first time because scaleFromCenterToggled will always be true/false
  var drag = function drag(event) {

    // check control keys
    var aspectRatioToggled = enableAspectRatio && !event.shiftKey !== !aspectRatio;
    var scaleFromCenterToggled = enableScaleFromCenter && !event.altKey !== !scaleFromCenter;

    // initialize center if point changed.
    if (scaleFromCenterToggled !== prevScaleFromCenterToggled) {
      prevScaleFromCenterToggled = scaleFromCenterToggled;

      startX = event.pageX || event.targetTouches[0].pageX;
      startY = event.pageY || event.targetTouches[0].pageY;

      point = (0, _pointFinder.getPoint)(scaleType, _extends({}, currentProps, { width: width, height: height, angle: angle, scaleFromCenter: scaleFromCenterToggled }));
      oppositePoint = (0, _pointFinder.getOppositePoint)(scaleType, _extends({}, currentProps, { width: width, height: height, angle: angle }));

      return; // moveDiff will be zero anyway. this is just an initializing call.
    }

    var moveDiff = {
      x: (event.pageX || event.targetTouches[0].pageX) - startX,
      y: (event.pageY || event.targetTouches[0].pageY) - startY
    };

    var movePoint = (0, _pointFinder.getMovePoint)(scaleType, oppositePoint, point, moveDiff);

    if (scaleFromCenterToggled) {
      movePoint.x *= 2;
      movePoint.y *= 2;
    }

    var _getSineCosine = (0, _pointFinder.getSineCosine)(scaleType, angle),
        sin = _getSineCosine.sin,
        cos = _getSineCosine.cos;

    var rotationPoint = {
      x: movePoint.x * cos + movePoint.y * sin,
      y: movePoint.y * cos - movePoint.x * sin
    };

    currentProps.scaleX = Math.max(rotationPoint.x / width, scaleLimit);
    currentProps.scaleY = Math.max(rotationPoint.y / height, scaleLimit);

    switch (scaleType) {
      case 'ml':
      case 'mr':
        currentProps.scaleY = scaleY;
        if (aspectRatioToggled) {
          currentProps.scaleY = width * currentProps.scaleX * (1 / ratio) / height;
        }
        break;
      case 'tm':
      case 'bm':
        currentProps.scaleX = scaleX;
        if (aspectRatioToggled) {
          currentProps.scaleX = height * currentProps.scaleY * ratio / width;
        }
        break;
      default:
        if (aspectRatioToggled) {
          currentProps.scaleY = width * currentProps.scaleX * (1 / ratio) / height;
        }
    }

    if (scaleFromCenterToggled) {
      var center = (0, _pointFinder.getCenter)({
        x: x,
        y: y,
        width: width,
        height: height,
        scaleX: currentProps.scaleX,
        scaleY: currentProps.scaleY
      });
      currentProps.x = x + (point.x - center.x);
      currentProps.y = y + (point.y - center.y);
    } else {
      var freshOppositePoint = (0, _pointFinder.getOppositePoint)(scaleType, {
        width: width,
        height: height,
        angle: angle,
        x: x,
        y: y,
        scaleX: currentProps.scaleX,
        scaleY: currentProps.scaleY
      });

      currentProps.x = x + (oppositePoint.x - freshOppositePoint.x);
      currentProps.y = y + (oppositePoint.y - freshOppositePoint.y);
    }

    onUpdate(currentProps);
  };

  drag(event); // run with initial mousedown event
  return drag;
};