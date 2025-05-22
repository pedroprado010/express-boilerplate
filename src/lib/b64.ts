import { WithImplicitCoercion } from 'node:buffer';

export const b64Decode = (b64: string) => {
  return Buffer.from(b64, 'base64').toString('ascii');
};

export const b64Encode = (data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) => {
  return Buffer.from(data).toString('base64');
};