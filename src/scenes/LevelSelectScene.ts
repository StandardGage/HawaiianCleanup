import components from "../components";

export default class extends Phaser.Scene {

    constructor() {
        super({ key: 'LevelSelectScene' });
    }

    create() {
        // add background
        this.add.image(400, 400, 'level-select-bkgrd');

        // add menu button
        components.Button(100, 700, 'Menu', this, 'WelcomeScene')

        components.LevelButton(120, 120, 'Level 1', 'level-button-bkgrd', this)
        components.LevelButton(340, 120, 'Level 2', 'level-button-bkgrd', this)
    }
}