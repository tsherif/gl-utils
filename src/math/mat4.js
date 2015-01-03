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

  var identity = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);

  var temp = new Float32Array(16);

  var mat4 = glUtils.mat4 = {
    create: function() {
      var m = new Float32Array(16);
      var i;

      for (i = 0; i < 16; i++) {
        m[i] = arguments[i] === undefined ? identity[i] : arguments[i];
      }

      return m;
    },

    copy: function(m1, m2) {
      var i;

      for (i = 0; i < 16; i++) {
        m1[i] = m2[i];
      }
    },

    clone: function(m) {
      var clone = new Float32Array(16);

      mat4.copy(clone, m);

      return clone;
    },

    identity: function(m) {
      var i;

      for (i = 0; i < 16; i++) {
        m[i] = identity[i];
      }
    },

    translation: function(m, x, y, z) {
      m[0]  = 1;
      m[1]  = 0;
      m[2]  = 0;
      m[3]  = 0;

      m[4]  = 0;
      m[5]  = 1;
      m[6]  = 0;
      m[7]  = 0;

      m[8]  = 0;
      m[9]  = 0;
      m[10] = 1;
      m[11] = 0;

      m[12] = x;
      m[13] = y;
      m[14] = z;
      m[15] = 1;
    },

    scaling: function(m, x, y, z) {
      if (y === undefined && z === undefined) {
        y = z = x;
      }

      m[0]  = x;
      m[1]  = 0;
      m[2]  = 0;
      m[3]  = 0;

      m[4]  = 0;
      m[5]  = y;
      m[6]  = 0;
      m[7]  = 0;

      m[8]  = 0;
      m[9]  = 0;
      m[10] = z;
      m[11] = 0;

      m[12] = 0;
      m[13] = 0;
      m[14] = 0;
      m[15] = 1;
    },

    rotationX: function(m, theta) {
      var sin = Math.sin(theta);
      var cos = Math.cos(theta);

      m[0]  = 1;
      m[1]  = 0;
      m[2]  = 0;
      m[3]  = 0;

      m[4]  = 0;
      m[5]  = cos;
      m[6]  = sin;
      m[7]  = 0;

      m[8]  = 0;
      m[9]  = -sin;
      m[10] = cos;
      m[11] = 0;

      m[12] = 0;
      m[13] = 0;
      m[14] = 0;
      m[15] = 1;
    },

    rotationY: function(m, theta) {
      var sin = Math.sin(theta);
      var cos = Math.cos(theta);

      m[0]  = cos;
      m[1]  = 0;
      m[2]  = -sin;
      m[3]  = 0;

      m[4]  = 0;
      m[5]  = 1;
      m[6]  = 0;
      m[7]  = 0;

      m[8]  = sin;
      m[9]  = 0;
      m[10] = cos;
      m[11] = 0;

      m[12] = 0;
      m[13] = 0;
      m[14] = 0;
      m[15] = 1;
    },

    rotationZ: function(m, theta) {
      var sin = Math.sin(theta);
      var cos = Math.cos(theta);

      m[0]  = cos;
      m[1]  = sin;
      m[2]  = 0;
      m[3]  = 0;

      m[4]  = -sin;
      m[5]  = cos;
      m[6]  = 0;
      m[7]  = 0;

      m[8]  = 0;
      m[9]  = 0;
      m[10] = 1;
      m[11] = 0;

      m[12] = 0;
      m[13] = 0;
      m[14] = 0;
      m[15] = 1;
    },

    mult: function(result, m1, m2) {
      var row, col, i;
      var result_index, m1_index, m2_index;
      var val;

      for (col = 0; col < 4; col++) {
        for (row = 0; row < 4; row++) {
          result_index = col * 4 + row;
          val = 0;

          for (i = 0; i < 4; i++) {
            m1_index = i   * 4 + row;
            m2_index = col * 4 + i;

            val += m1[m1_index] * m2[m2_index];
          }

          temp[result_index] = val;
        } 
      }

      for (i = 0; i < 16; i++) {
        result[i] = temp[i];
      }
    },

    transpose: function(m) {
      var row, col;
      var index1, index2, tmp;

      for (col = 0; col < 4; col++) {
        for (row = col + 1; row < 4; row++) {

          index1 = col * 4 + row;
          index2 = row * 4 + col;
          tmp = m[index1];
          m[index1] = m[index2];
          m[index2] = tmp;

        }
      }
    },

    det: function(m) {
      var m0 = m[0];
      var m1 = m[1];
      var m2 = m[2];
      var m3 = m[3];
      var m4 = m[4];
      var m5 = m[5];
      var m6 = m[6];
      var m7 = m[7];
      var m8 = m[8];
      var m9 = m[9];
      var m10 = m[10];
      var m11 = m[11];
      var m12 = m[12];
      var m13 = m[13];
      var m14 = m[14];
      var m15 = m[15];

      return m0 * m5 * m10 * m15 +
             m0 * m9 * m14 * m7 +
             m0 * m13 * m6 * m11 +
             
             m4 * m1 * m14 * m11 +
             m4 * m9 * m2 * m15 +
             m4 * m13 * m10 * m3 +
             
             m8 * m1 * m6 * m15 +
             m8 * m5 * m14 * m3 +
             m8 * m13 * m2 * m7 +
             
             m12 * m1 * m10 * m7 +
             m12 * m5 * m2 * m11 +
             m12 * m9 * m6 * m3 -
             
             m0 * m5 * m14 * m11 -
             m0 * m9 * m6 * m15 -
             m0 * m13 * m10 * m7 -
             
             m4 * m1 * m10 * m15 -
             m4 * m9 * m14 * m3 -
             m4 * m13 * m2 * m11 -
             
             m8 * m1 * m14 * m7 -
             m8 * m5 * m2 * m15 -
             m8 * m13 * m6 * m3 -
             
             m12 * m1 * m6 * m11 -
             m12 * m5 * m10 * m3 -
             m12 * m9 * m2 * m7;

    },

    invert: function(m) {
      var m0 = m[0];
      var m1 = m[1];
      var m2 = m[2];
      var m3 = m[3];
      var m4 = m[4];
      var m5 = m[5];
      var m6 = m[6];
      var m7 = m[7];
      var m8 = m[8];
      var m9 = m[9];
      var m10 = m[10];
      var m11 = m[11];
      var m12 = m[12];
      var m13 = m[13];
      var m14 = m[14];
      var m15 = m[15];

      var det = mat4.det(m);

      var i;

      m[0] = m5  * m10 * m15 - 
             m5  * m11 * m14 - 
             m9  * m6  * m15 + 
             m9  * m7  * m14 +
             m13 * m6  * m11 - 
             m13 * m7  * m10;

      m[1] = -m1  * m10 * m15 + 
              m1  * m11 * m14 + 
              m9  * m2  * m15 - 
              m9  * m3  * m14 - 
              m13 * m2  * m11 + 
              m13 * m3  * m10;

      m[2] = m1  * m6 * m15 - 
             m1  * m7 * m14 - 
             m5  * m2 * m15 + 
             m5  * m3 * m14 + 
             m13 * m2 * m7  - 
             m13 * m3 * m6;

      m[3] = -m1 * m6 * m11 + 
              m1 * m7 * m10 + 
              m5 * m2 * m11 - 
              m5 * m3 * m10 - 
              m9 * m2 * m7  + 
              m9 * m3 * m6;

      m[4] = -m4  * m10 * m15 + 
              m4  * m11 * m14 + 
              m8  * m6  * m15 - 
              m8  * m7  * m14 - 
              m12 * m6  * m11 + 
              m12 * m7  * m10;

      m[5] = m0  * m10 * m15 - 
             m0  * m11 * m14 - 
             m8  * m2 * m15  + 
             m8  * m3 * m14  + 
             m12 * m2 * m11  - 
             m12 * m3 * m10;

      m[6] = -m0  * m6 * m15 + 
              m0  * m7 * m14 + 
              m4  * m2 * m15 - 
              m4  * m3 * m14 - 
              m12 * m2 * m7  + 
              m12 * m3 * m6;

      m[7] = m0 * m6 * m11 - 
             m0 * m7 * m10 - 
             m4 * m2 * m11 + 
             m4 * m3 * m10 + 
             m8 * m2 * m7 - 
             m8 * m3 * m6;

      m[8] = m4  * m9  * m15 - 
             m4  * m11 * m13 - 
             m8  * m5  * m15 + 
             m8  * m7  * m13 + 
             m12 * m5  * m11 - 
             m12 * m7  * m9;

      m[9] = -m0  * m9  * m15 + 
              m0  * m11 * m13 + 
              m8  * m1  * m15 - 
              m8  * m3  * m13 - 
              m12 * m1  * m11 + 
              m12 * m3  * m9;

      m[10] = m0  * m5 * m15 - 
              m0  * m7 * m13 - 
              m4  * m1 * m15 + 
              m4  * m3 * m13 + 
              m12 * m1 * m7  - 
              m12 * m3 * m5;

      m[11] = -m0 * m5 * m11 + 
               m0 * m7 * m9  + 
               m4 * m1 * m11 - 
               m4 * m3 * m9  - 
               m8 * m1 * m7  + 
               m8 * m3 * m5;

      m[12] = -m4  * m9  * m14 + 
               m4  * m10 * m13 +
               m8  * m5  * m14 - 
               m8  * m6  * m13 - 
               m12 * m5  * m10 + 
               m12 * m6  * m9;

      m[13] = m0  * m9  * m14 - 
              m0  * m10 * m13 - 
              m8  * m1  * m14 + 
              m8  * m2  * m13 + 
              m12 * m1  * m10 - 
              m12 * m2  * m9;

      m[14] = -m0  * m5 * m14 + 
               m0  * m6 * m13 + 
               m4  * m1 * m14 - 
               m4  * m2 * m13 - 
               m12 * m1 * m6  + 
               m12 * m2 * m5;

      m[15] = m0 * m5 * m10 - 
              m0 * m6 * m9  - 
              m4 * m1 * m10 + 
              m4 * m2 * m9  + 
              m8 * m1 * m6  - 
              m8 * m2 * m5;

      for (i = 0; i < 16; i++) {
        m[i] /= det;
      }
    },

    lookAt: function(m, eye, at, up) {
      var vec3 = glUtils.vec3;

      var xaxis = vec3.create();
      var yaxis = vec3.create();
      var zaxis = vec3.create();

      vec3.sub(zaxis, eye, at);
      vec3.normalize(zaxis);

      vec3.cross(xaxis, up, zaxis);
      vec3.normalize(xaxis);

      vec3.cross(yaxis, zaxis, xaxis);
      vec3.normalize(yaxis);

      m[0]  = xaxis[0];
      m[1]  = yaxis[0];
      m[2]  = zaxis[0];
      m[3]  = 0;

      m[4]  = xaxis[1];
      m[5]  = yaxis[1];
      m[6]  = zaxis[1];
      m[7]  = 0;

      m[8]  = xaxis[2];
      m[9]  = yaxis[2];
      m[10] = zaxis[2];
      m[11] = 0;

      m[12] = -vec3.dot(eye, xaxis);
      m[13] = -vec3.dot(eye, yaxis);
      m[14] = -vec3.dot(eye, zaxis);
      m[15] = 1;
    },

    ortho: function(m, left, right, bottom, top, near, far) {
      m[0]  = 2 / (right - left);
      m[1]  = 0;
      m[2]  = 0;
      m[3]  = 0;

      m[4]  = 0;
      m[5]  = 2 / (top - bottom);
      m[6]  = 0;
      m[7]  = 0;

      m[8]  = 0;
      m[9]  = 0;
      m[10] = -2 / (far - near);
      m[11] = 0;

      m[12] = - (right + left) / (right - left);
      m[13] = - (top + bottom) / (top - bottom);
      m[14] = - (far + near)   / (far - near);
      m[15] = 1;
    },

    perspective: function(m, yfov, aspect, near, far) {
      var top = near * Math.tan(yfov / 2);
      var right = top * aspect;

      m[0]  = near / right;
      m[1]  = 0;
      m[2]  = 0;
      m[3]  = 0;

      m[4]  = 0;
      m[5]  = near / top;
      m[6]  = 0;
      m[7]  = 0;

      m[8]  = 0;
      m[9]  = 0;
      m[10] = - (far + near) / (far - near);
      m[11] = -1;

      m[12] = 0;
      m[13] = 0;
      m[14] = -2 * far * near / (far - near);
      m[15] = 0;
    },

    random: function() {
      var m = new Float32Array(16);
      var i;

      for (i = 0; i < 16; i++) {
        m[i] = Math.random();
      }

      return m;
    }

  };

})();