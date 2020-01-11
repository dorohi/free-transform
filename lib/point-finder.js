'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Find the actual point position of a transformed point
 *
 * @param {Object} payload an object holding required information to find actual point
 * @param {number} payload.x position of x
 * @param {number} payload.y position of y
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center  {{x,y}} the center of element
 * @param {number} payload.rad the a computed radians of a provided angle
 *
 * @returns {{x: number, y: number}} an object holding the position
 */
var findPoint = function findPoint(_ref) {
  var x = _ref.x,
      y = _ref.y,
      angle = _ref.angle,
      center = _ref.center,
      _ref$rad = _ref.rad,
      rad = _ref$rad === undefined ? angle * (Math.PI / 180) : _ref$rad;
  return {
    x: (x - center.x) * Math.cos(rad) - (y - center.y) * Math.sin(rad) + center.x,
    y: (x - center.x) * Math.sin(rad) + (y - center.y) * Math.cos(rad) + center.y
  };
};

/**
 * Get the Center point of a box
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 *
 * @returns {{x: *, y: *}} the center of point of element
 */
var getCenter = exports.getCenter = function getCenter(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      width = _ref2.width,
      height = _ref2.height;

  var changedWidth = width * scaleX;
  var changedHeight = height * scaleY;

  var changedWidthDiff = changedWidth - width;
  var changedHeightDiff = changedHeight - height;

  return {
    x: x - changedWidthDiff + changedWidth / 2,
    y: y - changedHeightDiff + changedHeight / 2
  };
};

/**
 * get the TopLeft point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getTL = exports.getTL = function getTL(_ref3) {
  var x = _ref3.x,
      y = _ref3.y,
      scaleX = _ref3.scaleX,
      scaleY = _ref3.scaleY,
      width = _ref3.width,
      height = _ref3.height,
      angle = _ref3.angle,
      _ref3$center = _ref3.center,
      center = _ref3$center === undefined ? getCenter({
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height
  }) : _ref3$center;
  return findPoint({
    x: x,
    y: y,
    angle: angle,
    center: center
  });
};

/**
 * get the LeftBottom point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getBL = exports.getBL = function getBL(_ref4) {
  var x = _ref4.x,
      y = _ref4.y,
      scaleX = _ref4.scaleX,
      scaleY = _ref4.scaleY,
      width = _ref4.width,
      height = _ref4.height,
      angle = _ref4.angle,
      _ref4$center = _ref4.center,
      center = _ref4$center === undefined ? getCenter({
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height
  }) : _ref4$center;


  return findPoint({
    angle: angle,
    center: center,
    x: x,
    y: y + height * scaleY
  });
};

/**
 * Get TopRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getTR = exports.getTR = function getTR(_ref5) {
  var x = _ref5.x,
      y = _ref5.y,
      scaleX = _ref5.scaleX,
      scaleY = _ref5.scaleY,
      width = _ref5.width,
      height = _ref5.height,
      angle = _ref5.angle,
      _ref5$center = _ref5.center,
      center = _ref5$center === undefined ? getCenter({
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height
  }) : _ref5$center;
  return findPoint({
    angle: angle,
    center: center,
    x: x + width * scaleX,
    y: y
  });
};

/**
 * Get BottomRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getBR = exports.getBR = function getBR(_ref6) {
  var x = _ref6.x,
      y = _ref6.y,
      scaleX = _ref6.scaleX,
      scaleY = _ref6.scaleY,
      width = _ref6.width,
      height = _ref6.height,
      angle = _ref6.angle,
      _ref6$center = _ref6.center,
      center = _ref6$center === undefined ? getCenter({
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height
  }) : _ref6$center;

  return findPoint({
    angle: angle,
    center: center,
    x: x + width * scaleX,
    y: y + height * scaleY
  });
};

/**
 * get MiddleRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getMR = exports.getMR = function getMR(_ref7) {
  var x = _ref7.x,
      y = _ref7.y,
      scaleX = _ref7.scaleX,
      scaleY = _ref7.scaleY,
      width = _ref7.width,
      height = _ref7.height,
      angle = _ref7.angle,
      _ref7$center = _ref7.center,
      center = _ref7$center === undefined ? getCenter({
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height
  }) : _ref7$center;
  return findPoint({
    x: x + width * scaleX,
    y: y + height * scaleY / 2,
    center: center,
    angle: angle
  });
};

/**
 * get MiddleBottom point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getBM = exports.getBM = function getBM(_ref8) {
  var x = _ref8.x,
      y = _ref8.y,
      scaleX = _ref8.scaleX,
      scaleY = _ref8.scaleY,
      width = _ref8.width,
      height = _ref8.height,
      angle = _ref8.angle,
      _ref8$center = _ref8.center,
      center = _ref8$center === undefined ? getCenter({
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height
  }) : _ref8$center;
  return findPoint({
    x: x + width * scaleX / 2,
    y: y + height * scaleY,
    center: center,
    angle: angle
  });
};

/**
 * get MiddleTop point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getTM = exports.getTM = function getTM(_ref9) {
  var x = _ref9.x,
      y = _ref9.y,
      scaleX = _ref9.scaleX,
      scaleY = _ref9.scaleY,
      width = _ref9.width,
      height = _ref9.height,
      angle = _ref9.angle,
      _ref9$center = _ref9.center,
      center = _ref9$center === undefined ? getCenter({
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height
  }) : _ref9$center;
  return findPoint({
    x: x + width * scaleX / 2,
    y: y,
    center: center,
    angle: angle
  });
};

/**
 * get MiddleLeft point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getML = exports.getML = function getML(_ref10) {
  var x = _ref10.x,
      y = _ref10.y,
      scaleX = _ref10.scaleX,
      scaleY = _ref10.scaleY,
      width = _ref10.width,
      height = _ref10.height,
      angle = _ref10.angle,
      _ref10$center = _ref10.center,
      center = _ref10$center === undefined ? getCenter({
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height
  }) : _ref10$center;
  return findPoint({
    x: x,
    y: y + height * scaleY / 2,
    center: center,
    angle: angle
  });
};

/**
 * given a point, get it's opposite point
 *
 * @param {string} scaleType scale point position name
 * @param {Object} props element information
 * @param {number} props.x the position of x
 * @param {number} props.y the position of y
 * @param {number} props.scaleX the scaleX of element
 * @param {number} props.scaleY the scaleY of element
 * @param {number} props.width the original width of element
 * @param {number} props.height the original height of element
 * @param {number} props.angle the  rotation angle
 * @param {Object} props.center {{x:number, y:number}}
 *
 * @returns {{x:number, y:number}} point position
 */
