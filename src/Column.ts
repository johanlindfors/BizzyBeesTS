class Column {
    private flowers: Array<Flower>;
	private x: number;

	velocity : number = 0.4;

	public constructor(x: number)
	{
		this.x = x;
		this.flowers = new Array<Flower>();
		//this.flowerMap = content.Load<Texture2D>("flowermap");

		//add 3 flowers
		this.addRandomFlower(x, COLUMN_TOP + 2 * FLOWER_DELTA_Y);
		this.addRandomFlower(x, COLUMN_TOP + FLOWER_DELTA_Y);
		this.addRandomFlower(x, COLUMN_TOP);
	}

	get reachedBottom(): boolean {
		 if (this.flowers.length != 0 && this.flowers[0].y >= COLUMN_BOTTOM)
            return true;
        else
            return false;	
	}

	private addRandomFlower(x: number, y: number)
	{
		let color = Math.floor(Math.random() * (NUMBER_OF_FLOWER_COLORS + 1));
		this.flowers.push(new Flower(color, x, y));
	}

	public update()
	{
		// this.flowers.forEach(element => {
		// 	element.Y += this.velocity;
		// });

		// if (this.flowers.length == 0 || this.flowers[this.flowers.length - 1].Y > COLUMN_TOP)
		// 	this.addRandomFlower(this.x, COLUMN_TOP - FLOWER_DELTA_Y);
	}

	public draw()
	{
		this.flowers.forEach(element => {
			//spriteBatch.Draw(flowerMap, new Vector2(value.X, value.Y), new Rectangle(value.Color * flowerWidth, 0, flowerWidth, flowerHeight), Color.White);
		});
	}

	public getBottomFlower() : Flower
	{
		if (this.flowers.length > 0)
			return this.flowers[0];
		else
			return null;
	}

	removeBottomFlower()
	{
		if (this.flowers.length > 0)
			this.flowers.splice(0,1);
	}
}