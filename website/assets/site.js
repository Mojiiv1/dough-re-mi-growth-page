(()=>{
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
  const validTheme=value=>value==='dark'?'dark':'light';
  let preference=validTheme(document.documentElement.dataset.theme);
  const themeTrigger=$('[data-theme-trigger]');
  const themePanel=$('[data-theme-panel]');
  const menuButton=$('[data-menu-toggle]');
  const nav=$('[data-nav]');

  function applyTheme(value,persist=false){
    preference=validTheme(value);
    document.documentElement.dataset.theme=preference;
    $('meta[name="theme-color"]').content=preference==='dark'?'#101713':'#f7f2ea';
    if(persist){try{localStorage.setItem('dough-theme',preference)}catch{}}
    $$('[data-theme-option]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeOption===preference)));
    themeTrigger.setAttribute('aria-label',`Theme: ${preference}. Change appearance`);
    $('[data-theme-trigger-text]').textContent=preference==='light'?'Light':'Dark';
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
