import SystemNavigationBar from 'react-native-system-navigation-bar';

let _lastColor: string | number | undefined;
let _lastStyle: 'light' | 'dark' | undefined;

const _history: {color: string | number; style?: 'light' | 'dark'}[] = [];

export default {
  fullScreen(fullScreen: boolean, style?: 'light' | 'dark') {
    SystemNavigationBar.setFitsSystemWindows(!fullScreen).then(() => {});
    if (style) {
      SystemNavigationBar.setBarMode(style, 'navigation').then(() => {});
    }
  },
  set(color: string | number, style?: 'light' | 'dark') {
    if (_lastColor !== undefined) {
      _history.push({color: _lastColor, style: _lastStyle});
    }
    _lastColor = color;
    _lastStyle = style;
    SystemNavigationBar.setNavigationColor(color, style, 'navigation').then(() => {});
  },
  translucent() {
    this.set('translucent');
  },
  restore() {
    if (_history.length > 0) {
      const info = _history.pop();
      if (info) {
        _lastColor = info.color;
        _lastStyle = info.style;
        SystemNavigationBar.setNavigationColor(info.color, info.style, 'navigation').then(() => {});
      }
    }
  },
};
