chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // Check if this is the first installation
    chrome.storage.local.get(['installed'], (result) => {
      if (!result.installed) {
        // Set a flag to indicate the extension has been installed
        chrome.storage.local.set({ installed: true }, () => {
          console.log("Installation flag set.");
        });

        // Open the congratulations page
        chrome.tabs.create({ url: "congratulations.html" });
        
        // Optionally, show a notification (if needed)
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon128.png",
          title: "Calculator Extension Installed",
          message: "Thank you for installing the Calculator Extension! Don't forget to pin it to your toolbar."
        });
      }
    });
  }
});