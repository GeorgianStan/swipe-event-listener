# Changelog

All notable changes to this project will be documented in this file.

## [v1.2.0](https://github.com/GeorgianStan/swipe-event-listener/compare/v1.0.0...v1.2.0) (2020-12-17)

---

### Chore

- toolchain updates and improvements
- cypress support
- projects structure updates
- updated documentation in accordance with the latest changes

### Typescript Support improvements

- an interface for `SwipeEventListener()` function's output was created

  ```typescript
  export const SwipeEventListener = (
    customOptions: Options
  ): SwipeEventListener
  ```

  ```typescript
  export interface SwipeEventListener {
    swipeArea: HTMLElement;
    updateOptions: (newOptions: Options) => void;
  }
  ```
