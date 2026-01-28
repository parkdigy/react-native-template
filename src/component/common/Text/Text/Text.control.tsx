import Text from './Text';

export const Text_Default = Text;

export const Text_Accent = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='accent' />;
};

export const Text_ExtraAccent = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='extraAccent' />;
};

export const Text_Error = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='error' />;
};

export const Text_Warning = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='warning' />;
};

export const Text_Primary = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='primary' />;
};

export const Text_Primary100 = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='primary100' />;
};

export const Text_Primary200 = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='primary200' />;
};

export const Text_Primary300 = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='primary300' />;
};

export const Text_Primary400 = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='primary400' />;
};

export const Text_PrimaryAccent = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='primaryAccent' />;
};

export const Text_Secondary = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='secondary' />;
};

export const Text_Right100 = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='right100' />;
};

export const Text_Right200 = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='right200' />;
};

export const Text_Success = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='success' />;
};

export const Text_White = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='white' />;
};

export const Text_Black = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='black' />;
};

export const Text_Gray = (props: Omit<TextProps, 'color' | 'c'>) => {
  return <Text {...props} c='gray' />;
};
