Polls.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Votes.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});
