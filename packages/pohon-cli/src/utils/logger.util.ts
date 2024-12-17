import consola from 'consola';
import { highlighter } from './highlighter.util';

export const logger = {
  error(...args: Array<unknown>) {
    consola.log(highlighter.error(args.join(' ')));
  },
  warn(...args: Array<unknown>) {
    consola.log(highlighter.warn(args.join(' ')));
  },
  info(...args: Array<unknown>) {
    consola.log(highlighter.info(args.join(' ')));
  },
  success(...args: Array<unknown>) {
    consola.log(highlighter.success(args.join(' ')));
  },
  log(...args: Array<unknown>) {
    consola.log(args.join(' '));
  },
  break() {
    consola.log('');
  },
};
