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

		if(!title) {
			FlashMessages.sendWarning(
				"Hey there! Don't forget to give your poll a title!", 
				{ autoHide: true, hideDelay: 5000 });

			setTimeout(() => {
				template.creatingPoll.set(false);
			}, 5000)
		}

		if(Meteor.userId() && title) {
			var pollObj = {
				userId: Meteor.userId(),
				title: template.$('#newPollTitle').val(),
				description: template.$('#newPollDescription').val(),
				timestamp: moment().valueOf(),
				options: template.optionsArray.get()
			};
			Meteor.call('polls.insert', pollObj);
		}
	},
	'click button[data-action="add-an-option"]': function(event){
		event.preventDefault();
		var template = Template.instance();
		var optionsArray = template.optionsArray.get();
		if(optionsArray.length < 7) {
			var newOptionsValue = template.$('#newPollOption').val();
			optionsArray.push(newOptionsValue)
			template.$('#newPollOption').val("")
		} else {
			FlashMessages.sendWarning("Wait a minute. We can only have 6 options at the moment.");
		}

	}
};
