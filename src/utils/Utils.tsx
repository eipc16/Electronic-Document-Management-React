export function hasUpperCase(text: string): boolean {
    return text.toLowerCase() !== text
}

export function hasLowerCase(text: string): boolean {
    return text.toUpperCase() !== text
}

export function longerThan(text: string, limit: Number, inclusive?: boolean): boolean {
    if(inclusive) {
        return text.length >= limit
    }

    return text.length > limit
}