// Saves options to storageArea.get.
const textColorInput = document.getElementById("textColor");
const startDateInput = document.getElementById("startDate");

const save_options = () => {
    //save value
    chrome.storage.sync.set({'start-date' : startDateInput.value});//YYYY-MM-DD
    chrome.storage.sync.set({'text-color' : textColorInput.value});//#xxxxxx

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
    
    //refresh icon
    chrome.runtime.sendMessage({event: "refresh"});
}

// Restores select box state to saved value from storageArea.get.
const restore_options = () => {
    chrome.storage.sync.get(['text-color', 'start-date'], result => {
        var startDate = result['start-date'];
        var textColor = result['text-color'];

        if (startDate){
          startDateInput.value = startDate.replaceAll('/', '-')
        } else {
          startDateInput.valueAsDate = new Date();
        }

        textColorInput.value = textColor?textColor:"#ffffff"
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);