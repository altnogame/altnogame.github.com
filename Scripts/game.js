// vars
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var activeSprites = [];

var dx = -5;
var c = 0;

var altNoMore_Y = canvas.height / 2;
var altNoMore_X = canvas.width / 2;
var alt_dx = dx * 1.5;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var altNoHeight = 90;
var spriteWidth = 80;

var condomImage = document.getElementById("condom");
var oldLadyImage = document.getElementById("old_Lady");
var deodorantImage = document.getElementById("deodorant");
var cashierImage = document.getElementById("cashier");

var altNoImage = document.getElementById('altNoImage');

var score = 0;

// helpers
function removeFromArray(item, array) {
	array.splice(array.indexOf(item), 1);
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function newCondom() {
	var condom = { score: 3, image: condomImage };
	return condom;
}

function newOldLady() {
	var oldLady = { score: -2, image: oldLadyImage };
	return oldLady;
}

function newDeodorant() {
	var deodorant = { score: 1, image: deodorantImage };
	return deodorant;
}

function newCashier() {
	var cashier = { score: -1, image: cashierImage };
	return cashier;
}

// drawing
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function collisionDetection() {
	for(var i = 0; i < activeSprites.length; i++) {
		var sprite = activeSprites[i];
		if (((sprite.x >= altNoMore_X && sprite.x <= altNoMore_X + altNoHeight) ||
		 (sprite.x + spriteWidth >= altNoMore_X && sprite.x + spriteWidth <= altNoMore_X + altNoHeight)) &&
		  ((sprite.y >= altNoMore_Y && sprite.y <= altNoMore_Y + altNoHeight) || 
		  	(sprite.y + spriteWidth >= altNoMore_Y && sprite.y + spriteWidth <= altNoMore_Y + altNoHeight)))  {
			score += sprite.score;
			activeSprites.splice(i, 1)
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// update
	var num = randomIntFromInterval(1, 200)
	var y = randomIntFromInterval(0, canvas.height)

	if(num >= 1 && num <= 2) {
		// cashier
		var cashier = newCashier();
		cashier.y = y
		cashier.x = canvas.width;
		activeSprites.push(cashier);
	} else if(num >= 3 && num <= 4) {
		// old lady
		var lady = newOldLady();
		lady.y = y
		lady.x = canvas.width;
		activeSprites.push(lady);
	} else if(num >= 5 && num <= 7) {
		// condom
		var condom = newCondom();
		condom.y = y
		condom.x = canvas.width;
		activeSprites.push(condom);
	} else if(num >= 8 && num <= 10) {
		// deo
		var deo = newDeodorant();
		deo.y = y
		deo.x = canvas.width;
		activeSprites.push(deo);
	} 

	// drawing
	for(var i = 0; i < activeSprites.length; i++) {
		var sprite = activeSprites[i];
		sprite.x += dx;
		var img = sprite.image;

		ctx.drawImage(img, sprite.x, sprite.y);

		if(sprite.x <= -80) {
			removeFromArray(sprite, activeSprites);
		}
	}

	if(upPressed) {
		altNoMore_Y += alt_dx
	} else if(downPressed) {
		altNoMore_Y -= alt_dx
	} else if(leftPressed) {
		altNoMore_X += alt_dx
	} else if (rightPressed) {
		altNoMore_X -= alt_dx
	}

	if(altNoMore_Y < 0) {
		altNoMore_Y = 0;
	} 
	if(altNoMore_Y >= canvas.height - altNoHeight) {
		altNoMore_Y = canvas.height - altNoHeight;
	} 
	if(altNoMore_X < 0) {
		altNoMore_X = 0;
	} 
	if (altNoMore_X >= canvas.width - altNoHeight) {
		altNoMore_X = canvas.width - altNoHeight;
	}

	ctx.drawImage(altNoImage, altNoMore_X, altNoMore_Y, altNoHeight, altNoHeight);
	collisionDetection();
	drawScore();

	// again
	requestAnimationFrame(draw);
	c++;
}

// key handlers
function keyDownHandler(e) {
	if(e.keyCode == 37) { 
		leftPressed = true;
	} else if(e.keyCode == 38) {
		upPressed = true;
	} else if(e.keyCode == 39) {
		rightPressed = true;
	} else if(e.keyCode == 40) {
		downPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 37) { 
		leftPressed = false;
	} else if(e.keyCode == 38) {
		upPressed = false;
	} else if(e.keyCode == 39) {
		rightPressed = false;
	} else if(e.keyCode == 40) {
		downPressed = false;
	}
}

// game
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

draw();

window.setInterval(function(){
  console.log(c.toString() + " fps");
	c = 0;
}, 1000);