const init = ()=>{
    chrome.runtime.onInstalled.addListener(function() {
    // Initialize local storage with default values
    chrome.storage.local.set({myData: [{quote:'Sample Quotes Text' , author:'Shrey Raj'}]}, function() {
      console.log('Local storage initialized');
    });
  });
}
  
  chrome.action.onClicked.addListener(init);

// chrome.action.onStartup.addListener(init);