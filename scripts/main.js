requirejs.config({
    baseUrl: "",
    paths: {
    	jquery: "lib/jquery-2.0.2.min",
    	underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
        text: "lib/text",
        html2canvas: "lib/html2canvas",
        jqueryColor: "lib/jquery.color-2.1.2.min"
    },
    shim: {
    	"jquery":{
    		exports: "jQuery"
    	},
    	"underscore":{
    		exports:"_",
    		init:function(){
    			return this._.noConflict();
    		}
    	},
    	"backbone": {
        	deps: ["underscore","jquery"],
    	    exports: "Backbone",
    	    init:function(){
    	    	return this.Backbone.noConflict();
    	    }
    	},
        "html2canvas":{
            exports: "html2canvas"
        },
        "jqueryColor":{
            deps: ["jquery"],
            exports: "jqueryColor"
        }
	}
});

// Start the main app logic.
requirejs(["jquery","underscore","backbone","scripts/views/generatorView"],function ($,_,Backbone,generatorView) {
    var router = Backbone.Router.extend({
    	routes:{
    		"":"start"
    	},
    	start:function(){
            new generatorView();
    	}
    });
    var app = new router();
    Backbone.history.start();
});