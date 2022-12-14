//this runs once when chrome starts
/*
var startDate;
chrome.storage.sync.get(['text-color', 'start-date'], result => {
    if (!result['start-date']) {
        var d = new Date();
        var year = d.getFullYear();
        var month = (d.getMonth()<10) ? "0" + (d.getMonth()+1) : (d.getMonth()+1);
        var day = (d.getDate()<10) ? "0" + d.getDate() : d.getDate();
        var formattedDate = year + "/" + month + "/" + day;
        chrome.storage.sync.set({'start-date' : formattedDate});
    }
    
    if (!result['text-color']) {
        chrome.storage.sync.set({'text-color' : '#ffffff'});
    }
    chrome.extension.sendMessage({event: "refresh"});
});



//wait for receiving event from script.js
chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
    //Update Icon Function
    const updateIcon = (topline, tSize, bottomline, bSize, textColor) => {
        textColor = textColor?textColor:"#ffffff"
        var canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        var context = canvas.getContext('2d');
        context.fillStyle = textColor
        context.font= tSize + "px Arial";
        context.fillText(topline,0,10);
        context.font= bSize + "px Arial";
        context.fillText(bottomline,0,19);
        var imageData = context.getImageData(0, 0, 19, 19);
        chrome.browserAction.setIcon({ imageData: imageData });
    }
  
    // Refresh
    if (msg.event == "refresh") {
        chrome.storage.sync.get(['text-color', 'start-date'], result => {
            var startDate = result['start-date'];
            if (!startDate) {
                updateIcon("undefined", 7, "", 0, result['text-color']);
                return;
            }
            
            var re = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
            if(!re.test(startDate)) {
                updateIcon("format", 7, "error", 8, result['text-color']);
                return;
            }
            
            var splitter = (startDate.indexOf("/") == -1) ? "-" : "/";
            var parts = startDate.split(splitter);
            if(parts.length != 3) {
                updateIcon("format", 7, "error", 8, result['text-color']);
                return;
            }
            
            //calculate elapsed days
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(parts[0],parts[1]-1,parts[2]);
            var secondDate = new Date();
            var diffDays = Math.floor((secondDate.getTime() - firstDate.getTime())/(oneDay));
            var daySize = (Math.abs(diffDays) < 10) ? 14 : (Math.abs(diffDays) < 100) ? 12 : (Math.abs(diffDays) < 1000) ? 10 : (Math.abs(diffDays) < 10000) ? 8 : 7;
            updateIcon(diffDays, daySize, "days", 8, result['text-color']);
        });
	}
    sendResponse({});
});

*/

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.event == "setIcon") {
        chrome.action.setIcon({path: msg.iconPath});
    }
    if (msg.event == "refresh") {
        console.log("Refresh");
    }

    sendResponse({});
})
