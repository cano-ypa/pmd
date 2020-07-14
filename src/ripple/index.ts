import { RippleEventListener } from "./type";
import { RippleAdapter } from "./adapter";

class Ripple {
  private adapter: RippleAdapter;
  private ripple: HTMLDivElement;

  private listener: RippleEventListener;

  private isAnimationEnd: boolean = false;
  private isPress: boolean = false;
  private isOver: boolean = false;

  constructor(adapter: Partial<RippleAdapter>) {
    this.adapter = { ...Ripple.defaultAdapter, ...adapter };

    this.listener = {
      pointerDown: (event: PointerEvent) => this.pointerDown(event),
      keyboardDown: (event: KeyboardEvent) => this.keyboardDown(event),
      pointerUp: () => this.pointerUp(),
      pointerOut: () => this.pointerOut(),
      animationEnd: (event: AnimationEvent) => this.animationEnd(event),
    };

    this.ripple = document.createElement("div");
    this.ripple.classList.add("pmd-ripple-x");

    this.node.appendChild(this.ripple);

    this.node.addEventListener("pointerdown", this.listener.pointerDown, {
      passive: true,
    });
    this.node.addEventListener("keydown", this.listener.keyboardDown);
    this.node.addEventListener("pointerup", this.listener.pointerUp, {
      passive: true,
    });
    this.node.addEventListener("pointerout", this.listener.pointerOut, {
      passive: true,
    });
    this.node.addEventListener("animationend", this.listener.animationEnd, {
      passive: true,
    });
  }

  /**
   * Ripple をアクティブ化
   */
  active = (event: Event) => {
    const rect = this.adapter.getRect();

    const size = Math.sqrt(rect.width ** 2 + rect.height ** 2);

    this.adapter.setCssVariable(this.adapter.StyleNames.SIZE, `${size}px`);
    this.adapter.setCssVariable(
      this.adapter.StyleNames.ORIGIN,
      `${originX}px ${originY}px`
    );
    this.adapter.addClass(this.adapter.ClassNames.ACTIVE);
  };

  /**
   * Ripple の非アクティブ化を通知
   */
  deactive = () => {
    this.adapter.removeClass(this.adapter.ClassNames.DEACTIVE);
  };

  static defaultAdapter: RippleAdapter = {
    addClass: (_: string) => undefined,
    removeClass: (_: string) => undefined,
    setCssVariable: (_: string, __: string) => undefined,
    getRect: () => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
    }),

    StyleNames: {
      SIZE: "--pmd-ripple-size",
      ORIGIN: "--pmr-ripple-origin",
    },
    ClassNames: {
      ACTIVE: "pmd-ripple-active",
      DEACTIVE: "pmd-ripple-deactive",
    },
  };

  /* 以下廃止 */

  private activate(offsetX: number = 0, offsetY: number = 0): void {
    if (this.node.getAttribute("disabled") !== null) return;

    this.ripple.classList.remove("activate");
    this.ripple.classList.remove("deactivate");

    this.isAnimationEnd = false;

    const nodeRect = this.node.getBoundingClientRect();

    const rippleSize = Math.sqrt(
      Math.pow(nodeRect.width, 2) + Math.pow(nodeRect.height, 2)
    );
    const positionX = (this.node.offsetWidth - rippleSize) / 2;
    const positionY = (this.node.offsetHeight - rippleSize) / 2;
    const startX: number = positionX + (this.isUnbounded() ? 0 : offsetX);
    const startY: number = positionY + (this.isUnbounded() ? 0 : offsetY);

    this.ripple.style.setProperty("--size", `${rippleSize}px`);
    this.ripple.style.setProperty("--start-pos", `${startX}px,${startY}px`);
    this.ripple.style.setProperty("--end-pos", `${positionX}px,${positionY}px`);

    this.ripple.classList.add("activate");
  }

  private deactivate(): void {
    this.isAnimationEnd = false;
    this.isPress = false;
    this.isOver = false;

    this.ripple.classList.add("deactivate");
  }

  private checkRippleEnd() {
    if (this.isAnimationEnd && (!this.isPress || !this.isOver))
      this.deactivate();
  }

  private pointerDown(event: PointerEvent) {
    this.isPress = true;
    this.isOver = true;
    this.activate(
      event.offsetX - this.node.offsetWidth / 2,
      event.offsetY - this.node.offsetHeight / 2
    );
  }

  public isUnbounded(): boolean {
    return this.node.classList.contains("pmd-ripple--unbounded");
  }

  private keyboardDown(event: KeyboardEvent) {
    if (event.key === "Enter") this.activate(0, 0);
  }

  private pointerUp(): void {
    this.isPress = false;
    this.checkRippleEnd();
  }

  private pointerOut(): void {
    this.isOver = false;
    this.checkRippleEnd();
  }

  private animationEnd(e: AnimationEvent): void {
    if (e.animationName === "pmd-ripple-in") {
      this.isAnimationEnd = true;
      this.checkRippleEnd();
    } else if (e.animationName === "pmd-ripple-out") {
      this.ripple.classList.remove("activate");
      this.ripple.classList.remove("deactivate");
    }
  }
}

export { Ripple };
