var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var Texte

function preload ()
{
    
    this.load.image('sky', '../assets/Background/skybackground.png')
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('ground', '../assets/Miscelenous/platform.png')
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

}

function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');



    Texte = this.add.text(16, 16, 'GAME OVER', { font: '32px', fill: '#000' }); // sur bullets
    



   
    
    
    // var monTexte;
    // function create(){ 
    //      monTexte = game.add.text(100, 300, 'GAME OVER \n Clique pour rejouer', { font: "60px calibri", fill: "black", 
    // align:"center" });
    // }
    // monTexte.visible = true; 
    
  
    // this.data.set('lives', 3);
    // this.data.set('score', 2000);

    // var text = this.add.text(400, 400, '', {font: '65px Courier', fill: '#fff'});

    // text.setText([

    //     'Lives: ' + this.data.get('level'),
    //     'Score: ' + this.data.get('score')

    //  ]);
}

function update ()
{
}