//****************
//PUBLICATIONS
//****************

Meteor.publish('polls', function () {
	check(arguments, [Match.Any]);
	return Polls.find({}, { sort: { createdAt: -1 } });
});


Meteor.publish('pollDetails', function (pollId) {
	check(pollId, String);
	return [
		Polls.find({_id: pollId}),
		Votes.find({pollId: pollId})
	] // <-- something missing here?
});