export default {
  // 배열에서 랜덤한 인덱스를 반환
  arrayIndex(array: any[]): number {
    return Math.floor(Math.random() * array.length);
  },
};
