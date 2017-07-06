<?php
# Emmett Lam
# CSE 154 AH
# Homework 6 - Kevin Bacon
# Returns the search results for all movies in which given actor was in
#		- Actor name is retrieved from URL

include("common.php");
top();

# Starting column number (for table)
$column = 1;

# Grab actor name from url
$firstname = $_GET["firstname"];
$lastname = $_GET["lastname"];
$name = "$firstname $lastname";

# Grab the ID of the actor from database
$actorID = findActorID($firstname, $lastname);

# If actor is not found, display error message to user
if ($actorID == 0) { ?>
	Actor <?=$name?> not found.<?php
} else {
	# Access database
	$db = getDatabase();
	$actorID = $db->quote($actorID);

	# Get films containing actor from database
	$rows = $db->query("SELECT name, year
										FROM movies m
										JOIN roles r ON r.movie_id = m.id
										JOIN actors a ON a.id = r.actor_id
										WHERE a.id = $actorID
										ORDER BY year DESC, name;");
	?>

	<!--Display results in table-->
	<h1>Results for <?=$name?></h1>
	All Films
	<table>
	  <tr><th>#</th><th>Title</th><th>Year</th></tr>
	  <?php
		# Display the data in each row
		foreach ($rows as $row) { ?>
			<tr><td><?=$column?></td><td><?=$row["name"]?></td><td><?=$row["year"]?></td></tr>
			<?php
			$column++;
		} ?>
	</table> <?php
} 

searchBoxes();

footer(); ?>