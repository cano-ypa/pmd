export interface RippleAdapter {
  addClass: (className: string) => void;

  removeClass: (className: string) => void;

  setCssVariable: (styleName: string, value: string) => void;

  getRect: () => ClientRect;

  StyleNames: {
    SIZE: string;
    ORIGIN: string;
  };

  ClassNames: {
    ACTIVE: string;
    DEACTIVE: string;
  };
}
