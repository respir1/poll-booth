import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
	'polls.insert'(poll) {
		check(poll, Match.ObjectIncluding({ 
            userId: String, 
            title: String,
            description: String,
            timestamp: Number, 
			options: Array,
			endTime: Number
        }))
	
		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		} 
		if(!poll.title) {
			throw new Meteor.Error('cannot-create-poll-without-title');
		}
		if(!poll.options.length > 6) {
			throw new Meteor.Error('more-than-6-options')
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