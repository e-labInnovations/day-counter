chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.event == "setIcon") {
        chrome.action.setIcon({path: msg.iconPath});
    } else {
        // to send back your response  to the current tab
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, msg);
        // });
        chrome.tabs.sendMessage(sender.tab.id, msg);
    }
})