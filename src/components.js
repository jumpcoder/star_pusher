

//基础组件
//事件组件
/**@
* #Event
* Component provide the method that can according to different collision situation trigger specify event once.
# 
*/

Crafty.c('Event',{
	init:function(){
		this.addComponent('2D,Collision');
	},
    /**@
    * #.cover
	* @comp Event
	* @sign public this .cover(String component, String coverEvent[, String scope])
	* @sign public this .cover(String component, String coverEvent[, String uncoverEvent, String scope])
	* @param component - Component to check collisions for
	* @param coverEvent - Event name that will be triggered once, when other entity within current entity.
	* @param uncoverEvent - Event name that will be triggered once, when other entity leave current entity.
	* @param scope - Determine that the event will be triggered globally or only be triggered for the entity
	*
	* trigger an specified event when an entity within current entity.
	*/
	cover:function(comp, coverEvent){
		var cover = false;
		if(arguments.length === 3){
			var scope = arguments[2];
			this.bind('EnterFrame', function(){
				var hitdata = this.hit(comp);
				if(hitdata){
					if(!cover){
						if(this.contains(hitdata[0].obj.x, hitdata[0].obj.y, hitdata[0].obj.w, hitdata[0].obj.h)){
							cover = true;
							if(scope === 'g'){
								Crafty.trigger(coverEvent);
							}else{
								hitdata[0].obj.trigger(coverEvent);
							}
						}
					}
				}else{
					if(cover){
						cover = false;
					}
				}
			});
		}else{
			var uncoverEvent = arguments[2], scope = arguments[3];
			this.bind('EnterFrame', function(){
				var hitdata = this.hit(comp);
				if(hitdata){
					if(!cover){
						if(this.contains(hitdata[0].obj.x, hitdata[0].obj.y, hitdata[0].obj.w, hitdata[0].obj.h)){
							cover = true;
							if(scope === 'g'){
								Crafty.trigger(coverEvent);
							}else{
								hitdata[0].obj.trigger(coverEvent);
							}
						}
					}
				}else{
					if(cover){
						if(uncoverEvent){
							if(scope === 'g'){
								Crafty.trigger(uncoverEvent);
							}else{
								hitdata[0].obj.trigger(uncoverEvent);
							};
						}
						cover = false;
					}
				}
			});
		}
		return this;
	},
    /**@
    * #.contact
	* @comp Event
	* @sign public this .contact(String component, String contactEvent[, String scope])
	* @sign public this .contact(String component, String contactEvent[, String uncontactEvent, String scope])
	* @param component - Component to check collisions for
	* @param contactEvent - Event name that will be triggered once, when other entity intersect current entity.
	* @param uncontactEvent - Event name that will be triggered once, when other entity leave current entity.
	* @param scope - Determine that the event will be triggered globally or only be triggered for the entity
	*
	* trigger an specified event when an entity within current entity.
	*/
	contact:function(comp, contactEvent,uncontactEvent, scope){
		var contact = false;
		if(arguments === 3){
			var scope = arguments[2];
			this.bind('EnterFrame', function(){
				var hitdata = this.hit(comp);
				if(hitdata){
					if(!contact){
						if(this.intersect(hitdata[0].obj.x, hitdata[0].obj.y, hitdata[0].obj.w, hitdata[0].obj.h)){
							contact = true;
							if(scope === 'g'){
								Crafty.trigger(contactEvent);
							}else{
								hitdata[0].obj.trigger(contactEvent);
							}
						}
					}
				}else{
					if(contact){
						contact = false;
					}
				}
			});
		}else{
			var uncontactEvent = arguments[2], scope = arguments[3];
			this.bind('EnterFrame', function(){
				var hitdata = this.hit(comp);
				if(hitdata){
					if(!contact){
						if(this.intersect(hitdata[0].obj.x, hitdata[0].obj.y, hitdata[0].obj.w, hitdata[0].obj.h)){
							contact = true;
							if(scope === 'g'){
								Crafty.trigger(contactEvent);
							}else{
								hitdata[0].obj.trigger(contactEvent);
							}
						}
					}
				}else{
					if(contact){
						if(uncontactEvent){
							if(scope === 'g'){
								Crafty.trigger(uncontactEvent);
							}else{
								hitdata[0].obj.trigger(uncontactEvent);
							};
						}
						contact = false;
					}
				}
			});
		}
		return this;
	}
});



//用于绘制的Draw组件
Crafty.c('Draw',{
	init:function(){
		this.addComponent('2D', 'DOM');
	}
});



/*
 * 精灵组件
 */
 
