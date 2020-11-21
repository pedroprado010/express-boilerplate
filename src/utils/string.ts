import { createHash, HexBase64Latin1Encoding } from 'crypto';

export function capitalize(str: string) {
  return str.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

export function md5(str: string, encode: HexBase64Latin1Encoding = 'hex'): string {
  return createHash('md5')
    .update(str)
    .digest(encode);
}
