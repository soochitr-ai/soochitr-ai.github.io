/**
 * cookie-consent.js
 * Banner per consenso cookie compatibile con GTM / GA4.
 * Posizionare questo script DOPO il GTM snippet (idealmente prima di </body>).
 */

(function () {
  function safeGtag() {
    if (typeof gtag === 'function') return gtag;
    return function(){ window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); };
  }
  var g = safeGtag();

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
        This site uses cookies to analyse traffic — the data helps me improve my portfolio projects and understand how visitors interact with the content.
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

    // Se già salvato, aggiorna il consenso subito (con tutti i flags)
    if (savedConsent === 'granted') {
      g('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'consent_update' });
    } else if (savedConsent === 'denied') {
      g('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'consent_update' });
    } else {
      // Mostra il banner agli utenti nuovi
      consentDiv.style.display = 'block';
    }

    // Accetta cookies (abilita tutti i segnali)
    acceptBtn.addEventListener('click', function () {
      consentDiv.style.display = 'none';
      localStorage.setItem('cookieConsent', 'granted');
      g('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'consent_update' });
    });

    // Rifiuta cookies (tutti denied, ma GA4 rimane configurata anonima pre-consenso)
    declineBtn.addEventListener('click', function () {
      consentDiv.style.display = 'none';
      localStorage.setItem('cookieConsent', 'denied');
      g('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'consent_update' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
