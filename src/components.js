

//精灵组件
Crafty.sprite(50, 85, 'asserts/RedSelector.png',{"SpriteUncoveredGoal":[0,0]});
Crafty.sprite(50, 85, 'asserts/Selector.png',{"SpriteCoveredGoal":[0,0]});
Crafty.sprite(50, 85, 'asserts/Wall_Block_Tall.png',{"SpriteCorner":[0,0]});
Crafty.sprite(50, 85, 'asserts/Wood_Block_Tall.png',{"SpriteWall":[0,0]});
Crafty.sprite(50, 85, 'asserts/Plain_Block.png',{"SpriteInsideFloor":[0,0]});
Crafty.sprite(50, 85, 'asserts/Grass_Block.png',{"SpriteOutsideFloor":[0,0]});

Crafty.sprite(50, 85, 'asserts/star_title.png',{"SpriteStartTitle":[0,0]});
Crafty.sprite(50, 85, 'asserts/star_solved.png',{"SpriteEndTitle":[0,0]});

Crafty.sprite(50, 85, 'asserts/Star.png',{"SpriteStar":[0,0]});
Crafty.sprite(50, 85, 'asserts/princess.png',{"SpritePlayer":[0,0]});
Crafty.sprite(50, 85, 'asserts/Rock.png',{"SpriteRock":[0,0]});
Crafty.sprite(50, 85, 'asserts/Tree_Short.png',{"SpriteTreeShort":[0,0]});
Crafty.sprite(50, 85, 'asserts/Tree_Tall.png',{"SpriteTreeTall":[0,0]});
Crafty.sprite(50, 85, 'asserts/Tree_Ugly.png',{"SpriteTreeUgly":[0,0]});

//tile组件
Crafty.c('TileInsideFloor',{
	init:function(){
		this.addComponent("2D, DOM, SpriteInsideFloor");
	}
});

Crafty.c('TileOutsideFloor',{
	init:function(){
		this.addComponent("2D, DOM, SpriteOutsideFloor");
	}
});

Crafty.c('TileUncoveredGoal',{
	init:function(){
		this.addComponent("2D, DOM, SpriteUncoveredGoal");
	}
});

//Solid + StaticSolid
Crafty.c('TileCorner',{
	init:function(){
		var width = Game.stageGrid.tile.width;
		var height = Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight;
		this.addComponent("2D, DOM, SpriteCorner,Collision, Solid, StaticSolid")
			.collision([0,2],[width,2],[width,height+2],[0,height+2]);
	}
});

Crafty.c('TileWall',{
	init:function(){
		var width = Game.stageGrid.tile.width;
		var height = Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight;
		this.addComponent("2D, DOM, SpriteWall,Collision, Solid, StaticSolid")
			.collision([0,2],[width,2],[width,height+2],[0,height+2]);
	}
});

//位于地图上的对象组件
//Solid + PushSolid
Crafty.c('Star',{
	_testMove:12,
	init:function(){
		this.addComponent("2D, DOM, SpriteStar,Solid, PushSolid, Collision, WiredHitBox")
		.collision([4,12],[4,58],[46,58],[46,12])
		.bind('PushTop',this._pushDown)
		.bind('PushRight',this._pushLeft)
		.bind('PushBottom',this._pushTop)
		.bind('PushLeft',this._pushRight);
	},
	_pushDown:function(){
		this.y += this._testMove;//试探性地移动
		if(this.hit('Solid')){
			this.y -= this._testMove;
		}else{
			this.y -= this._testMove;
			this.y += Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight;
		}
	},
	_pushTop:function(){
		this.y -= this._testMove;
		if(this.hit('Solid')){
			this.y += this._testMove;
		}else{
			this.y += this._testMove;
			this.y -= Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight;
		}
	},
	_pushRight:function(){
		this.x += this._testMove;
		console.log('Right!',this.hit('StaticSolid'));
		if(this.hit('Solid')){
			console.log('Hit!');
			this.x -= this._testMove;
		}else{
			console.log('NoHit!');
			this.x -= this._testMove;
			this.x += Game.stageGrid.tile.width;
		}
	},
	_pushLeft:function(){
		this.x -= this._testMove;
		if(this.hit('Solid')){
			this.x += this._testMove;
		}else{
			this.x += this._testMove;
			this.x -= Game.stageGrid.tile.width;
		}
	}
});

Crafty.c('Player',{
	
	init:function(){
		this.addComponent('2D, DOM, SpritePlayer, Solid, Collision, Multiway')
			.collision([4,8],[4,54],[46,54],[46,8])
			.multiway(4, {UP_ARROW:-90, DOWN_ARROW:90,RIGHT_ARROW:0,LEFT_ARROW:180})
			.onHit('StaticSolid',this._stopMovement)
			.onHit('PushSolid',this._push);
	},
	_stopMovement:function(){
		this._speed = 0;
		if(this._movement){
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
	},
	_push:function(data){
		this._speed = 0;
		if(this._movement){
			this.x -= this._movement.x;
			this.y -= this._movement.y;
			if(data[0].normal.x === 0 && data[0].normal.y === -1){
				data[0].obj.trigger('PushTop');
			}else if(data[0].normal.x === 1 && data[0].normal.y === 0){
				data[0].obj.trigger('PushRight');
			}else if(data[0].normal.x === 0 && data[0].normal.y === 1){
				data[0].obj.trigger('PushBottom');
			}else if(data[0].normal.x === -1 && data[0].normal.y === 0){
				data[0].obj.trigger('PushLeft');
			}
		}
	}
});