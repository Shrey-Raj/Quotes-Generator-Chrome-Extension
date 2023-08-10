const getQuote = async () => {
    const api = "https://type.fit/api/quotes";
    const data = await fetch(api);
    const allQuotes = await data.json();
  
    var rnum = Math.floor(Math.random() * allQuotes.length);
    var quote = `${allQuotes[rnum].text}`;
    var author = allQuotes[rnum].author.split(',')[0];
  
    var quoteInfo = { quote: quote, author: author };
  
    return quoteInfo;
  };
  
  const updateData = () => {
    chrome.storage.local.get(["myData"], async function (result) {
      var myData = result.myData || [];
  
      const quoteInfo = await getQuote();
  
      myData.push(quoteInfo);
  
      chrome.storage.local.set({ myData: myData }, function (result) {
        console.log("Data has been updated successfully");
      });
    });
  };
  
  const displayData = () => {
    chrome.storage.local.get(["myData"], function (result) {
      var dataList = document.getElementById("data-list");
  
      if(result.myData && result.myData.length < 10){
        result.myData.forEach(function (item) {
        var listItem = document.createElement("li");
        listItem.innerHTML = item.quote + " - " + item.author;
        dataList.appendChild(listItem);
      });
    }
    });
  };

  const clearData = () => {
    chrome.storage.local.clear(function () {
      console.log("Data has been cleared from local storage");
      del.style.padding = "4px 8px";
      del.style.fontSize = "12px";
    });
  };
  
  document.getElementById("del").addEventListener("click", clearData);
  
  
  
  updateData();
  displayData();
  