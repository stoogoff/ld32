
define(function(require) {
	var Player = require("../objects/player");
	var Alien = require("../objects/alien");
	var LabGroup = require("../objects/lab");
	var constants = require("../utils/constants");

	var player, labs;
	var alien;

	function isLab(target) {
		return target === constants.ATOMIC || target === constants.BIOLOGICAL || target === constants.CHEMICAL || target === constants.CIVILIAN;
	}

	var GamePlay = function() {
		Phaser.State.call(this);
	};

	GamePlay.prototype.create = function() {
		//this.game.add.tileSprite(0, 0, 800, 800, "bg");

		// basic world stuff
		this.game.stage.backgroundColor = "#584838";
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(0, 0, constants.WORLD_WIDTH, constants.WORLD_HEIGHT);

		// allows the AI to look up objects
		this.game.findTarget = function(target) {
			if(target === constants.PLAYER) {
				return player;
			}

			if(isLab(target)) {
				var lab = null;

				labs.forEach(function(l) {
					if(l.data.type === target) {
						lab = l;
					}
				});

				return lab;
			}

			return null;
		};

		var x = this.game.world.centerX;
		var y = this.game.world.centerY;

		// set up the labs
		labs = new LabGroup(this.game);
		labs.createLabs(x, y);

		// set up the player
		player = new Player(this.game, x, y);
		this.game.camera.follow(player);

		var aliens = [
			new Alien(this.game, x - 300, y - 100, {
				target: constants.PLAYER,
				aggression: 1
			}),
			new Alien(this.game, x - 300, y - 100, {
				target: constants.CIVILIAN
			}),
			new Alien(this.game, x - 300, y - 100, {
				target: { x: x, y: y}
			}),
			new Alien(this.game, x - 300, y - 100, {
				target: null
			}),
			new Alien(this.game, x - 300, y - 100)
		];

	};

	GamePlay.prototype.update = function() {
		// see if the play is in a lab
		labs.forEach(function(lab) {
			if(lab.overlap(player)) {
				console.log("player is in lab " + lab.data.type);
			}
		});
	};

	GamePlay.prototype.render = function() {
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		//this.game.debug.spriteCoords(alien, 32, 750);
	};

	return GamePlay;
});