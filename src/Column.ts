class Column extends Phaser.Group {
    // private flowers: Array<Flower>;
    // private flowersGroup: Phaser.Group;
    private col: number;

    velocity : number = INITAL_VELOCITY;

    public constructor(game: Phaser.Game, col: number) {
        super(game);

        this.col = col * FLOWER_COLUMN_WIDTH + FLOWER_COLUMN_MARGIN;
        //this.flowerMap = content.Load<Texture2D>("flowermap");
        this.reset();
        
        var mask = game.add.graphics(0,0);
        mask.beginFill(0xFFFFFF);
        mask.drawRect(this.col, 170,100,650);
        this.mask = mask;
    }

    public reset() {
        this.removeAll();

        //add 3 flowers
        this.addRandomFlower(this.col, COLUMN_TOP + 2 * FLOWER_DELTA_Y);
        this.addRandomFlower(this.col, COLUMN_TOP + FLOWER_DELTA_Y);
        this.addRandomFlower(this.col, COLUMN_TOP);

        this.velocity = INITAL_VELOCITY;
        this.alive = true;
    }

    get reachedBottom(): boolean {
        return (this.length != 0 && this.children[0].y >= COLUMN_BOTTOM);
    }

    private addRandomFlower(x: number, y: number) {
        let color = Math.floor(Math.random() * (NUMBER_OF_FLOWER_COLORS + 1));
        let flower = new Flower(this.game,x,y,TEXTURE_FLOWER_MAP,color);
        this.add(flower);
    }

    public update() {
        if(this.alive){

            this.children.forEach(element => {
                element.y += this.velocity;
            });

            if (this.children.length == 0 || this.children[this.length - 1].y > COLUMN_TOP)
                this.addRandomFlower(this.col, COLUMN_TOP - FLOWER_DELTA_Y);
        }
    }

    public getBottomFlower() : any {
        if (this.length > 0)
            return this.children[0];
        else
            return null;
    }

    removeBottomFlower() {
        if (this.length > 0){
            this.removeChildAt(0);
        }
    }
}