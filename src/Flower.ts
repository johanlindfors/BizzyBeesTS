class Flower extends Phaser.Sprite {
    color: number;
    x: number;
    y: number;

    constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number) {
        super(game,x,y,key,frame);
        this.color = frame;
    }
}