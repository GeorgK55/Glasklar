  $("#effekt").mousemove(function(Pos){
  	alert("MouseMove");
    var bild = new Image();
    bild.src = $("#mini").attr("src");
    var width = bild.width;
    var height = bild.height;
    var li = Pos.pageX - $(this).offset().left;
    var ob = Pos.pageY - $(this).offset().top;
    if ( (li > 0 && li < $(this).width()) &&
         (ob > 0 && ob < $(this).height()) ) {
      $("#lupen").fadeIn("fast");
    } else {
      $("#lupen").fadeOut("slow");
    }
    if ($("#lupen") .is (":visible")) {
      var pw = $("#lupen").width()/2;
      var ph = $("#lupen").height()/2;
      var px = li - pw;
      var py = ob - ph;
      var grw = Math.round(pw - li/$("#mini").width() * width * 3.03);
      var grh = Math.round(ph - ob/$("#mini").height() * height * 3.03);
      var pos = grw + "px " + grh + "px";
      $("#lupen").css({left: px, top: py, backgroundPosition: pos});
    }
  });
