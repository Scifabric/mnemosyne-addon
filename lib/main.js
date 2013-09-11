// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Import the self API
var self = require("sdk/self");

// Import Request
var Request = require("sdk/request").Request;

var projectsPanel = require("sdk/panel").Panel({
    width: 300,
    height: 200,
    contentURL: self.data.url("projects.html"),
    contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
                        self.data.url("projects.js")],

});

projectsPanel.on("show", function(){
    projectsPanel.port.emit("show");
});

projectsPanel.port.on("project-selected", function(project){
    console.log(project.name + " has been checked! Its keywords are: " + project.keywords);
    projectsPanel.hide();
});


// Import widget
require("sdk/widget").Widget({
    id: "mozilla-icon",
    label: "PyBossa Widget",
    contentURL: "http://www.mozilla.org/favicon.ico",
    panel: projectsPanel,
});
 
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
