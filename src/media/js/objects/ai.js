
define(function(require) {
	// imports
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");

	// the AI object for aliens and bugs
	var AI = function(aggression, target, distance) {
		this.aggression = aggression || 0.5;   // how fast to track the target
		this.target     = target     || null;  // the target to track
		this.distance   = distance   || false; // how far to look for the target, where false is infinite
	};

	AI.prototype.update = function(game, sprite) {
		var target = game.findTarget(this.target);
		var rotation = null;

		// if the distance is too far away create a close distance to aimlessly wander to
		// only applies to targets which are objects
		if(target && this.distance) {
			// the target object is a long way away
			if(game.physics.arcade.distanceBetween(sprite, target) >= this.distance) {
				if(!this.lastTarget) {
					this.lastTarget = helpers.getRandomPoint(game);
				}

				// don't pursue the intended target yet
				target = null;
			}
			else {
				this.lastTarget = null;
			}
		}

		// target is an object
		if(target) {
			rotation = game.physics.arcade.angleBetween(sprite, target);
		}
		// the target is not an object
		else {
			// the target is a point
			if(this.target.constructor !== String) {
				target = this.target;
			}
			// a random target has been set
			else if(this.lastTarget) {
				target = this.lastTarget;
			}
			// set a new random target
			else {
				target = this.lastTarget = helpers.getRandomPoint(game);
			}

			rotation = game.physics.arcade.angleToXY(sprite, target.x, target.y);
		}

		// check to see if the target needs to be reset
		var vector = game.physics.arcade.accelerationFromRotation(rotation, this.aggression * sprite.data.speed);
		var CHECK_DISTANCE = 5;

		// have reaced the target
		if(game.math.fuzzyEqual(target.x, sprite.x, CHECK_DISTANCE) && game.math.fuzzyEqual(target.y, sprite.y, CHECK_DISTANCE)) {
			// zero the vector so it doesn't wobble
			vector = { x: 0, y: 0 };

			// if the AI has reached the target...
			// if it's the civilians it stays in the lab and attacks the player's civilians value until either the game is over or it's killed
			// if it's the player it attack's the player until the player dies or kills it
			// if it's the player and it hasn't found it give it another last target
			if(this.target === constants.PLAYER) {
				this.lastTarget = null;
			}
			// if it's a different base target it waits there until the player comes in, then switches to attacking the player (alien only) or the aliens (bug only)
			// if it's a random point it generates a new random point within a given amount around the current target
			if(!this.target) {
				this.lastTarget = helpers.getRandomPoint(game, target, 200);

				// TODO need to keep the aliens in play and try and get them to head towards the centre
			}
		}

		return vector;
	};

	return AI;
});