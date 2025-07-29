export default {
  splitLine(text: string) {
    const lines: string[] = [];

    text
      .split('\n')
      .filter((v) => v.trim() !== '')
      .forEach((line) => {
        line
          .replace(/\.\s/g, '.\n')
          .replace(/!\s/g, '!\n')
          .replace(/\?\s/g, '?\n')
          .split('\n')
          .forEach((line2) => {
            lines.push(line2.trim());
          });
      });

    return lines;
  },
};
