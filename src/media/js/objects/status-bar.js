
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	// TODO add icon
	// TODO add possibility to set colour
	var StatusBar = function(game, x, y, owner, stat, icon, colour, maxValue) {
		var width = 150;
		var height = 15;

		Phaser.TileSprite.call(this, game, x, y, width, height, "status");

		this.fixedToCamera = true;

		game.add.existing(this);

		colour = colour || "rgba(255, 0, 0, 0.7)";

		this.owner = owner;
		this.stat = stat;
		this.maxValue = maxValue || this.owner.data[this.stat];
		this.rectangle = new Phaser.Rectangle(x, y, width, height);

		var fill = game.add.bitmapData(width, height);

		fill.context.fillStyle = colour;
		fill.context.beginPath();
		fill.context.rect(0, 0, width, height);
		fill.context.fill();

		var outline = game.add.bitmapData(width, height);

		outline.context.beginPath();
		outline.context.rect(0, 0, width, height);
		outline.context.strokeStyle = constants.BORDER_COLOUR;
		outline.context.lineWidth = constants.BORDER_WIDTH;
		outline.context.stroke();

		this.bar = game.add.sprite(x, y, fill);
		this.bar.fixedToCamera = true;

		this.border = game.add.sprite(x, y, outline);
		this.border.fixedToCamera = true;

		this.icon = game.add.sprite(x - 10, y - 5, icon);
		this.icon.fixedToCamera = true;
		this.icon.scale = new Phaser.Point(0.7, 0.7);
	};

	inherits(StatusBar, Phaser.TileSprite);

	StatusBar.prototype.update = function() {
		var value = this.owner.data[this.stat] / this.maxValue;

		if(value < 0)
			value = 0;

		this.game.add.tween(this.bar.scale).to({ x: value }, 100).start();
	};

	StatusBar.prototype.hide = function() {
		this.visible = this.icon.visible = this.bar.visible = this.border.visible = false;
	};

	StatusBar.prototype.show = function() {
		this.visible = this.icon.visible = this.bar.visible = this.border.visible = true;
	};

	return StatusBar;
});