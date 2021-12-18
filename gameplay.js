// COLORWORLD GAMEPLAY

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

const timeout = setTimeout(gameOver, 120000)

$(window).ready(timeout);

// -- -- Interval for Nightfall animation
$(window).ready(setInterval(nightFall, 5000))

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
			comparePosition()
			winCondition()
			break;
		case 38: //Up arrow key
			moveUp();
			getBlobPosition()
			comparePosition()
			winCondition()
			break;
		case 39: //right arrow key
			moveRight();
			getBlobPosition()
			comparePosition()
			winCondition()
			break;
		case 40: //down arrow key
			moveDown();
			getBlobPosition()
			comparePosition()
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

function comparePosition() {
	// Color Position Detection
	let colorLeft = $('.color').position().left;
	let colorTop = $('.color').position().top;
	let colorPositionWidth = $('.color').position().left + $('.color').width();
	let colorPositionHeight = $('.color').position().top + $('.color').height();
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
        let removedColor = $('.color').attr('id');
		// -- Wild Wild West
		// -- -- Adding gradient to blob		
		winningArray.push(removedColor)
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