var getOppositePoint = exports.getOppositePoint = function getOppositePoint(scaleType, props) {

  var caller = void 0;

  var center = getCenter({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    scaleX: props.scaleX,
    scaleY: props.scaleY
  });

  props = _extends({
    center: center
  }, props, {
    x: getOriginalPositionFromScale(props.x, props.width, props.scaleX),
    y: getOriginalPositionFromScale(props.y, props.height, props.scaleY)
  });

  switch (scaleType) {
    case 'tl':
      caller = getBR;
      break;

    case 'ml':
      caller = getMR;
      break;

    case 'tr':
      caller = getBL;
      break;

    case 'tm':
      caller = getBM;
      break;

    case 'bl':
      caller = getTR;
      break;

    case 'bm':
      caller = getTM;
      break;

    case 'br':
      caller = getTL;
      break;

    case 'mr':
      caller = getML;
      break;
  }
  return caller(props);
};

/**
 * given a point position by it's string name
 *
 * @param {string} scaleType scale point position name
 * @param {Object} props element information
 * @param {number} props.x the position of x
 * @param {number} props.y the position of y
 * @param {number} props.scaleX the scaleX of element
 * @param {number} props.scaleY the scaleY of element
 * @param {number} props.width the original width of element
 * @param {number} props.height the original height of element
 * @param {number} props.angle the  rotation angle
 * @param {boolean} props.scaleFromCenter scaling performed from center
 * @param {Object} props.center {{x:number, y:number}}
 *
 * @returns {{x:number, y:number}} point position
 */
