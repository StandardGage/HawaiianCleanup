import components from "../components";

export default class extends Phaser.Scene {

    constructor() {
        super({ key: 'LevelSelectScene' });
    }

    create() {
        // add background
        this.add.image(400, 400, 'level-select-bkgrd');

        // add menu button
        components.makeButton(100, 700, 'Menu', this, 'WelcomeScene')
    }
}