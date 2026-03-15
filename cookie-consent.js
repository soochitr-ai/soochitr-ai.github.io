/**
 * cookie-consent.js
 * Shared cookie consent banner for all pages.
 * Usage (root pages):    <script src="cookie-consent.js"></script>
 * Usage (subfolders):    <script src="../cookie-consent.js"></script>
 *
 * Uses official Google Consent Mode API (gtag) + dataLayer.push for GTM trigger.
 * Requires this block BEFORE the GTM snippet on every page:
 *
 *   <script>
 *     window.dataLayer = window.dataLayer || [];
 *     function gtag(){dataLayer.push(arguments);}
 *     gtag('consent', 'default', {
 *       'analytics_storage': 'denied',
 *       'ad_storage': 'denied',
 *       'ad_user_data': 'denied',
 *       'ad_personalization': 'denied'
 *     });
 *   </script>
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
    function gtag(){dataLayer.push(arguments);}

    const savedConsent = localStorage.getItem('cookieConsent');

    if (savedConsent === 'granted') {
      gtag('consent', 'update', { 'analytics_storage': 'granted', 'ad_storage': 'granted' });
      dataLayer.push({ 'event': 'consent_update' });
    } else if (savedConsent === 'denied') {
      gtag('consent', 'update', { 'analytics_storage': 'denied', 'ad_storage': 'denied' });
    } else {
      consentDiv.style.display = 'block';
    }

    acceptBtn.addEventListener('click', function () {
      consentDiv.style.display = 'none';
      localStorage.setItem('cookieConsent', 'granted');
      gtag('consent', 'update', { 'analytics_storage': 'granted', 'ad_storage': 'granted' });
      dataLayer.push({ 'event': 'consent_update' });
    });

    declineBtn.addEventListener('click', function () {
      consentDiv.style.display = 'none';
      localStorage.setItem('cookieConsent', 'denied');
      gtag('consent', 'update', { 'analytics_storage': 'denied', 'ad_storage': 'denied' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();