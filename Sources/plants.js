sunproducer=function(x,y){
	this.x=Math.floor(x/terulet.kockaWidth)*terulet.kockaWidth;
	this.y=Math.floor(y/terulet.kockaHeight)*terulet.kockaHeight;
	this.start=Date.now();
	this.healt=6;
	nap-=this.cost;
	this.suns=50;
	this.lastSun=Date.now();
	this.image = new Image();
	this.image.src="images/sunproducer.jpg";
};
sunproducer.prototype={
	cost:25,
	draw:function(){
		context.drawImage(this.image,this.x,this.y,terulet.kockaWidth,terulet.kockaHeight);
	},
	checkGetingSun:function(){
		if(Date.now()-this.lastSun>=10000){
			suns.push(new Sun(this.x,this.y,this.suns));
			this.lastSun=Date.now();
		};
	}
};
shooter=function(x,y){
	this.x=Math.floor(x/terulet.kockaWidth)*terulet.kockaWidth;
	this.y=Math.floor(y/terulet.kockaHeight)*terulet.kockaHeight;
	this.start=Date.now();
	this.healt=10;
	this.attack=1;
	this.lastShot=Date.now();
	nap-=this.cost;
	this.image = new Image();
	this.image.src="images/shooter.jpg";
};
shooter.prototype={
	cost:50,
	draw:function(){
		context.drawImage(this.image,this.x,this.y,terulet.kockaWidth,terulet.kockaHeight);
	},
	checkShot:function(){
		if(Date.now()-this.lastShot>=5000){	
			for( var j in zombies ){
				if(zombies[j].y==this.y){	
					shots.push(new Shot(this.x+2*terulet.kockaWidth/2,this.y+terulet.kockaHeight/2-16,5,0,this.attack));
					this.lastShot=Date.now();
					break;
				}
			}
		}
	}
};
walker=function(x,y){
	this.healt=3;
	this.x=x;
	this.y=y;
	this.dx=-0.5;
	this.dy=0;
	this.lastAttack=false;
	this.attack=1;
	this.image = new Image();
	this.image.src="images/ZombieHD.png";
};
walker.prototype={
	draw:function(){
		context.drawImage(this.image,this.x,this.y,terulet.kockaWidth,terulet.kockaHeight);
	},
	move:function(){
		this.x+=this.dx;
		this.y+=this.dy;
	},
	checkBite:function(){
		if(terulet.terulet[Math.floor(this.y/terulet.kockaHeight)][Math.floor(this.x/terulet.kockaWidth)]!=0){
			for(i in plants){
				var toto=plants[i];
				if(toto.y==this.y){					
					if(Math.floor(toto.x/40)==Math.floor(this.x/40)){
						if(this.lastAttack==false){
							this.lastAttack=Date.now()-1000;
						}
						if(Date.now()-this.lastAttack>=1000){
							toto.healt-=this.attack;
							this.lastAttack=Date.now();
							this.dx=0;
							if(toto.healt<=0){
								plants.splice(i,1);
								this.lastAttack=false;
								this.dx=-0.5;
							}
						}
					}
				}
			}
		}
	}
};
Shot=function(x,y,dx,dy,attack){
	this.sugar=5;
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.attack=attack;	

};
Shot.prototype={
	draw:function(){
		context.beginPath();
		context.arc(this.x, this.y, this.sugar, 0, 2 * Math.PI, false);
		context.fillStyle = 'yellow';
		context.fill();
	},
	move:function(){
		this.x+=this.dx;
		this.y+=this.dy;
	},
	checkColision:function(){
		for(j in zombies){
			var toto=zombies[j];
			if((this.y-terulet.kockaHeight/2+16)==toto.y){
				if((this.x+this.sugar-16)>=toto.x){
					console.log("atment!!");
					toto.healt-=this.attack;
					this.attack=0;
					if(toto.healt<=0){
						zombies.splice(j,1);
					}
					return true;
				}
			}
		}
		return false;
	}
};
Sun=function(x,y,sunS){
	this.suns=sunS;
	this.sugar=20;
	this.x=(x+terulet.kockaWidth/2);
	this.y=(y+this.sugar);
	this.dx=Math.random()*1-0.5;
	this.dy=Math.random()*1-0.5;
	this.startTime=Date.now();
	this.image = new Image();
	this.image.src="images/SunHD.png";
	this.rotation=0;
};
Sun.prototype={
	draw:function(){
	 	//context.save();
		//context.rotate(this.rotation);
		//context.translate((this.x+this.sugar), (this.y+this.sugar));
		context.drawImage(this.image,this.x,this.y,this.sugar*2,this.sugar*2);
		//context.restore();
		
	},
	move:function(){
		var xSos=this.x;
		var ySos=this.y;
		this.x+=this.dx;
		this.rotation+=1/Math.PI;
		this.y+=this.dy;
		if(this.x-this.sugar<0){
			this.dx*=-1;
			this.x=this.sugar;
		}
		if((this.x+this.sugar>canvas.width)){
			this.dx*=-1;
			this.x=canvas.width-this.sugar;
		}
		if(this.y-this.sugar<0){
			this.dy*=-1;
			this.y=this.sugar;
		}
		if(this.y+this.sugar>canvas.height){
			this.dy*=-1;
			this.y=canvas.height-this.sugar;
		}
		this.dy-=this.dy*Math.random()/100;
		this.dx-=this.dx*Math.random()/100;
	},
	checkLife:function(){
		if(Date.now()-this.startTime>=8000){
			return true;
		}
		return false;
	}
};
catapult=function(x,y){
	this.x=Math.floor(x/terulet.kockaWidth)*terulet.kockaWidth;
	this.y=Math.floor(y/terulet.kockaHeight)*terulet.kockaHeight;
	this.start=Date.now();
	this.healt=10;
	this.attack=1;
	this.lastShot=Date.now();
	nap-=this.cost;
	this.image = new Image();
	this.image.src="images/catapult.png";
};
catapult.prototype={
	cost:100,
	draw:function(){
		context.drawImage(this.image,this.x,this.y,terulet.kockaWidth,terulet.kockaHeight);
	},
	checkShot:function(){
		for( var i in zombies){
			var toto = zombies[i];
			if(toto.y==this.y){
				if(Date.now()-this.lastShot>7000){
					shots.push(new Shot2(this.x,this.y,toto,this.attack));
					this.lastShot=Date.now();
					break;
				}
			}
		}
	}
};
Shot2=function(x,y,t,attack){
	this.x=x;
	this.y=y;
	this.target=t;
	this.attack=attack;
	this.tx=t.x+t.dx*this.steps;
	this.sugar=5;
	this.ty=t.y;
	this.life=this.steps;
	this.dy=-this.steps/2+1;//dy;
	this.dx=(t.x-x-20)/this.steps;
	
};
Shot2.prototype={
	steps:40,
	draw:function(){
		context.beginPath();
		context.arc(this.x, this.y, this.sugar, 0, 2 * Math.PI, false);
		context.fillStyle = 'black';
		context.fill();
	},
	move:function(){
		this.x+=this.dx;
		this.y+=this.dy;
		this.dy++;
		this.life--;
		console.log(this.life);
	},
};

