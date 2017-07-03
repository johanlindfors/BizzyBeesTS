class Bee extends Phaser.Sprite {
    public color: number;
    public isSelected: boolean = false;

    constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number) {
        super(game,x,y,key,frame);
        this.color = frame;
    }

    public update(){
        this.frame = this.color;
        this.alpha = this.isSelected ? 0.5 : 1.0;
    }
}