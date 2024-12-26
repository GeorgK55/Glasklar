$(document).ready(function(){
				
	de 					= document.documentElement;
	myWidth 			= window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	myHeight 			= window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	CurrentDate 		= new Date().toISOString().slice(0, 19).replace('T', ' ');
  	CurrentBrowser 		= navigator.userAgent;
	ReturnText 			= "";
	CurrentImageName 	= "";
	//PreviousImageList   = [];
	
	//$.post( "dummy.php" );    
	
	$.post({
		url:	"LogVisitor.php",
		dataType: "json",
		data:	{ 
			Benutzer: 			"", 
			Besuchszeit: 		CurrentDate,
			Betriebssystem:		navigator.platform,
			Browser:			CurrentBrowser,
			Cookies:			navigator.cookieEnabled,
			Fensterbreite:		myWidth,
			Fensterhoehe:		myHeight,
			Aktion:				"Besucher"
		}})
		.done(function() 		{ alert("done mit " ); })
		.fail(function(error) { alert("fail mit " + error.responseJSON); })
		.always(function() 		{ alert("always mit "); })
    ;

});

function PrepareShowGalerie(Galeriename) {
	
	//alert($('#ContentSection').width() + '\n' + $('#ContentSection').height());
	GetImages('Galerie', Galeriename);
}
   
function PrepareSearch() {
	
	var e = document.getElementById("Suchbegriffsliste");
	if (e.options[e.selectedIndex] != undefined)
	{
		var strSuchbegriff = e.options[e.selectedIndex].value.replace(' ', '_');
		GetImages('Suche', strSuchbegriff);
	} else {
		alert(unescape("Bitte einen Suchbegriff ausw%E4hlen"));	
	}
}
   
function GetImages(Mode, Kriteria) {

	//alert('ShowResult.php?Mode=' + Mode + '&Kriteria=' + Kriteria);
	Krit = Kriteria.replace(/ /g, '_')
	//Krit  = Krit1.replace('-', '/')
	//alert(Krit);
	$('#ResultSection').load('ShowResult.php?Mode=' + Mode + '&Kriteria=' + Krit, 
		function(responseText, textStatus, XMLHttpRequest) { 

				//alert(responseText);

				myWidth 		= window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
				myHeight 		= window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
				//alert('myWidth' + myWidth + '\n' + 'myHeight' + myHeight);
				
				DynamicWidth = ($('#ContentSection').height() - 120) * 1.5
				//if ($('#ContentSection').height() > 500) {
				//	DynamicWidth = 600;
				//} else
				//{
				//	DynamicWidth = 500;
				//}
				//alert($('#ContentSection').width() + '\n' + $('#ContentSection').height()+ '\n' + DynamicWidth);
				
		      $("#slider3").responsiveSlides({
		        manualControls: 	'#slider3-pager',
		        pause: 				true,
		        maxwidth: 			DynamicWidth,
		        pause:				true,
		        auto:				true,
		        timeout: 			6000,
		        speed:				2000,
        		after: function () { /*alert("Hurra");*/ /*CurrentImageName = 19;*/ }
		      });

			  //$(function() { $('.rslides').responsiveSlides(); });	

				//$('.rslides_tabs').width(DynamicWidth);
				$( ".rslides_tabs" ).css( "maxWidth", DynamicWidth);
		}
	);
	
	// MarkierungsArea versorgen
	//$('#MerkenSection').load('Merken.html');
}

function ManageImageList() {
	//alert("Hurra");
	//alert($('.rslides1_on').id);
	//alert($('.rslides1_on')[0].children[0].src.substring($('.rslides1_on')[0].children[0].src.lastIndexOf("/") + 1));
	//NewItem = $('.rslides1_on')[0].children[0].src.substring();
	//Pos = $('.rslides1_on')[0].children[0].src.lastIndexOf("/")) + 1;
	//localStorage.setItem("GC_ImageList", $('.rslides1_on')[0].innerHTML);
	//var PreviousImageList = JSON.parse(localStorage.getItem('gcimagelist'));
	
	localStorage.clear();
	if(localStorage.getItem("gcimagelist") != null) {
		PreviousImageList = localStorage.getItem("gcimagelist").split(" * ");
		PreviousImageList.push($('.rslides1_on')[0].innerHTML);
		localStorage.setItem("gcimagelist", PreviousImageList.join(" * "));
	}
}
function ShowImageList() {
	alert(localStorage.getItem("gcimagelist"));
}

// Liste der Modifikationsm�glichkeiten des Sliders:
/*
$(".rslides").responsiveSlides({
  auto: true,             // Boolean: Animate automatically, true or false
  speed: 500,            // Integer: Speed of the transition, in milliseconds
  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
  pager: false,           // Boolean: Show pager, true or false
  nav: false,             // Boolean: Show navigation, true or false
  random: false,          // Boolean: Randomize the order of the slides, true or false
  pause: false,           // Boolean: Pause on hover, true or false
  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
  prevText: "Previous",   // String: Text for the "previous" button
  nextText: "Next",       // String: Text for the "next" button
  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
  manualControls: "",     // Selector: Declare custom pager navigation
  namespace: "rslides",   // String: Change the default namespace used
  before: function(){},   // Function: Before callback
  after: function(){}     // Function: After callback
});
*/
var step = 1;
function nextShadow(){
	$('.feuer span').each(function(){
	    y = parseFloat($(this).attr("y_pos"));
	    y += step + Math.random()*3;
	    $(this).attr("y_pos", y);
	    shaking = Math.random();
	    shadow1 = "0px 0px "+(y%5)+"px white";
	    shadow2 = shaking*24/y*Math.cos(y/5)*15+"px -"+(shaking*4/y+(y%17))+"px "+(shaking+(y%17))+"px red";
	    shadow3 = shaking*24/y*Math.cos(y/7)*15+"px -"+(shaking*4/y+(y%31))+"px "+(shaking+(y%31))+"px #993";
	    shadow4 = shaking*24/y*Math.cos(y/13)*15+"px -"+(shaking*4/y+(y%41))+"px "+(shaking+(y%41))+"px yellow";
	    $(this).css("text-shadow", shadow2+", "+shadow1+", "+shadow4+", "+shadow3);
	});
}
$(function(){
    $('.feuer span').each(function(){$(this).attr("y_pos","0");});
   setInterval(nextShadow, 50); 
});


// Wird nicht benutzt
function XXXActivateSliderXXX() {
	
	//alert("ActivateSlider with: " + $("#slider3-pager").length);
	  // Slideshow Thumbs to Click
	  $("#slider3").responsiveSlides({
	    manualControls: '#sliderThumbs',
	    maxwidth: 540
	  });

	  $('.rslides').responsiveSlides();

	  // Slideshow automatic
	  $("#Slider1").responsiveSlides({
	    maxwidth: 500,
	    speed: 800
	  });
	
      // Slideshow 2
      $("#slider2").responsiveSlides({
        auto: false,
        pager: true,
        speed: 300,
        maxwidth: 540
      });

	  // Slideshow Thumbs to Click
	  $("#slider3").responsiveSlides({
	    manualControls: '#sliderThumbs',
	    maxwidth: 540
	  });
}
