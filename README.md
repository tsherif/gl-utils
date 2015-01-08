glUtils
========

glUtils is a bare-bones WebGL library abstracting away the more common boilerplate WebGL code,
while still allowing one to use the API directly.

Demonstrations of glUtils functionality can be found in the `examples` directory and in most of [my WebGL experiments](http://tareksherif.ca/#experiments).

Usage
------

The WebGL context is acquired using `glUtils.getGL()`, passing a canvas element to it as argument (it is assumed the canvas has already had its width and height set):

```JavaScript
  var gl = glUtils.getGL(document.getElementById("webgl"));
```

A program is set up using `glUtils.getProgram()` and passing it the WebGL context, and the ids of elements
in the page containing the vertex and fragment shader code:

```JavaScript
  var program = glUtils.getProgram(gl, "vertex-shader", "fragment-shader");
```

Any errors in the compilation or linking will be printed to the console.

References to shader attributes and uniforms can be acquired using `glUtils.getGLVars()`:

```JavaScript
  var gl_vars = glUtils.getGLVars(gl, program, {
    attributes: ["aPosition", "aColor"],
    uniforms: ["uMVP"]
  });
```

`glUtils.getGLVars()` returns an object containing the variable names as keys and their references
as values, e.g. `gl_vars.aPosition`, `gl_vars.uMVP`.

Attribute buffers can be prepared using `glUtils.setBuffer()`, passing the WebGL context, 
attribute reference, data and item size as arguments. The created buffer object is returned:

```JavaScript
  var position_buffer = glUtils.setBuffer(gl, gl_vars.aPosition, vertices, 3);
```

When switching between programs, it might be necessary to rebind buffer objects, 
and this can be done using `glUtils.enableBuffer()`, passing the WebGL context, 
attribute reference, buffer object and item size as arguments:

```JavaScript
  glUtils.enableBuffer(gl, gl_vars.aPosition, position_buffer, 3);
```

Textures can be loaded using `glUtils.loadTexture()`, which takes the WebGL
context, texture unit and image object as arguments:

```JavaScript
  glUtils.loadTexture(gl, gl.TEXTURE0, texture_image);
````

`glUtils.loadTexture()` defaults to common options for filtering and wrap modes. These can be overridden by passing it additional options:

```JavaScript
  glUtils.loadTexture(gl, gl.TEXTURE0, texture_image, {
    min_filter: gl.LINEAR,
    mag_filter: gl.LINEAR,
    wrap_s: gl.CLAMP_TO_EDGE,
    wrap_t: gl.CLAMP_TO_EDGE
  });
````

`glUtils` also provides two utility methods for creating the geometry of basic shapes:

```JavaScript
  var sphere = glUtils.createSphere({
    long_bands: 32,
    lat_bands: 32,
    radius: 1
  });

  var box = glUtils.createBox({
    dimensions: [1, 2, 1]
  });
```

Both return objects containing properties `vertices`, the vertex positions, `normals`, the vertex normals, and
`texture_coords`, the texture coordinates.

Math Modules
------------

glUtils provides two modules, `glUtils.vec3` and `glUtils.mat4`, to help with common mathematical operations on the typed arrays used by WebGL. The API for these modules is heavily influenced by [gl-matrix](http://glmatrix.net/).

`glUtils.vec3` provides the following functions:

- `vec3.create(x, y, z)`: create a `vec3` (a 3-element `Float32Array`). Elements will default to 0. 
- `vec3.copy(v1, v2)`: copy elements of `v2` into `v1`.
- `vec3.clone(v)`: create a clone of `v`.
- `vec3.length(v)`: calculate the length of vector `v`.
- `vec3.scale(v, s)`: scale vector `v` by a factor of `s`.
- `vec3.normalize(v)`: normalize vector `v`.
- `vec3.add(out, v1, v2)`: add vectors `v1` and `v2`, store result in `out`.
- `vec3.sub(out, v1, v2)`: subtract vector `v2` from vector `v1`, store result in `out`.
- `vec3.dot(v1, v2)`: calculate the dot product of vectors `v1` and `v2`.
- `vec3.cross(out, v1, v2)`: calculate the cross product of vectors `v1` and `v2`, store result in `out`.
- `vec3.applyMat4(out, m, v, vector_transform)`: apply transformation represented by matrix `m` to the vector or point represented by `v`, store result in `out`. If `vector_transform` is set to `true`, the multiplication will occur as if `v` had a fourth element set to `0`. Otherwise, it will occur as if `v` had a fourth element set to `1`. The matrix `m` is represented by a 16-element array in column-major order.
- `vec3.random()`: create a `vec3` with elements set to random numbers between 0 and 1.


`glUtils.mat4` provides the following functions:

- `mat4.create(m0, m1, m2...)`: create a `mat4` (a 16-element `Float32Array` in column-major order). Elements will default to elements of the identity matrix. 
- `mat4.copy(m1, m2)`: copy elements of `m2` into `m1`.
- `mat4.clone(m)`: create a clone of `m`.
- `mat4.identity(m)`: set `m` to the identity matrix.
- `mat4.translation(m, x, y, z)`: set `m` to a matrix that translates points by `(x, y, z)`.
- `mat4.scaling(m, x, y, z)`: set `m` to a matrix that scales points or vectors by `(x, y, z)`. If only one scaling factor is given, it will be used for all three axes.
- `mat4.rotationX(m, theta)`: set `m` to a matrix that rotates points or vectors around the x-axis by `theta` radians.
- `mat4.rotationY(m, theta)`: set `m` to a matrix that rotates points or vectors around the y-axis by `theta` radians.
- `mat4.rotationZ(m, theta)`: set `m` to a matrix that rotates points or vectors around the z-axis by `theta` radians.
- `mat4.mult(out, m1, m2)`: multiply matrices `m1` and `m2`, store result in `out`.
- `mat4.transpose(m)`: find the transpose of `m` (occurs in-place).
- `mat4.det(m)`: calculate the determinant of `m`.
- `mat4.invert(m)`: find the inverse of `m` (occurs in-place).
- `mat4.lookAt(m, eye, at, up)`: set `m` to a view matrix for a camera described by the point `eye`, and the vectors `at` and `up` (all 3-element arrays).
- `mat4.ortho(m, left, right, bottom, top, near, far)`: set `m` to an orthographic projection matrix.
- `mat4.perspective(m, yfov, aspect, near, far)`: set `m` to a perspective projection matrix.
- `mat4.random()`: create a `mat4` with elements set to random numbers between 0 and 1.


