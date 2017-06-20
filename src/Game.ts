class BizzyBeesGame
{
	game:Phaser.Game;
	backgroundTexture: Phaser.Sprite;
	foregroundTexture: Phaser.Sprite;
	hudTexture: Phaser.Sprite;
	flowerMapTexture: Phaser.Sprite;
	score: number = 0;
	scoreText: Phaser.Text;

	private columns : Array<Column>;
	private gameOver : boolean = false;
	private beePicker : BeePicker = undefined;
	private selectedBee : Bee = undefined;

	constructor() {
		this.game = new Phaser.Game( 480, 800, Phaser.AUTO, 'content', { 
			preload: this.preload,
			create:  this.create,
			// update:  this.update,
			render:  this.render
		} );
	}
	
	preload() {
		this.game.load.image( TEXTURE_BACKGROUND, "assets/GameScreenBackground.png" );
		this.game.load.image( TEXTURE_FOREGROUND, "assets/GameScreenForeground.png" );
		this.game.load.image( TEXTURE_HUD, "assets/HUDBackground.png" );
		this.game.load.spritesheet( TEXTURE_FLOWER_MAP, "assets/flowermap.png", 72, 72, 7);
		this.game.load.spritesheet( TEXTURE_BEE_MAP, "assets/beemap.png", 91, 91, 6);
	}
	
	create() {
		this.backgroundTexture = this.game.add.sprite( 0, 0, TEXTURE_BACKGROUND );
		this.foregroundTexture = this.game.add.sprite( 0, 0, TEXTURE_FOREGROUND );
		this.hudTexture = this.game.add.sprite( 7,7, TEXTURE_HUD );

		this.game.add.text(42, 10, "Marathon", { font: "24px Arial", fill: "#00f" });

		this.scoreText = this.game.add.text(127, 45, "0", { font: "34px Arial" });
		this.scoreText.visible = true;

		this.columns = new Array<Column>();
		for (let i = 0; i < 5; i++)
		{
			this.columns.push(new Column(i * 92 + 22));
		}
		this.beePicker = new BeePicker(this.game);
	}

	update() {
		if (!this.gameOver)
		{
			//Handle user interaction
			// while (TouchPanel.IsGestureAvailable)
			// {
			// 	GestureSample gesture = TouchPanel.ReadGesture();
			// 	if (gesture.GestureType == GestureType.Tap)
			// 	{
			// 		HandleInput(gesture.Position);
			// 	}
			// }

			this.columns.forEach(element => {
				element.update();
				if (element.reachedBottom)
				{
					this.gameOver = true;
					return;
				}
			});
		}
	}

	private handleInput(position: Phaser.Point)	{
		if (position.x > 0 && position.x < 480 && position.y > 700 && position.y < 800)
			this.handleBeeSelection(position.x);
		else if (this.selectedBee != null)
			this.handleFlowerSelection(position.x, position.y);
	}

	private handleFlowerSelection(x: number, y: number) {
		//verify that we are tapping inside a column
		if (x > 10 && x < 470 && y > 100 && y < 700)
		{
			let rainbowColor = 6;
			let selectedColumnIndex = Math.floor((x - 10) / 92);
			let selectedColumn = this.columns[selectedColumnIndex];
			let selectedFlower = selectedColumn.getBottomFlower();

			//check if we have a match or if it was a rainbow flower
			if(selectedFlower != null && (selectedFlower.color == this.selectedBee.color || selectedFlower.color == rainbowColor))
			{
				//remove the bottom flower
				selectedColumn.removeBottomFlower();
				
				//replace the bee - making sure that there is always a match by passing in a list of all the bottom flower colors
				let availableFlowers = this.getAvailableFlowers();
				this.beePicker.removeAndReplaceBee(this.selectedBee, availableFlowers);

				//deselect the bee
				this.beePicker.deselectAll();
				this.selectedBee = null;

				//if it was a rainbow flower - add points
				if (selectedFlower.color == rainbowColor)
				{
					this.score++;
					//if we reached 10, 20, 30... points, increase the velocity to make the game harder as we go along
					if ((this.score % 10) == 0)
					{
						this.columns.forEach(element => {
							element.velocity += 0.1;
						});
					}
				}
			}
		}
	}

	private getAvailableFlowers() : Array<number> {
		let flowerColors = new Array<number>();
		this.columns.forEach(element => {
			let f = element.getBottomFlower();
			if (f != null)
				flowerColors.push(f.color);
			
		})
		return flowerColors;
	}

	private handleBeeSelection(x: number) {
		//first de-select any previously selected bee
		if (this.selectedBee != null)
		{
			this.selectedBee.isSelected = false;
			this.selectedBee = null;
		}
		//Mark and select the new bee
		this.beePicker.markSelectedBee(x);
		this.selectedBee = this.beePicker.getSelectedBee(x);
	}

	render() {
		//GraphicsDevice.Clear(Color.CornflowerBlue);

		//spriteBatch.Begin();
		//spriteBatch.Draw(backgroundTexture, Vector2.Zero, Color.White);

		if (!this.gameOver)
		{
			this.columns.forEach(element =>{
				element.draw();	
			});
			this.beePicker.draw();
		}
		else
		{
			//spriteBatch.DrawString(largeFont, "GAME OVER", new Vector2(150, 400), Color.Red);
		}
		
		//spriteBatch.Draw(foregroundTexture, Vector2.Zero, Color.White);
		//this.drawHUD();
	}

	private drawHUD() {
		// spriteBatch.Draw(hudTexture, new Vector2(7, 7), Color.White);
		// //Print out game score and level
		// spriteBatch.DrawString(mediumFont, "Marathon", new Vector2(40, 10), Color.Blue);
		// spriteBatch.DrawString(largeFont, score.ToString(), new Vector2(127, 45), Color.Yellow);
		// //TODO: Draw a flower on the HUD
		// spriteBatch.Draw(flowerMapTexture, new Vector2(40, 45), new Rectangle(6*72, 0, 72, 72), Color.White, 0, Vector2.Zero, 0.5f, SpriteEffects.None, 0f);
		// //Print out instructions
		// spriteBatch.DrawString(smallFont, "Match flowers and bees", new Vector2(210, 10), Color.Yellow);
		// spriteBatch.DrawString(smallFont, "Rainbow flowers match", new Vector2(206, 30), Color.Yellow);
		// spriteBatch.DrawString(smallFont, "with all bees", new Vector2(260, 50), Color.Yellow);
		// //Print out goal message
		// spriteBatch.DrawString(largeFont, "Collect Rainbow Flowers", new Vector2(50, 115), Color.Blue);
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new BizzyBeesGame();
}