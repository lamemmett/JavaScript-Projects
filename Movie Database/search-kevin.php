<?php
# Emmett Lam
# CSE 154 AH
# Homework 6 - Kevin Bacon
# Returns the search results for all movies in which given actor was in with Kevin Bacon
#		- Actor name is retrieved from URL

include("common.php");
top();

# Define who the reference actor is, default is Kevin Bacon
$referenceActorFirstName = "Kevin";
$referenceActorLastName = "Bacon";
$referenceName = "$referenceActorFirstName $referenceActorLastName";

# Starting column number (for table)
$column = 1;

# Grab actor name from url
$firstname = $_GET["firstname"];
$lastname = $_GET["lastname"];
$name = "$firstname $lastname";

# Grab the ID of the actor, and reference actor from database
$actorID = findActorID($firstname, $lastname);
$referenceID = findActorID($referenceActorFirstName, $referenceActorLastName);

# If actor is not found, display error message to user
if ($actorID == 0) { ?>
	Actor <?=$name?> not found.<?php
} else {
	# Access database and prepare to search for both actors
	$db = getDatabase();
	$actorID = $db->quote($actorID);
	$referenceID = $db->quote($referenceID);

	# Get films containing both actors from database
	$rows = $db->query("SELECT m.name, m.year
										FROM movies m
										JOIN roles r ON r.movie_id = m.id
										JOIN roles r2 ON r2.movie_id = m.id
										JOIN actors a ON a.id = r.actor_id
										JOIN actors a2 ON a2.id = r2.actor_id
										AND a2.id != a.id
										WHERE a.id = $referenceID
										AND a2.id = $actorID;
										ORDER BY year DESC, name;");

	# Display message if no films with Kevin Bacon
	if ($rows->rowCount() == 0) {?>
		<?=$name ?> wasn't in any films with <?=$referenceName?>
		<?php
	} else { ?>
		<!--Display results in table if actor has been in film with reference actor-->
		<h1>Results for <?=$name?></h1>
		Films with <?=$name?> and <?=$referenceName?>
		<table>
		  <tr><th>#</th><th>Title</th><th>Year</th></tr>
		  <?php
			# Display the data from each row
			foreach ($rows as $row) { ?>
				<tr><td><?=$column?></td><td><?=$row["name"]?></td><td><?=$row["year"]?></td></tr>
				<?php
				$column++;
			} ?>
		</table>
		<?php
	}
}

searchBoxes();

footer(); ?>