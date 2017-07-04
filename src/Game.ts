class BizzyBeesGame extends Phaser.Game {
    constructor() {
        super(480, 800, Phaser.AUTO, 'content', null);

        this.state.add(STATE_BOOT,BootState,null);
        this.state.add(STATE_PRELOADER,PreloaderState,null);
        this.state.add(STATE_GAME_OVER,GameOverState,null);
        this.state.add(STATE_GAME,GameState,null);

        this.state.start(STATE_BOOT);
    }
}

// when the page has finished loading, create our game
window.onload = () => {
    var game = new BizzyBeesGame();
}