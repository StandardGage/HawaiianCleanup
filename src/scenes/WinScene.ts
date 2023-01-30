import components from "../components";
import { score } from "./LevelScene";

export default class WinScene extends Phaser.Scene {
  centerX: number = 0;
  centerY: number = 0;

  constructor() {
    super({ key: "WinScene" });
  }

  init() {
    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;
  }

  create() {
    this.add.image(300, 200, "level-select-bkgrd");
    // button takes you back to level select screen
    components.Button(550, 30, 'X', this, 'WelcomeScene')
    // "YOU  WIN" Text
    this.add.text(this.centerX, this.centerY - 50, "YOU WIN", {
        align: 'center', 
        stroke: '#000000',
        strokeThickness: 6,
        fontSize: '50px'
    }).setOrigin(0.5);
    // Player score
    this.add.text(this.centerX, this.centerY, "Score: " + score, {
        align: 'center', 
        stroke: '#000000',
        strokeThickness: 6,
        fontSize: '25px'
    }).setOrigin(0.5);

  }
}