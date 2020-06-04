//****************
//PUBLICATIONS
//****************

Meteor.publish('polls', function () {
	check(arguments, [Match.Any]);
	var today = Date.now();

	return Polls.find({ endTime: { $gte: today } }, { limit: 10 });
});

Meteor.publish('pollDetails', function (pollId) {
	check(pollId, String);

	if(this.userId) {
		return [
			Polls.find({_id: pollId}),
			Votes.find({pollId: pollId})
		] 
	} else {
		return this.ready();
	}
});
