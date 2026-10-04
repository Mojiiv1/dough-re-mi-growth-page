
(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const THEME_KEY="dough-theme";
  const themeMedia=window.matchMedia("(prefers-color-scheme: dark)");
  const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");

  const readTheme=()=>{
    try{return localStorage.getItem(THEME_KEY)||"system"}catch{return"system"}
  };

  const resolveTheme=(preference)=>{
    if(preference==="system") return themeMedia.matches?"dark":"light";
    return preference;
  };

  const applyTheme=(preference,persist=false)=>{
    const resolved=resolveTheme(preference);
    if(persist){try{localStorage.setItem(THEME_KEY,preference)}catch{}}
    document.documentElement.dataset.theme=resolved;
    document.documentElement.dataset.themePreference=preference;

    const meta=$('meta[name="theme-color"]');
    if(meta) meta.setAttribute("content",resolved==="dark"?"#111613":"#F7F2EA");

    $$("[data-theme-option]").forEach((button)=>{
      const selected=button.dataset.themeOption===preference;
      button.setAttribute("aria-pressed",String(selected));
    });

    const trigger=$("[data-theme-trigger]");
    const icon=$("[data-theme-trigger-icon]");
    if(icon) icon.textContent=preference==="light"?"☀":preference==="dark"?"☾":"◐";
    if(trigger){
      const suffix=preference==="system"?" ("+resolved+")":"";
      trigger.setAttribute("aria-label","Appearance: "+preference+suffix+". Change appearance");
      trigger.title="Appearance: "+preference+suffix;
    }
  };

  applyTheme(readTheme());

  themeMedia.addEventListener?.("change",()=>{
    if(readTheme()==="system") applyTheme("system");
  });

  const themeTrigger=$("[data-theme-trigger]");
  const themePanel=$("[data-theme-panel]");
  if(themeTrigger&&themePanel){
    const closeTheme=(restore=false)=>{
      themePanel.hidden=true;
      themeTrigger.setAttribute("aria-expanded","false");
      if(restore) themeTrigger.focus();
    };
    const openTheme=()=>{
      themePanel.hidden=false;
      themeTrigger.setAttribute("aria-expanded","true");
      const selected=$('[aria-pressed="true"]',themePanel)||$("[data-theme-option]",themePanel);
      selected?.focus();
    };

    themeTrigger.addEventListener("click",()=>{
      themePanel.hidden?openTheme():closeTheme(true);
    });

    $$("[data-theme-option]",themePanel).forEach((button)=>{
      button.addEventListener("click",()=>{
        applyTheme(button.dataset.themeOption,true);
        closeTheme(true);
      });
    });

    document.addEventListener("click",(event)=>{
      if(!themePanel.hidden&&!themePanel.contains(event.target)&&!themeTrigger.contains(event.target)) closeTheme();
    });

    document.addEventListener("keydown",(event)=>{
      if(event.key==="Escape"&&!themePanel.hidden){
        event.preventDefault();
        closeTheme(true);
      }
    });
  }

  const menuButton=$("[data-menu-toggle]");
  const nav=$("[data-nav]");
  if(menuButton&&nav){
    const closeMenu=(restore=false)=>{
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded","false");
      document.body.classList.remove("menu-open");
      if(restore) menuButton.focus();
    };
    const openMenu=()=>{
      nav.classList.add("open");
      menuButton.setAttribute("aria-expanded","true");
      document.body.classList.add("menu-open");
      $("a",nav)?.focus();
    };

    menuButton.addEventListener("click",()=>{
      nav.classList.contains("open")?closeMenu(true):openMenu();
    });

    $$("a",nav).forEach((link)=>link.addEventListener("click",()=>closeMenu()));

    document.addEventListener("click",(event)=>{
      if(nav.classList.contains("open")&&!nav.contains(event.target)&&!menuButton.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown",(event)=>{
      if(!nav.classList.contains("open")) return;

      if(event.key==="Escape"){
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if(event.key==="Tab"){
        const focusable=[menuButton,...$$('a[href],button:not([disabled])',nav)];
        const first=focusable[0];
        const last=focusable[focusable.length-1];
        if(event.shiftKey&&document.activeElement===first){
          event.preventDefault();
          last.focus();
        }else if(!event.shiftKey&&document.activeElement===last){
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize",()=>{
      if(window.innerWidth>1023&&nav.classList.contains("open")) closeMenu();
    },{passive:true});
  }

  const dialog=$("[data-lightbox]");
  const photos=$$("[data-photo]");
  if(dialog&&photos.length){
    const image=$("img",dialog);
    const caption=$("[data-caption]",dialog);
    const count=$("[data-count]",dialog);
    const closeButton=$("[data-close]",dialog);
    const prev=$("[data-prev]",dialog);
    const next=$("[data-next]",dialog);
    let index=0;
    let opener=null;
    let touchStart=null;

    const render=()=>{
      const source=$("img",photos[index]);
      image.src=source.currentSrc||source.src;
      image.alt=source.alt;
      caption.textContent=source.alt;
      count.textContent=(index+1)+" / "+photos.length;
    };

    const move=(delta)=>{
      index=(index+delta+photos.length)%photos.length;
      render();
    };

    photos.forEach((button,i)=>{
      button.addEventListener("click",()=>{
        index=i;
        opener=button;
        render();
        dialog.showModal();
        closeButton?.focus();
      });
    });

    closeButton?.addEventListener("click",()=>dialog.close());
    prev?.addEventListener("click",()=>move(-1));
    next?.addEventListener("click",()=>move(1));

    dialog.addEventListener("click",(event)=>{
      if(event.target===dialog) dialog.close();
    });

    dialog.addEventListener("keydown",(event)=>{
      if(event.key==="ArrowLeft"){event.preventDefault();move(-1)}
      if(event.key==="ArrowRight"){event.preventDefault();move(1)}
    });

    dialog.addEventListener("touchstart",(event)=>{
      touchStart=event.changedTouches[0]?.clientX??null;
    },{passive:true});

    dialog.addEventListener("touchend",(event)=>{
      if(touchStart===null) return;
      const end=event.changedTouches[0]?.clientX??touchStart;
      const delta=end-touchStart;
      touchStart=null;
      if(Math.abs(delta)>48) move(delta>0?-1:1);
    },{passive:true});

    dialog.addEventListener("close",()=>opener?.focus());
  }

  const filterButtons=$$("[data-filter]");
  const categories=$$("[data-category]");
  const filterStatus=$("[data-filter-status]");
  filterButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
      const filter=button.dataset.filter;
      filterButtons.forEach((item)=>item.setAttribute("aria-pressed",String(item===button)));
      categories.forEach((section)=>{
        section.hidden=filter!=="all"&&section.dataset.category!==filter;
      });
      if(filterStatus){
        filterStatus.textContent=filter==="all"?"Showing all menu categories":"Showing "+button.textContent.trim();
      }
    });
  });

  const backTop=$("[data-top]");
  if(backTop){
    const sync=()=>backTop.classList.toggle("show",window.scrollY>650);
    window.addEventListener("scroll",sync,{passive:true});
    sync();
    backTop.addEventListener("click",()=>{
      window.scrollTo({top:0,behavior:reduceMotion.matches?"auto":"smooth"});
    });
  }

  const toast=$("[data-toast]");
  let toastTimer;
  const announce=(message)=>{
    if(!toast) return;
    toast.textContent=message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
  };

  $$("[data-copy]").forEach((button)=>{
    button.addEventListener("click",async()=>{
      try{
        await navigator.clipboard.writeText(button.dataset.copy);
        announce("Address copied");
      }catch{
        announce("Copy unavailable");
      }
    });
  });

  $$("[data-share]").forEach((button)=>{
    button.addEventListener("click",async()=>{
      try{
        if(navigator.share){
          await navigator.share({
            title:"Dough Re Mi Bakery & Cafe",
            text:"Dough Re Mi Bakery & Cafe in Ottawa",
            url:window.location.href
          });
        }else{
          await navigator.clipboard.writeText(window.location.href);
          announce("Page link copied");
        }
      }catch(error){
        if(error?.name!=="AbortError") announce("Sharing unavailable");
      }
    });
  });
})();
