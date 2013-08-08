self.on("message", function(images){
    for(i=0;i<images.length;i++) {
        //Create first the li item
        var li = $("<li/>");
        li.addClass("span3");
        // Create the image item
        var img_id = "img_" + String(i);
        var img = $("<img/>");
        img.attr("src", images[i]);
        img.addClass("img-polaroid");
        // Add the image to the li element
        li.append(img);
        // Add the li item to the ul element
        $("#images").append(img);
    }
});
