/* Le Clos — barre de réservation sur téléphone (moins de 880 px de large)
   et parcours de réservation en anglais.

   1. Barre mobile : apparaît après le premier écran, se retire à l'approche
      du formulaire. Langue déduite de <html lang="...">.
   2. Pages anglaises : formulaire de réservation en anglais ajouté sur
      /personal-trainer-cannes (ancre #book). Tous les liens « /#reserver »
      des pages anglaises y mènent, au lieu du formulaire français.
   3. Suivi Google Ads :
      - « Clic WhatsApp » (action secondaire) : au clic sur un lien ou bouton
        WhatsApp du site, une fois par page ;
      - « Demande rendez-vous » : à l'envoi réussi du formulaire anglais
        (même action que le formulaire français). */
(function () {
  var en = (document.documentElement.lang || 'fr').toLowerCase().indexOf('en') === 0;
  var chemin = location.pathname.replace(/\/+$/, '') || '/';
  var surAccueil = chemin === '/' || chemin === '/index.html';
  var pageAnglaise = '/personal-trainer-cannes';
  var surPageAnglaise = chemin === pageAnglaise || chemin === pageAnglaise + '.html';

  var cible;
  if (en) {
    cible = surPageAnglaise ? '#book' : pageAnglaise + '#book';
  } else {
    cible = surAccueil ? '#reserver' : '/#reserver';
  }

  var texte = en
    ? { reserver: 'Book a consultation', wa: 'WhatsApp', message: 'Hello, I would like to book a consultation at Le Clos.' }
    : { reserver: 'Réserver un entretien', wa: 'WhatsApp', message: 'Bonjour, je souhaiterais réserver un entretien au Clos.' };

  var ADS_WHATSAPP = 'AW-18166505622/M9hTCNS4opodEJbBu9ZD';
  var ADS_FORMULAIRE = 'AW-18166505622/7JSVCN2ctdUcEJbBu9ZD';
  var FORMSPREE = 'https://formspree.io/f/xeedzwbp';

  /* Conversion Google Ads « Clic WhatsApp » */
  var waEnvoye = false;
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest
      ? e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"], #btnWA')
      : null;
    if (!el || waEnvoye || typeof window.gtag !== 'function') return;
    waEnvoye = true;
    window.gtag('event', 'conversion', { send_to: ADS_WHATSAPP });
  }, true);

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

  /* Formulaire anglais (page /personal-trainer-cannes uniquement) */
  var cssFormulaire = ''
    + '.lc-book{max-width:720px;margin:56px auto 0;text-align:left}'
    + '.lc-book .lc-champ{margin-bottom:26px}'
    + '.lc-book label{display:block;font-family:Cinzel,serif;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#C9A961;margin-bottom:8px}'
    + '.lc-book label .lc-option{font-family:"Cormorant Garamond",serif;text-transform:none;letter-spacing:normal;font-style:italic;font-size:15px;color:#C9C5BC;margin-left:6px}'
    + '.lc-book input,.lc-book select,.lc-book textarea{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(201,169,97,0.45);'
    + 'color:#F4F1EA;font-family:"Cormorant Garamond",serif;font-size:20px;padding:6px 0 8px;border-radius:0;outline:none}'
    + '.lc-book input:focus,.lc-book select:focus,.lc-book textarea:focus{border-bottom-color:#E0C988}'
    + '.lc-book select{appearance:none;-webkit-appearance:none;cursor:pointer;'
    + 'background-image:url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 6%22><path d=%22M0 0l5 6 5-6z%22 fill=%22%23C9A961%22/></svg>");'
    + 'background-repeat:no-repeat;background-position:right 2px center;background-size:10px 6px;padding-right:22px}'
    + '.lc-book select option{background:#121212;color:#F4F1EA}'
    + '.lc-book textarea{min-height:96px;resize:vertical}'
    + '.lc-book ::placeholder{color:rgba(201,197,188,0.55)}'
    + '.lc-book .lc-ligne{display:grid;grid-template-columns:1fr 1fr;gap:28px}'
    + '.lc-book .lc-tel{display:flex;gap:12px}'
    + '.lc-book .lc-tel select{flex:0 0 150px}'
    + '.lc-book .lc-envoyer{text-align:center;margin-top:10px}'
    + '.lc-book .lc-note{font-size:16px;color:#C9C5BC;text-align:center;margin-top:18px;font-style:italic}'
    + '.lc-book .lc-merci{display:none;text-align:center;font-size:22px;color:#F4F1EA;padding:30px 0}'
    + '.lc-book .lc-erreur{display:none;text-align:center;color:#E0C988;font-size:18px;margin-top:14px}'
    + '@media (max-width:640px){.lc-book .lc-ligne{grid-template-columns:1fr;gap:0}.lc-book .lc-tel select{flex-basis:120px}}';

  var htmlFormulaire = ''
    + '<div class="lc-book" id="book">'
    + '<form id="lcBookForm" novalidate>'
    + '<div class="lc-ligne">'
    + '<div class="lc-champ"><label for="lcNom">Name</label><input type="text" id="lcNom" name="nom" autocomplete="name" required></div>'
    + '<div class="lc-champ"><label for="lcEmail">Email</label><input type="email" id="lcEmail" name="email" autocomplete="email" required></div>'
    + '</div>'
    + '<div class="lc-champ"><label for="lcTel">Phone <span class="lc-option">with country code</span></label>'
    + '<input type="tel" id="lcTel" name="telephone" autocomplete="tel" placeholder="e.g. +44 7700 900000" required></div>'
    + '<div class="lc-ligne">'
    + '<div class="lc-champ"><label for="lcObjet">Your request</label><select id="lcObjet" name="objet">'
    + '<option value="" selected>Select</option>'
    + '<option value="Consultation at Le Clos (complimentary)">Consultation at the studio, complimentary</option>'
    + '<option value="Solo or duo coaching">Solo or duo coaching</option>'
    + '<option value="Body composition analysis (89 EUR)">Body composition analysis, €89</option>'
    + '<option value="Home, villa or yacht">Session at your home, villa or yacht</option>'
    + '<option value="Other request">Other request</option></select></div>'
    + '<div class="lc-champ"><label for="lcLieu">Where would you train?</label><select id="lcLieu" name="lieu">'
    + '<option value="" selected>Select</option>'
    + '<option value="Studio (27 rue Jean Jaures)">At the studio, central Cannes</option>'
    + '<option value="Home">At my home</option><option value="Hotel">At my hotel</option>'
    + '<option value="Villa">At a villa</option><option value="Yacht">On a yacht</option>'
    + '<option value="Not sure yet">Not sure yet</option></select></div>'
    + '</div>'
    + '<div class="lc-champ"><label for="lcSejour">Your dates in Cannes <span class="lc-option">if you are visiting</span></label>'
    + '<input type="text" id="lcSejour" name="sejour" placeholder="e.g. 14 to 20 October"></div>'
    + '<div class="lc-champ"><label for="lcDispo">Your availability <span class="lc-option">optional</span></label>'
    + '<textarea id="lcDispo" name="disponibilites" placeholder="e.g. weekdays after 6pm, or Saturday morning"></textarea></div>'
    + '<input type="hidden" name="langue" value="EN">'
    + '<input type="hidden" name="_subject" value="Le Clos — booking request (English page)">'
    + '<div class="lc-envoyer"><button type="submit" class="btn-or">Send my request</button></div>'
    + '<p class="lc-erreur" id="lcErreur" role="alert"></p>'
    + '<p class="lc-note">We reply personally the same day. Your details are used only to answer your request.</p>'
    + '</form>'
    + '<div class="lc-merci" id="lcMerci" role="status">Thank you. Your request has reached us, and we will reply the same day.</div>'
    + '</div>';

  function parametreUrl(nom) {
    try { return new URLSearchParams(location.search).get(nom) || ''; } catch (e) { return ''; }
  }

  /* Origine de la visite : mémorisée à l'arrivée sur le site (le temps de la
     session), pour ne pas la perdre si le visiteur change de page. */
  var CLE_ORIGINE = 'lcOrigine';
  function memoriserOrigine() {
    try {
      if (sessionStorage.getItem(CLE_ORIGINE)) return;
      var ref = '';
      try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) { ref = ''; }
      if (ref && ref.indexOf('leclos-cannes.fr') !== -1) ref = '';
      sessionStorage.setItem(CLE_ORIGINE, JSON.stringify({
        utm_source: parametreUrl('utm_source'),
        utm_medium: parametreUrl('utm_medium'),
        utm_campaign: parametreUrl('utm_campaign'),
        gclid: parametreUrl('gclid'),
        referrer: ref,
        page_arrivee: location.pathname
      }));
    } catch (e) { /* navigation privée : pas de mémorisation */ }
  }
  function lireOrigine() {
    var o = null;
    try { o = JSON.parse(sessionStorage.getItem(CLE_ORIGINE) || 'null'); } catch (e) { o = null; }
    if (!o) {
      o = { utm_source: parametreUrl('utm_source'), utm_medium: parametreUrl('utm_medium'),
            utm_campaign: parametreUrl('utm_campaign'), gclid: parametreUrl('gclid'), referrer: '', page_arrivee: '' };
    }
    var source = o.utm_source
      || (o.gclid ? 'google-ads' : '')
      || (o.referrer ? 'referral: ' + o.referrer : '')
      || 'direct ou inconnue';
    return {
      utm_source: source,
      utm_medium: o.utm_medium || (o.gclid ? 'cpc' : ''),
      utm_campaign: o.utm_campaign || '',
      gclid: o.gclid || '',
      page_arrivee: o.page_arrivee || ''
    };
  }

  function installerFormulaireAnglais() {
    if (!en || !surPageAnglaise || document.getElementById('book')) return;
    var hote = document.querySelector('section.cta-final .wrap') || document.querySelector('section.cta-final');
    if (!hote) return;

    var style = document.createElement('style');
    style.textContent = cssFormulaire;
    document.head.appendChild(style);

    var bloc = document.createElement('div');
    bloc.innerHTML = htmlFormulaire;
    hote.appendChild(bloc.firstChild);

    var form = document.getElementById('lcBookForm');
    var merci = document.getElementById('lcMerci');
    var erreur = document.getElementById('lcErreur');

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      erreur.style.display = 'none';
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      var origine = lireOrigine();
      data.append('page', location.pathname);
      data.append('page_arrivee', origine.page_arrivee);
      data.append('utm_source', origine.utm_source);
      data.append('utm_medium', origine.utm_medium);
      data.append('utm_campaign', origine.utm_campaign);
      if (origine.gclid) data.append('gclid', origine.gclid);

      var bouton = form.querySelector('button[type="submit"]');
      bouton.disabled = true;

      function succes() {
        form.style.display = 'none';
        merci.style.display = 'block';
        try { merci.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
        /* Mesure isolée : une erreur ici ne doit jamais faire échouer la demande */
        try {
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', { send_to: ADS_FORMULAIRE, value: 60, currency: 'EUR' });
          }
        } catch (e) {}
      }
      function echec() {
        bouton.disabled = false;
        erreur.textContent = 'Your request could not be sent. Please message us on WhatsApp or call +33 7 66 27 28 39.';
        erreur.style.display = 'block';
      }

      fetch(FORMSPREE, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function (r) { if (r && r.ok) { succes(); } else { echec(); } }, echec);
    });

    if (location.hash === '#book') {
      setTimeout(function () {
        var b = document.getElementById('book');
        if (b) b.scrollIntoView({ block: 'start' });
      }, 60);
    }
  }

  /* Pages anglaises : les liens vers le formulaire français mènent au formulaire anglais */
  function repointerLiensAnglais() {
    if (!en) return;
    /* Sur la page anglaise, on ne redirige que si le formulaire a bien été créé ;
       sinon les boutons gardent leur lien d'origine vers le formulaire français. */
    if (surPageAnglaise && !document.getElementById('book')) {
      cible = '/#reserver';
      return;
    }
    var liens = document.querySelectorAll('a[href="/#reserver"], a[href="https://www.leclos-cannes.fr/#reserver"], a[href="#reserver"]');
    for (var i = 0; i < liens.length; i++) {
      liens[i].setAttribute('href', cible);
    }
  }

  function init() {
    memoriserOrigine();
    try { installerFormulaireAnglais(); } catch (e) { /* la page reste utilisable sans le formulaire */ }
    repointerLiensAnglais();

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

    var formulaire = document.getElementById(en ? 'book' : 'reserver');

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
