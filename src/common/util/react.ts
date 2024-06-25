import React, {ReactElement} from 'react';

export default {
  isFragment(child: ReactElement): boolean {
    try {
      return child.type.toString() === React.Fragment.toString();
    } catch (e) {
      return false;
    }
  },
  removeFragment(el: ReactNode): ReactNode {
    if (Array.isArray(el)) {
      return el.map((child) => {
        if (React.isValidElement(child)) {
          return this.removeFragment(child);
        } else {
          return child;
        }
      });
    } else if (React.isValidElement(el)) {
      if (this.isFragment(el)) {
        const children: ReactElement | ReactElement[] = el.props.children;
        if (children) {
          return this.removeFragment(children);
        } else {
          return children;
        }
      } else {
        return el;
      }
    } else {
      return el;
    }
  },
};
