import {Text_Accent} from '../../Text';
import TopContainerView from '../../View/TopContainerView';
import HomeTitleRight from '../HomeTitleRight';
import {type HomeTitleProps as Props} from './HomeTitle.types';
import {useAppState} from '@context';

const HomeTitle = ({children, right: initRight, inTopContainer, ...props}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const {toggleColorScheme} = useAppState();

  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  const right = useMemo(() => {
    return __DEV__
      ? ifUndefined(
          initRight,
          <IconButton name='contrast-outline' color='accent' marginRight={-3} onPress={toggleColorScheme} />,
        )
      : initRight;
  }, [initRight, toggleColorScheme]);

  const content = useMemo(
    () => (
      <Stack row center minHeight={53}>
        <View flex={1}>
          {typeof children === 'string' ? (
            <Text_Accent s={px.s18} lh={px.s30} ml={5} bold>
              {children}
            </Text_Accent>
          ) : (
            children
          )}
        </View>
        {right ? (
          <Stack row center spacing={5}>
            {right}
          </Stack>
        ) : (
          <HomeTitleRight />
        )}
      </Stack>
    ),
    [children, right],
  );

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return inTopContainer ? (
    <View {...props}>{content}</View>
  ) : (
    <TopContainerView inSafeArea show noAnimation {...props}>
      {content}
    </TopContainerView>
  );
};

export default HomeTitle;
