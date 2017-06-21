class BeePicker {
	private bees: Array<Bee> = undefined;
	private beeGroup: Phaser.Group;

	public constructor(game: Phaser.Game) {
		this.bees = new Array<Bee>();
		this.beeGroup = new Phaser.Group(game);
		
		for (var i = 0; i < 5; i++)
		{
			this.bees.push(new Bee(Math.floor(Math.random() * (NUMBER_OF_BEE_COLORS + 1))));
			this.beeGroup.create(BEE_START_X + i * BEE_DELTA_X, BEE_START_Y,TEXTURE_BEE_MAP, 0);
		}
	}

	public draw() {
		for (var i = 0; i < 5; i++)
		{
			var sprite = <Phaser.Sprite>this.beeGroup.children[i];
			sprite.frame = this.bees[i].color;
			sprite.alpha = this.bees[i].isSelected ? 0.5 : 1.0;
		}
	}

	public markSelectedBee(x: number) {
		let index = Math.floor(x / BEE_DELTA_X);
		this.bees[index].isSelected = true;
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