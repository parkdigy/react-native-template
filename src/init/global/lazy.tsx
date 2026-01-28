import React, {type ComponentType} from 'react';

declare global {
  function LazyComponent<T extends ComponentType<any>>(
    component: React.LazyExoticComponent<T>,
    options?: {hideFallback?: boolean; fullScreen?: boolean},
  ): React.LazyExoticComponent<T>;
}

globalThis.LazyComponent = (Component, options) => {
  return (props: any) =>
    options?.fullScreen ? (
      <View flex={1} justifyContent='center'>
        <React.Suspense fallback={options?.hideFallback ? undefined : <ActivityIndicator />}>
          <Component {...props} />
        </React.Suspense>
      </View>
    ) : (
      <React.Suspense fallback={options?.hideFallback ? undefined : <ActivityIndicator />}>
        <Component {...props} />
      </React.Suspense>
    );
};
