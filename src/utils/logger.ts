import { Console } from 'console';
import { createWriteStream } from 'fs';
import * as path from 'path';

import { isDevMode } from './env';

const stdout = createWriteStream(path.resolve(__dirname, '../../logs/stdout.log'), { flags: 'a+' })
const stderr = createWriteStream(path.resolve(__dirname, '../../logs/stderr.log'), { flags: 'a+' })

const logger = new Console({ stdout, stderr });

if (isDevMode()) {
  const clog = logger.log;
  logger.log = (...args: any) => {
    console.log(...args);
    clog(...args);
  }
  const cerror = logger.error;
  logger.error = (...args: any) => {
    cerror(...args);
    console.error(...args);
  }
}

process.on('beforeExit', () => {
  stdout.destroy();
  stderr.destroy();
})

export default logger;
