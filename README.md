# delatin

A fast JavaScript terrain mesh generation tool. Approximates a height field with a Delaunay triangulation, minimizing the amount of points and triangles for a given maximum error.

Delatin is a port of [hmm](https://github.com/fogleman/hmm) (C++), which is in turn based on a 1995 paper [Fast Polygonal Approximation of Terrains and Height Fields](http://mgarland.org/files/papers/scape.pdf) by Michael Garland and Paul Heckbert.

## Example

```js
const tin = new Delatin(heights, width, height);

tin.run(0.3); // run mesh refinement until max error is less than 0.3

// get vertex coordinates and triangles of the mesh
const {coords, triangles} = tin;
````
