var level_01 = {

	preload: function () {

	},
	create: function () {
		console.log("level_01.js");

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.prevDir = '';	// holds sprites previous direction (left , right) so
							// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.add('run_right', Phaser.Animation.generateFrameNames('Run_right', 0, 9), 20, true);
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left', 0, 9), 20, true);
		this.player.animations.add('dead', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, false);
		this.player.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 20, true);
		this.player.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 20, true);
		this.player.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false);
		this.player.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.player.animations.add('jumpattack_left', Phaser.Animation.generateFrameNames('JumpAttack_left', 0, 9), 20, true);
		this.player.animations.add('jumpattack_right', Phaser.Animation.generateFrameNames('JumpAttack_right', 0, 9), 20, true);
		this.player.animations.play('idle_left');

		//!!!!!!!!!!!!
		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.att = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.jumpatt = game.input.keyboard.addKey(Phaser.Keyboard.R);
		game.addPauseButton(game);

		this.living = true;
	},


	update: function () {

		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

		// Use the shift key to add running by changing speed and animation

		// Create a move class or function to clean up code.
		if (this.leftKey.isDown) {
			this.player.body.velocity.x = -200;
			this.player.animations.play('walk_left');
			this.prevDir = 'left'
		}
		if (this.rightKey.isDown) {
			this.player.body.velocity.x = 200;
			this.player.animations.play('walk_right');
			this.prevDir = 'right'
		}
		if (this.upKey.isDown) {
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = -200;
		}
		if (this.downKey.isDown) {
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = 200;
		}

		if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown && !this.shiftKey.isDown && !this.spaceBar.isDown && !this.enter.isDown && !this.att.isDown && this.living) {
			if(this.prevDir == 'left'){
				this.player.animations.play('idle_left');
			}else{
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}

		//run
		if(this.shiftKey.isDown)
		{
			if (this.leftKey.isDown) {
				this.player.body.velocity.x = -300;
				this.player.animations.play('run_left');
				this.prevDir = 'left'
			}
			if (this.rightKey.isDown) {
				this.player.body.velocity.x = 300;
				this.player.animations.play('run_right');
				this.prevDir = 'right'
			}
			if (this.upKey.isDown) {
				if(this.prevDir == 'left'){
					this.player.animations.play('run_left');
				}else{
					this.player.animations.play('run_right');
				}
				this.player.body.velocity.y = -300;
			}
			if (this.downKey.isDown) {
				if(this.prevDir == 'left'){
					this.player.animations.play('run_left');
				}else{
					this.player.animations.play('run_right');
				}
				this.player.body.velocity.y = 300;
			}
		}
		

	
		//attack
		if(this.att.isDown)
		{
			if (this.prevDir == 'left')
			{
				this.player.animations.play('attack_left')
			}
			else{
				this.player.animations.play('attack_right')
			}
		}

		//jump
		if(this.spaceBar.isDown)
		{
			//this.player.scale.setTo(1.1,1.1)
			if(this.prevDir == 'left')
			{
				this.player.animations.play('jump_left');
			}
			else
			{
				this.player.animations.play('jump_right');
			}

			//this.player.body.velocity.y = -10;
			//setTimeout(backfromjump,1000);
		}		
		//jump attack
		if (this.spaceBar.isDown && this.att.isDown)
		{
			
			if(this.prevDir == 'left')
			{
				this.player.animations.play('jumpattack_left');
			}
			else
			{
				this.player.animations.play('jumpattack_right');
			}

		}
		//die
		if(this.enter.isDown)
		{

			this.player.animations.play('dead');
			this.living=false;
		}
	},
	render: function(){
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text( "Use arrow keys to move sprite around.", game.width/2, game.height-10 );
	},

	//backfromjump: function ()
	//{
	//	this.player.scale.setTo(1,1);
	//	this.player.body.velocity.y = 10
	//}
}