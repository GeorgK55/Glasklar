<?php

//   server,user,pwd
$con = mysqli_connect("db594768673.db.1and1.com","dbo594768673","GC&dck%206");

$SliderVariante = 3;

$PHP_Krit = str_replace("_"," ",$_REQUEST["Kriteria"]);
//$PHP_Kriterium = str_replace("/","-",$PHP_Krit);
//echo $PHP_Kriterium;
$SQL_String = "";
if ($_REQUEST["Mode"] == 'Galerie') {
	//$SQL_String = "SELECT * FROM T_BildGalerie where Galeriename = '" . str_replace("_"," ",$_REQUEST["Kriteria"]) . "'";
	$SQL_String = "SELECT * FROM T_BildGalerie INNER JOIN T_Bilder ON T_BildGalerie.Bildname=T_Bilder.Bildname where Galeriename = '" . $PHP_Krit . "'";
} else {
	//$SQL_String = "SELECT * FROM T_BildSuchbegriff where Suchbegrifftext = '" . str_replace("_"," ",$_REQUEST["Kriteria"]) . "'";
	//$SQL_String = "SELECT Suchbegrifftext, T_BildSuchbegriff.Bildname FROM T_BildSuchbegriff LEFT OUTER JOIN T_Bilder ON T_BildSuchbegriff.Bildname=T_Bilder.Bildname where Suchbegrifftext = '" . str_replace("_"," ",$_REQUEST["Kriteria"]) . "'";
	$SQL_String = "SELECT * FROM T_BildSuchbegriff Inner JOIN T_Bilder ON T_BildSuchbegriff.Bildname=T_Bilder.Bildname where Suchbegrifftext = '" . $PHP_Krit . "'";
}

//echo $SQL_String;

if (!$con) { 
	die('Could not connect: ' . mysqli_error()); echo "works not"; 
} else {
		
	mysqli_set_charset($con, 'utf8');
	mysqli_query($con, "SET NAMES 'utf8';");
	mysqli_select_db($con, "db594768673");

	$ImagesResult = mysqli_query($con, $SQL_String);
		
	if ($SliderVariante == 2) {		
		echo "<ul id='slider2'>";
		while($row = mysqli_fetch_array($ImagesResult))
		{
			echo "<li><a href='#'><img src='~/Bilder/" . $row['Bildname'] . "' alt=''></a></li>";
		}
		echo "</ul>";
	}
	if ($SliderVariante == 3) {
		echo "<ul id='slider3' class='rslides'>";
		while($row = mysqli_fetch_array($ImagesResult))
		{
			if ($row['Preis'] != "0.00") {
				$Preiswert = $row['Preis'] . " &euro; ";
			} else {
				$Preiswert = "";
			}			
			
			echo "<li>";
			//echo "<img src='~/Bilder/" . $row['Bildname'] . "' alt=''>";
			echo "<img src='~/Bilder/" . preg_replace("/.jpg|.JPG|.png|.PNG/", "_304$0", $row['Bildname']) . "' alt=''>";
			echo "<div class='Hinweistext'>" . $row['Beschreibung'] . " " . $Preiswert . $row['Preistext'] . "</div>";
			echo "</li>";
		}
		echo "</ul>";
		
		$ThumbsResult = mysqli_query($con, $SQL_String);
		
		echo "<ul id='slider3-pager'>";
		while($ThumbRow = mysqli_fetch_array($ThumbsResult))
		{
			//if(stripos($ThumbRow['Bildname'], '.png') > 0)
			  //echo "<li><a href='#'><img src='~/Bilder/" . str_replace('.png', '_thumb.png', $ThumbRow['Bildname']) . "' alt=''></a></li>";
			//else
			//echo "<li><a href='#'><img src='~/Bilder/" . str_replace('.JPG', '_thumb.JPG', $ThumbRow['Bildname']) . "' alt=''></a></li>";
			echo "<li><a href='#'><img src='~/Bilder/" . preg_replace("/.jpg|.JPG|.png|.PNG/", "_thumb$0", $ThumbRow['Bildname']) . "' alt=''></a></li>";
			//echo $ThumbRow['Bildname'];
		}
		echo "</ul>";

	}
	
	// Das selbstausführende Script hinterherschicken		
	echo "<script src='responsiveslides.js'></script>";
}
?>