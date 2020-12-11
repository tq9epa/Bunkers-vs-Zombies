//canvas section
function Start() {
	canvasFunction();
	document.getElementById("startButton").style.display = "none";
}
function canvasFunction() {
	gameArea = {
		background:"grey",
		numX:15,
		numY:10,
		cubeWidth:80,
		cubeHeight:80,
		gameArea:[],
		fill:function(pole){
			for(let i=0;i<this.numY;i++){
				let helper=[];
				for(let j=0;j<this.numX;j++){
					helper.push(0);
				}
				pole.push(helper);
			};
		},
		draw:function(){
			context.beginPath();
			context.rect(0, 0, this.numX*this.cubeWidth, canvas.height);
			context.fillStyle = this.background;
			context.fill();
		}
	};
	
	sidebar={
		background:"lightgrey",
		draw:function(){
			
			/* Draw sidebar */
			context.beginPath();
			context.rect(gameArea.numX*gameArea.cubeWidth, 0, 2.5*gameArea.cubeWidth, canvas.height);
			context.fillStyle = this.background;
			context.fill();

			/* Draw oils */
			context.font = 'italic 35pt Calibri';
			context.fillStyle = 'brown';
			context.fillText("Oil: "+oil, (gameArea.numX*gameArea.cubeWidth+10), 45);
			
			/* Draw bunkers */
			
			for(i in this.bunkers){
				let toto =this.bunkers[i];
				toto.image.src="images/"+toto.img;								
				if(player.select[0]==toto.name){
					context.beginPath();
					context.rect(toto.x, toto.y, gameArea.cubeWidth, gameArea.cubeHeight);
				    context.fillStyle = '#444';
				    context.fill();
				}
				context.drawImage(toto.image,toto.x,toto.y,gameArea.cubeWidth,gameArea.cubeHeight);
			}
		},
		
		/* List of bunkers */
		
		bunkers:{
			0:{
				id:"a",
				image : new Image(),
				img: "oilRigWithPrice.png",				
				name:"oilrig",
				x:1250,
				y:65,
			},
			1:{
				id:"b",
				image : new Image(),
				img: "GunnerBunkerWithPrice.png",
				name:"gunnerbunker",
				x:1250,
				y:65+90,
			},
			2:{
				id:"c",
				image : new Image(),
				img: "CannonWithPrice.png",
				name:"cannon",
				x:1250,
				y:65+180,	
			},
			3:{
				id:"d",
				image : new Image(),
				img: "LaserTurretWithPrice.png",
				name:"laserturret",
				x:1250,
				y:65+270,	
			},
			4:{
				id:"e",
				image : new Image(),
				img: "3wayTurretWithPrice.png",
				name:"threewayturret",
				x:1250,
				y:65+360,	
			},
			5:{
				id:"f",
				image : new Image(),
				img: "WallWithPrice.png",
				name:"wall",
				x:1250,
				y:65+450,	
			}
		}
	};
	
	player={
		select:false
	};
	
	function init(){
		
		/* Canvas */
		
		canvas= document.createElement("canvas");
		canvas.width=1400;
		canvas.height=900;
		document.body.appendChild(canvas);
		context = canvas.getContext('2d');
			
		/* Variables */
		
		isPlaying=false;
		ticks=0;
		oil=100;
		lastZombieAdd=Date.now();
		
		/* Arrays */
		
		bunkers=[];
		zombies=[];
		oils=[];
		shots=[];
		
		/* Functions */
		
		gameArea.fill(gameArea.gameArea);
		
	};

	function mainLoop(){
		
		check();
		seeder();
		draw();
		move();
		ticks++;
		
		if(isPlaying){
			requestAnimationFrame(mainLoop);
		}
	};

	function draw(){
		
		/* Draw field */
		
		gameArea.draw();
		
		/* Draw bunkers */
		
		for(i in bunkers){
			bunkers[i].draw();
		}
		
		/* Draw zombies */
		
		for(i in zombies){
			zombies[i].draw();
		}
		
		/* Draw shots */
		
		for(i in shots){
			shots[i].draw();
		}
		
		/* Draw oils */
		
		for(i in oils){
			oils[i].draw();
		}
		
		/* Draw sidebar */
		
		sidebar.draw();
	};

	function move(){
		
		/* Move zombies */
		
		for(i in zombies){
			zombies[i].move();
		}
		
		/* Move oils */
		
		for(i in oils){
			oils[i].move();
		}
		
		/* Move shots */
		
		for(i in shots){
			shots[i].move();
		}
	};		

	function check(){
		
		checkZombieOut();

		/*Check if plant shots or produce oils*/
		
		for(i in bunkers){
			if(typeof(bunkers[i].checkGetingOil) === "function"){
				bunkers[i].checkGetingOil();
			}
			if(typeof(bunkers[i].checkShot) === "function"){
				bunkers[i].checkShot();
			}
		};
		i=0;
		
		/* Check oils life */
		
		for(i in oils){
			if(oils[i].checkLife()){
				oils.splice(i,1);
			}
		};
		i=0;
		
		/* Check if shot hit target */
		
		for(i in shots){
			let toto=shots[i];	
			if(typeof(toto.checkColision) === "function"){		
				if(toto.checkColision()){
					shots.splice(i,1);
					continue;	
				}
			}
			if(typeof(toto.life) != "undefined"){
				if(toto.life<0){
					toto.target.healt--;
					if(toto.target.healt<=0){
						zombies.splice(zombies.indexOf(toto.target),1);
					}
					shots.splice(i,1);
					continue;	
				}
			}
			if(toto.x-toto.sugar>=gameArea.numX*gameArea.cubeWidth){
				shots.splice(i,1);
			}
		};
		i=0;
		
		
		for(i in zombies){
			zombies[i].checkBite();
			
		};
	};
	
	function seeder(){
		
		/* Add new zombie every 10 seconds*/
		
		if(Date.now()-lastZombieAdd>=10000){ //newzombie
			let vonal=Math.floor(Math.random()*10);
			zombies.push(new walker((gameArea.numX*gameArea.cubeWidth+40),vonal*gameArea.cubeHeight));
			lastZombieAdd=Date.now();
		}
	};
	
	function click(data){
		
		/* If click in sidebar */
		
		for(j in sidebar.bunkers){
			let toto=sidebar.bunkers[j];
			var X=data.clientX;
			var Y=data.clientY;
			const click=((X>toto.x)&&(X<toto.x+gameArea.cubeWidth)&&(Y>toto.y)&&(Y<toto.y+gameArea.cubeHeight));
			if(click){
				if(player.select[0]==toto["name"]){
					player.select=false;
					break;
				}
				else{
					if(oil-window[toto["name"]].prototype.cost>=0){
						player.select=[toto["name"],toto["id"]];
						break;
					}
				}
			}
		}
		
		/* If click in Oil */
		
		for(i in oils){
			let toto=oils[i];
			if(clickIn(X,Y,toto)){
				oil+=toto.oils;
				oils.splice(i,1);
				return true;
			}
		}
		
		/* If click in gameArea */
		
		if((data.x>=0)&&(data.x<=gameArea.numX*gameArea.cubeWidth)&&(data.y>=0)&&(data.y<=gameArea.numY*gameArea.cubeHeight)&&(player.select)){
			let Xko=Math.floor(X/gameArea.cubeWidth);
			let Yko=Math.floor(Y/gameArea.cubeHeight);
			if(gameArea.gameArea[Yko][Xko]!=0){
				return false;
			}
			bunkers.push(new window[player.select[0]](data.clientX,data.clientY));
			gameArea.gameArea[Yko][Xko]=player.select[1];
			player.select=false;			
		}
	};
	
	function colision(a,b){
  		if((b.x+b.width>a.x)&&
    		(b.y+b.height>a.y)&&
    		(b.x<a.x+a.width)&&
    		(b.y<a.y+a.height)){
    		return 1;
  		}  
		return 0;
	};
	
	function clickIn(x,y,obj){
		if((obj.x<x)&&(obj.x+obj.sugar*2>x)&&(obj.y<y)&&(obj.y+obj.sugar*2>y)){
			return 1;
		}
		return 0;
	};
	
	window.onclick=function(d){
		click(d);
	};
	
	init();
	isPlaying=true;
	mainLoop();
	
}