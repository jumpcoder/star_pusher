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
	width:function(){
		return this.stageGrid.width * this.stageGrid.cell.width;
	},
	height:function(){
		return this.stageGrid.height * this.stageGrid.cell.height;
	},
	start:function(){
		Crafty.init(this.width(), this.height());
		Crafty.background(this.backgroundColor);
		Crafty.scene('Loading');
	
	}
	
}