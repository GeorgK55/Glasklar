<?php

// Suche.php:
// Generiert eine Select-Box mit den alphabetisch sortierten Suchbegriffen 
// Dann wird der Knopf zur Anzeige des Suchergebnisses erzeugt.
// Die Section für die Suchergebnisse wird schon hier angelegt.
//
$con = mysqli_connect("db594768673.db.1and1.com","dbo594768673","GC&dck%206");
	
if (!$con) { 
	die('Could not connect: ' . mysqli_error()); echo "works not"; 
} else {
	mysqli_set_charset($con, 'utf8');
	mysqli_query($con, "SET NAMES 'utf8';");
	mysqli_select_db($con, "db594768673");
	
	echo "<section id='SuchSection' class='SearchArea'>";
	echo "<form action='dummy.html'>";
	echo "<select id='Suchbegriffsliste' size = '24' >";
	$result = mysqli_query($con, "SELECT * FROM T_Suchbegriffe order by Suchbegrifftext");
	
	while($row = mysqli_fetch_array($result))
	{
  		echo "<option value='".$row['Suchbegrifftext']."'>" . $row['Suchbegrifftext'] . "</option>";
	}
	
	echo "</select>";
	echo "<button type='button' onclick='PrepareSearch();'>Bilder anzeigen</button>"; 
	echo "</section>";
	echo "<section id='ResultSection' class='ResultArea'>";
	echo "</section>";
	echo "</form>";
}
?>
