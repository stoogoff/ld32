
define(function(require) {
	// imports
	var inherits = require("../utils/inherits");
	
	var PAD = 6;

	var InventoryItem = function(game, x, y, image) {
		Phaser.Sprite.call(this, game, x, y, image);

		this.fixedToCamera = true;
		this.anchor.setTo(1, 1);

		var outline = game.add.bitmapData(this.width + PAD, this.height + PAD);

		outline.context.beginPath();
		outline.context.rect(0, 0, this.width + PAD, this.height + PAD);
		outline.context.strokeStyle = "#222";
		outline.context.lineWidth = PAD;
		outline.context.stroke();

		this.border = game.add.sprite(x + PAD / 2, y + PAD / 2, outline);
		this.border.anchor.setTo(1, 1);
		this.border.fixedToCamera = true;
	};

	inherits(InventoryItem, Phaser.Sprite);

	var Inventory = function(game, x, y) {
		Phaser.Group.call(this, game);

		this.x = x;
		this.y = y;
		this.grid = 0;

		this.childX = 0;
		this.childY = 0;
	};

	inherits(Inventory, Phaser.Group);

	Inventory.prototype.addInventoryItem = function(image) {
		var item = new InventoryItem(this.game, this.childX, this.childY, image);

		this.add(item);
		this.add(item.border);
		this.childX -= item.width + PAD / 2;

		if(++this.grid > 10) {
			this.grid = 0;
			this.childY -= item.height + PAD / 2;
		}
	};

	// TODO remove inventory item

	return Inventory;
});