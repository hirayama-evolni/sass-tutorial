module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            all: {
                options: {
                    style: 'nested'
                },
                files: {
                    'ex1.css': 'ex1.scss',
                    'ex2.css': 'ex2.scss',
                    'ex3.css': 'ex3.scss',
                    'ex4.css': 'ex4.scss',
                    'ex5.css': 'ex5.scss',
                    'ex6.css': 'ex6.scss',
                    'ex7.css': 'ex7.scss',
                    'ex8.css': 'ex8.scss',
                    'ex9.css': 'ex9.scss',
                    'ex10.css': 'ex10.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass', 'render']);

    grunt.registerTask('render', 'render template into README.md', function(){
	var _ = require('underscore');

        var _include = function(id, scss_only){
            var css_name = id+'.css';
            var scss_name = id+'.scss';

            if(!grunt.file.exists(scss_name)) return void(0);

            var css = scss_only ? '' : grunt.file.read(css_name);
            var scss = grunt.file.read(scss_name);

            var ret = "SCSS:\n"+
                "```scss\n"+
                scss+"\n```";
            
            if(!scss_only){
                ret += "\nCSS:\n"+
                    "```css\n"+
                    css+"\n```\n";
            }

            return ret;
        }

        var examples = ['ex1',
                        'ex2',
                        'ex3',
                        'ex4',
                        'ex5',
                        'ex6',
                        'ex7',
                        'ex8',
                        'ex9',
                        'ex10',
                       ];

        var o = {};
        _.each(examples, function(el){
            o[el] = _include(el, false);
        });
        o['_rounded'] = _include('_rounded', true);

	var tmpl = grunt.file.read('README_tmpl.md');

	var readme = _.template(tmpl, o);

        grunt.file.write('README.md', readme);
        
    });
}
