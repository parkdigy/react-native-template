export interface LineProps
  extends PartialPick<
    ViewProps,
    'width' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginHorizontal' | 'marginVertical'
  > {
  height?: ViewProps['borderTopWidth'];
  color?: ViewProps['borderTopColor'];
  style?: ViewProps['style'];
}
