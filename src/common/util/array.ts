export default {
  shuffle<T extends any[]>(arr: T): T {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 요소를 교환
    }
    return arr;
  },
};
