/**
 * cookie-consent.js
 * Shared cookie consent banner for all pages.
 * Usage (root pages):    <script src="cookie-consent.js"></script>
 * Usage (subfolders):    <script src="../cookie-consent.js"></script>
 */

(function () {
  function init() {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="cookie-consent" style="
        display:none;
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        background:#333;
        color:#fff;
        padding:15px;
        text-align:center;
        z-index:9999;
        font-family:inherit;
        font-size:0.95rem;
      ">
        This site uses cookies for analytics purposes.
        <button id="accept-cookies" style="
          margin-left:10px;
          padding:5px 14px;
          background:#4CAF50;
          border:none;
          color:#fff;
          cursor:pointer;
          border-radius:3px;
        ">Accept</button>
        <button id="decline-cookies" style="
          margin-left:8px;
          padding:5px 14px;
          background:#f44336;
          border:none;
          color:#fff;
          cursor:pointer;
          border-radius:3px;
        ">Decline</button>
      </div>
    `);

    const consentDiv = document.getElementById('cookie-consent');
    const acceptBtn  = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    window.dataLayer = window.dataLayer || [];

    const savedConsent = localStorage.getItem('cookieConsent');

    if (savedConsent === 'granted') {
      dataLayer.push({ event: 'consent_update', ad_storage: 'granted', analytics_storage: 'granted' });
    } else if (savedConsent === 'denied') {
      dataLayer.push({ event: 'consent_update', ad_storage: 'denied', analytics_storage: 'denied' });
    } else {
      consentDiv.style.display = 'block';
    }

    acceptBtn.addEventListener('click', function () {
      consentDiv.style.display = 'none';
      localStorage.setItem('cookieConsent', 'granted');
      dataLayer.push({ event: 'consent_update', ad_storage: 'granted', analytics_storage: 'granted' });
    });

    declineBtn.addEventListener('click', function () {
      consentDiv.style.display = 'none';
      localStorage.setItem('cookieConsent', 'denied');
      dataLayer.push({ event: 'consent_update', ad_storage: 'denied', analytics_storage: 'denied' });
    });
  }

  // Run immediately if DOM is ready, otherwise wait for it
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();