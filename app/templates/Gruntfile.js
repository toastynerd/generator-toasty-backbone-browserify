'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env: {
      options: {

      },
      dev: {
       NODE_ENV: 'development' 
      },
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },

    clean: {
      dev : {
        src: ['app/build/**/*']
      },
      prod: ['dist/**/*']
    },

    copy: {
      prod: {
        expand: true,
        cwd: 'app/src',
        src: ['css/*.css', '*.html', 'images/**/*'],
        dest: 'dist/',
        flatten: false,
        filter: 'isFile'
      },
      dev: {
        expand: true,
        cwd: 'app/src',
        src: ['css/*.css', '*.html', 'images/**/*'],
        dest: 'app/build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify: {
      prod: {
        src: ['app/src/js/*.js'],
        dest: 'dist/client.js',
        options: {
          transform: ['debowerify', 'hbsfy', 'uglifyify'],
          debug: false
        }
      },
      dev: {
        src: ['app/src/js/*.js'],
        dest: 'app/build/client.js',
        options: {
          transform: ['debowerify', 'hbsfy'],
          debug: true
        }
      }
    },

    express: {
      options: {
        //default overrides
      },
      prod: {
        options: {
          script: 'server.js',
        }
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },

    watch: {
      all: {
        files: ['server.js', './**/*.js'],
        tasks: ['jshint']
      },
      express: {
        files: ['server.js', 'app/src/**/*', 'api/**/*'],
        tasks: ['clean:dev', 'copy:dev', 'browserify:dev', 'express:dev'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'copy:dev', 'browserify:dev']);
  grunt.registerTask('server', ['env:dev', 'build:dev', 'express:dev', 'watch:express']);
}