Crafty.sprite(50, 85, 'asserts/RedSelector.png',{"SpriteUncoveredGoal":[0,0]});
Crafty.sprite(50, 85, 'asserts/Selector.png',{"SpriteCoveredGoal":[0,0]});
Crafty.sprite(50, 85, 'asserts/Wall_Block_Tall.png',{"SpriteCorner":[0,0]});
Crafty.sprite(50, 85, 'asserts/Wood_Block_Tall.png',{"SpriteWall":[0,0]});
Crafty.sprite(50, 85, 'asserts/Plain_Block.png',{"SpriteInsideFloor":[0,0]});
Crafty.sprite(50, 85, 'asserts/Grass_Block.png',{"SpriteOutsideFloor":[0,0]});

Crafty.sprite(492, 279, 'asserts/star_title.png',{"SpriteStartTitle":[0,0]});
Crafty.sprite(499, 184, 'asserts/star_solved.png',{"SpriteSolvedTitle":[0,0]});

Crafty.sprite(50, 85, 'asserts/Star.png',{"SpriteStar":[0,0]});
Crafty.sprite(50, 85, 'asserts/princess.png',{"SpritePlayer":[0,0]});
Crafty.sprite(50, 85, 'asserts/Rock.png',{"SpriteRock":[0,0]});
Crafty.sprite(50, 85, 'asserts/Tree_Short.png',{"SpriteTreeShort":[0,0]});
Crafty.sprite(50, 85, 'asserts/Tree_Tall.png',{"SpriteTreeTall":[0,0]});
Crafty.sprite(50, 85, 'asserts/Tree_Ugly.png',{"SpriteTreeUgly":[0,0]});

//title组件
Crafty.c('TitleStart',{
	init:function(){
		this.addComponent('Draw','SpriteStartTitle');
	}
});

Crafty.c('TitleSolved', {
	init:function(){
		this.addComponent('Draw', 'SpriteSolvedTitle');
	}
});

//tile组件
//地板tile的高由25px,40px,20px三段构成，其中的40px刚好又可以分为15px和25px两段
Crafty.c('TileInsideFloor',{
	init:function(){
		this.addComponent('Draw', 'SpriteInsideFloor');
	}
});

//草地tile的高由25px,40px,20px三段构成，其中的40px刚好又可以分为15px和25px两段
Crafty.c('TileOutsideFloor',{
	init:function(){
		this.addComponent('Draw', 'SpriteOutsideFloor');
	}
});

Crafty.c('TileUncoveredGoal',{
	init:function(){
		var width = Game.stageGrid.tile.width;
		var marginTop = 25;
		var height = 65;
		
		this.addComponent('Draw', 'SpriteUncoveredGoal','Event')
			.collision([0,marginTop],[0,height],[width,height],[width,marginTop])
			.cover('Star','SolvedOne','UnsolvedOne','g');
	}
});



//Solid + Static
Crafty.c('TileCorner',{
	init:function(){
		var width = Game.stageGrid.tile.width;
		var marginTop = 25;
		var height = 65;
		//var height = Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight + marginTop;
		this.addComponent('Draw', 'SpriteCorner','Static')
			.collision([0,marginTop],[0,height], [width,height], [width,marginTop]);
	}
});

Crafty.c('TileWall',{
	init:function(){
		var width = Game.stageGrid.tile.width;
		var marginTop = 25;
		var height = 65;
		this.addComponent('Draw', 'SpriteWall' , 'Static')
			.collision([0,marginTop],[0,height], [width,height], [width,marginTop]);
	}
});


/*
 * Push和Static是互斥的一个描述可以推动的实体，一个描述不能推动的实体
 *
 */
 
//Solid表示不能穿过的物体
Crafty.c('Solid', {
	init:function(){
		this.addComponent('Collision');
	}
});

//Static表示不能穿过且无法被移动的物体
Crafty.c('Static',{
	init:function(){
		this.addComponent('Solid');
	}
	
});

//Pushed表示不能穿过且能够被推动指定单位的物体
//想法：提供具有更多参数的初始化函数，可以指定移动的单位和移动的次数，或一直移动直到碰到其它的Solid实体时停下

