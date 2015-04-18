
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");

	// TODO add icon
	// TODO add possibility to set colour
	var StatusBar = function(game, x, y, width, height, owner, stat, colour) {
		Phaser.TileSprite.call(this, game, x, y, width, height, "status");

		this.fixedToCamera = true;

		game.add.existing(this);

		colour = colour || "rgba(255, 0, 0, 0.7)";

		this.owner = owner;
		this.stat = stat;
		this.maxValue = this.owner.data[this.stat];
		this.rectangle = new Phaser.Rectangle(x, y, width, height);

		var fill = game.add.bitmapData(width, height);

		fill.context.fillStyle = colour;
		fill.context.beginPath();
		fill.context.rect(0, 0, width, height);
		fill.context.fill();

		var outline = game.add.bitmapData(width, height);

		outline.context.beginPath();
		outline.context.rect(0, 0, width, height);
		outline.context.strokeStyle = "#222";
		outline.context.lineWidth = 3;
		outline.context.stroke();

		this.bar = game.add.sprite(x, y, fill);
		this.bar.fixedToCamera = true;

		this.border = game.add.sprite(x, y, outline);
		this.border.fixedToCamera = true;
	};

	inherits(StatusBar, Phaser.TileSprite);

	StatusBar.prototype.update = function() {
		var value = this.owner.data[this.stat] / this.maxValue;

		if(value < 0)
			value = 0;

		this.game.add.tween(this.bar.scale).to({ x: value }, 100).start();
	};

	StatusBar.prototype.hide = function() {
		this.visible = this.bar.visible = this.border.visible = false;
	};

	StatusBar.prototype.show = function() {
		this.visible = this.bar.visible = this.border.visible = true;
	};

	return StatusBar;
});