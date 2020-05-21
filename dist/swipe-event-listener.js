(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SwipeEventListener", [], factory);
	else if(typeof exports === 'object')
		exports["SwipeEventListener"] = factory();
	else
		root["SwipeEventListener"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/swipe-event-listener.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/swipe-event-listener.ts":
/*!*************************************!*\
  !*** ./src/swipe-event-listener.ts ***!
  \*************************************/
/*! exports provided: CustomSwipeEvents, SwipeEventListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CustomSwipeEvents\", function() { return CustomSwipeEvents; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SwipeEventListener\", function() { return SwipeEventListener; });\nvar CustomSwipeEvents;\n\n(function (CustomSwipeEvents) {\n  CustomSwipeEvents[\"swipeUp\"] = \"swipeUp\";\n  CustomSwipeEvents[\"swipeDown\"] = \"swipeDown\";\n  CustomSwipeEvents[\"swipeLeft\"] = \"swipeLeft\";\n  CustomSwipeEvents[\"swipeRight\"] = \"swipeRight\";\n})(CustomSwipeEvents || (CustomSwipeEvents = {}));\n\nvar ErrorMessages;\n\n(function (ErrorMessages) {\n  ErrorMessages[\"NO_SWIPE_ACTION_ENABLED\"] = \"You must enable at least on swipe action\";\n  ErrorMessages[\"NO_SWIPE_AREA\"] = \"No swipe area was provided\";\n  ErrorMessages[\"UNKNOWN_EVENT\"] = \"Unknown even type in browser\";\n  ErrorMessages[\"NO_SWIPE_DIRECTION_ENABLED\"] = \"No swipe direction was provided\";\n})(ErrorMessages || (ErrorMessages = {}));\n\nvar SwipeEventListener = function SwipeEventListener(customOptions) {\n  /**\r\n   * * Declaration\r\n   */\n  var didDraggingBegin = false;\n  var initialTouchOnX;\n  var initialTouchOnY;\n  var defaultOptions = {\n    swipeSensitivity: 80,\n    isSwipeUpDesired: true,\n    isSwipeDownDesired: true,\n    isSwipeLeftDesired: true,\n    isSwipeRightDesired: true,\n    listenForTouchEvents: true,\n    listenForMouseEvents: true,\n    swipeArea: undefined\n  };\n  var finalOptions; // * extend default optiosn with the user suplied ones\n\n  var extendDefaults = function extendDefaults(source, properties) {\n    var property;\n\n    for (property in properties) {\n      if (properties.hasOwnProperty(property)) {\n        source[property] = properties[property];\n      }\n    }\n\n    return source;\n  }; // * validate the final options (defualt + custom)\n\n\n  var valdiateFinalOptions = function valdiateFinalOptions() {\n    if (!(finalOptions.listenForMouseEvents || finalOptions.listenForTouchEvents)) {\n      throw new Error(ErrorMessages.NO_SWIPE_ACTION_ENABLED);\n    }\n\n    if (!(finalOptions.isSwipeDownDesired || finalOptions.isSwipeLeftDesired || finalOptions.isSwipeRightDesired || finalOptions.isSwipeUpDesired)) {\n      throw new Error(ErrorMessages.NO_SWIPE_DIRECTION_ENABLED);\n    }\n\n    if (!finalOptions.swipeArea) {\n      {\n        throw new Error(ErrorMessages.NO_SWIPE_AREA);\n      }\n    }\n  }; // * normalize cursor | touch position\n\n\n  var normalizeCursorPosition = function normalizeCursorPosition(e) {\n    var cursorPosition = {\n      x: undefined,\n      y: undefined\n    };\n\n    if (e.type === \"mousemove\" || e.type === \"mousedown\" || e.type === \"mousedup\") {\n      //@ts-ignore\n      cursorPosition.x = e.clientX; //@ts-ignore\n\n      cursorPosition.y = e.clientY;\n    } else if (e.type === \"touchmove\" || e.type === \"touchstart\" || e.type === \"touchend\") {\n      //@ts-ignore\n      cursorPosition.x = e.touches[0].pageX; //@ts-ignore\n\n      cursorPosition.y = e.touches[0].pageY;\n    } else {\n      throw new Error(ErrorMessages.UNKNOWN_EVENT);\n    }\n\n    return cursorPosition;\n  }; // * when user start draging\n\n\n  var onDragStart = function onDragStart(e) {\n    didDraggingBegin = true;\n    var cursorPosition = normalizeCursorPosition(e);\n    initialTouchOnX = cursorPosition.x;\n    initialTouchOnY = cursorPosition.y;\n  }; // * on dragging\n\n\n  var onDragging = function onDragging(e) {\n    var wasSwipeDetected = false;\n\n    if (!didDraggingBegin) {\n      return;\n    }\n\n    var cursorPosition = normalizeCursorPosition(e);\n\n    if (finalOptions.isSwipeDownDesired) {\n      if (initialTouchOnY < cursorPosition.y - finalOptions.swipeSensitivity) {\n        var customEvent = new CustomEvent(CustomSwipeEvents.swipeDown);\n        wasSwipeDetected = true;\n        finalOptions.swipeArea.dispatchEvent(customEvent);\n      }\n    }\n\n    if (finalOptions.isSwipeUpDesired) {\n      if (initialTouchOnY > cursorPosition.y + finalOptions.swipeSensitivity) {\n        var customEvent = new CustomEvent(CustomSwipeEvents.swipeUp);\n        wasSwipeDetected = true;\n        finalOptions.swipeArea.dispatchEvent(customEvent);\n      }\n    }\n\n    if (finalOptions.isSwipeLeftDesired) {\n      if (initialTouchOnX > cursorPosition.x + finalOptions.swipeSensitivity) {\n        var customEvent = new CustomEvent(CustomSwipeEvents.swipeLeft);\n        wasSwipeDetected = true;\n        finalOptions.swipeArea.dispatchEvent(customEvent);\n      }\n    }\n\n    if (finalOptions.isSwipeRightDesired) {\n      if (initialTouchOnX < cursorPosition.x - finalOptions.swipeSensitivity) {\n        var customEvent = new CustomEvent(CustomSwipeEvents.swipeRight);\n        wasSwipeDetected = true;\n        finalOptions.swipeArea.dispatchEvent(customEvent);\n      }\n    }\n\n    if (wasSwipeDetected) {\n      didDraggingBegin = false;\n    }\n  }; // * when drag ends\n\n\n  var onDragEnd = function onDragEnd(e) {\n    didDraggingBegin = false;\n    initialTouchOnX = undefined;\n    initialTouchOnY = undefined;\n  }; // * initialzie options\n\n\n  var initializeOptions = function initializeOptions(customOptions) {\n    // * initialize options\n    finalOptions = extendDefaults(defaultOptions, customOptions);\n    valdiateFinalOptions();\n  }; // * update options\n\n\n  var updateOptions = function updateOptions(newOptions) {\n    off();\n    initializeOptions(newOptions);\n    on();\n  }; // * remove events listers\n\n\n  var off = function off() {\n    finalOptions.swipeArea.removeEventListener(\"touchstart\", onDragStart);\n    finalOptions.swipeArea.removeEventListener(\"touchmove\", onDragging);\n    finalOptions.swipeArea.removeEventListener(\"touchend\", onDragEnd);\n    finalOptions.swipeArea.removeEventListener(\"mousedown\", onDragStart);\n    finalOptions.swipeArea.removeEventListener(\"mousemove\", onDragging);\n    finalOptions.swipeArea.removeEventListener(\"mouseup\", onDragEnd);\n  }; // * bind event listeners\n\n\n  var on = function on() {\n    // * bind events\n    if (finalOptions.listenForTouchEvents) {\n      finalOptions.swipeArea.addEventListener(\"touchstart\", onDragStart);\n      finalOptions.swipeArea.addEventListener(\"touchmove\", onDragging);\n      finalOptions.swipeArea.addEventListener(\"touchend\", onDragEnd);\n    }\n\n    if (finalOptions.listenForMouseEvents) {\n      finalOptions.swipeArea.addEventListener(\"mousedown\", onDragStart);\n      finalOptions.swipeArea.addEventListener(\"mousemove\", onDragging);\n      finalOptions.swipeArea.addEventListener(\"mouseup\", onDragEnd);\n    }\n  };\n  /**\r\n   * * Logic\r\n   */\n  // * CustomEvent polyfill for CustomEvent\n\n\n  if (typeof window !== \"undefined\") {\n    (function () {\n      if (typeof window.CustomEvent === \"function\") return false;\n\n      function CustomEvent(event, params) {\n        params = params || {\n          bubbles: false,\n          cancelable: false,\n          detail: undefined\n        };\n        var evt = document.createEvent(\"CustomEvent\");\n        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);\n        return evt;\n      }\n\n      CustomEvent.prototype = window.Event.prototype; //@ts-ignore\n\n      window.CustomEvent = CustomEvent;\n    })();\n  } // * initialize options ( extend default )\n\n\n  initializeOptions(customOptions); // * init events\n\n  on();\n  return {\n    swipeArea: finalOptions.swipeArea,\n    updateOptions: updateOptions\n  };\n};\n\n//# sourceURL=webpack://SwipeEventListener/./src/swipe-event-listener.ts?");

/***/ })

/******/ });
});