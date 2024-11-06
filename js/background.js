chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveCredentials") {
      chrome.storage.sync.set({
          canvasUrl: message.canvasUrl,
          accessToken: message.accessToken
      }, () => {
          console.log("Credentials saved:", message.canvasUrl, message.accessToken);
          chrome.storage.sync.get(null, (data) => {
            console.log("All stored data after saving:", data);
          });
          sendResponse({ status: "success" });
      });
      return true; 
  }
});