define(["jquery","jqueryColor","underscore","backbone","scripts/model/model","scripts/views/watCardView","text!scripts/template/generator.tpl.html"],
	function ($,jqueryColor,_,Backbone,student,watCardView,generatorTemplate) {

		return Backbone.View.extend({
			el:"body",

			model: null,

			template:_.template(generatorTemplate),

			events:{
				"click .mainline":"toggleInput",
				"blur .gm_input":"hideInput",
				"change #gm_faculty_input":"changeFaculty",
				"change #gm_year_input":"changeYear",
				"change #gm_status_input":"changeStatus",
				"change #gm_photo_input":"uploadPhoto",
				"click #gm_watcardme":"generate",
				"keyup .gm_input":"keyEnteredInInput",
				"click #feedback_close":"closeFeedBack",
				"change #gm_agree_checkbox":"agreeOrDisagree"
			},

			initialize: function(){
				this.model = new student();
				this.model.on("change",this.updateView,this);
				this.render();
			},

			render: function(){
				this.$el.append(this.template());
				for(var i=2013;i>=1957;i--){
					$("#gm_year_input").append("<option value='"+i+"'>"+i+"</option>");
				}
				return this;
			},

			toggleInput: function(ev){
				var input = $(ev.currentTarget).find(".gm_input");
				if(input.length===0){//photo
					$("#gm_photo_input").click();
				}
				if(input.css("display")==="none"){
					input.css("display","inline");
					input.focus();
				}
			},

			hideInput: function(ev){
				var input = $(ev.currentTarget);
				if(this.inputFieldValidation(input)){
					if(input.attr("data-field")==="givenName" || input.attr("data-field")==="familyName"){
						this.model.set(input.attr("data-field"),input.val().toUpperCase());
					}else{
						this.model.set(input.attr("data-field"),input.val());
					}
					this.hide(input);
				}else{
					this.hide(input);
					this.inputError(input);
				}
			},

			changeFaculty: function(){
				this.hide($("#gm_faculty_input"));
				$("#gm_faculty_input").blur();
				if($("#gm_faculty_input").val()){
					this.model.set("faculty",$("#gm_faculty_input").val());
				}else{
					$("#gm_faculty_input").val("Faculty/Program");
					this.toggleFeedback();
				}
			},

			changeYear: function(){
				this.hide($("#gm_year_input"));
				$("#gm_year_input").blur();
				this.model.set("admittedYear",$("#gm_year_input").val());
			},

			changeStatus: function(){
				this.hide($("#gm_status_input"));
				$("#gm_status_input").blur();
				if($("#gm_status_input").val()){
					this.model.set("status",$("#gm_status_input").val());
				}else{
					$("#gm_status_input").val("Admitted Status");
					this.toggleFeedback();
				}
			},

			inputFieldValidation: function(input){
				if(input.attr("type")==="text"){
					return input.val();
				}else if(input.attr("type")==="number"){
					return (input.val() > 10000000 && input.val() < 99999999);
				}else if(input.attr("id")==="gm_faculty_input"){
					return input.val()!=="Faculty/Program";
				}else if(input.attr("id")==="gm_year_input"){
					return input.val()!=="Admitted Year";
				}else if(input.attr("id")==="gm_status_input"){
					return input.val()!=="Admitted Status";
				}else{
					return false;
				}
			},

			updateView: function(){
				$("#gm_givenname").find("a").text(this.model.get("givenName"));
				$("#gm_familyname").find("a").text(this.model.get("familyName"));
				$("#gm_studentid").find("a").text(this.model.get("studentID"));
				$("#gm_faculty").find("a").text(this.model.get("faculty"));
				$("#gm_year").find("a").text(this.model.get("admittedYear"));
				$("#gm_status").find("a").text(this.model.get("status"));
			},

			generate: function(){
				this.hide($("#generator"));
				new watCardView({model:this.model});
			},

			uploadPhoto: function(ev){
				var input  = ev.currentTarget;
				var self = this;
				if(input.files && input.files[0]){
					var reader = new FileReader();
					reader.onload = function(e){
						self.model.set("photo",e.target.result);
					};
					reader.readAsDataURL(input.files[0]);
					self.hide($(ev.currentTarget));
					$("#gm_photo > a").text(input.files[0].name);
				}
			},

			keyEnteredInInput: function(event){
				if(event.keyCode===13){
					$(event.currentTarget).blur();
				}
			},

			inputError: function(input){
				var color = input.parent().css("background-color");
				input.parent().css("background-color","red");
				input.parent().animate({"background-color": color},1000);
			},

			toggleFeedback: function(){
				$("#feedback_background").css("display","inline");
			},

			closeFeedBack: function(){
				this.hide($("#feedback_background"));
			},

			agreeOrDisagree: function(){
				if($("#gm_agree_checkbox").is(":checked")){
					$("#gm_watcardme").css("display","block");
					$("#gm_watcardme").css("border","none");
					
				}else{
					this.hide($("#gm_watcardme"));
				}
				var self = this;
				_.delay(function(){
					self.hide($("#gm_agree_box"));
				},500);
			},

			hide: function(element){
				element.css("display","none");
			}


		});

	});
