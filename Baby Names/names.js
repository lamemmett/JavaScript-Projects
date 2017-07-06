// Emmett Lam
//
// Promts user to select a name from a drop-down list
//	- Displays relevant information pertaining to that name when user clicks Search
//		- User can specify gender
//		- Displays meaning of name
//		- Displays popularity of name in graphical format
//		- Displays celebrities who share that first name

(function() {
	"use strict";
	window.onload = function() {
		// Load the list of names in the drop down box
		ajaxRequest("type=list").onload = loadList;
		// When search button is clicked, display information about the selected name and gender
		document.getElementById("search").onclick = function() {
			// Enable display of the results area
			document.getElementById("resultsarea").style.display = "inline";
			
			// Clears the results display
			clearResults();
			
			// Grab search parameters from fields
			var name = document.getElementById("allnames").value;
			if (document.getElementById("genderm").checked) {
				var gender = "m";
			} else {
				var gender = "f";
			}
			// Load and display the Meaning section
			ajaxRequest("type=meaning&name=" + name).onload = displayMeaning;
			
			// Load and display the Ranking section
			ajaxRequest("type=rank&name=" + name + "&gender=" + gender).onload = displayRanking;
			
			// Load and display the Celebs section
			ajaxRequest("type=celebs&name=" + name + "&gender=" + gender).onload = displayCelebs;
		}; // -- End of search-button click actions
	};
	
	// Returns the ajax request with the given additional parameters
	function ajaxRequest(params) {
		var ajax = new XMLHttpRequest();
		ajax.open("GET", "https://webster.cs.washington.edu/cse154/babynames.php?" + params, true);
		ajax.send();
		return ajax;
	}
	
	// loads the names from the server into the select box
	function loadList() {
		// Display an error message if error code is not 410 or 200 (okay)
		if (this.status != 200 && this.status != 410) {
			displayError();
		}
		var list = document.getElementById("allnames");
		var lines = this.responseText.split("\n");
		// Add each name into select box
		for (var i = 0; i < lines.length; i++) {
			addName(lines[i]);
		}
		list.disabled = false;
		document.getElementById("loadingnames").style.display = "none";
	}
	
	// Displays the Meaning retrieved from the server about the selected name
	function displayMeaning() {
		// Display an error message if error code is not 410 or 200 (okay)
		if (this.status != 200 && this.status != 410) {
			displayError();
		}
		document.getElementById("meaning").innerHTML = this.responseText;
		// Hide loading icon when completed
		document.getElementById("loadingmeaning").style.display = "none";
	}
	
	// Displays the Ranking data retrieved from the server for the selected name and gender
	function displayRanking() {
		// Display an error message if error code is not 410 or 200 (okay)
		if (this.status != 200 && this.status != 410) {
			displayError();
		} else if (this.status == 410) {	// display message if no ranking data available
			document.getElementById("norankdata").style.display = "inline";
		} else { // If no errors, display results in graph
			var data = this.responseXML;
			var ranks = data.querySelectorAll("rank");
			addHeaders(ranks);
			addRankingBars(ranks);
		}
		document.getElementById("loadinggraph").style.display = "none";
	}
	
	// Displays the Celebrity data retrieved from the server for the selected name and gender
	function displayCelebs() {
		// Display an error message if error code is not 410 or 200 (okay)
		if (this.status != 200 && this.status != 410) {
			displayError();
		}
		var data = JSON.parse(this.responseText);
		// Display each actor
		for (var i = 0; i < data.actors.length; i++) {
			displayActor(data.actors[i]);
		}
		// Hide loading icon when completed
		document.getElementById("loadingcelebs").style.display = "none";
	}
	
	// Adds an individual name into the select box
	function addName(name) {
		var option = document.createElement("option");
		option.innerHTML = name;
		option.value = name;
		document.getElementById("allnames").appendChild(option);
	}
	
	// Adds the "year" column headers to the graph
	function addHeaders(ranks) {
		var row = document.createElement("tr");
		// Add a header for each year and inject row into graph
		for (var i = 0; i < ranks.length; i++) {
			var header = document.createElement("th");
			header.innerHTML = ranks[i].getAttribute("year");
			row.appendChild(header);
		}
		document.getElementById("graph").appendChild(row);
	}
	
	// Adds the ranking bars to the graph
	function addRankingBars(ranks) {
		var row = document.createElement("tr");
		// Add a column for each year of data
		for (var i = 0; i < ranks.length; i++) {
			// Make the new ranking bar
			var bar = document.createElement("div");
			var rank = ranks[i].textContent;
			bar.innerHTML = rank;
			bar.classList.add("rankingbar");
			// Adjust the height of each bar if rank is not 0
			if (rank != 0) {
				bar.style.height = parseInt( (1000 - rank)/4) + "px";
				// Set color of ranking to red if less than 10
				if (rank <= 10 && rank != 0) {
					bar.classList.add("red");
				}
			}
			// Append to graph as a table entry
			var entry = document.createElement("td");
			entry.appendChild(bar);
			row.appendChild(entry);
		}
		document.getElementById("graph").appendChild(row);
	}
	
	// Displays the given actor in the bulleted list at the bottom of the page
	function displayActor(actor) {
		var entry = document.createElement("li");
		entry.innerHTML = actor.firstName +" "+ actor.lastName +" ("+ actor.filmCount +" films)";
		document.getElementById("celebs").appendChild(entry);
	}
	
	// Displays an error message at the bottom of the page
	function displayError() {
		// Hide loading animations
		document.getElementById("loadingmeaning").style.display = "none";
		document.getElementById("loadinggraph").style.display = "none";
		document.getElementById("loadingcelebs").style.display = "none";
		
		// Display error at bottom of the page
		document.getElementById("errors").innerHTML =
			"Sorry, but an error occured during your server request.";
	}
	
	// Clears the results display area
	function clearResults() {
		// Re-display loading icons
		document.getElementById("loadingmeaning").style.display = "inline";
		document.getElementById("loadinggraph").style.display = "inline";
		document.getElementById("loadingcelebs").style.display = "inline";
		
		// Clear old results
		document.getElementById("meaning").innerHTML = "";
		document.getElementById("graph").innerHTML = "";
		document.getElementById("celebs").innerHTML = "";
		
		// Hide "no results" error message
		document.getElementById("norankdata").style.display = "none";
	}
})();