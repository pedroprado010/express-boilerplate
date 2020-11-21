export function contentEquals<T = string>(
  ary1: T[],
  ary2: T[],
  cmp = (a: T, b:T) => a === b,
): boolean {
  if (ary1.length !== ary2.length) {
    return false;
  }
  return ary1.reduce<boolean>((acc, curr, index) => (acc && cmp(curr, ary2[index])), true);
}