var getPoint = exports.getPoint = function getPoint(scaleType, props) {

  var center = getCenter({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    scaleX: props.scaleX,
    scaleY: props.scaleY
  });

  if (props.scaleFromCenter) {
    return center;
  }

  props = _extends({
    center: center
  }, props, {
    x: getOriginalPositionFromScale(props.x, props.width, props.scaleX),
    y: getOriginalPositionFromScale(props.y, props.height, props.scaleY)
  });

  var caller = void 0;
  switch (scaleType) {

    case 'tl':
      caller = getTL;
      break;

    case 'ml':
      caller = getML;
      break;

    case 'tr':
      caller = getTR;
      break;

    case 'tm':
      caller = getTM;
      break;

    case 'bl':
      caller = getBL;
      break;

    case 'bm':
      caller = getBM;
      break;

    case 'br':
      caller = getBR;
      break;

    case 'mr':
      caller = getMR;
      break;
  }

  return caller(props);
};

/**
 * get sine and cosine for a point based on angle and point name
 *
 * @param {string} scaleType scale point position name
 * @param {number} angle the  rotation angle
 *
 * @returns {{sin: number, cos: number}} the sine and cosine of scale type
 */
var getSineCosine = exports.getSineCosine = function getSineCosine(scaleType, angle) {
  switch (scaleType) {
    case 'tr':
    case 'tm':
    case 'bl':
    case 'bm':
      return {
        cos: Math.cos(-angle * (Math.PI / 180)),
        sin: Math.sin(-angle * (Math.PI / 180))
      };
    default:
      return {
        sin: Math.sin(angle * (Math.PI / 180)),
        cos: Math.cos(angle * (Math.PI / 180))
      };
  }
};

/**
 * get the amount of movement for a point
 *
 * @param {string} scaleType scale point position name
 * @param {object} oppositePoint the opposite point position {x: number,y: number}
 * @param {object} point the point position {x: number,y: number}
 * @param {object} moveDiff the the amount of pixels that element moved {x: number,y: number}
 *
 * @returns {{x: number, y:number}} the new position of moved element
 */
var getMovePoint = exports.getMovePoint = function getMovePoint(scaleType, oppositePoint, point, moveDiff) {
  switch (scaleType) {

    case 'tl':
      return {
        x: oppositePoint.x - (moveDiff.x + point.x),
        y: oppositePoint.y - (moveDiff.y + point.y)
      };
    case 'ml':
      return {
        x: oppositePoint.x - moveDiff.x - point.x,
        y: oppositePoint.y - moveDiff.y - point.y
      };

    case 'tr':
    case 'tm':
      return {
        x: point.x + (moveDiff.x - oppositePoint.x),
        y: oppositePoint.y - (moveDiff.y + point.y)
      };
    case 'mr':
    case 'br':
      return {
        x: point.x + (moveDiff.x - oppositePoint.x),
        y: point.y + (moveDiff.y - oppositePoint.y)
      };
    case 'bl':
    case 'bm':
      return {
        x: oppositePoint.x - (moveDiff.x + point.x),
        y: point.y + (moveDiff.y - oppositePoint.y)
      };
  }
};

/**
 * guess the original point position based on scale and the position after scaling
 *
 * @param {number} position the position of x or y
 * @param {number} size the size of element (width for x, height for y)
 * @param {number} scale the amount of scaled element (scaleX for x, scaleY for y)
 *
 * @returns {number} the original point position
 */
var getOriginalPositionFromScale = function getOriginalPositionFromScale(position, size, scale) {
  var changed = size * scale;

  var diff = changed - size;

  return position - diff;
};

/**
 * Find the real position of lowest and highest handle
 *
 * @param  {object} point the point
 * @returns {{x: number, y: number}} the max and min values of  X & Y
 */
var minMax = exports.minMax = function minMax(point) {

  var points = [getTL(point), getTR(point), getBL(point), getBR(point)];

  var bounds = points.reduce(function (bounds, point, c) {
    if (c === 0) {
      bounds.xmin = point.x;
      bounds.xmax = point.x;
      bounds.ymin = point.y;
      bounds.ymax = point.y;
    } else {
      bounds.xmin = Math.min(bounds.xmin, point.x);
      bounds.xmax = Math.max(bounds.xmax, point.x);
      bounds.ymin = Math.min(bounds.ymin, point.y);
      bounds.ymax = Math.max(bounds.ymax, point.y);
    }
    return bounds;
  }, {});

  return bounds;
};