import googleId from "./googleAnalyticsId";

function trackPageView(url) {
  try {
    window.gtag("config", googleId, { page_location: url });
  } catch (error) {}
}

export default trackPageView;
