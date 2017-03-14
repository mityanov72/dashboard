function ConsoleEngine(name) {
	this.constructor = function(name) {
		this.log(this, 'ready');
		this.sender = '';
	}
	this.getMessage = function(sender, message) {
		if(message != undefined) {
			if(sender == undefined) {
				return message;
			} else {
				this.sender = sender.__proto__.constructor.name;
			}
			return this.sender + ": " + message;
		} else {
			return sender;
		}
	}
	this.getTime = function() {
		var now = new Date();
		return now.format("yyyy-mm-dd HH:MM:ss L");
	}
	this.log = function(sender, message) {
		console.log('['+this.getTime()+'] '+this.getMessage(sender, message));
	}
	this.error = function(sender, message) {
		console.info('['+this.getTime()+'] '+this.getMessage(sender, message));
	}
	this.catcher = function(sender, error) {
		var message = 'error '+error.name+': '+error.message+'\n'+error.stack;
		console.info('['+this.getTime()+'] '+this.getMessage(sender, message));
	}
	this.constructor(name);
}
