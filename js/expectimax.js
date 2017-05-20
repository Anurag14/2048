var Board=1;
var player=0;

GameManager.prototype.getBestMove = function (grid,depth) {
	// body...
	var score=Number.MIN_VALUE;
	var bestMove=0;

	for(var i=0;i<4;i++){
		var newGrid= grid.clone();
		if(newGrid.move(i)===false)
			continue;
		var newScore = this.expectimax(newGrid,depth-1,Board);

		if(newScore >score){
			bestMove=i;
			score=newScore;
		}

	}
	return bestMove;
}

GameManager.prototype.expectimax= function(grid,depth,agent){
	var self=this;

	if(depth==0)
		return grid.getScore();
	else if(agent=== Player){
		var score=Number.MIN_VALUE;

		for(var i=0;i<4;i++){
			var newGrid=grid.clone();
			var nextlevel= newGrid.move(i);
			if(nextlevel ===false){
				continue;
			}
			var newScore=this.expectimax(newGrid,depth-1,Board);
			if (newScore>score)
				score=newScore;
		}
		return score;
	}
	else if(agent==Board){
		var score=0;
		var cells= grid.availableCells();
		var totalfreecells=cells.length;
		for(var i=0;i<totalfreecells;i++){
			var newGrid=grid.clone();
			newGrid.insertTile(new Tile(cells[i],4));
            var newScore=self.expectimax(newGrid,depth-1,Player);
			if(newScore!==Number.MIN_VALUE)
				score+=(0.1*newScore);
			newGrid=grid.clone();
			newGrid/insertTile(new Tile(cells[i],2));
			newScore=self.expectimax(newGrid,depth-1,Player);
			if(newScore!==Number.MIN_VALUE)
				score+=(0.9*newScore);
		}
		return score;
	}
}