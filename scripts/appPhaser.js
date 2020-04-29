const config={
    width: 1200,
    height: 700,
    type: Phaser.AUTO,
    physics: {
        default:'arcade',
        arcade: {
            gravity: {y:450}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config)
let goat
let cursors

var dodger = {
    
    preload: function () {
    this.load.image('goat', '../assets/Characters/goat_50px.png');
    this.load.image('chicken', '../assets/Characters/chicken.png');
    this.load.image('goatAttack', '../assets/Miscelenous/GoatShit.png')
    this.load.image('chickenAttack', '../assets/Miscelenous/eggs.png')
    game.load.image('background', '../assets/Background/background.jpg')
},

    create: function () {
    goat = this.physics.add.image(100, 100, 'goat')
    goat.body.collideWorldBounds = true;
    game.add.sprite(100, 100, 'background'); 
    cursors = this.input.keyboard.createCursorKeys()
},

    update: function () {
        goat.setVelocityX(0)
        if(cursors.up.isDown){
            goat.setVelocity(0, -300)
        }
        if(cursors.right.isDown) {
            goat.setVelocity(100, 0)
        }
        if(cursors.left.isDown) {
            goat.setVelocity(-100, 0)
        }
    }
}

game.state.add('dodger', dodger);
game.state.start('dodger');
