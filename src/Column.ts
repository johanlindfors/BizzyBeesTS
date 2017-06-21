class Column {
    private flowers: Array<Flower>;
	private flowersGroup: Phaser.Group;
	private x: number;

	velocity : number = 0.4;

	public constructor(game: Phaser.Game, x: number) {
		this.x = x;
		this.flowers = new Array<Flower>();
		this.flowersGroup = new Phaser.Group(game);
		//this.flowerMap = content.Load<Texture2D>("flowermap");

		//add 3 flowers
		this.addRandomFlower(x, COLUMN_TOP + 2 * FLOWER_DELTA_Y);
		this.addRandomFlower(x, COLUMN_TOP + FLOWER_DELTA_Y);
		this.addRandomFlower(x, COLUMN_TOP);

		var mask = game.add.graphics(0,0);
		mask.beginFill(0xFFFFFF);
		mask.drawRect(x, 170,100,650);
		this.flowersGroup.mask = mask;
	}

	get reachedBottom(): boolean {
		return (this.flowersGroup.length != 0 && this.flowersGroup.children[0].y >= COLUMN_BOTTOM);
	}

	private addRandomFlower(x: number, y: number) {
		let color = Math.floor(Math.random() * (NUMBER_OF_FLOWER_COLORS + 1));
		this.flowersGroup.create(x,y,TEXTURE_FLOWER_MAP,color);
		this.flowers.push(new Flower(color, x, y));
	}

	public update() {
		this.flowersGroup.children.forEach(element => {
			element.y += this.velocity;
		});

		if (this.flowersGroup.children.length == 0 || this.flowersGroup.children[this.flowersGroup.children.length - 1].y > COLUMN_TOP)
			this.addRandomFlower(this.x, COLUMN_TOP - FLOWER_DELTA_Y);
	}

	public getBottomFlower() : Flower {
		if (this.flowers.length > 0)
			return this.flowers[0];
		else
			return null;
	}

	removeBottomFlower() {
		if (this.flowersGroup.children.length > 0)
			this.flowersGroup.children.splice(0,1);
			this.flowers.splice(0,1);
	}
}