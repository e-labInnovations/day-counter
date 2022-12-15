
(() => {
    //wait for receiving event from script.js
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        sendResponse({});
    });
    chrome.runtime.sendMessage({event: "refresh"})
})()