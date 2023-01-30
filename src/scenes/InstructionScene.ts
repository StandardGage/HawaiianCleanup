import components from "../components";

export default class InstructionScene extends Phaser.Scene {
  centerX: number = 0;
  centerY: number = 0;

  constructor() {
    super({ key: "InstructionScene" });
  }

  init() {
    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;
  }

  create() {
    this.add.image(300, 200, "level-select-bkgrd");

    components.Button(550, 30, 'X', this, 'WelcomeScene')

    // add background image
    this.add.text(this.centerX, this.centerY, "The goal of this game is to collect all\n the trash and plastic on each level\n and avoiding picking up lava rocks\n and picking flowers. You would move \n around the level by using the\n blocks and putting them in a certain\n order so that you collect all the trash.", {
        align: 'center', 
        stroke: '#000000',
        strokeThickness: 6,
    }).setOrigin(0.5);
    //add play button
  }
}
