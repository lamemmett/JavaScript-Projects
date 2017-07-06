/*
Emmett Lam
CSE 154 AH
Homework 8 - Fifteen Puzzle

	*This page contains the event handlers and dynamic actions of the fifteen.html page
	
	- This file creates a 15 shuffling tile puzzle and allows the user to click on a tile
			within the puzzle to move it into a neighboring blank space.
	- Also, the user can click the "Shuffle" button to randomly shuffle the tiles
*/

(function() {
	"use strict";
	
	// these two values store the current position of the blank space
	var BLANK_SPACE_TOP = 300;
	var BLANK_SPACE_LEFT = 300;
	
	// handles the active events of the page such as buttons and clicking
	window.onload = function() {
		// initialize the original 15 pieces of the puzzle
		initializePuzzle();
		
		// handle square events such as highlighting and mouse clicks
		var squares = document.querySelectorAll(".square");
		for (var i = 0; i < squares.length; i++) {
			squares[i].onmouseover = selectSquare;
			squares[i].onmouseout = deselectSquare;
			squares[i].onclick = function() {
				swapSquare(this);
			};
		}
		
		// shuffles squares when shuffle button is clicked
		document.getElementById("shufflebutton").onclick = shuffle;
	};
	
	// Initializes the starting 15 pieces of the puzzle to their solved state
	function initializePuzzle() {
		var n = 1;
		for (var y = 0; y <= 300; y+=100)  {
			for (var x = 0; x <= 300 && n < 16; x+=100) {
				drawSquare(x, y, n);
				n++;
			}
		}
	}
	
	// Draws a square at the indicated x and y coordinates, and displays the number n in the center
	function drawSquare(x, y, n) {
		var square = document.createElement("div");
		square.classList.add("square");
		square.style.left = x + "px";
		square.style.top = y + "px";
		square.style.backgroundPosition = -x + "px " + -y + "px";
		square.innerHTML = n;
		document.getElementById("puzzlearea").appendChild(square);
	}
	
	// highlights the given square by turning the border and text red
	function selectSquare() {
		if (nextToBlank(this)) {
			this.style.border = "solid red 5px";
			this.style.color = "red";
			this.style.cursor = "pointer";
		}
	}
	
	// unhighlights the given square by turning the border and text black
	function deselectSquare() {
		if(nextToBlank(this)) {
			this.style.border = "solid black 5px";
			this.style.color = "black";
			this.style.cursor = "default";
		}
	}
	
	// swaps the given square with the blank square if it neighbors the blank square
	function swapSquare(event) {
		if (nextToBlank(event)) {
			var oldTop = parseInt(event.style.top);
			var oldLeft = parseInt(event.style.left);
			event.style.top = BLANK_SPACE_TOP + "px";
			event.style.left = BLANK_SPACE_LEFT + "px";
			BLANK_SPACE_TOP = oldTop;
			BLANK_SPACE_LEFT = oldLeft;
		}
	}
	
	// shuffles the board by swapping the blank square with a random adjacent square 1000 times
	function shuffle() {
		// grab all squares
		var squares = document.querySelectorAll(".square");
		var neighbors = [];
		
		for (var n = 0; n < 1000; n++) {			
			// add all adjacent squares to the blank into a separate array
			for (var i = 0; i < squares.length; i++) {
				if (nextToBlank(squares[i])) {
					neighbors.push(squares[i]);
				}
			}
			// Pick a random, neighboring square and swap it with the blank
			var r = parseInt(Math.random() * neighbors.length);
			swapSquare(neighbors[r]);
			
			// clear the neighbors array and repeat the process
			neighbors = [];
		}
	}
	
	// returns true if the given square is next to the blank square
	function nextToBlank(event) {
		return ((parseInt(event.style.top) == BLANK_SPACE_TOP &&
			Math.abs(parseInt(event.style.left) - BLANK_SPACE_LEFT) <= 100) ||
			(parseInt(event.style.left) == BLANK_SPACE_LEFT &&
			Math.abs(parseInt(event.style.top) - BLANK_SPACE_TOP) <= 100));
	}
})();