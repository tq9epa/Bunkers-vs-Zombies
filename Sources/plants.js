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
		oil=10000;
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
		
		if(Date.now()-lastZombieAdd>=1000){ //newzombie
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

//Game section
oilrig = function (x, y) {
	this.x = Math.floor(x / gameArea.cubeWidth) * gameArea.cubeWidth;
	this.y = Math.floor(y / gameArea.cubeHeight) * gameArea.cubeHeight;
	this.start = Date.now();
	this.healt = 6;
	oil -= this.cost;
	this.oils = 25;
	this.lastOil = Date.now();
	this.image = new Image();
	this.image.src = "images/oilRig.png";
};
oilrig.prototype = {
	cost: 75,
	draw: function () {
		context.drawImage(this.image, this.x, this.y, gameArea.cubeWidth, gameArea.cubeHeight);
	},
	checkGetingOil: function () {
		if (Date.now() - this.lastOil >= 10000) {
			oils.push(new Oil(this.x, this.y, this.oils));
			this.lastOil = Date.now();
		};
	}
};
gunnerbunker = function (x, y) {
	this.x = Math.floor(x / gameArea.cubeWidth) * gameArea.cubeWidth;
	this.y = Math.floor(y / gameArea.cubeHeight) * gameArea.cubeHeight;
	this.start = Date.now();
	this.healt = 10;
	this.attack = 1;
	this.lastShot = Date.now();
	oil -= this.cost;
	this.image = new Image();
	this.image.src = "images/GunnerBunker.png";
};
gunnerbunker.prototype = {
	cost: 50,
	draw: function () {
		context.drawImage(this.image, this.x, this.y, gameArea.cubeWidth, gameArea.cubeHeight);
	},
	checkShot: function () {
		if (Date.now() - this.lastShot >= 5000) {
			for (let j in zombies) {
				if (zombies[j].y == this.y) {
					shots.push(new Shot(this.x + 2 * gameArea.cubeWidth / 2, this.y + gameArea.cubeHeight / 2 - 16, 5, 0, this.attack));
					this.lastShot = Date.now();
					break;
				}
			}
		}
	}
};
laserturret = function (x, y) {
	this.x = Math.floor(x / gameArea.cubeWidth) * gameArea.cubeWidth;
	this.y = Math.floor(y / gameArea.cubeHeight) * gameArea.cubeHeight;
	this.start = Date.now();
	this.healt = 10;
	this.attack = 2;
	this.lastShot = Date.now();
	oil -= this.cost;
	this.image = new Image();
	this.image.src = "images/LaserTurret.png";
};
laserturret.prototype = {
	cost: 125,
	draw: function () {
		context.drawImage(this.image, this.x, this.y, gameArea.cubeWidth, gameArea.cubeHeight);
	},
	checkShot: function () {
		if (Date.now() - this.lastShot >= 3500) {
			for (let j in zombies) {
				if (zombies[j].y == this.y) {
					shots.push(new Shot(this.x + 2 * gameArea.cubeWidth / 2, this.y + gameArea.cubeHeight / 2 - 16, 5, 0, this.attack));
					this.lastShot = Date.now();
					break;
				}
			}
		}
	}
};
threewayturret = function (x, y) {
	this.x = Math.floor(x / gameArea.cubeWidth) * gameArea.cubeWidth;
	this.y = Math.floor(y / gameArea.cubeHeight) * gameArea.cubeHeight;
	this.start = Date.now();
	this.healt = 10;
	this.attack = 1;
	this.lastShot = Date.now();
	oil -= this.cost;
	this.image = new Image();
	this.image.src = "images/3wayTurret.png";
};
threewayturret.prototype = {
	cost: 150,
	draw: function () {
		context.drawImage(this.image, this.x, this.y, gameArea.cubeWidth, gameArea.cubeHeight);
	},
	checkShot: function () {
		if (Date.now() - this.lastShot >= 6000) {
			for (let j in zombies) {
				if (zombies[j].y == this.y || zombies[j].y == this.y + 80 || zombies[j].y == this.y - 80 ) {
					shots.push(new Shot(this.x + 2 * gameArea.cubeWidth / 2, this.y + gameArea.cubeHeight / 2 - 16, 5, 0, this.attack));
					shots.push(new Shot(this.x + 2 * gameArea.cubeWidth / 2, this.y - 80 + gameArea.cubeHeight / 2 - 16, 5, 0, this.attack));
					shots.push(new Shot(this.x + 2 * gameArea.cubeWidth / 2, this.y + 80 + gameArea.cubeHeight / 2 - 16, 5, 0, this.attack));
					this.lastShot = Date.now();
					break;
				}
			}
		}
	}
};
wall  = function (x, y) {
    this.x = Math.floor(x / gameArea.cubeWidth) * gameArea.cubeWidth;
    this.y = Math.floor(y / gameArea.cubeHeight) * gameArea.cubeHeight;
    this.start = Date.now();
    this.healt = 30;
    oil -= this.cost;
    this.image = new Image();
    this.image.src = "images/Wall.png";
};
wall.prototype = {
    cost: 100,
    draw: function () {
        context.drawImage(this.image, this.x, this.y, gameArea.cubeWidth, gameArea.cubeHeight);
    }
};
walker = function (x, y) {
	
	let numberOfRand = Math.floor(Math.random() * 2);
	if(numberOfRand==0) {
		this.healt = 3;
		this.x = x;
		this.y = y;
		this.dx = -0.5; //sebessség
		this.dy = 0;
		this.lastAttack = false;
		this.attack = 1;
		this.image = new Image();
		this.image.src = "images/ZombieHd.png";
	} else {
		this.healt = 4;
		this.x = x;
		this.y = y;
		this.dx = -0.5; //sebessség
		this.dy = 0;
		this.lastAttack = false;
		this.attack = 2;
		this.image = new Image();
		this.image.src = "images/monster.png";
	}
};
walker.prototype = {
	draw: function () {
		context.drawImage(this.image, this.x, this.y, gameArea.cubeWidth, gameArea.cubeHeight);
	},
	move: function () {
		this.x += this.dx;
		this.y += this.dy;
		//console.log(this.x);

	},
	checkBite: function () {
		if (gameArea.gameArea[Math.floor(this.y / gameArea.cubeHeight)][Math.floor(this.x / gameArea.cubeWidth)] != 0) {
			for (i in bunkers) {
				let toto = bunkers[i];
				if (toto.y == this.y) {
					if (Math.floor(toto.x / 40) == Math.floor(this.x / 40)) {
						if (this.lastAttack == false) {
							this.lastAttack = Date.now() - 1000;
						}
						if (Date.now() - this.lastAttack >= 1000) {
							toto.healt -= this.attack;
							this.lastAttack = Date.now();
							this.dx = 0;
							if (toto.healt <= 0) {
								bunkers.splice(i, 1);
								this.lastAttack = false;
								for (i in zombies) {
									
                                    if(zombies[i].x == this.x && this.y == zombies[i].y){
										zombies[i].dx = -0.5;
									}
                                }
								
							}
						}
					}
				}
			}
		}
	},
	
};
Shot = function (x, y, dx, dy, attack) {
	this.sugar = 5;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.attack = attack;

};

let numborOfZombiesOut=0;

function checkZombieOut () {
	for (j in zombies) {
		let toto = zombies[j];

		if ((10) > toto.x) {

			console.log("Zombies out!");
			zombies.splice(j, 1);
			numborOfZombiesOut +=1;
			if(numborOfZombiesOut==5){
				isPlaying=false;
				alert("Zombies killed the civilians!");
			}
			return true;

		}
	}
	return false;
}
Shot.prototype = {
	draw: function () {
		context.beginPath();
		context.arc(this.x, this.y, this.sugar, 0, 4, false);
		context.fillStyle = 'red';
		context.fill();
	},
	move: function () {
		this.x += this.dx;
		this.y += this.dy;
	},
	checkColision: function () {
		for (j in zombies) {
			let toto = zombies[j];
			if ((this.y - gameArea.cubeHeight / 2 + 16) == toto.y) {
				if ((this.x + this.sugar - 16) >= toto.x) {
					//console.log("atment!!");
					toto.healt -= this.attack;
					this.attack = 0;
					if (toto.healt <= 0) {
						zombies.splice(j, 1);
					}
					return true;
				}
			}
		}
		return false;
	}
};
Oil = function (x, y, oilS) {
	this.oils = oilS;
	this.sugar = 20;
	this.x = (x + gameArea.cubeWidth / 2);
	this.y = (y + this.sugar);
	this.dx = Math.random() * 1 - 0.5;
	this.dy = Math.random() * 1 - 0.5;
	this.startTime = Date.now();
	this.image = new Image();
	this.image.src = "images/oilDrum.png";
	this.rotation = 0;
};
Oil.prototype = {
	draw: function () {
		//context.save();
		//context.rotate(this.rotation);
		//context.translate((this.x+this.sugar), (this.y+this.sugar));
		context.drawImage(this.image, this.x, this.y, this.sugar * 2, this.sugar * 2);
		//context.restore();

	},
	move: function () {
		let xSos = this.x;
		let ySos = this.y;
		this.x += this.dx;
		this.rotation += 1 / Math.PI;
		this.y += this.dy;
		if (this.x - this.sugar < 0) {
			this.dx *= -1;
			this.x = this.sugar;
		}
		if ((this.x + this.sugar > canvas.width)) {
			this.dx *= -1;
			this.x = canvas.width - this.sugar;
		}
		if (this.y - this.sugar < 0) {
			this.dy *= -1;
			this.y = this.sugar;
		}
		if (this.y + this.sugar > canvas.height) {
			this.dy *= -1;
			this.y = canvas.height - this.sugar;
		}
		this.dy -= this.dy * Math.random() / 100;
		this.dx -= this.dx * Math.random() / 100;
	},
	checkLife: function () {
		if (Date.now() - this.startTime >= 8000) {
			return true;
		}
		return false;
	}
};
cannon = function (x, y) {
	this.x = Math.floor(x / gameArea.cubeWidth) * gameArea.cubeWidth;
	this.y = Math.floor(y / gameArea.cubeHeight) * gameArea.cubeHeight;
	this.start = Date.now();
	this.healt = 10;
	this.attack = 1;
	this.lastShot = Date.now();
	oil -= this.cost;
	this.image = new Image();
	this.image.src = "images/Cannon.png";
};
cannon.prototype = {
	cost: 75,
	draw: function () {
		context.drawImage(this.image, this.x, this.y, gameArea.cubeWidth, gameArea.cubeHeight);
	},
	checkShot: function () {
		for (let i in zombies) {
			let toto = zombies[i];
			if (toto.y == this.y) {
				if (Date.now() - this.lastShot > 7000) {
					shots.push(new Shot2(this.x, this.y, toto, this.attack));
					this.lastShot = Date.now();
					break;
				}
			}
		}
	}
};
Shot2 = function (x, y, t, attack) {
	this.x = x;
	this.y = y;
	this.target = t;
	this.attack = attack;
	this.tx = t.x + t.dx * this.steps;
	this.sugar = 10;
	this.ty = t.y;
	this.life = this.steps;
	this.dy = -this.steps / 2 + 1;//dy;
	this.dx = (t.x - x - 20) / this.steps;

};
Shot2.prototype = {
	steps: 40,
	draw: function () {
		context.beginPath();
		context.arc(this.x, this.y, this.sugar, 0, 2 * Math.PI, false);
		context.fillStyle = 'blue';
		context.fill();
	},
	move: function () {
		this.x += this.dx;
		this.y += this.dy;
		this.dy++;
		this.life--;
		console.log(this.life);
	},
};

