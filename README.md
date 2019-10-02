# delatin

A fast JavaScript terrain mesh generation tool. Approximates a height field with a Delaunay triangulation, minimizing the amount of points and triangles for a given maximum error.

Delatin is a port of [hmm](https://github.com/fogleman/hmm) (C++), which is in turn based on a 1995 paper [Fast Polygonal Approximation of Terrains and Height Fields](http://mgarland.org/files/papers/scape.pdf) by Michael Garland and Paul Heckbert.

## [Live Demo](https://mapbox.github.io/delatin/)

## API

#### `new Delatin(heights, width, height)`

Creates a new Delatin instance given a height field in the form of a flat array of numbers (with `width * height` length).

#### `tin.run(maxError = 1)`

Performs mesh refinement until maximum error reaches below the given `maxError`. You can do this multiple times with successively smaller `maxError`.

#### `tin.getMaxError()`

Returns the current maximum error of the mesh, defined by the maximum vertical distance between a point in the original height field and its triangular approximation.

#### `tin.getRMSD()`

Returns the current [root-mean-square deviation](https://en.wikipedia.org/wiki/Root-mean-square_deviation) of the mesh.

#### `tin.heightAt(x, y)`

Returns the height value at position `x`, `y`.

#### `tin.coords`

After running mesh refinement, this will be an array of `x, y` vertex coordinates of the final mesh (note: without `z`, but you can use `tin.heightAt(x, y)` to get the height for each vertex).

#### `tin.triangles`

After running mesh refinement, this will be an an array of triangle indices of the final mesh. Each triple of numbers defines a triangle and references vertices in the `tin.coords` array.

## Example

```js
const tin = new Delatin(heights, width, height);

tin.run(0.3); // run mesh refinement until max error is less than 0.3

// get vertex coordinates and triangles of the mesh
const {coords, triangles} = tin;
````
