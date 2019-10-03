
import fs from 'fs';
import {PNG} from 'pngjs';
import Delatin from './index.js';

const {width, height, data} = PNG.sync.read(fs.readFileSync('test/fixtures/14-2625-6369.png'));

const heights = new Float64Array(width * height);

for (let i = 0; i < heights.length; i++) {
    const r = data[4 * i];
    const g = data[4 * i + 1];
    const b = data[4 * i + 2];
    heights[i] = Math.round(((r * 256 * 256 + g * 256.0 + b) / 10.0 - 10000.0) * 10) / 10;
}

const tin = new Delatin(heights, width, height);

console.time('tin');
tin.run(0.2);
console.timeEnd('tin');

console.log(`points: ${tin.coords.length >> 1}`);
console.log(`triangles: ${tin.triangles.length / 3}`);
