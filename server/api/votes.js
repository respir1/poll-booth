import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
	'votes.insert'(vote) {
		check(vote, Match.ObjectIncluding({ 
            userId: String, 
            pollId: String,
            timestamp: Number, 
            option: String
        }))

        var userHasNotVoted = Votes.find({ 
            userId: vote.userId,
            pollId: vote.pollId
        }).count() === 0;

		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
        }
        if(!userHasNotVoted) {
            throw new Meteor.Error('user-already-voted');
        }
        Votes.insert(vote);
	},
	'votes.update'(voteId, doc, fields, modifier) {

	},
	'votes.remove'(voteId, doc) {
		check(voteId, String);

		Votes.remove(voteId);
	}
})