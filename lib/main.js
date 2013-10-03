// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Import the self API
var self = require("sdk/self");

// Import Request
var Request = require("sdk/request").Request;

// Welcome page
var welcomePage = self.data.url("welcome.html");
// Import tabs to so welcome page
var tabs = require("sdk/tabs");

// Simple Storage for chosen project
var ss = require("sdk/simple-storage");

// PageMod variable
var pm;

var projectsPanel = require("sdk/panel").Panel({
    width: 300,
    height: 200,
    contentURL: self.data.url("projects.html"),
    contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
        self.data.url("projects.js")],

});

projectsPanel.on("show", function(){
    projectsPanel.port.emit("show", ss.storage.project);
});

function lookForProject(project) {
    // Set up the PageMod to look for keywords
    pm = pageMod.PageMod({
        include: "*",
        contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
            self.data.url("underscore-min.js"),
            self.data.url("analyze.js")],
            onAttach: function(worker) {
                worker.port.emit("getImages", project.keywords);
                worker.port.on("keywordFound", function(images){
                    var panel = require("sdk/panel").Panel({
                        width: 400,
                        height: 400,
                        contentURL: self.data.url("index.html"),
                        contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
                            self.data.url("post-link.js")],
                    });
                    project.images = images;
                    panel.postMessage(project);
                    panel.show();
                });
            }
    });
}

projectsPanel.port.on("project-selected", function(project){
    if (typeof(pm) != "undefined") {
        pm.destroy();
    }
    lookForProject(project);
    projectsPanel.hide();
    ss.storage.project = project;
});


// Import widget
require("sdk/widget").Widget({
    id: "mozilla-icon",
    label: "PyBossa Widget",
    contentURL: "http://www.mozilla.org/favicon.ico",
    panel: projectsPanel,
});


// Now check if this is the first time running the addon
if (!ss.storage.project) {
    tabs.open({
        url: welcomePage
    });


    tabs.activeTab.on('load', function(tab) {
        var worker = tabs.activeTab.attach({
            contentScriptFile: [self.data.url("jquery-1.10.2.min.js"),
                                self.data.url("projects.js")],
        });

        worker.port.emit("show", {'slug': 'None', 'keywords': 'None'});
        worker.port.on("project-selected", function(project) {
            if (typeof(pm) != "undefined") {
                pm.destroy();
            }
            lookForProject(project);
            // Save user preferences
            ss.storage.project = project;
        });

    });
}
else {
    lookForProject(ss.storage.project);
}

