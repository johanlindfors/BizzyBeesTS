class Column extends Phaser.Group {
    velocity : number = INITAL_VELOCITY;

    public constructor(game: Phaser.Game, col: number) {
        super(game);
        game.add.existing(this);

        this.x = col * FLOWER_COLUMN_WIDTH + FLOWER_COLUMN_MARGIN;
        this.classType = Flower;

        this.reset();
        
        var mask = game.add.graphics(0,0);
        mask.beginFill(0xFFFFFF);
        mask.drawRect(this.x,170,100,650);
        this.mask = mask;
    }

    public reset() {
        this.removeAll();

        //add 3 flowers
        this.addRandomFlower(COLUMN_TOP + 2 * FLOWER_DELTA_Y);
        this.addRandomFlower(COLUMN_TOP + FLOWER_DELTA_Y);
        this.addRandomFlower(COLUMN_TOP);

        this.velocity = INITAL_VELOCITY;
        this.alive = true;
    }

    get reachedBottom(): boolean {
        return (this.length != 0 && this.children[0].y >= COLUMN_BOTTOM);
    }

    private addRandomFlower(y: number) {
        let color = Math.floor(Math.random() * (NUMBER_OF_FLOWER_COLORS + 1));
        this.create(0,y,TEXTURE_FLOWER_MAP,color);
    }

    update() {
        if(this.alive){

            this.children.forEach(element => {
                element.y += this.velocity;
            });

            if (this.children.length == 0 || this.children[this.length - 1].y > COLUMN_TOP)
                this.addRandomFlower(COLUMN_TOP - FLOWER_DELTA_Y);
        }
    }

    public getBottomFlower() : any {
        if (this.length > 0)
            return this.getChildAt(0);
        else
            return null;
    }

    public removeBottomFlower() {
        if (this.length > 0){
            this.removeChildAt(0);
        }
    }
}