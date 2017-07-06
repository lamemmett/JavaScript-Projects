/*
Emmett Lam
CSE 154 AH
Homework 7 ASCIImation

	This page contains the event handlers and dynamic actions of the ascii.html page
*/
(function() {
	"use strict";
	// Indicates the frame-rate of the ASCIImation
	var FRAME_SPEED = 250;
	
	// Holds the state of the ASCIImation's frames, initially holds empty string reprsenting the default "Blank" value
	var FRAMES = [BLANK];
	var FRAME_NUMBER = 0;
	var IS_PLAYING = false;
	
	// Holds the timer, which plays frames on an interval
	var TIMER = null;

	// On-load function, handles events that occur on the HTML page
	window.onload = function() {
		// Handle start and stop buttons
		document.getElementById("start").onclick = start;
		document.getElementById("stop").onclick = stop;
		
		// Handle animation selection options
		document.getElementById("animation").onchange = selectAnimation;
		
		// Handle font size selection options
		document.getElementById("size").onchange = setSize;
		
		// Handle speed selection options
		document.getElementById("turbo").onclick = function() {
			setSpeed(50);
		};
		document.getElementById("normal").onclick = function() {
			setSpeed(250);
		};
		document.getElementById("slow-mo").onclick = function() {
			setSpeed(1500);
		};
	};
	
	// Starts playing the animation
	function start() {
		IS_PLAYING = true;
		
		// Reset frame counter
		FRAME_NUMBER = 0;
		
		// Handle enabling/disabling state-based buttons
		document.getElementById("start").disabled = true;
		document.getElementById("stop").disabled = false;
		document.getElementById("animation").disabled = true;
		
		// Break animation currently on screen into frames and store in global array
		FRAMES = document.getElementById("screen").value.split("=====\n");
		
		// Start playing the animation
		TIMER = setInterval(nextFrame, FRAME_SPEED);
	}
	
	// Stops playing the animation
	function stop() {
		IS_PLAYING = false;
		
		// Stops playing the animation
		clearInterval(TIMER);
	
		// Handle enabling/disabling state-based buttons	
		document.getElementById("start").disabled = false;
		document.getElementById("stop").disabled = true;
		document.getElementById("animation").disabled = false;
		
		// Resets the animation on the screen
		resetAnimation();
	}
	
	// Loads a new animation onto the screen/resets the animation
	function selectAnimation() {
		var animation = document.getElementById("animation").value;
		// Loads animation onto page based on current selected value
		document.getElementById("screen").value = ANIMATIONS[animation];
	}
	
	// Sets the font size within ASCIImation area
	function setSize() {
		document.getElementById("screen").style.fontSize = document.getElementById("size").value;
	}
	
	// Sets the frame-rate
	function setSpeed(interval) {
		FRAME_SPEED = interval;
		
		// adjust speed immediately if animation is playing by reseting timer
		if (IS_PLAYING) {
			clearInterval(TIMER);
			TIMER = setInterval(nextFrame, FRAME_SPEED);
		}
	}
	
	// Plays the next frame
	function nextFrame() {
		// Display next frame
		document.getElementById("screen").value = FRAMES[FRAME_NUMBER];
		
		// Move to next frame
		FRAME_NUMBER++;
		
		// If at last frame, reset to first frame
		if (FRAME_NUMBER >= FRAMES.length) {
			FRAME_NUMBER = 0;
		}
	}
	
	// Resets animation to state before hitting start button
	function resetAnimation() {
		document.getElementById("screen").value = FRAMES.join("=====\n");
	}
})();