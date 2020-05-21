# Swipe Event Listener

swipe-event-listener is a very minimal library that allows listening for swipe gesture, including the ones from the mouse from any DOM element.
Once invoked with a DOM element, simply listen for swipe events.

## Installation

### Browser

```html
<script src="https://unpkg.com/browse/swipe-event-listener@1.0.0/dist/swipe-event-listener.js"></script>
```

Then anywhere in your JavaScript code.

```javascript
const { SwipeEventListener } = window.SwipeEventListener;
```

OR

```javascript
const SwipeEventListener = window.SwipeEventListener.SwipeEventListener;
```

### Via NPM

```bash
npm i swipe-event-listener
```

Then anywhere in your code.

```javascript
import { SwipeEventListener } from 'swipe-event-listener`
```

OR

```javascript
const SwipeListener = require("swipe-listener");
```

## How to use it

```javascript
const { swipeArea, updateOptions } = SwipeEventListener({
  swipeArea: document.querySelector("body"),
});

swipeArea.addEventListener("swipeDown", () => {
  console.log("swipe down");
});
swipeArea.addEventListener("swipeUp", () => {
  console.log("swipe up");
});

swipeArea.addEventListener("swipeLeft", () => {
  console.log("swipe left");
});

swipeArea.addEventListener("swipeRight", () => {
  console.log("swipe right");
});
```

## Configuration options

```typescript
const SwipeEventListener: (
  customOptions: Options
) => {
  swipeArea: HTMLElement;
  updateOptions: (newOptions: Options) => void;
};
```

| Option               | Required | Type        | Default   | Description                                                                                                  |
| -------------------- | -------- | ----------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| swipeArea            | **yes**  | HTMLElement | undefined | The container where the swipe event can take place.                                                          |
| swipeSensitivity     | no       | number      | 80        | Swipe sensitivity in pixels. Across how many pixels does the cursor need to move to trigger the swipe event. |
| isSwipeUpDesired     | no       | boolean     | yes       | Enable swipeUp event.                                                                                        |
| isSwipeDownDesired   | no       | boolean     | yes       | Enable swipeDown event.                                                                                      |
| isSwipeLeftDesired   | no       | boolean     | yes       | Enable swipeLeft event.                                                                                      |
| isSwipeRightDesired  | no       | boolean     | yes       | Enable swipeRight event.                                                                                     |
| listenForMouseEvents | no       | boolean     | yes       | Enable swipe event using mouse event.                                                                        |
| listenForTouchEvents | no       | boolean     | yes       | Enable swipe event using touch events (used for mobile).                                                     |

## Returned values

```typescript
const SwipeEventListener: (
  customOptions: Options
) => {
  swipeArea: HTMLElement;
  updateOptions: (newOptions: Options) => void;
};
```

- **swipeArea** - the same HTMLElement passed as argument
- **updateOptions** - used to update all the options listed above

## Typescript ready

Types are included and are available for importation.

`swipe-event-listener.d.ts`

```typescript
export interface Options {
  swipeSensitivity: number;
  isSwipeUpDesired: boolean;
  isSwipeDownDesired: boolean;
  isSwipeLeftDesired: boolean;
  isSwipeRightDesired: boolean;
  listenForTouchEvents: boolean;
  listenForMouseEvents: boolean;
  swipeArea: HTMLElement;
}
export declare enum CustomSwipeEvents {
  swipeUp = "swipeUp",
  swipeDown = "swipeDown",
  swipeLeft = "swipeLeft",
  swipeRight = "swipeRight",
}
export declare const SwipeEventListener: (
  customOptions: Options
) => {
  swipeArea: HTMLElement;
  updateOptions: (newOptions: Options) => void;
};
```

## Authors

- Stan Georgian - https://georgianstan.ro

## License

This project is licensed under the MIT License
