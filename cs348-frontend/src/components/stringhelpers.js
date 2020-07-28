export const  multiStringListify = (strings, conj) => {
    let result = "";
    if (strings.length === 0) return "";
    if (strings.length === 1) return strings[0];
    if (strings.length === 2) return strings[0] + " " + conj + " " + strings[1];
    else {
        for (let i = 0; i < strings.length -1; i++) {
            result += strings[i] + ', ';
        }
        result += conj + " " + strings[strings.length-1]
    }
    return result;
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }