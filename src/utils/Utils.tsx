export function hasUpperCase(text: string): boolean {
  return text.toLowerCase() !== text;
}

export function hasLowerCase(text: string): boolean {
  return text.toUpperCase() !== text;
}

export function longerThan(
  text: string,
  limit: number,
  inclusive?: boolean
): boolean {
  if (inclusive) {
    return text.length >= limit;
  }

  return text.length > limit;
}

/* Looking for better solution */
export function dateAfter(testedDate: Date, baseDate: Date) {
  if(testedDate.getFullYear() > baseDate.getFullYear()) {
    return true;
  } else if(testedDate.getFullYear() === baseDate.getFullYear()) {
    if(testedDate.getMonth() > baseDate.getMonth()) {
      return true;
    } else if(testedDate.getMonth() === baseDate.getMonth()) {
      if(testedDate.getDate() > baseDate.getDate()) {
        return true;
      }
    }
  }

  return false;
}

export function existsAndNotNull(object: any) {
  return object !== undefined && object !== null
}