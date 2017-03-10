class PROCESS {
	constructor(name) {
		this.name = name;
		this.PID = getRandomInt(1000, 9999);
		this.status;
		this.is_kill = false;
		this.alive = false;
		this.live_time = 10000;
		this.callback_function = undefined;
		//setTimeout(function(){ if(this == window) { return -1; } this.watchDog(this);}, this.live_time);
	}
	watchDog() {
		if(this.alive == false) { this.is_kill = true; }
		this.alive = false;
		Application.error(this, 'WatchDog run ['+this.PID+']')
		//setTimeout(function(){sender.watchDog(sender);}, sender.live_time);
	}
	INIT() {
	
	}
	START() {
	
	}
	STOP() {
	
	}
	HALT(timeout = 0) {
		this.is_kill = true;
		this.alive = false;
		let this_proc = this;
		setTimeout(function() {Application.halt(this_proc);}, timeout);
	}
	
}
