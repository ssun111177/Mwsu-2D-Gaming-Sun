var level_04 = {

	preload: function () {
		console.log("level_04");
		// Load tile map
		game.load.tilemap('level_04', 'assets/maps/islands.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:

        game.load.image("ground","assets/tileset/ground/ground.png");
        game.load.image("earth_dark","assets/tileset/ground/ridge/earth_dark.png");
        game.load.image("grass_edges","assets/tileset/ground/grass_edges.png");
        game.load.image("grass_corners","assets/tileset/ground/grass_corners.png");
        game.load.image("grasses","assets/tileset/plant/grasses.png");
        game.load.image("earth_edges","assets/tileset/ground/earth_edges.png");
        game.load.image("huge_animal","assets/tileset/item/corpse/huge_animal.png");
        game.load.image("small_stump","assets/tileset/plant/stump/small_stump.png");
        game.load.image("eye","assets/tileset/ground/eye.png");
        game.load.image("collision","assets/tileset/logic/collision.png");
        game.load.image("portal","assets/tileset/logic/portal.png");
        game.load.image("palm_tree","assets/tileset/plant/tree/palm_tree.png");
        game.load.image("tree_blue","assets/tileset/plant/tree/tree_blue.png");
        game.load.image("tree_golden_large","assets/tileset/plant/tree/tree_golden_large.png");
        game.load.image("tree_golden_small","assets/tileset/plant/tree/tree_golden_small.png");
        game.load.image("green_stone_2","assets/tileset/item/statue/green_stone_2.png");
        game.load.image("blue_circle","assets/tileset/building/decoration/blue_circle.png");
        game.load.image("giant_human","assets/tileset/logic/creature/giant_human.png");
        game.load.image("naga","assets/tileset/logic/creature/naga.png");
        game.load.image("daisy_white","assets/tileset/plant/flower/daisy_white.png");
        game.load.image("daisy_yellow","assets/tileset/plant/flower/daisy_yellow.png");
        game.load.image("stump_pale_brown","assets/tileset/plant/stump/stump_pale_brown.png");
        game.load.image("stump_brown","assets/tileset/plant/stump/stump_brown.png");
        game.load.image("floor_sparkle","assets/tileset/building/decoration/floor_sparkle.png");
        game.load.image("green_stone_3","assets/tileset/item/statue/green_stone_3.png");
        game.load.image("vine","assets/tileset/plant/vine.png");
        game.load.image("clouds","assets/tileset/sky/cloud/clouds.png");
        game.load.image("fairy","assets/tileset/logic/creature/fairy.png");
        game.load.image("demon","assets/tileset/logic/creature/demon.png");
        game.load.image("elemental","assets/tileset/logic/creature/elemental.png");
        game.load.image("suspension_bridge","assets/tileset/object/suspension_bridge.png");
	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_04');
        this.map.addTilesetImage('ground_2', 'ground_2');
        this.map.addTilesetImage('ground', 'ground');
        this.map.addTilesetImage('earth_dark', 'earth_dark');
        this.map.addTilesetImage('grass_edges', 'grass_edges');
        this.map.addTilesetImage('grass_corners', 'grass_corners');
        this.map.addTilesetImage('grasses', 'grasses');
        this.map.addTilesetImage('earth_edges', 'earth_edges');
        this.map.addTilesetImage('huge_animal', 'huge_animal');
        this.map.addTilesetImage('small_stump', 'small_stump');
        this.map.addTilesetImage('eye', 'eye');
        this.map.addTilesetImage('collision', 'collision');
        this.map.addTilesetImage('portal', 'portal');
        this.map.addTilesetImage('palm_tree', 'palm_tree');
        this.map.addTilesetImage('tree_blue', 'tree_blue');
        this.map.addTilesetImage('tree_golden_large', 'tree_golden_large');
        this.map.addTilesetImage('tree_golden_small', 'tree_golden_small');
        this.map.addTilesetImage('green_stone_2', 'green_stone_2');
        this.map.addTilesetImage('blue_circle', 'blue_circle');
        this.map.addTilesetImage('giant_human', 'giant_human');
        this.map.addTilesetImage('naga', 'naga');
        this.map.addTilesetImage('daisy_white', 'daisy_white');
        this.map.addTilesetImage('daisy_yellow', 'daisy_yellow');
        this.map.addTilesetImage('stump_pale_brown', 'stump_pale_brown');
        this.map.addTilesetImage('stump_brown', 'stump_brown');
        this.map.addTilesetImage('floor_sparkle', 'floor_sparkle');
        this.map.addTilesetImage('green_stone_3', 'green_stone_3');
        this.map.addTilesetImage('vine', 'vine');
        this.map.addTilesetImage('clouds', 'clouds');
        this.map.addTilesetImage('fairy', 'fairy');
        this.map.addTilesetImage('demon', 'demon');
        this.map.addTilesetImage('elemental', 'elemental');
        this.map.addTilesetImage('suspension_bridge', 'suspension_bridge');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			roof_add: this.map.createLayer('4_roof_add'),
			collision_layer: this.map.createLayer('collision')
        };


		this.layers.collision_layer.alpha = 0;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(243, true, this.layers.collision_layer);

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
		this.myHealthBar.setPercent(game.global.health / 100);

		this.enemy = game.add.sprite(1500, 200, 'ghost');

		this.portal = game.add.sprite(3600, 3600, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal.animations.play('rotate');

		this.portal2 = game.add.sprite(1800, 500, 'red_portal');
		this.portal2.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal2.animations.play('rotate');


		this.portal3 = game.add.sprite(600, 3600, 'red_portal');
		this.portal3.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal3.animations.play('rotate');


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

		this.coins = game.add.group();
		this.coins.enableBody = true;

		var total_coins = game.global.coins;
		this.coins.scale.setTo(.5, .5);

		for(var i = 0; i < 100; i++){
			this.coins.create((Math.random() * 6000), (Math.random() * 7000), 'coin');
		}

		// turn physics on for player
		game.physics.arcade.enable(this.player);
		game.physics.arcade.enable(this.enemy);
		game.physics.arcade.enable(this.portal);
		game.physics.arcade.enable(this.portal2);
		game.physics.arcade.enable(this.portal3);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 2080;
		this.player.y = 2080;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.alive = true;

		this.enemy.body.collideWorldBounds = true;

		game.addPauseButton(game);
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.flag = true;

		this.walkAnim = true;
		this.walkAnim2 = true;
		this.walkAnim3 = true;

		this.frame_counter = 0;

		game.addPauseButton(game);
	},

	update: function () {

		this.act();

		this.hud.displayHud();

		this.getTileProperties(this.layers.collision_layer,this.player);

		this.frame_counter++;

		this.moveTowardPlayer(this.enemy, 50);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);
		game.physics.arcade.overlap(this.player, this.portal, function (player, portal) {game.state.start('level_03');}, null, this);
		game.physics.arcade.overlap(this.player, this.portal2, function (player, portal) {game.state.start('level_05');}, null, this);
		
		game.physics.arcade.overlap(this.player, this.portal3, function (player, portal) {
			this.player.x = 635;
			this.player.y = 355;}, null, this);	
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
							game.global.health -= 20;
						}
					}
					this.myHealthBar.setPercent(game.global.health / 100);
				}
				else{
					enemy.body.velocity.y = 0;
					enemy.animations.play('attack_right');
					if(Math.abs(xClose + yClose) < 100){
						if(this.frame_counter % 50 == 0){
							game.global.health -= 20;
						}
					}
					this.myHealthBar.setPercent(game.global.health / 100);
				}
				
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