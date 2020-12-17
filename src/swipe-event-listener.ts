export interface Options {
  swipeSensitivity?: number;
  isSwipeUpDesired?: boolean;
  isSwipeDownDesired?: boolean;
  isSwipeLeftDesired?: boolean;
  isSwipeRightDesired?: boolean;
  listenForTouchEvents?: boolean;
  listenForMouseEvents?: boolean;
  swipeArea: HTMLElement;
}

interface CursorPosition {
  x: number | undefined;
  y: number | undefined;
}

export enum CustomSwipeEvents {
  swipeUp = 'swipeUp',
  swipeDown = 'swipeDown',
  swipeLeft = 'swipeLeft',
  swipeRight = 'swipeRight',
}

enum ErrorMessages {
  NO_SWIPE_ACTION_ENABLED = 'You must enable at least on swipe action', // when bot mouse and touch events are false
  NO_SWIPE_AREA = 'No swipe area was provided',
  UNKNOWN_EVENT = 'Unknown even type in browser',
  NO_SWIPE_DIRECTION_ENABLED = 'No swipe direction was provided',
}

export interface SwipeEventListener {
  swipeArea: HTMLElement;
  updateOptions: (newOptions: Options) => void;
}

export const SwipeEventListener = (
  customOptions: Options,
): SwipeEventListener => {
  /**
   * * Declaration
   */
  let didDraggingBegin = false;
  let initialTouchOnX: number | undefined;
  let initialTouchOnY: number | undefined;

  const defaultOptions: Options = {
    swipeSensitivity: 80,
    isSwipeUpDesired: true,
    isSwipeDownDesired: true,
    isSwipeLeftDesired: true,
    isSwipeRightDesired: true,
    listenForTouchEvents: true,
    listenForMouseEvents: true,
    swipeArea: undefined,
  };

  let finalOptions: Options;

  // * extend default optiosn with the user suplied ones
  const extendDefaults = (source: any, properties: any) => {
    let property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  };

  // * validate the final options (defualt + custom)
  const valdiateFinalOptions = () => {
    if (
      !(finalOptions.listenForMouseEvents || finalOptions.listenForTouchEvents)
    ) {
      throw new Error(ErrorMessages.NO_SWIPE_ACTION_ENABLED);
    }

    if (
      !(
        finalOptions.isSwipeDownDesired ||
        finalOptions.isSwipeLeftDesired ||
        finalOptions.isSwipeRightDesired ||
        finalOptions.isSwipeUpDesired
      )
    ) {
      throw new Error(ErrorMessages.NO_SWIPE_DIRECTION_ENABLED);
    }

    if (!finalOptions.swipeArea) {
      {
        throw new Error(ErrorMessages.NO_SWIPE_AREA);
      }
    }
  };

  // * normalize cursor | touch position
  const normalizeCursorPosition = (e: any): CursorPosition => {
    const cursorPosition: CursorPosition = {
      x: undefined,
      y: undefined,
    };

    if (
      e.type === 'mousemove' ||
      e.type === 'mousedown' ||
      e.type === 'mousedup'
    ) {
      cursorPosition.x = e.clientX;
      cursorPosition.y = e.clientY;
    } else if (
      e.type === 'touchmove' ||
      e.type === 'touchstart' ||
      e.type === 'touchend'
    ) {
      cursorPosition.x = e.touches[0].pageX;
      cursorPosition.y = e.touches[0].pageY;
    } else {
      throw new Error(ErrorMessages.UNKNOWN_EVENT);
    }

    return cursorPosition;
  };

  // * when user start draging
  const onDragStart = (e: TouchEvent | MouseEvent) => {
    didDraggingBegin = true;
    const cursorPosition: CursorPosition = normalizeCursorPosition(e);

    initialTouchOnX = cursorPosition.x;
    initialTouchOnY = cursorPosition.y;
  };

  // * on dragging
  const onDragging = (e: TouchEvent | MouseEvent) => {
    let wasSwipeDetected = false;

    if (!didDraggingBegin) {
      return;
    }

    const cursorPosition: CursorPosition = normalizeCursorPosition(e);

    if (finalOptions.isSwipeDownDesired) {
      if (initialTouchOnY < cursorPosition.y - finalOptions.swipeSensitivity) {
        const customEvent: CustomEvent = new CustomEvent(
          CustomSwipeEvents.swipeDown,
        );
        wasSwipeDetected = true;
        finalOptions.swipeArea.dispatchEvent(customEvent);
      }
    }

    if (finalOptions.isSwipeUpDesired) {
      if (initialTouchOnY > cursorPosition.y + finalOptions.swipeSensitivity) {
        const customEvent: CustomEvent = new CustomEvent(
          CustomSwipeEvents.swipeUp,
        );
        wasSwipeDetected = true;
        finalOptions.swipeArea.dispatchEvent(customEvent);
      }
    }

    if (finalOptions.isSwipeLeftDesired) {
      if (initialTouchOnX > cursorPosition.x + finalOptions.swipeSensitivity) {
        const customEvent: CustomEvent = new CustomEvent(
          CustomSwipeEvents.swipeLeft,
        );
        wasSwipeDetected = true;
        finalOptions.swipeArea.dispatchEvent(customEvent);
      }
    }

    if (finalOptions.isSwipeRightDesired) {
      if (initialTouchOnX < cursorPosition.x - finalOptions.swipeSensitivity) {
        const customEvent: CustomEvent = new CustomEvent(
          CustomSwipeEvents.swipeRight,
        );
        wasSwipeDetected = true;
        finalOptions.swipeArea.dispatchEvent(customEvent);
      }
    }

    if (wasSwipeDetected) {
      didDraggingBegin = false;
    }
  };

  // * when drag ends
  const onDragEnd = () => {
    didDraggingBegin = false;

    initialTouchOnX = undefined;
    initialTouchOnY = undefined;
  };

  // * initialzie options
  const initializeOptions = (customOptions: Options) => {
    // * initialize options
    finalOptions = extendDefaults(defaultOptions, customOptions);
    valdiateFinalOptions();
  };

  // * update options
  const updateOptions = (newOptions: Options) => {
    off();
    initializeOptions(newOptions);
    on();
  };

  // * remove events listers
  const off = () => {
    finalOptions.swipeArea.removeEventListener('touchstart', onDragStart);
    finalOptions.swipeArea.removeEventListener('touchmove', onDragging);
    finalOptions.swipeArea.removeEventListener('touchend', onDragEnd);
    finalOptions.swipeArea.removeEventListener('mousedown', onDragStart);
    finalOptions.swipeArea.removeEventListener('mousemove', onDragging);
    finalOptions.swipeArea.removeEventListener('mouseup', onDragEnd);
  };

  // * bind event listeners
  const on = () => {
    // * bind events
    if (finalOptions.listenForTouchEvents) {
      finalOptions.swipeArea.addEventListener('touchstart', onDragStart);
      finalOptions.swipeArea.addEventListener('touchmove', onDragging);
      finalOptions.swipeArea.addEventListener('touchend', onDragEnd);
    }

    if (finalOptions.listenForMouseEvents) {
      finalOptions.swipeArea.addEventListener('mousedown', onDragStart);
      finalOptions.swipeArea.addEventListener('mousemove', onDragging);
      finalOptions.swipeArea.addEventListener('mouseup', onDragEnd);
    }
  };

  /**
   * * Logic
   */

  // * CustomEvent polyfill for CustomEvent
  if (typeof window !== 'undefined') {
    (function () {
      if (typeof window.CustomEvent === 'function') return false;
      function CustomEvent(event: any, params: any) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined,
        };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(
          event,
          params.bubbles,
          params.cancelable,
          params.detail,
        );
        return evt;
      }
      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
    })();
  }

  // * initialize options ( extend default )
  initializeOptions(customOptions);

  // * init events
  on();

  return { swipeArea: finalOptions.swipeArea, updateOptions };
};
