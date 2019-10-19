interface RippleEventListener {
  pointerDown: (event: PointerEvent) => void;
  keyboardDown: (event: KeyboardEvent) => void;
  pointerUp: () => void;
  pointerOut: () => void;
  animationEnd: (event: AnimationEvent) => void;
}

export { RippleEventListener };
