class Ripple {
  private node: HTMLElement;
  private ripple: HTMLDivElement;

  private isAnimationEnd: Boolean = false;
  private isPointerUp: Boolean = false;
  private isPointerOut: Boolean = false;

  constructor(node: HTMLElement) {
    this.node = node;

    this.ripple = document.createElement('div');
    this.ripple.classList.add('pmd-ripple-x');

    this.node.appendChild(this.ripple);

    this.node.addEventListener('pointerdown', (event: PointerEvent) => this.rippleStart(event), { passive: true });
    this.node.addEventListener('pointerup', () => this.pointerUp(), { passive: true });
    this.node.addEventListener('pointerout', () => this.pointerOut(), { passive: true });
    this.node.addEventListener('animationend', (event: AnimationEvent) => this.animationEnd(event), { passive: true });
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

  rippleEnd(): void {
    this.isAnimationEnd = false;
    this.isPointerUp = false;
    this.isPointerOut = false;

    this.ripple.classList.add('deactivate');
  }

  checkRippleEnd() {
    if (this.isAnimationEnd && (this.isPointerUp || this.isPointerOut)) this.rippleEnd();
  }

  pointerUp(): void {
    this.isPointerUp = true;
    this.checkRippleEnd();
  }

  pointerOut(): void {
    this.isPointerOut = true;
    this.checkRippleEnd();
  }

  animationEnd(e: AnimationEvent): void {
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
