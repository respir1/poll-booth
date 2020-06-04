//****************
//PUBLICATIONS
//****************

Meteor.publish('polls', function () {
	check(arguments, [Match.Any]);
	var today = Date.now();
	return Polls.find({ endTime: { $gte: today } });
});


Meteor.publish('pollDetails', function (pollId) {
	check(pollId, String);
	return [
		Polls.find({_id: pollId}),
		Votes.find({pollId: pollId})
	] // <-- something missing here?
});