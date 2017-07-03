class Bee extends Phaser.Sprite {
    color: number;
    isSelected: boolean;

    constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number) {
        super(game,x,y,key,frame);

        this.color = frame;
        this.isSelected = false;
    }

    update() : void {
        this.frame = this.color;
        this.alpha = this.isSelected ? 0.5 : 1.0;
    }
}