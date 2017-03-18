var ULTRA = 'ULTRA';
var HIGH = 'HIGH';
var MEDIUM = 'MEDIUM';
var LOW = 'LOW';

var CONST_TASK_SWITCH_DELAY_ULTRA = 50;
var CONST_TASK_SWITCH_DELAY_HIGH = 100;
var CONST_TASK_SWITCH_DELAY_MEDIUM = 1000;
var CONST_TASK_SWITCH_DELAY_LOW = 5000;
var CONST_TASK_MAX_ITERATION_ULTRA = 100;
var CONST_TASK_MAX_ITERATION_HIGH = 100;
var _task_CONST_TASK_MAX_ITERATION_MEDIUM = 1000;
var CONST_TASK_MAX_ITERATION_LOW = undefined;

var _setTimeout = setTimeout;

var setTimeout = function(callback, timeout) {
	TASK_MANAGER.addTask(callback);
}

function taskManager() {
	this._task_ultra = {};
	this._task_high = {};
	this._task_medium = {};
	this._task_low = {};
	this._task_ultra.array_real = [];
	this._task_high.array_real = [];
	this._task_medium.array_real = [];
	this._task_low.array_real = [];
	this._task_ultra.array_tmp = [];
	this._task_high.array_tmp = [];
	this._task_medium.array_tmp = [];
	this._task_low.array_tmp = [];
	this._is_work_ultra = false;
	this._is_work_high = false;
	this._is_work_medium = false;
	this._is_work_low = false;
	this.addTask = function(task_function, task_priority, is_pereodic) {
		if(task_function == undefined) {
			console.error('TASK_MANAGER: undefined exec function');
			return -1;
		}
		is_pereodic = is_pereodic || false;
		task_priority = task_priority || HIGH;
		var item = {};
		item.exec = task_function;
		item.pereodic = is_pereodic;
		
		switch(task_priority) {
			case ULTRA: this._task_ultra.array_real.unshift(item); item.iteration = CONST_TASK_MAX_ITERATION_ULTRA; break;
			case HIGH: this._task_high.array_real.unshift(item); item.iteration = CONST_TASK_MAX_ITERATION_HIGH; break;
			case MEDIUM: this._task_medium.array_real.unshift(item); item.iteration = _task_CONST_TASK_MAX_ITERATION_MEDIUM; break;
			case LOW: this._task_low.array_real.unshift(item); item.iteration = CONST_TASK_MAX_ITERATION_LOW; break;
		}
		this.check();
	}
	this.travelTaskTemplate = function(sender) {
		var temp_task;
		var flag = false;
		if(sender.array_real.length > 0) {
			temp_task = sender.array_real.pop();
			if(temp_task.iteration > 0 || temp_task.iteration == undefined) {
				temp_task.exec();
				if(temp_task.pereodic) {
					sender.array_tmp.unshift(temp_task);
				}
			}
			if(temp_task.pereodic == true && temp_task.iteration !== undefined) temp_task.iteration--;
			flag = true;
		} else {
			sender.array_real = sender.array_tmp;
			sender.array_tmp = new Array();
			if(sender.array_real.length > 0) {
				flag = true;
			}
		}
		
		return flag;
	}
	this.travelTaskUltra = function() {
		this._is_work_ultra = this.travelTaskTemplate(this._task_ultra);
		if(this._is_work_ultra == true) {
			_setTimeout(this.travelTaskUltra.bind(this), CONST_TASK_SWITCH_DELAY_ULTRA);
		}
	}
	this.travelTaskHigh = function() {
		this._is_work_high = this.travelTaskTemplate(this._task_high);
		if(this._is_work_high == true) {
			_setTimeout(this.travelTaskHigh.bind(this), CONST_TASK_SWITCH_DELAY_HIGH);
		}
	}
	this.travelTaskMedium = function(counter) {
		this._is_work_medium = this.travelTaskTemplate(this._task_medium);
		if(this._is_work_medium == true) {
			counter--;
			if(counter < 0) {
				counter = this._task_medium.array_real.length + this._task_medium.array_tmp.length;
			}
			if(counter == 0) {
				_setTimeout(this.travelTaskMedium.bind(this, counter), CONST_TASK_SWITCH_DELAY_MEDIUM);
			} else {
				_setTimeout(this.travelTaskMedium.bind(this, counter), counter * 100);
			}
		}
	}
	this.travelTaskLow = function(counter) {
		this._is_work_low = this.travelTaskTemplate(this._task_low);
		if(this._is_work_low == true) {
			counter--;
			if(counter < 0) {
				counter = this._task_low.array_real.length + this._task_low.array_tmp.length;
			}
			if(counter == 0) {
				_setTimeout(this.travelTaskLow.bind(this, counter), CONST_TASK_SWITCH_DELAY_LOW);
			} else {
				_setTimeout(this.travelTaskLow.bind(this, counter), counter * 100);
			}
		}
	}
	this.check = function() {
		if(this._is_work_ultra == false) {
			//this.travelTaskUltra(0);
			this._is_work_ultra = true;
			_setTimeout(this.travelTaskUltra.bind(this, 0), CONST_TASK_SWITCH_DELAY_ULTRA);
		}
		if(this._is_work_high == false) {
			//this.travelTaskHigh(0);
			this._is_work_high = true;
			_setTimeout(this.travelTaskHigh.bind(this, 0), CONST_TASK_SWITCH_DELAY_HIGH);
		}
		if(this._is_work_medium == false) {
			//this.travelTaskMedium(0);
			this._is_work_medium = true;
			_setTimeout(this.travelTaskMedium.bind(this, 0), CONST_TASK_SWITCH_DELAY_MEDIUM);
		}
		if(this._is_work_low == false) {
			//this.travelTaskLow(0);
			this._is_work_low = true;
			_setTimeout(this.travelTaskLow.bind(this, 0), CONST_TASK_SWITCH_DELAY_LOW);
		}
	}
}

var TASK_MANAGER = new taskManager();