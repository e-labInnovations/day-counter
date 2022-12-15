// Saves options to storageArea.get.
const textColorInput = document.getElementById("textColor");
const startDateInput = document.getElementById("startDate");
const daysDiv = document.getElementById("days");
const statusDiv = document.getElementById("status");

const save_options = () => {
  //save value
  chrome.storage.sync.set({'start-date' : startDateInput.value});//YYYY-MM-DD
  chrome.storage.sync.set({'text-color' : textColorInput.value});//#xxxxxx

  daysDiv.innerText = getDays(startDateInput.value)
  // Update status to let user know options were saved.
  statusDiv.style.display = 'block';
  statusDiv.innerHTML = "Options Saved.";
  setTimeout(function() {
      statusDiv.style.display = 'none';
  }, 750);
  
  //refresh icon
  chrome.runtime.sendMessage({event: "refresh"})
}

// Restores select box state to saved value from storageArea.get.
const restore_options = () => {
  chrome.storage.sync.get(['text-color', 'start-date'], result => {
    var startDate = result['start-date'];
    var textColor = result['text-color'];

    if (startDate){
      startDateInput.value = startDate.replaceAll('/', '-')
      daysDiv.innerText = getDays(startDate)
    } else {
      startDateInput.valueAsDate = new Date();
    }

    textColorInput.value = textColor?textColor:"#ffffff"
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

const getDays = (startDate) => {
  var splitter = (startDate.indexOf("/") == -1) ? "-" : "/";
  var parts = startDate.split(splitter);
  if(parts.length != 3) {
    return;
  }
  
  //calculate elapsed days
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(parts[0],parts[1]-1,parts[2]);
  var secondDate = new Date();
  var diffDays = Math.floor((secondDate.getTime() - firstDate.getTime())/(oneDay));
  return diffDays
}