import components from "../components";

export default class LevelScene extends Phaser.Scene {

    constructor() {
        super({key: 'LevelScene'});
    }

    create() {
        // add background
        this.add.image(400, 400, 'level-1-bkgrd')
    }

    update() {
        
    }
}