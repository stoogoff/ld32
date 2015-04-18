
define(function(require) {
	// imports
	var constants = require("../utils/constants");

	// the AI object for aliens and bugs
	var AI = function(aggression, target) {
		this.aggression = aggression || 0.5;
		this.target = target || null;
	};

	AI.prototype.update = function(game, sprite) {
		var target = game.findTarget(this.target);
		var rotation = null;

		// target is an object
		if(target) {
			rotation = game.physics.arcade.angleBetween(sprite, target);
		}
		// if target is a point
		else if(this.target) {
			rotation = game.physics.arcade.angleToXY(sprite, this.target.x, this.target.y);
		}
		// no target
		else {
			// create a random target
			if(!this.lastTarget) {
				this.lastTarget = {
					x: game.rnd.integerInRange(0, constants.WORLD_WIDTH),
					y: game.rnd.integerInRange(0, constants.WORLD_HEIGHT)
				};
			}

			rotation = game.physics.arcade.angleToXY(sprite, this.lastTarget.x, this.lastTarget.y);
		}

		return game.physics.arcade.accelerationFromRotation(rotation, this.aggression * sprite.data.speed);
		// if target is object
		// TODO this needs some way of looking up an object
		//game.physics.arcade.angleBetween(sprite, target);

		// if target is null
		// meander

		// if has reached target
		// attack if it's the player
		// attack if it's civilians
	};

	return AI;
});