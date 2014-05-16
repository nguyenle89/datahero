require.config({
    baseUrl: 'javascripts',
    paths: {
        'jquery': 'lib/jquery-1.8.3',
        'underscore': 'lib/underscore',
        'jquery-form': 'lib/jquery.form.min',
        'Mustache': 'lib/requirejs.mustache',

        'domReady': 'domReady',
        'text': 'text'
    },
    shim: {
        'jquery-form': {
            exports: 'jquery'
        }
    }
});