Crafty.c('Pushed',{
	xDistance:0,
	yDistance:0,
	init:function(){
		this.addComponent('Solid')
			.bind('PushAtTop', this._pushDown)
			.bind('PushAtRight', this._pushToLeft)
			.bind('PushAtBottom', this._pushUp)
			.bind('PushAtLeft', this._pushToRight);
			
	},
	pushed:function(xDistance, yDistance){
		this.xDistance = xDistance;
		this.yDistance = yDistance;
		return this;
	},
	//在移动前需要提前测试移动方向是否有Solid实体阻挡，使用Crafty.map来做，也可以使用一个透明的实体来做
	_pushDown:function(){
		var widthCenter = this.x + this.w/2;
		var heightCenter = this.y + this.h;
		var goal = null;
		//获取和指定区域相接触的所有实体，因为长方形的tile重叠的部分比较多所以会返回多个实体
		var entitys = Crafty.map.search({_x:widthCenter+1, _y:heightCenter+1, _w:1, _h:1});
		//筛选需要做检测的实体
		for(var i = 0; i < entitys.length; i++){
			//因为上下两个tile的间距是40
			if(this.y + 40 === entitys[i].y){
				goal = entitys[i];
			}
		}
		//如果实体不是Solid实体则移动当前实体
		if(!goal.has('Solid')){
			this.y += this.yDistance;
			this.z += this.yDistance;
		}

		return this;
	},
	_pushUp:function(){
		var widthCenter = this.x + this.w/2;
		var heightCenter = this.y;	
		var goal = null;
		var entitys = Crafty.map.search({_x:widthCenter+1, _y:heightCenter+5, _w:1, _h:1});
		
		for(var i = 0; i < entitys.length; i++){
			if(this.y - 40 === entitys[i].y){
				goal = entitys[i];
			}
		}
		if(!goal.has('Solid')){
			this.y -= this.yDistance;
			this.z -= this.yDistance;
		}

		return this;
	},
	_pushToRight:function(){
		var widthCenter = this.x + this.w + this.w/2;
		var heightCenter = this.y + this.h/2;
		var goal = null;
		var entitys = Crafty.map.search({_x:widthCenter+1, _y:heightCenter+1, _w:1, _h:1});
		
		for(var i = 0; i < entitys.length; i++){
			if(this.y === entitys[i].y){
				goal = entitys[i];
			}
		}
		if(!goal.has('Solid')){
			this.x += this.xDistance;
		}
		return this;
	},
	_pushToLeft:function(){
		var widthCenter = this.x - this.w/2;
		var heightCenter = this.y + this.h/2;
		var goal = null;
		var entitys = Crafty.map.search({_x:widthCenter+1, _y:heightCenter+1, _w:1, _h:1});
		
		for(var i = 0; i < entitys.length; i++){
			if(this.y === entitys[i].y){
				goal = entitys[i];
			}
		}
		if(!goal.has('Solid')){
			this.x -= this.xDistance;
		}
		return this;
	}
});


/*
 *位于地图上的对象组件
 */
 
Crafty.c('Star',{
	init:function(){
		this.addComponent('Draw', 'SpriteStar', 'Pushed')
			.collision([0,25],[0,65],[50,65],[50,25])
			.pushed(Game.stageGrid.tile.width, Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight);
	}
});


Crafty.c('Player',{
	_moved:false,
	init:function(){
		this.addComponent('Draw', 'SpritePlayer', 'Multiway', 'Solid')
			.collision([10,34],[10,56],[42,56],[42,34])
			.multiway(4, {UP_ARROW:-90, DOWN_ARROW:90,RIGHT_ARROW:0,LEFT_ARROW:180})
			//只要实体的x，y轴发生改变就会触发Moved事件
			.bind('Moved', this._fixZ)
			.onHit('Static',this._stop)
			.onHit('Pushed',this._push);
	},
	//动态改变实体z轴的值，修复实体被地图tile遮挡的问题
	_fixZ:function(oldPosition){
		//注意z值需要是一个整数，否则globalZ不会乘以10000
		var fix = 25;
		this.z = Math.ceil(this.y  + fix);
		return this;
	},
	//一旦和Static实体发生碰撞，则停止实体的移动
	_stop:function(){
		this._speed = 0;
		this._moved = false;
		if(this._movement){
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
		return this;
		
	},
	_push:function(data){
		this._speed = 0;
		if(this._movement){
			this.x -= this._movement.x;
			this.y -= this._movement.y;
			if(data[0].normal.x === 0 && data[0].normal.y === -1){
				data[0].obj.trigger('PushAtTop');
			}else if(data[0].normal.x === 1 && data[0].normal.y === 0){
				data[0].obj.trigger('PushAtRight');
			}else if(data[0].normal.x === 0 && data[0].normal.y === 1){
				data[0].obj.trigger('PushAtBottom');
			}else if(data[0].normal.x === -1 && data[0].normal.y === 0){
				data[0].obj.trigger('PushAtLeft');
			}
		}
		return this;
	}
	
});