import React, {ReactElement} from 'react';

declare global {
  function isReactFragment(child: ReactElement): boolean;
  function removeReactFragment(el: ReactNode): ReactNode;
}

globalThis.isReactFragment = (child) => {
  try {
    return child.type.toString() === React.Fragment.toString();
  } catch (e) {
    return false;
  }
};

globalThis.removeReactFragment = (el) => {
  if (Array.isArray(el)) {
    return el.map((child) => {
      if (React.isValidElement(child)) {
        return removeReactFragment(child);
      } else {
        return child;
      }
    });
  } else if (React.isValidElement(el)) {
    if (isReactFragment(el)) {
      const children: ReactElement | ReactElement[] = el.props.children;
      if (children) {
        return removeReactFragment(children);
      } else {
        return children;
      }
    } else {
      return el;
    }
  } else {
    return el;
  }
};
