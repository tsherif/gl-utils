module.exports = function(grunt) {
  "use strict";
  
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    licence: grunt.file.read("LICENSE"),
    uglify: {
      options: {
        banner: "/*\nglUtils v<%= pkg.version %> \n\n<%= licence %>*/\n",
        preserveComments: "some"
      },
      build: {
        src: [
          "src/gl-utils.js",
        ],
        dest: "build/<%= pkg.name %>.min.js"
      }
    },
    jshint: {
      options: {
        eqeqeq: true,
        undef: true,
        unused: true,
        strict: true,
        indent: 2,
        immed: true,
        latedef: "nofunc",
        newcap: true,
        nonew: true,
        trailing: true
      },
      grunt: {
        options: {
          node: true
        },
        src: "Gruntfile.js"
      },
      src: {
        options: {
          browser: true,
          devel: true,
          globals: {
            glUtils: true
          }
        },
        src: "src/*.js",
      },
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("lint", ["jshint"]);

  grunt.registerTask("default", ["jshint", "uglify"]);
};