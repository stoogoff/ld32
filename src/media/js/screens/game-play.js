
define(function(require) {
	var Player = require("../objects/player");
	var Lab = require("../objects/lab");

	var GamePlay = function() {
		Phaser.State.call(this);
	};

	GamePlay.prototype.create = function() {
		this.game.add.tileSprite(0, 0, 800, 800, "bg");
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = new Player(this.game, 0, 0);

		var lab = new Lab(this.game, 100, 100);
	};

	return GamePlay;
});