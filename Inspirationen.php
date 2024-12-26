<?php

// Suche.php:
// Generiert eine Select-Box mit den alphabetisch sortierten Suchbegriffen 
// Dann wird der Knopf zur Anzeige des Suchergebnisses erzeugt.
// Die Section für die Suchergebnisse wird schon hier angelegt.
//
$con = mysql_connect("db594768673.db.1and1.com","dbo594768673","GC&dck%206");
mysql_set_charset('utf8');
mysql_query("SET NAMES 'utf8';", $con);
	
if (!$con) { 
	die('Could not connect: ' . mysql_error()); echo "works not"; 
} else {
	mysql_select_db("db594768673", $con);
	
	echo "<section id='SuchSection' class='SearchArea'>";
	echo "<form action='dummy.html'>";
	echo "<select id='Suchbegriffsliste' size = '24' >";
	$result = mysql_query("SELECT * FROM T_Suchbegriffe order by Suchbegrifftext");
	
	while($row = mysql_fetch_array($result))
	{
  		echo "<option value='".$row['Suchbegrifftext']."'>" . $row['Suchbegrifftext'] . "</option>";
	}
	
	echo "</select>";
	echo "<button type='button' onclick='StartSearch();'>Bilder anzeigen</button>"; 
	echo "</section>";
	echo "<section id='ResultSection' class='ResultArea'>";
	echo "</section>";
	echo "</form>";
}
?>
