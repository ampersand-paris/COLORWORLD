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
		  $('body').css("background-color", colorData.hex);
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

nightFall()

if (location.href == "file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html") {
	//$(window).ready(setTimeout(gameOver, 120000));
	// for (let i = 0; i < 100; i++) {
	// let percentage = i;
	//$(window).ready(setInterval(nightFall, 5000))
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
			break;
		case 38: //Up arrow key
			moveUp();
			getPositions()
			comparePosition()
			break;
		case 39: //right arrow key
			moveRight();
			getPositions()
			comparePosition()
			break;
		case 40: //down arrow key
			moveDown();
			getPositions()
			comparePosition()
			break;
	}
}

function moveLeft() {
	objImage.css('left', parseInt(objImage.css('left')) - 5 + "px");
}
function moveUp() {
	objImage.css('top', parseInt(objImage.css('top')) - 5 + "px");
}
function moveRight() {
	console.log('right')
	objImage.css('left', parseInt(objImage.css('left')) + 5 + "px");
}
function moveDown() {
	console.log('right')
	objImage.css('top', parseInt(objImage.css('top')) + 5 + "px");
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
function comparePosition() {
	if (
		$('.color').position().left < $('.blob-div').position().left + $('.blob-div').width() &&
		$('.color').position().left + $('.color').width() > $('.blob-div').position().left &&
        $('.color').position().top < $('.blob-div').position().top + $('.blob-div').height() &&
        $('.color').position().top + $('.color').height() > $('.blob-div').position().top
		) {
        // collision detected!
        let removedColor = $('.color').attr('id');
		$(`#${removedColor}`).remove()
    } else {
        // no collision
        $('#red').css('background-color', 'red');
}
}



window.onload = init;

// Overlap Detection 

// function comparePosition() {
// 	if ($('#red').position().left < $('.blob-div').position().left + $('.blob-div').width() &&
// 		$('#red').position().left + $('#red').width() > $('.blob-div').position().left &&
//         $('#red').position().top < $('.blob-div').position().top + $('.blob-div').height() &&
//         $('#red').position().height + $('#red').height() > $('.blob-div').position().top) {
//         // collision detected!
//         $('#red').color("green");
//     } else {
//         // no collision
//         $('#red').color("blue");
// }
// }
// Submit

$("#restart").click(function(event) {
	event.preventDefault()
	let test = sessionStorage.getItem("newName");
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html');
	console.log(test)
});