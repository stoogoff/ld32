
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var helpers = require("../utils/helpers");
	var constants = require("../utils/constants");

	// import objects
	var AI = require("./ai");

	var Alien = function(game, x, y, mutation) {
		if(!mutation) {
			mutation = {};
		}

		// default AI stuff
		var target     = mutation["target"] || null;
		var aggression = mutation["aggression"] || 0.5;
		var distance   = mutation["distance"] || false;

		// default stats plus any mutation stuff
		this.data = {
			strength  : 10  + (mutation["strength"]  || 0),
			speed     : 300 + (mutation["speed"]     || 0),
			toughness : 10  + (mutation["toughness"] || 0),
			smarts    : new AI(aggression, target, distance)
		};

		// TODO weapon types will come in later

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, "alien");

		// set physics and game specific stuff
		game.physics.arcade.enable(this);
		game.add.existing(this);

		this.body.collideWorldBounds = true;
		this.anchor.setTo(0.5, 0.5);
	};

	inherits(Alien, Phaser.Sprite);

	Alien.prototype.update = function() {
		// call update on the AI
		// the AI will need to look up the target
		// which could be an object or an x, y point
		// the AI will return a vector the alien needs to move in
		var vector = this.data.smarts.update(this.game, this);

		this.body.velocity.x = vector.x;
		this.body.velocity.y = vector.y;
	};

	// groups the aliens together
	var AlienGroup = function(game, parent) {
		Phaser.Group.call(this, game, parent);
	};

	inherits(AlienGroup, Phaser.Group);

	// for now just add random aliens around the place
	AlienGroup.prototype.addAlien = function() {
		var point = helpers.getRandomPoint(this.game);

		this.add(new Alien(this.game, point.x, point.y, {
			"target": constants.CIVILIAN
		}));
	};

	AlienGroup.prototype.spawnAliens = function(x, y, amount, mutation) {
		// the spawn the supplied amount of aliens over the next 10 seconds from the supplied point
	};

	return AlienGroup;
});