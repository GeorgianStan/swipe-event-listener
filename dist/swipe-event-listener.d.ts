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
export declare enum CustomSwipeEvents {
    swipeUp = "swipeUp",
    swipeDown = "swipeDown",
    swipeLeft = "swipeLeft",
    swipeRight = "swipeRight"
}
export declare const SwipeEventListener: (customOptions: Options) => {
    swipeArea: HTMLElement;
    updateOptions: (newOptions: Options) => void;
};
