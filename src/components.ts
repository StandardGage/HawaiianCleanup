import Phaser from "phaser";

export default class components{

    static style:Phaser.GameObjects.TextStyle = {
        stroke: '#00000',
        strokeThickness: 10,
        fontSize: '32px',
    }

    static Button(x:number, y:number, text:string, scene:Phaser.Scene, new_scene:string | undefined) {
        
        var button = scene.add.text(x, y, text, this.style)
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

    static LevelButton(x:number, y:number, text:string, image:string, scene: Phaser.Scene, new_scene:string | undefined, isDisabled:boolean | undefined) {
        var levelButton = scene.add.container(x, y)
        var levelText = scene.add.text(0,0,text,this.style)
        levelText.setOrigin(0.5,0.5)
        var levelImage = scene.add.image(0,0,image)
        levelButton.add( [levelImage,levelText] )
        levelImage.setInteractive();

        levelImage.on('pointerover',() => {
            levelImage.setScale(1.1)
            levelText.setScale(1.1)
        });

		levelImage.on('pointerout', () => {
			levelImage.setScale(1)
            levelText.setScale(1)
		})
		
		levelImage.on('pointerup', () => {
			//scene.scene.start(new_scene)
		});
    }
}