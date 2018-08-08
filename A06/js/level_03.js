var level_03 = {

	preload: function () {
		console.log("level_03");
		// Load tile map
		game.load.tilemap('level_03', 'assets/maps/forest_e.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground','assets/tileset/ground/ground.png');
		game.load.image('pool','assets/tileset/ground/water/pool.png');
		game.load.image('earth_dark','assets/tileset/ground/ridge/earth_dark.png');
		game.load.image('grass_edges','assets/tileset/ground/grass_edges.png');
		game.load.image('earth_edges','assets/tileset/ground/earth_edges.png');
		game.load.image('grass_corners','assets/tileset/ground/grass_corners.png');
		game.load.image('daisy_blue','assets/tileset/plant/flower/daisy_blue.png');
		game.load.image('daisy_yellow','assets/tileset/plant/flower/daisy_yellow.png');
		game.load.image('bushes','assets/tileset/plant/bush/bushes.png');
		game.load.image('daisy_red','assets/tileset/plant/flower/daisy_red.png');
		game.load.image('daisy_white','assets/tileset/plant/flower/daisy_white.png');
		game.load.image('collision','assets/tileset/logic/collision.png');
		game.load.image('tree_green','assets/tileset/plant/tree/tree_green.png');
		game.load.image('castle','assets/tileset/building/castle.png');
		game.load.image('tent','assets/tileset/object/tent.png');
		game.load.image('sheepfood','assets/tileset/logic/item/sheepfood.png');
		game.load.image('fairy','assets/tileset/logic/creature/fairy.png');
		game.load.image('resources','assets/tileset/logic/item/resources.png');
		game.load.image('portal','assets/tileset/logic/portal.png');
		game.load.image('green_paving','assets/tileset/ground/green_paving.png');
		game.load.image('protection','assets/tileset/logic/protection.png');
	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_03');
		this.map.addTilesetImage('ground', 'ground');
		this.map.addTilesetImage('pool', 'pool');
		this.map.addTilesetImage('earth_dark', 'earth_dark');
		this.map.addTilesetImage('grass_edges', 'grass_edges');
		this.map.addTilesetImage('earth_edges', 'earth_edges');
		this.map.addTilesetImage('grass_corners', 'grass_corners');
		this.map.addTilesetImage('daisy_blue', 'daisy_blue');
		this.map.addTilesetImage('daisy_yellow', 'daisy_yellow');
		this.map.addTilesetImage('bushes', 'bushes');
		this.map.addTilesetImage('daisy_red', 'daisy_red');
		this.map.addTilesetImage('daisy_white', 'daisy_white');
		this.map.addTilesetImage('collision', 'collision');
		this.map.addTilesetImage('tree_green', 'tree_green');
		this.map.addTilesetImage('castle', 'castle');
		this.map.addTilesetImage('tent', 'tent');
		this.map.addTilesetImage('sheepfood', 'sheepfood');
		this.map.addTilesetImage('fairy', 'fairy');
		this.map.addTilesetImage('resources', 'resources');
		this.map.addTilesetImage('portal', 'portal');
		this.map.addTilesetImage('green_paving', 'green_paving');
		this.map.addTilesetImage('protection', 'protection');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			roof_layer_add: this.map.createLayer('4_roof_add'),
			collision_layer: this.map.createLayer('collision')
		};

		this.layers.collision_layer.alpha = 0;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(322, true, this.layers.collision_layer);

		this.layers.ground_layer.resizeWorld();

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		// adding hud
		this.hud = new Hud(game, 1800, 2400);
		this.hud.addTitle();
		this.hud.trackValue(game.global, "health");
		this.hud.trackValue(game.global, "coins");
		//Healthbars
		this.barConfig = {
			width: 50,
			height: 4,
			x: (this.player.x),
			y: (this.player.y + 35),
			bg: {
				color: '#FF0000'
			},
			bar: {
				color: '#00FF00'
			},
			animationDuration: 200,
			flipped: false
		};
		
		this.myHealthBar = new HealthBar(this.game, this.barConfig);

		this.portal = game.add.sprite(3600, 1000, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal.animations.play('rotate');
		game.physics.arcade.enable(this.portal);

		this.portal2 = game.add.sprite(3600, 600, 'red_portal');
		this.portal2.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal2.animations.play('rotate');
		game.physics.arcade.enable(this.portal2);

		this.enemy = game.add.sprite(550, 1200, 'ghost');
	
		this.coins = game.add.group();
		this.coins.enableBody = true;

		var total_coins = game.global.coins;
		this.coins.scale.setTo(.5, .5);

		for(var i = 0; i < 100; i++){
			this.coins.create((Math.random() * 6000), (Math.random() * 7000), 'coin');
		}

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.play('idle_left');

		// Add walking and idle animations for the enemy.
		this.enemy.animations.add('walk_left', [6, 7, 8], 10, true);
		this.enemy.animations.add('walk_right', [6, 7, 8], 10, true);
		this.enemy.animations.add('ide_left', [0, 1, 2], 10, true);
		this.enemy.animations.add('ide_right', [0, 1, 2], 10, true);
		this.enemy.animations.add('attack_left', [15, 14, 13], 10, true);
		this.enemy.animations.add('attack_right', [10, 11], 10, true);
		this.enemy.animations.play('idle_right');

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		game.physics.arcade.enable(this.enemy);
		this.enemy.body.collideWorldBounds = true;

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);


		// set starting location for player in some middle spot in the map
		//this.player.x = 1728;
		//this.player.y = 1024;

		this.alive = true;
		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		//this.player.scale.setTo(1.75);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		game.addPauseButton(game);

		this.flag = true;
		this.walkAnim = true;
		this.walkAnim2 = true;

		this.frame_counter = 0;

	},

	update: function () {

		this.act();

		this.hud.displayHud();

		this.getTileProperties(this.layers.collision_layer,this.player);

		this.frame_counter++;

		this.moveTowardPlayer(this.enemy, 50);
		this.checkPlayerTransport(this.player);


		game.physics.arcade.overlap(this.player, this.portal, function (player, portal) {game.state.start('level_01');}, null, this);
		game.physics.arcade.overlap(this.player, this.portal2, function (player, portal) {game.state.start('level_05');}, null, this);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);

		game.physics.arcade.overlap(this.player, this.coins, this.coincounter, null, this);

		game.physics.arcade.overlap(this.coins, this.layers.collision_layer, function (coin, layer) {
			coin.kill();
		}, function (coin, layer) {
			return layer.collides;
		}, this);

	},

	moveTowardPlayer: function (enemy, speed) {
		if (this.player.x < enemy.x) {
			enemy.body.velocity.x = -speed;
		} else {
			enemy.body.velocity.x = speed;
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -speed;
		} else {
			enemy.body.velocity.y = speed;
		}
		this.checkAttack(enemy);
	},

	checkAttack: function (enemy)
		{
			var xClose = Math.abs(this.player.x - enemy.x);
			var yClose = Math.abs(this.player.y - enemy.y);
	
			if(Math.abs(xClose + yClose) < 100){
	
				if(this.player.x < enemy.x){
					enemy.body.velocity.x = 0;
					enemy.animations.play('attack_left');
					if(Math.abs(xClose + yClose) < 50){
						if(this.frame_counter % 50 == 0){
							game.global.health -= 15;
						}
					}
					this.myHealthBar.setPercent(game.global.health / 100);
				}
				else{
					enemy.body.velocity.y = 0;
					enemy.animations.play('attack_right');
					if(Math.abs(xClose + yClose) < 100){
						if(this.frame_counter % 50 == 0){
							game.global.health -= 15;
						}
					}
					this.myHealthBar.setPercent(game.global.health / 100);
				}
				
			}
		},

	/**
	 * function to be taylored to handle player level / stage change 
	 * Question: should this be cut and paste in very level file?
	 * 			 can we make this global somehow?
	 */
	checkPlayerTransport: function (player) {
		if (player.x<50) {
			game.state.start('level_02');
		} 
		else if (player.y > 4100){
			game.state.start('level_04');
		}
	},

	getTileProperties: function (layer, player) {

		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		if (tile) {
			console.log(x, y);
			console.log(tile);
		}

	},

	act: function()
	{
		this.myHealthBar.setPosition(this.player.x, this.player.y - 35);
		if (this.leftKey.isDown) {
			this.player.body.velocity.x = -400;
			this.player.animations.play('walk_left');
			this.prevDir = 'left'
		}
		if (this.rightKey.isDown) {
			this.player.body.velocity.x = 400;
			this.player.animations.play('walk_right');
			this.prevDir = 'right'
		}
		if (this.upKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('walk_left');
			} else {
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = -400;
		}

		if (this.downKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('walk_left');
			} else {
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = 400;
		}

		// Used for debug info while player is moving.
		if (this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown) {
			console.log(this.player.x, this.player.y)
		}

		if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown) {
			if (this.prevDir == 'left') {
				this.player.animations.play('idle_left');
			} else {
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}

		if (this.spaceBar.isDown) {
			this.chasePlayer = true;
		}
		if (this.chasePlayer) {
			this.moveTowardPlayer(this.enemy, 200);
			this.checkAttack(this.player, this.enemy);
		}

	},
	coincounter: function (player, coin)
		{
			game.global.coins +=1;
			console.log(game.global.coins);
			coin.kill();
		},

}