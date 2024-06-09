const replaceTextExt = (text, startText, findText, endText, replaceText) => {
  let newText = text;

  let end = 0;
  do {
    const start = newText.indexOf(startText, end);
    if (start === -1) {
      break;
    }

    const find = findText === '' ? start + startText.length : newText.indexOf(findText, start + startText.length);
    if (find === -1) {
      break;
    }

    end = newText.indexOf(endText, find + findText.length);
    if (end === -1) {
      break;
    }

    newText = newText.substring(0, find) + replaceText + newText.substring(end);
  } while (true);

  return newText;
}

module.exports = replaceTextExt;
