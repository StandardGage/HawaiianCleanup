import Phaser from "phaser";

export default class components{

    static makeButton(x:number, y:number, text:string, scene:Phaser.Scene, new_scene:string | undefined) {
        
        var button = scene.add.text(x, y, text, {
            stroke: '#00000',
            strokeThickness: 10,
            fontSize: '32px'
        })
        button.setOrigin(0.5,0.5)
        button.setInteractive();

        button.on('pointerover',() => {
            button.setScale(1.1);
        });

		button.on('pointerout', () => {
			button.setScale(1);
		})
		
		button.on('pointerup', () => {
			scene.scene.start(new_scene)
		});
    }
}