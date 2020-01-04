function trackPageView(url) {
  try {
    window.gtag("config", "UA-155059509-2", { page_location: url });
  } catch (error) {}
}

export default trackPageView;
