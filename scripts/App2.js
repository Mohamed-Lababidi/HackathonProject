var game = new Phaser.Game(600, 600, Phaser.AUTO)


let GoatChicken = {

preload : function() {
    game.load.image('goat', '../assets/Characters/goat_50px.png');
    game.load.image('chicken', '../assets/Characters/chicken.png');
    game.load.image('goatAttack', '../assets/Miscelenous/GoatShit.png')
    game.load.image('chickenAttack', '../assets/Miscelenous/eggs.png')
    game.load.image('background', './assets/Background/background.png')
},

create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, 'background');
    
    this.player = game.add.sprite(300, 500, 'goat')
    this.player.anchor.set(0.5);
    game.physics.arcade.enable(this.player);

    this.cursors= game.input.keyboard.createCursorKeys();
},

update: function() {
    if (this.cursors.left.isDown){
        this.player.body.velocity.x = -300;
    }

    if (this.cursors.right.isDown){
        this.player.body.velocity.x = -300;
    }

    if (this.cursors.up.isDown){
        this.player.body.velocity.y = -300;
    }

    if (this.cursors.down.isDown){
        this.player.body.velocity.y = -300;
    }
},
restartGame: function()

};

game.state.add('GoatChicken', GoatChicken),
game.state.start('GoatChicken')