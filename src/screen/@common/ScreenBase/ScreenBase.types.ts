import React from 'react';
import {ScreenProps} from '@types';
import {SafeAreaViewProps} from '@ccomp';

type ExtractProps<TComponentOrTProps> =
  TComponentOrTProps extends React.ComponentType<infer TProps> ? TProps : TComponentOrTProps;

export interface ScreenBaseProps<C extends React.ComponentType<any>, CP = Omit<ExtractProps<C>, 'navigation' | 'route'>>
  extends ScreenProps {
  component: C;
  componentProps?: CP;
  safeArea?: boolean; // SafeAreaView 컴포넌트 사용 여부
  topEdgeSafeArea?: boolean; // SafeAreaView 컴포넌트의 edges 속성에 top 추가할지 여부
  bottomEdgeSafeArea?: boolean; // SafeAreaView 컴포넌트의 edges 속성에 bottom 추가할지 여부
  safeAreaViewProps?: SafeAreaViewProps; // SafeAreaView 컴포넌트의 props
  transparent?: boolean; // 배경색 투명 여부
}
