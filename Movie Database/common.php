<?php
# Emmett Lam
# CSE 154 AH
# Homework 6 - Kevin Bacon
# Contains the common files shared between the MyMDb pages

# prints the header and banner of each page
function top() { ?>
	<!DOCTYPE html>
	<html>
		<head>
			<title>My Movie Database (MyMDb)</title>
			<meta charset="utf-8" />
			
			<!-- Links to provided files.  Do not edit or remove these links -->
			<link href="https://webster.cs.washington.edu/images/kevinbacon/favicon.png" type="image/png" rel="shortcut icon" />
			<script src="https://webster.cs.washington.edu/js/kevinbacon/provided.js" type="text/javascript"></script>

			<!-- Link to your CSS file that you should edit -->
			<link href="bacon.css" type="text/css" rel="stylesheet" />
		</head>

		<body>
			<div id="frame">
				<div id="banner">
					<a href="index.php"><img src="https://webster.cs.washington.edu/images/kevinbacon/mymdb.png" alt="banner logo" /></a>
					My Movie Database
				</div> 
				<div id="main"><?php
}

# Prints the footer of each page, which contains the w3c validator links
function footer() { ?>
				</div> <!-- end of #main div -->
				<div id="w3c">
					<a href="https://webster.cs.washington.edu/validate-html.php"><img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML5" /></a>
					<a href="https://webster.cs.washington.edu/validate-css.php"><img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS" /></a>
				</div>
			</div> <!-- end of #frame div -->
		</body>
	</html> <?php
}

function searchBoxes() { ?>
	<div id="searchboxes">
		<!-- form to search for every movie by a given actor -->
		<form action="search-all.php" method="get">
			<fieldset>
				<legend>All movies</legend>
				<div>
					<input name="firstname" type="text" size="12" placeholder="first name" autofocus="autofocus" /> 
					<input name="lastname" type="text" size="12" placeholder="last name" /> 
					<input type="submit" value="go" />
				</div>
			</fieldset>
		</form>

		<!-- form to search for movies where a given actor was with Kevin Bacon -->
		<form action="search-kevin.php" method="get">
			<fieldset>
				<legend>Movies with Kevin Bacon</legend>
				<div>
					<input name="firstname" type="text" size="12" placeholder="first name" /> 
					<input name="lastname" type="text" size="12" placeholder="last name" /> 
					<input type="submit" value="go" />
				</div>
			</fieldset>
		</form>
	</div> <!-- end of searchboxes div -->
	<?php
}

# Returns the IMDB database as a PDO object
function getDatabase() {
	return new PDO("mysql:dbname=imdb;host=localhost", "lamemmet", "YL3etMvPnVzHJ");
}

# Gets the ID of the given actor from the database
# - In the case that there are multiple actors with same name, 
#					break tie by # of films, or alphabetically if tied
# - If no actor exists by that name, ID returned is 0
function findActorID($firstname, $lastname) {
	$db = getDatabase();
	$lastname =  $db->quote($lastname);
	$first = $db->quote("$firstname%");
	$rows = $db->query("SELECT id
										FROM actors
										WHERE last_name = $lastname
										AND first_name LIKE $first
										ORDER BY film_count DESC, id
										LIMIT 1;");
	# return the id of the first actor from the query, there will only be 1 entry
	foreach ($rows as $row) {
		return $row["id"];
	}
}
?>