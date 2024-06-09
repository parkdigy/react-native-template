import React from 'react';
import CustomComponent from '../CustomComponent';
import {StackProps as Props} from './Stack.types';

type ReactChildArray = ReturnType<typeof React.Children.toArray>;
function flattenChildren(children: Props['children'], keys: (string | number)[] = []): ReactChildArray {
  const childrenArray = React.Children.toArray(children);
  return childrenArray.reduce((flatChildren: ReactChildArray, child: any, index: number) => {
    if ((child as React.ReactElement).type === React.Fragment) {
      return flatChildren.concat(
        flattenChildren((child as React.ReactElement).props.children, keys.concat(child.key || index)),
      );
    }
    if (React.isValidElement(child)) {
      flatChildren.push(
        React.cloneElement(child, {
          key: keys.concat(String(child.key || index)).join('.'),
        }),
      );
    } else {
      flatChildren.push(child);
    }
    return flatChildren;
  }, []);
}

const Stack = ({
  children,
  spacing = 0,
  row,
  flexDirection,
  flexWrap,
  alignItems,
  justifyContent,
  wrap,
  useFlexGap,
  center,
  ...props
}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const childrenArray = useMemo(() => (children ? React.Children.toArray(flattenChildren(children)) : []), [children]);

  const finalChildrenArray = useMemo(
    () =>
      childrenArray.map((child: any, index: number) => {
        return (
          <React.Fragment key={child.key ?? `spaced-child-${index}`}>
            {child}
            {index < childrenArray.length - 1 && !useFlexGap && <View style={{width: spacing, height: spacing}} />}
          </React.Fragment>
        );
      }),
    [spacing, childrenArray, useFlexGap],
  );

  const finalFlexDirection = useMemo(() => flexDirection || (row ? 'row' : undefined), [flexDirection, row]);

  const finalFlexWrap = useMemo(() => flexWrap || (wrap ? 'wrap' : undefined), [flexWrap, wrap]);

  const finalGap = useMemo(() => (useFlexGap ? spacing : undefined), [useFlexGap, spacing]);

  const finalAlignItems = useMemo(
    () => alignItems || (finalFlexDirection === 'row' && center ? 'center' : undefined),
    [finalFlexDirection, alignItems, center],
  );

  const finalJustifyContent = useMemo(
    () => justifyContent || (finalFlexDirection !== 'row' && center ? 'center' : undefined),
    [finalFlexDirection, justifyContent, center],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <CustomComponent
      component={View}
      flexDirection={finalFlexDirection}
      flexWrap={finalFlexWrap}
      alignItems={finalAlignItems}
      justifyContent={finalJustifyContent}
      gap={finalGap}
      {...props}>
      {finalChildrenArray}
    </CustomComponent>
  );
};

export default Stack;
