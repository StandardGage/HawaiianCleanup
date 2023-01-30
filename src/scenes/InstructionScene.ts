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
    this.add.text(this.centerX, this.centerY, "The goal of this game is to collect all\n the trash and plastic on each level.\n Avoid picking up lava rocks and\n grabbing flowers! Move around\n the level using the blocks, and\n put them in the right order to\n collect all the trash!", {
        align: 'center', 
        stroke: '#000000',
        strokeThickness: 6,
    }).setOrigin(0.5);
    //add play button
  }
}
