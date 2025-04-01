const ELLIPSIS = "...";

export function take(str: string, length: number): string {
  if (str.length >= length + ELLIPSIS.length) {
    return str.slice(0, length) + ELLIPSIS;
  }

  if (str.length > length) {
    return str.slice(0, length - 3) + ELLIPSIS;
  }

  return str;
}
