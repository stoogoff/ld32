
define(function(require) {
	var Preload = function() {
		Phaser.State.call(this);
	};

	Preload.prototype = {
		preload: function() {
			var self = this;

			// load graphics
			var keys = [
				"background", "cave",
				"lab-atomic", "lab-biological", "lab-chemical", "lab-civilian",
				"weapon-gun", "weapon-bomb", "weapon-spray",
				"flask-blue", "flask-green", "flask-orange", "flask-pink", "flask-purple", "flask-red",
				"heart", "lightning", "rocket", "person", "status"];

			keys.forEach(function(key) {
				self.load.image(key, "media/img/" + key + ".png");
			});

			// animations
			this.load.spritesheet("alien", "media/img/alien.png", 24, 24);
			this.load.spritesheet("player", "media/img/player.png", 32, 32);
			this.load.spritesheet("bug", "media/img/bug.png", 18, 12);
			this.load.spritesheet("inventory", "media/img/inventory.png", 48, 48);
			this.load.spritesheet("btn-save", "media/img/btn-save.png", 120, 32);
			this.load.spritesheet("btn-cancel", "media/img/btn-cancel.png", 120, 32);

			// load json data
			this.load.json("objects", "media/data/objects.json");
		},
		create: function() {
			this.game.state.start("play");
		}
	};

	return Preload;
});