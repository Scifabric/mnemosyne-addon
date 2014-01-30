self.port.on("getImages", function(data) {
    var keyWords = data.keywords;
    if (data.uri.indexOf("google") == -1) {
        // DOM Text
        var text = $('body').text();
    }
    else {
        var text = "";
    }

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

    var showBar = false;
    
    if (found_keywords.length >= 2) {
        // Get images
        var images = process_images();

        if (images.length > 0) {
            self.port.emit("keywordFound", images);
        }
    }

    function process_images(){
        var images = [];
        $("img").slice(0,20).map(function(){
            if ( ($(this).width() >= 200) && ($(this).height() >= 100) ) {
                images.push($(this)[0].src);
                showBar = true;
            }
        });
        return images;
    }
});

