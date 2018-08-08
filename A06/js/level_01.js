var level_01 = {

	preload: function () {
		console.log("level_01");
		// Load tile map
		game.load.tilemap('level_01', 'assets/maps/tunnel.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground', 'assets/tileset/ground/brown.png');
		game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png');
		game.load.image('flames', 'assets/tileset/furniture/light/flames.png');
		game.load.image('amazon', 'assets/tileset/logic/creature/amazon.png');
		game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
		game.load.image('huge_animal', 'assets/tileset/item/corpse/huge_animal.png');
		game.load.image('rocks_2', 'assets/tileset/ground/rock/rocks_2.png');
		game.load.image('pink_crystal', 'assets/tileset/ground/rock/pink_crystal.png');
		game.load.image('green_crystal', 'assets/tileset/ground/rock/green_crystal.png');
		game.load.image('huge_animal2', 'assets/tileset/logic/creature/huge_animal.png');
		game.load.image('animal', 'assets/tileset/logic/creature/animal.png');
		game.load.image('undead', 'assets/tileset/logic/creature/undead.png');
		game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
		game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png');
		game.load.image('collision', 'assets/tileset/logic/collision.png');
	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_01');
		this.map.addTilesetImage('ground', 'ground');
		this.map.addTilesetImage('logic/collision', 'collision');
		this.map.addTilesetImage('steel lamp', 'iron_lamp');
		this.map.addTilesetImage('flames', 'flames');
		this.map.addTilesetImage('amazoness', 'amazon');
		this.map.addTilesetImage('corpse', 'skull_dark');
		this.map.addTilesetImage('corpse 2', 'huge_animal');
		this.map.addTilesetImage('rocks', 'rocks_2');
		this.map.addTilesetImage('crystal', 'pink_crystal');
		this.map.addTilesetImage('crystal 2', 'green_crystal');
		this.map.addTilesetImage('huge animals', 'huge_animal2');
		this.map.addTilesetImage('animals', 'animal');
		this.map.addTilesetImage('undead', 'undead');
		this.map.addTilesetImage('elements', 'elemental');
		this.map.addTilesetImage('wall/int_rock', 'int_rock');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			collision_layer: this.map.createLayer('collision')
		};

		this.layers.collision_layer.alpha = 0

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(1, true, this.layers.collision_layer);
		this.map.setTileIndexCallback(45, this.hitWall, this);

		this.layers.ground_layer.resizeWorld();

		// Dungeon 3 sprite stuff below
		/////////////////////////////////////////////////

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

		// Portals
		this.portal = game.add.sprite(3000, 800, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal.animations.play('rotate');
		game.physics.arcade.enable(this.portal);

		this.portal2 = game.add.sprite(3000, 400, 'red_portal');
		this.portal2.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal2.animations.play('rotate');
		game.physics.arcade.enable(this.portal2);

		this.enemy = game.add.sprite(1280, 850, 'ghost');

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


		// set coins
		this.coins = game.add.group();
		this.coins.enableBody = true;
		for(var i = 0; i < 100; i++){
			this.coins.create((Math.random() * 6000), (Math.random() * 7000), 'coin');
		}
		var total_coins = game.global.coins;
		this.coins.scale.setTo(.5, .5);


		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 1728;
		this.player.y = 1024;
		this.alive = true;

		// turn physics on for enemy
		game.physics.arcade.enable(this.enemy);

		this.enemy.body.collideWorldBounds = true;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		game.addPauseButton(game);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


		
		this.flag = true;
		this.walkAnim = true;
		this.walkAnim2 = true;

		this.frame_counter = 0;

	},

	update: function () {

		this.act();

		this.hud.displayHud();

		this.frame_counter++;

		this.moveTowardPlayer(this.enemy, 50, this.flag);
		this.checkPlayerTransport(this.player);

		// Transporting

		game.physics.arcade.overlap(this.player, this.portal, function (player, portal) {game.state.start('level_04');}, null, this);
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


	/**
	 * Very basic move monster towards player function.
	 * Some options to make it better would be to:
	 *  - Parameterize it so you can pass in values to adjust behaviors
	 *  - Add animations to make gameplay look better
	 *  - Add some random behaviors (like swap direction based on random choices)
	 */
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

	/**
	 * basic check for attack (not good)
	 */
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
						game.global.health -= 5;
					}
				}
				this.myHealthBar.setPercent(game.global.health / 100);
			}
			else{
				enemy.body.velocity.y = 0;
				enemy.animations.play('attack_right');
				if(Math.abs(xClose + yClose) < 100){
					if(this.frame_counter % 50 == 0){
						game.global.health -= 5;
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
		if (player.x < 100) {
			game.state.start('level_02');
		} else if (player.x > 4060) {
			game.state.start('level_03');
		} 
	},

	act: function()
	{
		//healthbar have to follow player, so I creat a function to fill everything in it
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