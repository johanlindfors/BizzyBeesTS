class BeePicker extends Phaser.Group {
//    private bees: Array<Bee> = undefined;

    public constructor(game: Phaser.Game) {
        super(game);
//        this.bees = new Array<Bee>();

        for (var i = 0; i < 5; i++) {
            let bee = new Bee(
                game,
                BEE_START_X + i * BEE_DELTA_X,
                BEE_START_Y,
                TEXTURE_BEE_MAP,
                Math.floor(Math.random() * (NUMBER_OF_BEE_COLORS + 1)));
            this.add(bee);
            //this.create(BEE_START_X + i * BEE_DELTA_X, BEE_START_Y,TEXTURE_BEE_MAP, 0);
        }
    }

    public reset() {
        this.removeAll();

        //this.bees.splice(0,this.bees.length);

        for (var i = 0; i < 5; i++) {
            let bee = new Bee(
                this.game,
                BEE_START_X + i * BEE_DELTA_X,
                BEE_START_Y,
                TEXTURE_BEE_MAP,
                Math.floor(Math.random() * (NUMBER_OF_BEE_COLORS + 1)));
            this.add(bee);
        }
    }
    
    public update(){
        if(!this.alive)
           return;

        if(this.game.input.activePointer.justPressed()) {
            var position = this.game.input.activePointer.position;
            if(position.y > 700){
                let selectedBeeIndex = Math.floor(position.x / BEE_DELTA_X);

                for (var index = 0; index < this.children.length; index++) {
                    var bee = <Bee>this.children[index];
                    bee.isSelected = index == selectedBeeIndex;
                    bee.update();
                }
            }
        }
    }

    public getSelectedBee() : Bee {
        let selectedBee = undefined;
        this.children.forEach(element => {
            var bee = <Bee>element;
            if(bee.isSelected) {
                selectedBee = bee;
            }
        });
        return selectedBee;
    }

    public removeAndReplaceSelectedBee(availableFlowers: Array<number>) {
        let selectedBee = this.getSelectedBee();
        let beeIndex = this.children.indexOf(selectedBee);

        //check if we already have a bee that matches the available flowers 
        //remember to skip over the selectedBee since it will be removed in a moment
        let match = false;
        let rainbowColor = 6;

        //if there is a rainbow flower it will always match
        if (rainbowColor in availableFlowers)
            match = true;
        else {
            for (let i = 0; i < this.length; i++) {
                let bee = <Bee>this.children[i];
                if(i != beeIndex && bee.color in availableFlowers) {
                    match = true;
                    break;
                }
            }
        }

        var color;
        if(match) {
            //we already have a match, just add a random colored bee
            color = Math.floor(Math.random() * (NUMBER_OF_BEE_COLORS + 1));
        } else {
            //we have no match so we must pick a color from the available colors
            color = availableFlowers[Math.floor(Math.random() * (availableFlowers.length + 1))];
        }

        selectedBee.color = color;
        selectedBee.isSelected = false;

        //set the selected bee to the new color to "create" a new bee
        //(<Bee>this.children[beeIndex]).color = color;
    }

    public deselectAll() {
        this.children.forEach(element => {
            let bee = <Bee>element;
            bee.isSelected = false;
        });
    }
}