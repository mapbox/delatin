# delatin [![Vlad's projects](https://img.shields.io/badge/simply-awesome-brightgreen.svg)](https://github.com/mourner/projects)

A fast JavaScript **3D terrain mesh** generation tool. Approximates a height field with a Delaunay triangulation, minimizing the amount of points and triangles for a given maximum error.

Delatin is a port of Michael Fogleman's [*hmm*](https://github.com/fogleman/hmm) (C++), which is in turn based on the paper [Fast Polygonal Approximation of Terrains and Height Fields (1995)](http://mgarland.org/files/papers/scape.pdf) by Michael Garland and Paul Heckbert.

## [Live Demo](https://mapbox.github.io/delatin/)

[![](delatin.png)](https://mapbox.github.io/delatin/)

## Example

```js
import Delatin from 'delatin';

const tin = new Delatin(heightValues, width, height);

tin.run(0.3); // run mesh refinement until max error is less than 0.3
const {coords, triangles} = tin; // get vertices and triangles of the mesh
````

## API

#### `new Delatin(heightValues, width, height)`

Creates a new Delatin instance given a height field in the form of a flat array of numbers (with `width * height` length).

#### `tin.run(maxError = 1)`

Performs mesh refinement until maximum error reaches below the given `maxError`. You can do this multiple times with successively smaller `maxError`.

#### `tin.refine()`

Runs a single iteration of mesh refinement, adding a single point to the mesh. Useful when generating the mesh with custom stop conditions (e.g. maximum number of points or triangles).

#### `tin.getMaxError()`

Returns the current maximum error of the mesh, defined by the maximum vertical distance between a point in the original height field and its triangular approximation.

#### `tin.getRMSD()`

Returns the current [root-mean-square deviation](https://en.wikipedia.org/wiki/Root-mean-square_deviation) of the mesh.

#### `tin.heightAt(x, y)`

Returns the height value at a given position, with `x`, `y` being integer coordinates that reference the original height field.

#### `tin.coords`

After running mesh refinement, this will be an array of `x, y` vertex coordinates of the final mesh (note: without `z`, but you can use `tin.heightAt(x, y)` to get the height for each vertex).

#### `tin.triangles`

After running mesh refinement, this will be an an array of triangle indices of the final mesh. Each triple of numbers defines a triangle and references vertices in the `tin.coords` array.

## Install

Run `npm install delatin` or `yarn add delatin`. Delatin is exposed as a ES module, so you can use it like this in modern browsers:

```html
<script type="module">
import Delatin from 'https://unpkg.com/delatin';
```

To use ES modules in Node, either use [esm](https://github.com/standard-things/esm) (`node -r esm app.js`), or `node --experimental-modules app.js` for Node v12+.
