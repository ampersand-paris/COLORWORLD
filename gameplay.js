// COLORWORLD GAMEPLAY

// const topPosition = () => {
// 	console.log($('#top').position())
// }
$(window).ready(setInterval(compareHolePosition, 50))

// -- Blob Name
// -- -- Grabs name from session storage and appends to the blob

$(document).ready(function() {
	let blobName = sessionStorage.getItem("blobName");
	let blobEl = $(`<p>${blobName}<p>`)
	$('#blob').after(blobEl)
	sessionStorage.setItem("newName", blobName);
})

// -- Nightfall Animation
// -- -- Animates a growing gradient accross the page
// -- -- Increases the opacity of the nightfall
// -- -- Runs every 5 seconds

let gradientInterval = 0;

const nightFall = () => {
	console.log(winningArray)
	//opacity
	let opacity = parseFloat($('#night').css('opacity'));
	let interval = opacity + .04;
	$('#night').css('opacity', interval)
	//gradient
	if (gradientInterval === 0) {
		// Allows first interval to run
		gradientInterval = .05;
		sessionStorage.setItem("gradient", gradientInterval);
	} else if (gradientInterval > 0) {
		// Allows all other intervals
		gradientInterval = parseFloat(sessionStorage.getItem("gradient")) + .04 * 100;
		sessionStorage.setItem("gradient", gradientInterval);
	}	
	$('#night').css('background', `linear-gradient(to top right, #000000 ${gradientInterval}%, transparent`);
}

// -- Gameover 
// -- -- Brings user to Reset page

const gameOver = () => {
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/reset.html');
	console.log('hello')
}

// == Timers
// == == Gameover timer. Player has 2 minutes to collect all the colors

// const timeout = setTimeout(gameOver, 120000)

// $(window).ready(timeout);

// -- -- Interval for Nightfall animation
// $(window).ready(setInterval(nightFall, 5000))


// -- Holes
// -- Hole animation

const moveTopHole = () => {
	if ($('#top').position().left > 201) {
		$('#top').animate({
			left: "0%",
		  }, 5000, function() {
		});
	} else if ($('#top').position().left < 201) {
		$('#top').animate({
			left: "90%",
		  }, 5000, function() {
		});
	}
}

const moveBottomHole = () => {
	if ($('#bottom').position().left > 201) {
		$('#bottom').animate({
			left: "5%",
		  }, 5000, function() {
		});
	} else if ($('#bottom').position().left < 201) {
		$('#bottom').animate({
			left: "+85%",
		  }, 5000, function() {
		});
	}
}

const moveUpHole = () => {
	if ($('#up').position().top > 201) {
		$('#up').animate({
			top: "20%",
		  }, 5000, function() {
		});
	} else if ($('#up').position().top < 201) {
		$('#up').animate({
			top: "80%",
		  }, 5000, function() {
		});
	}
}

$(document).ready(setInterval(moveTopHole, 8000));
$(document).ready(setInterval(moveBottomHole, 10000));
$(document).ready(setInterval(moveUpHole, 4000));


// -- Navigate with arrow keys
// -- -- Places the blob in the center of the gameboard

var blobImage = null;

function init() {
	blobImage = $('.blob-div');
	blobImage.css('position', 'relative');
	blobImage.css('top', '48vH');
	blobImage.css('left', '48vw');
}

// -- -- Moves the blob, finds the blobs position, 
// -- -- compares blob position to other gameplay elements, and checks for win conditions.

function getKeyAndMove(e) {
	var key_code = e.which || e.keyCode;
	switch (key_code) {
		case 37: //left arrow key
			moveLeft();
			getBlobPosition()
			comparePosition($('#red'))
			comparePosition($('#orange'))
			comparePosition($('#yellow'))
			comparePosition($('#green'))
			comparePosition($('#blue'))
			comparePosition($('#indigo'))
			comparePosition($('#violet'))
			winCondition()
			break;
		case 38: //Up arrow key
			moveUp();
			getBlobPosition()
			comparePosition($('#red'))
			comparePosition($('#orange'))
			comparePosition($('#yellow'))
			comparePosition($('#green'))
			comparePosition($('#blue'))
			comparePosition($('#indigo'))
			comparePosition($('#violet'))
			winCondition()
			break;
		case 39: //right arrow key
			moveRight();
			getBlobPosition()
			comparePosition($('#red'))
			comparePosition($('#orange'))
			comparePosition($('#yellow'))
			comparePosition($('#green'))
			comparePosition($('#blue'))
			comparePosition($('#indigo'))
			comparePosition($('#violet'))
			winCondition()
			break;
		case 40: //down arrow key
			moveDown();
			getBlobPosition()
			comparePosition($('#red'))
			comparePosition($('#orange'))
			comparePosition($('#yellow'))
			comparePosition($('#green'))
			comparePosition($('#blue'))
			comparePosition($('#indigo'))
			comparePosition($('#violet'))
			winCondition()
			break;
	}
}

// -- Functions that assign blob movement and direction

function moveLeft() {
	blobImage.css('left', parseInt(blobImage.css('left')) - 5 + "px");
	$('#blob').css('transform', 'scaleX(1)');
	$('.blob-div').css('transform', 'rotate(0deg)');
	
}
function moveUp() {
	blobImage.css('top', parseInt(blobImage.css('top')) - 5 + "px");
	$('#blob').css('transform', 'scaleX(1)');
	$('.blob-div').css('transform', 'rotate(90deg)');
}
function moveRight() {
	blobImage.css('left', parseInt(blobImage.css('left')) + 5 + "px");
	$('.blob-div').css('transform', 'rotate(0deg)');
	$('.blob-div').css('transform', 'scaleX(-1)');
}
function moveDown() {
	blobImage.css('top', parseInt(blobImage.css('top')) + 5 + "px");
	$('.blob-div').css('transform', 'rotate(270deg)');
	$('#blob').css('transform', 'scaleX(1)');
}

