export default {
  // 배열에서 랜덤한 인덱스를 반환
  arrayIndex(array: any[]): number {
    return Math.floor(Math.random() * array.length);
  },
  // 배열에서 랜덤한 아이템 반환
  arrayItem<T>(array: T[]): T {
    return array[this.arrayIndex(array)];
  },
};
