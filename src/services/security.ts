import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || '123';

export function createJWT(payload: Record<string, unknown>): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        reject(err);
      } if (!token) {
        reject(new Error('failed to create token'));
      } else {
        resolve(token);
      }
    });
  });
}

export function verifyJWT<T>(token: string): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolve(decoded as any);
      }
    });
  });
}
