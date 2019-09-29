interface RippleEventHandler {
  pointerDown: EventListener;
  pointerUp: EventListener;
  pointerOut: EventListener;
  animationEnd: EventListener;
}

class Ripple {
  private node: HTMLElement;
  private ripple: HTMLDivElement;

  private eventHandler: RippleEventHandler = {
    pointerDown: (e: PointerEvent) => this.rippleStart(e),
    pointerUp: () => this.pointerUp(),
    pointerOut: () => this.pointerOut(),
    animationEnd: (e: AnimationEvent) => this.animationEnd(e)
  };

  constructor(node: HTMLElement) {
    this.node = node;

    this.ripple = document.createElement('div');
    this.ripple.classList.add('pmd-ripple-x');

    this.node.appendChild(this.ripple);

    this.node.addEventListener('pointerdown', this.eventHandler.pointerDown, { passive: true });
    this.node.addEventListener('pointerup', this.eventHandler.pointerUp, { passive: true });
    this.node.addEventListener('pointerout', this.eventHandler.pointerOut, { passive: true });
    this.node.addEventListener('animationend', this.eventHandler.animationEnd, { passive: true });
  }

  rippleStart(e: PointerEvent): void {}

  rippleEnd(): void {}

  pointerUp(): void {}

  pointerOut(): void {}

  animationEnd(e: AnimationEvent): void {}
}

export { Ripple };
