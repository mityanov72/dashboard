

class ConsoleEngine {
	constructor(name) {
		this.log(this, 'ready');
		this.sender = '';
	}
	getMessage(sender, message) {
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
	getTime() {
		let now = new Date();
		return now.format("yyyy-mm-dd HH:MM:ss L");
	}
	log(sender, message) {
		console.log('['+this.getTime()+'] '+this.getMessage(sender, message));
	}
	error(sender, message) {
		console.info('['+this.getTime()+'] '+this.getMessage(sender, message));
	}
	catcher(sender, error) {
		var message = 'error '+error.name+': '+error.message+'\n'+error.stack;
		console.info('['+this.getTime()+'] '+this.getMessage(sender, message));
	}
}

/*
107 switch не нашел к чему сопоставить

*/