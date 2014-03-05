define(["jquery","underscore","backbone"],
	function ($,_,Backbone) {
		return Backbone.Model.extend({
			defaults: function(){
				return{
					familyName: "Family Name",
					givenName: "Given Name",
					studentID: "Student ID",
					faculty: "Facuilty/Program",
					status: "Admitted Status",
					admittedYear: "Admitted Year",
					photo: null
				};
			}
		});

	});