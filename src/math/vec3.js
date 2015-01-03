///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2014 Tarek Sherif
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///////////////////////////////////////////////////////////////////////////////////

(function() {
  "use strict";

  var temp = new Float32Array(3);

  var vec3 = glUtils.vec3 = {
    create: function() {
      var v = new Float32Array(3);
      var i;

      for (i = 0; i < 3; i++) {
        v[i] = arguments[i] === undefined ? 0 : arguments[i];
      }

      return v;
    },

    copy: function(v1, v2) {
      var i;

      for (i = 0; i < 3; i++) {
        v1[i] = v2[i];
      }
    },

    clone: function(v) {
      var clone = new Float32Array(3);
      
      vec3.copy(clone, v);

      return clone;
    },

    length: function(v) {
      var x = v[0];
      var y = v[1];
      var z = v[2];

      return Math.sqrt(x * x + y * y + z * z);
    },

    scale: function(v, s) {
      v[0] *= s;
      v[1] *= s;
      v[2] *= s;
    },

    normalize: function(v) {
      var l = vec3.length(v);
      var i;

      for (i = 0; i < 3; i++) {
        v[i] /= l;
      }      
    },

    add: function(out, v1, v2) {
      var i;

      for (i = 0; i < 3; i++) {
        out[i] = v1[i] + v2[i];
      } 
    },

    sub: function(out, v1, v2) {
      var i;

      for (i = 0; i < 3; i++) {
        out[i] = v1[i] - v2[i];
      } 
    },

    dot: function(v1, v2) {
      var d = 0; 
      var i;

      for (i = 0; i < 3; i++) {
        d += v1[i] * v2[i];
      }

      return d;
    },

    cross: function(out, v1, v2) {
      temp[0] = v1[1] * v2[2] - v1[2] * v2[1];
      temp[1] = v1[2] * v2[0] - v1[0] * v2[2];
      temp[2] = v1[0] * v2[1] - v1[1] * v2[0];

      vec3.copy(out, temp);
    },

    applyMat4: function(out, m, v, vector_transform) {
      var v3 = vector_transform ? 0 : 1;

      temp[0] = v[0] * m[0] + v[1] * m[4] + v[2] * m[8]  + v3 * m[12];
      temp[1] = v[0] * m[1] + v[1] * m[5] + v[2] * m[9]  + v3 * m[13];
      temp[2] = v[0] * m[2] + v[1] * m[6] + v[2] * m[10] + v3 * m[14];

      vec3.copy(out, temp);
    },

    random: function() {
      var v = new Float32Array(3);
      var i;

      for (i = 0; i < 3; i++) {
        v[i] = Math.random();
      }

      return v;
    }
  };

})();