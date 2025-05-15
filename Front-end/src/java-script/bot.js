  window.watsonAssistantChatOptions = {
    integrationID: "a84a410d-c125-4833-8abb-c7a849b25f6f", // The ID of this integration.
    region: "au-syd", // The region your integration is hosted in.
    serviceInstanceID: "ff4d6cf2-d614-4423-9361-0356dac78784", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });