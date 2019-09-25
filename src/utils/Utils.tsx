export function hasUpperCase(text: string): boolean {
    return text.toLowerCase() != text
}

export function hasLowerCase(text: string): boolean {
    return text.toUpperCase() != text
}