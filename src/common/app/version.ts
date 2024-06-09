export const version = {
  /**
   * 버전을 비교할 수 있는 텍스트로 변경
   *
   * @param v 버전
   * @param vl 각 항목의 길이 (나머지는 0으로 채워짐) (v값이 1.2 일때, vl 값이 3=001.002, 4=0001.0002)
   * @param l 총 항목 수 (3=x.x.x, 5=x.x.x.x.x)
   */
  toString(v: string | number, vl: number, l: number): string {
    const va = v.toString().split('.');
    const vsa: string[] = [];
    for (let i = 0; i < l; i += 1) {
      if (va.length >= i + 1) {
        vsa.push(va[i].padStart(vl, '0'));
      } else {
        vsa.push(''.padStart(vl, '0'));
      }
    }
    return vsa.join('.');
  },
};

export default version;
