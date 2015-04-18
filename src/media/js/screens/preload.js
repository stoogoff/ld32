
define(function(require) {
	var Preload = function() {
		Phaser.State.call(this);
	};

	Preload.prototype = {
		preload: function() {
			var self = this;

			// load graphics
			var keys = ["alien", "player", "lab", "gun", "bomb", "spray", "status"];

			keys.forEach(function(key) {
				self.load.image(key, "media/img/" + key + ".png");
			});

			// load json data
			this.load.json("objects", "media/data/objects.json");
		},
		create: function() {
			this.game.state.start("play");
		}
	};

	return Preload;
});