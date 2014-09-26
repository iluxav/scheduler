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
                    "dist/templates.js",
                    "customResources/**/jquery*.js",
                    "config/*.js",
                    "services/utilsService.js",
                    "services/dataService.js",
                    "board/*.js",
                    "eventInfo/*.js",
                    "newEvent/*.js"
                ],
                // the location of the resulting JS file
                dest: 'dist/scheduler.all.js'
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                dest: "dist/scheduler.all.min.css",
                src: [
                    "customResources/**/jquery*.css",
                    "css/*.css"

                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/scheduler.all.min.js': ['<%= concat.dist.src %>']
                }
            }
        },
        html2js: {
            options: {
                // custom options, see below
            },
            main: {
                src: ['**/*View.html'],
                dest: 'dist/templates.js'
            }
        }

    });
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['html2js','concat','concat_css','uglify']);
}
