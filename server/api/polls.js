import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
	'polls.insert'(poll) {
		check(poll, Match.ObjectIncluding({ 
            userId: String, 
            title: String,
            description: String,
            timestamp: Number, 
            options: Array
        }))
	
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		} 
		if(!poll.title) {
			throw new Meteor.Error('cannot-create-poll-without-title');
		}

        Polls.insert(poll);
	},
	'polls.update'(pollId, doc, fields, modifier) {

	},
	'polls.remove'(pollId, doc) {
		check(pollId, String);

		Polls.remove(pollId);
	}
})