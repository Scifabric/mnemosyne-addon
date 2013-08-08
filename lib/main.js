// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Import the self API
var self = require("sdk/self");


 
// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
var keyWords = ["war", "tornado", 'typhoon', 'disaster'];
pageMod.PageMod({
  include: "*",
  contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
                      self.data.url("analyze.js")],
  onAttach: function(worker) {
                worker.port.emit("getImages", keyWords);
                worker.port.on("keywordFound", function(images){
                    var panel = require("sdk/panel").Panel({
                        width: 400,
                        height: 400,
                        contentURL: self.data.url("index.html"),
                        contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
                                            self.data.url("hello.js")],
                    });
                    panel.postMessage(images);
                    panel.show();

                    });
            }
});
