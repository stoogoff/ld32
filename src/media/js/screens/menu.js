
define(function(require) {
	var Menu = function() {
		Phaser.State.call(this);
	};

	Menu.prototype = {
		create: function() {
			var music = this.game.add.audio("doom-upon-us", 1, true);

			music.play("", 0, 1, true);

			//this.game.stage.background = this.game.add.image(0, 0, 'sea');

			var message = [
				"Earth is being invaded by aliens and only you can stop them!",
				"Your weapons are:",
				"The Atom Bomb: Destroy everything in the blast radius! Be warned, distant enemies may become… strange.",
				"The Biological Virus: Create viral bugs and set them set on the aliens. Be warned, some bugs may make the aliens stronger.",
				"The Chemicals: Use your chemistry skills to create strange weapons of your own and fight off the aliens your self!",
				"",
				"Cursor keys to move. Spacebar to fire and activate the science labs.",
				"Collect the things and use them to build chemical and biological weapons to fight off the aliens.",
				"Protect the civilian base and, as a last resort, activate the atomic bomb lab to destroy everything.",
				"Click anywhere to start!"
			];

			this.titleText = this.game.add.text(this.game.world.centerX, 50, "ABC Worriers", { font: "65px Arial", fill: "#ffffff", align: "center" });
			this.titleText.anchor.setTo(0.5, 0);

			this.infoText = this.game.add.text(this.game.world.centerX, 150, message.join('\n\n'), { font: "16px Arial", fill: "#ffffff", align: "left"});
			this.infoText.anchor.setTo(0.5, 0);
			this.infoText.wordWrap = true;
			this.infoText.wordWrapWidth = 500;
		},
		update: function() {
			if(this.game.input.activePointer.justPressed()) {
				this.game.state.start("play");
			}
		}
	};

	return Menu;
});