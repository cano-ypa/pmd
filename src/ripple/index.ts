import { RippleEventListener } from './type';

class Ripple {
  private node: HTMLElement;
  private ripple: HTMLDivElement;

  private listener: RippleEventListener;

  private isAnimationEnd: Boolean = false;
  private isPointerUp: Boolean = false;
  private isPointerOut: Boolean = false;

  constructor(node: HTMLElement) {
    this.node = node;

    this.listener = {
      pointerDown: (event: PointerEvent) => this.activate(event),
      pointerUp: () => this.pointerUp(),
      pointerOut: () => this.pointerOut(),
      animationEnd: (event: AnimationEvent) => this.animationEnd(event)
    };

    this.ripple = document.createElement('div');
    this.ripple.classList.add('pmd-ripple-x');

    this.node.appendChild(this.ripple);

    this.node.addEventListener('pointerdown', this.listener.pointerDown, { passive: true });
    this.node.addEventListener('pointerup', this.listener.pointerUp, { passive: true });
    this.node.addEventListener('pointerout', this.listener.pointerOut, { passive: true });
    this.node.addEventListener('animationend', this.listener.animationEnd, { passive: true });
  }

  private activate(event: PointerEvent): void {
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

  private deactivate(): void {
    this.isAnimationEnd = false;
    this.isPointerUp = false;
    this.isPointerOut = false;

    this.ripple.classList.add('deactivate');
  }

  private checkRippleEnd() {
    if (this.isAnimationEnd && (this.isPointerUp || this.isPointerOut)) this.deactivate();
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
