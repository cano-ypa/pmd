import { RippleEventListener } from './type';

class Ripple {
  private node: HTMLElement;
  private ripple: HTMLDivElement;

  private listener: RippleEventListener;

  private isAnimationEnd: boolean = false;
  private isPointerUp: boolean = false;
  private isPointerOut: boolean = false;

  constructor(node: HTMLElement) {
    this.node = node;

    this.listener = {
      pointerDown: (event: PointerEvent) => this.pointerDown(event),
      keyboardDown: (event: KeyboardEvent) => this.keyboardDown(event),
      pointerUp: () => this.pointerUp(),
      pointerOut: () => this.pointerOut(),
      animationEnd: (event: AnimationEvent) => this.animationEnd(event)
    };

    this.ripple = document.createElement('div');
    this.ripple.classList.add('pmd-ripple-x');

    this.node.appendChild(this.ripple);

    this.node.addEventListener('pointerdown', this.listener.pointerDown, { passive: true });
    this.node.addEventListener('keydown', this.listener.keyboardDown);
    this.node.addEventListener('pointerup', this.listener.pointerUp, { passive: true });
    this.node.addEventListener('pointerout', this.listener.pointerOut, { passive: true });
    this.node.addEventListener('animationend', this.listener.animationEnd, { passive: true });
  }

  private activate(offsetX: number = 0, offsetY: number = 0): void {
    this.ripple.classList.remove('activate');
    this.ripple.classList.remove('deactivate');

    this.isAnimationEnd = false;
    this.isPointerUp = false;
    this.isPointerOut = false;

    const nodeRect = this.node.getBoundingClientRect();
    const isUnbounded = this.node.classList.contains('pmd-ripple--unbounded');

    const rippleSize = Math.sqrt(Math.pow(nodeRect.width, 2) + Math.pow(nodeRect.height, 2));
    const startX: number = isUnbounded ? this.node.offsetWidth / 2 : offsetX;
    const startY: number = isUnbounded ? this.node.offsetHeight / 2 : offsetY;

    this.ripple.style.setProperty('--size', `${rippleSize}px`);
    this.ripple.style.setProperty('--start-pos', `${startX - rippleSize / 2}px,${startY - rippleSize / 2}px`);
    this.ripple.style.setProperty('--end-pos', `${(this.node.offsetWidth - rippleSize) / 2}px,${(this.node.offsetHeight - rippleSize) / 2}px`);

    this.ripple.classList.add('activate');
  }

  private deactivate(): void {
    this.isAnimationEnd = false;
    this.isPointerUp = false;
    this.isPointerOut = false;

    this.ripple.classList.add('deactivate');
  }

  private checkRippleEnd() {
    if (this.isAnimationEnd && (this.isPointerUp || this.isPointerOut)) this.deactivate();
  }

  private pointerDown(event: PointerEvent) {
    this.activate(event.offsetX, event.offsetY);
  }

  private keyboardDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.activate(0, 0);
    }
  }

  private pointerUp(): void {
    this.isPointerUp = true;
    this.checkRippleEnd();
  }

  private pointerOut(): void {
    this.isPointerOut = true;
    this.checkRippleEnd();
  }

  private animationEnd(e: AnimationEvent): void {
    if (e.animationName === 'pmd-ripple-in') {
      this.isAnimationEnd = true;
      this.checkRippleEnd();
    } else if (e.animationName === 'pmd-ripple-out') {
      this.ripple.classList.remove('activate');
      this.ripple.classList.remove('deactivate');
    }
  }
}

export { Ripple };
