const daysElement = document.getElementById('days')
const addictionImgDiv = document.getElementById('addictionImg')

chrome.storage.sync.get(['text-color', 'start-date', 'addiction'], result => {
    if (result['start-date'] && result['text-color']) {
        var startDate = result['start-date'];
        var splitter = (startDate.indexOf("/") == -1) ? "-" : "/";
        var parts = startDate.split(splitter);
        //calculate elapsed days
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(parts[0],parts[1]-1,parts[2]);
        var secondDate = new Date();
        var diffDays = Math.floor((secondDate.getTime() - firstDate.getTime())/(oneDay));
        var daySize = (Math.abs(diffDays) < 10) ? 14 : (Math.abs(diffDays) < 100) ? 12 : (Math.abs(diffDays) < 1000) ? 10 : (Math.abs(diffDays) < 10000) ? 8 : 7;
        daysElement.innerText = diffDays
        addictionImgDiv.innerHTML = result['addiction']?`<img src="${getAddictionImg(diffDays)}" class="img-responsive">`:''
    } else {
        daysElement.innerText = '0'
    }
});

document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

const getAddictionImg = (days) => {
  let level = days>=365?8:days>=120?7:days>=60?6:days>=30?5:days>=15?4:days>=7?3:days>=3?2:days>=1?1:0
  return './assets/img/Level' + level + '.png'
}