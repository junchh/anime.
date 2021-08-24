export const formatDescription = (input: string): string => {

  if(input === null) {
    return "...";
  }

  const maxCharacter = 300;

  const curString = input.replace(/(<([^>]+)>)/gi, "");

  const stringLength = curString.length;

  if(stringLength < maxCharacter + 1) {
    return curString + "...";
  }

  if(curString.charAt(maxCharacter) === " " || curString.charAt(maxCharacter) === ".") {
    return curString.substring(0, maxCharacter + 1) + "...";
  } else {
    let picked = maxCharacter;
    for(let i = maxCharacter - 1; i >= 0; i--) {
      if(curString.charAt(i) === " " || curString.charAt(i) === ".") {
        picked = i;
        break;
      }
    }

    return curString.substring(0, picked + 1) + "...";
  }
};