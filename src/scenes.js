
//该全局对象用于保存在所有场景中使用到的全局事件处理函数
var SceneHandle = {};

/*
 * 载入场景，此时将载入所有用到的图片，音频等文件
 *
 */

Crafty.scene('Loading', function(){
	Crafty.e('2D, DOM, Text')
		.text('Loading...')
		.attr({x:0, y:Game.stage.height()/2 - 24, w:Game.stage.width()})
		.css({'font-size':'24px', 'font-family':'Arial', 'color':'white', 'text-align':'center'});
	
	//需要载入的资源列表
	var assertList = [
			'asserts/RedSelector.png',
			'asserts/Selector.png',
			'asserts/Star.png',
			'asserts/Wall_Block_Tall.png',
			'asserts/Wood_Block_Tall.png',
			'asserts/Plain_Block.png',
			'asserts/Grass_Block.png',
			'asserts/star_title.png',
			'asserts/star_solved.png',
			'asserts/princess.png',
			'asserts/Rock.png',
			'asserts/Tree_Short.png',
			'asserts/Tree_Tall.png',
			'asserts/Tree_Ugly.png'
		];
	
	Crafty.load(assertList, function(){
		Crafty.scene('StartMenu');
	});
});

/*
 * 游戏开始场景
 *
 */
Crafty.scene('StartMenu',function(){
	var titleStart = Crafty.e('TitleStart').attr({x:0,y:0,z:1});
	
	var paddingToXCenter = (Game.stage.width() - titleStart.w) / 2;
	var paddingToYCenter = (Game.stage.height() - titleStart.h) / 2;
	titleStart.attr({x:paddingToXCenter, y:paddingToYCenter});
	
		
	//定义当按下键盘时的事件处理函数
	SceneHandle.changeToGame = function(){
		Crafty.scene('Game');
	};
	Crafty.bind('KeyDown', SceneHandle.changeToGame);
},function(){
	Crafty.unbind('KeyDown', SceneHandle.changeToGame);
});

/*
 * 游戏场景，此时将绘制地图和地图上的物体
 *
 */
Crafty.scene('Game', function(){
	//获得当前关卡的地图及其每一层
	var currentLevel = levels[Game.currentLevelIndex++];
	if(currentLevel === undefined){
		Crafty.scene('StartMenu');
	}
	var map = currentLevel.map;
	var ground = map.ground;
	var objects = map.objects;
	var goals = map.goals;
	
	//如果地图比舞台小时，用于将地图居中
	//用舞台的宽减去地图的宽再除以2
	Game.currentMap.paddingXToCenter = (Game.stageGrid.width * Game.stageGrid.cell.width - ground[0].length * Game.stageGrid.tile.width) / 2;
	//用舞台的高减去地图的高再除以2
	Game.currentMap.paddingYToCenter = (Game.stageGrid.height * Game.stageGrid.cell.height - (ground.length * (Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight) + Game.stageGrid.tile.floorHeight)) / 2;
	
	//如果舞台的宽小于地图的宽时将paddingXToCenter设置为0
	if(Game.currentMap.paddingXToCenter < 0){
		Game.currentMap.paddingXToCenter = 0;
	}
	//如果舞台的高小于地图的高时将paddingYToCenter设置为0
	if(Game.currentMap.paddingYToCenter < 0){
		Game.currentMap.paddingYToCenter = 0;
	}
	
	//遍历ground层将所有的tile绘制到屏幕上
	for(var row = 0; row < ground.length; row++){
		for(var col = 0; col < ground[row].length; col++){
			var tileComponent = mappingToComponent[ground[row][col]];
			console.log(tileComponent);
			if(tileComponent !== ' '){
				var e = Crafty.e(tileComponent)
					.attr({
						x:col * Game.stageGrid.tile.width + Game.currentMap.paddingXToCenter,
						y:row * (Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight) + Game.currentMap.paddingYToCenter,
						z:row * (Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight) + Game.currentMap.paddingYToCenter
					});
				console.log(row * (Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight));
			}
		}
	}
	
	//遍历objects层将所有位于地图上的物体绘制到屏幕上
	for(var row = 0; row < objects.length; row++){
		for(var col = 0; col < objects[row].length; col++){
			var tileComponent = mappingToComponent[objects[row][col]];
			console.log(tileComponent);
			if(tileComponent !== ' '){
				Crafty.e(tileComponent)
					.attr({
						x:col * Game.stageGrid.tile.width + Game.currentMap.paddingXToCenter,
						y:row * (Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight) + Game.currentMap.paddingYToCenter,
						z:row * (Game.stageGrid.tile.height - Game.stageGrid.tile.floorHeight) + Game.currentMap.paddingYToCenter + 1
					});
			}
		}
	}
	
	SceneHandle.changeToSolved = function(){
		if(--goals === 0){
			Crafty.scene('SolvedMenu');
		}
	};
	SceneHandle.changeToUnsolved = function(){
		goals++;
	};
	
	Crafty.bind('SolvedOne',SceneHandle.changeToSolved);
	Crafty.bind('UnsolvedOne', SceneHandle.changeToUnsolved);
	
},function(){
	Crafty.unbind('SolvedOne', SceneHandle.changeToSolved);
	Crafty.bind('UnsolvedOne', SceneHandle.changeToUnsolved);
});

/*
 * 游戏胜利场景
 *
 */
Crafty.scene('SolvedMenu',function(){
	var titleSolved = Crafty.e('TitleEnd').attr({x:0,y:0,z:1});
	
	var paddingToXCenter = (Game.stage.width() - titleStart.w) / 2;
	var paddingToYCenter = (Game.stage.height() - titleStart.h) / 2;
	titleSolved.attr({x:paddingToXCenter, y:paddingToYCenter});
	
		
	//事件处理函数已在StartMenu中定义
	Crafty.bind('KeyDown', SceneHandle.changeToGame);
},function(){
	Crafty.unbind('KeyDown', SceneHandle.changeToGame);
});