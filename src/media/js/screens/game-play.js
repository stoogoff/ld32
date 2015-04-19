
define(function(require) {
	// object imports
	var Player = require("../objects/player");
	var Aliens = require("../objects/alien");
	var Labs = require("../objects/lab");
	var Collectables = require("../objects/collectables");
	var StatusBar = require("../objects/status-bar");
	var Inventory = require("../objects/inventory").Inventory;
	var AtomBomb = require("../objects/atom-bomb");

	// helper imports
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");

	// objects
	var player, labs, collectable, bomb;

	// some basic timers
	var attackTimer = 0, civiliansTimer = 0;

	// keyboard
	var cursors, activate;

	// HUD elements
	var health, civilians, aBomb, bugs, inventory;

	var GamePlay = function() {
		Phaser.State.call(this);
	};

	GamePlay.prototype.create = function() {
		// basic world stuff
		this.game.stage.backgroundColor = "#584838";
		this.game.add.tileSprite(0, 0, constants.WORLD_WIDTH, constants.WORLD_HEIGHT, "background");
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

		// set up the alien bases
		aliens = new Aliens(this.game);
		aliens.addSpawnPoints();

		// this needs to be on a timer and from four specific points
		for(var i = 0; i < 10; ++i) {
			aliens.addAlien();
		}

		collectables = new Collectables(this.game);

		// DELME
		collectables.addGun();
		collectables.addGun();
		collectables.addBomb();
		collectables.addBomb();

		// add starting collectible
		collectables.addRandomWeapon();
		collectables.addRandomChemicals(3);
		collectables.timer = this.game.time.events.loop(Phaser.Timer.SECOND * 20, function() {
			// TODO better creation method than just popping into place
			// TODO could make sure they're off screen
			this.addRandomWeapon();
			this.addRandomChemicals(3);
		}, collectables);
		
		collectables.timer.timer.start();

		// set up the player
		player = new Player(this.game, x, y);
		this.game.camera.follow(player);

		// non-display objcts
		bomb = new AtomBomb(this.game);

		// HUD
		inventory = new Inventory(this.game, 790, 790);
		health    = new StatusBar(this.game, 640, 15, player.data, "toughness",    "heart",     constants.BAD_COLOUR);
		civilians = new StatusBar(this.game, 640, 40, player.data, "civilians",    "person",    constants.BAD_COLOUR);
		aBomb     = new StatusBar(this.game, 20,  15, bomb,        "completeness", "rocket",    constants.GOOD_COLOUR, 100);
		bugs      = new StatusBar(this.game, 20,  40, player.data, "bugs",         "lightning", constants.GOOD_COLOUR, 100);

		bugs.hide();

		// set up player controls
		cursors  = this.game.input.keyboard.createCursorKeys();
		activate = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		// whether or not a lab overlay is active
		this.activeOverlay = false;
	};

	GamePlay.prototype.update = function() {
		bomb.update();

		if(this.activeOverlay) {
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

		/*if(fire.isDown) {
			console.log("firing")
		}*/

		// handle collisions for pick ups
		collectables.collision(player, this.playersVsCollectable, this);

		// handle collisions for player and aliens
		this.game.physics.arcade.collide(player, aliens, this.playerVsAliens, null, this);

		var hasActivated = false;

		// check for activate inside labs and aliens in labs
		// if the activate button isn't used (e.g. civilian lab) then the player can fire
		labs.forEach(function(lab) {
			// see if the play is in a lab
			if(activate.isDown) {
				if(lab.overlap(player)) {
					if(lab.isAtomic() && bomb.isReady()) {
						bomb.fire(collectables, aliens);
						hasActivated = true;
					}
					else if(!lab.isCivilian()) {
						lab.activate(this, player);
						hasActivated = true;
					}
				}
			}

			// handle collision between aliens and the civilian lab
			if(lab.isCivilian()) {
				var damage = 0;

				aliens.forEach(function(alien) {
					if(lab.overlap(alien)) {
						damage += alien.data.strength;
					}
				}.bind(this));

				// civilians only takes damage every 400 milliseconds from a direct attack
				if(this.game.time.now > civiliansTimer) {
					player.data.civilians -= this.game.math.clamp(damage, 0, 100);
					civiliansTimer = this.game.time.now + 400;
				}
			}
		}.bind(this));

		// a useful activate hasn't happened so fire
		if(activate.isDown && !hasActivated) {
			console.log("FIRE!")
		}

		// TODO bugs vs aliens
	};


	GamePlay.prototype.playersVsCollectable = function(player, inventoryItem) {
		if(player.addInventoryItem(inventoryItem)) {
			collectables.removeChild(inventoryItem);
			inventory.addInventoryItem(inventoryItem.key);
		}
	};

	GamePlay.prototype.playerVsAliens = function(player, alien) {
		// player only takes damage every 500 millisecond from a direct attack
		if(this.game.time.now > attackTimer) {
			player.data.toughness -= alien.data.strength;

			attackTimer = this.game.time.now + 500;
		}
	};

	GamePlay.prototype.render = function() {
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
		//this.game.debug.spriteCoords(this.inventory.getAt(0), 32, 750);
	};

	return GamePlay;
});