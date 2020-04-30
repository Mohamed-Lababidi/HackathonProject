var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics:{
        default:'arcade',
        debug: true},
	scene: {
			preload: preload,
			create: create,
			update: update
		}
};


var game = new Phaser.Game(config);

function preload ()
{
	this.load.image("background", "../assets/Background/backforest.jpg");
	this.load.image("bullet", "../assets/Miscelenous/bouze_30px.png");
	this.load.image("goat", "../assets/Characters/goat_50px.png");
	this.load.image("chicken", "../assets/Characters/chicken_good.png");
	this.load.image("chickenAttack", "../assets/Miscelenous/littleEgg.png");
	this.load.spritesheet("kaboom", "../assets/Miscelenous/explode.png", {frameWidth: 128, frameHeight: 128,
	});
}

var bullets; // shoot
var alien;
var goat; // goat
var speed; // shoot spped
var lastGoatBulletTime = 0
var explosions;
var cursors; // touch keyboard
var chicken;  // chicken
var lastFired = 0;  // stoper les shoots

function create ()
{
    this.add.image(0, 0, "background").setOrigin(0, 0);

var Bullet = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,
	initialize:
	function Bullet (sceneRef)
	{
		Phaser.GameObjects.Image.call(this, sceneRef, 0, 0, 'bullet');
		this.speed = Phaser.Math.GetSpeed(200, 1);
	},
	
	fire: function (x,y)
	{
                this.setPosition(x,y -50);
				this.setActive(true);
                this.setVisible(true);

            },

			update: function (time, delta){
				this.y -= this.speed * delta;
					if (this.y < -500)
					{
						this.setActive(false);
						this.setVisible(false);
					}
			}
	});
	
	bullets = createBullets( 'bullet', this );
	// chicken = this.physics.add.staticGroup();
	explosions = this.add.group({
        defaultKey: 'kaboom',
        maxSize: 30
    });

	goat = this.physics.add.sprite( 400, 500, 'goat' );
    goat.setOrigin( 1, 1 );
	goat.setCollideWorldBounds( true );
	
	aliens = this.physics.add.staticGroup();
	aliens = this.physics.add.group();
		createAliens();

	
	firePlayerBullet( this );
	
	function createAliens() {

        // We want 3 rows of 10 aliens each.
        for ( var y = 0; y < 3; y++ ) {
            for ( var x = 0; x < 10; x++ ) {
                var alien = aliens.create( x * 75, y * 90, 'chicken' );
                alien.setOrigin( 0.5, 0.5 );
                alien.lastFired = 0;
                alien.play( 'hover' );
            }
        }
    
        // Center our collection of aliens.
        Phaser.Actions.IncX( aliens.getChildren(), 60 );
    
        // Bring them further into the scene vertically.
        Phaser.Actions.IncY( aliens.getChildren(), 75 );
    }
    
	cursors = this.input.keyboard.createCursorKeys();
    
	speed = Phaser.Math.GetSpeed(300, 1);
	
	this.anims.create({
		key: 'explode',
		frames: this.anims.generateFrameNumbers( 'kaboom', {
			start: 0,
			end: 15
		}),
		frameRate: 16,
		repeat: 1,
		hideOnComplete: true
	});

	function firePlayerBullet( sceneRef ) {
        console.log(sceneRef)
		var goatBullet = bullets.get().setActive( true ).setVisible( true );
			if (goatBullet === aliens) {
			sceneRef.physics.add.collider( bullets, aliens, handleEnemyCollision );
			// lastGoatBulletTime = sceneRef.time.now;
		}
	}

	function handleCollision( aliens, Bullet ) {

		// If both the target and bullet are active.
		if ( aliens.active === true && Bullet.active === true ) {
			// Deactivate the bullet, and take it off the screen.
            bullets.setActive( false ).setVisible( false );
            aliens.setActive(false).setVisible(false);
			// Get the first explosion, and activate it.
			var explosion = explosions.get().setActive( true );
			// Place the explosion on the screen, and play the animation.
			explosions.setOrigin( 0.5, 0.5 );
			explosions.x = target.x;
			explosions.y = target.y;
			explosions.play( 'explode' );
		}
	}

	function createBullets( X, sceneRef ) {
		return sceneRef.physics.add.group({
			classType: Bullet,
			runChildUpdate: true
		});
	}
	
	function handleEnemyCollision( bullet, alien ) {
		if ( bullet.active === true && alien.active === true ) {
			handleCollision(target, bullet)
			// Deactivate and remove the alien from the screen.
			aliens.setActive( false ).setVisible( false );
		}
	}


}

function update (time, delta) {
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
			}
        }
    }