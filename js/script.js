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

// Submit

$('form').on('submit', (event) => {
	event.preventDefault()
	let userName = $('input[type="text"]').val();
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html')
	sessionStorage.setItem("blobName", userName)
});

// Blob Name

$(document).ready(function() {
	let blobName = sessionStorage.getItem("blobName");
	let blobEl = $(`<p>${blobName}<p>`)
	$('#blob').after(blobEl)
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
			break;
		case 38: //Up arrow key
			moveUp();
			break;
		case 39: //right arrow key
			moveRight();
			break;
		case 40: //down arrow key
			moveDown();
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

window.onload = init;

// Overlap Detection 

var overlaps = (function () {
    function getPositions( elem ) {
        var pos, width, height;
        pos = $( elem ).position();
        width = $( elem ).width();
        height = $( elem ).height();
        return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
    }

    function comparePositions( p1, p2 ) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function ( a, b ) {
        var pos1 = getPositions( a ),
            pos2 = getPositions( b );
        return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
    };
})();

$(function () {
    var area = $( '#area' )[0],
        box = $( '#box0' )[0],
        html;
    
    html = $( area ).children().not( box ).map( function ( i ) {
        return '<p>Red box + Box ' + ( i + 1 ) + ' = ' + overlaps( box, this ) + '</p>';
    }).get().join( '' );

    $( 'body' ).append( html );
});