// COLORWORLD LANDING PAGE

// -- Background Color
// -- -- Changes background color when mouse is over 'COLOR' in 'COLORWORLD'

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

// -- -- Changes background color when mouse is over both form elements

$('form').on('mouseover', (e) => {
	e.preventDefault();
	const userInput = $('input[type="text"]').val();

  	$.ajax({
	  url: `https://x-colors.herokuapp.com/api/random/`,
 	}).then(
	  	(colorData) => {
			if ($(location).attr('href') === 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/index.html') {
			$('body').css("background-color", colorData.hex);
			}
	},
	  	(error) => {
		  	console.log("bad request: ", error);
	  	}
  	);
});

// -- Dropdown Instructions 
// -- -- Click the arrow to drop down the instructions 

$('.down-arrow').click(function() {
    $('.instructions').toggleClass('active');
	$('.down-arrow').toggleClass('turn');
})

// -- Play Button 
// -- -- Click the play button to store blob name and begin gameplay

$('form').on('submit', (event) => {
	event.preventDefault();
	let userName = $('input[type="text"]').val();
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html')
	sessionStorage.setItem("blobName", userName);
});


// COLORWORLD RESET PAGE

// -- Restart
// -- -- Restarts the game with the player's original name

$("#restart").click(function(event) {
	event.preventDefault()
	let test = sessionStorage.getItem("newName");
	$(location).attr('href', 'file:///Users/andrewpester/seirfx119/projects/COLORWORLD/gameplay.html');
});

// -- Rename
// -- -- Replaces rename button with a rename form and resets the name when the player clicks rename

$("#rename").click(function(event) {
	event.preventDefault()
	$('#rename').remove();
	$('#renameForm').css('display', 'block');
});