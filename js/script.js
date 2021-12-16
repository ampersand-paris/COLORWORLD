// Landing page background

$('#color').on('mouseover', (e) => {
	e.preventDefault();
	const userInput = $('input[type="text"]').val();
  	$.ajax({
	  url: `https://x-colors.herokuapp.com/api/random/`,
 }).then(
	  (colorData) => {
		  $('body').css("background-color", colorData.hex);
	  },
	  (error) => {
		  console.log("bad request: ", error);
	  }
  );
});

$('form').on('mouseover', (e) => {
	e.preventDefault();
	const userInput = $('input[type="text"]').val();
  	$.ajax({
	  url: `https://x-colors.herokuapp.com/api/random/`,
 }).then(
	  (colorData) => {
		  if ($(location).attr('href') === 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/index.html'){
			$('body').css("background-color", colorData.hex);
		  }
	  },
	  (error) => {
		  console.log("bad request: ", error);
	  }
  );
});

// Dropdown Menu

$('.down-arrow').click(function() {
    $('.instructions').toggleClass('active');
	$('.down-arrow').toggleClass('turn');
})

// Set Timer

const gameOver = () => {
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/reset.html');
	console.log('hello')
}

let gradientInterval = 0;

const nightFall = () => {
	//opacity
	let opacity = parseFloat($('#night').css('opacity'));
	let interval = opacity + .04;
	$('#night').css('opacity', interval)
	//gradient
	if (gradientInterval === 0) {
		gradientInterval = .05;
		sessionStorage.setItem("gradient", gradientInterval);
	} else if (gradientInterval > 0) {
		gradientInterval = parseFloat(sessionStorage.getItem("gradient")) + .04 * 100;
		sessionStorage.setItem("gradient", gradientInterval);
	}	
	$('#night').css('background', `linear-gradient(to top right, #000000 ${gradientInterval}%, transparent`);
	// $('#night').css('opacity', `${opacity} + .5`);
	//sessionStorage.clear()
	console.log(gradientInterval)
}

const timeout = setTimeout(gameOver, 120000)
if (location.href == "file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html") {
	$(window).ready(timeout);
	// for (let i = 0; i < 100; i++) {
	// let percentage = i;
	$(window).ready(setInterval(nightFall, 5000))
}


// Submit

$('form').on('submit', (event) => {
	event.preventDefault()
	let userName = $('input[type="text"]').val();
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html')
	sessionStorage.setItem("blobName", userName);
});

// Blob Name

$(document).ready(function() {
	let blobName = sessionStorage.getItem("blobName");
	let blobEl = $(`<p>${blobName}<p>`)
	$('#blob').after(blobEl)
	sessionStorage.setItem("newName", blobName);
})

// Navigate with keys

var objImage = null;
function init() {
	objImage = $('.blob-div');
	objImage.css('position', 'relative');
	objImage.css('top', '0px');
	objImage.css('left', '0px');
}
function getKeyAndMove(e) {
	var key_code = e.which || e.keyCode;
	switch (key_code) {
		case 37: //left arrow key
			moveLeft();
			getPositions()
			comparePosition()
			winCondition()
			break;
		case 38: //Up arrow key
			moveUp();
			getPositions()
			comparePosition()
			winCondition()
			break;
		case 39: //right arrow key
			moveRight();
			getPositions()
			comparePosition()
			winCondition()
			break;
		case 40: //down arrow key
			moveDown();
			getPositions()
			comparePosition()
			winCondition()
			break;
	}
}

function moveLeft() {
	objImage.css('left', parseInt(objImage.css('left')) - 5 + "px");
	$('#blob').css('transform', 'scaleX(1)');
	$('.blob-div').css('transform', 'rotate(0deg)');
	
}
function moveUp() {
	objImage.css('top', parseInt(objImage.css('top')) - 5 + "px");
	$('#blob').css('transform', 'scaleX(1)');
	$('.blob-div').css('transform', 'rotate(90deg)');
}
function moveRight() {
	objImage.css('left', parseInt(objImage.css('left')) + 5 + "px");
	$('.blob-div').css('transform', 'rotate(0deg)');
	$('.blob-div').css('transform', 'scaleX(-1)');
}
function moveDown() {
	objImage.css('top', parseInt(objImage.css('top')) + 5 + "px");
	$('.blob-div').css('transform', 'rotate(270deg)');
	$('#blob').css('transform', 'scaleX(1)');
}
function getPositions() {
    var pos, width, height;
    pos = $('.blob-div').position();
    width = $('.blob-div').width();
    height = $('.blob-div').height();
    console.log(pos);
}
function getPositionsOrbs() {
    let pos, width, height;
    pos = $('#red').position();
    width = $('#red').width();
    height = $('#red').height();
    console.log(pos);
}

// Overlap Detection 

let winningArray = [];

function comparePosition() {
	if (
		$('.color').position().left < $('.blob-div').position().left + $('.blob-div').width() &&
		$('.color').position().left + $('.color').width() > $('.blob-div').position().left &&
        $('.color').position().top < $('.blob-div').position().top + $('.blob-div').height() &&
        $('.color').position().top + $('.color').height() > $('.blob-div').position().top
		) {
        // collision detected!
        let removedColor = $('.color').attr('id');
		winningArray.push(removedColor)
		$(`#${removedColor}`).remove()
    } else {
        // no collision
        $('#red').css('background-color', 'red');
}
}

// Win Conditions

function winCondition() {
	if (winningArray.length === 7) {
		clearTimeout(timeout);
		$('#night').css('display', 'none');
		$('body').css('background', 'white')
		$('.savedColor').toggleClass('active');
	}
}



// function addGradient() {
// 	$('#blob').css('background', `linear-gradient(to right, ${removedColor} 1%, transparent`);
// }

window.onload = init;

// Home

$("#home").click(function(event) {
	event.preventDefault()
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/index.html');
});

// Restart

$("#restart").click(function(event) {
	event.preventDefault()
	let test = sessionStorage.getItem("newName");
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html');
});

// Rename

$("#rename").click(function(event) {
	event.preventDefault()
	$('#rename').remove();
	$('#renameForm').css('display', 'block');
});