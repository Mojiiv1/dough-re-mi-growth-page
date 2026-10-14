(()=>{
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
  const validTheme=value=>value==='dark'?'dark':'light';
  let preference=validTheme(document.documentElement.dataset.theme);
  const themeTrigger=$('[data-theme-trigger]');
  const themePanel=$('[data-theme-panel]');
  const menuButton=$('[data-menu-toggle]');
  const nav=$('[data-nav]');
  const langToggle=$('[data-lang-toggle]');
  const originalText=new WeakMap();
  const translations={
    'Skip to main content':'Aller au contenu principal','Home':'Accueil','Our Story':'Notre histoire','Visit':'Nous visiter','Directions':'Itinéraire',
    'Light':'Clair','Dark':'Sombre','Appearance':'Apparence','Menu':'Menu','Instagram':'Instagram','Get Directions':'Obtenir l’itinéraire',
    'Bakery & Café in Ottawa':'Boulangerie-café à Ottawa','Coffee, pastries and a moment to yourself.':'Café, pâtisseries et un moment pour vous.',
    'Find us on Montréal Road in Ottawa.':'Retrouvez-nous sur le chemin Montréal à Ottawa.','Explore Our Menu':'Découvrir le menu',
    'Read Google reviews':'Lire les avis Google','Visit us in Ottawa':'Nous visiter à Ottawa','Get directions':'Obtenir l’itinéraire','Open in Google Maps':'Ouvrir dans Google Maps',
    'Call the café':'Appeler le café','From our bakery':'De notre boulangerie','Something good for every coffee break.':'Une douceur pour chaque pause-café.',
    'Browse the bakery and café.':'Découvrez la boulangerie et le café.','View Menu':'Voir le menu','Pastries & Desserts':'Pâtisseries et desserts',
    'Something sweet to enjoy with your coffee.':'Une douceur à savourer avec votre café.','Specialty Coffee':'Cafés de spécialité','Specialty coffee to enjoy at the café.':'Des cafés de spécialité à savourer sur place.',
    'Café Experience':'L’expérience café','A welcoming space on Montréal Road.':'Un espace accueillant sur le chemin Montréal.',
    'On Montréal Road':'Sur le chemin Montréal','Coffee break? Stay a little.':'Une pause-café? Restez un peu.','Our Story':'Notre histoire',
    'A look around':'Un coup d’œil','A taste of the café.':'Un aperçu du café.','Google reviews':'Avis Google','A few words from our guests.':'Quelques mots de nos visiteurs.',
    'From visitors who shared their experience on Google.':'De visiteurs ayant partagé leur expérience sur Google.','Visit us':'Nous visiter','Come say hello.':'Venez nous dire bonjour.',
    'Address':'Adresse','Hours':'Heures','Check Google for current hours before your visit.':'Consultez Google pour les heures actuelles avant votre visite.',
    'Visit Details':'Détails de la visite','Your coffee break on Montréal Road, Ottawa.':'Votre pause-café sur le chemin Montréal à Ottawa.',
    'Website concept by Tap & Grow Ottawa':'Concept de site par Tap & Grow Ottawa','Our Menu':'Notre menu','Take a look at the bakery and café before your visit.':'Découvrez la boulangerie et le café avant votre visite.',
    'Demo menu · Menu fictif':'Menu fictif · Demo menu','Sample items and prices only':'Articles et prix fictifs seulement',
    'Nothing on this page is an official product, price or availability claim. Ask in café for today’s selection. The owner-verified menu is pending.':'Aucun article, prix ni disponibilité sur cette page n’est officiel. Demandez la sélection du jour au café. Le menu vérifié par le propriétaire est à venir.',
    'All':'Tout','Coffee & Drinks':'Cafés et boissons','Baked Goods':'Produits de boulangerie','Filter menu categories':'Filtrer les catégories du menu',
    'A café made for good moments.':'Un café pour les bons moments.','A welcoming bakery and café experience on Montréal Road in Ottawa.':'Une boulangerie-café accueillante sur le chemin Montréal à Ottawa.',
    'A coffee break on Montréal Road.':'Une pause-café sur le chemin Montréal.','A little more about us':'Un peu plus sur nous','Plan Your Visit':'Planifier votre visite',
    'Location':'Adresse','Current hours':'Heures actuelles','Copy Address':'Copier l’adresse','Share This Place':'Partager cet endroit','Contact':'Contact','Call or follow':'Appelez-nous ou suivez-nous',
    'Follow the café for current posts and updates.':'Suivez le café pour les publications et nouvelles.','Quick actions':'Actions rapides','Main navigation':'Navigation principale','Footer navigation':'Navigation de pied de page'
  };
  let language=(()=>{try{return localStorage.getItem('dough-language')==='fr'?'fr':'en'}catch{return'en'}})();

  function renderMenu(){
    const root=$('[data-menu-root]');
    if(!root||!window.DOUGH_MENU)return;
    const requested=new URL(location.href).searchParams.get('category');
    root.innerHTML=window.DOUGH_MENU.map((category,index)=>`<section class="menu-cat" data-category="${category.id}"${requested&&requested!=='all'&&requested!==category.id?' hidden':''}><div class="menu-head"><p class="eyebrow">${language==='fr'?'Catégorie':'Category'} ${String(index+1).padStart(2,'0')}</p><h2>${category.name[language]}</h2><p>${category.note[language]}</p></div><div class="demo-menu-list">${category.items.map(item=>`<article class="demo-menu-item"><div><h3>${item.name[language]}</h3><p>${item.description[language]}</p></div><strong aria-label="${language==='fr'?'Prix fictif':'Sample price'} ${item.price}">${item.price}<small>${language==='fr'?' fictif':' sample'}</small></strong></article>`).join('')}</div></section>`).join('');
  }
  function translatePage(){
    document.documentElement.lang=language;
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while(node=walker.nextNode()){
      if(node.parentElement?.closest('script,style,[translate="no"],[data-menu-root]'))continue;
      const clean=node.textContent.trim();
      if(!clean)continue;
      if(!originalText.has(node))originalText.set(node,clean);
      const source=originalText.get(node);
      node.textContent=node.textContent.replace(clean,language==='fr'?(translations[source]||source):source);
    }
    $$('[aria-label]').forEach(el=>{if(!el.dataset.enLabel)el.dataset.enLabel=el.getAttribute('aria-label');const source=el.dataset.enLabel;el.setAttribute('aria-label',language==='fr'?(translations[source]||source):source)});
    langToggle.textContent=language==='fr'?'EN':'FR';
    langToggle.setAttribute('aria-label',language==='fr'?'Switch to English':'Passer au français');
    try{localStorage.setItem('dough-language',language)}catch{}
  }
  renderMenu();
  translatePage();
  langToggle.addEventListener('click',()=>{language=language==='en'?'fr':'en';renderMenu();translatePage();applyTheme(preference)});

  function applyTheme(value,persist=false){
    preference=validTheme(value);
    document.documentElement.dataset.theme=preference;
    $('meta[name="theme-color"]').content=preference==='dark'?'#1b211c':'#f7f2ea';
    if(persist){try{localStorage.setItem('dough-theme',preference)}catch{}}
    $$('[data-theme-option]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeOption===preference)));
    themeTrigger.setAttribute('aria-label',language==='fr'?`Thème : ${preference==='light'?'clair':'sombre'}. Changer l’apparence`:`Theme: ${preference}. Change appearance`);
    $('[data-theme-trigger-text]').textContent=language==='fr'?(preference==='light'?'Clair':'Sombre'):(preference==='light'?'Light':'Dark');
    $('[data-theme-trigger-icon]').textContent=preference==='light'?'☀':'☾';
  }
  function closeTheme(restore=false){
    themePanel.hidden=true;
    themeTrigger.setAttribute('aria-expanded','false');
    if(restore) themeTrigger.focus();
  }
  function closeMenu(restore=false){
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open navigation');
    if(restore) menuButton.focus();
  }
  applyTheme(preference);
  window.addEventListener('storage',event=>{if(event.key==='dough-theme'||event.key===null)applyTheme(event.newValue,event.newValue!==null&&event.newValue!==validTheme(event.newValue))});
  themeTrigger.addEventListener('click',()=>{
    if(!themePanel.hidden){closeTheme(true);return}
    closeMenu();
    themePanel.hidden=false;
    themeTrigger.setAttribute('aria-expanded','true');
    $('[aria-pressed="true"]',themePanel).focus();
  });
  $$('[data-theme-option]').forEach(button=>button.addEventListener('click',()=>{applyTheme(button.dataset.themeOption,true);closeTheme(true)}));
  menuButton.addEventListener('click',()=>{
    if(nav.classList.contains('open')){closeMenu(true);return}
    closeTheme();
    nav.classList.add('open');
    menuButton.setAttribute('aria-expanded','true');
    menuButton.setAttribute('aria-label','Close navigation');
    $('a',nav).focus();
  });
  $$('a',nav).forEach(link=>link.addEventListener('click',()=>closeMenu()));
  document.addEventListener('click',event=>{
    if(!event.target.closest('[data-theme-control]'))closeTheme(themePanel.contains(document.activeElement));
    if(!nav.contains(event.target)&&!menuButton.contains(event.target))closeMenu(nav.contains(document.activeElement));
  });
  document.addEventListener('focusin',event=>{
    if(!event.target.closest('[data-theme-control]'))closeTheme();
    if(!nav.contains(event.target)&&!menuButton.contains(event.target))closeMenu();
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    if(!themePanel.hidden){event.preventDefault();closeTheme(true)}
    if(nav.classList.contains('open')){event.preventDefault();closeMenu(true)}
  });
  matchMedia('(min-width: 1024px)').addEventListener('change',()=>closeMenu());

  const dialog=$('[data-lightbox]');
  const photos=$$('[data-photo]');
  if(dialog&&photos.length){
    let index=0,opener=null,touch=null;
    const render=()=>{
      const source=$('img',photos[index]);
      const image=$('img',dialog);
      image.src=source.currentSrc||source.src;
      image.alt=source.alt;
      image.width=source.width;
      image.height=source.height;
      $('[data-caption]',dialog).textContent=source.alt;
      $('[data-count]',dialog).textContent=`Photo ${index+1} of ${photos.length}`;
    };
    const move=delta=>{index=(index+delta+photos.length)%photos.length;render()};
    photos.forEach((button,i)=>{
      button.setAttribute('aria-label',`Enlarge photo: ${$('img',button).alt}`);
      button.addEventListener('click',()=>{index=i;opener=button;render();dialog.showModal();$('[data-close]',dialog).focus()});
    });
    $('[data-close]',dialog).addEventListener('click',()=>dialog.close());
    $('[data-prev]',dialog).addEventListener('click',()=>move(-1));
    $('[data-next]',dialog).addEventListener('click',()=>move(1));
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
    dialog.addEventListener('keydown',event=>{
      if(event.key==='Tab'){
        const controls=$$('button:not(:disabled)',dialog);
        const first=controls[0],last=controls[controls.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
      }
      if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}
      if(event.key==='ArrowRight'){event.preventDefault();move(1)}
    });
    dialog.addEventListener('touchstart',event=>{const t=event.changedTouches[0];touch={x:t.clientX,y:t.clientY}},{passive:true});
    dialog.addEventListener('touchend',event=>{
      if(!touch)return;
      const t=event.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y;
      if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy))move(dx>0?-1:1);
      touch=null;
    },{passive:true});
    dialog.addEventListener('touchcancel',()=>{touch=null},{passive:true});
    dialog.addEventListener('close',()=>opener?.focus());
  }

  const filters=$$('[data-filter]');
  if(filters.length){
    const applyFilter=value=>{
      const filter=filters.some(b=>b.dataset.filter===value)?value:'all';
      filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===filter)));
      $$('[data-category]').forEach(section=>{section.hidden=filter!=='all'&&section.dataset.category!==filter});
      $('[data-filter-status]').textContent=filter==='all'?'Showing all menu categories':`Showing ${filters.find(b=>b.dataset.filter===filter).textContent}`;
    };
    filters.forEach(button=>button.addEventListener('click',()=>{
      const url=new URL(location.href);
      if(button.dataset.filter==='all')url.searchParams.delete('category');else url.searchParams.set('category',button.dataset.filter);
      history.pushState(null,'',url);
      applyFilter(button.dataset.filter);
    }));
    window.addEventListener('popstate',()=>applyFilter(new URL(location.href).searchParams.get('category')));
    applyFilter(new URL(location.href).searchParams.get('category'));
  }
  let toastTimer;
  function announce(message){
    const toast=$('[data-toast]');
    toast.textContent=message;toast.classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),4000);
  }
  $$('[data-copy],[data-share]').forEach(button=>button.addEventListener('click',async()=>{
    button.disabled=true;button.setAttribute('aria-busy','true');
    try{
      if(button.hasAttribute('data-copy')){await navigator.clipboard.writeText(button.dataset.copy);announce('Address copied')}
      else if(navigator.share)await navigator.share({title:'Dough Re Mi Bakery & Cafe',url:location.href});
      else {await navigator.clipboard.writeText(location.href);announce('Page link copied')}
    }catch(error){
      if(error.name!=='AbortError')announce(button.hasAttribute('data-copy')?'Select the address text to copy it.':'Copy the page address from your browser to share.');
    }finally{button.disabled=false;button.removeAttribute('aria-busy')}
  }));
})();
