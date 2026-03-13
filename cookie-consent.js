// ============================================================
// cookie-consent.js — shared across all pages
// Include this script in every HTML page AFTER the GTM snippet
// ============================================================

(function () {
  // Inject banner HTML into the page
  const bannerHTML = `
    <div id="cookie-consent" style="display:none;position:fixed;bottom:0;left:0;right:0;background:#333;color:#fff;padding:15px;text-align:center;z-index:9999;">
      This site uses cookies for analytics purposes.
      <button id="accept-cookies" style="margin-left:10px;padding:5px 10px;background:#4CAF50;border:none;color:#fff;cursor:pointer;">Accept</button>
      <button id="decline-cookies" style="margin-left:10px;padding:5px 10px;background:#f44336;border:none;color:#fff;cursor:pointer;">Decline</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', bannerHTML);

  const consentDiv = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  window.dataLayer = window.dataLayer || [];

  function updateConsent(status) {
    window.dataLayer.push({
      event: 'consent_update',
      ad_storage: status,
      analytics_storage: status
    });
  }

  // Check saved preference
  const savedConsent = localStorage.getItem('cookieConsent');
  if (savedConsent === 'granted') {
    updateConsent('granted');
  } else if (savedConsent === 'denied') {
    updateConsent('denied');
  } else {
    // No preference saved — show banner
    consentDiv.style.display = 'block';
  }

  acceptBtn.addEventListener('click', function () {
    consentDiv.style.display = 'none';
    localStorage.setItem('cookieConsent', 'granted');
    updateConsent('granted');
  });

  declineBtn.addEventListener('click', function () {
    consentDiv.style.display = 'none';
    localStorage.setItem('cookieConsent', 'denied');
    updateConsent('denied');
  });
})();