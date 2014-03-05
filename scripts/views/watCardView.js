define(["jquery","underscore","backbone","html2canvas","scripts/model/model","text!scripts/template/watCard.tpl.html"],
	function ($,_,Backbone,html2canvas,student,watCardTemplate) {

		return Backbone.View.extend({
			el:"body",

			model: null,

			template:_.template(watCardTemplate),

			events:{
				"click #download": "download",
				"click #reset": "reset"
			},

			initialize: function(options){
				this.model = options.model;
				this.render();
			},

			render: function(){
				var currentMonth = 8;
				var expirationYear = 2013;
				if(this.model.get("admittedYear")<2013 && this.model.get("status")==="FULL TIME UNDERGRAD"){
					expirationYear = parseInt(this.model.get("admittedYear")) + 6;
				}else if(this.model.get("admittedYear")>=2013 && this.model.get("status")==="FULL TIME UNDERGRAD"){
					expirationYear = parseInt(this.model.get("admittedYear")) + 5;
				}
				if(expirationYear<2013 && currentMonth>6){
					expirationYear++;
				}

				this.$el.append(this.template({
					familyName: this.model.get("familyName"),
					givenName: this.model.get("givenName"),
					studentID: this.model.get("studentID"),
					faculty: this.model.get("faculty"),
					status: this.model.get("status"),
					expirationYear: expirationYear,
				}));
				if(this.model.get("photo")){
					$("#watCard-photo").css("background-image","url("+this.model.get("photo")+")");
				}
				return this;
			},

			download: function(){
				html2canvas(document.getElementById("watCard"),{
    				onrendered: function(canvas){
    					var img = canvas.toDataURL();
    					window.open(img);
    				},
    				letterRendering: true
				});
			},

			reset: function(){
				location.reload();
			}

		});

	});