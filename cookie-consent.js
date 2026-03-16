/**
 * cookie-consent.js
 * Banner per consenso cookie compatibile con GTM e GA4.
 * Posizionare questo script DOPO il GTM snippet.
 */

(function () {
  function init() {
    // Inserisci il banner nel body
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

    const savedConsent = localStorage.getItem('cookieConsent');

    // Se già salvato, aggiorna il consenso subito
    if (savedConsent === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
      dataLayer.push({ event: 'consent_update' });
    } else if (savedConsent === 'denied') {
      gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' });
    } else {
      // Mostra il banner agli utenti nuovi
      consentDiv.style.display = 'block';
    }

    // Accetta cookies
    acceptBtn.addEventListener('click', function () {
      consentDiv.style.display = 'none';
      localStorage.setItem('cookieConsent', 'granted');
      gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
      dataLayer.push({ event: 'consent_update' });
    });

    // Rifiuta cookies
    declineBtn.addEventListener('click', function () {
      consentDiv.style.display = 'none';
      localStorage.setItem('cookieConsent', 'denied');
      gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();