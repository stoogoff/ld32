
define(function(require) {
	// object imports
	var Player = require("../objects/player");
	var Alien = require("../objects/alien");
	var Labs = require("../objects/lab");
	var Collectables = require("../objects/collectables");
	var WeaponType = require("../objects/weapon-type");

	// helper imports
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");

	var player, labs, collectable;

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

			if(helpers.isLab(target)) {
				var lab = null;

				labs.forEach(function(l) {
					if(l.data.type === target) {
						lab = l;
					}
				});

				return lab;
			}

			// TODO add alien look up

			return null;
		};

		var x = this.game.world.centerX;
		var y = this.game.world.centerY;

		// set up the labs
		labs = new Labs(this.game);
		labs.createLabs(x, y);

		// set up the player
		player = new Player(this.game, x, y);
		this.game.camera.follow(player);


		collectables = new Collectables(this.game);
		collectables.addGun(250, 350);
		collectables.addSpray(300, 350);
		collectables.addBomb(350, 350);

		/*var aliens = [
			new Alien(this.game, x - 300, y - 100, {
				target: constants.PLAYER,
				aggression: 0.5,
				distance: 200
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
		];*/

	};

	GamePlay.prototype.update = function() {
		// see if the play is in a lab
		labs.forEach(function(lab) {
			if(lab.overlap(player)) {
				console.log("player is in lab " + lab.data.type);
			}
		});

		// handle collisions for pick ups
		this.game.physics.arcade.collide(player, collectables, this.collectableCollision, null, this);
	};


	GamePlay.prototype.collectableCollision = function(player, object) {
		player.addInventoryItem(object);
		console.log(player.data.inventory.length)

		collectables.removeChild(object);
	};

	GamePlay.prototype.render = function() {
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		//this.game.debug.spriteCoords(this.inventory.getAt(0), 32, 750);
	};

	return GamePlay;
});