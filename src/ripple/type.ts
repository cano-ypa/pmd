interface RippleEventListener {
  pointerDown: (event: PointerEvent) => void;
  pointerUp: () => void;
  pointerOut: () => void;
  animationEnd: (event: AnimationEvent) => void;
}

export { RippleEventListener };
