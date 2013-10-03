self.port.on("getImages", function(keyWords) {
    // DOM Text
    var text = $('body').text();

    // Lower case all the text
    text = text.toLowerCase();
    for (i=0;i<keyWords.length;i++) {
        keyWords[i] = keyWords[i].toLowerCase();
    }

    // Get Unique words
    text = _.unique(text.split(" ")); 
    // Check how many of the keywords are present in the text. Minimum required
    // to scan images: 2
    var found_keywords = _.intersection(text, keyWords);
    console.log(found_keywords.length + " found! Specially these ones: " + found_keywords); 

    var showBar = true;
    
    if (found_keywords.length >= 2) {
        //console.log("KeyWord found");
        var bar = $("<div/>");
        var p = $("</p>");
        var a = $("<a/>");
        // Button style from: http://www.lab.tommasoraspo.com/simple-web-buttoms/
        //a.attr("href", "#");
        a.text("Submit all the Images");
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
        a.css("background", "-webkit-gradient(linear, left top, left bottom, from(#5e5e5e), to(#434343))");
        a.css("background", "-moz-linear-gradient(top,  #5e5e5e, #434343)");
        a.css("border-color", "#4c4c4c #313131 #1f1f1f");
        a.css("color", "#fff");
        a.css("text-shadow", "0 1px 0 #2e2e2e");
        a.css("-webkit-box-shadow", "0 1px 1px #afafaf, inset 0 1px 0 #868686");
        a.css("-moz-box-shadow", "0 1px 1px #afafaf, inset 0 1px 0 #868686");
        a.css("box-shadow", "0 1px 1px #afafaf, inset 0 1px 0 #868686"); 
        a.css("margin-top", "-15px");
        a.css("margin-left", "5px");
    
        // Click event
        a.off('click').on('click', function(){
            process_images();
        });
    
        p.css("padding", "3px");
        p.css("padding-left", "10px");
        p.css("font-size", "14px");
        p.css("line-height", "16px");
        p.css("font-family", "Arial");
        p.css("margin-left", "0");
        p.css("margin-right", "0");
        p.css("margin-top", "14px");
        //p.css("margin", "0px 0px 14px");
        p.text("There are some images in this page that could help Geotag X project");
        p.append(a);
        bar.attr("id", "PyBossaBar");
        bar.css("position", "absolute");
        bar.css("top", "0");
        bar.css("right", "0");
        bar.css("width", "100%");
        bar.css("height", "50px");
        bar.css("color", "white");
        bar.css("z-index", "99999999");
        bar.css("background-color", "rgb(139, 191, 54)");
        bar.append(p);
    
        if (showBar) {
            // Only show bar if the images met the WithHeight criteria
            $("body").prepend(bar);
            var images = process_images();
            self.port.emit("keywordFound", images);
        }

    }
    else {
        console.log("INFO: Less than 2 keywords found, so no interesting");
    }

    function process_images(){
        var images = [];
        $("img").map(function(){
            if ( ($(this).width() >= 150) && ($(this).height() >= 100) ) {
                images.push($(this)[0].src);
                console.log($(this)[0].src);
                showBar = true;
            }
            else {
                console.log("Image too small");
                console.log($(this).width());
            }
        });
        return images;
    }
});

