
define(function(require) {
	// object imports
	var Player = require("../objects/player");
	var Alien = require("../objects/alien");
	var Labs = require("../objects/lab");
	var Collectables = require("../objects/collectables");
	var StatusBar = require("../objects/status-bar");
	var Inventory = require("../objects/inventory");

	// helper imports
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");

	// objects
	var player, labs, collectable;

	// keyboard
	var cursors, fire, activate;

	// HUD elemenys
	var health, civilians, aBomb, bugs, inventory;

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

		// HUD
		inventory = new Inventory(this.game, 790, 790);
		health    = new StatusBar(this.game, 640, 15, player, "toughness", "heart", constants.BAD_COLOUR);
		civilians = new StatusBar(this.game, 640, 40, player, "civilians", "person", constants.BAD_COLOUR);
		aBomb     = new StatusBar(this.game, 20, 15, player, "atomBomb", "rocket", constants.GOOD_COLOUR, 100);
		bugs      = new StatusBar(this.game, 20, 40, player, "bugs", "lightning", constants.GOOD_COLOUR, 100);

		bugs.hide();

		collectables = new Collectables(this.game);

		// this needs to happen on a timer
		collectables.addRandomWeapon();
		//collectables.addGun();
		//collectables.addSpray();
		//collectables.addBomb();

		// as does this
		for(var i = 0; i < 10; ++i) {
			collectables.addRandomChemical();
		}

		// alien tests
		var aliens = [
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
		];


		// set up player controls
		cursors  = this.game.input.keyboard.createCursorKeys();
		fire     = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		activate = this.game.input.keyboard.addKey(Phaser.Keyboard.B);

		this.pause = false;
	};

	GamePlay.prototype.update = function() {
		if(this.pause) {
			return;
		}

		// handle player movement
		var vector = new Phaser.Point();

		if(cursors.left.isDown) {
			vector.x = -1;
		}
		else if(cursors.right.isDown) {
			vector.x = 1;
		}

		if(cursors.up.isDown) {
			vector.y = -1;
		}
		else if(cursors.down.isDown) {
			vector.y = 1;
		}

		player.move(vector);

		if(fire.isDown) {
			console.log("firing")
		}

		if(activate.isDown) {
			// see if the play is in a lab
			labs.forEach(function(lab) {
				if(lab.overlap(player)) {
					lab.activate(this, player);
				}
			}.bind(this));
		}

		// handle collisions for pick ups
		this.game.physics.arcade.collide(player, collectables, this.collectableCollision, null, this);
	};


	GamePlay.prototype.collectableCollision = function(player, object) {
		if(player.addInventoryItem(object)) {
			collectables.removeChild(object);
			inventory.addInventoryItem(object.key);
		}
	};

	GamePlay.prototype.render = function() {
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
		//this.game.debug.spriteCoords(this.inventory.getAt(0), 32, 750);
	};

	return GamePlay;
});