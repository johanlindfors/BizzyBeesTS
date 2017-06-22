class BizzyBeesGame
{
	game:Phaser.Game;
	backgroundTexture: Phaser.Sprite;
	foregroundTexture: Phaser.Sprite;
	hudTexture: Phaser.Sprite;
	flowerMapTexture: Phaser.Sprite;
	score: number;
	level: number;
	scoreText: Phaser.Text;
	levelText: Phaser.Text;
	gameOverText: Phaser.Text;

	private columns : Array<Column>;
	private gameOver : boolean = false;
	private beePicker : BeePicker = undefined;
	private selectedBee : Bee = undefined;

	constructor() {
		this.game = new Phaser.Game( 480, 800, Phaser.AUTO, 'content', { 
			preload: this.preload,
			create:  this.create,
			update:  this.update,
			render:  this.render
		});
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

		this.game.add.text(100, 28, "Marathon", FONT_MEDIUM).anchor.set(0.5,0.5);
		//Print out instructions
		this.game.add.text(340, 28, "Match flowers and bees", FONT_SMALL).anchor.set(0.5,0.5);
		this.game.add.text(340, 55, "Rainbow flowers match", FONT_SMALL).anchor.set(0.5,0.5);
		this.game.add.text(340, 80, "with all bees", FONT_SMALL).anchor.set(0.5,0.5);
		//Print out goal message
		this.game.add.text(240, 130, "Collect Rainbow Flowers", FONT_LARGE).anchor.set(0.5,0.5);

		this.scoreText = this.game.add.text(140, 65, "0", { font: "34px Arial" });
		this.scoreText.visible = true;
		this.scoreText.anchor.set(0.5,0.5);
		this.score = 0;

		this.levelText = this.game.add.text(55, 65, "1", { font: "34px Arial" });
		this.levelText.visible = true;
		this.levelText.anchor.set(0.5,0.5);
		this.level = 1;

		this.columns = new Array<Column>();
		for (let i = 0; i < 5; i++)
		{
			this.columns.push(new Column(this.game, i * 92 + 22));
		}
		this.beePicker = new BeePicker(this.game);

		this.gameOverText = this.game.add.text(240, 400,"GAME OVER", FONT_HUGE);
		this.gameOverText.anchor.set(0.5,0.5);
		this.gameOverText.visible = false;
	}

	update() {
		if (!this.gameOver)
		{
			if(this.game.input.activePointer.justPressed()){
				var position = this.game.input.activePointer.position;
				if (position.x > 0 && position.x < 480 && position.y > 700 && position.y < 800){
					//first de-select any previously selected bee
					if (this.selectedBee != null)
					{
						this.selectedBee.isSelected = false;
						this.selectedBee = null;
					}
					//Mark and select the new bee
					this.beePicker.deselectAll();
					this.beePicker.markSelectedBee(position.x);
					this.selectedBee = this.beePicker.getSelectedBee(position.x);
				}
				else if (this.selectedBee != null){
					//verify that we are tapping inside a column
					if (position.x > 10 && position.x < 470 && position.y > 100 && position.y < 700)
					{
						let rainbowColor = 6;
						let selectedColumnIndex = Math.floor((position.x - 10) / 92);
						let selectedColumn = this.columns[selectedColumnIndex];
						let selectedFlower = selectedColumn.getBottomFlower();

						//check if we have a match or if it was a rainbow flower
						if(selectedFlower != null && (selectedFlower.color == this.selectedBee.color || selectedFlower.color == rainbowColor))
						{
							//remove the bottom flower
							selectedColumn.removeBottomFlower();
							
							//replace the bee - making sure that there is always a match by passing in a list of all the bottom flower colors
							let flowerColors = new Array<number>();
							this.columns.forEach(element => {
								let f = element.getBottomFlower();
								if (f != null)
									flowerColors.push(f.color);
								
							})
							this.beePicker.removeAndReplaceBee(this.selectedBee, flowerColors);

							//deselect the bee
							this.beePicker.deselectAll();
							this.selectedBee = null;

							//if it was a rainbow flower - add points
							if (selectedFlower.color == rainbowColor)
							{
								this.score += 1;
								this.scoreText.text = "" + this.score;
								//if we reached 10, 20, 30... points, increase the velocity to make the game harder as we go along
								if ((this.score % 10) == 0)
								{
									this.level += 1;
									this.levelText.text = "" + this.level;

									this.columns.forEach(element => {
										element.velocity += 0.1;
									});
								}
							}
						}
					}
				}
			}

			this.columns.forEach(element => {
				element.update();
				if (element.reachedBottom)
				{
					this.gameOver = true;
					this.gameOverText.visible = true;
					return;
				}
			});
		}
		else {
			if(this.game.input.activePointer.justPressed()){
				this.columns.forEach(element => {
					element.reset();
				});
				this.beePicker.reset();
				this.score = 0;
				this.scoreText.text = "" + this.score;
									
				this.level = 1;
				this.levelText.text = "" + this.level;

				this.gameOver = false;
				this.gameOverText.visible = false;
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

	render() {
		if (!this.gameOver)
		{			
			this.beePicker.draw();
		}
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new BizzyBeesGame();
}