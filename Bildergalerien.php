<?php

// Bildergalerien.php:
// Generiert für jeden Galerienamen einen Knopf zum Anzeigen der Galerie 
// Die Section für die Anzeige wird schon hier angelegt.
//
$con = mysqli_connect("db594768673.db.1and1.com","dbo594768673","GC&dck%206");
	
if (!$con) { 
	die('Could not connect: ' . mysqli_error()); echo "works not"; 
} else {
	mysqli_set_charset($con, 'utf8');
	mysqli_query($con, "SET NAMES 'utf8';");
	mysqli_select_db($con, "db594768673");
	
	echo "<section id='GalerieSelectionSection' class='SearchArea'>";
	$result = mysqli_query($con, "SELECT * FROM T_Galerien where Anzeigenummer > 0 order by Anzeigenummer");
	
	while($row = mysqli_fetch_array($result))
	{
  		//echo "<option value='".$row['Suchbegrifftext']."'>" . $row['Suchbegrifftext'] . "</option>";
  		echo "<button type='button' onclick='PrepareShowGalerie(\"".$row["Galeriename"]."\");' class='GalerieButton'>".$row['Galeriename']."</button>"; 
	}
	
	echo "</section>";
	echo "<section id='ResultSection' class='ResultArea'></section>";
	echo "<section id='MerkenSection' class='MerkenArea'></section>";
}
?>