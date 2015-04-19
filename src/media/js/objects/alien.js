
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
		this.animations.add("walk", null, 10);
	};

	inherits(Alien, Phaser.Sprite);

	Alien.prototype.mutate = function() {
		// TODO apply a random mutation
	};

	Alien.prototype.update = function() {
		// call update on the AI
		// the AI will need to look up the target
		// which could be an object or an x, y point
		// the AI will return a vector the alien needs to move in
		var vector = this.data.smarts.update(this.game, this);

		this.body.velocity.x = vector.x;
		this.body.velocity.y = vector.y;

		if(vector.x !== 0 || vector.y !== 0) {
			this.animations.play("walk");

			if(vector.x > 0) {
				this.scale.setTo(1, 1);
			}
			else if(vector.x < 0) {
				this.scale.setTo(-1, 1);
			}
		}
		else {
			this.animations.stop("walk");
			this.frame = 0;
		}
	};

	// groups the aliens together
	var AlienGroup = function(game, parent) {
		Phaser.Group.call(this, game, parent);

		this.spawnPoints = [];
	};

	inherits(AlienGroup, Phaser.Group);

	// for now just add random aliens around the place
	AlienGroup.prototype.addAlien = function() {
		var point = this.game.rnd.pick(this.spawnPoints);

		this.add(new Alien(this.game, point.x, point.y, {
			"target": constants.CIVILIAN,
			"aggression": 0.1
		}));
	};

	AlienGroup.prototype.addSpawnPoints = function() {
		var x1 = 200, x2 = constants.WORLD_WIDTH - 200;
		var y1 = 200, y2 = constants.WORLD_HEIGHT - 200;

		this.spawnPoints.push(this.game.add.image(x1, y1, "cave", this));
		this.spawnPoints.push(this.game.add.image(x1, y2, "cave", this));
		this.spawnPoints.push(this.game.add.image(x2, y1, "cave", this));
		this.spawnPoints.push(this.game.add.image(x2, y2, "cave", this));
	};

	AlienGroup.prototype.spawnAliens = function(x, y, amount, mutation) {
		// the spawn the supplied amount of aliens over the next 10 seconds from the supplied point
	};

	return AlienGroup;
});