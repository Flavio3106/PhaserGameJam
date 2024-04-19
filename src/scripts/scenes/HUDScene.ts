export default class HUDScene extends Phaser.Scene{
    constructor(){
        super({key: "HUD"})
    }

    private _counter: number = 0;

    getCounter(): number { return this._counter; }

    public updateCounter(quantity: number): void {
        this._counter = quantity;
    }



    create(){

        for(var i = 0; i < 5; i++){
            this.add.image(this.cameras.main.width/7 -40 + i * 15, this.cameras.main.height/7 -15, 'heartSprite').setScale(.8);

        }

        this.add.image(this.cameras.main.width/8 -38 + i  , this.cameras.main.height/7 +2, 'bauxiteCounterIcon',7).setScale(0.88);
        this.add.text(this.cameras.main.width/7 -40 + i * 2, this.cameras.main.height/7 - 4.5, `${this._counter}`,{fontSize: '10px', fontStyle:'bold', fontFamily: 'Roboto'}).setResolution(10)


;
    }
}