class BootState extends Phaser.State {
    preload() {
        //this.load.baseURL = "http://programmeramera.se/pages/bizzybees/";
        this.load.image(TEXTURE_PRELOADBAR, "assets/flowermap.png");
    }

    create() {
        this.game.state.start(STATE_PRELOADER, true, false);
    }
}