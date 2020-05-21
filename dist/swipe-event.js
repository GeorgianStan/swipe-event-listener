!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("SwipeEvent",[],t):"object"==typeof exports?exports.SwipeEvent=t():e.SwipeEvent=t()}(this,(function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";var n,o;i.r(t),i.d(t,"CustomSwipeEvents",(function(){return n})),i.d(t,"SwipeEvent",(function(){return r})),function(e){e.swipeUp="swipeUp",e.swipeDown="swipeDown",e.swipeLeft="swipeLeft",e.swipeRight="swipeRight"}(n||(n={})),function(e){e.NO_SWIPE_ACTION_ENABLED="You must enable at least on swipe action",e.NO_SWIPE_AREA="No swipe area was provided",e.UNKNOWN_EVENT="Unknown even type in browser",e.NO_SWIPE_DIRECTION_ENABLED="No swipe direction was provided"}(o||(o={}));var r=function(e){var t,i,r,s=!1,p={swipeSensitivity:80,isSwipeUpDesired:!0,isSwipeDownDesired:!0,isSwipeLeftDesired:!0,isSwipeRightDesired:!0,listenForTouchEvents:!0,listenForMouseEvents:!0,swipeArea:void 0},u=function(e){var t={x:void 0,y:void 0};if("mousemove"===e.type||"mousedown"===e.type||"mousedup"===e.type)t.x=e.clientX,t.y=e.clientY;else{if("touchmove"!==e.type&&"touchstart"!==e.type&&"touchend"!==e.type)throw new Error(o.UNKNOWN_EVENT);t.x=e.touches[0].pageX,t.y=e.touches[0].pageY}return t},w=function(e){s=!0;var n=u(e);t=n.x,i=n.y},a=function(e){var o=!1;if(s){var p=u(e);if(r.isSwipeDownDesired&&i<p.y-r.swipeSensitivity){var w=new CustomEvent(n.swipeDown);o=!0,r.swipeArea.dispatchEvent(w)}if(r.isSwipeUpDesired&&i>p.y+r.swipeSensitivity){w=new CustomEvent(n.swipeUp);o=!0,r.swipeArea.dispatchEvent(w)}if(r.isSwipeLeftDesired&&t>p.x+r.swipeSensitivity){w=new CustomEvent(n.swipeLeft);o=!0,r.swipeArea.dispatchEvent(w)}if(r.isSwipeRightDesired&&t<p.x-r.swipeSensitivity){w=new CustomEvent(n.swipeRight);o=!0,r.swipeArea.dispatchEvent(w)}o&&(s=!1)}},v=function(e){s=!1,t=void 0,i=void 0},d=function(e){r=function(e,t){var i;for(i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e}(p,e),function(){if(!r.listenForMouseEvents&&!r.listenForTouchEvents)throw new Error(o.NO_SWIPE_ACTION_ENABLED);if(!(r.isSwipeDownDesired||r.isSwipeLeftDesired||r.isSwipeRightDesired||r.isSwipeUpDesired))throw new Error(o.NO_SWIPE_DIRECTION_ENABLED);if(!r.swipeArea)throw new Error(o.NO_SWIPE_AREA)}()},f=function(){r.swipeArea.removeEventListener("touchstart",w),r.swipeArea.removeEventListener("touchmove",a),r.swipeArea.removeEventListener("touchend",v),r.swipeArea.removeEventListener("mousedown",w),r.swipeArea.removeEventListener("mousemove",a),r.swipeArea.removeEventListener("mouseup",v)},c=function(){r.listenForTouchEvents&&(r.swipeArea.addEventListener("touchstart",w),r.swipeArea.addEventListener("touchmove",a),r.swipeArea.addEventListener("touchend",v)),r.listenForMouseEvents&&(r.swipeArea.addEventListener("mousedown",w),r.swipeArea.addEventListener("mousemove",a),r.swipeArea.addEventListener("mouseup",v))};return"undefined"!=typeof window&&function(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var i=document.createEvent("CustomEvent");return i.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),i}e.prototype=window.Event.prototype,window.CustomEvent=e}(),d(e),c(),{swipeArea:r.swipeArea,updateOptions:function(e){f(),d(e),c()},off:f}}}])}));