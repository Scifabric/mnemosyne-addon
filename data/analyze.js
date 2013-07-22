var keyWords = ["war", "tornado", 'typhoon', 'disaster'];
var _re = "";
for(i=0;i<keyWords.length;i++) {
    if ((i+1) == keyWords.length) {
        _re += '\\b' + keyWords[i] + '\\b';
    }
    else {
        _re += '\\b' + keyWords[i] + '\\b|';
    }
}

//console.log("Using RegEx: " + _re);

var re = RegExp(_re, "gi");

// DOM Text
var text = $('body').text();


if (re.test(text)) {
    //console.log("KeyWord found");
    $("img").map(function(){
        if ( ($(this).width() >= 150) && ($(this).height() >= 100) ) {
            //console.log("Image found here: " + $(this).attr("src"));
            // Button to submit the picture
            var a = $("<a/>");
            a.attr("href", "#");
            a.text("Submit to PyBossa");
            a.css("display", "inline-block");
            a.css("text-decoration", "none");
            a.css("font", "bold 12px/12px HelveticaNeue, Arial");
            a.css("padding", "4px 7px");
            a.css("color", "#555");
            a.css("border", "1px solid #dedede");
            a.css("-webkit-border-radius", "3px");
            a.css("-moz-border-radius", "3px");
            a.css("border-radius", "3px");
            a.css("background", "#b7d770");
            a.css("background", "-webkit-gradient(linear, left top, left bottom, from(#cae285), to(#9fcb57))");
            a.css("background", "-moz-linear-gradient(top,  #cae285, #9fcb57)");
            a.css("border-color", "#adc671 #98b65b #87aa4a");
            a.css("color", "#5d7731");
            a.css("text-shadow", "0 1px 0 #cfe5a4");
            a.css("-webkit-box-shadow", "0 1px 1px #d3d3d3, inset 0 1px 0 #d7e9a4");
            a.css("-moz-box-shadow", "0 1px 1px #d3d3d3, inset 0 1px 0 #d7e9a4");
            a.css("box-shadow", "0 1px 1px #d3d3d3, inset 0 1px 0 #d7e9a4"); 
            a.css("margin-top", "-15px");
            a.css("margin-left", "5px");

            $(this).parent().append(a);
        }
        //else {
        //    console.log("Image too small");
        //    console.log($(this).width());
        //}
    });
}
//else {
//    console.log("KeyWord NOT found");
//}
