module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		host: typeof grunt.option('host') === 'string' ? grunt.option('host') : 'http://localhost:80',
		browserify:{
			options:{
				transform: [
					["babelify",{presets: ["es2015"],global:true}]
				]
			},
      specs:{
				src : ['node_modules/regenerator/runtime.js','tests/tests.js'],
				dest : 'dist/liveCodeEditorWidget/specs.js',
        options:{
          alias : {
            'openapp' : "./tests/roleSpaceMockup.js"
          }
        }
      },
			CAECode:{
				src : ['node_modules/regenerator/runtime.js','src/main.js'],
				dest : 'dist/liveCodeEditorWidget/main.dev.js',
        options:{
          alias : {
            'openapp' : "./src/lib/openapp.js"
          }
        }
			},
      CAELivePreview:{
        src: ["src/livePreview.js"],
        dest : 'dist/liveCodeEditorWidget/livePreview.dev.js',
        options:{
          alias : {
            'openapp' : "./src/lib/openapp.js"
          }
        }
      }
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/liveCodeEditorWidget/main.min.js' : ['dist/liveCodeEditorWidget/main.dev.js'],
					'dist/liveCodeEditorWidget/livePreview.min.js' : ['dist/liveCodeEditorWidget/livePreview.dev.js']
				}
			}
		},
		qunit:{
			all:{
				options:{
					urls:[
						'http://localhost:8001/tests/index.html'
					],
					webpageProperties: {
						viewportSize: {width: 2, height: 2}
					}
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 8001,
					base: '.'
        }
			}
		},
		replace: {
			widgetXMLPaths: {
				options: {
					patterns: [
						{
							match: 'host',
							replace: '<%= host %>'
						}
					]
				},
				files: [
					{src: "src/applicationPersistenceWidget/widget.xml", dest: "dist/applicationPersistenceWidget/widget.xml"},
					{src: "src/frontendComponentPersistenceWidget/widget.xml", dest: "dist/frontendComponentPersistenceWidget/widget.xml"},
					{src: "src/microservicePersistenceWidget/widget.xml", dest: "dist/microservicePersistenceWidget/widget.xml"},
					{src: "src/frontendComponentSelectWidget/widget.xml", dest: "dist/frontendComponentSelectWidget/widget.xml"},
					{src: "src/microserviceSelectWidget/widget.xml", dest: "dist/microserviceSelectWidget/widget.xml"}
				]
			}
		},
		copy: {
			applicationPersistenceWidget: {
				files: [
					//CSS
					{expand: true, cwd: "src/applicationPersistenceWidget", src:"css/*", dest: "dist/applicationPersistenceWidget/"}
				]
			},
			frontendComponentPersistenceWidget: {
				files: [
					//CSS
					{expand: true, cwd: "src/frontendComponentPersistenceWidget", src:"css/*", dest: "dist/frontendComponentPersistenceWidget/"}
				]
			},
			microservicePersistenceWidget: {
				files: [
					//CSS
					{expand: true, cwd: "src/microservicePersistenceWidget", src:"css/*", dest: "dist/microservicePersistenceWidget/"}
				]
			},
			frontendComponentSelectWidget: {
				files: [
					//CSS
					{expand: true, cwd: "src/frontendComponentSelectWidget", src:"css/*", dest: "dist/frontendComponentSelectWidget/"}
				]
			},
			microserviceSelectWidget: {
				files: [
					//CSS
					{expand: true, cwd: "src/microserviceSelectWidget", src:"css/*", dest: "dist/microserviceSelectWidget/"}
				]
			}
		}
});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-replace');

	grunt.registerTask("default", ["browserify","uglify","replace","copy"]);
	grunt.registerTask("specs", ["browserify:specs","connect:server","qunit"]);
};
