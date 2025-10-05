import { generateMetaAkar } from './akar.gen';

const startTime = performance.now();

generateMetaAkar();

const endTime = performance.now();
console.log(`Meta generated in ${(endTime - startTime).toFixed(2)} ms`);
