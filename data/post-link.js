self.on("message", function(project){
    for(i=0;i<project.images.length;i++) {
        // Create the image item
        var img_id = "img_" + String(i);
        var img = $("<img/>", {id: img_id});
        img.attr("src", project.images[i]);
        img.css("width", "100%");
        img.css("overflow", "hidden");
        //Create the li item
        var li = $("<li/>", {id: "photo_" + img_id});
        li.addClass("span12");
        // Create the div element
        var div = $("<div/>");
        div.addClass("thumbnail");
        div.css("background-color", "white");
        // Add the image to the div element
        div.append(img);
        // Create the image caption with the buttons
        var caption = $("<div/>");
        caption.addClass("caption");
        // Create a paragraph to host the buttons
        var p = $("<p/>");
        p.css("text-align", "center");
        var btn = $("<button/>", {id: "btn_" + img_id, class: 'btn'});
        btn.text("Send it!");
        // Button group
        var btn_group = $("<div/>");
        btn_group.attr("class", "btn-group");
        // Button action
        var img_url = project.images[i];
        btn.off('click').on('click', function(){
            // Get image id removing btn_ string
            var tmp = $(this).attr("id").split("btn_")[1];
            console.log(tmp);
            var img_url = $("#" + tmp).attr("src");
            console.log(img_url);
            $("#photo_" + tmp).hide();
            $.post("http://links.com:5000", {url: img_url, project_slug: project.slug}); 
        });
        //p.append(btn);
        btn_group.append(btn);
        var btnDiscard = $("<button/>", {id: "btnDiscard_" + img_id, class:'btn'});
        btnDiscard.text("Discard it!");
        btnDiscard.off('click').on('click', function(){
            // Get image id removing btn_ string
            var tmp = $(this).attr("id").split("btnDiscard_")[1];
            console.log(tmp);
            var img_url = $("#" + tmp).attr("src");
            console.log(img_url);
            $("#photo_" + tmp).hide();
        });
        //p.append(btnDiscard);
        btn_group.append(btnDiscard);
        p.append(btn_group);
        caption.append(p);
        div.append(caption);
        li.append(div);
        // Add the li item to the ul element
        $("#images").append(li);
    }
});
