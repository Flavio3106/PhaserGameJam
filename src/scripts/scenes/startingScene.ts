export default class startingScene extends Phaser.Scene {
    constructor(){
        super({key: 'startingScene'})
    }

    _startButton: Phaser.GameObjects.Image

    create(){
        this.add.image(0,0,'background').setOrigin(0).setScale(.210);

        this._startButton = this.add.image(150,140,'startButton').setOrigin(0).setScale(.200)
        this._startButton.setInteractive(); 

        const text = this.add.text(170, 130, 'loading...', { fontFamily: 'Arial', fontSize: '16px', color: '#ffffff',fontStyle:'bold' });
        text.setOrigin(0);
        text.setVisible(false);

        this._startButton.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
        });

        this._startButton.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
        });

        this._startButton.on('pointerdown', () => {

            text.setVisible(true)

            setTimeout( () => {
                this.scene.stop('startingScene');
                this.scene.start('MainScene');
                this.scene.start('HUD');
                
            }, 3000);

           
        });
    }
}
