import { createWriteStream } from 'node:fs';

export function stringifyJson(obj: any) {
  return JSON
    .stringify(obj, null, 2)
    // Nuxt content's MDC is picky with quotes so we need the triple slashes
    .replace(/\\"/g, '\'');
}

export function writeToJson(
  { filePath, data }:
  { filePath: string; data: any },
): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(filePath);
    stream.on('error', reject);
    stream.on('finish', resolve);

    stream.write('{\n');

    const keys = Object.keys(data);

    Object.keys(data).forEach((key, index) => {
      stream.write(`  "${key}": ${stringifyJson(data[key])}`);
      if (index < keys.length - 1) {
        stream.write(',');
      }
      stream.write('\n');
    });

    stream.write('}\n');
  });
}
