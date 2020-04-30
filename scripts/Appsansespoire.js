var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade'
	},
	scene: {
			preload: preload,
			create: create,
			update: update
		}
};

var bullets; // shoot
var goat; // goat
var speed; // shoot spped
var stats;
var cursors; // touch keyboard
var chicken;  // chicken
var lastFired = 0;  // stoper les shoots
var score = 0; // score
var scoreText; // score

var game = new Phaser.Game(config);

function preload ()
{	
	
	this.load.image("background", "../assets/Background/backforest.jpg");
	this.load.image("bullet", "../assets/Miscelenous/bouze_30px.png");
	this.load.image("goat", "../assets/Characters/goat_50px.png");
	this.load.image("chicken", "../assets/Characters/chicken_good.png");
	this.load.image("chickenAttack", "../assets/Miscelenous/littleEgg.png");
	this.load.spritesheet("kaboom", "../assets/Miscelenous/explode.png", {frameWidth: 128, frameHeight: 128});
}

function create () {
	
	this.add.image(0, 0, "background").setOrigin(0, 0);

	//  //Score variables.
	//  this.add.text(16, 50, 'SCORE:', { fontSize: '25px', fill: '#962352'});
	//  scoreText = this.add.text(16, 75, score, { fontSize: '30px', fill: '#962352' });
	 
 
	//  //Life variables.
	//  this.add.text(16, 16, "LIFE:", { fontSize: '23px', fill: '#fff' });
	//  livesDisplay = this.add.text(88, 16, lives,{ fontSize: '23px', fill: '#fff' });
		 
	
	var Bullet = new Phaser.Class({
			Extends: Phaser.GameObjects.Image,
			initialize:

			function Bullet (scene)
			{
					Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
					this.speed = Phaser.Math.GetSpeed(200, 1);
			},

			fire: function (x, y)
			{
					this.setPosition(x, y - 50);
					this.setActive(true);
					this.setVisible(true);
			},

			update: function (time, delta){
				this.y -= this.speed * delta;
					if (this.y < -50)
					{
							this.setActive(false);
							this.setVisible(false);
					}
			}
	});

	bullets = this.physics.add.group({
			classType: Bullet,
			maxSize: 5,
			runChildUpdate: true
	});
	
	// this.petsound = this.sound.add("pet");

    groupChiken = this.physics.add.group({
        key: "chicken",
        frame: [1],
        repeat: 44
	});
	console.log("thisl : ", this.physics)

    Phaser.Actions.GridAlign(groupChiken.getChildren(), {
        width: 15,
        height: 4,
        cellWidth: 45,
        cellHeight: 32,
        x: 90,
        y: 90,
    });

	goat = this.add.sprite(400, 500, 'goat').setDepth(1);
	cursors = this.input.keyboard.createCursorKeys();
	speed = Phaser.Math.GetSpeed(300, 1);
	


    // scoreeee   
   // score+= 10;
   // scoreText.text = score;
    // lives counter
   // lives+=3;
    //livesDisplay.text = lives;

    
}


function update (time, delta) {
	this.physics.add.collider(this.bullets,  this.group)

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

					lastFired = time + 100;
			};
			
	}
}
