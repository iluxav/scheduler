module.exports = function(grunt) { // 1
    grunt.initConfig({ // 2
        pkg: grunt.file.readJSON('package.json'), // 3
        options: {
            separator: ';'
        },
        concat:{
            dist: {
                // the files to concatenate
                src: [
                    "config/*.js",
                    "services/*.js",
                    "board/*.js",
                    "eventInfo/*.js"
                ],
                // the location of the resulting JS file
                dest: 'dist/global.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/global.min.js': ['<%= concat.dist.src %>']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat','uglify']);
}
