<?php
# Emmett Lam
# CSE 154 AH
# Homework 6 - Kevin Bacon
# The starter page for the One Degree of Kevin Bacon site
# 	- Allows users to type in an actors name and retrieve either:
#			- All movies that actor has been in
#			- All movies that actor has been in where Kevin Bacon appeared as well

include("common.php");
top();
?>

<h1>The One Degree of Kevin Bacon</h1>
<p>Type in an actor's name to see if he/she was ever in a movie with Kevin Bacon!</p>
<p><img src="https://webster.cs.washington.edu/images/kevinbacon/kevin_bacon.jpg" alt="Kevin Bacon" /></p>

<?php
searchBoxes();

footer(); ?>
