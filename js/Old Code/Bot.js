//Taylor Premo -life 2.0
//Map.js

/**	Map Object
*	2d array of Animal, food, ect..
*	
**/	
Board = function(boardSize){//larger, contains 'map info'
	console.log('9');

	this.currentMap = new Map(boardSize);
	this.newMap = new Map(boardSize);//will probably need to implement this somehow.
	this.size = boardSize;
	this.population;//might want this to be global?

	//var blockHeight  = canvas.height / 10;

	//if(canvas.height > canvas.width){//ensure the grid fits on the canvas
	//	blockHeight = canvas.width / this.size.width;
	//}

	this.update = function(){
		for(var i = 0; i < this.size.width; i++){
			for(var j = 0; j < this.size. height; j++){
				//console.log(i + " " + j);
				this.currentMap[i][j].update();
			}
		}
	}

	this.add = function(block){
		console.log(block.type);

		var x = block.location.x;
		var y = block.location.y;

		this.currentMap[x][y] = block;
	}

	this.getEmpty = function(){
		var x = Math.floor(Math.random()*this.size.width);
		var y = Math.floor(Math.random()*this.size.height);

		while(this.currentMap[x][y].type != 'empty'){
			x = Math.floor(Math.random()*this.size.width);
			y = Math.floor(Math.random()*this.size.height);

		}

		var location = new Point(x, y);

		return location;
	}

	this.drawGrid = function(){
		//horizontal
		for(var i = 0; i < this.size.height+1; i++){
			context.strokeStyle = '#000';
		    context.beginPath();
		    context.moveTo(0, i*bodySize); 
		    context.lineTo(canvas.width, i*bodySize);
		    context.lineWidth = 1;
		    context.stroke();
		    context.closePath();  

			/*context.drawLine(new Pen(Brushes.black, 1), 
				new Point(0, i*blockHeight), 
				new Point(this.size.width, i*blockHeight)
			);*/
		}
		//vertical
		for(var i = 0; i < this.size.width+1; i++){
			context.strokeStyle = '#000';
		    context.beginPath();
		    context.moveTo(i*bodySize, 0); 
		    context.lineTo(i*bodySize, canvas.height);
		    context.lineWidth = 1;
		    context.stroke();
		    context.closePath();

			/*context.drawLine(new Pen(Brushes.black, 1), 
				new Point(i*blockWidth, 0), 
				new Point(i*blockWidth, this.size.height)
			);*/
		}
	}

	this.draw = function(){
		for(var i = 0; i < this.size.width; i++){
			for(var j = 0; j < this.size.height; j++){
				console.log(this.currentMap[i][j].type);
				this.currentMap[i][j].draw();
			}
		}
	}
}

Map = function(mapSize){//actual 2d array
	//this = [];
	var map = [];
	for(var i = 0; i < mapSize.width; i++){
		map[i] = [];
		for(var j = 0; j < mapSize.height; j++){
			map[i][j] = new Empty();
		}
	}

	return map;
}