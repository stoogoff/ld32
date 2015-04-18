
define(function(require) {
	var Preload = function() {
		Phaser.State.call(this);
	};

	Preload.prototype = {
		preload: function() {
			this.load.image("player", "media/img/player.png");
			this.load.image("alien", "media/img/alien.png");
			this.load.image("bg", "media/img/bg.png");
			this.load.image("lab", "media/img/lab.png");
		},
		create: function() {
			this.game.state.start("play");
		}
	};

	return Preload;
});