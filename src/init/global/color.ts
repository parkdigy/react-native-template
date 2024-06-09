declare global {
  function rgbToHex(r: number, g: number, b: number): string;
  function lighten(color: string, percent: number): string;
  function darken(color: string, percent: number): string;
}

globalThis.rgbToHex = (r: number, g: number, b: number): string => {
  return [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
};

globalThis.lighten = (color: string, percent: number): string => {
  let usePound = false;

  if (color[0] === '#') {
    color = color.slice(1);
    usePound = true;
  } else if (color.startsWith('rgb') && color.includes('(') && color.includes(')') && color.includes(',')) {
    const colors = color.split('(')[1].split(')')[0].split(',');
    if (colors.length >= 3) {
      color = globalThis.rgbToHex(Number(colors[0]), Number(colors[1]), Number(colors[2]));
      usePound = true;
    }
  }

  const num = parseInt(color, 16);
  const val = (255 / 100) * percent;

  // eslint-disable-next-line no-bitwise
  let r = (num >> 16) + val;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  // eslint-disable-next-line no-bitwise
  let b = ((num >> 8) & 0x00ff) + val;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  // eslint-disable-next-line no-bitwise
  let g = (num & 0x0000ff) + val;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  // return `${usePound ? '#' : ''}${r.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${g
  //   .toString(16)
  //   .padStart(2, '0')}`;

  // eslint-disable-next-line no-bitwise
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
};

globalThis.darken = (color: string, percent: number): string => {
  return globalThis.lighten(color, -percent);
};

export {};
