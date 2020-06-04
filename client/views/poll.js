Template.pollListItem.events = {
	'click button[data-action="view-poll"]': function(event){
		event.preventDefault();
		Router.go("/poll/" + this._id);

		if(!Meteor.userId()) {
			FlashMessages.sendError("Whoops! You are not logged in. Please log in to vote.", 
			{ autoHide: true, hideDelay: 10000 });
		}
	}
};

Template.pollDetails.events = {
	'click button[data-action="vote-on-poll"]': function(event){
		event.preventDefault();
		var poll = Template.currentData();
		var pollOption = this;
		var userHasNotVoted = Votes.find({ userId: Meteor.userId(), pollId: poll._id }).fetch().length === 0;

		if(!userHasNotVoted) {
			FlashMessages.sendWarning("Uh oh! It looks like you've already voted. You can only vote once per poll.",
			{ autoHide: true, hideDelay: 10000 });
		}
		
		if(Meteor.userId() && userHasNotVoted) {
			var pollObj = {
				userId: Meteor.userId(),
				pollId: poll && poll._id,
				timestamp: moment().valueOf(),
				option: pollOption.valueOf()
			}
			Meteor.call('votes.insert', pollObj);
		} 
	}
};

Template.pollDetails.helpers({
	'voteCountForOption': function(){
		var pollOption = this;
		return Votes.find({option: pollOption.valueOf()}).count();
	}
});

Template.pollDetails.helpers({
	'showVotes': function() {
		return Votes.find({ userId: this.userId, pollId: this._id }).count() !== 0;
	}
})

Template.pollDetails.helpers({
	'disableVoting': function() {
		var pollInfo = Polls.findOne({ pollId: this.id })
		return moment().valueOf() < pollInfo.endTime;
	}
})