window.onload = init;

// -- Functions that tracks blob's position

function getBlobPosition() {
    var pos, width, height;
    pos = $('.blob-div').position();
    width = $('.blob-div').width();
    height = $('.blob-div').height();
}

// -- Functions that holds color position

function getColorPosition() {
    let pos, width, height;
    pos = $('#red').position();
    width = $('#red').width();
    height = $('#red').height();
}



// -- Overlap Detection 
// -- -- Function that compares positoin of the blob to the colors

let winningArray = [];

function comparePosition(id) {
	// Color Position Detection
	let colorLeft = id.position().left;
	let colorTop = id.position().top;
	let colorPositionWidth = id.position().left + $('.color').width();
	let colorPositionHeight = id.position().top + $('.color').height();
	// Blob Position Detection
	let blobLeft = $('.blob-div').position().left;
	let blobTop = $('.blob-div').position().top;
	let blobPositionWidth = $('.blob-div').position().left + $('.blob-div').width();
	let blobPositionHeight = $('.blob-div').position().top + $('.blob-div').height();
	// Overlapping conditions
	if (
		colorLeft < blobPositionWidth &&
		colorPositionWidth > blobLeft &&
        colorTop < blobPositionHeight &&
        colorPositionHeight > blobTop
		) {
        // collision detected
        let removedColor = id.attr('id');
		// -- Wild Wild West
		// -- -- Adding gradient to blob		
		winningArray.push(removedColor)
		console.log(winningArray)
		let colorString = winningArray.join(", ");
		function addGradient() {
			$('#blob').css('background', `linear-gradient(to right, ${colorString}, transparent)`);
		}	
		$(`#${removedColor}`).remove()
		addGradient()
    } else {
        // no collision
        $('#red').css('background-color', 'red');
	}
}

// -- Hole Comparison

function compareHolePosition() {
	// -- Color Position Detection
	// -- Top Black Hole
	let holeTopLeft = $('#top').position().left;
	let holeTopTop = $('#top').position().top;
	let holeTopPositionWidth = $('#top').position().left + $('#top').width();
	let holeTopPositionHeight = $('#top').position().top + $('#top').height();
	// -- Bottom Black Hole
	let holeBottomLeft = $('#bottom').position().left;
	let holeBottomTop = $('#bottom').position().top;
	let holeBottomPositionWidth = $('#bottom').position().left + $('#bottom').width();
	let holeBottomPositionHeight = $('#bottom').position().top + $('#bottom').height();
	// -- Veriical Black Hole
	let holeUpLeft = $('#up').position().left;
	let holeUpTop = $('#up').position().top;
	let holeUpPositionWidth = $('#up').position().left + $('#up').width();
	let holeUpPositionHeight = $('#up').position().top + $('#up').height();
	// Blob Position Detection
	let blobLeft = $('.blob-div').position().left;
	let blobTop = $('.blob-div').position().top;
	let blobPositionWidth = $('.blob-div').position().left + $('.blob-div').width();
	let blobPositionHeight = $('.blob-div').position().top + $('.blob-div').height();
	// Overlapping conditions
	if (
		(holeTopLeft < blobPositionWidth &&
		holeTopPositionWidth > blobLeft &&
        holeTopTop < blobPositionHeight &&
        holeTopPositionHeight > blobTop ) || (
		holeBottomLeft < blobPositionWidth &&
		holeBottomPositionWidth > blobLeft &&
        holeBottomTop < blobPositionHeight &&
        holeBottomPositionHeight > blobTop ) || (
		holeUpLeft < blobPositionWidth &&
		holeUpPositionWidth > blobLeft &&
        holeUpTop < blobPositionHeight &&
        holeUpPositionHeight > blobTop)
		) {
        // collision detected
		//$('.blob-div').css('left', '48vW');
		$('.blob-div').css({
			top: '48vH',
			left: '48vW',
			});
		let droppedColor = winningArray[winningArray.length-1];	
		console.log(droppedColor)
		winningArray.pop()
		let colorString = winningArray.join(", ");
		function addGradient() {
			$('#blob').css('background', `linear-gradient(to right, ${colorString}, transparent)`);
		}	
		if (winningArray.length < 1){
			return 
		} else {
			$('<div />').addClass('color').attr('id', 'red').appendTo('body');
		}
		addGradient()
    } else {
        // no collision
	}
}


// -- Win Conditions
// -- -- Function that runs When all colors have been collected.

function winCondition() {
	if (winningArray.length === 7) {
		// Stops timer
		clearTimeout(timeout);
		// 'You saved color!'
		$('#night').css('display', 'none');
		$('body').css('background', 'white')
		$('.savedColor').toggleClass('active');
		$('.hole').remove();
	}
}

// -- Home
// -- -- Brings player back to COLORWORLD Landing Page

$("#home").click(function(event) {
	event.preventDefault()
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/index.html');
});

// -- Restart
// -- -- Restarts the game with the player's original name

$("#restart").click(function(event) {
	event.preventDefault()
	let test = sessionStorage.getItem("newName");
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html');
});




