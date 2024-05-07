export function useCleanNullFromString(inputString) {
    const cleanedString = inputString.replace(/null,/gi, '');
    return cleanedString;
}