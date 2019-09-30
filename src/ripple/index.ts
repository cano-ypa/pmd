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
    pointerDown: (event: PointerEvent) => this.rippleStart(event),
    pointerUp: () => this.pointerUp(),
    pointerOut: () => this.pointerOut(),
    animationEnd: (event: AnimationEvent) => this.animationEnd(event)
  };

  private isAnimationEnd: Boolean = false;
  private isPointerUp: Boolean = false;
  private isPointerOut: Boolean = false;

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

  rippleStart(event: PointerEvent): void {
    this.ripple.classList.remove('activate');
    this.ripple.classList.remove('deactivate');

    this.isAnimationEnd = false;
    this.isPointerUp = false;
    this.isPointerOut = false;

    const nodeRect = this.node.getBoundingClientRect();
    const isUnbounded = this.node.classList.contains('pmd-ripple--unbounded');

    const rippleSize = Math.sqrt(Math.pow(nodeRect.width, 2) + Math.pow(nodeRect.height, 2));
    const offsetX: number = isUnbounded ? this.node.offsetWidth / 2 : event.offsetX;
    const offsetY: number = isUnbounded ? this.node.offsetHeight / 2 : event.offsetY;

    this.ripple.style.setProperty('--size', `${rippleSize}px`);
    this.ripple.style.setProperty('--start-pos', `${offsetX - rippleSize / 2}px,${offsetY - rippleSize / 2}px`);
    this.ripple.style.setProperty('--end-pos', `${(this.node.offsetWidth - rippleSize) / 2}px,${(this.node.offsetHeight - rippleSize) / 2}px`);

    this.ripple.classList.add('activate');
  }

  chenkRippleEnd() {
    if (this.isAnimationEnd && (this.isPointerUp || this.isPointerOut)) this.rippleEnd();
  }

  rippleEnd(): void {
    this.isAnimationEnd = false;
    this.isPointerUp = false;
    this.isPointerOut = false;

    this.ripple.classList.add('deactivate');
  }

  pointerUp(): void {
    this.isPointerUp = true;
    this.chenkRippleEnd();
  }

  pointerOut(): void {
    this.isPointerOut = true;
    this.chenkRippleEnd();
  }

  animationEnd(e: AnimationEvent): void {
    if (e.animationName === 'pmd-ripple-in') {
      this.isAnimationEnd = true;
      this.chenkRippleEnd();
    } else if (e.animationName === 'pmd-ripple-out') {
      this.ripple.classList.remove('activate');
      this.ripple.classList.remove('deactivate');
    }
  }
}

export { Ripple };
