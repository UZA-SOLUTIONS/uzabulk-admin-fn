export const isUrl=(str)=> {
    // str exists
    if (typeof str !== "string" || str.length < 3) {
      return false
    }
    // Only contains letters numbers and '.', '-'
    if (/^[a-zA-Z0-9.-]*$/.test(str) === false) {
      return false
    }
    // Contains one '.'
    if (!str.includes(".")) {
      return false
    }
    // can't start or end with '.' or '-'
    if (
      str[0] === "." ||
      str[0] === "-" ||
      str[str.length - 1] === "." ||
      str[str.length - 1] === "-"
    ) {
      return false
    }
    // can't have these either
    if (str.includes(".-") || str.includes("-.")) {
      return false
    }
  
    return true
  }
  