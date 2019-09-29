class Ripple {
  private node: HTMLElement;
  private ripple: HTMLDivElement;

  constructor(node: HTMLElement) {
    this.node = node;

    this.ripple = document.createElement('div');
    this.ripple.classList.add('pmd-ripple-x');

    this.node.appendChild(this.ripple);
  }
}

export { Ripple };
