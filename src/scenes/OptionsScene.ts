import components from "../components";

export default class OptionsScene extends Phaser.Scene {
  centerX: number = 0;
  centerY: number = 0;
    musicOn!: boolean;
    soundOn!: boolean;
    text!: Phaser.GameObjects.Text;
    musicButton!: Phaser.GameObjects.Image;
    musicText!: Phaser.GameObjects.Text;
    soundButton!: Phaser.GameObjects.Image;
    soundText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "OptionsScene" });
  }

  init() {
    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;
  }

  create() {
    this.add.image(300, 200, "level-select-bkgrd");

    components.Button(550, 30, 'X', this, 'WelcomeScene')

    this.musicOn = true;
    this.soundOn = true;
    this.text = this.add.text(200, this.centerY - 100, 'Options', { fontSize: '40px' });
    this.musicButton = this.add.image(200, 200, 'checkedBox')
    this.musicButton.setScale(0.1, 0.1);
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: '24px' });
    this.musicButton.setInteractive();
    this.musicButton.on('pointerdown',  () => {
      this.musicOn = !this.musicOn;
      this.updateAudio();
    });

  }
  updateAudio() {
    if (this.musicOn === false) {
      this.musicButton.setTexture('box');
    } else {
      this.musicButton.setTexture('checkedBox');
    }
  }
}
