var level_05 = {

	preload: function () {
		console.log("level_05");
		// Load tile map
		game.load.tilemap('level_05', 'assets/maps/cave2.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
        game.load.image("brown","assets/tileset/ground/brown.png");
        game.load.image("skull_dark","assets/tileset/item/corpse/skull_dark.png");
        game.load.image("grey_stone","assets/tileset/item/statue/grey_stone.png");
        game.load.image("eye","assets/tileset/ground/eye.png");
        game.load.image("dark_stairs","assets/tileset/building/stairs/dark_stairs.png");
        game.load.image("portal","assets/tileset/logic/portal.png");
        game.load.image("collision","assets/tileset/logic/collision.png");
        game.load.image("enormous_creature","assets/tileset/logic/creature/enormous_creature.png");
        game.load.image("demon","assets/tileset/logic/creature/demon.png");
        game.load.image("elemental","assets/tileset/logic/creature/elemental.png");
        game.load.image("undead","assets/tileset/logic/creature/undead.png");
        game.load.image("human","assets/tileset/logic/creature/human.png");
        game.load.image("iron_lamp","assets/tileset/furniture/light/iron_lamp.png");
        game.load.image("flames","assets/tileset/furniture/light/flames.png");
        game.load.image("skeleton","assets/tileset/item/corpse/skeleton.png");
        game.load.image("metal_and_stone","assets/tileset/item/statue/metal_and_stone.png");
        game.load.image("floor_stains_2","assets/tileset/item/blood/floor_stains_2.png");
        game.load.image("floor_stain","assets/tileset/item/blood/floor_stain.png");
        game.load.image("nsew_stains","assets/tileset/item/blood/nsew_stains.png");
        game.load.image("int_rock","assets/tileset/building/wall/int_rock.png");
        game.load.image("brown_edges","assets/tileset/ground/brown_edges.png");
        game.load.image("tan_building","assets/tileset/building/tan_building.png");
        game.load.image("sand_1","assets/tileset/ground/sand_1.png");
        game.load.image("sand_2","assets/tileset/ground/sand_2.png");
        game.load.image("brown_corners","assets/tileset/ground/brown_corners.png");
        game.load.image("window_centered","assets/tileset/building/window/window_centered.png");
        game.load.image("closed","assets/tileset/building/door/closed.png");
        game.load.image("door","assets/tileset/building/door/door.png");
        game.load.image("large_green","assets/tileset/plant/bush/large_green.png");
        game.load.image("dim_yellow_light_7x5","assets/tileset/light/dim_yellow_light_7x5.png");
        game.load.image("dim_yellow_light_5x5","assets/tileset/light/dim_yellow_light_5x5.png");

	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_05');
        this.map.addTilesetImage("brown","brown");
        this.map.addTilesetImage("skull_dark","skull_dark");
        this.map.addTilesetImage("grey_stone","grey_stone");
        this.map.addTilesetImage("eye","eye");
        this.map.addTilesetImage("dark_stairs","dark_stairs");
        this.map.addTilesetImage("portal","portal");
        this.map.addTilesetImage("collision","collision");
        this.map.addTilesetImage("enormous_creature","enormous_creature");
        this.map.addTilesetImage("demon","demon");
        this.map.addTilesetImage("elemental","elemental");
        this.map.addTilesetImage("undead",".undead");
        this.map.addTilesetImage("human","human");
        this.map.addTilesetImage("iron_lamp","iron_lamp");
        this.map.addTilesetImage("flames","flames");
        this.map.addTilesetImage("skeleton","skeleton");
        this.map.addTilesetImage("metal_and_stone","metal_and_stone");
        this.map.addTilesetImage("floor_stains_2","floor_stains_2");
        this.map.addTilesetImage("floor_stain","floor_stain");
        this.map.addTilesetImage("nsew_stains","nsew_stains");
        this.map.addTilesetImage("int_rock","int_rock");
        this.map.addTilesetImage("brown_edges","brown_edges");
        this.map.addTilesetImage("tan_building","tan_building");
        this.map.addTilesetImage("sand_1","sand_1");
        this.map.addTilesetImage("sand_2","sand_2");
        this.map.addTilesetImage("brown_corners","brown_corners");
        this.map.addTilesetImage("window_centered","window_centered");
        this.map.addTilesetImage("closed","closed");
        this.map.addTilesetImage("door","door");
        this.map.addTilesetImage("large_green","large_green");
        this.map.addTilesetImage("dim_yellow_light_7x5","dim_yellow_light_7x5");
        this.map.addTilesetImage("dim_yellow_light_5x5","dim_yellow_light_5x5");

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			//roof_layer: this.map.createLayer('3_roof'),
			//roof_add: this.map.createLayer('4_roof_add'),
            collision_layer: this.map.createLayer('collision')
        };


		this.layers.collision_layer.alpha = 0;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(39, true, this.layers.collision_layer);

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

		this.enemy = game.add.sprite(2000, 410, 'ghost');

		this.portal = game.add.sprite(1666, 3674, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal.animations.play('rotate');

		this.portal2 = game.add.sprite(469, 3828, 'red_portal');
		this.portal2.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal2.animations.play('rotate');

		this.portal3 = game.add.sprite(450, 2000, 'red_portal');
		this.portal3.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal3.animations.play('rotate');

		this.portal4 = game.add.sprite(500, 235, 'red_portal');
		this.portal4.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal4.animations.play('rotate');

		this.coins = game.add.group();
		this.coins.enableBody = true;

		for(var i = 0; i < 100; i++){
			this.coins.create((Math.random() * 6000), (Math.random() * 7000), 'coin');
		}

		var total_coins = game.global.coins;
		this.coins.scale.setTo(.5, .5);

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
		game.physics.arcade.enable(this.portal);
		game.physics.arcade.enable(this.portal2);
		game.physics.arcade.enable(this.portal3);
		game.physics.arcade.enable(this.portal4);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 2080;
		this.player.y = 1900;
		this.alive = true;

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
		this.walkAnim3 = true;

		this.frame_counter = 0;
		game.addPauseButton(game);
	},

	update: function () {
		this.act();

		this.hud.displayHud();

		this.getTileProperties(this.layers.collision_layer,this.player);

		this.frame_counter++;

		this.moveTowardPlayer(this.enemy, 50, this.flag, this.walkAnim);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);

		game.physics.arcade.overlap(this.player, this.portal, function (player, portal) {game.state.start('level_04');}, null, this);
		game.physics.arcade.overlap(this.player, this.portal2, function (player, portal) {game.state.start('level_03');}, null, this);
		game.physics.arcade.overlap(this.player, this.portal3, function (player, portal) {game.state.start('level_02');}, null, this);
		game.physics.arcade.overlap(this.player, this.portal4, function (player, portal) {game.state.start('level_01');}, null, this);


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
						game.global.health -= 25;
					}
				}
				this.myHealthBar.setPercent(game.global.health / 100);
			}
			else{
				enemy.body.velocity.y = 0;
				enemy.animations.play('attack_right');
				if(Math.abs(xClose + yClose) < 100){
					if(this.frame_counter % 50 == 0){
						game.global.health -= 25;
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