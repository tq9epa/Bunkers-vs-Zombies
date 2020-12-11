

//Game section
let endGame = false;

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
				if (zombies[j].y == this.y || zombies[j].y == this.y + 80 || zombies[j].y == this.y - 80) {
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
wall = function (x, y) {
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
let primaryZombie = 0;
walker = function (x, y) {
	let numberOfRand = Math.floor(Math.random() * 2);
	if (primaryZombie > 10) {
		if (numberOfRand == 0) {
			primaryZombie++;
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
			primaryZombie++;
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
	}
	else {
		primaryZombie++;
		this.healt = 3;
		this.x = x;
		this.y = y;
		this.dx = -0.5; //sebessség
		this.dy = 0;
		this.lastAttack = false;
		this.attack = 1;
		this.image = new Image();
		this.image.src = "images/ZombieHd.png";
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

									if (zombies[i].x == this.x && this.y == zombies[i].y) {
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

let numborOfZombiesOut = 0;

function checkZombieOut() {
	for (j in zombies) {
		let toto = zombies[j];

		if ((10) > toto.x) {

			console.log("Zombies out!");
			zombies.splice(j, 1);
			numborOfZombiesOut += 1;
			if (numborOfZombiesOut == 5) {
				isPlaying = false;
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

function Shot2IsObject(fn) {
	var n = Math.floor(Math.random() * 6 + 1)
	return fn(new Shot2(n, n, n, n));
}
function CannonIsObject(fn) {
	var n = Math.floor(Math.random() * 6 + 1)
	return fn(new cannon(n, n, n, n));
}
function OilIsObject(fn) {
	var n = Math.floor(Math.random() * 6 + 1)
	return fn(new Oil(n, n, n, n));
}
function ShotIsObject(fn) {
	var n = Math.floor(Math.random() * 6 + 1)
<<<<<<< HEAD
	return fn(new Shot(n, n, n,n));
  }
  function WalkerIsObject(fn) {
	var n = Math.floor(Math.random() * 6 + 1)
	return fn(new Walker(n, n, n,n));
  }

module.exports =Shot2IsObject;
module.exports =CannonIsObject;
module.exports =OilIsObject;
module.exports =ShotIsObject;
module.exports =WalkerIsObject;
=======
	return fn(new Shot(n, n, n, n));
}
module.exports = Shot2IsObject;
module.exports = CannonIsObject;
module.exports = OilIsObject;
module.exports = ShotIsObject;
>>>>>>> e6487f3a36738986df2d4fbc68d035a0b2a8079b
