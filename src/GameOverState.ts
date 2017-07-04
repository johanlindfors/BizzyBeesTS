class GameOverState extends Phaser.State {
    isGameOver: boolean;
    score: number;

    init(isGameOver: boolean, score: number){
        this.isGameOver = isGameOver;
        this.score = score;
    }

    create() {
        this.add.sprite( 0, 0, TEXTURE_BACKGROUND);

        if(this.isGameOver){
            this.add.text(240, 300,"GAME OVER", FONT_HUGE).anchor.set(0.5,0.5);
            this.add.text(240, 400, this.score + " points", FONT_HUGE).anchor.set(0.5,0.5);
        } else {
            this.add.text(240, 300,"TAP TO PLAY", FONT_HUGE).anchor.set(0.5,0.5);
        }
    }

    update(){
        this.input.onTap.addOnce(this.startGame,this);
    }

    startGame() { 
        this.game.state.start(STATE_GAME, true, false);
    }
}