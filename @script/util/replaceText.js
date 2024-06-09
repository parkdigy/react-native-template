const replaceText = (text, findText, replaceText) => {
  let newText = text;

  let end = 0;
  do {
    const start = newText.indexOf(findText, end);
    if (start === -1) {
      break;
    }

    end = start + findText.length;

    newText = newText.substring(0, start) + replaceText + newText.substring(end);

    end = start + replaceText.length;
  } while (true);

  return newText;
}

module.exports = replaceText;
