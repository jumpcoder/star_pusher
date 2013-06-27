var start = function(){
	Game.start();

};
var Game = {
	stageGrid:{
		width:12,
		height:10,
		cell:{
			width:50,
			height:85-45
		},
		tile:{
			width:50,
			height:85,
			floorHeight:45
		}
	},
	currentLevelIndex:0,
	backgroundColor:"rgb(0,170,255)",
	currentMap:{
		paddingXToCenter:0,
		paddingYToCenter:0
	},
	stage:{
		width:function(){
			return Game.stageGrid.width * Game.stageGrid.cell.width;
		},
		height:function(){
			return Game.stageGrid.height * Game.stageGrid.cell.height;
		}
	},
	start:function(){
		Crafty.init(this.stage.width(), this.stage.height());
		Crafty.background(this.backgroundColor);
		Crafty.scene('Loading');
	
	}
	
};

