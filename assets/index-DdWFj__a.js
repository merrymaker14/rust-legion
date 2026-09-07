(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Nu=18e4;function Uu(i){const{offPlatform:t,sdkUrl:e,appFocus:n}=i,s=i.platformLang||function(){},r=i.bannerState||function(){},a=i.platformPause||function(){},o=i.platformMute||function(){},l=i.platformFlags||function(){};let c=null,h=!1,d=0;const u={};let f=null,g=!1;const y=()=>window.gdsdk||c;function m(M){const w=document.body;if(!M){w.classList.remove("has-banner"),w.style.removeProperty("--bnr");return}w.classList.add("has-banner"),w.style.setProperty("--bnr",Math.min(M,Math.round(innerHeight*.33))+"px")}function p(M){if(!M||M.layout_type!=="overlay")return m(0);const w=Math.round(innerHeight*.33);let b=+M.banner_height||0;b>w&&devicePixelRatio>1&&(b=Math.round(b/devicePixelRatio)),m(b)}function E(M){const w=document.getElementById(M);if(w)return w.style.display="",m(parseInt(w.style.height,10)||0),null;const b=innerHeight>560,I=b?90:50,B=b?728:320,X=document.createElement("div");return X.id=M,X.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:0;z-index:14;width:min("+B+"px,100vw);height:"+I+"px",document.body.appendChild(X),m(I),X}function T(M){const w=document.getElementById(M);w&&(w.style.display="none"),m(0)}function x(M){const w=document.getElementById(M);w&&w.remove(),m(0)}const R="vk.com";function A(){let M="";try{M=new URLSearchParams(location.search).get("vk_app_id")||""}catch{}M||(M=window.__VK_APP_ID||"");const w=String(M).replace(/\D/g,"");return w?"https://"+R+"/app"+w:location.origin+location.pathname}return{DRIVERS:{none:{banner:!1,init(){},ready(){},gameplay(){},interstitial(M){M(!1)},rewarded(M){M(!1)},showBanner(){}},yandex:{banner:!0,init(M){if(t())return;const w=window.__YA_SDK?window.__YA_SDK:new Promise((b,I)=>{const B=document.createElement("script");B.src=e(),B.onload=()=>{try{b(YaGames.init())}catch(X){I(X)}},B.onerror=I,document.head.appendChild(B)});Promise.resolve(w).then(b=>{c=b;try{const I=b.environment&&b.environment.i18n&&b.environment.i18n.lang;I&&s(String(I).slice(0,2).toLowerCase())}catch{}try{b.getFlags&&b.getFlags({defaultFlags:{}}).then(I=>{I&&typeof l=="function"&&l(I)}).catch(()=>{})}catch{}try{b.on&&b.on("game_api_pause",()=>a(!0)),b.on&&b.on("game_api_resume",()=>a(!1))}catch{}M(!!(b.adv&&b.adv.showBannerAdv))}).catch(()=>{})},ready(){try{c.features.LoadingAPI.ready()}catch{}},gameplay(M){try{M?c.features.GameplayAPI.start():c.features.GameplayAPI.stop()}catch{}},interstitial(M,w){try{c.adv.showFullscreenAdv({callbacks:{onOpen:w,onClose:b=>M(b!==!1),onError:()=>M(!1)}})}catch{M(!1)}},rewarded(M,w){let b=!1,I=!1;try{c.adv.showRewardedVideo({callbacks:{onOpen:()=>{I=!0,w&&w()},onRewarded:()=>{b=!0},onClose:()=>M(b,b?null:"closed"),onError:()=>M(b,I?"closed":"nofill")}})}catch{M(!1,"nofill")}},showBanner(M){try{M?Promise.resolve(c.adv.showBannerAdv()).then(w=>{w&&w.stickyAdvIsShowing===!1&&r(!1,w.reason||"fail")}).catch(()=>r(!1,"fail")):Promise.resolve(c.adv.hideBannerAdv()).catch(()=>{})}catch{r(!1,"fail")}},fullscreen(M){try{const w=c.screen&&c.screen.fullscreen;if(!w)return;M?w.request().catch(()=>{}):w.exit().catch(()=>{})}catch{}},askReview(){try{c.feedback.canReview().then(M=>{M&&M.value&&c.feedback.requestReview().catch(()=>{})}).catch(()=>{})}catch{}},addShortcut(){try{c.shortcut.canShowPrompt().then(M=>{M&&M.canShow&&c.shortcut.showPrompt().catch(()=>{})}).catch(()=>{})}catch{}},setScore(M,w){try{if(c.leaderboards&&c.leaderboards.setScore){c.leaderboards.setScore(M,w).catch(()=>{});return}c.getLeaderboards().then(b=>{b.setLeaderboardScore(M,w).catch(()=>{})}).catch(()=>{})}catch{}}},vkok:{banner:!0,waitShort:6e4,waitLong:1e5,init(M){const w=window.vkBridge;w&&w.send("VKWebAppInit").then(()=>{c=w;try{w.send("VKWebAppCheckNativeAds",{ad_format:"reward"}).then(b=>{h=!!(b&&b.result)}).catch(()=>{})}catch{}w.subscribe(b=>{const I=b&&b.detail&&b.detail.type;I==="VKWebAppViewHide"?n(!1):I==="VKWebAppViewRestore"?n(!0):I==="VKWebAppBannerAdClosedByUser"?(p(null),r(!1,"closed")):I==="VKWebAppBannerAdUpdated"&&p(b.detail.data)}),M(!0)}).catch(()=>{})},ready(){},gameplay(){},interstitial(M,w){try{c.send("VKWebAppCheckNativeAds",{ad_format:"interstitial"}).then(b=>!b||!b.result?M(!1):c.send("VKWebAppShowNativeAds",{ad_format:"interstitial"}).then(I=>{I&&I.result&&w(),M(!!(I&&I.result))})).catch(()=>M(!1))}catch{M(!1)}},rewarded(M){try{c.send("VKWebAppCheckNativeAds",{ad_format:"reward"}).then(w=>!w||!w.result?(h=!1,M(!1,"nofill")):c.send("VKWebAppShowNativeAds",{ad_format:"reward"}).then(b=>M(!!(b&&b.result),b&&b.result?null:"closed"))).catch(()=>M(!1,"nofill"))}catch{M(!1,"nofill")}},showBanner(M){try{M?c.send("VKWebAppShowBannerAd",{banner_location:"bottom",layout_type:"resize",height_type:"compact"}).then(w=>{if(!w||!w.result){r(!1,"fail");return}p(w)}).catch(()=>r(!1,"fail")):c.send("VKWebAppHideBannerAd").then(()=>{p(null)}).catch(()=>{})}catch{r(!1,"fail")}},share(M){return c.send("VKWebAppShowStoryBox",{background_type:"image",blob:M,attachment:{text:"play",type:"url",url:A()}}).then(()=>!0).catch(()=>!1)},recommend(){try{c.send("VKWebAppRecommend").catch(()=>{})}catch{}},invite(){try{c.send("VKWebAppShowInviteBox").catch(()=>{})}catch{}},haptic(M){try{M==="select"?c.send("VKWebAppTapticSelectionChanged").catch(()=>{}):c.send("VKWebAppTapticImpactOccurred",{style:M==="heavy"?"heavy":"light"}).catch(()=>{})}catch{}},addShortcut(){try{if(new URLSearchParams(location.search).get("vk_is_favorite")==="1")return;const w=(window.__SAVE_SCOPE||"")+"gk_vk_fav";if(sessionStorage.getItem(w))return;sessionStorage.setItem(w,"1"),c.send("VKWebAppAddToFavorites").catch(()=>{})}catch{}}},android:{banner:!1,init(M){if(window.AndroidAds){try{if(!window.AndroidAds.adsEnabled())return}catch{return}window.__adDone=(w,b)=>{const I=u[w];I&&(delete u[w],I.done(!!b,b?null:I.opened?"closed":"nofill"))},window.__adShown=w=>{const b=u[w];b&&(b.opened=!0,b.started&&b.started())},c=window.AndroidAds,M(!1)}},ready(){try{c.gameReady()}catch{}},gameplay(){},interstitial(M,w){try{const b=String(++d);u[b]={done:M,started:w,opened:!1},c.showInterstitial(b)}catch{M(!1)}},rewarded(M,w){try{const b=String(++d);u[b]={done:M,started:w,opened:!1},c.showRewarded(b)}catch{M(!1,"nofill")}},showBanner(){},askReview(){try{window.AndroidStore&&window.AndroidStore.askReview()}catch{}}},crazy:{banner:!0,mutesOnStart:!0,init(M){if(t())return;const w=document.createElement("script");w.src=e(),w.onload=()=>{try{window.CrazyGames.SDK.init().then(()=>{c=window.CrazyGames.SDK;try{const b=c.user&&c.user.systemInfo,I=b&&b.locale;I&&s(String(I).slice(0,2).toLowerCase())}catch{}try{const b=c.game&&c.game.settings;b&&(o(!!b.muteAudio),c.game.addSettingsChangeListener&&c.game.addSettingsChangeListener(I=>o(!!(I&&I.muteAudio))))}catch{}try{c.game.loadingStart()}catch{}M(!0)}).catch(()=>{})}catch{}},w.onerror=()=>{},document.head.appendChild(w)},ready(){try{c.game.loadingStop()}catch{}},gameplay(M){try{M?c.game.gameplayStart():c.game.gameplayStop()}catch{}},interstitial(M,w){let b=!1;const I=B=>{b||(b=!0,M(B))};try{c.ad.requestAd("midgame",{adStarted:w,adFinished:()=>I(!0),adError:()=>I(!1)})}catch{I(!1)}},rewarded(M,w){let b=!1,I=!1;const B=(X,N)=>{b||(b=!0,N==="nofill"?h=!1:X&&(h=!0),M(X,N))};try{c.ad.requestAd("rewarded",{adStarted:()=>{I=!0,w&&w()},adFinished:()=>B(!0),adError:()=>B(!1,I?"closed":"nofill")})}catch{B(!1,"nofill")}},showBanner(M){const w="cg-banner";if(!M)return T(w);try{if(!E(w))return;c.banner.requestResponsiveBanner([w]).catch(()=>{x(w),r(!1,"fail")})}catch{x(w),r(!1,"fail")}},delight(){try{c.game.happytime()}catch{}},reportProgress(M){try{c.game.reportGameCompletedPercentage(Math.max(0,Math.min(100,M|0)))}catch{}}},gamedist:{banner:!0,waitShort:45e3,waitLong:75e3,init(M){if(t())return;const w=window.GD_OPTIONS;if(!w||!w.gameId)return;let b=!1;const I=()=>{b||(b=!0,c=window.gdsdk||null,X(),M(!0))};w.onEvent=N=>{const G=N&&N.name;G==="SDK_READY"?I():G==="SDK_ERROR"?(h=!1,I()):G==="SDK_GAME_PAUSE"?(a(!0),n(!1),f&&f()):G==="SDK_GAME_START"?(a(!1),n(!0)):G==="SDK_REWARDED_WATCH_COMPLETE"&&(g=!0)};const B=document.createElement("script");B.src=e();const X=()=>{try{const N=y();if(!(N&&N.preloadAd))return;N.preloadAd("rewarded").then(()=>{h=!0}).catch(()=>{h=!1})}catch{}};B.onload=I,B.onerror=()=>{},document.head.appendChild(B)},ready(){},gameplay(){},interstitial(M,w){let b=!1;const I=B=>{b||(b=!0,f=null,M(B))};f=w;try{const B=y();if(!B)return I(!1);B.showAd().then(()=>I(!0)).catch(()=>I(!1))}catch{I(!1)}},rewarded(M,w){let b=!1,I=!1;const B=(X,N)=>{if(!b){b=!0,f=null,M(X,N);try{const G=y();G&&G.preloadAd&&G.preloadAd("rewarded").catch(()=>{})}catch{}}};f=()=>{I=!0,w&&w()},g=!1;try{const X=y();if(!X)return B(!1,"nofill");X.showAd("rewarded").then(()=>B(g,g?null:"closed")).catch(()=>B(!1,I?"closed":"nofill"))}catch{B(!1,"nofill")}},showBanner(M){const w="gd-banner";if(!M)return T(w);try{const b=y();if(!b||!b.showAd){r(!1,"fail");return}if(!E(w))return;Promise.resolve(b.showAd("display",{containerId:w})).catch(()=>{x(w),r(!1,"fail")})}catch{x(w),r(!1,"fail")}}}},state:{get sdk(){return c},get rewardWarm(){return h},reset(){c=null,h=!1,f=null,g=!1}}}}function Fu(){if(typeof window.__PLATFORM__=="string"&&window.__PLATFORM__)return window.__PLATFORM__;if(location.protocol==="file:")return"none";const i=location.hostname;return!i||/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(i),"none"}function mh(){return location.protocol==="file:"||!location.hostname||/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname)||/(^|\.)github\.io$/i.test(location.hostname)}const gh=i=>i+(typeof window<"u"&&window.__SAVE_SCOPE||""),_h=()=>{try{return typeof localStorage<"u"?localStorage:null}catch{return null}},Ou=(i,t)=>{try{window.__cloudPut&&window.__cloudPut(i,t)}catch{}};function _r(i,t=null){const e=_h();if(!e)return t;try{const n=e.getItem(gh(i));return n===null?t:JSON.parse(n)}catch{return t}}function Pa(i,t){const e=_h(),n=JSON.stringify(t);try{e&&e.setItem(gh(i),n)}catch{}return Ou(i,n),t}function Bu(){try{if(typeof window<"u"&&window.__PLATFORM_READY)return window.__PLATFORM_READY}catch{}return Promise.resolve(!1)}let ye={sourceLang:"ru",sourcePattern:/[А-Яа-яЁё]/,names:{ru:"Русский",en:"English"},dictUrl:i=>`assets/text/${i}.json`,defaultFor:(i,t)=>i==="crazy"||i==="gamedist"?t.en?"en":ye.sourceLang:i?ye.sourceLang:/^ru\b/i.test(navigator.language||"")?"ru":t.en?"en":ye.sourceLang,title:null,onChange:null},ki={},ke=null,zi=null;const Vr={};function Bl(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function F(i){if(typeof i!="string"||!i||(window.__trCollect&&((window.__trSeen||(window.__trSeen={}))[Bl(i)]=i),!zi))return i;const t=zi[Bl(i)];return t===void 0?i:t}let cr=0;async function La(i,t=cr){if(i===ye.sourceLang)return zi=null,!0;if(Vr[i])return zi=Vr[i],!0;if(location.protocol==="file:")return!1;try{const e=await fetch(ye.dictUrl(i));if(!e.ok)throw new Error("HTTP "+e.status);const n=await e.json();return Vr[i]=n,t!==cr?null:(zi=n,!0)}catch(e){return t!==cr?null:(console.warn(`[язык] словарь ${i} не загрузился, остаёмся на ${ye.sourceLang}:`,e.message),zi=null,!1)}}function vh(){document.documentElement.lang=ke,ye.title&&(document.title=ye.title(F))}function vr(i=document.body){const t={SCRIPT:1,STYLE:1,TEXTAREA:1},e=document.createTreeWalker(i,NodeFilter.SHOW_TEXT,{acceptNode:r=>t[r.parentNode&&r.parentNode.nodeName]?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),n=[];for(;e.nextNode();)n.push(e.currentNode);for(const r of n){const a=r.nodeValue,o=a.trim(),l=r.__src!==void 0?r.__src:o;if(!l||!ye.sourcePattern.test(l))continue;r.__src===void 0&&(r.__src=o);const c=F(r.__src);c!==o&&(r.nodeValue=o?a.replace(o,c):c)}const s=["title","placeholder","aria-label"];i.querySelectorAll?.("[title],[placeholder],[aria-label]").forEach(r=>{const a=r.__srcAttr||(r.__srcAttr={});for(const o of s){const l=r.getAttribute(o);l!==null&&(a[o]===void 0&&(a[o]=l),ye.sourcePattern.test(a[o])&&r.setAttribute(o,F(a[o])))}}),i.querySelectorAll?.("[data-tr-value]").forEach(r=>{r.__trValue!==void 0&&r.value!==r.__trValue||(r.__srcValue===void 0&&(r.__srcValue=r.value),r.value=r.__trValue=F(r.__srcValue))})}async function xh(i){if(!ki[i]||i===ke)return ke;const t=ke;ke=i;const e=++cr,n=await La(i,e);return n===null?ke:!n&&i!==ye.sourceLang?(ke=t,await La(t,e),ke):(vh(),vr(),ye.onChange?.(ke),ke)}const xr=()=>ke,ku=()=>({...ki});async function zu(i={}){ye={...ye,...i},ki={[ye.sourceLang]:ye.names[ye.sourceLang]};for(const t of i.available||[])ye.names[t]&&(ki[t]=ye.names[t]);return ke=i.saved&&ki[i.saved]?i.saved:ye.defaultFor(i.platform||"",ki),await La(ke),vh(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>vr(),{once:!0}):vr(),ke}const Ia="rl_lang";async function Vu(i){const t=Array.isArray(window.__LANGS)?window.__LANGS:[];return window.__platformLang=e=>{const n=(e||"").slice(0,2);_r(Ia,null)||n!==xr()&&(n==="ru"||t.includes(n))&&xh(n)},zu({available:t,saved:_r(Ia,null)??Gu(t),platform:i,sourceLang:"ru",names:{ru:"Русский",en:"English"},title:e=>e("Свалка чемпионов"),onChange:null})}function Gu(i){const t=typeof window.__LANG_HINT=="string"?window.__LANG_HINT.slice(0,2):"";return t==="ru"?"ru":t&&i.includes(t)?t:null}async function Hu(){const i=Object.keys(ku());if(i.length<2)return xr()??"ru";const t=i.indexOf(xr()??"ru"),e=await xh(i[(t+1)%i.length]);return Pa(Ia,e),e}const Mh=typeof window<"u"&&window.__PLATFORM__||"none",Da=new Set,Wu=i=>(Da.add(i),()=>Da.delete(i)),Na=new Set,Xu=i=>(Na.add(i),()=>Na.delete(i)),{DRIVERS:kl}=Uu({offPlatform:mh,sdkUrl:()=>window.__SDK_URL||"",appFocus:i=>{for(const t of Da)try{t(i)}catch{}},platformLang:i=>{window.__LANG_HINT=i;try{window.__platformLang&&window.__platformLang(i)}catch{}},bannerState:(i,t)=>{Ua=!!i,!i&&(t==="closed"||++qu>=3)&&(Fa=!0)},platformPause:i=>{Cn=!!i,Ba(),Mr(!i&&!!Ho())},platformMute:i=>{for(const t of Na)try{t(!!i)}catch{}}});let Ue=kl[Mh]||kl.none,gn=!1,yh=!1,Ua=!1,qu=0,Fa=!1,zl=!1,Sh=!1,Vl=null,Cn=!1;const Oa=new Set,Ba=()=>{for(const i of Oa)try{i(Cn)}catch{}},Yu=()=>Cn,Ku=i=>(Oa.add(i),()=>Oa.delete(i)),bh=()=>gn,Go=()=>Mh;let Ho=()=>!0;function Zu(i){typeof i=="function"&&(Ho=i)}function wh(i,t,e){return new Promise(n=>{let s=!1,r=setTimeout(()=>a(!1),t);function a(l){s||(s=!0,clearTimeout(r),Cn=!1,Ba(),Mr(!!Ho()),n(l))}const o=()=>{clearTimeout(r),r=setTimeout(()=>a(!!e),Nu)};Cn=!0,Ba(),Mr(!1);try{i(a,o)}catch{a(!1)}})}function Ju(){try{Ue.init(i=>{gn=!0,yh=!!i,Sh&&Eh()})}catch{}}function Eh(){if(Sh=!0,!(!gn||zl)){zl=!0;try{Ue.ready()}catch{}}}function Mr(i){if(Cn&&(i=!1),i!==Vl){Vl=i;try{Ue.gameplay(i)}catch{}}}function Ah(){return!gn||Cn?Promise.resolve(!1):wh((i,t)=>Ue.interstitial(i,t),Ue.waitShort||12e3,!0)}function $u(){return gn?Cn?Promise.resolve(!1):wh((i,t)=>Ue.rewarded(i,t),Ue.waitLong||4e4,!1):Promise.resolve(!0)}function ji(){if(gn)try{Ue.delight&&Ue.delight()}catch{}}function Qu(){if(gn)try{Ue.askReview&&Ue.askReview()}catch{}}function ju(){if(gn)try{Ue.addShortcut&&Ue.addShortcut()}catch{}}function td(i,t){if(gn)try{Ue.setScore&&Ue.setScore(i,t)}catch{}}function Th(i){if(!(!gn||!yh||i===Ua)&&!(i&&Fa)&&!(Cn&&i)){Ua=i;try{Ue.showBanner(i)}catch{}}}const ed=Go()==="crazy"?185e3:15e4,nd=1;let yr=0;function id(i){yr=Date.now(),Zu(i),Ju()}const sd=Eh,Rh=Mr;function ln(){const i=Go();return i==="none"||mh()||i==="android"?!0:bh()}function rd(){yr=0}async function ka(i){return i<nd||Date.now()-yr<ed?!1:(yr=Date.now(),Ah())}function cn(){return ln()?$u():Promise.resolve(!1)}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wo="185",ad=0,Gl=1,od=2,hr=1,ld=2,ds=3,Xn=0,Ne=1,wn=2,Tn=0,oi=1,za=2,Hl=3,Wl=4,cd=5,ii=100,hd=101,ud=102,dd=103,fd=104,pd=200,md=201,gd=202,_d=203,Va=204,Ga=205,vd=206,xd=207,Md=208,yd=209,Sd=210,bd=211,wd=212,Ed=213,Ad=214,Ha=0,Wa=1,Xa=2,Wi=3,qa=4,Ya=5,Ka=6,Za=7,Xo=0,Td=1,Rd=2,dn=0,Ch=1,Ph=2,Lh=3,qo=4,Ih=5,Dh=6,Nh=7,Uh=300,ci=301,Xi=302,Gr=303,Hr=304,Dr=306,Ja=1e3,En=1001,$a=1002,Ce=1003,Cd=1004,Ls=1005,De=1006,Wr=1007,ri=1008,Xe=1009,Fh=1010,Oh=1011,Ms=1012,Yo=1013,pn=1014,je=1015,Pn=1016,Ko=1017,Zo=1018,ys=1020,Bh=35902,kh=35899,zh=1021,Vh=1022,tn=1023,Ln=1026,ai=1027,Jo=1028,$o=1029,hi=1030,Qo=1031,jo=1033,ur=33776,dr=33777,fr=33778,pr=33779,Qa=35840,ja=35841,to=35842,eo=35843,no=36196,io=37492,so=37496,ro=37488,ao=37489,Sr=37490,oo=37491,lo=37808,co=37809,ho=37810,uo=37811,fo=37812,po=37813,mo=37814,go=37815,_o=37816,vo=37817,xo=37818,Mo=37819,yo=37820,So=37821,bo=36492,wo=36494,Eo=36495,Ao=36283,To=36284,br=36285,Ro=36286,Pd=3200,wr=0,Ld=1,Hn="",He="srgb",Er="srgb-linear",Ar="linear",re="srgb",Mi=7680,Xl=519,Id=512,Dd=513,Nd=514,tl=515,Ud=516,Fd=517,el=518,Od=519,ql=35044,Yl="300 es",un=2e3,Ss=2001;function Bd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Tr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kd(){const i=Tr("canvas");return i.style.display="block",i}const Kl={};function Zl(...i){const t="THREE."+i.shift();console.log(t,...i)}function Gh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Vt(...i){i=Gh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function jt(...i){i=Gh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Gi(...i){const t=i.join(" ");t in Kl||(Kl[t]=!0,Vt(...i))}function zd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Vd={[Ha]:Wa,[Xa]:Ka,[qa]:Za,[Wi]:Ya,[Wa]:Ha,[Ka]:Xa,[Za]:qa,[Ya]:Wi};class fi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jl=1234567;const ms=Math.PI/180,bs=180/Math.PI;function pi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function nl(i,t){return(i%t+t)%t}function Gd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Hd(i,t,e){return i!==t?(e-i)/(t-i):0}function gs(i,t,e){return(1-e)*i+e*t}function Wd(i,t,e,n){return gs(i,t,1-Math.exp(-e*n))}function Xd(i,t=1){return t-Math.abs(nl(i,t*2)-t)}function qd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Yd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Kd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Zd(i,t){return i+Math.random()*(t-i)}function Jd(i){return i*(.5-Math.random())}function $d(i){i!==void 0&&(Jl=i);let t=Jl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Qd(i){return i*ms}function jd(i){return i*bs}function tf(i){return(i&i-1)===0&&i!==0}function ef(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function nf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function sf(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:Vt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Fe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const rf={DEG2RAD:ms,RAD2DEG:bs,generateUUID:pi,clamp:$t,euclideanModulo:nl,mapLinear:Gd,inverseLerp:Hd,lerp:gs,damp:Wd,pingpong:Xd,smoothstep:qd,smootherstep:Yd,randInt:Kd,randFloat:Zd,randFloatSpread:Jd,seededRandom:$d,degToRad:Qd,radToDeg:jd,isPowerOfTwo:tf,ceilPowerOfTwo:ef,floorPowerOfTwo:nf,setQuaternionFromProperEuler:sf,normalize:Fe,denormalize:Bi},bl=class bl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};bl.prototype.isVector2=!0;let rt=bl;class qn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],y=r[a+3];if(d!==y||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*y;m<0&&(u=-u,f=-f,g=-g,y=-y,m=-m);let p=1-o;if(m<.9995){const E=Math.acos(m),T=Math.sin(E);p=Math.sin(p*E)/T,o=Math.sin(o*E)/T,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+y*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+y*o;const E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const wl=class wl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($l.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($l.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Xr.copy(this).projectOnVector(t),this.sub(Xr)}reflect(t){return this.sub(Xr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};wl.prototype.isVector3=!0;let L=wl;const Xr=new L,$l=new qn,El=class El{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],y=s[0],m=s[3],p=s[6],E=s[1],T=s[4],x=s[7],R=s[2],A=s[5],P=s[8];return r[0]=a*y+o*E+l*R,r[3]=a*m+o*T+l*A,r[6]=a*p+o*x+l*P,r[1]=c*y+h*E+d*R,r[4]=c*m+h*T+d*A,r[7]=c*p+h*x+d*P,r[2]=u*y+f*E+g*R,r[5]=u*m+f*T+g*A,r[8]=u*p+f*x+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return t[0]=d*y,t[1]=(s*c-h*n)*y,t[2]=(o*n-s*a)*y,t[3]=u*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qr.makeScale(t,e)),this}rotate(t){return Gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qr.makeRotation(-t)),this}translate(t,e){return Gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};El.prototype.isMatrix3=!0;let Xt=El;const qr=new Xt,Ql=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jl=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function af(){const i={enabled:!0,workingColorSpace:Er,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===re&&(s.r=Rn(s.r),s.g=Rn(s.g),s.b=Rn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===re&&(s.r=Hi(s.r),s.g=Hi(s.g),s.b=Hi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Ar:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Gi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Gi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Er]:{primaries:t,whitePoint:n,transfer:Ar,toXYZ:Ql,fromXYZ:jl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:n,transfer:re,toXYZ:Ql,fromXYZ:jl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),i}const te=af();function Rn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Hi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let yi;class of{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{yi===void 0&&(yi=Tr("canvas")),yi.width=t.width,yi.height=t.height;const s=yi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=yi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Tr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Rn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Rn(e[n]/255)*255):e[n]=Rn(e[n]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let lf=0;class il{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=pi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Yr(s[a].image)):r.push(Yr(s[a]))}else r=Yr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Yr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?of.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}let cf=0;const Kr=new L;class Be extends fi{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=En,s=En,r=De,a=ri,o=tn,l=Xe,c=Be.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=pi(),this.name="",this.source=new il(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kr).x}get height(){return this.source.getSize(Kr).y}get depth(){return this.source.getSize(Kr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Uh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ja:t.x=t.x-Math.floor(t.x);break;case En:t.x=t.x<0?0:1;break;case $a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ja:t.y=t.y-Math.floor(t.y);break;case En:t.y=t.y<0?0:1;break;case $a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=Uh;Be.DEFAULT_ANISOTROPY=1;const Al=class Al{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,x=(f+1)/2,R=(p+1)/2,A=(h+u)/4,P=(d+y)/4,v=(g+m)/4;return T>x&&T>R?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=A/n,r=P/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=A/s,r=v/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=P/r,s=v/r),this.set(n,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-y)/E,this.z=(u-h)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Al.prototype.isVector4=!0;let fe=Al;class hf extends fi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new Be(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new il(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends hf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Hh extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class uf extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ir=class Ir{constructor(t,e,n,s,r,a,o,l,c,h,d,u,f,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,f,g,y,m)}set(t,e,n,s,r,a,o,l,c,h,d,u,f,g,y,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ir().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),a=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,g=o*h,y=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-y*c,e[9]=-o*l,e[2]=y-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,y=c*d;e[0]=u+y*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=y+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,y=c*d;e[0]=u-y*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=y-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,g=o*h,y=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+y,e[1]=l*d,e[5]=y*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=y-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-y*d}else if(t.order==="XZY"){const u=a*l,f=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+y,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=y*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(df,t,ff)}lookAt(t,e,n){const s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Fn.crossVectors(n,Ve),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Fn.crossVectors(n,Ve)),Fn.normalize(),Is.crossVectors(Ve,Fn),s[0]=Fn.x,s[4]=Is.x,s[8]=Ve.x,s[1]=Fn.y,s[5]=Is.y,s[9]=Ve.y,s[2]=Fn.z,s[6]=Is.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],y=n[6],m=n[10],p=n[14],E=n[3],T=n[7],x=n[11],R=n[15],A=s[0],P=s[4],v=s[8],M=s[12],w=s[1],b=s[5],I=s[9],B=s[13],X=s[2],N=s[6],G=s[10],z=s[14],J=s[3],it=s[7],ht=s[11],ct=s[15];return r[0]=a*A+o*w+l*X+c*J,r[4]=a*P+o*b+l*N+c*it,r[8]=a*v+o*I+l*G+c*ht,r[12]=a*M+o*B+l*z+c*ct,r[1]=h*A+d*w+u*X+f*J,r[5]=h*P+d*b+u*N+f*it,r[9]=h*v+d*I+u*G+f*ht,r[13]=h*M+d*B+u*z+f*ct,r[2]=g*A+y*w+m*X+p*J,r[6]=g*P+y*b+m*N+p*it,r[10]=g*v+y*I+m*G+p*ht,r[14]=g*M+y*B+m*z+p*ct,r[3]=E*A+T*w+x*X+R*J,r[7]=E*P+T*b+x*N+R*it,r[11]=E*v+T*I+x*G+R*ht,r[15]=E*M+T*B+x*z+R*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],y=t[7],m=t[11],p=t[15],E=l*f-c*u,T=o*f-c*d,x=o*u-l*d,R=a*f-c*h,A=a*u-l*h,P=a*d-o*h;return e*(y*E-m*T+p*x)-n*(g*E-m*R+p*A)+s*(g*T-y*R+p*P)-r*(g*x-y*A+m*P)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],y=t[13],m=t[14],p=t[15],E=e*o-n*a,T=e*l-s*a,x=e*c-r*a,R=n*l-s*o,A=n*c-r*o,P=s*c-r*l,v=h*y-d*g,M=h*m-u*g,w=h*p-f*g,b=d*m-u*y,I=d*p-f*y,B=u*p-f*m,X=E*B-T*I+x*b+R*w-A*M+P*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/X;return t[0]=(o*B-l*I+c*b)*N,t[1]=(s*I-n*B-r*b)*N,t[2]=(y*P-m*A+p*R)*N,t[3]=(u*A-d*P-f*R)*N,t[4]=(l*w-a*B-c*M)*N,t[5]=(e*B-s*w+r*M)*N,t[6]=(m*x-g*P-p*T)*N,t[7]=(h*P-u*x+f*T)*N,t[8]=(a*I-o*w+c*v)*N,t[9]=(n*w-e*I-r*v)*N,t[10]=(g*A-y*x+p*E)*N,t[11]=(d*x-h*A-f*E)*N,t[12]=(o*M-a*b-l*v)*N,t[13]=(e*b-n*M+s*v)*N,t[14]=(y*T-g*R-m*E)*N,t[15]=(h*R-d*T+u*E)*N,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,y=a*h,m=a*d,p=o*d,E=l*c,T=l*h,x=l*d,R=n.x,A=n.y,P=n.z;return s[0]=(1-(y+p))*R,s[1]=(f+x)*R,s[2]=(g-T)*R,s[3]=0,s[4]=(f-x)*A,s[5]=(1-(u+p))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(g+T)*P,s[9]=(m-E)*P,s[10]=(1-(u+y))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Si.set(s[0],s[1],s[2]).length();const o=Si.set(s[4],s[5],s[6]).length(),l=Si.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ze.copy(this);const c=1/a,h=1/o,d=1/l;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=h,Ze.elements[5]*=h,Ze.elements[6]*=h,Ze.elements[8]*=d,Ze.elements[9]*=d,Ze.elements[10]*=d,e.setFromRotationMatrix(Ze),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=un,l=!1){const c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let g,y;if(l)g=r/(a-r),y=a*r/(a-r);else if(o===un)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Ss)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=un,l=!1){const c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let g,y;if(l)g=1/(a-r),y=a/(a-r);else if(o===un)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===Ss)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ir.prototype.isMatrix4=!0;let ne=Ir;const Si=new L,Ze=new ne,df=new L(0,0,0),ff=new L(1,1,1),Fn=new L,Is=new L,Ve=new L,tc=new ne,ec=new qn;class Me{constructor(t=0,e=0,n=0,s=Me.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin($t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-$t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ec.setFromEuler(this),this.setFromQuaternion(ec,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Me.DEFAULT_ORDER="XYZ";class sl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pf=0;const nc=new L,bi=new qn,vn=new ne,Ds=new L,ts=new L,mf=new L,gf=new qn,ic=new L(1,0,0),sc=new L(0,1,0),rc=new L(0,0,1),ac={type:"added"},_f={type:"removed"},wi={type:"childadded",child:null},Zr={type:"childremoved",child:null};class Ee extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ee.DEFAULT_UP.clone();const t=new L,e=new Me,n=new qn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new Xt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=Ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return bi.setFromAxisAngle(t,e),this.quaternion.multiply(bi),this}rotateOnWorldAxis(t,e){return bi.setFromAxisAngle(t,e),this.quaternion.premultiply(bi),this}rotateX(t){return this.rotateOnAxis(ic,t)}rotateY(t){return this.rotateOnAxis(sc,t)}rotateZ(t){return this.rotateOnAxis(rc,t)}translateOnAxis(t,e){return nc.copy(t).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ic,t)}translateY(t){return this.translateOnAxis(sc,t)}translateZ(t){return this.translateOnAxis(rc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ds.copy(t):Ds.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(ts,Ds,this.up):vn.lookAt(Ds,ts,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),bi.setFromRotationMatrix(vn),this.quaternion.premultiply(bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ac),wi.child=t,this.dispatchEvent(wi),wi.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_f),Zr.child=t,this.dispatchEvent(Zr),Zr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ac),wi.child=t,this.dispatchEvent(wi),wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,t,mf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,gf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ee.DEFAULT_UP=new L(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class en extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vf={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new en,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new en,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new en,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const y of t.hand.values()){const m=e.getJointPose(y,n),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new en;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Ns={h:0,s:0,l:0};function $r(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=nl(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=$r(a,r,t+1/3),this.g=$r(a,r,t),this.b=$r(a,r,t-1/3)}return te.colorSpaceToWorking(this,s),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const n=Wh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Rn(t.r),this.g=Rn(t.g),this.b=Rn(t.b),this}copyLinearToSRGB(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return te.workingToColorSpace(Ie.copy(this),t),Math.round($t(Ie.r*255,0,255))*65536+Math.round($t(Ie.g*255,0,255))*256+Math.round($t(Ie.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(Ie.copy(this),e);const n=Ie.r,s=Ie.g,r=Ie.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=He){te.workingToColorSpace(Ie.copy(this),t);const e=Ie.r,n=Ie.g,s=Ie.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(On),this.setHSL(On.h+t,On.s+e,On.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(On),t.getHSL(Ns);const n=gs(On.h,Ns.h,e),s=gs(On.s,Ns.s,e),r=gs(On.l,Ns.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new Dt;Dt.NAMES=Wh;class Xh extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Me,this.environmentIntensity=1,this.environmentRotation=new Me,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Je=new L,xn=new L,Qr=new L,Mn=new L,Ei=new L,Ai=new L,oc=new L,jr=new L,ta=new L,ea=new L,na=new fe,ia=new fe,sa=new fe;class Qe{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Je.subVectors(t,e),s.cross(Je);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Je.subVectors(s,e),xn.subVectors(n,e),Qr.subVectors(t,e);const a=Je.dot(Je),o=Je.dot(xn),l=Je.dot(Qr),c=xn.dot(xn),h=xn.dot(Qr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mn.x),l.addScaledVector(a,Mn.y),l.addScaledVector(o,Mn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return na.setScalar(0),ia.setScalar(0),sa.setScalar(0),na.fromBufferAttribute(t,e),ia.fromBufferAttribute(t,n),sa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(na,r.x),a.addScaledVector(ia,r.y),a.addScaledVector(sa,r.z),a}static isFrontFacing(t,e,n,s){return Je.subVectors(n,e),xn.subVectors(t,e),Je.cross(xn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Je.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),Je.cross(xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ei.subVectors(s,n),Ai.subVectors(r,n),jr.subVectors(t,n);const l=Ei.dot(jr),c=Ai.dot(jr);if(l<=0&&c<=0)return e.copy(n);ta.subVectors(t,s);const h=Ei.dot(ta),d=Ai.dot(ta);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ei,a);ea.subVectors(t,r);const f=Ei.dot(ea),g=Ai.dot(ea);if(g>=0&&f<=g)return e.copy(r);const y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ai,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return oc.subVectors(r,s),o=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(oc,o);const p=1/(m+y+u);return a=y*p,o=u*p,e.copy(n).addScaledVector(Ei,a).addScaledVector(Ai,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class mi{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint($e.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint($e.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=$e.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,$e):$e.fromBufferAttribute(r,a),$e.applyMatrix4(t.matrixWorld),this.expandByPoint($e);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Us.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Us.copy(n.boundingBox)),Us.applyMatrix4(t.matrixWorld),this.union(Us)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,$e),$e.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(es),Fs.subVectors(this.max,es),Ti.subVectors(t.a,es),Ri.subVectors(t.b,es),Ci.subVectors(t.c,es),Bn.subVectors(Ri,Ti),kn.subVectors(Ci,Ri),Kn.subVectors(Ti,Ci);let e=[0,-Bn.z,Bn.y,0,-kn.z,kn.y,0,-Kn.z,Kn.y,Bn.z,0,-Bn.x,kn.z,0,-kn.x,Kn.z,0,-Kn.x,-Bn.y,Bn.x,0,-kn.y,kn.x,0,-Kn.y,Kn.x,0];return!ra(e,Ti,Ri,Ci,Fs)||(e=[1,0,0,0,1,0,0,0,1],!ra(e,Ti,Ri,Ci,Fs))?!1:(Os.crossVectors(Bn,kn),e=[Os.x,Os.y,Os.z],ra(e,Ti,Ri,Ci,Fs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,$e).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize($e).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const yn=[new L,new L,new L,new L,new L,new L,new L,new L],$e=new L,Us=new mi,Ti=new L,Ri=new L,Ci=new L,Bn=new L,kn=new L,Kn=new L,es=new L,Fs=new L,Os=new L,Zn=new L;function ra(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zn.fromArray(i,r);const o=s.x*Math.abs(Zn.x)+s.y*Math.abs(Zn.y)+s.z*Math.abs(Zn.z),l=t.dot(Zn),c=e.dot(Zn),h=n.dot(Zn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const xe=new L,Bs=new rt;let xf=0;class we extends fi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ql,this.updateRanges=[],this.gpuType=je,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Bs.fromBufferAttribute(this,e),Bs.applyMatrix3(t),this.setXY(e,Bs.x,Bs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array),r=Fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ql&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class qh extends we{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Yh extends we{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ee extends we{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Mf=new mi,ns=new L,aa=new L;class $i{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Mf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ns.subVectors(t,this.center);const e=ns.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ns,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(aa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ns.copy(t.center).add(aa)),this.expandByPoint(ns.copy(t.center).sub(aa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let yf=0;const Ke=new ne,oa=new Ee,Pi=new L,Ge=new mi,is=new mi,Re=new L;class Se extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bd(t)?Yh:qh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return oa.lookAt(t),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ee(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];is.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(Ge.min,is.min),Ge.expandByPoint(Re),Re.addVectors(Ge.max,is.max),Ge.expandByPoint(Re)):(Ge.expandByPoint(is.min),Ge.expandByPoint(is.max))}Ge.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Re));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Re.fromBufferAttribute(o,c),l&&(Pi.fromBufferAttribute(t,c),Re.add(Pi)),s=Math.max(s,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new we(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new L,l[v]=new L;const c=new L,h=new L,d=new L,u=new rt,f=new rt,g=new rt,y=new L,m=new L;function p(v,M,w){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,w),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,w),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const b=1/(f.x*g.y-g.x*f.y);isFinite(b)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(b),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(b),o[v].add(y),o[M].add(y),o[w].add(y),l[v].add(m),l[M].add(m),l[w].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let v=0,M=E.length;v<M;++v){const w=E[v],b=w.start,I=w.count;for(let B=b,X=b+I;B<X;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const T=new L,x=new L,R=new L,A=new L;function P(v){R.fromBufferAttribute(s,v),A.copy(R);const M=o[v];T.copy(M),T.sub(R.multiplyScalar(R.dot(M))).normalize(),x.crossVectors(A,M);const b=x.dot(l[v])<0?-1:1;a.setXYZW(v,T.x,T.y,T.z,b)}for(let v=0,M=E.length;v<M;++v){const w=E[v],b=w.start,I=w.count;for(let B=b,X=b+I;B<X;B+=3)P(t.getX(B+0)),P(t.getX(B+1)),P(t.getX(B+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new we(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),y=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new we(u,h,d)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Sf=0;class gi extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=pi(),this.name="",this.type="Material",this.blending=oi,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Va,this.blendDst=Ga,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=Wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mi,this.stencilZFail=Mi,this.stencilZPass=Mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==oi&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Va&&(n.blendSrc=this.blendSrc),this.blendDst!==Ga&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Dt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new rt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new rt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Sn=new L,la=new L,ks=new L,zn=new L,ca=new L,zs=new L,ha=new L;class rl{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Sn.copy(this.origin).addScaledVector(this.direction,e),Sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){la.copy(t).add(e).multiplyScalar(.5),ks.copy(e).sub(t).normalize(),zn.copy(this.origin).sub(la);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ks),o=zn.dot(this.direction),l=-zn.dot(ks),c=zn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const y=1/h;d*=y,u*=y,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(la).addScaledVector(ks,u),f}intersectSphere(t,e){Sn.subVectors(t.center,this.origin);const n=Sn.dot(this.direction),s=Sn.dot(Sn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Sn)!==null}intersectTriangle(t,e,n,s,r){ca.subVectors(e,t),zs.subVectors(n,t),ha.crossVectors(ca,zs);let a=this.direction.dot(ha),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;zn.subVectors(this.origin,t);const l=o*this.direction.dot(zs.crossVectors(zn,zs));if(l<0)return null;const c=o*this.direction.dot(ca.cross(zn));if(c<0||l+c>a)return null;const h=-o*zn.dot(ha);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class al extends gi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Me,this.combine=Xo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const lc=new ne,Jn=new rl,Vs=new $i,cc=new L,Gs=new L,Hs=new L,Ws=new L,ua=new L,Xs=new L,hc=new L,qs=new L;class de extends Ee{constructor(t=new Se,e=new al){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Xs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(ua.fromBufferAttribute(d,t),a?Xs.addScaledVector(ua,h):Xs.addScaledVector(ua.sub(e),h))}e.add(Xs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(r),Jn.copy(t.ray).recast(t.near),!(Vs.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(Vs,cc)===null||Jn.origin.distanceToSquared(cc)>(t.far-t.near)**2))&&(lc.copy(r).invert(),Jn.copy(t.ray).applyMatrix4(lc),!(n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Jn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){const m=u[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),T=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=E,R=T;x<R;x+=3){const A=o.getX(x),P=o.getX(x+1),v=o.getX(x+2);s=Ys(this,p,t,n,c,h,d,A,P,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){const E=o.getX(m),T=o.getX(m+1),x=o.getX(m+2);s=Ys(this,a,t,n,c,h,d,E,T,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){const m=u[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),T=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=E,R=T;x<R;x+=3){const A=x,P=x+1,v=x+2;s=Ys(this,p,t,n,c,h,d,A,P,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){const E=m,T=m+1,x=m+2;s=Ys(this,a,t,n,c,h,d,E,T,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function bf(i,t,e,n,s,r,a,o){let l;if(t.side===Ne?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Xn,o),l===null)return null;qs.copy(o),qs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(qs);return c<e.near||c>e.far?null:{distance:c,point:qs.clone(),object:i}}function Ys(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Gs),i.getVertexPosition(l,Hs),i.getVertexPosition(c,Ws);const h=bf(i,t,e,n,Gs,Hs,Ws,hc);if(h){const d=new L;Qe.getBarycoord(hc,Gs,Hs,Ws,d),s&&(h.uv=Qe.getInterpolatedAttribute(s,o,l,c,d,new rt)),r&&(h.uv1=Qe.getInterpolatedAttribute(r,o,l,c,d,new rt)),a&&(h.normal=Qe.getInterpolatedAttribute(a,o,l,c,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new L,materialIndex:0};Qe.getNormal(Gs,Hs,Ws,u.normal),h.face=u,h.barycoord=d}return h}class Kh extends Be{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ce,h=Ce,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uc extends we{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Li=new ne,dc=new ne,Ks=[],fc=new mi,wf=new ne,ss=new de,rs=new $i;class Ef extends de{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new uc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,wf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new mi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Li),fc.copy(t.boundingBox).applyMatrix4(Li),this.boundingBox.union(fc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new $i),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Li),rs.copy(t.boundingSphere).applyMatrix4(Li),this.boundingSphere.union(rs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ss.geometry=this.geometry,ss.material=this.material,ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rs.copy(this.boundingSphere),rs.applyMatrix4(n),t.ray.intersectsSphere(rs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Li),dc.multiplyMatrices(n,Li),ss.matrixWorld=dc,ss.raycast(t,Ks);for(let a=0,o=Ks.length;a<o;a++){const l=Ks[a];l.instanceId=r,l.object=this,e.push(l)}Ks.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new uc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Kh(new Float32Array(s*this.count),s,this.count,Jo,je));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const da=new L,Af=new L,Tf=new Xt;class ei{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=da.subVectors(n,e).cross(Af.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(da),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Tf.getNormalMatrix(t),s=this.coplanarPoint(da).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $n=new $i,Rf=new rt(.5,.5),Zs=new L;class ol{constructor(t=new ei,e=new ei,n=new ei,s=new ei,r=new ei,a=new ei){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=un,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],y=r[9],m=r[10],p=r[11],E=r[12],T=r[13],x=r[14],R=r[15];if(s[0].setComponents(c-a,f-h,p-g,R-E).normalize(),s[1].setComponents(c+a,f+h,p+g,R+E).normalize(),s[2].setComponents(c+o,f+d,p+y,R+T).normalize(),s[3].setComponents(c-o,f-d,p-y,R-T).normalize(),n)s[4].setComponents(l,u,m,x).normalize(),s[5].setComponents(c-l,f-u,p-m,R-x).normalize();else if(s[4].setComponents(c-l,f-u,p-m,R-x).normalize(),e===un)s[5].setComponents(c+l,f+u,p+m,R+x).normalize();else if(e===Ss)s[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$n.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$n.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($n)}intersectsSprite(t){$n.center.set(0,0,0);const e=Rf.distanceTo(t.center);return $n.radius=.7071067811865476+e,$n.applyMatrix4(t.matrixWorld),this.intersectsSphere($n)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Zs.x=s.normal.x>0?t.max.x:t.min.x,Zs.y=s.normal.y>0?t.max.y:t.min.y,Zs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cf extends gi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pc=new ne,Co=new rl,Js=new $i,$s=new L;class Pf extends Ee{constructor(t=new Se,e=new Cf){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(s),Js.radius+=r,t.ray.intersectsSphere(Js)===!1)return;pc.copy(s).invert(),Co.copy(t.ray).applyMatrix4(pc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,y=f;g<y;g++){const m=c.getX(g);$s.fromBufferAttribute(d,m),mc($s,m,l,s,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,y=f;g<y;g++)$s.fromBufferAttribute(d,g),mc($s,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mc(i,t,e,n,s,r,a){const o=Co.distanceSqToPoint(i);if(o<e){const l=new L;Co.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Zh extends Be{constructor(t=[],e=ci,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class qi extends Be{constructor(t,e,n=pn,s,r,a,o=Ce,l=Ce,c,h=Ln,d=1){if(h!==Ln&&h!==ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new il(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Lf extends qi{constructor(t,e=pn,n=ci,s,r,a=Ce,o=Ce,l,c=Ln){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Jh extends Be{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class _i extends Se{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(d,2));function g(y,m,p,E,T,x,R,A,P,v,M){const w=x/P,b=R/v,I=x/2,B=R/2,X=A/2,N=P+1,G=v+1;let z=0,J=0;const it=new L;for(let ht=0;ht<G;ht++){const ct=ht*b-B;for(let xt=0;xt<N;xt++){const Ht=xt*w-I;it[y]=Ht*E,it[m]=ct*T,it[p]=X,c.push(it.x,it.y,it.z),it[y]=0,it[m]=0,it[p]=A>0?1:-1,h.push(it.x,it.y,it.z),d.push(xt/P),d.push(1-ht/v),z+=1}}for(let ht=0;ht<v;ht++)for(let ct=0;ct<P;ct++){const xt=u+ct+N*ht,Ht=u+ct+N*(ht+1),ie=u+(ct+1)+N*(ht+1),Kt=u+(ct+1)+N*ht;l.push(xt,Ht,Kt),l.push(Ht,ie,Kt),J+=6}o.addGroup(f,J,M),f+=J,u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ll extends Se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new L,h=new rt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(o,3)),this.setAttribute("uv",new ee(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ll(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class cl extends Se{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const y=[],m=n/2;let p=0;E(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new ee(d,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2));function E(){const x=new L,R=new L;let A=0;const P=(e-t)/n;for(let v=0;v<=r;v++){const M=[],w=v/r,b=w*(e-t)+t;for(let I=0;I<=s;I++){const B=I/s,X=B*l+o,N=Math.sin(X),G=Math.cos(X);R.x=b*N,R.y=-w*n+m,R.z=b*G,d.push(R.x,R.y,R.z),x.set(N,P,G).normalize(),u.push(x.x,x.y,x.z),f.push(B,1-w),M.push(g++)}y.push(M)}for(let v=0;v<s;v++)for(let M=0;M<r;M++){const w=y[M][v],b=y[M+1][v],I=y[M+1][v+1],B=y[M][v+1];(t>0||M!==0)&&(h.push(w,b,B),A+=3),(e>0||M!==r-1)&&(h.push(b,I,B),A+=3)}c.addGroup(p,A,0),p+=A}function T(x){const R=g,A=new rt,P=new L;let v=0;const M=x===!0?t:e,w=x===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,m*w,0),u.push(0,w,0),f.push(.5,.5),g++;const b=g;for(let I=0;I<=s;I++){const X=I/s*l+o,N=Math.cos(X),G=Math.sin(X);P.x=M*G,P.y=m*w,P.z=M*N,d.push(P.x,P.y,P.z),u.push(0,w,0),A.x=N*.5+.5,A.y=G*.5*w+.5,f.push(A.x,A.y),g++}for(let I=0;I<s;I++){const B=R+I,X=b+I;x===!0?h.push(X,X+1,B):h.push(X+1,X,B),v+=3}c.addGroup(p,v,x===!0?1:2),p+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _n{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Vt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new rt:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],a=[],o=new L,l=new ne;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos($t(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos($t(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class hl extends _n{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new rt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class If extends hl{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ul(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const gc=new L,_c=new L,fa=new ul,pa=new ul,ma=new ul;class Df extends _n{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(_c.subVectors(s[0],s[1]).add(s[0]),c=_c);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(gc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=gc),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),fa.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,y,m),pa.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,y,m),ma.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,y,m)}else this.curveType==="catmullrom"&&(fa.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),pa.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),ma.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(fa.calc(l),pa.calc(l),ma.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function vc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Nf(i,t){const e=1-i;return e*e*t}function Uf(i,t){return 2*(1-i)*i*t}function Ff(i,t){return i*i*t}function _s(i,t,e,n){return Nf(i,t)+Uf(i,e)+Ff(i,n)}function Of(i,t){const e=1-i;return e*e*e*t}function Bf(i,t){const e=1-i;return 3*e*e*i*t}function kf(i,t){return 3*(1-i)*i*i*t}function zf(i,t){return i*i*i*t}function vs(i,t,e,n,s){return Of(i,t)+Bf(i,e)+kf(i,n)+zf(i,s)}class $h extends _n{constructor(t=new rt,e=new rt,n=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vs(t,s.x,r.x,a.x,o.x),vs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vf extends _n{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vs(t,s.x,r.x,a.x,o.x),vs(t,s.y,r.y,a.y,o.y),vs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Qh extends _n{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gf extends _n{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jh extends _n{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(_s(t,s.x,r.x,a.x),_s(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dl extends _n{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(_s(t,s.x,r.x,a.x),_s(t,s.y,r.y,a.y),_s(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class tu extends _n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(vc(o,l.x,c.x,h.x,d.x),vc(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new rt().fromArray(s))}return this}}var Rr=Object.freeze({__proto__:null,ArcCurve:If,CatmullRomCurve3:Df,CubicBezierCurve:$h,CubicBezierCurve3:Vf,EllipseCurve:hl,LineCurve:Qh,LineCurve3:Gf,QuadraticBezierCurve:jh,QuadraticBezierCurve3:dl,SplineCurve:tu});class Hf extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Rr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Rr[s.type]().fromJSON(s))}return this}}class Yi extends Hf{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Qh(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new jh(this.currentPoint.clone(),new rt(t,e),new rt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new $h(this.currentPoint.clone(),new rt(t,e),new rt(n,s),new rt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new tu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new hl(t,e,n,s,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Nr extends Yi{constructor(t){super(t),this.uuid=pi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Yi().fromJSON(s))}return this}}function Wf(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=eu(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Zf(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,d=l;for(let u=e;u<s;u+=e){const f=i[u],g=i[u+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return ws(r,a,e,o,l,c,0),a}function eu(i,t,e,n,s){let r;if(s===ap(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=xc(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=xc(a/n|0,i[a],i[a+1],r);return r&&Ki(r,r.next)&&(As(r),r=r.next),r}function ui(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ki(e,e.next)||pe(e.prev,e,e.next)===0)){if(As(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ws(i,t,e,n,s,r,a){if(!i)return;!a&&r&&tp(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?qf(i,n,s,r):Xf(i)){t.push(l.i,i.i,c.i),As(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Yf(ui(i),t),ws(i,t,e,n,s,r,2)):a===2&&Kf(i,t,e,n,s,r):ws(ui(i),t,e,n,s,r,1);break}}}function Xf(i){const t=i.prev,e=i,n=i.next;if(pe(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&fs(s,o,r,l,a,c,g.x,g.y)&&pe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function qf(i,t,e,n){const s=i.prev,r=i,a=i.next;if(pe(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),g=Math.min(h,d,u),y=Math.max(o,l,c),m=Math.max(h,d,u),p=Po(f,g,t,e,n),E=Po(y,m,t,e,n);let T=i.prevZ,x=i.nextZ;for(;T&&T.z>=p&&x&&x.z<=E;){if(T.x>=f&&T.x<=y&&T.y>=g&&T.y<=m&&T!==s&&T!==a&&fs(o,h,l,d,c,u,T.x,T.y)&&pe(T.prev,T,T.next)>=0||(T=T.prevZ,x.x>=f&&x.x<=y&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&fs(o,h,l,d,c,u,x.x,x.y)&&pe(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;T&&T.z>=p;){if(T.x>=f&&T.x<=y&&T.y>=g&&T.y<=m&&T!==s&&T!==a&&fs(o,h,l,d,c,u,T.x,T.y)&&pe(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;x&&x.z<=E;){if(x.x>=f&&x.x<=y&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&fs(o,h,l,d,c,u,x.x,x.y)&&pe(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Yf(i,t){let e=i;do{const n=e.prev,s=e.next.next;!Ki(n,s)&&iu(n,e,e.next,s)&&Es(n,s)&&Es(s,n)&&(t.push(n.i,e.i,s.i),As(e),As(e.next),e=i=s),e=e.next}while(e!==i);return ui(e)}function Kf(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ip(a,o)){let l=su(a,o);a=ui(a,a.next),l=ui(l,l.next),ws(a,t,e,n,s,r,0),ws(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Zf(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=eu(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(np(c))}s.sort(Jf);for(let r=0;r<s.length;r++)e=$f(s[r],e);return e}function Jf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function $f(i,t){const e=Qf(i,t);if(!e)return t;const n=su(e,i);return ui(n,n.next),ui(e,e.next)}function Qf(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(Ki(i,e))return e;do{if(Ki(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&nu(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const d=Math.abs(s-e.y)/(n-e.x);Es(e,i)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&jf(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function jf(i,t){return pe(i.prev,i,t.prev)<0&&pe(t.next,i,i.next)<0}function tp(i,t,e,n){let s=i;do s.z===0&&(s.z=Po(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,ep(s)}function ep(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Po(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function np(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function nu(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function fs(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&nu(i,t,e,n,s,r,a,o)}function ip(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!sp(i,t)&&(Es(i,t)&&Es(t,i)&&rp(i,t)&&(pe(i.prev,i,t.prev)||pe(i,t.prev,t))||Ki(i,t)&&pe(i.prev,i,i.next)>0&&pe(t.prev,t,t.next)>0)}function pe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ki(i,t){return i.x===t.x&&i.y===t.y}function iu(i,t,e,n){const s=js(pe(i,t,e)),r=js(pe(i,t,n)),a=js(pe(e,n,i)),o=js(pe(e,n,t));return!!(s!==r&&a!==o||s===0&&Qs(i,e,t)||r===0&&Qs(i,n,t)||a===0&&Qs(e,i,n)||o===0&&Qs(e,t,n))}function Qs(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function js(i){return i>0?1:i<0?-1:0}function sp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&iu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Es(i,t){return pe(i.prev,i,i.next)<0?pe(i,t,i.next)>=0&&pe(i,i.prev,t)>=0:pe(i,t,i.prev)<0||pe(i,i.next,t)<0}function rp(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function su(i,t){const e=Lo(i.i,i.x,i.y),n=Lo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function xc(i,t,e,n){const s=Lo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function As(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Lo(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ap(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class op{static triangulate(t,e,n=2){return Wf(t,e,n)}}class Vi{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Vi.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Mc(t),yc(n,t);let a=t.length;e.forEach(Mc);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,yc(n,e[l]);const o=op.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Mc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function yc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class fl extends Se{constructor(t=new Nr([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new ee(s,3)),this.setAttribute("uv",new ee(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:lp;let T,x=!1,R,A,P,v;if(p){T=p.getSpacedPoints(h),x=!0,u=!1;const j=p.isCatmullRomCurve3?p.closed:!1;R=p.computeFrenetFrames(h,j),A=new L,P=new L,v=new L}u||(m=0,f=0,g=0,y=0);const M=o.extractPoints(c);let w=M.shape;const b=M.holes;if(!Vi.isClockWise(w)){w=w.reverse();for(let j=0,et=b.length;j<et;j++){const tt=b[j];Vi.isClockWise(tt)&&(b[j]=tt.reverse())}}function B(j){const tt=10000000000000001e-36;let ut=j[0];for(let at=1;at<=j.length;at++){const At=at%j.length,bt=j[At],Gt=bt.x-ut.x,Wt=bt.y-ut.y,D=Gt*Gt+Wt*Wt,ae=Math.max(Math.abs(bt.x),Math.abs(bt.y),Math.abs(ut.x),Math.abs(ut.y)),Qt=tt*ae*ae;if(D<=Qt){j.splice(At,1),at--;continue}ut=bt}}B(w),b.forEach(B);const X=b.length,N=w;for(let j=0;j<X;j++){const et=b[j];w=w.concat(et)}function G(j,et,tt){return et||jt("ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(et,tt)}const z=w.length;function J(j,et,tt){let ut,at,At;const bt=j.x-et.x,Gt=j.y-et.y,Wt=tt.x-j.x,D=tt.y-j.y,ae=bt*bt+Gt*Gt,Qt=bt*D-Gt*Wt;if(Math.abs(Qt)>Number.EPSILON){const C=Math.sqrt(ae),_=Math.sqrt(Wt*Wt+D*D),k=et.x-Gt/C,W=et.y+bt/C,Y=tt.x-D/_,lt=tt.y+Wt/_,dt=((Y-k)*D-(lt-W)*Wt)/(bt*D-Gt*Wt);ut=k+bt*dt-j.x,at=W+Gt*dt-j.y;const K=ut*ut+at*at;if(K<=2)return new rt(ut,at);At=Math.sqrt(K/2)}else{let C=!1;bt>Number.EPSILON?Wt>Number.EPSILON&&(C=!0):bt<-Number.EPSILON?Wt<-Number.EPSILON&&(C=!0):Math.sign(Gt)===Math.sign(D)&&(C=!0),C?(ut=-Gt,at=bt,At=Math.sqrt(ae)):(ut=bt,at=Gt,At=Math.sqrt(ae/2))}return new rt(ut/At,at/At)}const it=[];for(let j=0,et=N.length,tt=et-1,ut=j+1;j<et;j++,tt++,ut++)tt===et&&(tt=0),ut===et&&(ut=0),it[j]=J(N[j],N[tt],N[ut]);const ht=[];let ct,xt=it.concat();for(let j=0,et=X;j<et;j++){const tt=b[j];ct=[];for(let ut=0,at=tt.length,At=at-1,bt=ut+1;ut<at;ut++,At++,bt++)At===at&&(At=0),bt===at&&(bt=0),ct[ut]=J(tt[ut],tt[At],tt[bt]);ht.push(ct),xt=xt.concat(ct)}let Ht;if(m===0)Ht=Vi.triangulateShape(N,b);else{const j=[],et=[];for(let tt=0;tt<m;tt++){const ut=tt/m,at=f*Math.cos(ut*Math.PI/2),At=g*Math.sin(ut*Math.PI/2)+y;for(let bt=0,Gt=N.length;bt<Gt;bt++){const Wt=G(N[bt],it[bt],At);Rt(Wt.x,Wt.y,-at),ut===0&&j.push(Wt)}for(let bt=0,Gt=X;bt<Gt;bt++){const Wt=b[bt];ct=ht[bt];const D=[];for(let ae=0,Qt=Wt.length;ae<Qt;ae++){const C=G(Wt[ae],ct[ae],At);Rt(C.x,C.y,-at),ut===0&&D.push(C)}ut===0&&et.push(D)}}Ht=Vi.triangulateShape(j,et)}const ie=Ht.length,Kt=g+y;for(let j=0;j<z;j++){const et=u?G(w[j],xt[j],Kt):w[j];x?(P.copy(R.normals[0]).multiplyScalar(et.x),A.copy(R.binormals[0]).multiplyScalar(et.y),v.copy(T[0]).add(P).add(A),Rt(v.x,v.y,v.z)):Rt(et.x,et.y,0)}for(let j=1;j<=h;j++)for(let et=0;et<z;et++){const tt=u?G(w[et],xt[et],Kt):w[et];x?(P.copy(R.normals[j]).multiplyScalar(tt.x),A.copy(R.binormals[j]).multiplyScalar(tt.y),v.copy(T[j]).add(P).add(A),Rt(v.x,v.y,v.z)):Rt(tt.x,tt.y,d/h*j)}for(let j=m-1;j>=0;j--){const et=j/m,tt=f*Math.cos(et*Math.PI/2),ut=g*Math.sin(et*Math.PI/2)+y;for(let at=0,At=N.length;at<At;at++){const bt=G(N[at],it[at],ut);Rt(bt.x,bt.y,d+tt)}for(let at=0,At=b.length;at<At;at++){const bt=b[at];ct=ht[at];for(let Gt=0,Wt=bt.length;Gt<Wt;Gt++){const D=G(bt[Gt],ct[Gt],ut);x?Rt(D.x,D.y+T[h-1].y,T[h-1].x+tt):Rt(D.x,D.y,d+tt)}}}Z(),ot();function Z(){const j=s.length/3;if(u){let et=0,tt=z*et;for(let ut=0;ut<ie;ut++){const at=Ht[ut];Ot(at[2]+tt,at[1]+tt,at[0]+tt)}et=h+m*2,tt=z*et;for(let ut=0;ut<ie;ut++){const at=Ht[ut];Ot(at[0]+tt,at[1]+tt,at[2]+tt)}}else{for(let et=0;et<ie;et++){const tt=Ht[et];Ot(tt[2],tt[1],tt[0])}for(let et=0;et<ie;et++){const tt=Ht[et];Ot(tt[0]+z*h,tt[1]+z*h,tt[2]+z*h)}}n.addGroup(j,s.length/3-j,0)}function ot(){const j=s.length/3;let et=0;st(N,et),et+=N.length;for(let tt=0,ut=b.length;tt<ut;tt++){const at=b[tt];st(at,et),et+=at.length}n.addGroup(j,s.length/3-j,1)}function st(j,et){let tt=j.length;for(;--tt>=0;){const ut=tt;let at=tt-1;at<0&&(at=j.length-1);for(let At=0,bt=h+m*2;At<bt;At++){const Gt=z*At,Wt=z*(At+1),D=et+ut+Gt,ae=et+at+Gt,Qt=et+at+Wt,C=et+ut+Wt;Lt(D,ae,Qt,C)}}}function Rt(j,et,tt){l.push(j),l.push(et),l.push(tt)}function Ot(j,et,tt){zt(j),zt(et),zt(tt);const ut=s.length/3,at=E.generateTopUV(n,s,ut-3,ut-2,ut-1);Ct(at[0]),Ct(at[1]),Ct(at[2])}function Lt(j,et,tt,ut){zt(j),zt(et),zt(ut),zt(et),zt(tt),zt(ut);const at=s.length/3,At=E.generateSideWallUV(n,s,at-6,at-3,at-2,at-1);Ct(At[0]),Ct(At[1]),Ct(At[3]),Ct(At[1]),Ct(At[2]),Ct(At[3])}function zt(j){s.push(l[j*3+0]),s.push(l[j*3+1]),s.push(l[j*3+2])}function Ct(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return cp(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Rr[s.type]().fromJSON(s)),new fl(n,t.options)}}const lp={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new rt(r,a),new rt(o,l),new rt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],g=t[s*3+2],y=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new rt(a,1-l),new rt(c,1-d),new rt(u,1-g),new rt(y,1-p)]:[new rt(o,1-l),new rt(h,1-d),new rt(f,1-g),new rt(m,1-p)]}};function cp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class pl extends Se{constructor(t=[new rt(0,-.5),new rt(.5,0),new rt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=$t(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,d=new L,u=new rt,f=new L,g=new L,y=new L;let m=0,p=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-m,f.z=p*0,y.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(y.x,y.y,y.z);break;default:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=y.x,f.y+=y.y,f.z+=y.z,f.normalize(),l.push(f.x,f.y,f.z),y.copy(g)}for(let E=0;E<=e;E++){const T=n+E*h*s,x=Math.sin(T),R=Math.cos(T);for(let A=0;A<=t.length-1;A++){d.x=t[A].x*x,d.y=t[A].y,d.z=t[A].x*R,a.push(d.x,d.y,d.z),u.x=E/e,u.y=A/(t.length-1),o.push(u.x,u.y);const P=l[3*A+0]*x,v=l[3*A+1],M=l[3*A+0]*R;c.push(P,v,M)}}for(let E=0;E<e;E++)for(let T=0;T<t.length-1;T++){const x=T+E*t.length,R=x,A=x+t.length,P=x+t.length+1,v=x+1;r.push(R,A,v),r.push(P,v,A)}this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("uv",new ee(o,2)),this.setAttribute("normal",new ee(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pl(t.points,t.segments,t.phiStart,t.phiLength)}}class Rs extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],y=[],m=[];for(let p=0;p<h;p++){const E=p*u-a;for(let T=0;T<c;T++){const x=T*d-r;g.push(x,-E,0),y.push(0,0,1),m.push(T/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const T=E+c*p,x=E+c*(p+1),R=E+1+c*(p+1),A=E+1+c*p;f.push(T,x,A),f.push(x,R,A)}this.setIndex(f),this.setAttribute("position",new ee(g,3)),this.setAttribute("normal",new ee(y,3)),this.setAttribute("uv",new ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ur extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new L,u=new L,f=[],g=[],y=[],m=[];for(let p=0;p<=n;p++){const E=[],T=p/n,x=a+T*o,R=t*Math.cos(x),A=Math.sqrt(t*t-R*R);let P=0;p===0&&a===0?P=.5/e:p===n&&l===Math.PI&&(P=-.5/e);for(let v=0;v<=e;v++){const M=v/e,w=s+M*r;d.x=-A*Math.cos(w),d.y=R,d.z=A*Math.sin(w),g.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(M+P,1-T),E.push(c++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){const T=h[p][E+1],x=h[p][E],R=h[p+1][E],A=h[p+1][E+1];(p!==0||a>0)&&f.push(T,x,A),(p!==n-1||l<Math.PI)&&f.push(x,R,A)}this.setIndex(f),this.setAttribute("position",new ee(g,3)),this.setAttribute("normal",new ee(y,3)),this.setAttribute("uv",new ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ur(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ml extends Se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],u=new L,f=new L,g=new L;for(let y=0;y<=n;y++){const m=a+y/n*o;for(let p=0;p<=s;p++){const E=p/s*r;f.x=(t+e*Math.cos(m))*Math.cos(E),f.y=(t+e*Math.cos(m))*Math.sin(E),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(E),u.y=t*Math.sin(E),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/s),d.push(y/n)}}for(let y=1;y<=n;y++)for(let m=1;m<=s;m++){const p=(s+1)*y+m-1,E=(s+1)*(y-1)+m-1,T=(s+1)*(y-1)+m,x=(s+1)*y+m;l.push(p,E,x),l.push(E,T,x)}this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ml(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class gl extends Se{constructor(t=new dl(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new L,l=new L,c=new rt;let h=new L;const d=[],u=[],f=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new ee(d,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2));function y(){for(let T=0;T<e;T++)m(T);m(r===!1?e:0),E(),p()}function m(T){h=t.getPointAt(T/e,h);const x=a.normals[T],R=a.binormals[T];for(let A=0;A<=s;A++){const P=A/s*Math.PI*2,v=Math.sin(P),M=-Math.cos(P);l.x=M*x.x+v*R.x,l.y=M*x.y+v*R.y,l.z=M*x.z+v*R.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let T=1;T<=e;T++)for(let x=1;x<=s;x++){const R=(s+1)*(T-1)+(x-1),A=(s+1)*T+(x-1),P=(s+1)*T+x,v=(s+1)*(T-1)+x;g.push(R,A,v),g.push(A,P,v)}}function E(){for(let T=0;T<=e;T++)for(let x=0;x<=s;x++)c.x=T/e,c.y=x/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new gl(new Rr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Zi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Sc(s))s.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Sc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Oe(i){const t={};for(let e=0;e<i.length;e++){const n=Zi(i[e]);for(const s in n)t[s]=n[s]}return t}function Sc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function hp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ru(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const up={clone:Zi,merge:Oe};var dp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qe extends gi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dp,this.fragmentShader=fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=hp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Dt().setHex(s.value);break;case"v2":this.uniforms[n].value=new rt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new fe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ne().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class pp extends qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Cr extends gi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wr,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Me,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class mp extends gi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wr,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Me,this.combine=Xo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gp extends gi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class _p extends gi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class _l extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class vp extends _l{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const ga=new ne,bc=new L,wc=new L;class au{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=Xe,this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ol,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;bc.setFromMatrixPosition(t.matrixWorld),e.position.copy(bc),wc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(wc),e.updateMatrixWorld(),ga.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Ss||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const tr=new L,er=new qn,an=new L;class ou extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(tr,er,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tr,er,an.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(tr,er,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tr,er,an.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new L,Ec=new rt,Ac=new rt;class We extends ou{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=bs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,Ec,Ac),e.subVectors(Ac,Ec)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ms*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class xp extends au{constructor(){super(new We(90,1,.5,500)),this.isPointLightShadow=!0}}class Mp extends _l{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new xp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class vl extends ou{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class yp extends au{constructor(){super(new vl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tc extends _l{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new yp}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Ii=-90,Di=1;class Sp extends Ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new We(Ii,Di,t,e);s.layers=this.layers,this.add(s);const r=new We(Ii,Di,t,e);r.layers=this.layers,this.add(r);const a=new We(Ii,Di,t,e);a.layers=this.layers,this.add(a);const o=new We(Ii,Di,t,e);o.layers=this.layers,this.add(o);const l=new We(Ii,Di,t,e);l.layers=this.layers,this.add(l);const c=new We(Ii,Di,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class bp extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Rc=new ne;class Io{constructor(t,e,n=0,s=1/0){this.ray=new rl(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new sl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):jt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Rc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rc),this}intersectObject(t,e=!0,n=[]){return Do(t,this,n,e),n.sort(Cc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Do(t[s],this,n,e);return n.sort(Cc),n}}function Cc(i,t){return i.distance-t.distance}function Do(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Do(r[a],t,e,!0)}}const Tl=class Tl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Tl.prototype.isMatrix2=!0;let Pc=Tl;function Lc(i,t,e,n){const s=wp(n);switch(e){case zh:return i*t;case Jo:return i*t/s.components*s.byteLength;case $o:return i*t/s.components*s.byteLength;case hi:return i*t*2/s.components*s.byteLength;case Qo:return i*t*2/s.components*s.byteLength;case Vh:return i*t*3/s.components*s.byteLength;case tn:return i*t*4/s.components*s.byteLength;case jo:return i*t*4/s.components*s.byteLength;case ur:case dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case fr:case pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ja:case eo:return Math.max(i,16)*Math.max(t,8)/4;case Qa:case to:return Math.max(i,8)*Math.max(t,8)/2;case no:case io:case ro:case ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case so:case Sr:case oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case co:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case uo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case fo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case po:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case mo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case go:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case vo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case xo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case yo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case So:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case bo:case wo:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ao:case To:return Math.ceil(i/4)*Math.ceil(t/4)*8;case br:case Ro:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wp(i){switch(i){case Xe:case Fh:return{byteLength:1,components:1};case Ms:case Oh:case Pn:return{byteLength:2,components:1};case Ko:case Zo:return{byteLength:2,components:4};case pn:case Yo:case je:return{byteLength:4,components:1};case Bh:case kh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wo}}));typeof window<"u"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function lu(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ep(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],y=d[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const y=d[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Ap=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ip=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Dp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Np=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Up=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Zp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$p=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,em=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nm="gl_FragColor = linearToOutputTexel( gl_FragColor );",im=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,rm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,am=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,om=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,um=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,pm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_m=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,vm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ym=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Em=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Am=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Cm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Im=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Um=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Om=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,km=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Zm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$m=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,t0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,n0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,i0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,s0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,a0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,l0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,c0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,h0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,u0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,d0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,f0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,p0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,m0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,g0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,v0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,x0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,M0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,y0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,S0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,b0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,E0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const A0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,T0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,D0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,N0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,U0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,F0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,O0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,z0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,V0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,H0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,X0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Y0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,K0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,eg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ng=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:Ap,alphahash_pars_fragment:Tp,alphamap_fragment:Rp,alphamap_pars_fragment:Cp,alphatest_fragment:Pp,alphatest_pars_fragment:Lp,aomap_fragment:Ip,aomap_pars_fragment:Dp,batching_pars_vertex:Np,batching_vertex:Up,begin_vertex:Fp,beginnormal_vertex:Op,bsdfs:Bp,iridescence_fragment:kp,bumpmap_pars_fragment:zp,clipping_planes_fragment:Vp,clipping_planes_pars_fragment:Gp,clipping_planes_pars_vertex:Hp,clipping_planes_vertex:Wp,color_fragment:Xp,color_pars_fragment:qp,color_pars_vertex:Yp,color_vertex:Kp,common:Zp,cube_uv_reflection_fragment:Jp,defaultnormal_vertex:$p,displacementmap_pars_vertex:Qp,displacementmap_vertex:jp,emissivemap_fragment:tm,emissivemap_pars_fragment:em,colorspace_fragment:nm,colorspace_pars_fragment:im,envmap_fragment:sm,envmap_common_pars_fragment:rm,envmap_pars_fragment:am,envmap_pars_vertex:om,envmap_physical_pars_fragment:vm,envmap_vertex:lm,fog_vertex:cm,fog_pars_vertex:hm,fog_fragment:um,fog_pars_fragment:dm,gradientmap_pars_fragment:fm,lightmap_pars_fragment:pm,lights_lambert_fragment:mm,lights_lambert_pars_fragment:gm,lights_pars_begin:_m,lights_toon_fragment:xm,lights_toon_pars_fragment:Mm,lights_phong_fragment:ym,lights_phong_pars_fragment:Sm,lights_physical_fragment:bm,lights_physical_pars_fragment:wm,lights_fragment_begin:Em,lights_fragment_maps:Am,lights_fragment_end:Tm,lightprobes_pars_fragment:Rm,logdepthbuf_fragment:Cm,logdepthbuf_pars_fragment:Pm,logdepthbuf_pars_vertex:Lm,logdepthbuf_vertex:Im,map_fragment:Dm,map_pars_fragment:Nm,map_particle_fragment:Um,map_particle_pars_fragment:Fm,metalnessmap_fragment:Om,metalnessmap_pars_fragment:Bm,morphinstance_vertex:km,morphcolor_vertex:zm,morphnormal_vertex:Vm,morphtarget_pars_vertex:Gm,morphtarget_vertex:Hm,normal_fragment_begin:Wm,normal_fragment_maps:Xm,normal_pars_fragment:qm,normal_pars_vertex:Ym,normal_vertex:Km,normalmap_pars_fragment:Zm,clearcoat_normal_fragment_begin:Jm,clearcoat_normal_fragment_maps:$m,clearcoat_pars_fragment:Qm,iridescence_pars_fragment:jm,opaque_fragment:t0,packing:e0,premultiplied_alpha_fragment:n0,project_vertex:i0,dithering_fragment:s0,dithering_pars_fragment:r0,roughnessmap_fragment:a0,roughnessmap_pars_fragment:o0,shadowmap_pars_fragment:l0,shadowmap_pars_vertex:c0,shadowmap_vertex:h0,shadowmask_pars_fragment:u0,skinbase_vertex:d0,skinning_pars_vertex:f0,skinning_vertex:p0,skinnormal_vertex:m0,specularmap_fragment:g0,specularmap_pars_fragment:_0,tonemapping_fragment:v0,tonemapping_pars_fragment:x0,transmission_fragment:M0,transmission_pars_fragment:y0,uv_pars_fragment:S0,uv_pars_vertex:b0,uv_vertex:w0,worldpos_vertex:E0,background_vert:A0,background_frag:T0,backgroundCube_vert:R0,backgroundCube_frag:C0,cube_vert:P0,cube_frag:L0,depth_vert:I0,depth_frag:D0,distance_vert:N0,distance_frag:U0,equirect_vert:F0,equirect_frag:O0,linedashed_vert:B0,linedashed_frag:k0,meshbasic_vert:z0,meshbasic_frag:V0,meshlambert_vert:G0,meshlambert_frag:H0,meshmatcap_vert:W0,meshmatcap_frag:X0,meshnormal_vert:q0,meshnormal_frag:Y0,meshphong_vert:K0,meshphong_frag:Z0,meshphysical_vert:J0,meshphysical_frag:$0,meshtoon_vert:Q0,meshtoon_frag:j0,points_vert:tg,points_frag:eg,shadow_vert:ng,shadow_frag:ig,sprite_vert:sg,sprite_frag:rg},vt={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},hn={basic:{uniforms:Oe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Oe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Dt(0)},envMapIntensity:{value:1}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Oe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Oe([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Oe([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Oe([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Oe([vt.points,vt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Oe([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Oe([vt.common,vt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Oe([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Oe([vt.sprite,vt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distance:{uniforms:Oe([vt.common,vt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distance_vert,fragmentShader:Zt.distance_frag},shadow:{uniforms:Oe([vt.lights,vt.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};hn.physical={uniforms:Oe([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const nr={r:0,b:0,g:0},ag=new ne,cu=new Xt;cu.set(-1,0,0,0,1,0,0,0,1);function og(i,t,e,n,s,r){const a=new Dt(0);let o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(E){let T=E.isScene===!0?E.background:null;if(T&&T.isTexture){const x=E.backgroundBlurriness>0;T=t.get(T,x)}return T}function g(E){let T=!1;const x=f(E);x===null?m(a,o):x&&x.isColor&&(m(x,1),T=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?e.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(E,T){const x=f(T);x&&(x.isCubeTexture||x.mapping===Dr)?(c===void 0&&(c=new de(new _i(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:Zi(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ag.makeRotationFromEuler(T.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(cu),c.material.toneMapped=te.getTransfer(x.colorSpace)!==re,(h!==x||d!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new de(new Rs(2,2),new qe({name:"BackgroundMaterial",uniforms:Zi(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=te.getTransfer(x.colorSpace)!==re,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function m(E,T){E.getRGB(nr,ru(i)),e.buffers.color.setClear(nr.r,nr.g,nr.b,T,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,T=1){a.set(E),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,m(a,o)},render:g,addToRenderList:y,dispose:p}}function lg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(b,I,B,X,N){let G=!1;const z=d(b,X,B,I);r!==z&&(r=z,c(r.object)),G=f(b,X,B,N),G&&g(b,X,B,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,x(b,I,B,X),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function d(b,I,B,X){const N=X.wireframe===!0;let G=n[I.id];G===void 0&&(G={},n[I.id]=G);const z=b.isInstancedMesh===!0?b.id:0;let J=G[z];J===void 0&&(J={},G[z]=J);let it=J[B.id];it===void 0&&(it={},J[B.id]=it);let ht=it[N];return ht===void 0&&(ht=u(l()),it[N]=ht),ht}function u(b){const I=[],B=[],X=[];for(let N=0;N<e;N++)I[N]=0,B[N]=0,X[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:X,object:b,attributes:{},index:null}}function f(b,I,B,X){const N=r.attributes,G=I.attributes;let z=0;const J=B.getAttributes();for(const it in J)if(J[it].location>=0){const ct=N[it];let xt=G[it];if(xt===void 0&&(it==="instanceMatrix"&&b.instanceMatrix&&(xt=b.instanceMatrix),it==="instanceColor"&&b.instanceColor&&(xt=b.instanceColor)),ct===void 0||ct.attribute!==xt||xt&&ct.data!==xt.data)return!0;z++}return r.attributesNum!==z||r.index!==X}function g(b,I,B,X){const N={},G=I.attributes;let z=0;const J=B.getAttributes();for(const it in J)if(J[it].location>=0){let ct=G[it];ct===void 0&&(it==="instanceMatrix"&&b.instanceMatrix&&(ct=b.instanceMatrix),it==="instanceColor"&&b.instanceColor&&(ct=b.instanceColor));const xt={};xt.attribute=ct,ct&&ct.data&&(xt.data=ct.data),N[it]=xt,z++}r.attributes=N,r.attributesNum=z,r.index=X}function y(){const b=r.newAttributes;for(let I=0,B=b.length;I<B;I++)b[I]=0}function m(b){p(b,0)}function p(b,I){const B=r.newAttributes,X=r.enabledAttributes,N=r.attributeDivisors;B[b]=1,X[b]===0&&(i.enableVertexAttribArray(b),X[b]=1),N[b]!==I&&(i.vertexAttribDivisor(b,I),N[b]=I)}function E(){const b=r.newAttributes,I=r.enabledAttributes;for(let B=0,X=I.length;B<X;B++)I[B]!==b[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function T(b,I,B,X,N,G,z){z===!0?i.vertexAttribIPointer(b,I,B,N,G):i.vertexAttribPointer(b,I,B,X,N,G)}function x(b,I,B,X){y();const N=X.attributes,G=B.getAttributes(),z=I.defaultAttributeValues;for(const J in G){const it=G[J];if(it.location>=0){let ht=N[J];if(ht===void 0&&(J==="instanceMatrix"&&b.instanceMatrix&&(ht=b.instanceMatrix),J==="instanceColor"&&b.instanceColor&&(ht=b.instanceColor)),ht!==void 0){const ct=ht.normalized,xt=ht.itemSize,Ht=t.get(ht);if(Ht===void 0)continue;const ie=Ht.buffer,Kt=Ht.type,Z=Ht.bytesPerElement,ot=Kt===i.INT||Kt===i.UNSIGNED_INT||ht.gpuType===Yo;if(ht.isInterleavedBufferAttribute){const st=ht.data,Rt=st.stride,Ot=ht.offset;if(st.isInstancedInterleavedBuffer){for(let Lt=0;Lt<it.locationSize;Lt++)p(it.location+Lt,st.meshPerAttribute);b.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Lt=0;Lt<it.locationSize;Lt++)m(it.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Lt=0;Lt<it.locationSize;Lt++)T(it.location+Lt,xt/it.locationSize,Kt,ct,Rt*Z,(Ot+xt/it.locationSize*Lt)*Z,ot)}else{if(ht.isInstancedBufferAttribute){for(let st=0;st<it.locationSize;st++)p(it.location+st,ht.meshPerAttribute);b.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let st=0;st<it.locationSize;st++)m(it.location+st);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let st=0;st<it.locationSize;st++)T(it.location+st,xt/it.locationSize,Kt,ct,xt*Z,xt/it.locationSize*st*Z,ot)}}else if(z!==void 0){const ct=z[J];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(it.location,ct);break;case 3:i.vertexAttrib3fv(it.location,ct);break;case 4:i.vertexAttrib4fv(it.location,ct);break;default:i.vertexAttrib1fv(it.location,ct)}}}}E()}function R(){M();for(const b in n){const I=n[b];for(const B in I){const X=I[B];for(const N in X){const G=X[N];for(const z in G)h(G[z].object),delete G[z];delete X[N]}}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const I=n[b.id];for(const B in I){const X=I[B];for(const N in X){const G=X[N];for(const z in G)h(G[z].object),delete G[z];delete X[N]}}delete n[b.id]}function P(b){for(const I in n){const B=n[I];for(const X in B){const N=B[X];if(N[b.id]===void 0)continue;const G=N[b.id];for(const z in G)h(G[z].object),delete G[z];delete N[b.id]}}}function v(b){for(const I in n){const B=n[I],X=b.isInstancedMesh===!0?b.id:0,N=B[X];if(N!==void 0){for(const G in N){const z=N[G];for(const J in z)h(z[J].object),delete z[J];delete N[G]}delete B[X],Object.keys(B).length===0&&delete n[I]}}}function M(){w(),a=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:M,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:y,enableAttribute:m,disableUnusedAttributes:E}}function cg(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function hg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==tn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===Pn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Xe&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==je&&!v)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Vt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:x,maxSamples:R,samples:A}}function ug(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new ei,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const E=r?0:n,T=E*4;let x=p.clippingState||null;l.value=x,x=h(g,u,T,f);for(let R=0;R!==T;++R)x[R]=e[R];p.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const p=f+y*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,x=f;T!==y;++T,x+=4)a.copy(d[T]).applyMatrix4(E,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}const Wn=4,Ic=[.125,.215,.35,.446,.526,.582],si=20,dg=256,as=new vl,Dc=new Dt;let _a=null,va=0,xa=0,Ma=!1;const fg=new L;class No{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=fg}=r;_a=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(_a,va,xa),this._renderer.xr.enabled=Ma,t.scissorTest=!1,Ni(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ci||t.mapping===Xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_a=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:De,minFilter:De,generateMipmaps:!1,type:Pn,format:tn,colorSpace:Er,depthBuffer:!1},s=Nc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=pg(r)),this._blurMaterial=gg(r,t,e),this._ggxMaterial=mg(r,t,e)}return s}_compileMaterial(t){const e=new de(new Se,t);this._renderer.compile(e,as)}_sceneToCubeUV(t,e,n,s,r){const l=new We(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Dc),d.toneMapping=dn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new de(new _i,new al({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let p=!1;const E=t.background;E?E.isColor&&(m.color.copy(E),t.background=null,p=!0):(m.color.copy(Dc),p=!0);for(let T=0;T<6;T++){const x=T%3;x===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):x===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));const R=this._cubeSize;Ni(s,x*R,T>2?R:0,R,R),d.setRenderTarget(s),p&&d.render(y,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=E}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ci||t.mapping===Xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ni(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,as)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:g}=this,y=this._sizeLods[n],m=3*y*(n>g-Wn?n-g+Wn:0),p=4*(this._cubeSize-y);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,Ni(r,m,p,3*y,2*y),s.setRenderTarget(r),s.render(o,as),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Ni(t,m,p,3*y,2*y),s.setRenderTarget(t),s.render(o,as)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&jt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*si-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):si;m>si&&Vt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const p=[];let E=0;for(let P=0;P<si;++P){const v=P/y,M=Math.exp(-v*v/2);p.push(M),P===0?E+=M:P<m&&(E+=2*M)}for(let P=0;P<p.length;P++)p[P]=p[P]/E;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:T}=this;u.dTheta.value=g,u.mipInt.value=T-n;const x=this._sizeLods[s],R=3*x*(s>T-Wn?s-T+Wn:0),A=4*(this._cubeSize-x);Ni(e,R,A,3*x,2*x),l.setRenderTarget(e),l.render(d,as)}}function pg(i){const t=[],e=[],n=[];let s=i;const r=i-Wn+1+Ic.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Wn?l=Ic[a-i+Wn-1]:a===0&&(l=0),e.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,y=3,m=2,p=1,E=new Float32Array(y*g*f),T=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let A=0;A<f;A++){const P=A%3*2/3-1,v=A>2?0:-1,M=[P,v,0,P+2/3,v,0,P+2/3,v+1,0,P,v,0,P+2/3,v+1,0,P,v+1,0];E.set(M,y*g*A),T.set(u,m*g*A);const w=[A,A,A,A,A,A];x.set(w,p*g*A)}const R=new Se;R.setAttribute("position",new we(E,y)),R.setAttribute("uv",new we(T,m)),R.setAttribute("faceIndex",new we(x,p)),n.push(new de(R,null)),s>Wn&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Nc(i,t,e){const n=new fn(i,t,e);return n.texture.mapping=Dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ni(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function mg(i,t,e){return new qe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function gg(i,t,e){const n=new Float32Array(si),s=new L(0,1,0);return new qe({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Uc(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Fc(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Fr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class hu extends fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Zh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new _i(5,5,5),r=new qe({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:Tn});r.uniforms.tEquirect.value=e;const a=new de(s,r),o=e.minFilter;return e.minFilter===ri&&(e.minFilter=De),new Sp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function _g(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Gr||f===Hr)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const y=new hu(g.height);return y.fromEquirectangularTexture(i,u),t.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===Gr||f===Hr,y=f===ci||f===Xi;if(g||y){let m=e.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new No(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const E=u.image;return g&&E&&E.height>0||y&&E&&l(E)?(n===null&&(n=new No(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Gr?u.mapping=ci:f===Hr&&(u.mapping=Xi),u}function l(u){let f=0;const g=6;for(let y=0;y<g;y++)u[y]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function vg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Gi("WebGLRenderer: "+n+" extension not supported."),s}}}function xg(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let y=0;if(g===void 0)return;if(f!==null){const E=f.array;y=f.version;for(let T=0,x=E.length;T<x;T+=3){const R=E[T+0],A=E[T+1],P=E[T+2];u.push(R,A,A,P,P,R)}}else{const E=g.array;y=g.version;for(let T=0,x=E.length/3-1;T<x;T+=3){const R=T+0,A=T+1,P=T+2;u.push(R,A,A,P,P,R)}}const m=new(g.count>=65535?Yh:qh)(u,1);m.version=y;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Mg(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let m=0;m<f;m++)y+=u[m];e.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function yg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Sg(i,t,e){const n=new WeakMap,s=new fe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let w=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",w)};var f=w;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),y===!0&&(x=2),m===!0&&(x=3);let R=o.attributes.position.count*x,A=1;R>t.maxTextureSize&&(A=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const P=new Float32Array(R*A*4*d),v=new Hh(P,R,A,d);v.type=je,v.needsUpdate=!0;const M=x*4;for(let b=0;b<d;b++){const I=p[b],B=E[b],X=T[b],N=R*A*4*b;for(let G=0;G<I.count;G++){const z=G*M;g===!0&&(s.fromBufferAttribute(I,G),P[N+z+0]=s.x,P[N+z+1]=s.y,P[N+z+2]=s.z,P[N+z+3]=0),y===!0&&(s.fromBufferAttribute(B,G),P[N+z+4]=s.x,P[N+z+5]=s.y,P[N+z+6]=s.z,P[N+z+7]=0),m===!0&&(s.fromBufferAttribute(X,G),P[N+z+8]=s.x,P[N+z+9]=s.y,P[N+z+10]=s.z,P[N+z+11]=X.itemSize===4?s.w:1)}}u={count:d,texture:v,size:new rt(R,A)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function bg(i,t,e,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const wg={[Ch]:"LINEAR_TONE_MAPPING",[Ph]:"REINHARD_TONE_MAPPING",[Lh]:"CINEON_TONE_MAPPING",[qo]:"ACES_FILMIC_TONE_MAPPING",[Dh]:"AGX_TONE_MAPPING",[Nh]:"NEUTRAL_TONE_MAPPING",[Ih]:"CUSTOM_TONE_MAPPING"};function Eg(i,t,e,n,s,r){const a=new fn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new qi(t,e):void 0}),o=new fn(t,e,{type:Pn,depthBuffer:!1,stencilBuffer:!1}),l=new Se;l.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ee([0,2,0,0,2,0],2));const c=new pp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new de(l,c),d=new vl(-1,1,1,-1,0,1);let u=null,f=null,g=!1,y,m=null,p=[],E=!1;this.setSize=function(T,x){a.setSize(T,x),o.setSize(T,x);for(let R=0;R<p.length;R++){const A=p[R];A.setSize&&A.setSize(T,x)}},this.setEffects=function(T){p=T,E=p.length>0&&p[0].isRenderPass===!0;const x=a.width,R=a.height;for(let A=0;A<p.length;A++){const P=p[A];P.setSize&&P.setSize(x,R)}},this.begin=function(T,x){if(g||T.toneMapping===dn&&p.length===0)return!1;if(m=x,x!==null){const R=x.width,A=x.height;(a.width!==R||a.height!==A)&&this.setSize(R,A)}return E===!1&&T.setRenderTarget(a),y=T.toneMapping,T.toneMapping=dn,!0},this.hasRenderPass=function(){return E},this.end=function(T,x){T.toneMapping=y,g=!0;let R=a,A=o;for(let P=0;P<p.length;P++){const v=p[P];if(v.enabled!==!1&&(v.render(T,A,R,x),v.needsSwap!==!1)){const M=R;R=A,A=M}}if(u!==T.outputColorSpace||f!==T.toneMapping){u=T.outputColorSpace,f=T.toneMapping,c.defines={},te.getTransfer(u)===re&&(c.defines.SRGB_TRANSFER="");const P=wg[f];P&&(c.defines[P]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=R.texture,T.setRenderTarget(m),T.render(h,d),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const uu=new Be,Uo=new qi(1,1),du=new Hh,fu=new uf,pu=new Zh,Oc=[],Bc=[],kc=new Float32Array(16),zc=new Float32Array(9),Vc=new Float32Array(4);function Qi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Oc[s];if(r===void 0&&(r=new Float32Array(s),Oc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Or(i,t){let e=Bc[t];e===void 0&&(e=new Int32Array(t),Bc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ag(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Tg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function Rg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function Cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function Pg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;Vc.set(n),i.uniformMatrix2fv(this.addr,!1,Vc),Te(e,n)}}function Lg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;zc.set(n),i.uniformMatrix3fv(this.addr,!1,zc),Te(e,n)}}function Ig(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ae(e,n))return;kc.set(n),i.uniformMatrix4fv(this.addr,!1,kc),Te(e,n)}}function Dg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function Ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function Fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function Og(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function kg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function Vg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Uo.compareFunction=e.isReversedDepthBuffer()?el:tl,r=Uo):r=uu,e.setTexture2D(t||r,s)}function Gg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||fu,s)}function Hg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||pu,s)}function Wg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||du,s)}function Xg(i){switch(i){case 5126:return Ag;case 35664:return Tg;case 35665:return Rg;case 35666:return Cg;case 35674:return Pg;case 35675:return Lg;case 35676:return Ig;case 5124:case 35670:return Dg;case 35667:case 35671:return Ng;case 35668:case 35672:return Ug;case 35669:case 35673:return Fg;case 5125:return Og;case 36294:return Bg;case 36295:return kg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Vg;case 35679:case 36299:case 36307:return Gg;case 35680:case 36300:case 36308:case 36293:return Hg;case 36289:case 36303:case 36311:case 36292:return Wg}}function qg(i,t){i.uniform1fv(this.addr,t)}function Yg(i,t){const e=Qi(t,this.size,2);i.uniform2fv(this.addr,e)}function Kg(i,t){const e=Qi(t,this.size,3);i.uniform3fv(this.addr,e)}function Zg(i,t){const e=Qi(t,this.size,4);i.uniform4fv(this.addr,e)}function Jg(i,t){const e=Qi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function $g(i,t){const e=Qi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Qg(i,t){const e=Qi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function jg(i,t){i.uniform1iv(this.addr,t)}function t_(i,t){i.uniform2iv(this.addr,t)}function e_(i,t){i.uniform3iv(this.addr,t)}function n_(i,t){i.uniform4iv(this.addr,t)}function i_(i,t){i.uniform1uiv(this.addr,t)}function s_(i,t){i.uniform2uiv(this.addr,t)}function r_(i,t){i.uniform3uiv(this.addr,t)}function a_(i,t){i.uniform4uiv(this.addr,t)}function o_(i,t,e){const n=this.cache,s=t.length,r=Or(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Uo:a=uu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function l_(i,t,e){const n=this.cache,s=t.length,r=Or(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||fu,r[a])}function c_(i,t,e){const n=this.cache,s=t.length,r=Or(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||pu,r[a])}function h_(i,t,e){const n=this.cache,s=t.length,r=Or(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||du,r[a])}function u_(i){switch(i){case 5126:return qg;case 35664:return Yg;case 35665:return Kg;case 35666:return Zg;case 35674:return Jg;case 35675:return $g;case 35676:return Qg;case 5124:case 35670:return jg;case 35667:case 35671:return t_;case 35668:case 35672:return e_;case 35669:case 35673:return n_;case 5125:return i_;case 36294:return s_;case 36295:return r_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return c_;case 36289:case 36303:case 36311:case 36292:return h_}}class d_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Xg(e.type)}}class f_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=u_(e.type)}}class p_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function Gc(i,t){i.seq.push(t),i.map[t.id]=t}function m_(i,t,e){const n=i.name,s=n.length;for(ya.lastIndex=0;;){const r=ya.exec(n),a=ya.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Gc(e,c===void 0?new d_(o,i,t):new f_(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new p_(o),Gc(e,d)),e=d}}}class mr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);m_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Hc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const g_=37297;let __=0;function v_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Wc=new Xt;function x_(i){te._getMatrix(Wc,te.workingColorSpace,i);const t=`mat3( ${Wc.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case Ar:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Xc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+v_(i.getShaderSource(t),o)}else return r}function M_(i,t){const e=x_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const y_={[Ch]:"Linear",[Ph]:"Reinhard",[Lh]:"Cineon",[qo]:"ACESFilmic",[Dh]:"AgX",[Nh]:"Neutral",[Ih]:"Custom"};function S_(i,t){const e=y_[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ir=new L;function b_(){te.getLuminanceCoefficients(ir);const i=ir.x.toFixed(4),t=ir.y.toFixed(4),e=ir.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function E_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function A_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ps(i){return i!==""}function qc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const T_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fo(i){return i.replace(T_,C_)}const R_=new Map;function C_(i,t){let e=Zt[t];if(e===void 0){const n=R_.get(t);if(n!==void 0)e=Zt[n],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Fo(e)}const P_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kc(i){return i.replace(P_,L_)}function L_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Zc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const I_={[hr]:"SHADOWMAP_TYPE_PCF",[ds]:"SHADOWMAP_TYPE_VSM"};function D_(i){return I_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const N_={[ci]:"ENVMAP_TYPE_CUBE",[Xi]:"ENVMAP_TYPE_CUBE",[Dr]:"ENVMAP_TYPE_CUBE_UV"};function U_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":N_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const F_={[Xi]:"ENVMAP_MODE_REFRACTION"};function O_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":F_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const B_={[Xo]:"ENVMAP_BLENDING_MULTIPLY",[Td]:"ENVMAP_BLENDING_MIX",[Rd]:"ENVMAP_BLENDING_ADD"};function k_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":B_[i.combine]||"ENVMAP_BLENDING_NONE"}function z_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function V_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=D_(e),c=U_(e),h=O_(e),d=k_(e),u=z_(e),f=w_(e),g=E_(r),y=s.createProgram();let m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),p.length>0&&(p+=`
`)):(m=[Zc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),p=[Zc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==dn?"#define TONE_MAPPING":"",e.toneMapping!==dn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==dn?S_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,M_("linearToOutputTexel",e.outputColorSpace),b_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),a=Fo(a),a=qc(a,e),a=Yc(a,e),o=Fo(o),o=qc(o,e),o=Yc(o,e),a=Kc(a),o=Kc(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=E+m+a,x=E+p+o,R=Hc(s,s.VERTEX_SHADER,T),A=Hc(s,s.FRAGMENT_SHADER,x);s.attachShader(y,R),s.attachShader(y,A),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function P(b){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(y)||"",B=s.getShaderInfoLog(R)||"",X=s.getShaderInfoLog(A)||"",N=I.trim(),G=B.trim(),z=X.trim();let J=!0,it=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,R,A);else{const ht=Xc(s,R,"vertex"),ct=Xc(s,A,"fragment");jt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+N+`
`+ht+`
`+ct)}else N!==""?Vt("WebGLProgram: Program Info Log:",N):(G===""||z==="")&&(it=!1);it&&(b.diagnostics={runnable:J,programLog:N,vertexShader:{log:G,prefix:m},fragmentShader:{log:z,prefix:p}})}s.deleteShader(R),s.deleteShader(A),v=new mr(s,y),M=A_(s,y)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let M;this.getAttributes=function(){return M===void 0&&P(this),M};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(y,g_)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=__++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=A,this}let G_=0;class H_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new W_(t),e.set(t,n)),n}}class W_{constructor(t){this.id=G_++,this.code=t,this.usedTimes=0}}function X_(i){return i===hi||i===Sr||i===br}function q_(i,t,e,n,s,r){const a=new sl,o=new H_,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function y(v,M,w,b,I,B){const X=b.fog,N=I.geometry,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?b.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,J=t.get(v.envMap||G,z),it=J&&J.mapping===Dr?J.image.height:null,ht=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Vt("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const ct=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,xt=ct!==void 0?ct.length:0;let Ht=0;N.morphAttributes.position!==void 0&&(Ht=1),N.morphAttributes.normal!==void 0&&(Ht=2),N.morphAttributes.color!==void 0&&(Ht=3);let ie,Kt,Z,ot;if(ht){const Tt=hn[ht];ie=Tt.vertexShader,Kt=Tt.fragmentShader}else{ie=v.vertexShader,Kt=v.fragmentShader;const Tt=o.getVertexShaderStage(v),me=o.getFragmentShaderStage(v);o.update(v,Tt,me),Z=Tt.id,ot=me.id}const st=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Ot=I.isInstancedMesh===!0,Lt=I.isBatchedMesh===!0,zt=!!v.map,Ct=!!v.matcap,j=!!J,et=!!v.aoMap,tt=!!v.lightMap,ut=!!v.bumpMap&&v.wireframe===!1,at=!!v.normalMap,At=!!v.displacementMap,bt=!!v.emissiveMap,Gt=!!v.metalnessMap,Wt=!!v.roughnessMap,D=v.anisotropy>0,ae=v.clearcoat>0,Qt=v.dispersion>0,C=v.iridescence>0,_=v.sheen>0,k=v.transmission>0,W=D&&!!v.anisotropyMap,Y=ae&&!!v.clearcoatMap,lt=ae&&!!v.clearcoatNormalMap,dt=ae&&!!v.clearcoatRoughnessMap,K=C&&!!v.iridescenceMap,Q=C&&!!v.iridescenceThicknessMap,pt=_&&!!v.sheenColorMap,Nt=_&&!!v.sheenRoughnessMap,_t=!!v.specularMap,mt=!!v.specularColorMap,Bt=!!v.specularIntensityMap,kt=k&&!!v.transmissionMap,qt=k&&!!v.thicknessMap,U=!!v.gradientMap,ft=!!v.alphaMap,$=v.alphaTest>0,gt=!!v.alphaHash,St=!!v.extensions;let nt=dn;v.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(nt=i.toneMapping);const It={shaderID:ht,shaderType:v.type,shaderName:v.name,vertexShader:ie,fragmentShader:Kt,defines:v.defines,customVertexShaderID:Z,customFragmentShaderID:ot,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Lt,batchingColor:Lt&&I._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&I.instanceColor!==null,instancingMorph:Ot&&I.morphTexture!==null,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:te.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:zt,matcap:Ct,envMap:j,envMapMode:j&&J.mapping,envMapCubeUVHeight:it,aoMap:et,lightMap:tt,bumpMap:ut,normalMap:at,displacementMap:At,emissiveMap:bt,normalMapObjectSpace:at&&v.normalMapType===Ld,normalMapTangentSpace:at&&v.normalMapType===wr,packedNormalMap:at&&v.normalMapType===wr&&X_(v.normalMap.format),metalnessMap:Gt,roughnessMap:Wt,anisotropy:D,anisotropyMap:W,clearcoat:ae,clearcoatMap:Y,clearcoatNormalMap:lt,clearcoatRoughnessMap:dt,dispersion:Qt,iridescence:C,iridescenceMap:K,iridescenceThicknessMap:Q,sheen:_,sheenColorMap:pt,sheenRoughnessMap:Nt,specularMap:_t,specularColorMap:mt,specularIntensityMap:Bt,transmission:k,transmissionMap:kt,thicknessMap:qt,gradientMap:U,opaque:v.transparent===!1&&v.blending===oi&&v.alphaToCoverage===!1,alphaMap:ft,alphaTest:$,alphaHash:gt,combine:v.combine,mapUv:zt&&g(v.map.channel),aoMapUv:et&&g(v.aoMap.channel),lightMapUv:tt&&g(v.lightMap.channel),bumpMapUv:ut&&g(v.bumpMap.channel),normalMapUv:at&&g(v.normalMap.channel),displacementMapUv:At&&g(v.displacementMap.channel),emissiveMapUv:bt&&g(v.emissiveMap.channel),metalnessMapUv:Gt&&g(v.metalnessMap.channel),roughnessMapUv:Wt&&g(v.roughnessMap.channel),anisotropyMapUv:W&&g(v.anisotropyMap.channel),clearcoatMapUv:Y&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:lt&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&g(v.sheenRoughnessMap.channel),specularMapUv:_t&&g(v.specularMap.channel),specularColorMapUv:mt&&g(v.specularColorMap.channel),specularIntensityMapUv:Bt&&g(v.specularIntensityMap.channel),transmissionMapUv:kt&&g(v.transmissionMap.channel),thicknessMapUv:qt&&g(v.thicknessMap.channel),alphaMapUv:ft&&g(v.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(at||D),vertexNormals:!!N.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!N.attributes.uv&&(zt||ft),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||N.attributes.normal===void 0&&at===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Rt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Ht,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:nt,decodeVideoTexture:zt&&v.map.isVideoTexture===!0&&te.getTransfer(v.map.colorSpace)===re,decodeVideoTextureEmissive:bt&&v.emissiveMap.isVideoTexture===!0&&te.getTransfer(v.emissiveMap.colorSpace)===re,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===wn,flipSided:v.side===Ne,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:St&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(St&&v.extensions.multiDraw===!0||Lt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return It.vertexUv1s=l.has(1),It.vertexUv2s=l.has(2),It.vertexUv3s=l.has(3),l.clear(),It}function m(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const w in v.defines)M.push(w),M.push(v.defines[w]);return v.isRawShaderMaterial===!1&&(p(M,v),E(M,v),M.push(i.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function p(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function E(v,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function T(v){const M=f[v.type];let w;if(M){const b=hn[M];w=up.clone(b.uniforms)}else w=v.uniforms;return w}function x(v,M){let w=h.get(M);return w!==void 0?++w.usedTimes:(w=new V_(i,M,v,s),c.push(w),h.set(M,w)),w}function R(v){if(--v.usedTimes===0){const M=c.indexOf(v);c[M]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function P(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:T,acquireProgram:x,releaseProgram:R,releaseShaderCache:A,programs:c,dispose:P}}function Y_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function K_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Jc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function $c(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,y,m,p){let E=i[t];return E===void 0?(E={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:m,group:p},i[t]=E):(E.id=u.id,E.object=u,E.geometry=f,E.material=g,E.materialVariant=a(u),E.groupOrder=y,E.renderOrder=u.renderOrder,E.z=m,E.group=p),t++,E}function l(u,f,g,y,m,p){const E=o(u,f,g,y,m,p);g.transmission>0?n.push(E):g.transparent===!0?s.push(E):e.push(E)}function c(u,f,g,y,m,p){const E=o(u,f,g,y,m,p);g.transmission>0?n.unshift(E):g.transparent===!0?s.unshift(E):e.unshift(E)}function h(u,f,g){e.length>1&&e.sort(u||K_),n.length>1&&n.sort(f||Jc),s.length>1&&s.sort(f||Jc),g&&(e.reverse(),n.reverse(),s.reverse())}function d(){for(let u=t,f=i.length;u<f;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function Z_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new $c,i.set(n,[a])):s>=r.length?(a=new $c,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function J_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Dt};break;case"SpotLight":e={position:new L,direction:new L,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function $_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Q_=0;function j_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function tv(i){const t=new J_,e=$_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new ne,a=new ne;function o(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,y=0,m=0,p=0,E=0,T=0,x=0,R=0,A=0,P=0;c.sort(j_);for(let M=0,w=c.length;M<w;M++){const b=c[M],I=b.color,B=b.intensity,X=b.distance;let N=null;if(b.shadow&&b.shadow.map&&(b.shadow.map.texture.format===hi?N=b.shadow.map.texture:N=b.shadow.map.depthTexture||b.shadow.map.texture),b.isAmbientLight)h+=I.r*B,d+=I.g*B,u+=I.b*B;else if(b.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(b.sh.coefficients[G],B);P++}else if(b.isDirectionalLight){const G=t.get(b);if(G.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const z=b.shadow,J=e.get(b);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=N,n.directionalShadowMatrix[f]=b.shadow.matrix,E++}n.directional[f]=G,f++}else if(b.isSpotLight){const G=t.get(b);G.position.setFromMatrixPosition(b.matrixWorld),G.color.copy(I).multiplyScalar(B),G.distance=X,G.coneCos=Math.cos(b.angle),G.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),G.decay=b.decay,n.spot[y]=G;const z=b.shadow;if(b.map&&(n.spotLightMap[R]=b.map,R++,z.updateMatrices(b),b.castShadow&&A++),n.spotLightMatrix[y]=z.matrix,b.castShadow){const J=e.get(b);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,n.spotShadow[y]=J,n.spotShadowMap[y]=N,x++}y++}else if(b.isRectAreaLight){const G=t.get(b);G.color.copy(I).multiplyScalar(B),G.halfWidth.set(b.width*.5,0,0),G.halfHeight.set(0,b.height*.5,0),n.rectArea[m]=G,m++}else if(b.isPointLight){const G=t.get(b);if(G.color.copy(b.color).multiplyScalar(b.intensity),G.distance=b.distance,G.decay=b.decay,b.castShadow){const z=b.shadow,J=e.get(b);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,J.shadowCameraNear=z.camera.near,J.shadowCameraFar=z.camera.far,n.pointShadow[g]=J,n.pointShadowMap[g]=N,n.pointShadowMatrix[g]=b.shadow.matrix,T++}n.point[g]=G,g++}else if(b.isHemisphereLight){const G=t.get(b);G.skyColor.copy(b.color).multiplyScalar(B),G.groundColor.copy(b.groundColor).multiplyScalar(B),n.hemi[p]=G,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=vt.LTC_FLOAT_1,n.rectAreaLTC2=vt.LTC_FLOAT_2):(n.rectAreaLTC1=vt.LTC_HALF_1,n.rectAreaLTC2=vt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const v=n.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==y||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==E||v.numPointShadows!==T||v.numSpotShadows!==x||v.numSpotMaps!==R||v.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=x+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,v.directionalLength=f,v.pointLength=g,v.spotLength=y,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=E,v.numPointShadows=T,v.numSpotShadows=x,v.numSpotMaps=R,v.numLightProbes=P,n.version=Q_++)}function l(c,h){let d=0,u=0,f=0,g=0,y=0;const m=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const T=c[p];if(T.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(T.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(T.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),u++}else if(T.isHemisphereLight){const x=n.hemi[y];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(m),y++}}}return{setup:o,setupView:l,state:n}}function Qc(i){const t=new tv(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function ev(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Qc(i),t.set(s,[o])):r>=a.length?(o=new Qc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const nv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,sv=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],rv=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],jc=new ne,os=new L,Sa=new L;function av(i,t,e){let n=new ol;const s=new rt,r=new rt,a=new fe,o=new gp,l=new _p,c={},h=e.maxTextureSize,d={[Xn]:Ne,[Ne]:Xn,[wn]:wn},u=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:nv,fragmentShader:iv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new we(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new de(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hr;let p=this.type;this.render=function(A,P,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===ld&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=hr);const M=i.getRenderTarget(),w=i.getActiveCubeFace(),b=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Tn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const B=p!==this.type;B&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(N=>N.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,N=A.length;X<N;X++){const G=A[X],z=G.shadow;if(z===void 0){Vt("WebGLShadowMap:",G,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const J=z.getFrameExtents();s.multiply(J),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,z.mapSize.y=r.y));const it=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=it,z.map===null||B===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===ds){if(G.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new fn(s.x,s.y,{format:hi,type:Pn,minFilter:De,magFilter:De,generateMipmaps:!1}),z.map.texture.name=G.name+".shadowMap",z.map.depthTexture=new qi(s.x,s.y,je),z.map.depthTexture.name=G.name+".shadowMapDepth",z.map.depthTexture.format=Ln,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ce,z.map.depthTexture.magFilter=Ce}else G.isPointLight?(z.map=new hu(s.x),z.map.depthTexture=new Lf(s.x,pn)):(z.map=new fn(s.x,s.y),z.map.depthTexture=new qi(s.x,s.y,pn)),z.map.depthTexture.name=G.name+".shadowMap",z.map.depthTexture.format=Ln,this.type===hr?(z.map.depthTexture.compareFunction=it?el:tl,z.map.depthTexture.minFilter=De,z.map.depthTexture.magFilter=De):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ce,z.map.depthTexture.magFilter=Ce);z.camera.updateProjectionMatrix()}const ht=z.map.isWebGLCubeRenderTarget?6:1;for(let ct=0;ct<ht;ct++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,ct),i.clear();else{ct===0&&(i.setRenderTarget(z.map),i.clear());const xt=z.getViewport(ct);a.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),I.viewport(a)}if(G.isPointLight){const xt=z.camera,Ht=z.matrix,ie=G.distance||xt.far;ie!==xt.far&&(xt.far=ie,xt.updateProjectionMatrix()),os.setFromMatrixPosition(G.matrixWorld),xt.position.copy(os),Sa.copy(xt.position),Sa.add(sv[ct]),xt.up.copy(rv[ct]),xt.lookAt(Sa),xt.updateMatrixWorld(),Ht.makeTranslation(-os.x,-os.y,-os.z),jc.multiplyMatrices(xt.projectionMatrix,xt.matrixWorldInverse),z._frustum.setFromProjectionMatrix(jc,xt.coordinateSystem,xt.reversedDepth)}else z.updateMatrices(G);n=z.getFrustum(),x(P,v,z.camera,G,this.type)}z.isPointLightShadow!==!0&&this.type===ds&&E(z,v),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,w,b)};function E(A,P){const v=t.update(y);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new fn(s.x,s.y,{format:hi,type:Pn})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(P,null,v,u,y,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(P,null,v,f,y,null)}function T(A,P,v,M){let w=null;const b=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(b!==void 0)w=b;else if(w=v.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const I=w.uuid,B=P.uuid;let X=c[I];X===void 0&&(X={},c[I]=X);let N=X[B];N===void 0&&(N=w.clone(),X[B]=N,P.addEventListener("dispose",R)),w=N}if(w.visible=P.visible,w.wireframe=P.wireframe,M===ds?w.side=P.shadowSide!==null?P.shadowSide:P.side:w.side=P.shadowSide!==null?P.shadowSide:d[P.side],w.alphaMap=P.alphaMap,w.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,w.map=P.map,w.clipShadows=P.clipShadows,w.clippingPlanes=P.clippingPlanes,w.clipIntersection=P.clipIntersection,w.displacementMap=P.displacementMap,w.displacementScale=P.displacementScale,w.displacementBias=P.displacementBias,w.wireframeLinewidth=P.wireframeLinewidth,w.linewidth=P.linewidth,v.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const I=i.properties.get(w);I.light=v}return w}function x(A,P,v,M,w){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===ds)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const B=t.update(A),X=A.material;if(Array.isArray(X)){const N=B.groups;for(let G=0,z=N.length;G<z;G++){const J=N[G],it=X[J.materialIndex];if(it&&it.visible){const ht=T(A,it,M,w);A.onBeforeShadow(i,A,P,v,B,ht,J),i.renderBufferDirect(v,null,B,ht,A,J),A.onAfterShadow(i,A,P,v,B,ht,J)}}}else if(X.visible){const N=T(A,X,M,w);A.onBeforeShadow(i,A,P,v,B,N,null),i.renderBufferDirect(v,null,B,N,A,null),A.onAfterShadow(i,A,P,v,B,N,null)}}const I=A.children;for(let B=0,X=I.length;B<X;B++)x(I[B],P,v,M,w)}function R(A){A.target.removeEventListener("dispose",R);for(const v in c){const M=c[v],w=A.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function ov(i,t){function e(){let U=!1;const ft=new fe;let $=null;const gt=new fe(0,0,0,0);return{setMask:function(St){$!==St&&!U&&(i.colorMask(St,St,St,St),$=St)},setLocked:function(St){U=St},setClear:function(St,nt,It,Tt,me){me===!0&&(St*=Tt,nt*=Tt,It*=Tt),ft.set(St,nt,It,Tt),gt.equals(ft)===!1&&(i.clearColor(St,nt,It,Tt),gt.copy(ft))},reset:function(){U=!1,$=null,gt.set(-1,0,0,0)}}}function n(){let U=!1,ft=!1,$=null,gt=null,St=null;return{setReversed:function(nt){if(ft!==nt){const It=t.get("EXT_clip_control");nt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),ft=nt;const Tt=St;St=null,this.setClear(Tt)}},getReversed:function(){return ft},setTest:function(nt){nt?st(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(nt){$!==nt&&!U&&(i.depthMask(nt),$=nt)},setFunc:function(nt){if(ft&&(nt=Vd[nt]),gt!==nt){switch(nt){case Ha:i.depthFunc(i.NEVER);break;case Wa:i.depthFunc(i.ALWAYS);break;case Xa:i.depthFunc(i.LESS);break;case Wi:i.depthFunc(i.LEQUAL);break;case qa:i.depthFunc(i.EQUAL);break;case Ya:i.depthFunc(i.GEQUAL);break;case Ka:i.depthFunc(i.GREATER);break;case Za:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}gt=nt}},setLocked:function(nt){U=nt},setClear:function(nt){St!==nt&&(St=nt,ft&&(nt=1-nt),i.clearDepth(nt))},reset:function(){U=!1,$=null,gt=null,St=null,ft=!1}}}function s(){let U=!1,ft=null,$=null,gt=null,St=null,nt=null,It=null,Tt=null,me=null;return{setTest:function(he){U||(he?st(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(he){ft!==he&&!U&&(i.stencilMask(he),ft=he)},setFunc:function(he,nn,sn){($!==he||gt!==nn||St!==sn)&&(i.stencilFunc(he,nn,sn),$=he,gt=nn,St=sn)},setOp:function(he,nn,sn){(nt!==he||It!==nn||Tt!==sn)&&(i.stencilOp(he,nn,sn),nt=he,It=nn,Tt=sn)},setLocked:function(he){U=he},setClear:function(he){me!==he&&(i.clearStencil(he),me=he)},reset:function(){U=!1,ft=null,$=null,gt=null,St=null,nt=null,It=null,Tt=null,me=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},f=new WeakMap,g=[],y=null,m=!1,p=null,E=null,T=null,x=null,R=null,A=null,P=null,v=new Dt(0,0,0),M=0,w=!1,b=null,I=null,B=null,X=null,N=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,J=0;const it=i.getParameter(i.VERSION);it.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(it)[1]),z=J>=1):it.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),z=J>=2);let ht=null,ct={};const xt=i.getParameter(i.SCISSOR_BOX),Ht=i.getParameter(i.VIEWPORT),ie=new fe().fromArray(xt),Kt=new fe().fromArray(Ht);function Z(U,ft,$,gt){const St=new Uint8Array(4),nt=i.createTexture();i.bindTexture(U,nt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let It=0;It<$;It++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,gt,0,i.RGBA,i.UNSIGNED_BYTE,St):i.texImage2D(ft+It,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,St);return nt}const ot={};ot[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),ot[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ot[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(i.DEPTH_TEST),a.setFunc(Wi),ut(!1),at(Gl),st(i.CULL_FACE),et(Tn);function st(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Rt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ot(U,ft){return u[U]!==ft?(i.bindFramebuffer(U,ft),u[U]=ft,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function Lt(U,ft){let $=g,gt=!1;if(U){$=f.get(ft),$===void 0&&($=[],f.set(ft,$));const St=U.textures;if($.length!==St.length||$[0]!==i.COLOR_ATTACHMENT0){for(let nt=0,It=St.length;nt<It;nt++)$[nt]=i.COLOR_ATTACHMENT0+nt;$.length=St.length,gt=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,gt=!0);gt&&i.drawBuffers($)}function zt(U){return y!==U?(i.useProgram(U),y=U,!0):!1}const Ct={[ii]:i.FUNC_ADD,[hd]:i.FUNC_SUBTRACT,[ud]:i.FUNC_REVERSE_SUBTRACT};Ct[dd]=i.MIN,Ct[fd]=i.MAX;const j={[pd]:i.ZERO,[md]:i.ONE,[gd]:i.SRC_COLOR,[Va]:i.SRC_ALPHA,[Sd]:i.SRC_ALPHA_SATURATE,[Md]:i.DST_COLOR,[vd]:i.DST_ALPHA,[_d]:i.ONE_MINUS_SRC_COLOR,[Ga]:i.ONE_MINUS_SRC_ALPHA,[yd]:i.ONE_MINUS_DST_COLOR,[xd]:i.ONE_MINUS_DST_ALPHA,[bd]:i.CONSTANT_COLOR,[wd]:i.ONE_MINUS_CONSTANT_COLOR,[Ed]:i.CONSTANT_ALPHA,[Ad]:i.ONE_MINUS_CONSTANT_ALPHA};function et(U,ft,$,gt,St,nt,It,Tt,me,he){if(U===Tn){m===!0&&(Rt(i.BLEND),m=!1);return}if(m===!1&&(st(i.BLEND),m=!0),U!==cd){if(U!==p||he!==w){if((E!==ii||R!==ii)&&(i.blendEquation(i.FUNC_ADD),E=ii,R=ii),he)switch(U){case oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case za:i.blendFunc(i.ONE,i.ONE);break;case Hl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:jt("WebGLState: Invalid blending: ",U);break}else switch(U){case oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case za:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Hl:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wl:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",U);break}T=null,x=null,A=null,P=null,v.set(0,0,0),M=0,p=U,w=he}return}St=St||ft,nt=nt||$,It=It||gt,(ft!==E||St!==R)&&(i.blendEquationSeparate(Ct[ft],Ct[St]),E=ft,R=St),($!==T||gt!==x||nt!==A||It!==P)&&(i.blendFuncSeparate(j[$],j[gt],j[nt],j[It]),T=$,x=gt,A=nt,P=It),(Tt.equals(v)===!1||me!==M)&&(i.blendColor(Tt.r,Tt.g,Tt.b,me),v.copy(Tt),M=me),p=U,w=!1}function tt(U,ft){U.side===wn?Rt(i.CULL_FACE):st(i.CULL_FACE);let $=U.side===Ne;ft&&($=!$),ut($),U.blending===oi&&U.transparent===!1?et(Tn):et(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const gt=U.stencilWrite;o.setTest(gt),gt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),bt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ut(U){b!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),b=U)}function at(U){U!==ad?(st(i.CULL_FACE),U!==I&&(U===Gl?i.cullFace(i.BACK):U===od?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),I=U}function At(U){U!==B&&(z&&i.lineWidth(U),B=U)}function bt(U,ft,$){U?(st(i.POLYGON_OFFSET_FILL),(X!==ft||N!==$)&&(X=ft,N=$,a.getReversed()&&(ft=-ft),i.polygonOffset(ft,$))):Rt(i.POLYGON_OFFSET_FILL)}function Gt(U){U?st(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function Wt(U){U===void 0&&(U=i.TEXTURE0+G-1),ht!==U&&(i.activeTexture(U),ht=U)}function D(U,ft,$){$===void 0&&(ht===null?$=i.TEXTURE0+G-1:$=ht);let gt=ct[$];gt===void 0&&(gt={type:void 0,texture:void 0},ct[$]=gt),(gt.type!==U||gt.texture!==ft)&&(ht!==$&&(i.activeTexture($),ht=$),i.bindTexture(U,ft||ot[U]),gt.type=U,gt.texture=ft)}function ae(){const U=ct[ht];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Qt(){try{i.compressedTexImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function _(){try{i.texSubImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function k(){try{i.texSubImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function lt(){try{i.texStorage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function dt(){try{i.texStorage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function K(){try{i.texImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function Q(){try{i.texImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function pt(U){return d[U]!==void 0?d[U]:i.getParameter(U)}function Nt(U,ft){d[U]!==ft&&(i.pixelStorei(U,ft),d[U]=ft)}function _t(U){ie.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ie.copy(U))}function mt(U){Kt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Kt.copy(U))}function Bt(U,ft){let $=c.get(ft);$===void 0&&($=new WeakMap,c.set(ft,$));let gt=$.get(U);gt===void 0&&(gt=i.getUniformBlockIndex(ft,U.name),$.set(U,gt))}function kt(U,ft){const gt=c.get(ft).get(U);l.get(ft)!==gt&&(i.uniformBlockBinding(ft,gt,U.__bindingPointIndex),l.set(ft,gt))}function qt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ht=null,ct={},u={},f=new WeakMap,g=[],y=null,m=!1,p=null,E=null,T=null,x=null,R=null,A=null,P=null,v=new Dt(0,0,0),M=0,w=!1,b=null,I=null,B=null,X=null,N=null,ie.set(0,0,i.canvas.width,i.canvas.height),Kt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:st,disable:Rt,bindFramebuffer:Ot,drawBuffers:Lt,useProgram:zt,setBlending:et,setMaterial:tt,setFlipSided:ut,setCullFace:at,setLineWidth:At,setPolygonOffset:bt,setScissorTest:Gt,activeTexture:Wt,bindTexture:D,unbindTexture:ae,compressedTexImage2D:Qt,compressedTexImage3D:C,texImage2D:K,texImage3D:Q,pixelStorei:Nt,getParameter:pt,updateUBOMapping:Bt,uniformBlockBinding:kt,texStorage2D:lt,texStorage3D:dt,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:W,compressedTexSubImage3D:Y,scissor:_t,viewport:mt,reset:qt}}function lv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,_){return g?new OffscreenCanvas(C,_):Tr("canvas")}function m(C,_,k){let W=1;const Y=Qt(C);if((Y.width>k||Y.height>k)&&(W=k/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const lt=Math.floor(W*Y.width),dt=Math.floor(W*Y.height);u===void 0&&(u=y(lt,dt));const K=_?y(lt,dt):u;return K.width=lt,K.height=dt,K.getContext("2d").drawImage(C,0,0,lt,dt),Vt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+lt+"x"+dt+")."),K}else return"data"in C&&Vt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),C;return C}function p(C){return C.generateMipmaps}function E(C){i.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(C,_,k,W,Y,lt=!1){if(C!==null){if(i[C]!==void 0)return i[C];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let dt;W&&(dt=t.get("EXT_texture_norm16"),dt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=_;if(_===i.RED&&(k===i.FLOAT&&(K=i.R32F),k===i.HALF_FLOAT&&(K=i.R16F),k===i.UNSIGNED_BYTE&&(K=i.R8),k===i.UNSIGNED_SHORT&&dt&&(K=dt.R16_EXT),k===i.SHORT&&dt&&(K=dt.R16_SNORM_EXT)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.R8UI),k===i.UNSIGNED_SHORT&&(K=i.R16UI),k===i.UNSIGNED_INT&&(K=i.R32UI),k===i.BYTE&&(K=i.R8I),k===i.SHORT&&(K=i.R16I),k===i.INT&&(K=i.R32I)),_===i.RG&&(k===i.FLOAT&&(K=i.RG32F),k===i.HALF_FLOAT&&(K=i.RG16F),k===i.UNSIGNED_BYTE&&(K=i.RG8),k===i.UNSIGNED_SHORT&&dt&&(K=dt.RG16_EXT),k===i.SHORT&&dt&&(K=dt.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RG8UI),k===i.UNSIGNED_SHORT&&(K=i.RG16UI),k===i.UNSIGNED_INT&&(K=i.RG32UI),k===i.BYTE&&(K=i.RG8I),k===i.SHORT&&(K=i.RG16I),k===i.INT&&(K=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGB8UI),k===i.UNSIGNED_SHORT&&(K=i.RGB16UI),k===i.UNSIGNED_INT&&(K=i.RGB32UI),k===i.BYTE&&(K=i.RGB8I),k===i.SHORT&&(K=i.RGB16I),k===i.INT&&(K=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),k===i.UNSIGNED_INT&&(K=i.RGBA32UI),k===i.BYTE&&(K=i.RGBA8I),k===i.SHORT&&(K=i.RGBA16I),k===i.INT&&(K=i.RGBA32I)),_===i.RGB&&(k===i.UNSIGNED_SHORT&&dt&&(K=dt.RGB16_EXT),k===i.SHORT&&dt&&(K=dt.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),_===i.RGBA){const Q=lt?Ar:te.getTransfer(Y);k===i.FLOAT&&(K=i.RGBA32F),k===i.HALF_FLOAT&&(K=i.RGBA16F),k===i.UNSIGNED_BYTE&&(K=Q===re?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&dt&&(K=dt.RGBA16_EXT),k===i.SHORT&&dt&&(K=dt.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function R(C,_){let k;return C?_===null||_===pn||_===ys?k=i.DEPTH24_STENCIL8:_===je?k=i.DEPTH32F_STENCIL8:_===Ms&&(k=i.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===pn||_===ys?k=i.DEPTH_COMPONENT24:_===je?k=i.DEPTH_COMPONENT32F:_===Ms&&(k=i.DEPTH_COMPONENT16),k}function A(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ce&&C.minFilter!==De?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function P(C){const _=C.target;_.removeEventListener("dispose",P),M(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function v(C){const _=C.target;_.removeEventListener("dispose",v),b(_)}function M(C){const _=n.get(C);if(_.__webglInit===void 0)return;const k=C.source,W=f.get(k);if(W){const Y=W[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&w(C),Object.keys(W).length===0&&f.delete(k)}n.remove(C)}function w(C){const _=n.get(C);i.deleteTexture(_.__webglTexture);const k=C.source,W=f.get(k);delete W[_.__cacheKey],a.memory.textures--}function b(C){const _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let Y=0;Y<_.__webglFramebuffer[W].length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[W][Y]);else i.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)i.deleteFramebuffer(_.__webglFramebuffer[W]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=C.textures;for(let W=0,Y=k.length;W<Y;W++){const lt=n.get(k[W]);lt.__webglTexture&&(i.deleteTexture(lt.__webglTexture),a.memory.textures--),n.remove(k[W])}n.remove(C)}let I=0;function B(){I=0}function X(){return I}function N(C){I=C}function G(){const C=I;return C>=s.maxTextures&&Vt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function z(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function J(C,_){const k=n.get(C);if(C.isVideoTexture&&D(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){const W=C.image;if(W===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{Rt(k,C,_);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function it(C,_){const k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){Rt(k,C,_);return}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function ht(C,_){const k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){Rt(k,C,_);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function ct(C,_){const k=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&k.__version!==C.version){Ot(k,C,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}const xt={[Ja]:i.REPEAT,[En]:i.CLAMP_TO_EDGE,[$a]:i.MIRRORED_REPEAT},Ht={[Ce]:i.NEAREST,[Cd]:i.NEAREST_MIPMAP_NEAREST,[Ls]:i.NEAREST_MIPMAP_LINEAR,[De]:i.LINEAR,[Wr]:i.LINEAR_MIPMAP_NEAREST,[ri]:i.LINEAR_MIPMAP_LINEAR},ie={[Id]:i.NEVER,[Od]:i.ALWAYS,[Dd]:i.LESS,[tl]:i.LEQUAL,[Nd]:i.EQUAL,[el]:i.GEQUAL,[Ud]:i.GREATER,[Fd]:i.NOTEQUAL};function Kt(C,_){if(_.type===je&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===De||_.magFilter===Wr||_.magFilter===Ls||_.magFilter===ri||_.minFilter===De||_.minFilter===Wr||_.minFilter===Ls||_.minFilter===ri)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,xt[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,xt[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,xt[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Ht[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Ht[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,ie[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ce||_.minFilter!==Ls&&_.minFilter!==ri||_.type===je&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Z(C,_){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",P));const W=_.source;let Y=f.get(W);Y===void 0&&(Y={},f.set(W,Y));const lt=z(_);if(lt!==C.__cacheKey){Y[lt]===void 0&&(Y[lt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Y[lt].usedTimes++;const dt=Y[C.__cacheKey];dt!==void 0&&(Y[C.__cacheKey].usedTimes--,dt.usedTimes===0&&w(_)),C.__cacheKey=lt,C.__webglTexture=Y[lt].texture}return k}function ot(C,_,k){return Math.floor(Math.floor(C/k)/_)}function st(C,_,k,W){const lt=C.updateRanges;if(lt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,k,W,_.data);else{lt.sort((Nt,_t)=>Nt.start-_t.start);let dt=0;for(let Nt=1;Nt<lt.length;Nt++){const _t=lt[dt],mt=lt[Nt],Bt=_t.start+_t.count,kt=ot(mt.start,_.width,4),qt=ot(_t.start,_.width,4);mt.start<=Bt+1&&kt===qt&&ot(mt.start+mt.count-1,_.width,4)===kt?_t.count=Math.max(_t.count,mt.start+mt.count-_t.start):(++dt,lt[dt]=mt)}lt.length=dt+1;const K=e.getParameter(i.UNPACK_ROW_LENGTH),Q=e.getParameter(i.UNPACK_SKIP_PIXELS),pt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Nt=0,_t=lt.length;Nt<_t;Nt++){const mt=lt[Nt],Bt=Math.floor(mt.start/4),kt=Math.ceil(mt.count/4),qt=Bt%_.width,U=Math.floor(Bt/_.width),ft=kt,$=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,qt),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,qt,U,ft,$,k,W,_.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,K),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(i.UNPACK_SKIP_ROWS,pt)}}function Rt(C,_,k){let W=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=i.TEXTURE_3D);const Y=Z(C,_),lt=_.source;e.bindTexture(W,C.__webglTexture,i.TEXTURE0+k);const dt=n.get(lt);if(lt.version!==dt.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const $=te.getPrimaries(te.workingColorSpace),gt=_.colorSpace===Hn?null:te.getPrimaries(_.colorSpace),St=_.colorSpace===Hn||$===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=m(_.image,!1,s.maxTextureSize);Q=ae(_,Q);const pt=r.convert(_.format,_.colorSpace),Nt=r.convert(_.type);let _t=x(_.internalFormat,pt,Nt,_.normalized,_.colorSpace,_.isVideoTexture);Kt(W,_);let mt;const Bt=_.mipmaps,kt=_.isVideoTexture!==!0,qt=dt.__version===void 0||Y===!0,U=lt.dataReady,ft=A(_,Q);if(_.isDepthTexture)_t=R(_.format===ai,_.type),qt&&(kt?e.texStorage2D(i.TEXTURE_2D,1,_t,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,_t,Q.width,Q.height,0,pt,Nt,null));else if(_.isDataTexture)if(Bt.length>0){kt&&qt&&e.texStorage2D(i.TEXTURE_2D,ft,_t,Bt[0].width,Bt[0].height);for(let $=0,gt=Bt.length;$<gt;$++)mt=Bt[$],kt?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,pt,Nt,mt.data):e.texImage2D(i.TEXTURE_2D,$,_t,mt.width,mt.height,0,pt,Nt,mt.data);_.generateMipmaps=!1}else kt?(qt&&e.texStorage2D(i.TEXTURE_2D,ft,_t,Q.width,Q.height),U&&st(_,Q,pt,Nt)):e.texImage2D(i.TEXTURE_2D,0,_t,Q.width,Q.height,0,pt,Nt,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){kt&&qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,_t,Bt[0].width,Bt[0].height,Q.depth);for(let $=0,gt=Bt.length;$<gt;$++)if(mt=Bt[$],_.format!==tn)if(pt!==null)if(kt){if(U)if(_.layerUpdates.size>0){const St=Lc(mt.width,mt.height,_.format,_.type);for(const nt of _.layerUpdates){const It=mt.data.subarray(nt*St/mt.data.BYTES_PER_ELEMENT,(nt+1)*St/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,nt,mt.width,mt.height,1,pt,It)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,mt.width,mt.height,Q.depth,pt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,_t,mt.width,mt.height,Q.depth,0,mt.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,mt.width,mt.height,Q.depth,pt,Nt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,_t,mt.width,mt.height,Q.depth,0,pt,Nt,mt.data)}else{kt&&qt&&e.texStorage2D(i.TEXTURE_2D,ft,_t,Bt[0].width,Bt[0].height);for(let $=0,gt=Bt.length;$<gt;$++)mt=Bt[$],_.format!==tn?pt!==null?kt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,$,_t,mt.width,mt.height,0,mt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,pt,Nt,mt.data):e.texImage2D(i.TEXTURE_2D,$,_t,mt.width,mt.height,0,pt,Nt,mt.data)}else if(_.isDataArrayTexture)if(kt){if(qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,_t,Q.width,Q.height,Q.depth),U)if(_.layerUpdates.size>0){const $=Lc(Q.width,Q.height,_.format,_.type);for(const gt of _.layerUpdates){const St=Q.data.subarray(gt*$/Q.data.BYTES_PER_ELEMENT,(gt+1)*$/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,gt,Q.width,Q.height,1,pt,Nt,St)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,pt,Nt,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,_t,Q.width,Q.height,Q.depth,0,pt,Nt,Q.data);else if(_.isData3DTexture)kt?(qt&&e.texStorage3D(i.TEXTURE_3D,ft,_t,Q.width,Q.height,Q.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,pt,Nt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,_t,Q.width,Q.height,Q.depth,0,pt,Nt,Q.data);else if(_.isFramebufferTexture){if(qt)if(kt)e.texStorage2D(i.TEXTURE_2D,ft,_t,Q.width,Q.height);else{let $=Q.width,gt=Q.height;for(let St=0;St<ft;St++)e.texImage2D(i.TEXTURE_2D,St,_t,$,gt,0,pt,Nt,null),$>>=1,gt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Q.parentNode!==$){$.appendChild(Q),d.add(_),$.onpaint=gt=>{const St=gt.changedElements;for(const nt of d)St.includes(nt.image)&&(nt.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{const St=i.RGBA,nt=i.RGBA,It=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,St,nt,It,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(kt&&qt){const $=Qt(Bt[0]);e.texStorage2D(i.TEXTURE_2D,ft,_t,$.width,$.height)}for(let $=0,gt=Bt.length;$<gt;$++)mt=Bt[$],kt?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,pt,Nt,mt):e.texImage2D(i.TEXTURE_2D,$,_t,pt,Nt,mt);_.generateMipmaps=!1}else if(kt){if(qt){const $=Qt(Q);e.texStorage2D(i.TEXTURE_2D,ft,_t,$.width,$.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,Nt,Q)}else e.texImage2D(i.TEXTURE_2D,0,_t,pt,Nt,Q);p(_)&&E(W),dt.__version=lt.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Ot(C,_,k){if(_.image.length!==6)return;const W=Z(C,_),Y=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+k);const lt=n.get(Y);if(Y.version!==lt.__version||W===!0){e.activeTexture(i.TEXTURE0+k);const dt=te.getPrimaries(te.workingColorSpace),K=_.colorSpace===Hn?null:te.getPrimaries(_.colorSpace),Q=_.colorSpace===Hn||dt===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const pt=_.isCompressedTexture||_.image[0].isCompressedTexture,Nt=_.image[0]&&_.image[0].isDataTexture,_t=[];for(let nt=0;nt<6;nt++)!pt&&!Nt?_t[nt]=m(_.image[nt],!0,s.maxCubemapSize):_t[nt]=Nt?_.image[nt].image:_.image[nt],_t[nt]=ae(_,_t[nt]);const mt=_t[0],Bt=r.convert(_.format,_.colorSpace),kt=r.convert(_.type),qt=x(_.internalFormat,Bt,kt,_.normalized,_.colorSpace),U=_.isVideoTexture!==!0,ft=lt.__version===void 0||W===!0,$=Y.dataReady;let gt=A(_,mt);Kt(i.TEXTURE_CUBE_MAP,_);let St;if(pt){U&&ft&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,qt,mt.width,mt.height);for(let nt=0;nt<6;nt++){St=_t[nt].mipmaps;for(let It=0;It<St.length;It++){const Tt=St[It];_.format!==tn?Bt!==null?U?$&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,0,0,Tt.width,Tt.height,Bt,Tt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,qt,Tt.width,Tt.height,0,Tt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,0,0,Tt.width,Tt.height,Bt,kt,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,qt,Tt.width,Tt.height,0,Bt,kt,Tt.data)}}}else{if(St=_.mipmaps,U&&ft){St.length>0&&gt++;const nt=Qt(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,qt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Nt){U?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,_t[nt].width,_t[nt].height,Bt,kt,_t[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,qt,_t[nt].width,_t[nt].height,0,Bt,kt,_t[nt].data);for(let It=0;It<St.length;It++){const me=St[It].image[nt].image;U?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,0,0,me.width,me.height,Bt,kt,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,qt,me.width,me.height,0,Bt,kt,me.data)}}else{U?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Bt,kt,_t[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,qt,Bt,kt,_t[nt]);for(let It=0;It<St.length;It++){const Tt=St[It];U?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,0,0,Bt,kt,Tt.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,qt,Bt,kt,Tt.image[nt])}}}p(_)&&E(i.TEXTURE_CUBE_MAP),lt.__version=Y.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Lt(C,_,k,W,Y,lt){const dt=r.convert(k.format,k.colorSpace),K=r.convert(k.type),Q=x(k.internalFormat,dt,K,k.normalized,k.colorSpace),pt=n.get(_),Nt=n.get(k);if(Nt.__renderTarget=_,!pt.__hasExternalTextures){const _t=Math.max(1,_.width>>lt),mt=Math.max(1,_.height>>lt);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,lt,Q,_t,mt,_.depth,0,dt,K,null):e.texImage2D(Y,lt,Q,_t,mt,0,dt,K,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Wt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,Y,Nt.__webglTexture,0,Gt(_)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,Y,Nt.__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(C,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){const W=_.depthTexture,Y=W&&W.isDepthTexture?W.type:null,lt=R(_.stencilBuffer,Y),dt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Wt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt(_),lt,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt(_),lt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,lt,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,C)}else{const W=_.textures;for(let Y=0;Y<W.length;Y++){const lt=W[Y],dt=r.convert(lt.format,lt.colorSpace),K=r.convert(lt.type),Q=x(lt.internalFormat,dt,K,lt.normalized,lt.colorSpace);Wt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt(_),Q,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt(_),Q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Q,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(C,_,k){const W=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(_.depthTexture);if(Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Kt(i.TEXTURE_CUBE_MAP,_.depthTexture);const pt=r.convert(_.depthTexture.format),Nt=r.convert(_.depthTexture.type);let _t;_.depthTexture.format===Ln?_t=i.DEPTH_COMPONENT24:_.depthTexture.format===ai&&(_t=i.DEPTH24_STENCIL8);for(let mt=0;mt<6;mt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,_t,_.width,_.height,0,pt,Nt,null)}}else J(_.depthTexture,0);const lt=Y.__webglTexture,dt=Gt(_),K=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,Q=_.depthTexture.format===ai?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ln)Wt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,lt,0,dt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,lt,0);else if(_.depthTexture.format===ai)Wt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,lt,0,dt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function j(C){const _=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){const W=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){const Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",Y)};W.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=W}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let W=0;W<6;W++)Ct(_.__webglFramebuffer[W],C,W);else{const W=C.texture.mipmaps;W&&W.length>0?Ct(_.__webglFramebuffer[0],C,0):Ct(_.__webglFramebuffer,C,0)}else if(k){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=i.createRenderbuffer(),zt(_.__webglDepthbuffer[W],C,!1);else{const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,lt)}}else{const W=C.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),zt(_.__webglDepthbuffer,C,!1);else{const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,lt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function et(C,_,k){const W=n.get(C);_!==void 0&&Lt(W.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&j(C)}function tt(C){const _=C.texture,k=n.get(C),W=n.get(_);C.addEventListener("dispose",v);const Y=C.textures,lt=C.isWebGLCubeRenderTarget===!0,dt=Y.length>1;if(dt||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=_.version,a.memory.textures++),lt){k.__webglFramebuffer=[];for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[K]=[];for(let Q=0;Q<_.mipmaps.length;Q++)k.__webglFramebuffer[K][Q]=i.createFramebuffer()}else k.__webglFramebuffer[K]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let K=0;K<_.mipmaps.length;K++)k.__webglFramebuffer[K]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(dt)for(let K=0,Q=Y.length;K<Q;K++){const pt=n.get(Y[K]);pt.__webglTexture===void 0&&(pt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Wt(C)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){const Q=Y[K];k.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[K]);const pt=r.convert(Q.format,Q.colorSpace),Nt=r.convert(Q.type),_t=x(Q.internalFormat,pt,Nt,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),mt=Gt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,_t,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,k.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),zt(k.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(lt){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Kt(i.TEXTURE_CUBE_MAP,_);for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)Lt(k.__webglFramebuffer[K][Q],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Q);else Lt(k.__webglFramebuffer[K],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);p(_)&&E(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let K=0,Q=Y.length;K<Q;K++){const pt=Y[K],Nt=n.get(pt);let _t=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(_t=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(_t,Nt.__webglTexture),Kt(_t,pt),Lt(k.__webglFramebuffer,C,pt,i.COLOR_ATTACHMENT0+K,_t,0),p(pt)&&E(_t)}e.unbindTexture()}else{let K=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,W.__webglTexture),Kt(K,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)Lt(k.__webglFramebuffer[Q],C,_,i.COLOR_ATTACHMENT0,K,Q);else Lt(k.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,K,0);p(_)&&E(K),e.unbindTexture()}C.depthBuffer&&j(C)}function ut(C){const _=C.textures;for(let k=0,W=_.length;k<W;k++){const Y=_[k];if(p(Y)){const lt=T(C),dt=n.get(Y).__webglTexture;e.bindTexture(lt,dt),E(lt),e.unbindTexture()}}}const at=[],At=[];function bt(C){if(C.samples>0){if(Wt(C)===!1){const _=C.textures,k=C.width,W=C.height;let Y=i.COLOR_BUFFER_BIT;const lt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=n.get(C),K=_.length>1;if(K)for(let pt=0;pt<_.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer);const Q=C.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let pt=0;pt<_.length;pt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,dt.__webglColorRenderbuffer[pt]);const Nt=n.get(_[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Nt,0)}i.blitFramebuffer(0,0,k,W,0,0,k,W,Y,i.NEAREST),l===!0&&(at.length=0,At.length=0,at.push(i.COLOR_ATTACHMENT0+pt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(at.push(lt),At.push(lt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,At)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let pt=0;pt<_.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,dt.__webglColorRenderbuffer[pt]);const Nt=n.get(_[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,Nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Gt(C){return Math.min(s.maxSamples,C.samples)}function Wt(C){const _=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function D(C){const _=a.render.frame;h.get(C)!==_&&(h.set(C,_),C.update())}function ae(C,_){const k=C.colorSpace,W=C.format,Y=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Er&&k!==Hn&&(te.getTransfer(k)===re?(W!==tn||Y!==Xe)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",k)),_}function Qt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=B,this.getTextureUnits=X,this.setTextureUnits=N,this.setTexture2D=J,this.setTexture2DArray=it,this.setTexture3D=ht,this.setTextureCube=ct,this.rebindTextures=et,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=j,this.setupFrameBufferTexture=Lt,this.useMultisampledRTT=Wt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function cv(i,t){function e(n,s=Hn){let r;const a=te.getTransfer(s);if(n===Xe)return i.UNSIGNED_BYTE;if(n===Ko)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Zo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fh)return i.BYTE;if(n===Oh)return i.SHORT;if(n===Ms)return i.UNSIGNED_SHORT;if(n===Yo)return i.INT;if(n===pn)return i.UNSIGNED_INT;if(n===je)return i.FLOAT;if(n===Pn)return i.HALF_FLOAT;if(n===zh)return i.ALPHA;if(n===Vh)return i.RGB;if(n===tn)return i.RGBA;if(n===Ln)return i.DEPTH_COMPONENT;if(n===ai)return i.DEPTH_STENCIL;if(n===Jo)return i.RED;if(n===$o)return i.RED_INTEGER;if(n===hi)return i.RG;if(n===Qo)return i.RG_INTEGER;if(n===jo)return i.RGBA_INTEGER;if(n===ur||n===dr||n===fr||n===pr)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qa||n===ja||n===to||n===eo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===no||n===io||n===so||n===ro||n===ao||n===Sr||n===oo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===no||n===io)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===so)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ro)return r.COMPRESSED_R11_EAC;if(n===ao)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Sr)return r.COMPRESSED_RG11_EAC;if(n===oo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===xo||n===Mo||n===yo||n===So)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===lo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===co)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ho)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===uo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===po)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===go)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_o)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===So)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bo||n===wo||n===Eo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===bo)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Eo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ao||n===To||n===br||n===Ro)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ao)return r.COMPRESSED_RED_RGTC1_EXT;if(n===To)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===br)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ro)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ys?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const hv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Jh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new qe({vertexShader:hv,fragmentShader:uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new de(new Rs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fv extends fi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const y=typeof XRWebGLBinding<"u",m=new dv,p={},E=e.getContextAttributes();let T=null,x=null;const R=[],A=[],P=new rt;let v=null;const M=new We;M.viewport=new fe;const w=new We;w.viewport=new fe;const b=[M,w],I=new bp;let B=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ot=R[Z];return ot===void 0&&(ot=new Jr,R[Z]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(Z){let ot=R[Z];return ot===void 0&&(ot=new Jr,R[Z]=ot),ot.getGripSpace()},this.getHand=function(Z){let ot=R[Z];return ot===void 0&&(ot=new Jr,R[Z]=ot),ot.getHandSpace()};function N(Z){const ot=A.indexOf(Z.inputSource);if(ot===-1)return;const st=R[ot];st!==void 0&&(st.update(Z.inputSource,Z.frame,c||a),st.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",z);for(let Z=0;Z<R.length;Z++){const ot=A[Z];ot!==null&&(A[Z]=null,R[Z].disconnect(ot))}B=null,X=null,m.reset();for(const Z in p)delete p[Z];t.setRenderTarget(T),f=null,u=null,d=null,s=null,x=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",G),s.addEventListener("inputsourceschange",z),E.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(P),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let st=null,Rt=null,Ot=null;E.depth&&(Ot=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=E.stencil?ai:Ln,Rt=E.stencil?ys:pn);const Lt={colorFormat:e.RGBA8,depthFormat:Ot,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Lt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new fn(u.textureWidth,u.textureHeight,{format:tn,type:Xe,depthTexture:new qi(u.textureWidth,u.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const st={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new fn(f.framebufferWidth,f.framebufferHeight,{format:tn,type:Xe,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function z(Z){for(let ot=0;ot<Z.removed.length;ot++){const st=Z.removed[ot],Rt=A.indexOf(st);Rt>=0&&(A[Rt]=null,R[Rt].disconnect(st))}for(let ot=0;ot<Z.added.length;ot++){const st=Z.added[ot];let Rt=A.indexOf(st);if(Rt===-1){for(let Lt=0;Lt<R.length;Lt++)if(Lt>=A.length){A.push(st),Rt=Lt;break}else if(A[Lt]===null){A[Lt]=st,Rt=Lt;break}if(Rt===-1)break}const Ot=R[Rt];Ot&&Ot.connect(st)}}const J=new L,it=new L;function ht(Z,ot,st){J.setFromMatrixPosition(ot.matrixWorld),it.setFromMatrixPosition(st.matrixWorld);const Rt=J.distanceTo(it),Ot=ot.projectionMatrix.elements,Lt=st.projectionMatrix.elements,zt=Ot[14]/(Ot[10]-1),Ct=Ot[14]/(Ot[10]+1),j=(Ot[9]+1)/Ot[5],et=(Ot[9]-1)/Ot[5],tt=(Ot[8]-1)/Ot[0],ut=(Lt[8]+1)/Lt[0],at=zt*tt,At=zt*ut,bt=Rt/(-tt+ut),Gt=bt*-tt;if(ot.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Gt),Z.translateZ(bt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ot[10]===-1)Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const Wt=zt+bt,D=Ct+bt,ae=at-Gt,Qt=At+(Rt-Gt),C=j*Ct/D*Wt,_=et*Ct/D*Wt;Z.projectionMatrix.makePerspective(ae,Qt,C,_,Wt,D),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ct(Z,ot){ot===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ot.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ot=Z.near,st=Z.far;m.texture!==null&&(m.depthNear>0&&(ot=m.depthNear),m.depthFar>0&&(st=m.depthFar)),I.near=w.near=M.near=ot,I.far=w.far=M.far=st,(B!==I.near||X!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),B=I.near,X=I.far),I.layers.mask=Z.layers.mask|6,M.layers.mask=I.layers.mask&-5,w.layers.mask=I.layers.mask&-3;const Rt=Z.parent,Ot=I.cameras;ct(I,Rt);for(let Lt=0;Lt<Ot.length;Lt++)ct(Ot[Lt],Rt);Ot.length===2?ht(I,M,w):I.projectionMatrix.copy(M.projectionMatrix),xt(Z,I,Rt)};function xt(Z,ot,st){st===null?Z.matrix.copy(ot.matrixWorld):(Z.matrix.copy(st.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ot.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=bs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(Z){return p[Z]};let Ht=null;function ie(Z,ot){if(h=ot.getViewerPose(c||a),g=ot,h!==null){const st=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let Rt=!1;st.length!==I.cameras.length&&(I.cameras.length=0,Rt=!0);for(let Ct=0;Ct<st.length;Ct++){const j=st[Ct];let et=null;if(f!==null)et=f.getViewport(j);else{const ut=d.getViewSubImage(u,j);et=ut.viewport,Ct===0&&(t.setRenderTargetTextures(x,ut.colorTexture,ut.depthStencilTexture),t.setRenderTarget(x))}let tt=b[Ct];tt===void 0&&(tt=new We,tt.layers.enable(Ct),tt.viewport=new fe,b[Ct]=tt),tt.matrix.fromArray(j.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(j.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(et.x,et.y,et.width,et.height),Ct===0&&(I.matrix.copy(tt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Rt===!0&&I.cameras.push(tt)}const Ot=s.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const Ct=d.getDepthInformation(st[0]);Ct&&Ct.isValid&&Ct.texture&&m.init(Ct,s.renderState)}if(Ot&&Ot.includes("camera-access")&&y){t.state.unbindTexture(),d=n.getBinding();for(let Ct=0;Ct<st.length;Ct++){const j=st[Ct].camera;if(j){let et=p[j];et||(et=new Jh,p[j]=et);const tt=d.getCameraImage(j);et.sourceTexture=tt}}}}for(let st=0;st<R.length;st++){const Rt=A[st],Ot=R[st];Rt!==null&&Ot!==void 0&&Ot.update(Rt,ot,c||a)}Ht&&Ht(Z,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}const Kt=new lu;Kt.setAnimationLoop(ie),this.setAnimationLoop=function(Z){Ht=Z},this.dispose=function(){}}}const pv=new ne,mu=new Xt;mu.set(-1,0,0,0,1,0,0,0,1);function mv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ru(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,T,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,E,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ne&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ne&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=t.get(p),T=E.envMap,x=E.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(pv.makeRotationFromEuler(x)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(mu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=T*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ne&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function gv(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,R){const A=R.program;n.uniformBlockBinding(x,A)}function c(x,R){let A=s[x.id];A===void 0&&(m(x),A=h(x),s[x.id]=A,x.addEventListener("dispose",E));const P=R.program;n.updateUBOMapping(x,P);const v=t.render.frame;r[x.id]!==v&&(u(x),r[x.id]=v)}function h(x){const R=d();x.__bindingPointIndex=R;const A=i.createBuffer(),P=x.__size,v=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,P,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,R,A),A}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const R=s[x.id],A=x.uniforms,P=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,R);for(let v=0,M=A.length;v<M;v++){const w=A[v];if(Array.isArray(w))for(let b=0,I=w.length;b<I;b++)f(w[b],v,b,P);else f(w,v,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,R,A,P){if(y(x,R,A,P)===!0){const v=x.__offset,M=x.value;if(Array.isArray(M)){let w=0;for(let b=0;b<M.length;b++){const I=M[b],B=p(I);g(I,x.__data,w),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(w+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(M,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,x.__data)}}function g(x,R,A){typeof x=="number"||typeof x=="boolean"?R[0]=x:x.isMatrix3?(R[0]=x.elements[0],R[1]=x.elements[1],R[2]=x.elements[2],R[3]=0,R[4]=x.elements[3],R[5]=x.elements[4],R[6]=x.elements[5],R[7]=0,R[8]=x.elements[6],R[9]=x.elements[7],R[10]=x.elements[8],R[11]=0):ArrayBuffer.isView(x)?R.set(new x.constructor(x.buffer,x.byteOffset,R.length)):x.toArray(R,A)}function y(x,R,A,P){const v=x.value,M=R+"_"+A;if(P[M]===void 0)return typeof v=="number"||typeof v=="boolean"?P[M]=v:ArrayBuffer.isView(v)?P[M]=v.slice():P[M]=v.clone(),!0;{const w=P[M];if(typeof v=="number"||typeof v=="boolean"){if(w!==v)return P[M]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(w.equals(v)===!1)return w.copy(v),!0}}return!1}function m(x){const R=x.uniforms;let A=0;const P=16;for(let M=0,w=R.length;M<w;M++){const b=Array.isArray(R[M])?R[M]:[R[M]];for(let I=0,B=b.length;I<B;I++){const X=b[I],N=Array.isArray(X.value)?X.value:[X.value];for(let G=0,z=N.length;G<z;G++){const J=N[G],it=p(J),ht=A%P,ct=ht%it.boundary,xt=ht+ct;A+=ct,xt!==0&&P-xt<it.storage&&(A+=P-xt),X.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=A,A+=it.storage}}}const v=A%P;return v>0&&(A+=P-v),x.__size=A,x.__cache={},this}function p(x){const R={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(R.boundary=4,R.storage=4):x.isVector2?(R.boundary=8,R.storage=8):x.isVector3||x.isColor?(R.boundary=16,R.storage=12):x.isVector4?(R.boundary=16,R.storage=16):x.isMatrix3?(R.boundary=48,R.storage=48):x.isMatrix4?(R.boundary=64,R.storage=64):x.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(R.boundary=16,R.storage=x.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",x),R}function E(x){const R=x.target;R.removeEventListener("dispose",E);const A=a.indexOf(R.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function T(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:T}}const _v=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let on=null;function vv(){return on===null&&(on=new Kh(_v,16,16,hi,Pn),on.name="DFG_LUT",on.minFilter=De,on.magFilter=De,on.wrapS=En,on.wrapT=En,on.generateMipmaps=!1,on.needsUpdate=!0),on}class xv{constructor(t={}){const{canvas:e=kd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Xe}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=f,m=new Set([jo,Qo,$o]),p=new Set([Xe,pn,Ms,ys,Ko,Zo]),E=new Uint32Array(4),T=new Int32Array(4),x=new L;let R=null,A=null;const P=[],v=[];let M=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let b=!1,I=null,B=null,X=null,N=null;this._outputColorSpace=He;let G=0,z=0,J=null,it=-1,ht=null;const ct=new fe,xt=new fe;let Ht=null;const ie=new Dt(0);let Kt=0,Z=e.width,ot=e.height,st=1,Rt=null,Ot=null;const Lt=new fe(0,0,Z,ot),zt=new fe(0,0,Z,ot);let Ct=!1;const j=new ol;let et=!1,tt=!1;const ut=new ne,at=new L,At=new fe,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Wt(){return J===null?st:1}let D=n;function ae(S,O){return e.getContext(S,O)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Wo}`),e.addEventListener("webglcontextlost",me,!1),e.addEventListener("webglcontextrestored",he,!1),e.addEventListener("webglcontextcreationerror",nn,!1),D===null){const O="webgl2";if(D=ae(O,S),D===null)throw ae(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw jt("WebGLRenderer: "+S.message),S}let Qt,C,_,k,W,Y,lt,dt,K,Q,pt,Nt,_t,mt,Bt,kt,qt,U,ft,$,gt,St,nt;function It(){Qt=new vg(D),Qt.init(),gt=new cv(D,Qt),C=new hg(D,Qt,t,gt),_=new ov(D,Qt),C.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),B=D.createFramebuffer(),X=D.createFramebuffer(),N=D.createFramebuffer(),k=new yg(D),W=new Y_,Y=new lv(D,Qt,_,W,C,gt,k),lt=new _g(w),dt=new Ep(D),St=new lg(D,dt),K=new xg(D,dt,k,St),Q=new bg(D,K,dt,St,k),U=new Sg(D,C,Y),Bt=new ug(W),pt=new q_(w,lt,Qt,C,St,Bt),Nt=new mv(w,W),_t=new Z_,mt=new ev(Qt),qt=new og(w,lt,_,Q,g,l),kt=new av(w,Q,C),nt=new gv(D,k,C,_),ft=new cg(D,Qt,k),$=new Mg(D,Qt,k),k.programs=pt.programs,w.capabilities=C,w.extensions=Qt,w.properties=W,w.renderLists=_t,w.shadowMap=kt,w.state=_,w.info=k}It(),y!==Xe&&(M=new Eg(y,e.width,e.height,o,s,r));const Tt=new fv(w,D);this.xr=Tt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=Qt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Qt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return st},this.setPixelRatio=function(S){S!==void 0&&(st=S,this.setSize(Z,ot,!1))},this.getSize=function(S){return S.set(Z,ot)},this.setSize=function(S,O,q=!0){if(Tt.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=S,ot=O,e.width=Math.floor(S*st),e.height=Math.floor(O*st),q===!0&&(e.style.width=S+"px",e.style.height=O+"px"),M!==null&&M.setSize(e.width,e.height),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(Z*st,ot*st).floor()},this.setDrawingBufferSize=function(S,O,q){Z=S,ot=O,st=q,e.width=Math.floor(S*q),e.height=Math.floor(O*q),this.setViewport(0,0,S,O)},this.setEffects=function(S){if(y===Xe){jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let O=0;O<S.length;O++)if(S[O].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ct)},this.getViewport=function(S){return S.copy(Lt)},this.setViewport=function(S,O,q,V){S.isVector4?Lt.set(S.x,S.y,S.z,S.w):Lt.set(S,O,q,V),_.viewport(ct.copy(Lt).multiplyScalar(st).round())},this.getScissor=function(S){return S.copy(zt)},this.setScissor=function(S,O,q,V){S.isVector4?zt.set(S.x,S.y,S.z,S.w):zt.set(S,O,q,V),_.scissor(xt.copy(zt).multiplyScalar(st).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(S){_.setScissorTest(Ct=S)},this.setOpaqueSort=function(S){Rt=S},this.setTransparentSort=function(S){Ot=S},this.getClearColor=function(S){return S.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor(...arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,q=!0){let V=0;if(S){let H=!1;if(J!==null){const yt=J.texture.format;H=m.has(yt)}if(H){const yt=J.texture.type,Et=p.has(yt),Mt=qt.getClearColor(),Pt=qt.getClearAlpha(),Ut=Mt.r,Yt=Mt.g,Jt=Mt.b;Et?(E[0]=Ut,E[1]=Yt,E[2]=Jt,E[3]=Pt,D.clearBufferuiv(D.COLOR,0,E)):(T[0]=Ut,T[1]=Yt,T[2]=Jt,T[3]=Pt,D.clearBufferiv(D.COLOR,0,T))}else V|=D.COLOR_BUFFER_BIT}O&&(V|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),I=S},this.dispose=function(){e.removeEventListener("webglcontextlost",me,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",nn,!1),qt.dispose(),_t.dispose(),mt.dispose(),W.dispose(),lt.dispose(),Q.dispose(),St.dispose(),nt.dispose(),pt.dispose(),Tt.dispose(),Tt.removeEventListener("sessionstart",Pl),Tt.removeEventListener("sessionend",Ll),Yn.stop()};function me(S){S.preventDefault(),Zl("WebGLRenderer: Context Lost."),b=!0}function he(){Zl("WebGLRenderer: Context Restored."),b=!1;const S=k.autoReset,O=kt.enabled,q=kt.autoUpdate,V=kt.needsUpdate,H=kt.type;It(),k.autoReset=S,kt.enabled=O,kt.autoUpdate=q,kt.needsUpdate=V,kt.type=H}function nn(S){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function sn(S){const O=S.target;O.removeEventListener("dispose",sn),Tu(O)}function Tu(S){Ru(S),W.remove(S)}function Ru(S){const O=W.get(S).programs;O!==void 0&&(O.forEach(function(q){pt.releaseProgram(q)}),S.isShaderMaterial&&pt.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,q,V,H,yt){O===null&&(O=bt);const Et=H.isMesh&&H.matrixWorld.determinantAffine()<0,Mt=Lu(S,O,q,V,H);_.setMaterial(V,Et);let Pt=q.index,Ut=1;if(V.wireframe===!0){if(Pt=K.getWireframeAttribute(q),Pt===void 0)return;Ut=2}const Yt=q.drawRange,Jt=q.attributes.position;let Ft=Yt.start*Ut,oe=(Yt.start+Yt.count)*Ut;yt!==null&&(Ft=Math.max(Ft,yt.start*Ut),oe=Math.min(oe,(yt.start+yt.count)*Ut)),Pt!==null?(Ft=Math.max(Ft,0),oe=Math.min(oe,Pt.count)):Jt!=null&&(Ft=Math.max(Ft,0),oe=Math.min(oe,Jt.count));const _e=oe-Ft;if(_e<0||_e===1/0)return;St.setup(H,V,Mt,q,Pt);let ge,le=ft;if(Pt!==null&&(ge=dt.get(Pt),le=$,le.setIndex(ge)),H.isMesh)V.wireframe===!0?(_.setLineWidth(V.wireframeLinewidth*Wt()),le.setMode(D.LINES)):le.setMode(D.TRIANGLES);else if(H.isLine){let Pe=V.linewidth;Pe===void 0&&(Pe=1),_.setLineWidth(Pe*Wt()),H.isLineSegments?le.setMode(D.LINES):H.isLineLoop?le.setMode(D.LINE_LOOP):le.setMode(D.LINE_STRIP)}else H.isPoints?le.setMode(D.POINTS):H.isSprite&&le.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))le.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Pe=H._multiDrawStarts,wt=H._multiDrawCounts,ze=H._multiDrawCount,se=Pt?dt.get(Pt).bytesPerElement:1,Ye=W.get(V).currentProgram.getUniforms();for(let rn=0;rn<ze;rn++)Ye.setValue(D,"_gl_DrawID",rn),le.render(Pe[rn]/se,wt[rn])}else if(H.isInstancedMesh)le.renderInstances(Ft,_e,H.count);else if(q.isInstancedBufferGeometry){const Pe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,wt=Math.min(q.instanceCount,Pe);le.renderInstances(Ft,_e,wt)}else le.render(Ft,_e)};function Cl(S,O,q){S.transparent===!0&&S.side===wn&&S.forceSinglePass===!1?(S.side=Ne,S.needsUpdate=!0,Ps(S,O,q),S.side=Xn,S.needsUpdate=!0,Ps(S,O,q),S.side=wn):Ps(S,O,q)}this.compile=function(S,O,q=null){q===null&&(q=S),A=mt.get(q),A.init(O),v.push(A),q.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),S!==q&&S.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),A.setupLights();const V=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const yt=H.material;if(yt)if(Array.isArray(yt))for(let Et=0;Et<yt.length;Et++){const Mt=yt[Et];Cl(Mt,q,H),V.add(Mt)}else Cl(yt,q,H),V.add(yt)}),A=v.pop(),V},this.compileAsync=function(S,O,q=null){const V=this.compile(S,O,q);return new Promise(H=>{function yt(){if(V.forEach(function(Et){W.get(Et).currentProgram.isReady()&&V.delete(Et)}),V.size===0){H(S);return}setTimeout(yt,10)}Qt.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let kr=null;function Cu(S){kr&&kr(S)}function Pl(){Yn.stop()}function Ll(){Yn.start()}const Yn=new lu;Yn.setAnimationLoop(Cu),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(S){kr=S,Tt.setAnimationLoop(S),S===null?Yn.stop():Yn.start()},Tt.addEventListener("sessionstart",Pl),Tt.addEventListener("sessionend",Ll),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;I!==null&&I.renderStart(S,O);const q=Tt.enabled===!0&&Tt.isPresenting===!0,V=M!==null&&(J===null||q)&&M.begin(w,J);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Tt.enabled===!0&&Tt.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(Tt.cameraAutoUpdate===!0&&Tt.updateCamera(O),O=Tt.getCamera()),S.isScene===!0&&S.onBeforeRender(w,S,O,J),A=mt.get(S,v.length),A.init(O),A.state.textureUnits=Y.getTextureUnits(),v.push(A),ut.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),j.setFromProjectionMatrix(ut,un,O.reversedDepth),tt=this.localClippingEnabled,et=Bt.init(this.clippingPlanes,tt),R=_t.get(S,P.length),R.init(),P.push(R),Tt.enabled===!0&&Tt.isPresenting===!0){const Et=w.xr.getDepthSensingMesh();Et!==null&&zr(Et,O,-1/0,w.sortObjects)}zr(S,O,0,w.sortObjects),R.finish(),w.sortObjects===!0&&R.sort(Rt,Ot,O.reversedDepth),Gt=Tt.enabled===!1||Tt.isPresenting===!1||Tt.hasDepthSensing()===!1,Gt&&qt.addToRenderList(R,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),et===!0&&Bt.beginShadows();const H=A.state.shadowsArray;if(kt.render(H,S,O),et===!0&&Bt.endShadows(),(V&&M.hasRenderPass())===!1){const Et=R.opaque,Mt=R.transmissive;if(A.setupLights(),O.isArrayCamera){const Pt=O.cameras;if(Mt.length>0)for(let Ut=0,Yt=Pt.length;Ut<Yt;Ut++){const Jt=Pt[Ut];Dl(Et,Mt,S,Jt)}Gt&&qt.render(S);for(let Ut=0,Yt=Pt.length;Ut<Yt;Ut++){const Jt=Pt[Ut];Il(R,S,Jt,Jt.viewport)}}else Mt.length>0&&Dl(Et,Mt,S,O),Gt&&qt.render(S),Il(R,S,O)}J!==null&&z===0&&(Y.updateMultisampleRenderTarget(J),Y.updateRenderTargetMipmap(J)),V&&M.end(w),S.isScene===!0&&S.onAfterRender(w,S,O),St.resetDefaultState(),it=-1,ht=null,v.pop(),v.length>0?(A=v[v.length-1],Y.setTextureUnits(A.state.textureUnits),et===!0&&Bt.setGlobalState(w.clippingPlanes,A.state.camera)):A=null,P.pop(),P.length>0?R=P[P.length-1]:R=null,I!==null&&I.renderEnd()};function zr(S,O,q,V){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)q=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLightProbeGrid)A.pushLightProbeGrid(S);else if(S.isLight)A.pushLight(S),S.castShadow&&A.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||j.intersectsSprite(S)){V&&At.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ut);const Et=Q.update(S),Mt=S.material;Mt.visible&&R.push(S,Et,Mt,q,At.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||j.intersectsObject(S))){const Et=Q.update(S),Mt=S.material;if(V&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),At.copy(S.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),At.copy(Et.boundingSphere.center)),At.applyMatrix4(S.matrixWorld).applyMatrix4(ut)),Array.isArray(Mt)){const Pt=Et.groups;for(let Ut=0,Yt=Pt.length;Ut<Yt;Ut++){const Jt=Pt[Ut],Ft=Mt[Jt.materialIndex];Ft&&Ft.visible&&R.push(S,Et,Ft,q,At.z,Jt)}}else Mt.visible&&R.push(S,Et,Mt,q,At.z,null)}}const yt=S.children;for(let Et=0,Mt=yt.length;Et<Mt;Et++)zr(yt[Et],O,q,V)}function Il(S,O,q,V){const{opaque:H,transmissive:yt,transparent:Et}=S;A.setupLightsView(q),et===!0&&Bt.setGlobalState(w.clippingPlanes,q),V&&_.viewport(ct.copy(V)),H.length>0&&Cs(H,O,q),yt.length>0&&Cs(yt,O,q),Et.length>0&&Cs(Et,O,q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Dl(S,O,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[V.id]===void 0){const Ft=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[V.id]=new fn(1,1,{generateMipmaps:!0,type:Ft?Pn:Xe,minFilter:ri,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace})}const yt=A.state.transmissionRenderTarget[V.id],Et=V.viewport||ct;yt.setSize(Et.z*w.transmissionResolutionScale,Et.w*w.transmissionResolutionScale);const Mt=w.getRenderTarget(),Pt=w.getActiveCubeFace(),Ut=w.getActiveMipmapLevel();w.setRenderTarget(yt),w.getClearColor(ie),Kt=w.getClearAlpha(),Kt<1&&w.setClearColor(16777215,.5),w.clear(),Gt&&qt.render(q);const Yt=w.toneMapping;w.toneMapping=dn;const Jt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),A.setupLightsView(V),et===!0&&Bt.setGlobalState(w.clippingPlanes,V),Cs(S,q,V),Y.updateMultisampleRenderTarget(yt),Y.updateRenderTargetMipmap(yt),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let oe=0,_e=O.length;oe<_e;oe++){const ge=O[oe],{object:le,geometry:Pe,material:wt,group:ze}=ge;if(wt.side===wn&&le.layers.test(V.layers)){const se=wt.side;wt.side=Ne,wt.needsUpdate=!0,Nl(le,q,V,Pe,wt,ze),wt.side=se,wt.needsUpdate=!0,Ft=!0}}Ft===!0&&(Y.updateMultisampleRenderTarget(yt),Y.updateRenderTargetMipmap(yt))}w.setRenderTarget(Mt,Pt,Ut),w.setClearColor(ie,Kt),Jt!==void 0&&(V.viewport=Jt),w.toneMapping=Yt}function Cs(S,O,q){const V=O.isScene===!0?O.overrideMaterial:null;for(let H=0,yt=S.length;H<yt;H++){const Et=S[H],{object:Mt,geometry:Pt,group:Ut}=Et;let Yt=Et.material;Yt.allowOverride===!0&&V!==null&&(Yt=V),Mt.layers.test(q.layers)&&Nl(Mt,O,q,Pt,Yt,Ut)}}function Nl(S,O,q,V,H,yt){S.onBeforeRender(w,O,q,V,H,yt),S.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(w,O,q,V,S,yt),H.transparent===!0&&H.side===wn&&H.forceSinglePass===!1?(H.side=Ne,H.needsUpdate=!0,w.renderBufferDirect(q,O,V,H,S,yt),H.side=Xn,H.needsUpdate=!0,w.renderBufferDirect(q,O,V,H,S,yt),H.side=wn):w.renderBufferDirect(q,O,V,H,S,yt),S.onAfterRender(w,O,q,V,H,yt)}function Ps(S,O,q){O.isScene!==!0&&(O=bt);const V=W.get(S),H=A.state.lights,yt=A.state.shadowsArray,Et=H.state.version,Mt=pt.getParameters(S,H.state,yt,O,q,A.state.lightProbeGridArray),Pt=pt.getProgramCacheKey(Mt);let Ut=V.programs;V.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?O.environment:null,V.fog=O.fog;const Yt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;V.envMap=lt.get(S.envMap||V.environment,Yt),V.envMapRotation=V.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,Ut===void 0&&(S.addEventListener("dispose",sn),Ut=new Map,V.programs=Ut);let Jt=Ut.get(Pt);if(Jt!==void 0){if(V.currentProgram===Jt&&V.lightsStateVersion===Et)return Fl(S,Mt),Jt}else Mt.uniforms=pt.getUniforms(S),I!==null&&S.isNodeMaterial&&I.build(S,q,Mt),S.onBeforeCompile(Mt,w),Jt=pt.acquireProgram(Mt,Pt),Ut.set(Pt,Jt),V.uniforms=Mt.uniforms;const Ft=V.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ft.clippingPlanes=Bt.uniform),Fl(S,Mt),V.needsLights=Du(S),V.lightsStateVersion=Et,V.needsLights&&(Ft.ambientLightColor.value=H.state.ambient,Ft.lightProbe.value=H.state.probe,Ft.directionalLights.value=H.state.directional,Ft.directionalLightShadows.value=H.state.directionalShadow,Ft.spotLights.value=H.state.spot,Ft.spotLightShadows.value=H.state.spotShadow,Ft.rectAreaLights.value=H.state.rectArea,Ft.ltc_1.value=H.state.rectAreaLTC1,Ft.ltc_2.value=H.state.rectAreaLTC2,Ft.pointLights.value=H.state.point,Ft.pointLightShadows.value=H.state.pointShadow,Ft.hemisphereLights.value=H.state.hemi,Ft.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ft.spotLightMatrix.value=H.state.spotLightMatrix,Ft.spotLightMap.value=H.state.spotLightMap,Ft.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=A.state.lightProbeGridArray.length>0,V.currentProgram=Jt,V.uniformsList=null,Jt}function Ul(S){if(S.uniformsList===null){const O=S.currentProgram.getUniforms();S.uniformsList=mr.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function Fl(S,O){const q=W.get(S);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function Pu(S,O){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let q=0,V=S.length;q<V;q++){const H=S[q];if(H.texture!==null&&H.boundingBox.containsPoint(x))return H}return null}function Lu(S,O,q,V,H){O.isScene!==!0&&(O=bt),Y.resetTextureUnits();const yt=O.fog,Et=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?O.environment:null,Mt=J===null?w.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:te.workingColorSpace,Pt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ut=lt.get(V.envMap||Et,Pt),Yt=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Jt=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ft=!!q.morphAttributes.position,oe=!!q.morphAttributes.normal,_e=!!q.morphAttributes.color;let ge=dn;V.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ge=w.toneMapping);const le=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Pe=le!==void 0?le.length:0,wt=W.get(V),ze=A.state.lights;if(et===!0&&(tt===!0||S!==ht)){const ue=S===ht&&V.id===it;Bt.setState(V,S,ue)}let se=!1;V.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==ze.state.version||wt.outputColorSpace!==Mt||H.isBatchedMesh&&wt.batching===!1||!H.isBatchedMesh&&wt.batching===!0||H.isBatchedMesh&&wt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&wt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&wt.instancing===!1||!H.isInstancedMesh&&wt.instancing===!0||H.isSkinnedMesh&&wt.skinning===!1||!H.isSkinnedMesh&&wt.skinning===!0||H.isInstancedMesh&&wt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&wt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&wt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&wt.instancingMorph===!1&&H.morphTexture!==null||wt.envMap!==Ut||V.fog===!0&&wt.fog!==yt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==Bt.numPlanes||wt.numIntersection!==Bt.numIntersection)||wt.vertexAlphas!==Yt||wt.vertexTangents!==Jt||wt.morphTargets!==Ft||wt.morphNormals!==oe||wt.morphColors!==_e||wt.toneMapping!==ge||wt.morphTargetsCount!==Pe||!!wt.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(se=!0):(se=!0,wt.__version=V.version);let Ye=wt.currentProgram;se===!0&&(Ye=Ps(V,O,H),I&&V.isNodeMaterial&&I.onUpdateProgram(V,Ye,wt));let rn=!1,Dn=!1,vi=!1;const ce=Ye.getUniforms(),ve=wt.uniforms;if(_.useProgram(Ye.program)&&(rn=!0,Dn=!0,vi=!0),V.id!==it&&(it=V.id,Dn=!0),wt.needsLights){const ue=Pu(A.state.lightProbeGridArray,H);wt.lightProbeGrid!==ue&&(wt.lightProbeGrid=ue,Dn=!0)}if(rn||ht!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ce.setValue(D,"projectionMatrix",S.projectionMatrix),ce.setValue(D,"viewMatrix",S.matrixWorldInverse);const Un=ce.map.cameraPosition;Un!==void 0&&Un.setValue(D,at.setFromMatrixPosition(S.matrixWorld)),C.logarithmicDepthBuffer&&ce.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ce.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),ht!==S&&(ht=S,Dn=!0,vi=!0)}if(wt.needsLights&&(ze.state.directionalShadowMap.length>0&&ce.setValue(D,"directionalShadowMap",ze.state.directionalShadowMap,Y),ze.state.spotShadowMap.length>0&&ce.setValue(D,"spotShadowMap",ze.state.spotShadowMap,Y),ze.state.pointShadowMap.length>0&&ce.setValue(D,"pointShadowMap",ze.state.pointShadowMap,Y)),H.isSkinnedMesh){ce.setOptional(D,H,"bindMatrix"),ce.setOptional(D,H,"bindMatrixInverse");const ue=H.skeleton;ue&&(ue.boneTexture===null&&ue.computeBoneTexture(),ce.setValue(D,"boneTexture",ue.boneTexture,Y))}H.isBatchedMesh&&(ce.setOptional(D,H,"batchingTexture"),ce.setValue(D,"batchingTexture",H._matricesTexture,Y),ce.setOptional(D,H,"batchingIdTexture"),ce.setValue(D,"batchingIdTexture",H._indirectTexture,Y),ce.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&ce.setValue(D,"batchingColorTexture",H._colorsTexture,Y));const Nn=q.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&U.update(H,q,Ye),(Dn||wt.receiveShadow!==H.receiveShadow)&&(wt.receiveShadow=H.receiveShadow,ce.setValue(D,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&O.environment!==null&&(ve.envMapIntensity.value=O.environmentIntensity),ve.dfgLUT!==void 0&&(ve.dfgLUT.value=vv()),Dn){if(ce.setValue(D,"toneMappingExposure",w.toneMappingExposure),wt.needsLights&&Iu(ve,vi),yt&&V.fog===!0&&Nt.refreshFogUniforms(ve,yt),Nt.refreshMaterialUniforms(ve,V,st,ot,A.state.transmissionRenderTarget[S.id]),wt.needsLights&&wt.lightProbeGrid){const ue=wt.lightProbeGrid;ve.probesSH.value=ue.texture,ve.probesMin.value.copy(ue.boundingBox.min),ve.probesMax.value.copy(ue.boundingBox.max),ve.probesResolution.value.copy(ue.resolution)}mr.upload(D,Ul(wt),ve,Y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(mr.upload(D,Ul(wt),ve,Y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ce.setValue(D,"center",H.center),ce.setValue(D,"modelViewMatrix",H.modelViewMatrix),ce.setValue(D,"normalMatrix",H.normalMatrix),ce.setValue(D,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){const ue=V.uniformsGroups;for(let Un=0,xi=ue.length;Un<xi;Un++){const Ol=ue[Un];nt.update(Ol,Ye),nt.bind(Ol,Ye)}}return Ye}function Iu(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function Du(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(S,O,q){const V=W.get(S);V.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),W.get(S.texture).__webglTexture=O,W.get(S.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){const q=W.get(S);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(S,O=0,q=0){J=S,G=O,z=q;let V=null,H=!1,yt=!1;if(S){const Mt=W.get(S);if(Mt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(D.FRAMEBUFFER,Mt.__webglFramebuffer),ct.copy(S.viewport),xt.copy(S.scissor),Ht=S.scissorTest,_.viewport(ct),_.scissor(xt),_.setScissorTest(Ht),it=-1;return}else if(Mt.__webglFramebuffer===void 0)Y.setupRenderTarget(S);else if(Mt.__hasExternalTextures)Y.rebindTextures(S,W.get(S.texture).__webglTexture,W.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Yt=S.depthTexture;if(Mt.__boundDepthTexture!==Yt){if(Yt!==null&&W.has(Yt)&&(S.width!==Yt.image.width||S.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(S)}}const Pt=S.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(yt=!0);const Ut=W.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ut[O])?V=Ut[O][q]:V=Ut[O],H=!0):S.samples>0&&Y.useMultisampledRTT(S)===!1?V=W.get(S).__webglMultisampledFramebuffer:Array.isArray(Ut)?V=Ut[q]:V=Ut,ct.copy(S.viewport),xt.copy(S.scissor),Ht=S.scissorTest}else ct.copy(Lt).multiplyScalar(st).floor(),xt.copy(zt).multiplyScalar(st).floor(),Ht=Ct;if(q!==0&&(V=B),_.bindFramebuffer(D.FRAMEBUFFER,V)&&_.drawBuffers(S,V),_.viewport(ct),_.scissor(xt),_.setScissorTest(Ht),H){const Mt=W.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,Mt.__webglTexture,q)}else if(yt){const Mt=O;for(let Pt=0;Pt<S.textures.length;Pt++){const Ut=W.get(S.textures[Pt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Pt,Ut.__webglTexture,q,Mt)}}else if(S!==null&&q!==0){const Mt=W.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Mt.__webglTexture,q)}it=-1},this.readRenderTargetPixels=function(S,O,q,V,H,yt,Et,Mt=0){if(!(S&&S.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=W.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Et!==void 0&&(Pt=Pt[Et]),Pt){_.bindFramebuffer(D.FRAMEBUFFER,Pt);try{const Ut=S.textures[Mt],Yt=Ut.format,Jt=Ut.type;if(S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Mt),!C.textureFormatReadable(Yt)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Jt)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-V&&q>=0&&q<=S.height-H&&D.readPixels(O,q,V,H,gt.convert(Yt),gt.convert(Jt),yt)}finally{const Ut=J!==null?W.get(J).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(S,O,q,V,H,yt,Et,Mt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=W.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Et!==void 0&&(Pt=Pt[Et]),Pt)if(O>=0&&O<=S.width-V&&q>=0&&q<=S.height-H){_.bindFramebuffer(D.FRAMEBUFFER,Pt);const Ut=S.textures[Mt],Yt=Ut.format,Jt=Ut.type;if(S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Mt),!C.textureFormatReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ft=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ft),D.bufferData(D.PIXEL_PACK_BUFFER,yt.byteLength,D.STREAM_READ),D.readPixels(O,q,V,H,gt.convert(Yt),gt.convert(Jt),0);const oe=J!==null?W.get(J).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,oe);const _e=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await zd(D,_e,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ft),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,yt),D.deleteBuffer(Ft),D.deleteSync(_e),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,q=0){const V=Math.pow(2,-q),H=Math.floor(S.image.width*V),yt=Math.floor(S.image.height*V),Et=O!==null?O.x:0,Mt=O!==null?O.y:0;Y.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,Et,Mt,H,yt),_.unbindTexture()},this.copyTextureToTexture=function(S,O,q=null,V=null,H=0,yt=0){let Et,Mt,Pt,Ut,Yt,Jt,Ft,oe,_e;const ge=S.isCompressedTexture?S.mipmaps[yt]:S.image;if(q!==null)Et=q.max.x-q.min.x,Mt=q.max.y-q.min.y,Pt=q.isBox3?q.max.z-q.min.z:1,Ut=q.min.x,Yt=q.min.y,Jt=q.isBox3?q.min.z:0;else{const ve=Math.pow(2,-H);Et=Math.floor(ge.width*ve),Mt=Math.floor(ge.height*ve),S.isDataArrayTexture?Pt=ge.depth:S.isData3DTexture?Pt=Math.floor(ge.depth*ve):Pt=1,Ut=0,Yt=0,Jt=0}V!==null?(Ft=V.x,oe=V.y,_e=V.z):(Ft=0,oe=0,_e=0);const le=gt.convert(O.format),Pe=gt.convert(O.type);let wt;O.isData3DTexture?(Y.setTexture3D(O,0),wt=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Y.setTexture2DArray(O,0),wt=D.TEXTURE_2D_ARRAY):(Y.setTexture2D(O,0),wt=D.TEXTURE_2D),_.activeTexture(D.TEXTURE0),_.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),_.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),_.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const ze=_.getParameter(D.UNPACK_ROW_LENGTH),se=_.getParameter(D.UNPACK_IMAGE_HEIGHT),Ye=_.getParameter(D.UNPACK_SKIP_PIXELS),rn=_.getParameter(D.UNPACK_SKIP_ROWS),Dn=_.getParameter(D.UNPACK_SKIP_IMAGES);_.pixelStorei(D.UNPACK_ROW_LENGTH,ge.width),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ge.height),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Ut),_.pixelStorei(D.UNPACK_SKIP_ROWS,Yt),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Jt);const vi=S.isDataArrayTexture||S.isData3DTexture,ce=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){const ve=W.get(S),Nn=W.get(O),ue=W.get(ve.__renderTarget),Un=W.get(Nn.__renderTarget);_.bindFramebuffer(D.READ_FRAMEBUFFER,ue.__webglFramebuffer),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,Un.__webglFramebuffer);for(let xi=0;xi<Pt;xi++)vi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,W.get(S).__webglTexture,H,Jt+xi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,W.get(O).__webglTexture,yt,_e+xi)),D.blitFramebuffer(Ut,Yt,Et,Mt,Ft,oe,Et,Mt,D.DEPTH_BUFFER_BIT,D.NEAREST);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(H!==0||S.isRenderTargetTexture||W.has(S)){const ve=W.get(S),Nn=W.get(O);_.bindFramebuffer(D.READ_FRAMEBUFFER,X),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,N);for(let ue=0;ue<Pt;ue++)vi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ve.__webglTexture,H,Jt+ue):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ve.__webglTexture,H),ce?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Nn.__webglTexture,yt,_e+ue):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Nn.__webglTexture,yt),H!==0?D.blitFramebuffer(Ut,Yt,Et,Mt,Ft,oe,Et,Mt,D.COLOR_BUFFER_BIT,D.NEAREST):ce?D.copyTexSubImage3D(wt,yt,Ft,oe,_e+ue,Ut,Yt,Et,Mt):D.copyTexSubImage2D(wt,yt,Ft,oe,Ut,Yt,Et,Mt);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ce?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(wt,yt,Ft,oe,_e,Et,Mt,Pt,le,Pe,ge.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(wt,yt,Ft,oe,_e,Et,Mt,Pt,le,ge.data):D.texSubImage3D(wt,yt,Ft,oe,_e,Et,Mt,Pt,le,Pe,ge):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,yt,Ft,oe,Et,Mt,le,Pe,ge.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,yt,Ft,oe,ge.width,ge.height,le,ge.data):D.texSubImage2D(D.TEXTURE_2D,yt,Ft,oe,Et,Mt,le,Pe,ge);_.pixelStorei(D.UNPACK_ROW_LENGTH,ze),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,se),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Ye),_.pixelStorei(D.UNPACK_SKIP_ROWS,rn),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Dn),yt===0&&O.generateMipmaps&&D.generateMipmap(wt),_.unbindTexture()},this.initRenderTarget=function(S){W.get(S).__webglFramebuffer===void 0&&Y.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Y.setTextureCube(S,0):S.isData3DTexture?Y.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Y.setTexture2DArray(S,0):Y.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){G=0,z=0,J=null,_.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}class Mv extends Xh{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new _i;t.deleteAttribute("uv");const e=new Cr({side:Ne}),n=new Cr,s=new Mp(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new de(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Ef(t,n,6),o=new Ee;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new de(t,Ui(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new de(t,Ui(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new de(t,Ui(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new de(t,Ui(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new de(t,Ui(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new de(t,Ui(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Ui(i){return new mp({color:0,emissive:16777215,emissiveIntensity:i})}const yv=`
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aLife;
  varying vec3 vColor;
  varying float vLife;
  void main() {
    vColor = aColor; vLife = aLife;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (220.0 / -mv.z) * (0.4 + 0.6 * aLife);
    gl_Position = projectionMatrix * mv;
  }`,Sv=`
  varying vec3 vColor;
  varying float vLife;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.05, d) * vLife;
    gl_FragColor = vec4(vColor, a);
  }`;class Oo{constructor(t=400,e=!1){this.head=0,this.n=t,this.pos=new Float32Array(t*3).fill(1e4),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.maxLife=new Float32Array(t).fill(1),this.col=new Float32Array(t*3),this.size=new Float32Array(t),this.gravity=new Float32Array(t),this.geom=new Se,this.geom.setAttribute("position",new we(this.pos,3)),this.geom.setAttribute("aColor",new we(this.col,3)),this.geom.setAttribute("aSize",new we(this.size,1)),this.geom.setAttribute("aLife",new we(this.life,1));const n=new qe({vertexShader:yv,fragmentShader:Sv,transparent:!0,depthWrite:!1,blending:e?za:oi});this.points=new Pf(this.geom,n),this.points.frustumCulled=!1}emit(t,e,n,s,r={}){const a=r.speed??1,o=r.spread??.6,l=r.life??.7,c=r.size??.05,h=r.gravity??2,d=r.jitter??.3;for(let u=0;u<n;u++){const f=this.head;this.head=(this.head+1)%this.n;const g=f*3;this.pos[g]=t.x,this.pos[g+1]=t.y,this.pos[g+2]=t.z;const y=(Math.random()-.5)*2,m=(Math.random()-.5)*2,p=(Math.random()-.5)*2,E=a*(.5+Math.random());this.vel[g]=(e.x+y*o)*E,this.vel[g+1]=(e.y+m*o)*E,this.vel[g+2]=(e.z+p*o)*E;const T=l*(.6+Math.random()*.8);this.life[f]=1,this.maxLife[f]=T;const x=1-d+Math.random()*d*2;this.col[g]=s.r*x,this.col[g+1]=s.g*x,this.col[g+2]=s.b*x,this.size[f]=c*(.6+Math.random()*.8),this.gravity[f]=h}}update(t){const{pos:e,vel:n,life:s}=this;let r=!1;for(let a=0;a<this.n;a++){if(s[a]<=0)continue;r=!0;const o=a*3;n[o+1]-=this.gravity[a]*t,n[o]*=.98,n[o+2]*=.98,e[o]+=n[o]*t,e[o+1]+=n[o+1]*t,e[o+2]+=n[o+2]*t,s[a]-=t/this.maxLife[a],s[a]<=0&&(s[a]=0,e[o]=1e4)}r&&(this.geom.attributes.position.needsUpdate=!0,this.geom.attributes.aLife.needsUpdate=!0,this.geom.attributes.aColor.needsUpdate=!0,this.geom.attributes.aSize.needsUpdate=!0)}dispose(){this.geom.dispose(),this.points.material.dispose()}}const bv=`
  varying vec3 vPos;
  void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,wv=`
  varying vec3 vPos;
  uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uBottom;
  void main() {
    float h = normalize(vPos).y;
    vec3 c = h > 0.0 ? mix(uMid, uTop, smoothstep(0.0, 0.8, h)) : mix(uMid, uBottom, smoothstep(0.0, -0.6, h));
    gl_FragColor = vec4(c, 1.0);
  }`,Ev=`
  varying vec2 vUv;
  uniform vec3 uColor; uniform float uRing;
  float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float n(vec2 p) { vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
    return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
  void main() {
    vec2 p = (vUv - 0.5) * 24.0;
    vec2 g = abs(fract(p) - 0.5);
    float line = smoothstep(0.47, 0.5, max(g.x, g.y));
    float stain = n(p * 0.35) * 0.5 + n(p * 1.3) * 0.2;
    vec3 c = uColor * (0.75 + stain * 0.5) * (1.0 - line * 0.5);
    float r = length(vUv - 0.5) * 2.0;
    /* Круг арены — светящаяся кромка. */
    float rim = uRing * (1.0 - smoothstep(0.0, 0.02, abs(r - 0.34)));
    c += rim * vec3(1.0, 0.55, 0.2) * 1.5;
    c *= 1.0 - smoothstep(0.5, 1.0, r);
    gl_FragColor = vec4(c, 1.0);
  }`,Av=`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;class Tv{constructor(t){this.scene=new Xh,this.root=new en,this.flakes=new Oo(500,!1),this.view="none",this.width=1,this.height=1,this.camTarget=new L,this.camPos=new L(0,1,6),this.lookAt=new L,this.snap=!0,this.cueTarget=new L,this.cuePull=0,this.cueLook=new L,this.renderer=new xv({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.renderer.toneMapping=qo,this.renderer.toneMappingExposure=.95,this.renderer.outputColorSpace=He,this.camera=new We(46,1,.1,100);const e=new No(this.renderer);this.scene.environment=e.fromScene(new Mv,.04).texture,e.dispose(),this.key=new Tc(16773340,1.7),this.key.position.set(2.5,5,3),this.rim=new Tc(10406143,1.2),this.rim.position.set(-3,3,-3);const n=new vp(12568792,3811870,.55);this.scene.add(this.key,this.rim,n,this.root,this.flakes.points),this.backMat=new qe({vertexShader:bv,fragmentShader:wv,side:Ne,depthWrite:!1,uniforms:{uTop:{value:new Dt(723984)},uMid:{value:new Dt(2367775)},uBottom:{value:new Dt(920844)}}}),this.backdrop=new de(new Ur(40,24,16),this.backMat),this.scene.add(this.backdrop),this.floorMat=new qe({vertexShader:Av,fragmentShader:Ev,uniforms:{uColor:{value:new Dt(6971738)},uRing:{value:0}}}),this.floor=new de(new Rs(16,16),this.floorMat),this.floor.rotation.x=-Math.PI/2,this.scene.add(this.floor),this.resize(),window.addEventListener("resize",()=>this.resize())}resize(){const t=window.innerWidth||1,e=window.innerHeight||1;this.width=t,this.height=e,this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.applyView(!0)}get aspect(){return this.width/this.height}fit(t){const n=Math.tan(rf.degToRad(this.camera.fov/2))*Math.min(1,this.aspect);return t/n}setView(t){this.view!==t&&(this.view=t,this.applyView(!1))}applyView(t){switch(this.snap=t||this.snap,this.view){case"work":{const e=this.fit(.8);this.camPos.set(0,.35,e),this.camTarget.set(0,-.28*Math.min(1,1/this.aspect),0),this.floor.position.y=-1.6,this.floorMat.uniforms.uRing.value=0,this.backMat.uniforms.uMid.value.set(2827811);break}case"hub":{const e=Math.max(4.4,this.fit(1.3));this.camPos.set(0,2.1,e),this.camTarget.set(0,.75,0),this.floor.position.y=0,this.floorMat.uniforms.uRing.value=0,this.backMat.uniforms.uMid.value.set(2367775);break}case"title":{const e=Math.max(4.6,this.fit(1.3));this.camPos.set(.6,1.6,e),this.camTarget.set(0,-.2,0),this.floor.position.y=0,this.floorMat.uniforms.uRing.value=0,this.backMat.uniforms.uMid.value.set(2367775);break}case"cover":{const e=Math.max(3.6,this.fit(1.2));this.camPos.set(.9,1.8,e),this.camTarget.set(0,1.2,0),this.floor.position.y=0,this.floorMat.uniforms.uRing.value=0,this.backMat.uniforms.uMid.value.set(2762018);break}case"arena":{const e=Math.max(5.4,this.fit(2));this.camPos.set(.2,2.4,e),this.camTarget.set(0,1,0),this.floor.position.y=0,this.floorMat.uniforms.uRing.value=1,this.backMat.uniforms.uMid.value.set(1711142);break}}}updateCamera(t){if(this.snap)this.camera.position.copy(this.camPos),this.lookAt.copy(this.camTarget),this.snap=!1;else{const n=1-Math.exp(-t*6);this.camera.position.lerp(this.camPos,n),this.lookAt.lerp(this.camTarget,n)}const e=this.cuePull*.3;this.cueLook.lerpVectors(this.lookAt,this.cueTarget,e),e>0&&this.camera.position.lerp(this.cueTarget,e*.12),this.camera.lookAt(this.cueLook)}shake(t){this.camera.position.x+=(Math.random()-.5)*t,this.camera.position.y+=(Math.random()-.5)*t}render(){this.renderer.render(this.scene,this.camera)}ndc(t,e,n){return n.set(t/this.width*2-1,-(e/this.height)*2+1),n}}class Rv{constructor(){this.blocked=!1,this.handlers=new Map,this.toastTimer=0}on(t,e){this.handlers.set(t,e);const n=document.getElementById("btn-"+t);if(!n)throw new Error("no button btn-"+t);n.addEventListener("click",s=>{s.preventDefault(),this.click(t)})}click(t){if(this.blocked)return!1;const e=document.getElementById("btn-"+t);if(!e||e.hidden||e.closest("[hidden]")||e.disabled)return!1;const n=this.handlers.get(t);return n?(n(),!0):!1}el(t){return document.getElementById(t)}show(t,e=!0){const n=document.getElementById(t);n&&(n.hidden=!e)}text(t,e){const n=document.getElementById(t);n&&n.textContent!==e&&(n.textContent=e)}screen(t,e){for(const n of e)this.show(n,n===t)}toast(t,e=2400){const n=this.el("toast");n.textContent=t,n.hidden=!1,clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>{n.hidden=!0},e)}float(t,e,n,s=""){const r=this.el("float-layer"),a=document.createElement("div");a.className="float "+s,a.textContent=t,a.style.left=(e*100).toFixed(1)+"%",a.style.top=(n*100).toFixed(1)+"%",r.appendChild(a),setTimeout(()=>a.remove(),950)}flash(){const t=this.el("flash");t.classList.remove("on"),t.offsetWidth,t.classList.add("on")}meta(t,e){for(const n of document.querySelectorAll(".lang-btn"))n.textContent=F("Язык:")+" "+t;for(const n of document.querySelectorAll(".sound-btn:not(.icon-btn)"))n.textContent=F(e?"Звук: вкл":"Звук: выкл");for(const n of document.querySelectorAll(".icon-btn.sound-btn"))n.textContent=e?"♪":"✕",n.setAttribute("aria-label",F(e?"Звук: вкл":"Звук: выкл"))}retranslate(){vr()}card(t){const e=document.createElement("div");e.className="card"+(t.sel?" sel":"");const n=document.createElement("div");n.className="ico",n.textContent=t.icon,t.iconBg&&(n.style.background=t.iconBg),e.appendChild(n);const s=document.createElement("div");s.className="body";const r=document.createElement("div");if(r.className="name",r.textContent=t.name,s.appendChild(r),t.sub){const a=document.createElement("div");a.className="sub",a.textContent=t.sub,s.appendChild(a)}if(t.mini&&t.mini.length){const a=document.createElement("div");a.className="mini";for(const o of t.mini){const l=document.createElement("span");l.textContent=o,a.appendChild(l)}s.appendChild(a)}if(e.appendChild(s),t.button2&&t.onClick2){const a=document.createElement("button");a.className="ghost",a.textContent=t.button2,a.addEventListener("click",o=>{o.preventDefault(),this.blocked||t.onClick2()}),e.appendChild(a)}if(t.button){const a=document.createElement("button");a.className=t.buttonCls??"",a.textContent=t.button,a.disabled=!!t.buttonDisabled,t.onClick&&a.addEventListener("click",o=>{o.preventDefault(),this.blocked||t.onClick()}),e.appendChild(a)}return e}stats(t,e){t.textContent="";for(const n of e){const s=document.createElement("div");s.className="stat";const r=document.createElement("div");r.className="v",r.textContent=String(Math.round(n.v));const a=document.createElement("div");a.className="k",a.textContent=n.k;const o=document.createElement("div");o.className="bar";const l=document.createElement("div");l.style.width=Math.round(Math.min(1,n.v/n.max)*100)+"%",o.appendChild(l),s.append(r,a,o),t.appendChild(s)}}}function sr(i){const t=i/1e3,e=Math.floor(t/60),n=t-e*60;return e+":"+(n<10?"0":"")+n.toFixed(1)}class Cv{constructor(){this.ctx=null,this.master=null,this.noise=null,this.scrapeGain=null,this.scrapeFilter=null,this.hum=null,this.lastHaptic=0,this.muted=!1,this.focus=!0,this.ad=!1,this.platform=!1}get ready(){return!!this.ctx}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const e=new t;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.level(),this.master.connect(e.destination);const n=e.sampleRate*2,s=e.createBuffer(1,n,e.sampleRate),r=s.getChannelData(0);for(let h=0;h<n;h++)r[h]=Math.random()*2-1;this.noise=s;const a=e.createBufferSource();a.buffer=s,a.loop=!0;const o=e.createBiquadFilter();o.type="bandpass",o.frequency.value=1800,o.Q.value=1.2;const l=e.createGain();l.gain.value=0,a.connect(o),o.connect(l),l.connect(this.master),a.start(),this.scrapeFilter=o,this.scrapeGain=l;const c=e.createGain();c.gain.value=0,c.connect(this.master);for(const h of[55,55.7,110]){const d=e.createOscillator();d.type="sine",d.frequency.value=h;const u=e.createGain();u.gain.value=h>100?.05:.12,d.connect(u),u.connect(c),d.start()}this.hum=c}level(){return this.muted||!this.focus||this.ad||this.platform?0:.9}ramp(){!this.master||!this.ctx||this.master.gain.setTargetAtTime(this.level(),this.ctx.currentTime,.05)}toggleMute(){return this.muted=!this.muted,this.ramp(),this.muted}setMuted(t){this.muted=t,this.ramp()}setFocus(t){this.focus=t,this.ramp(),t&&this.ctx?.state==="suspended"&&this.ctx.resume()}adMute(t){this.ad=t,this.ramp()}platformMute(t){this.platform=t,this.ramp()}ambient(t){!this.hum||!this.ctx||this.hum.gain.setTargetAtTime(t?.35:0,this.ctx.currentTime,.4)}scrape(t,e,n){if(!this.ctx||!this.scrapeGain||!this.scrapeFilter)return;const s=this.ctx.currentTime,r=Math.min(.5,t*.02+(t>0?.05:0));let a=1400+Math.min(e,3)*900,o=1.2;if(n==="sand"&&(a=3200+Math.min(e,3)*400,o=.5),n==="spray"&&(a=2600,o=.4),n==="solvent"&&(a=900+Math.min(e,3)*300,o=2.5),this.scrapeGain.gain.setTargetAtTime(r,s,.03),this.scrapeFilter.frequency.setTargetAtTime(a,s,.05),this.scrapeFilter.Q.setTargetAtTime(o,s,.05),t>.5&&navigator.vibrate&&performance.now()-this.lastHaptic>90){this.lastHaptic=performance.now();try{navigator.vibrate(6)}catch{}}}scrapeStop(){!this.ctx||!this.scrapeGain||this.scrapeGain.gain.setTargetAtTime(0,this.ctx.currentTime,.04)}burst(t,e,n,s,r=0){if(!this.ctx||!this.noise||!this.master)return;const a=this.ctx.currentTime+r,o=this.ctx.createBufferSource();o.buffer=this.noise;const l=this.ctx.createBiquadFilter();l.type="bandpass",l.frequency.value=t,l.Q.value=e;const c=this.ctx.createGain();c.gain.setValueAtTime(s,a),c.gain.exponentialRampToValueAtTime(.001,a+n),o.connect(l),l.connect(c),c.connect(this.master),o.start(a),o.stop(a+n+.05)}tone(t,e,n,s="sine",r=0,a=1){if(!this.ctx||!this.master)return;const o=this.ctx.currentTime+r,l=this.ctx.createOscillator();l.type=s,l.frequency.setValueAtTime(t,o),a!==1&&l.frequency.exponentialRampToValueAtTime(t*a,o+e);const c=this.ctx.createGain();c.gain.setValueAtTime(n,o),c.gain.exponentialRampToValueAtTime(.001,o+e),l.connect(c),c.connect(this.master),l.start(o),l.stop(o+e+.05)}click(){this.burst(2400,3,.05,.25)}clank(){this.burst(600,6,.25,.5),this.tone(880,.5,.18,"triangle",.01,.98),this.tone(1320,.7,.1,"sine",.02,.99)}shine(){this.tone(1200,.6,.12,"sine",0,2.2),this.tone(1800,.5,.06,"sine",.12,1.6)}coin(){this.tone(1568,.09,.2,"square"),this.tone(2093,.16,.2,"square",.08)}hit(t){this.burst(t?250:500,2,t?.35:.18,t?.7:.45),this.tone(t?160:320,t?.4:.2,t?.3:.15,"triangle",0,.6)}dodge(){this.burst(3e3,1,.12,.2)}charge(){this.tone(300,.5,.15,"sawtooth",0,4)}bell(){this.tone(660,.9,.25,"triangle"),this.tone(1320,.9,.1,"sine")}win(){for(const[t,e]of[523,659,784,1046].entries())this.tone(e,.35,.18,"triangle",t*.12);this.burst(800,1,.5,.2,.45)}lose(){for(const[t,e]of[392,349,311].entries())this.tone(e,.5,.16,"sawtooth",t*.2,.9)}spark(){this.burst(5e3,.8,.06,.12)}}class Pv{constructor(t){this.mode="clean",this.ray=new Io,this.tmpN=new L,this.inv=new ne,this.local=new L,this.lastLocal=null,this.tool=t}begin(){this.lastLocal=null}stroke(t,e,n,s,r,a){a.hit=!1,a.removed=0,this.ray.setFromCamera(t,e);const o=this.ray.intersectObject(n,!1);if(!o.length){this.lastLocal=null;return}const l=o[0];this.inv.copy(n.matrixWorld).invert(),this.local.copy(l.point).applyMatrix4(this.inv),a.hit=!0,a.point.copy(this.local),a.normal.copy(l.face?l.face.normal:this.tmpN.set(0,1,0));const c=(Math.min(s,.08)*12+.12)*this.tool.rate*Math.min(r,.05)*26,h=n.geometry,d=this.tool.radius;if(this.lastLocal&&this.lastLocal.distanceTo(this.local)<d*6){const u=this.lastLocal.distanceTo(this.local),f=Math.max(1,Math.min(5,Math.ceil(u/(d*.6))));for(let g=1;g<=f;g++){const y=this.tmpN.copy(this.lastLocal).lerp(this.local,g/f);a.removed+=this.apply(h,y,d,c/f)}}else a.removed+=this.apply(h,this.local,d,c);this.lastLocal||(this.lastLocal=new L),this.lastLocal.copy(this.local)}apply(t,e,n,s){const r=t.attributes.position.array,a=this.mode==="clean"?t.attributes.aClean:t.attributes.aPaint,o=a.array,l=t.attributes.aGrit.array,c=a.count,h=n*n,d=e.x,u=e.y,f=e.z;let g=0;const y=this.mode==="paint",m=this.tool.gritPenalty,p=this.tool.dissolves;for(let E=0;E<c;E++){const T=r[E*3]-d;if(T>n||T<-n)continue;const x=r[E*3+1]-u;if(x>n||x<-n)continue;const R=r[E*3+2]-f,A=T*T+x*x+R*R;if(A>h)continue;const P=o[E];if(P>=1)continue;const v=1-A/h;let M=s*v*v;if(!y){const b=l[E];b>0&&(M/=1+b*(m-1),p&&(l[E]=Math.max(0,b-s*v)))}const w=P+M>1?1:P+M;g+=w-P,o[E]=w}return g>0&&(a.needsUpdate=!0),g}}class mn{constructor(t){this.s=t>>>0||2654435769}next(){this.s=this.s+1831565813>>>0;let t=this.s;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return t+Math.floor(this.next()*(e-t+1))}pick(t){return t[Math.floor(this.next()*t.length)]}chance(t){return this.next()<t}fork(t){return new mn(gu(this.s^Math.imul(t+1,2246822507)))}}function Qn(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function gu(i){return i=Math.imul(i^i>>>16,73244475),i=Math.imul(i^i>>>16,73244475),(i^i>>>16)>>>0}function Lv(i,t,e,n){let s=gu(i*73856093^t*19349663^e*83492791^n);return s=s>>>0,(s&65535)/65535}const ba=i=>i*i*(3-2*i);function th(i,t,e,n=0){const s=Math.floor(i),r=Math.floor(t),a=Math.floor(e),o=ba(i-s),l=ba(t-r),c=ba(e-a),h=(p,E,T)=>Lv(s+p,r+E,a+T,n),d=h(0,0,0)+(h(1,0,0)-h(0,0,0))*o,u=h(0,1,0)+(h(1,1,0)-h(0,1,0))*o,f=h(0,0,1)+(h(1,0,1)-h(0,0,1))*o,g=h(0,1,1)+(h(1,1,1)-h(0,1,1))*o,y=d+(u-d)*l,m=f+(g-f)*l;return y+(m-y)*c}function Bo(i,t,e,n=0){return th(i,t,e,n)*.65+th(i*2.3+7.1,t*2.3+3.7,e*2.3+1.9,n)*.35}function Iv(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Se;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=eh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let y=0;y<a[h].length;++y)f.push(a[h][y][u]);const g=eh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function eh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new we(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){const y=h.getComponent(u,g);o.setComponent(u+d,g,y)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}function Dv(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let a=0;const o=Object.keys(i.attributes),l={},c={},h=[],d=["getX","getY","getZ","getW"],u=["setX","setY","setZ","setW"];for(let E=0,T=o.length;E<T;E++){const x=o[E],R=i.attributes[x];l[x]=new R.constructor(new R.array.constructor(R.count*R.itemSize),R.itemSize,R.normalized);const A=i.morphAttributes[x];A&&(c[x]||(c[x]=[]),A.forEach((P,v)=>{const M=new P.array.constructor(P.count*P.itemSize);c[x][v]=new P.constructor(M,P.itemSize,P.normalized)}))}const f=t*.5,g=Math.log10(1/t),y=Math.pow(10,g),m=f*y;for(let E=0;E<r;E++){const T=n?n.getX(E):E;let x="";for(let R=0,A=o.length;R<A;R++){const P=o[R],v=i.getAttribute(P),M=v.itemSize;for(let w=0;w<M;w++)x+=`${~~(v[d[w]](T)*y+m)},`}if(x in e)h.push(e[x]);else{for(let R=0,A=o.length;R<A;R++){const P=o[R],v=i.getAttribute(P),M=i.morphAttributes[P],w=v.itemSize,b=l[P],I=c[P];for(let B=0;B<w;B++){const X=d[B],N=u[B];if(b[N](a,v[X](T)),M)for(let G=0,z=M.length;G<z;G++)I[G][N](a,M[G][X](T))}}e[x]=a,h.push(a),a++}}const p=i.clone();for(const E in i.attributes){const T=l[E];if(p.setAttribute(E,new T.constructor(T.array.slice(0,a*T.itemSize),T.itemSize,T.normalized)),E in c)for(let x=0;x<c[E].length;x++){const R=c[E][x];p.morphAttributes[E][x]=new R.constructor(R.array.slice(0,a*R.itemSize),R.itemSize,R.normalized)}}return p.setIndex(h),p}class Nv{constructor(t=.1,e=6){this.maxEdgeLength=t,this.maxIterations=e}modify(t){t.index!==null&&(t=t.toNonIndexed());const e=this.maxIterations,n=this.maxEdgeLength*this.maxEdgeLength,s=new L,r=new L,a=new L,o=new L,l=[s,r,a,o],c=new L,h=new L,d=new L,u=new L,f=[c,h,d,u],g=new Dt,y=new Dt,m=new Dt,p=new Dt,E=[g,y,m,p],T=new rt,x=new rt,R=new rt,A=new rt,P=[T,x,R,A],v=new rt,M=new rt,w=new rt,b=new rt,I=[v,M,w,b],B=t.attributes,X=B.normal!==void 0,N=B.color!==void 0,G=B.uv!==void 0,z=B.uv1!==void 0;let J=B.position.array,it=X?B.normal.array:null,ht=N?B.color.array:null,ct=G?B.uv.array:null,xt=z?B.uv1.array:null,Ht=J,ie=it,Kt=ht,Z=ct,ot=xt,st=0,Rt=!0;function Ot(zt,Ct,j){const et=l[zt],tt=l[Ct],ut=l[j];if(Ht.push(et.x,et.y,et.z),Ht.push(tt.x,tt.y,tt.z),Ht.push(ut.x,ut.y,ut.z),X){const at=f[zt],At=f[Ct],bt=f[j];ie.push(at.x,at.y,at.z),ie.push(At.x,At.y,At.z),ie.push(bt.x,bt.y,bt.z)}if(N){const at=E[zt],At=E[Ct],bt=E[j];Kt.push(at.r,at.g,at.b),Kt.push(At.r,At.g,At.b),Kt.push(bt.r,bt.g,bt.b)}if(G){const at=P[zt],At=P[Ct],bt=P[j];Z.push(at.x,at.y),Z.push(At.x,At.y),Z.push(bt.x,bt.y)}if(z){const at=I[zt],At=I[Ct],bt=I[j];ot.push(at.x,at.y),ot.push(At.x,At.y),ot.push(bt.x,bt.y)}}for(;Rt&&st<e;){st++,Rt=!1,J=Ht,Ht=[],X&&(it=ie,ie=[]),N&&(ht=Kt,Kt=[]),G&&(ct=Z,Z=[]),z&&(xt=ot,ot=[]);for(let zt=0,Ct=0,j=J.length;zt<j;zt+=9,Ct+=6){s.fromArray(J,zt+0),r.fromArray(J,zt+3),a.fromArray(J,zt+6),X&&(c.fromArray(it,zt+0),h.fromArray(it,zt+3),d.fromArray(it,zt+6)),N&&(g.fromArray(ht,zt+0),y.fromArray(ht,zt+3),m.fromArray(ht,zt+6)),G&&(T.fromArray(ct,Ct+0),x.fromArray(ct,Ct+2),R.fromArray(ct,Ct+4)),z&&(v.fromArray(xt,Ct+0),M.fromArray(xt,Ct+2),w.fromArray(xt,Ct+4));const et=s.distanceToSquared(r),tt=r.distanceToSquared(a),ut=s.distanceToSquared(a);et>n||tt>n||ut>n?(Rt=!0,et>=tt&&et>=ut?(o.lerpVectors(s,r,.5),X&&u.lerpVectors(c,h,.5),N&&p.lerpColors(g,y,.5),G&&A.lerpVectors(T,x,.5),z&&b.lerpVectors(v,M,.5),Ot(0,3,2),Ot(3,1,2)):tt>=et&&tt>=ut?(o.lerpVectors(r,a,.5),X&&u.lerpVectors(h,d,.5),N&&p.lerpColors(y,m,.5),G&&A.lerpVectors(x,R,.5),z&&b.lerpVectors(M,w,.5),Ot(0,1,3),Ot(3,2,0)):(o.lerpVectors(s,a,.5),X&&u.lerpVectors(c,d,.5),N&&p.lerpColors(g,m,.5),G&&A.lerpVectors(T,R,.5),z&&b.lerpVectors(v,w,.5),Ot(0,1,3),Ot(3,1,2))):Ot(0,1,2)}}const Lt=new Se;return Lt.setAttribute("position",new ee(Ht,3)),X&&Lt.setAttribute("normal",new ee(ie,3)),N&&Lt.setAttribute("color",new ee(Kt,3)),G&&Lt.setAttribute("uv",new ee(Z,2)),z&&Lt.setAttribute("uv1",new ee(ot,2)),Lt}}const li=["body","limbL","limbR","joint","core"],Ji={body:["plate","bracket","dome","flange"],limbL:["piston","claw","exhaust","crank"],limbR:["piston","claw","exhaust","crank"],joint:["gear","flange","crank","turbine"],core:["dome","turbine","gear","exhaust"]},Uv=i=>{const t=i.map(n=>{const s=n.index?n.toNonIndexed():n;for(const r of Object.keys(s.attributes))r!=="position"&&r!=="normal"&&r!=="uv"&&s.deleteAttribute(r);return s.attributes.uv||s.setAttribute("uv",new ee(new Float32Array(s.attributes.position.count*2),2)),s}),e=Iv(t,!1);if(!e)throw new Error("mergeGeometries failed");return e},be=(i,t,e,n=32,s=1,r=!1)=>new cl(i,t,e,n,s,r),In=(i,t,e)=>new _i(i,t,e,2,2,2),di=(i,t,e=32,n=12)=>new ml(i,t,n,e),xl=(i,t=24)=>new Ur(i,t,Math.max(8,t>>1)),Ml=(i,t)=>be(i,i,t,6),Ts=(i,t=48)=>new pl(i.map(([e,n])=>new rt(e,n)),t),yl=(i,t,e=.02,n=12)=>{const s=new fl(i,{depth:t,bevelEnabled:e>0,bevelThickness:e,bevelSize:e,bevelSegments:2,curveSegments:n});return s.translate(0,0,-t/2),s},_u=(i,t,e)=>{const n=[];for(let s=0;s<i;s++){const r=s/i*Math.PI*2;n.push(e(Math.cos(r)*t,Math.sin(r)*t,r,s))}return n};function Fv(i){const t=i.int(9,16),e=.5,n=e-i.range(.06,.1),s=new Nr,r=Math.PI*2/t;for(let h=0;h<t;h++){const d=h*r,u=[[d,n],[d+r*.18,e],[d+r*.5,e],[d+r*.68,n]];for(const[f,g]of u){const y=Math.cos(f)*g,m=Math.sin(f)*g;h===0&&f===d?s.moveTo(y,m):s.lineTo(y,m)}}s.closePath();const a=new Yi;a.absarc(0,0,i.range(.1,.15),0,Math.PI*2,!0),s.holes.push(a);const o=i.int(0,5);for(let h=0;h<o;h++){const d=h/o*Math.PI*2,u=new Yi;u.absarc(Math.cos(d)*.29,Math.sin(d)*.29,.07,0,Math.PI*2,!0),s.holes.push(u)}const l=i.range(.12,.2),c=i.range(.16,.22);return[yl(s,l,.015,6),be(c,c,l+.16,32).rotateX(Math.PI/2),be(.1,.1,l+.3,24).rotateX(Math.PI/2)]}function Ov(i){const t=i.range(.22,.3),e=i.range(.6,.8),n=i.range(.07,.1),s=[be(t,t,e,40,4),be(t+.03,t+.03,.08,40).translate(0,e/2-.02,0),be(t+.03,t+.03,.08,40).translate(0,-e/2+.02,0),be(n,n,e*.9,24).translate(0,e*.9,0),di(.16,.05,32,12).translate(0,e*1.35,0),be(.2,.2,.3,24).rotateZ(Math.PI/2).translate(0,-e/2-.1,0)],r=i.int(0,3);for(let a=0;a<r;a++)s.push(di(t+.01,.025,40,8).rotateX(Math.PI/2).translate(0,-e*.3+a*.16,0));return i.chance(.6)&&s.push(In(.12,.2,.08).translate(t+.02,0,0)),s}function Bv(i){const e=i.range(.08,.14),n=i.range(.1,.18),s=i.range(.12,.2),r=Ts([[s,-n/2],[.5,-n/2],[.5,n/2],[.5-e,n/2],[.5-e,n/2+i.range(.1,.22)],[s+.1,n/2+.25],[s,n/2+.25],[s,-n/2]],56),a=i.int(6,10),o=_u(a,.5-e/2,(l,c)=>Ml(.045,.06).translate(l,n/2+.03,c));return[r,...o]}function kv(i){const t=i.range(.9,1.1),e=i.range(.5,.7),n=.1,s=new Nr,r=.08;s.moveTo(-t/2+r,-e/2),s.lineTo(t/2-r,-e/2),s.quadraticCurveTo(t/2,-e/2,t/2,-e/2+r),s.lineTo(t/2,e/2-r),s.quadraticCurveTo(t/2,e/2,t/2-r,e/2),s.lineTo(-t/2+r,e/2),s.quadraticCurveTo(-t/2,e/2,-t/2,e/2-r),s.lineTo(-t/2,-e/2+r),s.quadraticCurveTo(-t/2,-e/2,-t/2+r,-e/2);const a=i.int(2,4);for(let c=0;c<a;c++){const h=new Yi;h.absarc(-t/2+(c+.5)*(t/a),0,i.range(.05,.09),0,Math.PI*2,!0),s.holes.push(h)}const o=[yl(s,n,.015,8)];o.push(In(t,n,i.range(.3,.45)).translate(0,-e/2-n/2,-.15)),i.chance(.7)&&o.push(In(n,e*.8,.3).translate(i.pick([-1,1])*(t/2-n/2),0,-.12));const l=i.int(3,6);for(let c=0;c<l;c++)o.push(xl(.03,10).translate(-t/2+(c+.5)*(t/l),e/2-.08,n/2));return o}function zv(i){const t=i.int(2,3),e=.28,n=.09,s=i.range(.16,.22),r=[];let a=-((t*2+1)*e)/2;r.push(be(n,n,e,24).rotateZ(Math.PI/2).translate(a+e/2,0,0)),a+=e;for(let o=0;o<t;o++){const l=o%2===0?1:-1;r.push(In(.08,s*2+.12,.3).translate(a+.04,l*s/2,0)),r.push(be(n*.9,n*.9,e,24).rotateZ(Math.PI/2).translate(a+e/2+.04,l*s,0)),r.push(In(.08,s*2+.12,.3).translate(a+e+.04,l*s/2,0)),a+=e+.08,r.push(be(n,n,e*.8,24).rotateZ(Math.PI/2).translate(a+e*.4+.04,0,0)),a+=e*.8+.04}return r.push(be(n*1.4,n*1.4,.1,24).rotateZ(Math.PI/2).translate(a,0,0)),r}function Vv(i){const t=i.pick([5,6,6,8]),e=new Nr,n=i.range(0,.08);for(let o=0;o<t;o++){const l=o/t*Math.PI*2-Math.PI/2,c=.55+(o%2?-n:n),h=Math.cos(l)*c,d=Math.sin(l)*c*i.range(.95,1.05);o===0?e.moveTo(h,d):e.lineTo(h,d)}if(e.closePath(),i.chance(.5)){const o=new Yi;o.moveTo(-.15,.22),o.lineTo(.15,.22),o.lineTo(.15,.28),o.lineTo(-.15,.28),o.closePath(),e.holes.push(o)}const s=i.range(.1,.16),r=[yl(e,s,.03,4)];i.chance(.7)&&r.push(In(.1,.7,.06).translate(0,-.05,s/2+.03));const a=i.int(t,t*2);for(let o=0;o<a;o++){const l=o/a*Math.PI*2;r.push(Ml(.035,.05).rotateX(Math.PI/2).translate(Math.cos(l)*.42,Math.sin(l)*.42,s/2+.02))}return r.push(In(.7,.6,.35).translate(0,0,-s/2-.17)),r}function Gv(i){const t=i.int(7,12),e=[Ts([[0,-.12],[.2,-.12],[.2,0],[.16,.18],[.08,.28],[0,.3]],40),di(.52,.045,48,10).rotateX(Math.PI/2)],n=i.range(.3,.6);for(let s=0;s<t;s++){const r=s/t*Math.PI*2,a=In(.3,.02,.14);a.applyMatrix4(new ne().makeRotationX(n)),a.applyMatrix4(new ne().makeTranslation(.34,0,0)),a.applyMatrix4(new ne().makeRotationY(r)),e.push(a)}return e}function Hv(i){const t=i.int(3,4),e=i.range(.22,.3),n=[be(.24,.3,.22,32).translate(0,.1,0),be(.12,.12,.5,24).translate(0,.45,0),di(.18,.04,32,10).rotateX(Math.PI/2).translate(0,.25,0)];for(let s=0;s<t;s++){const r=s/t*Math.PI*2,a=new dl(new L(e*.6,0,0),new L(e*1.2,-.35,0),new L(e*.5,-.65,0)),o=new gl(a,14,.055,12,!1);o.applyMatrix4(new ne().makeRotationY(r)),n.push(o),n.push(xl(.07,12).translate(Math.cos(r)*e*.6,0,-Math.sin(r)*e*.6))}return n}function Wv(i){const e=[];for(let o=0;o<=14;o++){const l=o/14*Math.PI/2;e.push([Math.cos(l)*.5,Math.sin(l)*.5*i.range(.85,1)])}e.push([.001,e[e.length-1][1]]);const r=[Ts(e,48),Ts([[.15,-.16],[.5+.06,-.16],[.5+.06,0],[.5,0],[.5,-.02],[.15,-.02]],48)],a=i.int(6,10);return r.push(..._u(a,.5+.02,(o,l)=>Ml(.04,.05).translate(o,-.08,l))),i.chance(.6)&&r.push(di(.16,.035,32,10).translate(0,.28,.5*.8).rotateX(-.6)),i.chance(.5)&&r.push(be(.02,.02,.35,8).translate(.3,.5+.1,0)),r}function Xv(i){const t=i.range(.13,.18),e=i.range(.9,1.1),n=[be(t,t,e,32,6).rotateZ(Math.PI/2),Ts([[t,0],[t+.02,.1],[t+.08,.25],[t+.14,.3],[t+.1,.3],[t+.02,.22],[t-.02,.1],[t-.02,0]],40).rotateZ(-Math.PI/2).translate(e/2,0,0),be(t+.08,t+.08,e*.5,32,1,!0).rotateZ(Math.PI/2)],s=i.int(2,4);for(let r=0;r<s;r++)n.push(di(t+.02,.03,32,8).rotateY(Math.PI/2).translate(-e/2+(r+.5)*(e/s),0,0));return n.push(In(.14,.12,.08).translate(-e/2+.1,-t-.05,0)),n}const qv={gear:Fv,piston:Ov,flange:Bv,bracket:kv,crank:zv,plate:Vv,turbine:Gv,claw:Hv,dome:Wv,exhaust:Xv};function Yv(i,t){switch(i){case"dome":return xl(.22,24).translate(0,.16,0);case"turbine":return be(.19,.19,.06,32).translate(0,-.14,0);case"gear":return di(.13,.03,32,8).rotateX(0);case"exhaust":return be(.1,.1,t.range(.3,.5),20).rotateZ(Math.PI/2).translate(.3,0,0);default:return null}}const Kv=new Nv(.032,8);function Zv(i,t,e,n){const s=new mn(t),r=qv[i](s.fork(1));let a=Uv(r);a.computeBoundingBox();const o=a.boundingBox,l=new L;o.getSize(l);const c=new L;o.getCenter(c);const h=1/Math.max(l.x,l.y,l.z);a.translate(-c.x,-c.y,-c.z),a.scale(h,h,h),a=Kv.modify(a),a=Dv(a,1e-4),a.computeBoundingBox(),a.computeBoundingSphere();const d=a.attributes.position.count,u=a.attributes.position.array,f=new Float32Array(d),g=new Float32Array(d),y=new Float32Array(d),m=t&65535;for(let E=0;E<d;E++){const T=u[E*3],x=u[E*3+1],R=u[E*3+2],P=(Bo(T*2.4+5,x*2.4+9,R*2.4+3,m)-e)/.25;f[E]=P<=0?0:P>=1?1:P*P*(3-2*P);const M=(Bo(T*3.1+17,x*3.1+11,R*3.1+29,m+77)-(.62-n*.2))/.15;y[E]=M<=0?0:M>=1?1:M}a.setAttribute("aClean",new we(f,1)),a.setAttribute("aPaint",new we(g,1)),a.setAttribute("aGrit",new we(y,1));let p=Yv(i,s.fork(2));return p?(p.translate(-c.x,-c.y,-c.z),p.scale(h,h,h)):p=null,{geom:a,glow:p,vertexCount:d}}function ls(i){const t=i.attributes.aClean.array;let e=0;for(let n=0;n<t.length;n++)e+=t[n];return t.length?e/t.length:0}function nh(i){const t=i.attributes.aPaint.array;let e=0;for(let n=0;n<t.length;n++)e+=t[n];return t.length?e/t.length:0}const Jv=`
  float rl_hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float rl_noise(vec3 x) {
    vec3 i = floor(x); vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(rl_hash(i + vec3(0,0,0)), rl_hash(i + vec3(1,0,0)), f.x),
                   mix(rl_hash(i + vec3(0,1,0)), rl_hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(rl_hash(i + vec3(0,0,1)), rl_hash(i + vec3(1,0,1)), f.x),
                   mix(rl_hash(i + vec3(0,1,1)), rl_hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float rl_fbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) { v += a * rl_noise(p); p = p * 2.1 + 3.7; a *= 0.5; }
    return v;
  }
`;function $v(i,t){const e=new Cr({color:16777215,metalness:1,roughness:.35,envMapIntensity:1}),n={uMetal:{value:new Dt(i)},uPaint:{value:new Dt(16777215)},uPaintMetal:{value:0},uBrushPos:{value:new L(0,99,0)},uBrushR:{value:.1},uBrushOn:{value:0},uSweep:{value:-1},uSeed:{value:t%1e3/37},uRough:{value:.35},uStampPos:{value:new L(0,99,0)},uStampR:{value:.11},uStampOn:{value:0},uAccent:{value:new Dt(16755251)}};return e.rust=n,e.onBeforeCompile=s=>{Object.assign(s.uniforms,n),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
        attribute float aClean;
        attribute float aPaint;
        attribute float aGrit;
        varying float vClean;
        varying float vPaint;
        varying float vGrit;
        varying vec3 vObj;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vClean = aClean; vPaint = aPaint; vGrit = aGrit; vObj = position;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
        ${Jv}
        uniform vec3 uMetal;
        uniform vec3 uPaint;
        uniform float uPaintMetal;
        uniform vec3 uBrushPos;
        uniform float uBrushR;
        uniform float uBrushOn;
        uniform float uSweep;
        uniform float uSeed;
        uniform float uRough;
        uniform vec3 uStampPos;
        uniform float uStampR;
        uniform float uStampOn;
        uniform vec3 uAccent;
        varying float vClean;
        varying float vPaint;
        varying float vGrit;
        varying vec3 vObj;
        float rl_rusty;
        float rl_paint;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec3 p = vObj * 7.0 + uSeed;
        float n = rl_fbm(p);
        /* Изъеденная граница: шум сдвигает порог, но при aClean = 0 деталь
           ржавая целиком, а при 1 — чистая целиком. */
        float edge = vClean * 1.3 - 0.15 + (n - 0.5) * 0.35;
        rl_rusty = 1.0 - smoothstep(0.0, 0.2, edge);
        /* Слои ржавчины: корка, налёт, охра — по второму шуму и въевшимся местам. */
        float n2 = rl_fbm(vObj * 26.0 - uSeed);
        vec3 crust = vec3(0.11, 0.05, 0.02);
        vec3 flake = vec3(0.34, 0.12, 0.035);
        vec3 ochre = vec3(0.62, 0.33, 0.1);
        vec3 rustCol = mix(crust, flake, smoothstep(0.38, 0.6, n2));
        rustCol = mix(rustCol, ochre, smoothstep(0.64, 0.85, n2) * 0.35);
        /* Песчаная зернистость — иначе корка выглядит пластилином. */
        rustCol *= 0.82 + 0.36 * rl_noise(vObj * 95.0);
        rustCol = mix(rustCol, crust * 0.7, vGrit * 0.6);
        /* Чистый металл — с лёгкой «щёткой»: полосы шероховатости по шуму. */
        vec3 metalCol = uMetal * (0.92 + 0.16 * rl_noise(vObj * 60.0));
        vec3 base = mix(metalCol, rustCol, rl_rusty);
        /* Краска: поверх всего, но на ржавчине остаётся бугристой (нормаль ниже). */
        rl_paint = vPaint;
        base = mix(base, uPaint, rl_paint);
        diffuseColor.rgb *= base;
        /* Клеймо мастера: кольцо с насечками, видно только на чистом металле. */
        if (uStampOn > 0.0) {
          float sd = distance(vObj, uStampPos) / uStampR;
          float ringS = (1.0 - smoothstep(0.82, 0.92, abs(sd - 0.78) / 0.14)) + (1.0 - smoothstep(0.0, 0.3, sd));
          float notch = step(0.5, fract(atan(vObj.y - uStampPos.y, vObj.x - uStampPos.x) * 1.9)) * (1.0 - smoothstep(0.55, 0.62, abs(sd - 0.5) / 0.1));
          float st = clamp(ringS + notch, 0.0, 1.0) * step(sd, 1.0) * (1.0 - rl_rusty) * (1.0 - rl_paint * 0.7);
          diffuseColor.rgb = mix(diffuseColor.rgb, uAccent * 0.6, st * 0.8);
          diffuseColor.rgb += uAccent * st * uStampOn * 0.5;
        }
        /* Кольцо кисти — подсветка по объектной дистанции. */
        float d = distance(vObj, uBrushPos);
        float ringA = uBrushOn * (1.0 - smoothstep(0.0, 0.012, abs(d - uBrushR)));
        diffuseColor.rgb += ringA * vec3(0.9, 0.95, 1.0) * 0.6;
        /* Блик-волна по завершении: полоса света бежит по детали снизу вверх. */
        if (uSweep >= 0.0) {
          float band = 1.0 - smoothstep(0.0, 0.18, abs((vObj.y + 0.6) / 1.2 - uSweep));
          diffuseColor.rgb += band * 0.8 * (1.0 - rl_rusty);
        }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
        roughnessFactor = mix(mix(uRough, 0.55, rl_paint * (1.0 - uPaintMetal)), 0.95, rl_rusty * (1.0 - rl_paint * 0.5));`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
        metalnessFactor = mix(mix(1.0, uPaintMetal, rl_paint), 0.05, rl_rusty * (1.0 - rl_paint));`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        if (rl_rusty > 0.02) {
          float pit = rl_rusty * (1.0 - rl_paint * 0.5) * 0.35;
          vec3 q = vObj * 45.0;
          vec3 dn = vec3(rl_noise(q) - 0.5, rl_noise(q + 11.3) - 0.5, rl_noise(q + 27.1) - 0.5);
          normal = normalize(normal + dn * pit);
        }`)},e.customProgramCacheKey=()=>"rust-legion-rust",e}function Qv(i){return new Cr({color:new Dt(i).multiplyScalar(.3),emissive:new Dt(i),emissiveIntensity:1.6,roughness:.4,metalness:0})}const An=[{id:"red",name:"Алая",color:14170666,metallic:0,price:60,bonus:{},hint:"Просто красиво"},{id:"blue",name:"Кобальт",color:2776024,metallic:0,price:60,bonus:{},hint:"Просто красиво"},{id:"ochre",name:"Охра",color:14262571,metallic:0,price:60,bonus:{},hint:"Просто красиво"},{id:"khaki",name:"Хаки",color:7305788,metallic:0,price:80,bonus:{},hint:"Просто красиво"},{id:"white",name:"Белая",color:15263970,metallic:0,price:80,bonus:{},hint:"Просто красиво"},{id:"black",name:"Графит",color:2303274,metallic:0,price:100,bonus:{},hint:"Просто красиво"},{id:"thermal",name:"Термостойкая",color:14834972,metallic:0,price:320,bonus:{armor:.12},hint:"Броня +12 %"},{id:"matte",name:"Матовая",color:3817287,metallic:0,price:340,bonus:{speed:.12},hint:"Скорость +12 %"},{id:"armored",name:"Армированная",color:5070394,metallic:0,price:420,bonus:{armor:.18,speed:-.05},hint:"Броня +18 %, скорость −5 %"},{id:"conductive",name:"Токопроводящая",color:2278102,metallic:.3,price:380,bonus:{energy:.16},hint:"Энергия +16 %"},{id:"chrome",name:"Хром",color:15922424,metallic:1,price:0,bonus:{armor:.06,damage:.06,speed:.06,energy:.06},rare:!0,hint:"Всё +6 %. Только за ролик"}],Pr=i=>An.find(t=>t.id===i),xs=[{id:"brush",name:"Щётка",price:0,radius:.1,rate:1,gritPenalty:4,dissolves:!1,hint:"Всегда с собой",icon:"🪥"},{id:"wide",name:"Широкая щётка",price:200,radius:.16,rate:.9,gritPenalty:4,dissolves:!1,hint:"Вдвое шире",icon:"🧹"},{id:"solvent",name:"Растворитель",price:400,radius:.11,rate:.7,gritPenalty:1,dissolves:!0,hint:"Берёт въевшиеся пятна",icon:"🧪"},{id:"sand",name:"Пескоструй",price:650,radius:.13,rate:2.2,gritPenalty:1.6,dissolves:!1,hint:"Быстро и почти без пятен",icon:"💨"}],rr=i=>xs.find(t=>t.id===i)??xs[0],vu=3,ar=i=>400+(i-vu)*450,wa=6,cs=10,or=(i,t,e=!1)=>Math.round((18+i*9)*(.4+t)*(e?3:1)),hs=5,gr=["Свалка","Гараж","Цех","Завод","Полигон","Легион"],us=[{id:"acid",name:"Кислотник",hint:"Каждый удар ржавит твою деталь"},{id:"grinder",name:"Дробилка",hint:"Бьёт быстро и метит в конечности"},{id:"hammer",name:"Молотобоец",hint:"Медленный, но каждый удар вдвое тяжелее"},{id:"king",name:"Ржавый король",hint:"Кислота и сила разом"}],jv=i=>90+i*45,tx=i=>15+i*5,Ea=180,Aa=40,ih=.18,ko=["Вепрь","Кузнец","Молот","Скрежет","Бивень","Ковш","Шатун","Лязг","Домкрат","Гвоздь","Тягач","Клещ","Грохот","Ротор","Стропа","Кувалда","Шкив","Патрон","Багор","Штырь","Зубило","Рашпиль","Кран","Пыж"],ex=[12106946,10134445,13218426,9411238,13812635,11055288,11901546,10332339],nx=[3787007,16742954,8257370,16765498,16730746,10120191];function ni(i,t,e={}){const n=new mn(i),s=[];for(const r of li){const a=n.fork(r.length+r.charCodeAt(0)),o=a.pick(Ji[r]),l=a.int(1,2147483647);s.push(Br(r,o,l,t,{clean:e.enemy?Math.min(1,.55+t*.035+a.range(0,.2)):0,paint:e.enemy&&a.chance(.6)?a.range(.5,1):0,paintId:e.enemy&&a.chance(.6)?a.pick(An).id:null}))}return{id:(e.daily?"d":e.enemy?"e":"r")+i.toString(36),seed:i,tier:t,nameIdx:n.int(0,ko.length-1),nameNum:n.int(1,99),metal:n.pick(ex),accent:n.pick(nx),parts:s,done:!!e.enemy,daily:!!e.daily}}function Br(i,t,e,n,s={}){const r=new mn(e^1540483477),a=r.chance(.35),o=s.trophy?0:Math.round(Math.min(1,Math.min(.95,.55+n*.05)+r.range(-.08,.08))*100)/100,l=s.trophy?0:Math.round(Math.min(1,Math.min(1,.15+n*.08)+r.range(-.1,.1))*100)/100;return{id:"p"+e.toString(36),role:i,arch:t,seed:e,tier:n,rust:o,grit:l,stamp:a,stampFound:!1,clean:s.clean??0,paint:s.paint??0,paintId:s.paintId??null,trophy:s.trophy}}function ix(i,t,e){const n=new mn(t);return Br(i,n.pick(Ji[i]),n.int(1,2147483647),e,{clean:1,paint:1,paintId:"chrome",trophy:!0})}const sx={gear:1.12,piston:1,flange:1.05,bracket:.94,crank:1.04,plate:1.12,turbine:1.08,claw:1.15,dome:1.08,exhaust:1};function xu(i){let e=(10+i.tier*3)*(.25+.75*i.clean)*sx[i.arch];return i.stampFound&&(e*=1.08),i.trophy&&(e*=1.15),e}function zo(i){const t=10+i.tier*3,e=i.role==="body"?4.4:i.role==="core"?3.5:i.role==="joint"?2.2:1.8;return Math.round(t*e*(.45+.55*i.clean))}const rx={body:"armor",limbL:"damage",limbR:"damage",joint:"speed",core:"energy"};function bn(i,t=0){const e={armor:0,damage:0,speed:0,energy:0},n={armor:0,damage:0,speed:0,energy:0};let s=0;for(const d of i.parts){const u=xu(d),f=rx[d.role];if(f==="damage"?(e.damage+=u,s++):e[f]+=u,d.paintId&&d.paint>0){const g=Pr(d.paintId);if(g)for(const[y,m]of Object.entries(g.bonus))n[y]+=m*d.paint/i.parts.length}}s>1&&(e.damage/=s);const r=1+t,a=e.armor*(1+n.armor)*r,o=e.damage*(1+n.damage)*r,l=e.speed*(1+n.speed)*r,c=e.energy*(1+n.energy)*r,h=i.parts.reduce((d,u)=>d+zo(u),0);return{armor:a,damage:o,speed:l,energy:c,hp:h,power:Math.round(a+o+l+c)}}function Ta(i){return i.parts.reduce((t,e)=>t+e.clean,0)/i.parts.length}function ax(i,t){return i==="joint"?t==="gear"?new Me(0,Math.PI/2,0):t==="turbine"?new Me(0,0,Math.PI/2):new Me(0,0,0):i==="limbL"||i==="limbR"?t==="exhaust"||t==="crank"?new Me(0,0,Math.PI/2):t==="piston"?new Me(Math.PI,0,0):new Me(0,0,0):i==="core"?t==="gear"?new Me(0,0,0):t==="exhaust"?new Me(0,Math.PI/2,0):new Me(0,0,0):t==="flange"?new Me(Math.PI/2,0,0):new Me(0,0,0)}function Mu(i,t,e){const n=Zv(i.arch,i.seed,i.rust,i.grit);if(i.stamp){const l=ox(n.geom,i.seed);n.stamp=l}bu(n.geom,i.clean,i.seed),cx(n.geom,i.paint,i.seed);const s=$v(t,i.seed),r=i.paintId?Pr(i.paintId):null;r&&(s.rust.uPaint.value.set(r.color),s.rust.uPaintMetal.value=r.metallic);const a=new de(n.geom,s);a.castShadow=!0,a.receiveShadow=!0;let o=null;return n.glow&&i.role==="core"&&(o=new de(n.glow,Qv(e)),a.add(o)),{state:i,mesh:a,glow:o,material:s,geometry:n}}function Ra(i){const t=new en,e=[],n=new en,s=new en,r=new en;t.add(n,s,r);const a={joint:.9,body:1.15,core:.55,limbL:.85,limbR:.85},o=new Map,l=new Map;for(const R of i.parts){const A=Mu(R,i.metal,i.accent);A.mesh.rotation.copy(ax(R.role,R.arch)),R.role==="limbR"&&(A.mesh.rotation.y+=Math.PI),A.mesh.scale.setScalar(a[R.role]),A.mesh.updateMatrix();const P=A.geometry.geom.boundingBox.clone().applyMatrix4(A.mesh.matrix);l.set(R.role,P),o.set(R.role,A),e.push(A)}const c=(R,A,P,v)=>{const M=o.get(R);M.mesh.position.set(A,P,0),M.mesh.userData.base=new L(A,P,0),v.add(M.mesh)},h=.06,d=l.get("joint"),u=l.get("body"),f=l.get("core"),g=-d.min.y+.02,m=g+d.max.y-h-u.min.y,E=m+u.max.y-h-f.min.y;c("joint",0,g,t),c("body",0,m,r),c("core",0,E,r);const T=m+u.min.y+(u.max.y-u.min.y)*.7;for(const R of["limbL","limbR"]){const A=l.get(R),P=R==="limbL"?-1:1,v=R==="limbL"?n:s,M=(A.max.x-A.min.x)/2;v.position.set(P*(Math.max(u.max.x,-u.min.x)+M*.7),T,0),v.userData.base=v.position.clone(),c(R,-(A.min.x+M),-A.max.y,v)}const x=new de(new ll(.9,32),new al({color:0,transparent:!0,opacity:.45,depthWrite:!1}));return x.rotation.x=-Math.PI/2,x.position.y=.01,t.add(x),{data:i,group:t,parts:e,limbL:n,limbR:s,torso:r,height:E+f.max.y,dispose(){for(const R of e)R.geometry.geom.dispose(),R.geometry.glow?.dispose(),R.material.dispose(),R.glow?.material?.dispose();x.geometry.dispose(),x.material.dispose()}}}function ox(i,t){const e=i.attributes.position,n=i.attributes.normal,s=new mn(t^668265263);let r=0;for(let a=0;a<24;a++){const o=s.int(0,e.count-1),l=e.getX(o),c=e.getY(o),h=e.getZ(o);if((l*n.getX(o)+c*n.getY(o)+h*n.getZ(o))/(Math.hypot(l,c,h)||1)>.6){r=o;break}a===0&&(r=o)}return{pos:new L(e.getX(r),e.getY(r),e.getZ(r)),r:.11}}function lx(i,t){const e=i.attributes.position.array,n=i.attributes.aClean.array,s=t.r*t.r;let r=0,a=0;for(let o=0;o<n.length;o++){const l=e[o*3]-t.pos.x,c=e[o*3+1]-t.pos.y,h=e[o*3+2]-t.pos.z;l*l+c*c+h*h>s||(r+=n[o],a++)}return a?r/a:1}function yu(i,t,e,n){const s=i.attributes.position.array,r=i.attributes.position.count,a=new Float32Array(r),o=(t&65535)+e;for(let l=0;l<r;l++)a[l]=Bo(s[l*3]*n+5,s[l*3+1]*n+9,s[l*3+2]*n+3,o);return a}function Su(i,t,e,n){if(e<=.001){t.fill(0);return}if(e>=.999){t.fill(1);return}let s=-.5,r=1.5;for(let o=0;o<22;o++){const l=(s+r)/2;let c=0;for(let h=0;h<i.length;h++){const d=(i[h]-l)/n;c+=d<=0?0:d>=1?1:d*d*(3-2*d)}c/i.length>e?s=l:r=l}const a=(s+r)/2;for(let o=0;o<i.length;o++){const l=(i[o]-a)/n;t[o]=l<=0?0:l>=1?1:l*l*(3-2*l)}}function bu(i,t,e){const n=i.attributes.aClean;Su(yu(i,e,0,2.4),n.array,t,.25),n.needsUpdate=!0}function cx(i,t,e){const n=i.attributes.aPaint;Su(yu(i,e,131,1.8),n.array,t,.12),n.needsUpdate=!0}const hx=22;class sh{constructor(t,e,n){this.energy=0,this.windowUntil=-1,this.crit=!1,this.hits=0,this.dir=new L,this.stats=t.stats,this.model=t.model,this.boss=t.boss??null,this.player=t.player,this.side=e,this.base=Lr.POS[e].clone(),this.parts=t.model.parts.map(s=>({role:s.state.role,state:s.state,pm:s,hp:zo(s.state),max:zo(s.state),alive:!0,clean:s.state.clean,taken:0,vel:new L,ang:new L,rest:!1,socket:new L,flinch:0}));for(const s of this.parts)s.pm.mesh.userData.rz=s.pm.mesh.rotation.z;this.hp0=this.parts.reduce((s,r)=>s+r.max,0),this.nextAttack=this.interval()*.6+n.range(0,.4)}get alive(){return this.part("body").alive&&this.part("core").alive}part(t){return this.parts.find(e=>e.role===t)}get hp(){return this.parts.reduce((t,e)=>t+(e.alive?e.hp:0),0)}get limbs(){return(this.part("limbL").alive?1:0)+(this.part("limbR").alive?1:0)}damageOut(){const t=this.limbs;let e=this.stats.damage*(t===2?1:t===1?.62:.3);return this.boss==="hammer"&&(e*=1.5),this.boss==="grinder"&&(e*=.7),this.boss==="king"&&(e*=1.2),e}interval(){let t=1.55-.75*(this.stats.speed/(this.stats.speed+30));return this.part("joint").alive||(t*=1.5),this.boss==="hammer"&&(t*=1.35),this.boss==="grinder"&&(t*=.7),t}dodgeVs(t){return this.part("joint").alive?Math.min(.38,Math.max(.03,.06+.35*(this.stats.speed-t.stats.speed)/(this.stats.speed+t.stats.speed+10))):0}armorRed(){return this.part("body").alive?this.stats.armor/(this.stats.armor+45):0}pickTarget(t,e){const n=this.parts.filter(a=>a.alive),s=n.map(a=>{let o=a.role==="body"?3:a.role==="core"?1.4:(a.role==="joint",2);return o*=1.3-a.clean*.6,e&&(a.role==="limbL"||a.role==="limbR"||a.role==="joint")&&(o*=3),o});let r=t.next()*s.reduce((a,o)=>a+o,0);for(let a=0;a<n.length;a++)if(r-=s[a],r<=0)return n[a];return n[n.length-1]}}const Rl=class Rl{constructor(t,e,n){this.group=new en,this.sparks=new Oo(400,!0),this.smoke=new Oo(300,!1),this.speed=1,this.slow=1,this.slowUntil=0,this.cue={target:new L,pull:0},this.clock=0,this.tweens=[],this.swing=[0,0],this.done=!1,this.endAt=-1,this.winner=null,this.crits=0,this.tmp=new L,this.smokeT=0,this.floorY=.05,this.lost=[[],[]],this.hooks=n,this.rng=new mn(e),this.f=[new sh(t[0],0,this.rng),new sh(t[1],1,this.rng)];for(const s of[0,1]){const r=this.f[s],a=this.f[s===0?1:0];r.model.group.position.copy(r.base),r.dir.subVectors(a.base,r.base).normalize(),r.model.group.rotation.y=Math.atan2(r.dir.x,r.dir.z),this.group.add(r.model.group)}this.group.add(this.sparks.points,this.smoke.points),this.emitHp()}get finished(){return this.done}get time(){return this.clock}requestSpecial(){const t=this.f[0];return!t.player||t.windowUntil<0||this.clock>t.windowUntil||this.done?!1:(t.crit=!0,t.windowUntil=-1,t.nextAttack=this.clock,this.hooks.onSpecialReady(!1),!0)}emitHp(){this.hooks.onHp([this.f[0].hp/this.f[0].hp0,this.f[1].hp/this.f[1].hp0],[Math.min(1,this.f[0].energy),Math.min(1,this.f[1].energy)])}screen(t,e){return t.clone().project(e)}update(t,e){this.clock>=this.slowUntil&&(this.slow=1);const n=t*this.speed*this.slow;if(this.clock+=n,!this.done&&this.endAt<0){for(const s of[0,1]){const r=this.f[s];if(r.player&&r.windowUntil>=0&&this.clock>r.windowUntil&&(r.windowUntil=-1,this.hooks.onSpecialReady(!1)),this.clock>=r.nextAttack&&this.attack(s,e),this.endAt>=0)break}if(this.endAt<0&&this.clock>=hx){const s=this.f[0].hp/this.f[0].hp0>=this.f[1].hp/this.f[1].hp0?0:1;this.finish(s)}}for(let s=this.tweens.length-1;s>=0;s--){const r=this.tweens[s];r.t+=n;const a=Math.min(1,r.t/r.dur);r.obj.position.lerpVectors(r.from,r.to,Math.sin(a*Math.PI)),a>=1&&(r.obj.position.copy(r.from),this.tweens.splice(s,1))}for(const s of[0,1]){const r=this.f[s],a=r.model;this.swing[s]=Math.max(0,this.swing[s]-n*4);const o=this.swing[s],l=o>.5?(1-o)*2*.9:-(o*2)*1.6;a.limbR.rotation.x=-l,a.limbL.rotation.x=l*.4;let c=0;for(const d of r.parts)if(d.flinch=Math.max(0,d.flinch-n*5),d.alive){const u=d.flinch;d.pm.mesh.rotation.z=(d.pm.mesh.userData.rz??0)+Math.sin(u*24)*u*.25,d.role==="body"&&(c=u)}else d.rest||this.fallStep(d,n);a.torso.rotation.z=Math.sin(c*20)*c*.1,a.torso.position.y=c*.08;const h=Math.min(1,r.energy);for(const d of a.parts)d.glow&&(d.glow.material.emissiveIntensity=1.2+h*3+(r.windowUntil>=0?Math.sin(this.clock*20)*1.5+1.5:0));if((this.winner===null||this.winner===s)&&(a.group.position.y=Math.sin(this.clock*3+s*2)*.03),this.winner===s){const d=1-Math.exp(-n*4);a.limbL.rotation.x+=(-2.4-a.limbL.rotation.x)*d,a.limbR.rotation.x+=(-2.4-a.limbR.rotation.x)*d}}if(this.smokeT+=n,this.smokeT>.12){this.smokeT=0;for(const s of this.f)for(const r of s.parts)r.alive||(this.tmp.copy(r.socket).applyMatrix4(s.model.group.matrixWorld),this.smoke.emit(this.tmp,new L(0,1,0),1,new Dt(7829367),{speed:.5,spread:.3,life:1.6,size:.16,gravity:-.35,jitter:.2}))}if(this.endAt>=0&&this.winner!==null){const s=this.f[this.winner===0?1:0],r=Math.min(1,(this.clock-this.endAt)/1.6);s.model.group.rotation.x=r*r*1.3,s.model.group.position.y=-r*.2,!this.done&&this.clock-this.endAt>2.4&&this.tweens.length===0&&(this.done=!0,this.hooks.onEnd(this.report()))}this.sparks.update(n),this.smoke.update(n),this.cue.pull=Math.max(0,this.cue.pull-t*1.5)}fallStep(t,e){const n=t.pm.mesh;t.vel.y-=9*e,n.position.addScaledVector(t.vel,e),n.rotation.x+=t.ang.x*e,n.rotation.y+=t.ang.y*e,n.rotation.z+=t.ang.z*e;const s=this.floorY+.28;if(n.position.y<s){if(n.position.y=s,Math.abs(t.vel.y)<.6){t.rest=!0,t.vel.set(0,0,0);return}t.vel.y=-t.vel.y*.35,t.vel.x*=.6,t.vel.z*=.6,t.ang.multiplyScalar(.5),this.tmp.copy(n.position),this.sparks.emit(this.tmp,new L(0,1,0),8,new Dt(16760928),{speed:1.5,spread:1,life:.3,size:.04,gravity:5})}}attack(t,e){const n=this.f[t],s=this.f[t===0?1:0],r=this.rng;if(n.nextAttack=this.clock+n.interval()*r.range(.9,1.1),r.chance(s.dodgeVs(n))){const E=r.chance(.5)?1:-1,T=s.base.clone().add(new L(s.dir.z,0,-s.dir.x).multiplyScalar(E*.65));this.tweens.push({obj:s.model.group,from:s.base.clone(),to:T,t:0,dur:.5}),this.lunge(n,.8,.3),s.energy=Math.min(1,s.energy+s.stats.energy*.004),this.tmp.copy(s.base),this.tmp.y=1.6,this.hooks.onCallout(s.side,"dodge",this.screen(this.tmp,e)),this.checkSpecialReady(s),this.emitHp();return}let a=1,o=!1;n.energy>=1&&(n.player?n.crit?(a=2.3,o=!0,this.crits++):n.windowUntil<0&&(a=1.7,o=!0):(a=n.boss==="hammer"||n.boss==="king"?2.2:1.7,o=!0));const l=s.pickTarget(r,n.boss==="grinder"),c=n.damageOut()*r.range(.85,1.15)*a,h=s.armorRed(),d=1+(1-l.clean)*.8;let u=Math.max(1,Math.round(c*(1-h)*d));l.hp-=u,l.taken+=u,l.flinch=1,n.hits++,n.energy=Math.min(1,o?0:n.energy+n.stats.energy*.01),s.energy=Math.min(1,s.energy+s.stats.energy*.016),o&&(n.crit=!1,n.windowUntil=-1),this.lunge(n,o?1.5:1.15,o?.4:.32),this.swing[t]=1;const f=l.pm.mesh.getWorldPosition(new L),g=n.dir.clone().multiplyScalar(-1);g.y=1.1;const y=l.clean<.6;this.sparks.emit(f,g,o?70:26,new Dt(o?16773808:16760928),{speed:o?4.5:2.8,spread:.9,life:.45,size:o?.08:.05,gravity:6}),y&&this.smoke.emit(f,g,10,new Dt(9062938),{speed:1.6,spread:.9,life:.7,size:.05,gravity:3,jitter:.4});const m=s.dir.clone().multiplyScalar(-(o?.5:.18));this.tweens.push({obj:s.model.group,from:s.base.clone(),to:s.base.clone().add(m),t:0,dur:o?.5:.3});const p=this.screen(f,e);this.hooks.onHit(s.side,u,o,p),o?(this.slow=n.crit||a>=2.6?.25:.4,this.slowUntil=this.clock+.35,this.cue.target.copy(f),this.cue.pull=1,this.hooks.onCallout(s.side,n.crit||a>=2.3?"crit":"special",p)):h>.4&&r.chance(.5)&&this.hooks.onCallout(s.side,"armor",p),(n.boss==="acid"||n.boss==="king")&&l.clean>0&&(l.clean=Math.max(0,l.clean-.07),this.hooks.onRust(s.side,l.role,l.clean),this.hooks.onCallout(s.side,"rust",p)),l.hp<=0&&l.alive&&this.losePart(s,l,n.dir,e),s.alive||this.finish(t),this.checkSpecialReady(n),this.checkSpecialReady(s),this.emitHp()}checkSpecialReady(t){!t.player||t.energy<1||t.windowUntil>=0||this.endAt>=0||(t.windowUntil=this.clock+2.2,this.hooks.onSpecialReady(!0))}lunge(t,e,n){const s=t.base.clone().addScaledVector(t.dir,e);this.tweens.push({obj:t.model.group,from:t.base.clone(),to:s,t:0,dur:n})}losePart(t,e,n,s){e.alive=!1,e.hp=0,this.lost[t.side].push(e.role);const r=e.pm.mesh;r.getWorldPosition(this.tmp),e.socket.copy(this.tmp).applyMatrix4(t.model.group.matrixWorld.clone().invert());const a=new ne().copy(r.matrixWorld);r.parent?.remove(r),this.group.add(r),a.decompose(r.position,r.quaternion,r.scale),e.vel.copy(n).multiplyScalar(2.2+this.rng.range(0,1.2)),e.vel.y=3+this.rng.range(0,1.5),e.vel.x+=this.rng.range(-.8,.8),e.vel.z+=this.rng.range(-.8,.8),e.ang.set(this.rng.range(-6,6),this.rng.range(-6,6),this.rng.range(-6,6)),this.sparks.emit(this.tmp,new L(0,1,0),60,new Dt(16765056),{speed:4,spread:1,life:.6,size:.07,gravity:6}),this.smoke.emit(this.tmp,new L(0,1,0),12,new Dt(5592405),{speed:1.2,spread:.8,life:1.4,size:.2,gravity:-.3}),this.hooks.onPartLost(t.side,e.role),this.hooks.onCallout(t.side,"lost",this.screen(this.tmp,s)),this.slow=.3,this.slowUntil=this.clock+.3,this.cue.target.copy(this.tmp),this.cue.pull=1,e.role==="limbL"&&(t.model.limbL.rotation.x=0),e.role==="limbR"&&(t.model.limbR.rotation.x=0)}finish(t){if(this.endAt>=0)return;this.winner=t,this.endAt=this.clock,this.hooks.onSpecialReady(!1),this.slow=.22,this.slowUntil=this.clock+.9;const e=this.f[t===0?1:0];for(const n of e.parts)if(n.alive&&n.role!=="body"){const s=n.pm.mesh;s.getWorldPosition(this.tmp),this.lost[e.side].push(n.role),n.alive=!1;const r=new ne().copy(s.matrixWorld);s.parent?.remove(s),this.group.add(s),r.decompose(s.position,s.quaternion,s.scale),n.socket.copy(this.tmp).applyMatrix4(e.model.group.matrixWorld.clone().invert()),n.vel.set(this.rng.range(-1.5,1.5),2.5+this.rng.range(0,1.5),this.rng.range(-1.5,1.5)),n.ang.set(this.rng.range(-5,5),this.rng.range(-5,5),this.rng.range(-5,5)),this.sparks.emit(this.tmp,new L(0,1,0),30,new Dt(16765056),{speed:3,spread:1,life:.5,size:.06,gravity:6})}e.model.limbL.rotation.x=0,e.model.limbR.rotation.x=0,this.tmp.copy(e.base),this.tmp.y=1.2,this.cue.target.copy(this.tmp),this.cue.pull=1}report(){const t=this.winner??0,e=n=>{const s={body:0,limbL:0,limbR:0,joint:0,core:0};for(const r of n.parts)s[r.role]=r.taken;return s};return{winner:t,duration:this.endAt,margin:this.f[t].hp/this.f[t].hp0,lostParts:this.lost,damageTaken:[e(this.f[0]),e(this.f[1])],hits:[this.f[0].hits,this.f[1].hits],crits:this.crits}}aliveParts(t){const e={body:!0,limbL:!0,limbR:!0,joint:!0,core:!0};for(const n of this.f[t].parts)e[n.role]=n.alive;return e}dispose(){this.sparks.dispose(),this.smoke.dispose()}};Rl.POS=[new L(-1.05,0,1),new L(1.05,0,-1)];let Lr=Rl;const Sl={intro:[{who:"none",text:"Ржавый Яр. Двадцать лет после Большой ржавчины — кислотных дождей, что съели лиги боевых роботов и половину города."},{who:"spark",text:"Ты… новый хозяин? Я — Искра, ИИ этой мастерской. Память у меня, прости, в дырах — ржавчина."},{who:"spark",text:"Зато руки у тебя есть. Со свалки привезли робота. Сотри с него ржавчину — сколько сотрёшь, столько силы и останется."}],firstAssembled:[{who:"spark",text:"Стоит! Кривой, ржавый — но стоит. На арене Свалки такие и дерутся."},{who:"spark",text:"Помни: ржавая деталь в бою отваливается первой. Не хочешь терять руку — отчисти её."}],firstWin:[{who:"spark",text:"Победа. За неё платят и привозят следующего — ещё ржавее. Так всегда было в лигах… кажется. Что-то вспоминаю."}],firstLoss:[{who:"spark",text:"Не беда. Посмотри вердикт: противник бил туда, где ржавчина. Дочисти — или поставь деталь получше из запаса."}],firstStamp:[{who:"spark",text:"Клеймо! Под ржавчиной — знак мастера. Такие ставил… ставил кто-то, кого я знала. Деталь с клеймом крепче."}],league1:[{who:"spark",text:"Гараж. Здесь дрались за бензин и запчасти, пока дожди не начались. Память подсказывает: у меня был напарник. Робот. Чемпион."}],boss1:[{who:"spark",text:"Кислотник. Его ядро течёт той самой кислотой. Каждый его удар ржавит тебя прямо в бою — бей быстро."}],bossWin1:[{who:"spark",text:"Кислота… Я узнала её состав. Это не дождь. Это течёт из одного ядра, и оно где-то в городе."}],league2:[{who:"spark",text:"Цех. Тут собирали чемпионов. И меня тоже — я была ядром одного из них, пока меня не вынули и не поставили в стену мастерской."}],boss2:[{who:"spark",text:"Дробилка. Быстрая, метит в конечности. Береги сустав: без него ты не увернёшься."}],bossWin2:[{who:"spark",text:"В памяти всплыло имя. Король. Так звали нашего чемпиона. Того, у кого я была ядром."}],league3:[{who:"spark",text:"Завод. Отсюда Большая ржавчина и пошла. Кто-то заставил ядро чемпиона работать на пределе — и оно потекло."}],boss3:[{who:"spark",text:"Молотобоец. Медленный, но каждый удар — как пресс. Броня решает. Отчисти корпус."}],bossWin3:[{who:"spark",text:"Теперь я помню всё. Меня вынули из Короля, потому что я отказалась жечь ядро на износ. Вставили другое. Оно и потекло."}],league4:[{who:"spark",text:"Полигон. Последняя лига перед Легионом. Король ждёт там. Он всё ещё чемпион — и всё ещё течёт."}],boss4:[{who:"king",text:"Ядро. Моё старое ядро. Ты собрал её обратно в железо, мастер?"},{who:"spark",text:"Он узнал меня. Бей, не слушай. Кислота и сила разом — ничего не жалей."}],bossWin4:[{who:"king",text:"…Тихо. Впервые за двадцать лет — тихо. Спасибо."},{who:"spark",text:"Ядро остыло. Дожди кончатся. А лига… лига продолжается. Легион ждёт — теперь ты в нём чемпион."},{who:"none",text:"Ржавчина ещё будет приходить со свалки. Но теперь известно, чем её стирают."}],league5:[{who:"spark",text:"Легион. Бесконечная лестница: каждый следующий ржавее, каждый пятый — босс. Мастерская твоя. Скреби."}]},Vo={0:"Глава 1. Свалка",1:"Глава 2. Гараж",2:"Глава 3. Цех",3:"Глава 4. Завод",4:"Глава 5. Полигон",5:"Глава 6. Легион"},Gn=[{id:"c0a",chapter:0,text:"Собрать первого робота",count:i=>i.assembled,need:1,reward:60},{id:"c0b",chapter:0,text:"Отчистить деталь до блеска",count:i=>i.perfect,need:1,reward:80},{id:"c0c",chapter:0,text:"Победить трижды",count:i=>i.wins,need:3,reward:120},{id:"c1a",chapter:1,text:"Найти клеймо мастера",count:i=>i.stamps,need:1,reward:120},{id:"c1b",chapter:1,text:"Пересадить деталь с другого робота или из запаса",count:i=>i.mounted,need:1,reward:100},{id:"c1c",chapter:1,text:"Победить восемь раз",count:i=>i.wins,need:8,reward:160},{id:"c2a",chapter:2,text:"Отчистить до блеска пять деталей",count:i=>i.perfect,need:5,reward:180},{id:"c2b",chapter:2,text:"Купить краску со свойством",count:i=>i.paints,need:1,reward:120},{id:"c2c",chapter:2,text:"Собрать робота дня",count:i=>i.daily,need:1,reward:200},{id:"c3a",chapter:3,text:"Найти три клейма",count:i=>i.stamps,need:3,reward:220},{id:"c3b",chapter:3,text:"Собрать пять роботов",count:i=>i.assembled,need:5,reward:200},{id:"c3c",chapter:3,text:"Победить пятнадцать раз",count:i=>i.wins,need:15,reward:260},{id:"c4a",chapter:4,text:"Поставить на робота хромовую деталь",count:i=>i.chromeParts,need:1,reward:260},{id:"c4b",chapter:4,text:"Отчистить до блеска двенадцать деталей",count:i=>i.perfect,need:12,reward:300},{id:"c4c",chapter:4,text:"Победить двадцать раз",count:i=>i.wins,need:20,reward:320},{id:"c5a",chapter:5,text:"Победить тридцать раз",count:i=>i.wins,need:30,reward:400},{id:"c5b",chapter:5,text:"Одолеть трёх боссов Легиона",count:i=>Math.max(0,i.bosses-4),need:3,reward:500},{id:"c5c",chapter:5,text:"Открыть десять ящиков со свалки",count:i=>i.cratesOpened,need:10,reward:300}],jn=gr.length;function ux(){const i=[];for(const t of Object.values(Sl))for(const e of t)i.push(e.text);return i.push(...Object.values(Vo),...Gn.map(t=>t.text)),i}const dx=["title","hub","work","collection","picker","prefight","fight","result","shop","daily","quests","pause"],rh="rl_save",ah="rl_sound_off",oh="rl_parts",lr=()=>({v:1,coins:0,arrived:0,robots:[],focus:null,champion:null,slots:vu,tools:["brush"],paints:["red"],wins:0,losses:0,battles:0,enemySeed:0,pending:0,daily:{day:"",done:!1,best:null,elapsed:0,robot:null},bin:[],bossDue:!1,chapter:0,chapterWins:0,seen:[],claimed:[],counters:{wins:0,bosses:0,assembled:0,perfect:0,stamps:0,mounted:0,paints:0,daily:0,cratesOpened:0,chromeParts:0},crates:{day:"",n:0},loan:null,dailyDoubled:!1}),Fi={body:"Корпус",limbL:"Левая конечность",limbR:"Правая конечность",joint:"Сустав",core:"Ядро"},Ca={body:"Броня",limbL:"Урон",limbR:"Урон",joint:"Скорость",core:"Энергия"},fx={body:"▣",limbL:"◀",limbR:"▶",joint:"◎",core:"✦"},ti={body:"Корпус",limbL:"Л. рука",limbR:"П. рука",joint:"Сустав",core:"Ядро"},Oi={gear:"шестерня",piston:"поршень",flange:"фланец",bracket:"кронштейн",crank:"коленвал",plate:"броневая пластина",turbine:"турбина",claw:"клешня",dome:"купол",exhaust:"выхлоп"},wu=Object.keys(Ji).flatMap(i=>Ji[i]).filter((i,t,e)=>e.indexOf(i)===t);function Eu(i){const t=(i.stampFound?1:0)|(i.trophy?2:0)|(i.perfectPaid?4:0),e=i.paintId?An.findIndex(n=>n.id===i.paintId):-1;return[li.indexOf(i.role),wu.indexOf(i.arch),i.seed.toString(36),i.tier,Math.round(i.clean*100),Math.round(i.paint*100),t*16+e+1]}function Au(i){const t=li[i[0]]??"body",e=wu[i[1]]??Ji[t][0],n=i[6]||0,s=Math.floor(n/16),r=n%16-1,a=Br(t,e,parseInt(i[2],36)||1,i[3]||1,{clean:Math.min(1,Math.max(0,(i[4]||0)/100)),paint:Math.min(1,Math.max(0,(i[5]||0)/100)),paintId:r>=0&&An[r]?An[r].id:null,trophy:!!(s&2)});return a.stampFound=!!(s&1),a.perfectPaid=!!(s&4),a}function lh(i){return{s:i.seed,t:i.tier,d:i.done,k:i.daily?"d":void 0,P:i.parts.map(Eu)}}function ch(i){const t=ni(i.s,i.t,{daily:i.k==="d"});return t.done=!!i.d,Array.isArray(i.P)&&i.P.length===li.length&&(t.parts=i.P.map(Au)),t}const hh=Object.keys(Sl),uh=["wins","bosses","assembled","perfect","stamps","mounted","paints","daily","cratesOpened","chromeParts"],dh=(i,t)=>t.reduce((e,n,s)=>i.includes(n)?e|1<<s:e,0),fh=(i,t)=>t.filter((e,n)=>i&1<<n);function ph(){const i=new Date(Date.now()+108e5);return i.getUTCFullYear()+"-"+String(i.getUTCMonth()+1).padStart(2,"0")+"-"+String(i.getUTCDate()).padStart(2,"0")}class px{constructor(t){this.ui=new Rv,this.audio=new Cv,this.phase="title",this.frames=0,this.prevPhase="hub",this.hubModel=null,this.hubExplode=1,this.hubSpin=0,this.assembling=!1,this.work=null,this.partSpin=new rt,this.pointers=new Map,this.strokeOut={removed:0,point:new L,normal:new L,hit:!1},this.pendingStroke=null,this.brushOn=0,this.sweepT=-1,this.hintShown=!0,this.dirtyT=0,this.lastClean=0,this.arena=null,this.fightModels=null,this.fight=null,this.boostNext=0,this.tmpV=new L,this.tmpN=new rt,this.flakeColor=new Dt,this.dialog=[],this.dialogAfter=null,this.showcaseRobot=null,this.picker=null,this.verdictIndex=-1,this.resultScene=null,this.advanceChapterLater=!1,this.hitCount=0,this.stage=new Tv(t),this.save=this.load(),this.audio.setMuted(!!_r(ah,!1)),this.bind(t),window.__cloudArrived=()=>{this.save=this.load(),this.refreshMeta(),this.renderScreen()},this.setPhase("title"),this.refreshMeta()}load(){const t=_r(rh,null),e=lr();return t&&typeof t=="object"&&Object.assign(e,t),Array.isArray(t?.R)&&(e.robots=t.R.map(ch)),Array.isArray(e.robots)||(e.robots=[]),e.daily||(e.daily=lr().daily),t?.D?e.daily.robot=ch(t.D):t&&"D"in t&&(e.daily.robot=null),e.bin=Array.isArray(t?.B)?t.B.map(Au):[],(!Array.isArray(e.tools)||!e.tools.includes("brush"))&&(e.tools=["brush",...e.tools||[]]),(!Array.isArray(e.paints)||!e.paints.includes("red"))&&(e.paints=["red",...e.paints||[]]),e.counters={...lr().counters,...e.counters||{}},Array.isArray(t?.N)&&uh.forEach((n,s)=>{e.counters[n]=t.N[s]||0}),Array.isArray(e.seen)||(e.seen=[]),Array.isArray(e.claimed)||(e.claimed=[]),typeof t?.S=="number"&&(e.seen=fh(t.S,hh)),typeof t?.Q=="number"&&(e.claimed=fh(t.Q,Gn.map(n=>n.id))),e.crates||(e.crates={day:"",n:0}),e}persist(){const t=this.save,{robots:e,daily:n,bin:s,seen:r,claimed:a,counters:o,...l}=t,c={...l,daily:{...n,robot:null},R:e.map(lh),D:n.robot?lh(n.robot):null,B:s.map(Eu),S:dh(r,hh),Q:dh(a,Gn.map(h=>h.id)),N:uh.map(h=>o[h]||0)};Pa(rh,c),this.persistParts()}persistParts(){if(!this.work)return;const t={};for(const[e,n]of this.work.meshes){const s=n.geometry.geom.attributes.aClean.array,r=n.geometry.geom.attributes.aPaint.array,a=n.geometry.geom.attributes.aGrit.array,o=new Uint8Array(s.length*3);for(let c=0;c<s.length;c++)o[c*3]=s[c]*255,o[c*3+1]=r[c]*255,o[c*3+2]=a[c]*255;let l="";for(let c=0;c<o.length;c+=32768)l+=String.fromCharCode.apply(null,Array.from(o.subarray(c,c+32768)));t[e]=btoa(l)}try{localStorage.setItem(oh,JSON.stringify({id:this.work.robot.id,parts:t}))}catch{}}restoreParts(t,e){try{const n=localStorage.getItem(oh);if(!n)return!1;const s=JSON.parse(n);if(s.id!==e||!s.parts[t.state.role])return!1;const r=atob(s.parts[t.state.role]),a=t.geometry.geom.attributes.aClean.array;if(r.length!==a.length*3)return!1;const o=t.geometry.geom.attributes.aPaint.array,l=t.geometry.geom.attributes.aGrit.array;for(let c=0;c<a.length;c++)a[c]=r.charCodeAt(c*3)/255,o[c]=r.charCodeAt(c*3+1)/255,l[c]=r.charCodeAt(c*3+2)/255;return t.geometry.geom.attributes.aClean.needsUpdate=!0,t.geometry.geom.attributes.aPaint.needsUpdate=!0,t.geometry.geom.attributes.aGrit.needsUpdate=!0,!0}catch{return!1}}robotName(t){return F(ko[t.nameIdx])+"-"+t.nameNum}robotById(t){return t?this.save.robots.find(e=>e.id===t)??null:null}get focusRobot(){return this.robotById(this.save.focus)??this.save.robots[0]??null}get champion(){const t=this.robotById(this.save.champion);return t&&t.done?t:this.save.robots.find(e=>e.done)??null}arriveRobot(){if(this.save.robots.length>=this.save.slots)return null;const t=this.save.arrived+1,e=Qn("wreck-"+t+"-"+(this.save.enemySeed||0)+"-"+Date.now())>>>0||1,n=ni(e,t);return this.save.arrived=t,this.save.robots.push(n),this.save.focus=n.id,n}league(){return Math.min(gr.length-1,this.save.chapter)}bossFor(){if(!this.save.bossDue)return null;const t=this.save.chapter;return t>=jn-1?us[Math.floor(this.save.counters.bosses)%us.length]:us[Math.min(us.length-1,Math.max(0,t-1))]}contractsDone(t){return Gn.filter(e=>e.chapter===t&&e.count(this.save.counters)>=e.need).length}checkProgress(){const t=this.save;if(t.bossDue)return;const e=this.contractsDone(t.chapter);if(t.chapter===0){t.chapterWins>=3&&e>=2&&this.advanceChapter();return}if(t.chapter>=jn-1){t.chapterWins>=hs&&(t.bossDue=!0,t.chapterWins=0);return}t.chapterWins>=hs&&e>=2&&(t.bossDue=!0)}advanceChapter(){const t=this.save;t.chapter=Math.min(jn-1,t.chapter+1),t.chapterWins=0,t.bossDue=!1,this.story("league"+t.chapter)}nextGoal(){const t=this.save,e=this.contractsDone(t.chapter);return t.bossDue?F("Босс ждёт на арене!"):t.chapter===0?F("До следующей главы: побед")+" "+Math.min(3,t.chapterWins)+"/3 · "+F("заданий")+" "+Math.min(2,e)+"/2":t.chapter>=jn-1?F("До босса Легиона: побед")+" "+t.chapterWins+"/"+hs:F("До босса главы: побед")+" "+Math.min(hs,t.chapterWins)+"/"+hs+" · "+F("заданий")+" "+Math.min(2,e)+"/2"}get storyOpen(){return!this.ui.el("dialog").hidden}story(t,e){const n=Sl[t];if(!n||this.save.seen.includes(t))return e?.(),!1;if(this.save.seen.push(t),this.persist(),this.storyOpen){this.dialog.push(...n);const s=this.dialogAfter;return this.dialogAfter=()=>{s?.(),e?.()},!0}return this.dialog=[...n],this.dialogAfter=e??null,this.nextLine(),!0}nextLine(){const t=this.dialog.shift(),e=this.ui.el("dialog");if(!t){e.hidden=!0;const s=this.dialogAfter;this.dialogAfter=null,s?.();return}e.hidden=!1,this.audio.click();const n=this.ui.el("dialog-who");n.textContent=t.who==="spark"?F("Искра"):t.who==="king"?F("Ржавый король"):"",n.hidden=t.who==="none",e.classList.toggle("king",t.who==="king"),e.classList.toggle("narr",t.who==="none"),this.ui.text("dialog-text",F(t.text))}renderQuests(){const t=this.save;this.ui.text("quests-chapter",F(Vo[t.chapter]??Vo[jn-1])),this.ui.text("quests-goal",this.nextGoal());const e=this.ui.el("quests-list");e.textContent="";const n=Gn.filter(r=>r.chapter===t.chapter);for(const r of n){const a=Math.min(r.need,r.count(t.counters)),o=a>=r.need,l=t.claimed.includes(r.id);e.appendChild(this.ui.card({icon:l?"✓":o?"★":"◻",name:F(r.text),sub:a+"/"+r.need+" · "+F("награда")+" "+r.reward,sel:o&&!l,button:l?F("Получено"):o?F("Забрать"):void 0,buttonCls:l?"owned":"",buttonDisabled:l,onClick:()=>this.claim(r.id,1),button2:o&&!l&&ln()?F("×2 (реклама)"):void 0,onClick2:()=>void this.claimAd(r.id)}))}const s=Gn.filter(r=>r.chapter<t.chapter&&!t.claimed.includes(r.id)&&r.count(t.counters)>=r.need);for(const r of s)e.appendChild(this.ui.card({icon:"★",name:F(r.text),sub:F("прошлая глава")+" · "+r.reward,sel:!0,button:F("Забрать"),onClick:()=>this.claim(r.id,1)}))}claim(t,e){const n=Gn.find(s=>s.id===t);!n||this.save.claimed.includes(t)||n.count(this.save.counters)<n.need||(this.save.claimed.push(t),this.save.coins+=n.reward*e,this.audio.coin(),this.ui.toast(F("Награда за задание:")+" +"+n.reward*e),this.ui.text("coins",String(this.save.coins)),this.persist(),this.renderQuests())}async claimAd(t){if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}this.claim(t,2)}claimable(){return Gn.filter(t=>!this.save.claimed.includes(t.id)&&t.count(this.save.counters)>=t.need).length}cratesLeft(){const t=ph();return this.save.crates.day!==t&&(this.save.crates={day:t,n:0}),3-this.save.crates.n}async crateAd(){if(this.cratesLeft()<=0||this.save.bin.length>=cs)return;if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}this.save.crates.n++,this.save.counters.cratesOpened++;const e=new mn(Qn("crate-"+Date.now())),n=e.pick(li),s=Math.max(1,this.save.arrived+e.int(0,1)),r=Br(n,e.pick(Ji[n]),e.int(1,2147483647),s,{clean:e.range(.55,.9)});this.save.bin.push(r),this.audio.clank(),this.ui.toast(F("Из ящика:")+" "+F(Fi[r.role]).toLowerCase()+" · "+F(Oi[r.arch])+" · "+Math.round(r.clean*100)+"%"),this.persist(),this.renderHub()}async loanAd(){if(!this.work||this.save.tools.includes("sand"))return;const t=this.work.robot.parts[this.work.index];if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}this.save.loan=t.id,this.work.brush.tool=rr("sand"),this.work.brush.mode="clean",this.ui.toast(F("Пескоструй на эту деталь — твой.")),this.persist(),this.renderTools(),this.renderWorkHead()}ensureEnemy(){const t=this.champion,e=t?t.tier:1;this.save.enemySeed||(this.save.enemySeed=Qn("enemy-"+Date.now())>>>0||7);const n=this.bossFor();if(n){const a=ni(this.save.enemySeed^625341585,e+2,{enemy:!0});for(const o of a.parts)o.clean=Math.min(1,o.clean+.25),n.id==="king"&&(o.paintId="chrome",o.paint=1);return a.id="b"+a.seed.toString(36),a}const s=(t?bn(t).power:33)*(.88+this.save.chapter*.04);let r=null;for(let a=Math.max(1,e-2);a<=e+4;a++){const o=ni(this.save.enemySeed+a*7919,a,{enemy:!0}),l=bn(o).power;(!r||Math.abs(l-s)<Math.abs(bn(r).power-s))&&(r=o)}return r}setPhase(t){switch(t==="pause"&&this.phase!=="pause"&&(this.prevPhase=this.phase),this.phase==="work"&&t!=="work"&&t!=="pause"&&this.leaveWork(),this.phase==="fight"&&t!=="fight"&&t!=="pause"&&this.leaveArena(),this.phase=t,this.ui.screen(t,dx),this.ui.show("top",t!=="title"&&t!=="fight"&&t!=="pause"),Rh(t==="work"||t==="fight"),Th(t==="collection"||t==="shop"||t==="result"||t==="pause"),this.audio.ambient(t==="work"||t==="hub"),t){case"title":this.stage.setView("title"),this.showHubModel(),this.renderTitle();break;case"hub":this.stage.setView("hub"),this.showHubModel(),this.renderHub();break;case"work":this.stage.setView("work");break;case"collection":this.renderCollection();break;case"picker":this.renderPicker();break;case"quests":this.renderQuests();break;case"prefight":this.renderPrefight();break;case"shop":this.renderShop();break;case"daily":this.renderDaily();break}}renderScreen(){this.setPhase(this.phase)}refreshMeta(){const t=window,e=t.__lang?t.__lang():"ru";this.ui.meta(e==="en"?"English":"Русский",!this.audio.muted),this.ui.text("coins",String(this.save.coins)),this.ui.retranslate(),this.phase!=="work"&&this.phase!=="fight"?this.renderScreen():this.phase==="work"&&this.renderWorkHead()}renderTitle(){const t=this.save.robots.length;this.ui.show("title-progress",t>0),t>0&&this.ui.text("title-progress",F("Роботов в коллекции:")+" "+t+" · "+F("Побед:")+" "+this.save.wins),this.ui.text("btn-play",t>0?F("Продолжить"):F("В мастерскую"))}showHubModel(){const t=this.focusRobot??this.showcase();if(!t){this.clearHubModel();return}if(this.hubModel&&this.hubModel.data.id===t.id&&this.hubModel.data.parts.every((e,n)=>e.id===t.parts[n].id&&e.clean===t.parts[n].clean&&e.paint===t.parts[n].paint)){this.hubModel.data=t;return}this.clearHubModel(),this.hubModel=Ra(t),this.stage.root.add(this.hubModel.group),this.hubExplode=t.done?0:1}showcase(){if(!this.showcaseRobot){const t=ni(Qn("showcase-rust-legion"),3,{enemy:!0});for(const e of t.parts)e.clean=.35+(e.role==="core"?.5:0),e.paint=0,e.paintId=null;this.showcaseRobot=t}return this.showcaseRobot}clearHubModel(){this.hubModel&&(this.stage.root.remove(this.hubModel.group),this.hubModel.dispose(),this.hubModel=null)}renderHub(){const t=this.focusRobot;if(this.ui.text("coins",String(this.save.coins)),!t){this.ui.text("hub-name",F("Свалка пуста")),this.ui.text("hub-sub",this.save.pending>0?F("Робот ждёт на свалке — освободи слот в коллекции"):F("Выиграй бой на арене — привезут нового")),this.ui.show("btn-restore",!1),this.ui.show("btn-assemble",!1),this.ui.el("hub-stats").textContent="";return}this.ui.text("hub-name",this.robotName(t));const e=Math.round(Ta(t)*100);this.ui.text("hub-sub",F("Уровень")+" "+t.tier+" · "+F("чистота")+" "+e+"%"+(t.done?" · "+F("собран"):" · "+F("не собран"))),this.ui.show("btn-restore",!0),this.ui.text("btn-restore",t.done?F("Дочистить"):F("Восстанавливать")),this.ui.show("btn-assemble",!t.done),this.renderStats(this.ui.el("hub-stats"),bn(t),t.tier),this.renderChips(this.ui.el("hub-parts"),t,n=>this.openPicker(t,n)),this.renderHubExtras()}renderHubExtras(){const t=this.claimable();this.ui.text("btn-quests",F("Задания")+(t?" ●"+t:""));const e=this.cratesLeft();this.ui.show("btn-crate",e>0&&this.save.bin.length<cs&&this.save.counters.assembled>0&&ln()),this.ui.text("btn-crate",F("Ящик со свалки (реклама)")+" "+e+"/3"),this.ui.text("hub-goal",this.nextGoal())}renderChips(t,e,n){t.textContent="",e.parts.forEach((s,r)=>{const a=document.createElement("button");a.className="chip"+(s.clean>=.995?" full":s.clean<.4?" weak":"");const o=document.createElement("span");o.className="chip-k",o.textContent=F(ti[s.role]);const l=document.createElement("span");l.className="chip-v",l.textContent=Math.round(s.clean*100)+"%"+(s.stampFound?" ✦":"")+(s.trophy?" ★":""),a.append(o,l),a.dataset.part=String(r),a.addEventListener("click",c=>{c.preventDefault(),this.ui.blocked||n(r)}),t.appendChild(a)})}openPicker(t,e){this.audio.click(),this.picker={robot:t,index:e},this.setPhase("picker")}renderPicker(){const t=this.picker;if(!t){this.setPhase("hub");return}const e=t.robot.parts[t.index];this.ui.text("picker-title",F(Fi[e.role])+" · "+this.robotName(t.robot));const n=this.ui.el("picker-list");n.textContent="";const s=(r,a,o,l)=>{n.appendChild(this.ui.card({icon:r.trophy?"★":"⚙",iconBg:o?"#3a2a1a":void 0,name:F(Oi[r.arch])+" · "+Math.round(r.clean*100)+"%"+(r.stampFound?" ✦":""),sub:a+" · "+F("Уровень")+" "+r.tier+" · "+F(Ca[r.role])+" "+Math.round(xu(r)),sel:o,button:F(o?"Чистить":"Поставить"),buttonCls:o?"ghost":"",onClick:o?()=>{this.save.focus=t.robot.id,this.enterWork(t.robot,!1,t.index)}:l}))};s(e,F("Стоит сейчас"),!0,null),this.save.bin.filter(r=>r.role===e.role).forEach(r=>s(r,F("Запас"),!1,()=>this.mountPart(t.robot,t.index,r,null)));for(const r of this.save.robots){if(r.id===t.robot.id)continue;const a=r.parts.find(o=>o.role===e.role);a&&s(a,this.robotName(r),!1,()=>this.mountPart(t.robot,t.index,a,r))}}mountPart(t,e,n,s){this.audio.init();const r=t.parts[e];if(s){const a=s.parts.findIndex(o=>o.id===n.id);s.parts[a]=r}else this.save.bin=this.save.bin.filter(a=>a.id!==n.id),this.save.bin.push(r);t.parts[e]=n,this.save.counters.mounted++,n.trophy&&this.save.counters.chromeParts++,this.audio.clank(),this.ui.toast(F("Деталь поставлена:")+" "+F(Oi[n.arch])),this.clearHubModel(),this.persist(),this.save.focus=t.id,this.setPhase("hub")}renderStats(t,e,n){const s=10+n*3;this.ui.stats(t,[{k:F("Броня"),v:e.armor,max:s},{k:F("Урон"),v:e.damage,max:s},{k:F("Скорость"),v:e.speed,max:s},{k:F("Энергия"),v:e.energy,max:s}])}assemble(){const t=this.focusRobot;!t||t.done||this.assembling||(t.done=!0,(!this.save.champion||!this.robotById(this.save.champion)?.done)&&(this.save.champion=t.id),this.assembling=!0,this.audio.init(),this.audio.charge(),setTimeout(()=>{this.assembling=!1,this.audio.clank(),this.ui.flash(),this.save.counters.assembled++,ji(),this.persist(),this.renderHub(),this.story("firstAssembled")||this.ui.toast(F("Робот собран! Теперь его можно выставить на арену."))},1100))}enterWork(t,e,n=0){this.leaveWork();const s=new en;this.stage.root.add(s),this.clearHubModel(),this.work={robot:t,index:0,meshes:new Map,daily:e,startedAt:e?performance.now()-this.save.daily.elapsed:0,group:s,brush:new Pv(rr(this.save.tools[this.save.tools.length-1]??"brush"))};const r=["sand","wide","brush"].find(a=>this.save.tools.includes(a))??"brush";this.work.brush.tool=rr(r),this.hintShown=!this.save.robots.some(a=>a.done)&&this.save.arrived<=1,this.ui.el("work-hint").classList.toggle("gone",!this.hintShown),this.setPhase("work"),this.showPart(n),this.renderTools()}currentPart(){return this.work?this.work.meshes.get(this.work.robot.parts[this.work.index].role)??null:null}showPart(t){if(!this.work)return;this.syncPartState();const e=this.work;e.index=(t+e.robot.parts.length)%e.robot.parts.length;const n=e.robot.parts[e.index];let s=e.meshes.get(n.role);s||(s=Mu(n,e.robot.metal,e.robot.accent),this.restoreParts(s,e.robot.id),e.meshes.set(n.role,s));for(const[,r]of e.meshes)r.mesh.visible=r===s;s.geometry.stamp&&(s.material.rust.uStampPos.value.copy(s.geometry.stamp.pos),s.material.rust.uStampR.value=s.geometry.stamp.r,s.material.rust.uStampOn.value=1,s.material.rust.uAccent.value.set(e.robot.accent)),e.group.add(s.mesh),s.mesh.rotation.set(.35,-.6,0),e.brush.tool.id==="sand"&&!this.save.tools.includes("sand")&&this.save.loan!==n.id&&(e.brush.tool=rr("brush")),this.partSpin.set(0,0),this.lastClean=ls(s.geometry.geom),this.renderWorkHead(),this.renderPaints()}syncPartState(){if(this.work)for(const[t,e]of this.work.meshes){const n=this.work.robot.parts.find(s=>s.role===t);n.clean=ls(e.geometry.geom),n.paint=nh(e.geometry.geom)}}renderWorkHead(){if(!this.work)return;const t=this.work,e=t.robot.parts[t.index];this.ui.text("part-name",F(Fi[e.role])),this.ui.text("part-idx",t.index+1+"/"+t.robot.parts.length+" · "+F(Oi[e.arch]));const n=this.currentPart(),s=n?ls(n.geometry.geom):e.clean,r=10+t.robot.tier*3,a=Math.round(r*(.25+.75*s));this.ui.text("part-stat",F(Ca[e.role])+": "+a+" / "+r);const o=Math.floor(s*100+1e-6);this.ui.text("part-pct",o+"%");const l=this.ui.el("ring-fill");l.style.strokeDashoffset=String(106.8*(1-s)),l.classList.toggle("full",s>=.995),this.ui.el("part-pct").setAttribute("aria-valuenow",String(o)),this.ui.text("btn-part-done",t.daily?F("Следующая"):F("Готово")),this.ui.show("btn-corners",!t.daily&&s>=.6&&s<.995&&ln()),this.ui.show("btn-loan",!t.daily&&!this.save.tools.includes("sand")&&this.save.loan!==e.id&&s<.995&&ln()),this.ui.show("daily-timer",t.daily),this.ui.show("btn-paint-mode",!t.daily),t.daily&&this.ui.text("daily-timer",sr(performance.now()-t.startedAt)),this.ui.text("btn-paint-mode",t.brush.mode==="paint"?F("Чистка"):F("Краска"))}renderTools(){if(!this.work)return;const t=this.ui.el("tools");t.textContent="";const e=this.work.robot.parts[this.work.index];for(const n of xs){const s=this.save.tools.includes(n.id)||n.id==="sand"&&this.save.loan===e.id,r=document.createElement("button");if(r.className="tool"+(this.work.brush.tool.id===n.id&&this.work.brush.mode==="clean"?" on":"")+(s?"":" locked"),r.textContent=n.icon,r.setAttribute("aria-label",F(n.name)),r.dataset.tool=n.id,!s){const a=document.createElement("span");a.className="price",a.textContent=String(n.price),r.appendChild(a)}r.addEventListener("click",a=>{a.preventDefault(),this.ui.blocked||this.pickTool(n)}),t.appendChild(r)}}pickTool(t){if(!this.work)return;this.audio.init();const e=t.id==="sand"&&this.save.loan===this.work.robot.parts[this.work.index].id;if(!this.save.tools.includes(t.id)&&!e){if(this.save.coins<t.price){this.ui.toast(F("Не хватает денег. Побеждай на арене."));return}this.save.coins-=t.price,this.save.tools.push(t.id),this.audio.coin(),this.ui.toast(F("Куплено:")+" "+F(t.name)),this.ui.text("coins",String(this.save.coins)),this.persist()}this.work.brush.tool=t,this.work.brush.mode="clean",this.ui.show("paints",!1),this.ui.show("tools",!0),this.audio.click(),this.renderTools(),this.renderWorkHead()}renderPaints(){if(!this.work)return;const t=this.ui.el("paints");t.textContent="";const e=this.work.robot.parts[this.work.index];for(const n of An){const s=this.save.paints.includes(n.id);if(n.rare&&!s)continue;const r=document.createElement("button");r.className="swatch"+(e.paintId===n.id&&this.work.brush.mode==="paint"?" on":"")+(s?"":" locked"),r.style.background="#"+n.color.toString(16).padStart(6,"0"),r.setAttribute("aria-label",F(n.name)+(s?"":" · "+n.price)),r.dataset.paint=n.id,r.addEventListener("click",a=>{a.preventDefault(),this.ui.blocked||this.pickPaint(n)}),t.appendChild(r)}}pickPaint(t){if(!this.work)return;if(this.audio.init(),!this.save.paints.includes(t.id)){if(this.save.coins<t.price){this.ui.toast(F("Не хватает денег. Побеждай на арене."));return}this.save.coins-=t.price,this.save.paints.push(t.id),this.audio.coin(),this.ui.toast(F("Куплено:")+" "+F(t.name)),this.ui.text("coins",String(this.save.coins)),this.persist()}const e=this.currentPart(),n=this.work.robot.parts[this.work.index];if(e&&n.paintId!==t.id){n.paintId=t.id;const s=e.geometry.geom.attributes.aPaint;s.array.fill(0),s.needsUpdate=!0,e.material.rust.uPaint.value.set(t.color),e.material.rust.uPaintMetal.value=t.metallic}this.work.brush.mode="paint",this.audio.click(),this.renderPaints(),this.renderTools(),this.renderWorkHead()}togglePaintMode(){if(!this.work)return;if(this.audio.init(),this.work.brush.mode!=="paint"){const e=An.filter(r=>this.save.paints.includes(r.id)),n=this.work.robot.parts[this.work.index],s=n.paintId?Pr(n.paintId):null;if(!e.length){this.ui.toast(F("Красок пока нет — загляни в магазин."));return}!s||!e.includes(s)?this.pickPaint(e[0]):this.work.brush.mode="paint"}else this.work.brush.mode="clean";this.ui.show("paints",this.work.brush.mode==="paint"),this.ui.show("tools",this.work.brush.mode!=="paint"),this.renderPaints(),this.renderTools(),this.renderWorkHead()}partDone(){if(!this.work)return;this.syncPartState();const t=this.work;if(t.daily){if(t.robot.parts.every(r=>r.clean>=.995)){this.finishDaily();return}const n=t.robot.parts.findIndex((r,a)=>a>t.index&&r.clean<.995),s=n>=0?n:t.robot.parts.findIndex(r=>r.clean<.995);this.showPart(s),this.audio.click();return}this.audio.clank(),this.persist(),this.save.focus=t.robot.id,this.setPhase("hub")}leaveWork(){if(this.work){this.syncPartState(),this.work.daily&&(this.save.daily.elapsed=performance.now()-this.work.startedAt,this.save.daily.robot=this.work.robot),this.persist(),this.audio.scrapeStop(),this.stage.root.remove(this.work.group);for(const[,t]of this.work.meshes)t.geometry.geom.dispose(),t.geometry.glow?.dispose(),t.material.dispose();this.work=null,this.pointers.clear(),this.pendingStroke=null}}async cornersAd(){const t=this.currentPart();if(!t||!this.work||this.work.daily)return;if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}const n=t.geometry.geom.attributes.aClean;n.array.fill(1),n.needsUpdate=!0,this.onPartPerfect(t),this.renderWorkHead()}onPartPerfect(t){this.sweepT=0,this.audio.shine(),!this.work.daily&&!t.state.perfectPaid?(t.state.perfectPaid=!0,this.save.counters.perfect++,this.save.coins+=Aa,this.ui.text("coins",String(this.save.coins)),this.ui.float("+"+Aa,.5,.3,"big"),this.ui.toast(F("Идеально чисто!")+" +"+Aa),this.audio.coin(),ji()):this.work.daily&&this.ui.toast(F("Деталь блестит. Следующая!")),this.persist()}bind(t){t.addEventListener("pointerdown",n=>this.onDown(n)),t.addEventListener("pointermove",n=>this.onMove(n)),t.addEventListener("pointerup",n=>this.onUp(n)),t.addEventListener("pointercancel",n=>this.onUp(n)),t.addEventListener("contextmenu",n=>n.preventDefault());const e=this.ui;e.on("play",()=>{this.audio.init(),this.start()}),e.on("daily-title",()=>{this.audio.init(),this.setPhase("daily")}),e.on("lang",()=>this.toggleLang()),e.on("lang2",()=>this.toggleLang()),e.on("sound",()=>this.toggleSound()),e.on("sound2",()=>this.toggleSound()),e.on("sound-top",()=>this.toggleSound()),e.on("back",()=>this.back()),e.on("restore",()=>{const n=this.focusRobot;n&&this.enterWork(n,!1)}),e.on("assemble",()=>this.assemble()),e.on("collection",()=>this.setPhase("collection")),e.on("arena",()=>this.setPhase("prefight")),e.on("shop",()=>this.setPhase("shop")),e.on("daily",()=>this.setPhase("daily")),e.on("prev",()=>{this.audio.click(),this.showPart((this.work?.index??0)-1)}),e.on("next",()=>{this.audio.click(),this.showPart((this.work?.index??0)+1)}),e.on("paint-mode",()=>this.togglePaintMode()),e.on("part-done",()=>this.partDone()),e.on("corners",()=>void this.cornersAd()),e.on("buy-slot",()=>this.buySlot()),e.on("boost",()=>void this.boostAd()),e.on("fight",()=>this.startFight()),e.on("fast",()=>{this.arena&&(this.arena.speed=this.arena.speed>1?1:3,this.ui.text("btn-fast",this.arena.speed>1?F("Обычно ×1"):F("Быстрее ×3")))}),e.on("double",()=>void this.doubleAd()),e.on("verdict",()=>void this.verdictGo()),e.on("dialog-next",()=>this.nextLine()),e.on("quests",()=>this.setPhase("quests")),e.on("crate",()=>void this.crateAd()),e.on("loan",()=>void this.loanAd()),e.on("daily-double",()=>void this.dailyDoubleAd()),e.on("special",()=>this.special()),e.on("picker-back",()=>this.setPhase("hub")),e.on("rematch",()=>void this.rematchAd()),e.on("result-next",()=>void this.afterResult()),e.on("result-shop",()=>this.setPhase("shop")),e.on("rare-paint",()=>void this.rarePaintAd()),e.on("daily-start",()=>this.startDaily()),e.on("daily-back",()=>this.back()),e.on("resume",()=>this.setPhase(this.prevPhase)),e.on("quit",()=>{this.setPhase("title")}),window.addEventListener("keydown",n=>{this.ui.blocked||n.code==="Escape"&&(this.phase==="work"||this.phase==="fight"?this.setPhase("pause"):this.phase==="pause"&&this.setPhase(this.prevPhase))})}start(){if(!this.save.robots.length){this.arriveRobot(),this.persist(),this.setPhase("hub"),this.story("intro",()=>this.ui.toast(F("Первый робот со свалки. Начни с любой детали.")));return}this.setPhase("hub")}back(){switch(this.audio.click(),this.phase){case"work":this.partDone();break;case"hub":this.setPhase("title");break;case"result":this.afterResult();break;case"fight":break;default:this.setPhase("hub")}}toggleLang(){const t=window;t.__toggleLang&&t.__toggleLang().then(()=>this.refreshMeta())}toggleSound(){this.audio.init();const t=this.audio.toggleMute();Pa(ah,t),this.refreshMeta()}onDown(t){if(this.ui.blocked||this.phase!=="work"||!this.work||this.storyOpen)return;this.audio.init();try{t.target.setPointerCapture?.(t.pointerId)}catch{}const e=this.currentPart();let n=!1;if(e&&this.pointers.size===0){const s=this.stage.ndc(t.clientX,t.clientY,this.tmpN),r=new Io;r.setFromCamera(s,this.stage.camera),n=r.intersectObject(e.mesh,!1).length>0}this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,scrub:n}),n&&(this.work.brush.begin(),this.pendingStroke={x:t.clientX,y:t.clientY,px:t.clientX,py:t.clientY},this.hintShown&&(this.hintShown=!1,this.ui.el("work-hint").classList.add("gone")))}onMove(t){const e=this.pointers.get(t.pointerId);if(!e||this.ui.blocked||!this.work)return;const n=t.clientX-e.x,s=t.clientY-e.y;if(e.scrub&&this.pointers.size===1)this.pendingStroke?(this.pendingStroke.x=t.clientX,this.pendingStroke.y=t.clientY):this.pendingStroke={x:t.clientX,y:t.clientY,px:e.x,py:e.y};else{this.partSpin.x+=n*.0085,this.partSpin.y+=s*.0085;const a=this.currentPart();a&&this.rotatePart(a.mesh,n*.0085,s*.0085)}e.x=t.clientX,e.y=t.clientY}onUp(t){const e=this.pointers.get(t.pointerId);this.pointers.delete(t.pointerId),e?.scrub&&(this.pendingStroke=null,this.audio.scrapeStop(),this.brushOn=0)}rotatePart(t,e,n){const s=new qn().setFromAxisAngle(new L(0,1,0),e),r=new qn().setFromAxisAngle(new L(1,0,0),n);t.quaternion.premultiply(s).premultiply(r)}updateWork(t){const e=this.work,n=this.currentPart();if(!e||!n)return;const s=this.pendingStroke,r=this.pointers.size===0;r&&this.partSpin.lengthSq()>1e-6?(this.rotatePart(n.mesh,this.partSpin.x*t*8,this.partSpin.y*t*8),this.partSpin.multiplyScalar(Math.exp(-t*4))):r||this.partSpin.set(0,0),n.mesh.updateMatrixWorld();let a=0;if(s){const o=Math.hypot(s.x-s.px,s.y-s.py)/Math.max(1,Math.min(window.innerWidth,window.innerHeight)),l=this.stage.ndc(s.x,s.y,this.tmpN);e.brush.stroke(l,this.stage.camera,n.mesh,o,t,this.strokeOut),s.px=s.x,s.py=s.y;const c=this.strokeOut;if(c.hit){if(this.brushOn=1,n.material.rust.uBrushPos.value.copy(c.point),n.material.rust.uBrushR.value=e.brush.tool.radius,a=c.removed,a>.05){this.tmpV.copy(c.point).applyMatrix4(n.mesh.matrixWorld);const d=c.normal.clone().transformDirection(n.mesh.matrixWorld);d.y+=.6;const u=e.brush.mode==="paint",f=Math.min(12,Math.ceil(a*(u?1.5:3)));if(u){const g=Pr(e.robot.parts[e.index].paintId??"");this.flakeColor.set(g?g.color:16777215)}else this.flakeColor.set(9062938);this.stage.flakes.emit(this.tmpV,d,f,this.flakeColor,{speed:u?.6:1.1,spread:.8,life:u?.5:.8,size:u?.03:.035,gravity:u?1.5:2.5,jitter:.45})}const h=e.brush.mode==="paint"?"spray":e.brush.tool.id==="sand"?"sand":e.brush.tool.id==="solvent"?"solvent":"brush";this.audio.scrape(a,o/Math.max(t,.001),h)}else this.brushOn=Math.max(0,this.brushOn-t*8),this.audio.scrape(0,0,"brush")}else this.brushOn=Math.max(0,this.brushOn-t*8);if(n.material.rust.uBrushOn.value=this.brushOn,this.dirtyT+=t,a>0&&this.dirtyT>.12){this.dirtyT=0;const o=ls(n.geometry.geom);e.brush.mode==="clean"&&o>=.995&&this.lastClean<.995&&this.onPartPerfect(n),this.lastClean=o,this.renderWorkHead();const l=e.robot.parts[e.index];n.geometry.stamp&&!l.stampFound&&lx(n.geometry.geom,n.geometry.stamp)>=.85&&(l.stampFound=!0,this.save.counters.stamps++,this.audio.shine(),this.ui.flash(),this.ui.toast(F("Клеймо мастера! Деталь получает +8 %.")),ji(),this.persist(),this.story("firstStamp"))}else e.daily&&this.frames%6===0&&this.ui.text("daily-timer",sr(performance.now()-e.startedAt));this.sweepT>=0&&(this.sweepT+=t*1.4,n.material.rust.uSweep.value=this.sweepT>1.2?-1:this.sweepT,this.sweepT>1.2&&(this.sweepT=-1))}renderCollection(){const t=this.ui.el("collection-list");t.textContent="",this.ui.text("slots-line",F("Слотов:")+" "+this.save.robots.length+"/"+this.save.slots+(this.save.pending>0?" · "+F("на свалке ждут:")+" "+this.save.pending:""));for(const s of this.save.robots){const r=bn(s),a=this.champion?.id===s.id;t.appendChild(this.ui.card({icon:s.done?"🤖":"🔩",iconBg:"#"+s.metal.toString(16).padStart(6,"0")+"33",name:this.robotName(s)+(a?" ★":""),sub:F("Уровень")+" "+s.tier+" · "+F("чистота")+" "+Math.round(Ta(s)*100)+"%"+(s.done?"":" · "+F("не собран")),mini:[F("Броня")+" "+Math.round(r.armor),F("Урон")+" "+Math.round(r.damage),F("Скорость")+" "+Math.round(r.speed),F("Энергия")+" "+Math.round(r.energy)],sel:a,button:s.done?F(a?"Чемпион":"Выставить"):F("В мастерскую"),buttonCls:s.done&&a?"owned":"",onClick:()=>{if(this.audio.click(),!s.done){this.save.focus=s.id,this.enterWork(s,!1);return}this.save.champion=s.id,this.save.focus=s.id,this.persist(),this.renderCollection()},button2:this.save.robots.length>1?F("Разобрать"):void 0,onClick2:()=>this.scrap(s)}))}const e=this.save.slots<wa;this.ui.show("btn-buy-slot",e),e&&this.ui.text("btn-buy-slot",F("Купить слот")+" · "+ar(this.save.slots));const n=this.ui.el("bin-list");n.textContent="",this.ui.text("bin-line",F("Деталей в запасе:")+" "+this.save.bin.length+"/"+cs);for(const s of this.save.bin)n.appendChild(this.ui.card({icon:s.trophy?"★":"⚙",name:F(Fi[s.role])+" · "+F(Oi[s.arch]),sub:F("Уровень")+" "+s.tier+" · "+F("чистота")+" "+Math.round(s.clean*100)+"%"+(s.stampFound?" ✦":""),button:F("Продать")+" +"+or(s.tier,s.clean,s.trophy),buttonCls:"ghost",onClick:()=>this.sellPart(s)}))}sellPart(t){this.audio.init();const e=or(t.tier,t.clean,t.trophy);this.save.bin=this.save.bin.filter(n=>n.id!==t.id),this.save.coins+=e,this.audio.coin(),this.ui.toast(F("Продано:")+" +"+e),this.ui.text("coins",String(this.save.coins)),this.persist(),this.renderCollection()}scrap(t){if(this.save.robots.length<=1)return;this.audio.init(),this.save.robots=this.save.robots.filter(n=>n.id!==t.id),this.save.champion===t.id&&(this.save.champion=null),this.save.focus===t.id&&(this.save.focus=this.save.robots[0]?.id??null);let e=0;for(const n of t.parts)this.save.bin.length<cs?this.save.bin.push(n):e+=or(n.tier,n.clean,n.trophy);if(this.save.coins+=e,this.audio.clank(),this.ui.toast(e?F("Разобран: детали в запасе, лишние проданы:")+" +"+e:F("Разобран: детали в запасе.")),this.clearHubModel(),this.save.pending>0&&this.save.robots.length<this.save.slots){this.save.pending--;const n=this.arriveRobot();n&&this.ui.toast(F("Со свалки привезли нового робота:")+" "+this.robotName(n))}this.ui.text("coins",String(this.save.coins)),this.persist(),this.renderCollection()}buySlot(){this.audio.init();const t=ar(this.save.slots);if(!(this.save.slots>=wa)){if(this.save.coins<t){this.ui.toast(F("Не хватает денег. Побеждай на арене."));return}if(this.save.coins-=t,this.save.slots++,this.audio.coin(),this.save.pending>0){this.save.pending--;const e=this.arriveRobot();e&&this.ui.toast(F("Со свалки привезли нового робота:")+" "+this.robotName(e))}this.ui.text("coins",String(this.save.coins)),this.persist(),this.phase==="collection"?this.renderCollection():this.renderShop()}}renderPrefight(){const t=this.champion,e=this.ui.el("prefight-cards");e.textContent="",this.ui.show("prefight-empty",!t),this.ui.show("btn-fight",!!t),this.ui.show("btn-boost",!!t&&this.boostNext===0&&ln()),this.ui.show("prefight-odds",!!t);const n=this.bossFor();if(n&&this.save.chapter<jn-1&&this.story("boss"+this.save.chapter),this.ui.text("prefight-league",F("Лига:")+" "+F(gr[this.league()])+" · "+F("побед")+" "+this.save.wins+(n?" · "+F("БОСС"):"")),this.ui.show("prefight-boss",!!n),n&&this.ui.text("prefight-boss",F(n.name)+": "+F(n.hint)),!t)return;const s=this.ensureEnemy(),r=bn(t,this.boostNext),a=bn(s),o=(d,u,f)=>{const g=document.createElement("div");g.className="card"+(f?" sel":"");const y=document.createElement("div");y.className="name",y.textContent=d,g.appendChild(y);for(const[m,p]of[[F("Броня"),u.armor],[F("Урон"),u.damage],[F("Скорость"),u.speed],[F("Энергия"),u.energy],[F("Прочность"),u.hp]]){const E=document.createElement("div");E.className="stat-row";const T=document.createElement("span");T.textContent=m;const x=document.createElement("b");x.textContent=String(Math.round(p)),E.append(T,x),g.appendChild(E)}return g};e.appendChild(o(this.robotName(t)+(this.boostNext>0?" ⚡":""),r,!0));const l=document.createElement("div");l.className="vs",l.textContent="VS",e.appendChild(l),e.appendChild(o(n?F(n.name):this.robotName(s),a,!1));const c=r.power/Math.max(1,a.power),h=c>1.25?F("Шансы: уверенная победа"):c>1.05?F("Шансы: скорее победа"):c>.9?F("Шансы: равный бой"):F("Шансы: лучше дочистить");this.ui.text("prefight-odds",h)}async boostAd(){if(this.boostNext>0)return;if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}this.boostNext=ih,this.audio.charge(),this.ui.toast(F("Робот усилен на один бой!")),this.renderPrefight()}startFight(){const t=this.champion;if(!t)return;this.audio.init();const e=this.ensureEnemy(),n=this.bossFor(),s=this.boostNext;this.boostNext=0;const r=Qn("fight-"+this.save.battles+"-"+t.id+"-"+e.id+"-"+Math.floor(Date.now()/1e3))>>>0||3;this.fight={enemy:e,boss:n,report:null,boost:s,reward:0,doubled:!1},this.clearHubModel();const a=[Ra(t),Ra(e)];this.fightModels=a;const o=l=>[(l.x+1)/2,(1-l.y)/2];this.arena=new Lr([{stats:bn(t,s),model:a[0],player:!0},{stats:bn(e),model:a[1],player:!1,boss:n?.id??null}],r,{onHp:(l,c)=>{this.ui.el("f0-hp").style.width=Math.max(0,l[0]*100)+"%",this.ui.el("f1-hp").style.width=Math.max(0,l[1]*100)+"%",this.ui.el("f0-en").style.width=c[0]*100+"%",this.ui.el("f1-en").style.width=c[1]*100+"%"},onHit:(l,c,h,d)=>{this.hitCount++,this.audio.hit(h),h?(this.stage.shake(l===0?.3:.22),this.ui.flash()):l===0&&this.stage.shake(.08);const[u,f]=o(d);this.ui.float("-"+c,u,f,h?"big":"")},onCallout:(l,c,h)=>{const[d,u]=o(h),f={dodge:F("УВОРОТ"),crit:F("КРИТ!"),armor:F("БРОНЯ ВЫДЕРЖАЛА"),lost:F("ДЕТАЛЬ ОТОРВАНА!"),special:F("СПЕЦУДАР"),rust:F("РЖАВЕЕТ")};this.ui.float(f[c],d,u-.1,"callout "+c),c==="dodge"&&this.audio.dodge(),c==="lost"&&(this.audio.clank(),this.stage.shake(.35)),c==="crit"&&this.audio.charge()},onPartLost:()=>this.renderFightParts(),onSpecialReady:l=>{this.ui.show("btn-special",l),l&&this.audio.bell()},onRust:(l,c,h)=>{const u=this.fightModels?.[l]?.parts.find(f=>f.state.role===c);u&&bu(u.geometry.geom,h,u.state.seed)},onEnd:l=>this.endFight(l)}),this.stage.root.add(this.arena.group),this.ui.text("f0-name",this.robotName(t)),this.ui.text("f1-name",n?F(n.name):this.robotName(e)),this.ui.text("btn-fast",F("Быстрее ×3")),this.ui.show("btn-special",!1),this.renderFightParts(),this.setPhase("fight"),this.audio.bell()}renderFightParts(){if(this.arena)for(const t of[0,1]){const e=this.ui.el("f"+t+"-parts");e.textContent="";const n=this.arena.aliveParts(t);for(const s of li){const r=document.createElement("span");r.className="pmini"+(n[s]?"":" dead"),r.textContent=fx[s],r.setAttribute("aria-label",F(ti[s])),e.appendChild(r)}}}special(){this.arena&&this.arena.requestSpecial()&&(this.audio.charge(),this.ui.show("btn-special",!1))}leaveArena(){if(this.stage.cuePull=0,this.arena&&(this.stage.root.remove(this.arena.group),this.arena.dispose(),this.arena=null),this.fightModels){for(const t of this.fightModels)t.dispose();this.fightModels=null}}endFight(t){const e=this.fight,n=this.champion;if(!e||!n){this.setPhase("hub");return}e.report=t,this.save.battles++;const s=t.winner===0;let r=null,a=null;if(s){if(this.save.wins++,this.save.counters.wins++,e.reward=jv(e.enemy.tier)*(e.boss?2:1),this.save.coins+=e.reward,this.save.enemySeed=Qn("enemy-"+this.save.battles+"-"+Date.now())>>>0||11,e.boss){this.save.bossDue=!1,this.save.counters.bosses++;const f=[...n.parts].sort((g,y)=>g.clean-y.clean)[0];r=ix(f.role,e.enemy.seed,e.enemy.tier),this.save.bin.length<cs?this.save.bin.push(r):this.save.coins+=or(r.tier,1,!0),this.save.paints.includes("chrome")||this.save.paints.push("chrome"),this.save.chapter<jn-1&&(a="bossWin"+this.save.chapter,this.advanceChapterLater=!0)}else this.save.chapterWins++,this.checkProgress(),this.save.wins===1&&(a="firstWin");this.arriveRobot()||this.save.pending++,this.audio.win(),ji(),(this.save.wins===3||this.save.wins===10)&&Qu(),this.save.wins===2&&ju()}else this.save.losses++,e.reward=tx(e.enemy.tier),this.save.coins+=e.reward,this.audio.lose(),this.save.losses===1&&(a="firstLoss");this.resultScene=a,this.persist();const o=n.parts;let l=0;for(let u=1;u<o.length;u++)o[u].clean<o[l].clean&&(l=u);const c=t.damageTaken[0];let h="body";for(const u of li)c[u]>c[h]&&(h=u);const d=t.lostParts[0];this.verdictIndex=o[l].clean<.995?l:-1,setTimeout(()=>{if(this.phase!=="fight")return;this.ui.text("result-title",s?e.boss?F("Босс повержен!"):F("Победа"):F("Поражение"));const u=Math.round(t.margin*100);this.ui.text("result-text",s?u>60?F("Разгром. Противник даже не понял, что произошло."):F("Победа на последнем издыхании."):F("Ржавчина подвела."));let f="";if(d.length&&(f+=F("Оторвано:")+" "+d.map(g=>F(ti[g]).toLowerCase()).join(", ")+". "),f+=F("Противник бил в:")+" "+F(ti[h]).toLowerCase()+". ",this.verdictIndex>=0&&(f+=F("Слабое место:")+" "+F(ti[o[l].role]).toLowerCase()+" — "+F("чистота")+" "+Math.round(o[l].clean*100)+"%."),r&&(f+=" "+F("Трофей босса — хромовая деталь в запасе:")+" "+F(Fi[r.role]).toLowerCase()+"."),this.ui.text("result-verdict",f),this.ui.show("btn-verdict",this.verdictIndex>=0),this.verdictIndex>=0&&this.ui.text("btn-verdict",F("Дочистить:")+" "+F(ti[o[l].role]).toLowerCase()),this.ui.text("result-coins","+"+e.reward),this.ui.show("btn-double",s&&ln()),this.ui.show("btn-rematch",!s&&ln()),this.ui.text("btn-result-next",F(s?"Дальше":"В мастерскую")),this.ui.text("coins",String(this.save.coins)),this.setPhase("result"),s&&this.save.robots.length>=this.save.slots&&this.save.pending>0&&this.ui.toast(F("Новый робот ждёт на свалке — освободи слот в коллекции.")),this.resultScene){const g=this.resultScene;this.resultScene=null,this.story(g)}},700)}async verdictGo(){const t=this.champion,e=this.verdictIndex;this.fight=null,this.advanceChapterLater&&(this.advanceChapterLater=!1,this.advanceChapter()),await ka(this.save.battles-1),!this.ui.blocked&&(t&&e>=0?(this.save.focus=t.id,this.enterWork(t,!1,e)):this.setPhase("hub"))}async doubleAd(){const t=this.fight;if(!t||t.doubled)return;if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}t.doubled=!0,this.save.coins+=t.reward,this.ui.text("result-coins","+"+t.reward*2),this.ui.text("coins",String(this.save.coins)),this.ui.show("btn-double",!1),this.audio.coin(),this.persist()}async rematchAd(){if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}this.boostNext=ih,this.ui.toast(F("Робот усилен на один бой!")),this.startFight()}async afterResult(){const t=this.fight?.report?this.fight.report.winner===0:!1;if(this.fight=null,this.advanceChapterLater&&(this.advanceChapterLater=!1,this.advanceChapter()),await ka(this.save.battles-1),!this.ui.blocked)if(t){const e=this.save.robots[this.save.robots.length-1];e&&!e.done&&(this.save.focus=e.id),this.setPhase("hub"),e&&!e.done&&this.ui.toast(F("Со свалки привезли нового робота:")+" "+this.robotName(e))}else{const e=this.champion;e?(this.save.focus=e.id,this.enterWork(e,!1)):this.setPhase("hub")}}renderShop(){this.ui.text("coins",String(this.save.coins));const t=this.ui.el("shop-tools");t.textContent="";for(const r of xs){if(!r.price)continue;const a=this.save.tools.includes(r.id);t.appendChild(this.ui.card({icon:r.icon,name:F(r.name),sub:F(r.hint),button:a?F("Куплено"):String(r.price),buttonCls:a?"owned":"",buttonDisabled:a||this.save.coins<r.price,onClick:()=>this.buyTool(r)}))}const e=this.ui.el("shop-paints");e.textContent="";for(const r of An){if(r.rare)continue;const a=this.save.paints.includes(r.id);e.appendChild(this.ui.card({icon:"●",iconBg:"#"+r.color.toString(16).padStart(6,"0"),name:F(r.name),sub:F(r.hint),button:a?F("Куплено"):String(r.price),buttonCls:a?"owned":"",buttonDisabled:a||this.save.coins<r.price,onClick:()=>this.buyPaint(r)}))}const n=this.ui.el("shop-slots");n.textContent="";const s=this.save.slots<wa;n.appendChild(this.ui.card({icon:"▣",name:F("Слот коллекции"),sub:F("Слотов:")+" "+this.save.robots.length+"/"+this.save.slots,button:s?String(ar(this.save.slots)):F("Максимум"),buttonDisabled:!s||this.save.coins<ar(this.save.slots),onClick:()=>this.buySlot()})),this.ui.show("btn-rare-paint",!this.save.paints.includes("chrome")&&ln())}buyTool(t){this.audio.init(),!(this.save.tools.includes(t.id)||this.save.coins<t.price)&&(this.save.coins-=t.price,this.save.tools.push(t.id),this.audio.coin(),this.ui.toast(F("Куплено:")+" "+F(t.name)),this.persist(),this.renderShop())}buyPaint(t){this.audio.init(),!(this.save.paints.includes(t.id)||this.save.coins<t.price)&&(this.save.coins-=t.price,this.save.paints.push(t.id),Object.keys(t.bonus).length&&this.save.counters.paints++,this.audio.coin(),this.ui.toast(F("Куплено:")+" "+F(t.name)),this.persist(),this.renderShop())}async rarePaintAd(){if(this.save.paints.includes("chrome"))return;if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}this.save.paints.push("chrome"),this.audio.coin(),this.ui.toast(F("Редкая краска получена:")+" "+F("Хром")),this.persist(),this.renderShop()}dailyRobot(){const t=ph();return this.save.daily.day!==t&&(this.save.daily={day:t,done:!1,best:this.save.daily.best,elapsed:0,robot:null}),this.save.daily.robot||(this.save.daily.robot=ni(Qn("daily-"+t)||5,4,{daily:!0})),this.save.daily.robot}renderDaily(){this.dailyRobot();const t=this.save.daily;this.ui.text("daily-best",t.best!=null?F("Лучшее время:")+" "+sr(t.best):F("Лучшего времени пока нет.")),this.ui.show("daily-done",t.done),this.ui.show("btn-daily-start",!t.done),this.ui.show("btn-daily-double",t.done&&!this.save.dailyDoubled&&ln()),this.ui.text("btn-daily-start",t.elapsed>0?F("Продолжить"):F("Начать"))}startDaily(){this.audio.init();const t=this.dailyRobot();this.save.daily.done||(this.enterWork(t,!0),this.ui.toast(F("Время пошло. Все пять деталей — до блеска.")))}finishDaily(){if(!this.work)return;const t=Math.round(performance.now()-this.work.startedAt),e=this.save.daily;e.done=!0,e.elapsed=t,(e.best==null||t<e.best)&&(e.best=t),this.save.coins+=Ea,this.save.counters.daily++,this.save.dailyDoubled=!1,td("daily",t),this.audio.win(),this.ui.flash(),this.ui.toast(F("Робот дня собран!")+" "+sr(t)+" · +"+Ea);const n=this.work.robot;this.save.robots.length<this.save.slots&&!this.save.robots.some(s=>s.id===n.id)&&(n.done=!0,this.save.robots.push(n)),this.ui.text("coins",String(this.save.coins)),ji(),this.persist(),this.setPhase("daily")}async dailyDoubleAd(){if(!this.save.daily.done||this.save.dailyDoubled)return;if(!await cn()){this.ui.toast(F("Ролик не досмотрен — награды нет."));return}this.save.dailyDoubled=!0,this.save.coins+=Ea,this.audio.coin(),this.ui.text("coins",String(this.save.coins)),this.persist(),this.renderDaily()}frame(t){const e=Math.min(.05,t/1e3);switch(this.frames++,this.phase){case"work":this.updateWork(e);break;case"fight":this.arena&&(this.arena.update(e,this.stage.camera),this.stage.cueTarget.copy(this.arena.cue.target),this.stage.cuePull=this.arena.cue.pull);break}if(this.hubModel&&this.phase!=="work"&&this.phase!=="fight"){this.hubSpin+=e*.35,this.hubModel.group.rotation.y=this.hubSpin;const n=this.hubModel.data.done?0:1,s=this.assembling?1-Math.exp(-e*6):1-Math.exp(-e*3);this.hubExplode+=(n-this.hubExplode)*s;const r=this.hubExplode,a=this.hubModel;a.torso.position.y=r*.35;for(const o of[a.limbL,a.limbR]){const l=o.userData.base;o.position.set(l.x+Math.sign(l.x)*r*.5,l.y+r*.3,0)}for(const o of a.parts){const l=o.mesh.userData.base;o.state.role==="core"&&(o.mesh.position.y=l.y+r*.3),o.state.role==="joint"&&(o.mesh.position.y=l.y-r*.15),o.state.role!=="joint"&&(o.mesh.rotation.y+=e*r*.3)}}this.stage.flakes.update(e),this.stage.updateCamera(e),this.stage.render()}uiClick(t){return this.ui.click(t)}debugDump(){const t=this.currentPart();return{phase:this.phase,coins:this.save.coins,robots:this.save.robots.length,wins:this.save.wins,losses:this.save.losses,battles:this.save.battles,slots:this.save.slots,tools:this.save.tools,paints:this.save.paints,part:t?{role:t.state.role,arch:t.state.arch,clean:ls(t.geometry.geom),paint:nh(t.geometry.geom),vertices:t.geometry.vertexCount}:null,partIndex:this.work?.index??-1,champion:this.champion?.id??null,focus:this.focusRobot?{id:this.focusRobot.id,done:this.focusRobot.done,clean:Ta(this.focusRobot)}:null,fight:this.fight?{boss:this.fight.boss?.id??null,report:this.fight.report}:null,bin:this.save.bin.length,bossDue:this.save.bossDue,league:this.league(),chapter:this.save.chapter,chapterWins:this.save.chapterWins,seen:this.save.seen.length,counters:this.save.counters,storyOpen:this.storyOpen,arenaTime:this.arena?.time??0,daily:{day:this.save.daily.day,done:this.save.daily.done,best:this.save.daily.best}}}debugAllStrings(){return[...ko,...Object.values(Fi),...Object.values(Ca),...Object.values(Oi),...An.flatMap(t=>[t.name,t.hint]),...xs.flatMap(t=>[t.name,t.hint]),...Object.values(ti),...gr,...us.flatMap(t=>[t.name,t.hint]),...ux()]}debugStroke(t,e,n,s,r=20){if(!this.work)return;const a=this.currentPart();if(a){this.work.brush.begin();for(let o=0;o<=r;o++){const l=t+(n-t)*o/r,c=e+(s-e)*o/r,h=this.stage.ndc(l,c,this.tmpN);a.mesh.updateMatrixWorld(),this.work.brush.stroke(h,this.stage.camera,a.mesh,.02,1/60,this.strokeOut)}this.renderWorkHead()}}debugSetClean(t){const e=this.currentPart();if(!e)return;const n=e.geometry.geom.attributes.aClean;n.array.fill(t),n.needsUpdate=!0,this.syncPartState(),this.renderWorkHead()}debugPartScreen(){const t=this.currentPart();if(!t)return null;t.mesh.updateMatrixWorld();const e=t.geometry.geom.boundingSphere,n=e.center.clone().applyMatrix4(t.mesh.matrixWorld),s=n.clone().project(this.stage.camera),r=n.clone().add(new L(e.radius*t.mesh.scale.x,0,0)).project(this.stage.camera),a=window.innerWidth,o=window.innerHeight;return{x:(s.x+1)/2*a,y:(1-s.y)/2*o,r:Math.abs(r.x-s.x)/2*a}}debugSeedRobots(t,e){this.save.robots=t.map((n,s)=>{const r=ni(n,s+2);return r.done=e.done[s],r.parts.forEach((a,o)=>{a.clean=e.clean[s][o];const l=e.paint[s];l&&(a.paintId=l[0],a.paint=l[1])}),r}),this.save.arrived=t.length,this.save.champion=this.save.robots.find(n=>n.done)?.id??null,this.save.focus=this.save.robots[0].id,this.clearHubModel(),this.persist()}debugFocus(t){const e=this.save.robots[t];e&&(this.save.focus=e.id,this.clearHubModel())}debugBrushRing(t,e){const n=this.currentPart();if(!n||!this.work)return;const s=this.stage.ndc(t,e,this.tmpN),r=new Io;r.setFromCamera(s,this.stage.camera),n.mesh.updateMatrixWorld();const a=r.intersectObject(n.mesh,!1)[0];if(!a)return;n.material.rust.uBrushPos.value.copy(a.point.clone().applyMatrix4(n.mesh.matrixWorld.clone().invert())),n.material.rust.uBrushR.value=this.work.brush.tool.radius,this.brushOn=1,n.material.rust.uBrushOn.value=1;const o=(a.face?a.face.normal.clone():new L(0,1,0)).transformDirection(n.mesh.matrixWorld);o.y+=.6,this.flakeColor.set(9062938),this.stage.flakes.emit(a.point,o,14,this.flakeColor,{speed:1.1,spread:.8,life:.8,size:.035,gravity:2.5,jitter:.45})}debugStepToHit(t){if(!this.arena)return;let e=0;const n=this.hitCount;for(;this.hitCount===n&&e++<600;)this.frame(t);for(let s=0;s<3;s++)this.frame(t)}debugLoadSave(t){this.save=Object.assign(lr(),t),this.persist(),this.refreshMeta()}debugView(t){this.stage.setView(t)}debugGrant(t){this.save.coins+=t,this.ui.text("coins",String(this.save.coins)),this.persist()}debugPartState(){return this.work?this.work.robot.parts[this.work.index]:null}debugRng(t){return new mn(t).next()}debugFinishFight(){this.arena&&(this.arena.speed=40)}debugBin(){return this.save.bin}debugSetBossDue(t){this.save.bossDue=t,t&&this.save.chapter===0&&(this.save.chapter=1)}debugStory(t){return this.story(t)}debugSetChapter(t,e){this.save.chapter=t,this.save.chapterWins=e,this.checkProgress()}debugCounters(){return this.save.counters}}const mx=document.getElementById("game"),gx=Fu();async function _x(){await Promise.race([Bu(),new Promise(c=>setTimeout(c,4e3))]),await Vu(gx);let i;try{i=new px(mx)}catch(c){console.error("[boot] WebGL unavailable",c);const h=document.getElementById("boot-fail");h&&(h.hidden=!1),document.querySelector("#boot .dot")?.remove();return}const t=window.__platformLang;window.__platformLang=c=>{t?.(c),setTimeout(()=>i.refreshMeta(),700)},id(()=>i.phase==="work"||i.phase==="fight"),Ku(c=>{i.ui.blocked=c,document.body.classList.toggle("ad-busy",c),i.audio.adMute(c),Rh(!c&&(i.phase==="work"||i.phase==="fight")),Th(!c&&(i.phase==="pause"||i.phase==="collection"||i.phase==="shop"||i.phase==="result"))}),Xu(c=>i.audio.platformMute(c));const e=c=>{i.audio.setFocus(c),!c&&((i.phase==="work"||i.phase==="fight")&&!Yu()&&i.setPhase("pause"),i.persist())};Wu(e),document.addEventListener("visibilitychange",()=>e(!document.hidden));const n=window;n.__toggleLang=Hu,n.__lang=xr,n.__appFocus=e,n.__androidBack=()=>i.ui.blocked?!0:i.phase==="title"?!1:(i.phase==="fight"||i.uiClick("back")||i.uiClick("resume")||i.setPhase("hub"),!0);const s=/(?:^|[?&])debug(?:[=&]|$)/.test(location.search);s&&(n.__game=i,n.__ads={platform:()=>({platform:Go(),ready:bh()}),interstitial:()=>Ah(),rewarded:()=>cn(),seam:c=>ka(c),resetPacing:()=>rd()});let r=performance.now(),a=!1,o=!1;s&&(n.__stepMode=c=>{o=c},n.__step=c=>{i.frame(c)},n.__cinema=c=>{document.body.classList.toggle("cinema",c)});const l=c=>{if(!o)try{i.frame(c-r)}catch(h){console.error("[fatal]",h)}r=c,n.__frameCount=i.frames,!a&&i.frames>0&&(a=!0,document.getElementById("boot")?.remove(),document.getElementById("app").style.visibility="visible",sd()),requestAnimationFrame(l)};requestAnimationFrame(l)}_x();
