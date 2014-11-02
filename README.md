glUtils
========

glUtils is a bare-bones WebGL library abscracting away the more common boilerplate WebGL code,
while still allowing one to use the API directly.

glUtils was used in some of [my WebGL experiments](http://tareksherif.ca/#experiments).

Usage
------

The WebGL context is acquired using `glUtils.getGL()`, passing a canvas element to it as argument (it is assumed the canvas has already had its width and height set):

```JavaScript
  var gl = glUtils.getGL(document.getElementById("webgl"));
```

A program is set up using `glUtils.getProgram()` and passing it the WebGL context, and the ids of elements
in the page containing the vertex and fragment shader code:

```JavaScript
  var program = glUtils.getGL(gl, "vertex-shader", "fragment-shader");
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

Finally, `glUtils` contains two utility methods for creating the geometry of basic shapes:

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
`texture_coords` containing the texture coordinates.
