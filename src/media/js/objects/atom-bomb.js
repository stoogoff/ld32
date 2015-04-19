
define(function(require) {
	// imports
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");

	// constants
	var ABOMB_SPEED = 1000, ABOMB_INCREMENT = 5, COMPLETE = 100;

	var AtomBomb = function(game) {
		this.game = game;
		this.completeness = 0; // percentage
		this.incrementTimer = 0;
		this.alphaTimer = 0;

		var fill = helpers.createSolid(game, constants.WORLD_WIDTH, constants.WORLD_HEIGHT, "white");

		this.image = this.game.add.image(0, 0, fill);
		this.image.alpha = 0;
	};

	AtomBomb.prototype.isReady = function() {
		return this.completeness >= COMPLETE;
	};

	AtomBomb.prototype.fire = function(collectables, aliens/*, bugs */) {
		if(!this.isReady()) {
			return;
		}

		var toDestroy = [];

		var killer = function(item) {
			if(item.inCamera) {
				toDestroy.push(item);
			}
			// mutate it if it's off screen and can be mutated
			else if(item.mutate) {
				item.mutate();
			}
		};

		collectables.forEach(killer);
		aliens.forEach(killer);
		//bugs.forEach(killer);

		toDestroy.forEach(function(item) {
			item.destroy();
		});

		this.completeness = 0;
		this.image.alpha = 1;
		this.alphaTimer = this.game.time.now;
	};

	AtomBomb.prototype.update = function() {
		if(this.game.time.now > this.incrementTimer && this.completeness <= COMPLETE) {
			this.completeness += ABOMB_INCREMENT;
			this.incrementTimer = this.game.time.now + ABOMB_SPEED;
		}

		// explosion is happening!
		if(this.image.alpha > 0 && this.game.time.now > this.alphaTimer) {
			var elapsed = this.game.time.now - this.alphaTimer;

			elapsed = 1 - this.game.math.clamp(elapsed / 2000, 0, 1);

			this.image.alpha = elapsed;
		}
	};

	return AtomBomb;
});