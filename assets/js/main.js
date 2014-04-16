$(function(){
	
});


Countdown = {
	run: function(time, callback, onFinish){
		var elapsed = 1;

		var id = function runner(){

			return setTimeout(function(){
				callback(elapsed++);

				if( Math.floor(time - elapsed) == 0 ) {
					onFinish();
					clearTimeout(id);
				}
				else runner();
			}, 1000);
		}();
	},

	until: function( date, callback, onFinish ){
		var start = new Date(),
			diffSeconds = (date - start)/1000;

		if( diffSeconds < 0 ) throw new Error('Date error');

		var delegate = function( elapsed ){
			var diffTime = diffSeconds - elapsed,
				minutes = Math.floor(diffTime/60),
				seconds = Math.floor(diffTime % 60); 

			callback({ 
				elapsed: elapsed, 
				time: diffSeconds, 
				minutes: minutes, 
				seconds: seconds 
			});
		}

		Countdown.run( diffSeconds, delegate, onFinish );
	},

	stop: function(){
		clearTimeout(Countdown.timeoutId);
	}
}