import { generateMetaAkar } from './akar.gen';
import { generateMetaPohon } from './pohon.gen';

const startTime = performance.now();

generateMetaAkar();
generateMetaPohon();

const endTime = performance.now();
console.log(`Meta generated in ${(endTime - startTime).toFixed(2)} ms`);
