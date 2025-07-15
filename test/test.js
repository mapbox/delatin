
import fs from 'fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {PNG} from 'pngjs';
import Delatin from '../index.js';

const bayHills = getData('fixtures/14-2625-6369.png');

test('runs according to max error', () => {
    const {data, width, height} = bayHills;
    const tin = new Delatin(data, width, height);

    tin.run(10);

    assert.ok(tin.getMaxError() <= 10, 'max error within threshold');
    assert.equal(tin.coords.length / 2, 190, 'number of points');
    assert.equal(tin.triangles.length / 3, 348, 'number of triangles');
    assert.ok(Math.abs(tin.getRMSD() - 3.3) < 0.01, 'RMSD');

    tin.run(0.2);

    assert.ok(tin.getMaxError() <= 0.2, 'max error within threshold');
    assert.equal(tin.coords.length / 2, 16257, 'number of points');
    assert.equal(tin.triangles.length / 3, 32147, 'number of triangles');
    assert.ok(Math.abs(tin.getRMSD() - 0.072) < 0.001, 'RMSD');
});

function getData(fixturePath) {
    const {width, height, data} = PNG.sync.read(fs.readFileSync(new URL(fixturePath, import.meta.url)));

    const heights = new Float64Array(width * height);
    for (let i = 0; i < heights.length; i++) {
        const r = data[4 * i];
        const g = data[4 * i + 1];
        const b = data[4 * i + 2];
        heights[i] = Math.round(((r * 256 * 256 + g * 256.0 + b) / 10.0 - 10000.0) * 10) / 10;
    }

    return {data: heights, width, height};
}
