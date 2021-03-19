module.exports = function(grunt) {

    grunt.initConfig({

        //pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n\n'
            },
            dist: {
                src: [
                    'public/js/Util.js',
                    'public/js/World.js',
                    'public/js/Behaviors.js',
                    'public/js/Body.js',
                    'public/js/ObjectManager.js',
                    'public/js/Integrators.js',
                    'public/js/Clock.js'
                ],
                dest: 'public/js/Physics.js'
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
};