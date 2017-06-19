class BeePicker {
	private bees: Array<Bee> = undefined;
	// private SpriteBatch spriteBatch;
	// private Texture2D beeMap;

	public constructor() {
		//beeMap = content.Load<Texture2D>("beemap");
		//this.spriteBatch = spriteBatch;
		this.bees = new Array<Bee>();
		
		for (var i = 0; i < 5; i++)
		{
			this.addRandomBee();
		}
	}

	private addRandomBee() {
		this.bees.push(new Bee(Math.floor(Math.random() * (NUMBER_OF_BEE_COLORS + 1))));
	}

	public draw() {
		for (var i = 0; i < 5; i++)
		{
			//if(this.bees[i].IsSelected)                    
			//	spriteBatch.Draw(beeMap, new Vector2(beeStartX + i * beeDeltaX, beeStartY), new Rectangle(bees[i].Color * 91, 0, 91, 91), Color.DimGray);
			//else
			//	spriteBatch.Draw(beeMap, new Vector2(beeStartX + i * beeDeltaX, beeStartY), new Rectangle(bees[i].Color * 91, 0, 91, 91), Color.White);
		}
	}

	public markSelectedBee(x: number) {
		this.getSelectedBee(x).isSelected = true;
	}

	public getSelectedBee(x: number) : Bee {
		let index = Math.floor(x / BEE_DELTA_X);
		return this.bees[index];
	}

	public removeAndReplaceBee(selectedBee: Bee, availableFlowers: Array<number>) {
		let beeIndex = this.bees.indexOf(selectedBee);

		//check if we already have a bee that matches the available flowers 
		//remember to skip over the selectedBee since it will be removed in a moment
		let match = false;
		let rainbowColor = 6;

		//if there is a rainbow flower it will always match
		if (rainbowColor in availableFlowers)
			match = true;
		else
		{
			for (let i = 0; i < this.bees.length; i++)
			{
				if(i != beeIndex && this.bees[i].color in availableFlowers){
					match = true;
					break;
				}
			}
		}

		var color;
		if(match){
			//we already have a match, just add a random colored bee
			color = Math.floor(Math.random() * (NUMBER_OF_BEE_COLORS + 1));
		}
		else{
			//we have no match so we must pick a color from the available colors
			color = availableFlowers[Math.floor(Math.random() * (availableFlowers.length + 1))];
		}

		//set the selected bee to the new color to "create" a new bee
		this.bees[beeIndex].color = color;
	}

	public deselectAll() {
		this.bees.forEach(element => {
			element.isSelected = false;
		});
	}
}