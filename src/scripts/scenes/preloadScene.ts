export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    //tileset
    //this.load.image('dungeon', 'assets/tiles/dungeon-tileset.png')

    this.load.image('principale', 'assets/tiles/victorian/16x16-ALL-ASSETS.png')
    this.load.image('secondario', 'assets/tiles/victorian/16x16-OBJECTS.png')
    this.load.image('muri', 'assets/tiles/retro-interior/TopDownHouse_FloorsAndWalls.png')
    this.load.image('muri2', 'assets/tiles/retro-interior/TopDownHouse_DoorsAndWindows.png')
    this.load.image('FDR_Dungeon', 'assets/tiles/FDR-Dungeon/FDR_Dungeon.png')
    this.load.image('TopDownHouse_FurnitureState1', 'assets/tiles/retro-interior/TopDownHouse_FurnitureState1.png')

    //tilemap
    this.load.tilemapTiledJSON('house', 'assets/map/house.json')
    //this.load.tilemapTiledJSON('dungeon', 'assets/map/dungeon.json')

    this.load.image('sheet', 'assets/img/sheet.png')
    this.load.image('sheet-icon', 'assets/img/sheet-icon.png')
    this.load.image('close-button', 'assets/img/close-button.png')
    this.load.image('door', 'assets/img/door.png')
    this.load.image('blue-key', 'assets/img/key-blue.png')

    //--------------------------------------
    //*----------------player----------------
    //--------------------------------------
    //*Idle
    this.load.spritesheet('p-idle-down', 'assets/spritesheets/RPG_Hero/idle/idle_down_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-idle-left', 'assets/spritesheets/RPG_Hero/idle/idle_left_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-idle-right', 'assets/spritesheets/RPG_Hero/idle/idle_right_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-idle-up', 'assets/spritesheets/RPG_Hero/idle/idle_up_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    //*run
    this.load.spritesheet('p-run-down', 'assets/spritesheets/RPG_Hero/run/run_down_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-run-left', 'assets/spritesheets/RPG_Hero/run/run_left_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-run-right', 'assets/spritesheets/RPG_Hero/run/run_right_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-run-up', 'assets/spritesheets/RPG_Hero/run/run_up_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    //*attack
    this.load.spritesheet('p-attack-down', 'assets/spritesheets/RPG_Hero/attack/attack_down_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-attack-left', 'assets/spritesheets/RPG_Hero/attack/attack_left_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-attack-right', 'assets/spritesheets/RPG_Hero/attack/attack_right_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
    this.load.spritesheet('p-attack-up', 'assets/spritesheets/RPG_Hero/attack/attack_up_40x40.png', {
      frameWidth: 24,
      frameHeight: 24,
      margin: 8,
      spacing: 16
    })
  }

  create() {
    this.scene.stop('PreloadScene')
    this.scene.start('MainScene')
    this.scene.start('HUD')
    this.scene.bringToTop('HUD')
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
