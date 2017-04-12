require.config({
	baseUrl:'resources/js',
	paths:{
		'jQuery':'jquery',
        'bootstrap': 'bootstrap/bootstrap.min',
        'bootstrapValidator': 'bootstrap/bootstrapValidator'
    },
	shim: {
        'base/backbone': {
            deps: [ 'underscore','jquery' ],
            exports: 'Backbone'
        },
        'base/underscore': {
            exports: '_'
        },
        'base/json2': {
            exports: 'JSON'
        },
        'jQuery': {
            exports: '$'
        },
        'jquery-ui': {
            deps: ['jQuery'],
            exports: '$'
        },
        'jquery.Paginator.min': {
            deps: ['jQuery'],
            exports: '$'
        },
    }
})