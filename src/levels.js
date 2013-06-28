﻿
/*
 * 关卡对象，保存了每关地图的关卡
 */
 
var levels = [];

/*
 * 空格代表空格，不对应组件
 * i表示屋内tile，对应组件TileInsideFloor
 * o表示屋内tile，对应组件TileOutsideFloor
 * g表示目标的位置，对应组件TileUncoveredGoal
 * p表示玩家的开始位置，对应组件Player
 * c表示角落，对应组件TileCorner
 * w表示墙，对应组件TileWall
 * s表示星星的位置，对应组件Star
 */

mappingToComponent = {
    ' ':' ',
	'i':'TileInsideFloor',
	'o':'TileOutsideFloor',
	'g':'TileUncoveredGoal',
	'c':'TileCorner',
	'w':'TileWall',
	'p':'Player',
	's':'Star'
}

var level1 = {
	state:{},
	map:{
		goals:4,
		ground:[
			['o','c','w','w','w','w','w','w','c'],
			['c','c','i','i','i','i','i','i','w'],
			['w','i','i','i','g','i','i','i','w'],
			['w','i','i','i','i','i','i','i','w'],
			['w','i','g','i','i','i','g','i','w'],
			['c','w','w','c','i','i','i','i','w'],
			['o','o','o','w','g','i','i','i','w'],
			['o','o','o','w','i','i','i','c','c'],
			['o','o','o','c','w','w','w','c','o'],
		],
		objects:[
			[' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ','s',' ',' ',' ',' '],
			[' ',' ',' ','s','p','s',' ',' ',' '],
			[' ',' ',' ',' ','s',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' '],
		]
	}
};

var level2 = {
	state:{},
	map:{
		goals:3,
		ground:[
			['o','o','o','c','w','c','o','o','o','o','o'],
			['o','o','c','c','i','w','i','c','w','w','c'],
			['o','c','c','i','i','c','w','c','i','i','w'],
			['c','c','i','i','i','i','i','i','i','i','w'],
			['w','i','i','i','i','i','i','w','i','i','w'],
			['c','w','c','i','i','w','w','w','i','i','w'],
			['o','o','w','i','i','w','g','g','i','i','w'],
			['o','c','c','i','w','w','g','w','i','c','w'],
			['o','w','i','i','i','i','i','i','c','c','o'],
			['o','w','i','i','i','i','i','c','c','o','o'],
			['o','c','w','w','w','w','w','w','o','o','o']
		],
		objects:[
			[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ','s',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ','p','s',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ','s',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		]
	}
};

levels.push(level1);
levels.push(level2);