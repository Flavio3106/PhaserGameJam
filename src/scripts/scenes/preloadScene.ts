export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('bg-mountains', 'assets/img/bg-mountains.png')
    this.load.image('sheet', 'assets/img/sheet.png')
    this.load.image('key-blue', 'assets/img/key-blue.png')
    this.load.spritesheet('player-spritesheet', 'assets/img/players.png', { frameWidth: 52, frameHeight: 70 })
  }

  create() {
    this.scene.stop('PreloadScene')
    this.scene.start('MainScene')
    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
