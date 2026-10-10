/* Le Clos — barre de réservation sur téléphone (moins de 880 px de large).
   Apparaît après le premier écran, se retire à l'approche du formulaire.
   Langue déduite de <html lang="...">. Aucun nouveau traceur : réutilise
   l'événement Google existant « whatsapp_click » quand la balise est présente. */
(function () {
  var en = (document.documentElement.lang || 'fr').toLowerCase().indexOf('en') === 0;
  var surAccueil = location.pathname === '/' || location.pathname === '/index.html';
  var cible = surAccueil ? '#reserver' : '/#reserver';
  var texte = en
    ? { reserver: 'Book a consultation', wa: 'WhatsApp', message: 'Hello, I would like to book a consultation at Le Clos.' }
    : { reserver: 'Réserver un entretien', wa: 'WhatsApp', message: 'Bonjour, je souhaiterais réserver un entretien au Clos.' };

  var css = ''
    + '.lc-barre{position:fixed;left:0;right:0;bottom:0;z-index:150;display:none;gap:10px;'
    + 'padding:12px 16px calc(12px + env(safe-area-inset-bottom));'
    + 'background:rgba(10,10,10,0.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);'
    + 'border-top:1px solid rgba(201,169,97,0.28);transform:translateY(110%);transition:transform .45s ease}'
    + '.lc-barre.lc-visible{transform:none}'
    + '.lc-barre a{display:flex;align-items:center;justify-content:center;min-height:46px;border-radius:2px;'
    + 'font-family:Cinzel,serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;text-align:center;line-height:1.3}'
    + '.lc-barre .lc-principal{flex:1 1 auto;color:#0A0A0A;background:linear-gradient(135deg,#E0C988,#C9A961)}'
    + '.lc-barre .lc-secondaire{flex:0 0 auto;padding:0 18px;color:#C9A961;border:1px solid rgba(201,169,97,0.5)}'
    + '@media (max-width:880px){.lc-barre{display:flex}body.lc-avec-barre{padding-bottom:76px}}'
    + '@media (prefers-reduced-motion:reduce){.lc-barre{transition:none}}';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var barre = document.createElement('div');
    barre.className = 'lc-barre';
    barre.setAttribute('role', 'region');
    barre.setAttribute('aria-label', en ? 'Booking' : 'Réservation');

    var principal = document.createElement('a');
    principal.className = 'lc-principal';
    principal.href = cible;
    principal.textContent = texte.reserver;

    var wa = document.createElement('a');
    wa.className = 'lc-secondaire';
    wa.href = 'https://wa.me/33766272839?text=' + encodeURIComponent(texte.message);
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.textContent = texte.wa;
    wa.addEventListener('click', function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', { emplacement: 'barre_mobile' });
      }
    });

    barre.appendChild(principal);
    barre.appendChild(wa);
    document.body.appendChild(barre);
    document.body.classList.add('lc-avec-barre');

    var formulaire = document.getElementById('reserver');

    function maj() {
      var formulaireVisible = false;
      if (formulaire) {
        var r = formulaire.getBoundingClientRect();
        formulaireVisible = r.top < window.innerHeight && r.bottom > 0;
      }
      var visible = window.scrollY > window.innerHeight * 0.6 && !formulaireVisible;
      barre.classList.toggle('lc-visible', visible);
      barre.setAttribute('aria-hidden', visible ? 'false' : 'true');
      principal.tabIndex = visible ? 0 : -1;
      wa.tabIndex = visible ? 0 : -1;
    }
    window.addEventListener('scroll', maj, { passive: true });
    window.addEventListener('resize', maj);
    maj();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
