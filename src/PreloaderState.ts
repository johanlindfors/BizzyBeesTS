class PreloaderState extends Phaser.State {
    preloadBar: Phaser.Sprite;
    
    preload() {
        this.preloadBar = this.add.sprite(240, 250, TEXTURE_PRELOADBAR);
        this.preloadBar.anchor.set(0.5,0.5);
        this.preloadBar.width = 430;
        this.preloadBar.height = 72;

        this.load.setPreloadSprite(this.preloadBar);
        this.load.image( TEXTURE_BACKGROUND, "assets/GameScreenBackground.png" );
        this.load.image( TEXTURE_FOREGROUND, "assets/GameScreenForeground.png" );
        this.load.image( TEXTURE_HUD, "assets/HUDBackground.png" );
        this.load.spritesheet( TEXTURE_FLOWER_MAP, "assets/flowermap.png", 72, 72, 7);
        this.load.spritesheet( TEXTURE_BEE_MAP, "assets/beemap.png", 91, 91, 6);
    }

    create() {
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startGame, this);
    }

    startGame() { 
        this.game.state.start(STATE_GAME_OVER, true, false);
    }
}