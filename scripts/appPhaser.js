var config = {
	type: Phaser.WEBGL,
	width: 800,
	height: 600,
	backgroundColor: '#2d2d2d',
	parent: 'phaser-example',
	scene: {
			preload: preload,
			create: create,
			update: update
	}
};

var bullets;
var goat;
var player;
var speed;
var stats;
var cursors;
var chicken;
var lastFired = 0;
// scoreeee
var score = 0;
var scoreText;
// livessss
var lives = 0;


var game = new Phaser.Game(config);

function preload ()
{
	this.load.image("background", "../assets/Background/backforest.jpg");
	this.load.image("bullet", "../assets/Miscelenous/bouze_30px.png");
	this.load.image("goat", "../assets/Characters/goat_50px.png");
	this.load.image("chicken", "../assets/Characters/chicken_good.png");
	this.load.image("chickenAttack", "../assets/Miscelenous/littleEgg.png", {frameWidth: 100,frameHeight: 400});
	this.load.spritesheet("kaboom", "../assets/Miscelenous/explode.png", {frameWidth: 128, frameHeight: 128,});
    this.load.audio("pet", "../assets/Miscelenous/pet.ogg", { intanes: 1});
}

function create ()
{   
	//this.physics.add.collider(this.bullets, this.chicken);
    this.add.image(0, 0, "background").setOrigin(0, 0);

    
   // lives = this.add.text(16, 16, 'lives: 3', { fontSize: '20px', fill: '#000' });
   // scoreText = this.add.text(16, 40, 'score: 0', { fontSize: '30px', fill: '#000' }); //score counter

    //Score variables.
    this.add.text(16, 50, 'SCORE:', { fontSize: '25px', fill: '#962352'});
    scoreText = this.add.text(16, 75, score, { fontSize: '30px', fill: '#962352' });
    

    //Life variables.
    this.add.text(16, 16, "LIFE:", { fontSize: '23px', fill: '#fff' });
    livesDisplay = this.add.text(88, 16, lives,{ fontSize: '23px', fill: '#fff' });
        

       
	var Bullet = new Phaser.Class({

			Extends: Phaser.GameObjects.Image,

			initialize:

			function Bullet (scene)
			{
					Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

                    this.speed = Phaser.Math.GetSpeed(400, 1);
                    
                
			},

			fire: function (x, y)
			{
					this.setPosition(x, y - 50);
                    this.setActive(true);
                    this.setVisible(true);
                    
			},

			update: function (time, delta)
			{
                
					this.y -= this.speed * delta;

					if (this.y < -50)
					{
							this.setVisible(false);
			}
			}

	});
			
    	bullets = this.add.group({
        key:'bullets',
		classType: Bullet,
		maxSize: 100,
        runChildUpdate: true,

      /*  update(bullets){
            if ( bullets.runChildUpdate(true, true)){
                scoreText.text = score++;
            }
        } */ 
});

    goat = this.add.sprite(400, 500, 'goat').setDepth(1);

    const group = this.add.group({
        key: "chicken",
        frame: [1],
        repeat: 44
    });

    Phaser.Actions.GridAlign(group.getChildren(), {
        width: 15,
        height: 5,
        cellWidth: 45,
        cellHeight: 32,
        x: 90,
        y: 110,
    });

    cursors = this.input.keyboard.createCursorKeys();
    
    speed = Phaser.Math.GetSpeed(300, 1);

    // scoreeee   
    score+= 10;
    scoreText.text = score;
    // lives counter
    lives+=3;
    livesDisplay.text = lives;
}

function update (time, delta)

{
	if (cursors.left.isDown)
	{
			goat.x -= speed * delta;
	}
	else if (cursors.right.isDown)
	{
			goat.x += speed * delta;
	}

	if (cursors.up.isDown && time > lastFired)
	{
			var bullet = bullets.get();

			if (bullet)
			{
                    bullet.fire(goat.x, goat.y);
                    lastFired = time + 50;

                }
            
        }  
        
}



function collectCaca (player, bullets)

{

bullets.disableBody(true, true);

//  Add and update the score

score += 10;

scoreText.setText('Score: ' + score);

if (bullets.countActive(true) === 0)

{

    //  A new batch of stars to collect

    bullets.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

    });


}
}