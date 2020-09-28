chrome.browserAction.onClicked.addListener(sendRequest);

function sendRequest(tab){
    const m = "execute";
    chrome.tabs.sendMessage(tab.id, m)
}
