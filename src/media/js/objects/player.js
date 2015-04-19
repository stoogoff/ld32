define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var _ = require("underscore");

	// import objects
	var Weapon = require("./weapon");

	// module vars
	var SPEED = 400, MAX_CARRY = 10;

	var Player = function(game, x, y, frame) {
		this.data = {
			toughness: 100,
			civilians: 1000,
			weapon: null,
			inventory: []
		};

		// phaser related stuff
		Phaser.Sprite.call(this, game, x, y, "player", frame);

		// set physics and game specific stuff
		game.physics.arcade.enable(this);
		game.add.existing(this);

		this.animations.add("walk", null, 10);

		this.body.collideWorldBounds = true;
		this.anchor.setTo(0.5, 0.5);

		this.inventoryCallbacks = [];
		this.facing = "left";
	};

	inherits(Player, Phaser.Sprite);

	Player.prototype.stop = function() {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	};

	Player.prototype.move = function(vector) {
		this.body.velocity.x = vector.x * SPEED;
		this.body.velocity.y = vector.y * SPEED;

		if(vector.x !== 0 || vector.y !== 0) {
			this.animations.play("walk");

			if(vector.x > 0) {
				this.scale.setTo(-1, 1);
				this.facing = "right";
			}
			else if(vector.x < 0) {
				this.scale.setTo(1, 1);
				this.facing = "left";
			}
		}
		else {
			this.animations.stop("walk");
			this.frame = 0;
		}
	};

	Player.prototype.isDead = function() {
		return this.data.toughness <= 0;
	};

	Player.prototype.addInventoryItem = function(sprite) {
		// full up!
		if(this.data.inventory.length >= MAX_CARRY) {
			return false;
		}

		sprite = sprite.data;

		if(_.contains(this.data.inventory, sprite)) {
			return false;
		}

		this.data.inventory.push(sprite);

		this.inventoryCallbacks.forEach(function(cb) {
			cb.callback.call(cb.context, this.data.inventory);
		}.bind(this));

		return true;
	};

	Player.prototype.removeInventoryItem = function(data) {
		if(_.contains(this.data.inventory, data)) {
			this.data.inventory = _.without(this.data.inventory, data);

			this.inventoryCallbacks.forEach(function(cb) {
				cb.callback.call(cb.context, this.data.inventory);
			}.bind(this));

			return true;
		}

		return false;
	};

	Player.prototype.onUpdateInventory = function(context, callback) {
		this.inventoryCallbacks.push({
			context: context,
			callback: callback
		});
	};

	Player.prototype.createWeapon = function(selected) {
		this.weapon = new Weapon(this);

		selected.forEach(function(component) {
			this.weapon.addComponent(component);
		}.bind(this));
	};

	Player.prototype.fire = function() {
		if(this.weapon) {
			return this.weapon.fire(this.game, this.x, this.y, this.facing === "left" ? -1 : 1);
		}

		return null;
	};

	return Player;
});