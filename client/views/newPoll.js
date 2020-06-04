Template.newPoll.created = function(){
	var template = this;
	template.creatingPoll = new ReactiveVar(false);
	template.optionsArray = new ReactiveVar([]);
};

Template.newPoll.events = {
	'click button[data-action="open-new-poll-input"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		template.creatingPoll.set(true);
		if(!Meteor.userId()) {
			FlashMessages.sendError("Whoops! You are not logged in. Please log in to create a poll.", 
			{ autoHide: true, hideDelay: 10000 });
		}
	},
	'click button[data-action="cancel-new-poll"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		template.creatingPoll.set(false);
	},
	'click button[data-action="create-new-poll"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		var title = template.$('#newPollTitle').val();
		var time = template.$('#dateTimePicker').val()
		var optionsArray = template.optionsArray.get()
		var metOptionsCriteria = optionsArray.length > 1 && optionsArray.length < 7;

		if(!title) {
			FlashMessages.sendWarning(
				"Hey there! Don't forget to give your poll a title!", 
				{ autoHide: true, hideDelay: 5000 });
		}

		if(!metOptionsCriteria) {
			FlashMessages.sendWarning(
				"Whoah! We have to have atleast 2 voting options and a minimum of 6 options for users to choose from.", 
				{ autoHide: true, hideDelay: 5000 });
		}

		if(Meteor.userId() && title && metOptionsCriteria) {
			var pollObj = {
				userId: Meteor.userId(),
				title: title,
				description: template.$('#newPollDescription').val(),
				timestamp: moment().valueOf(),
				options: template.optionsArray.get(),
				endTime: moment(time, moment.DATETIME_LOCAL).valueOf()
			};
			Meteor.call('polls.insert', pollObj);
			template.creatingPoll.set(false);
			template.optionsArray.set([]);
		}
	},
	'click button[data-action="add-an-option"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		var optionsArray = template.optionsArray.get();
		var newOptionsValue = template.$('#newPollOption').val();
		if(optionsArray.length === 6) {
			FlashMessages.sendWarning("Wait a minute. Each poll can only have 6 options.", 
			{ autoHide: true, hideDelay: 5000 });
		}
		if(optionsArray.length < 6 && newOptionsValue !== "") {
			template.optionsArray.set([...optionsArray, newOptionsValue]);
			template.$('#newPollOption').val("")
		} 
	}
};

Template.newPoll.helpers({
	'optionsArray': function() {
		var template = Template.instance();
		var optionsArray = template.optionsArray.get();

		return optionsArray;
	}
})
