(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Uu=18e4;function Fu(i){const{offPlatform:t,sdkUrl:e,appFocus:n}=i,s=i.platformLang||function(){},r=i.bannerState||function(){},a=i.platformPause||function(){},o=i.platformMute||function(){},l=i.platformFlags||function(){};let c=null,h=!1,d=0;const u={};let f=null,m=!1;const y=()=>window.gdsdk||c;function g(M){const w=document.body;if(!M){w.classList.remove("has-banner"),w.style.removeProperty("--bnr");return}w.classList.add("has-banner"),w.style.setProperty("--bnr",Math.min(M,Math.round(innerHeight*.33))+"px")}function p(M){if(!M||M.layout_type!=="overlay")return g(0);const w=Math.round(innerHeight*.33);let S=+M.banner_height||0;S>w&&devicePixelRatio>1&&(S=Math.round(S/devicePixelRatio)),g(S)}function E(M){const w=document.getElementById(M);if(w)return w.style.display="",g(parseInt(w.style.height,10)||0),null;const S=innerHeight>560,I=S?90:50,B=S?728:320,X=document.createElement("div");return X.id=M,X.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:0;z-index:14;width:min("+B+"px,100vw);height:"+I+"px",document.body.appendChild(X),g(I),X}function A(M){const w=document.getElementById(M);w&&(w.style.display="none"),g(0)}function x(M){const w=document.getElementById(M);w&&w.remove(),g(0)}const R="vk.com";function T(){let M="";try{M=new URLSearchParams(location.search).get("vk_app_id")||""}catch{}M||(M=window.__VK_APP_ID||"");const w=String(M).replace(/\D/g,"");return w?"https://"+R+"/app"+w:location.origin+location.pathname}return{DRIVERS:{none:{banner:!1,init(){},ready(){},gameplay(){},interstitial(M){M(!1)},rewarded(M){M(!1)},showBanner(){}},yandex:{banner:!0,init(M){if(t())return;const w=window.__YA_SDK?window.__YA_SDK:new Promise((S,I)=>{const B=document.createElement("script");B.src=e(),B.onload=()=>{try{S(YaGames.init())}catch(X){I(X)}},B.onerror=I,document.head.appendChild(B)});Promise.resolve(w).then(S=>{c=S;try{const I=S.environment&&S.environment.i18n&&S.environment.i18n.lang;I&&s(String(I).slice(0,2).toLowerCase())}catch{}try{S.getFlags&&S.getFlags({defaultFlags:{}}).then(I=>{I&&typeof l=="function"&&l(I)}).catch(()=>{})}catch{}try{S.on&&S.on("game_api_pause",()=>a(!0)),S.on&&S.on("game_api_resume",()=>a(!1))}catch{}M(!!(S.adv&&S.adv.showBannerAdv))}).catch(()=>{})},ready(){try{c.features.LoadingAPI.ready()}catch{}},gameplay(M){try{M?c.features.GameplayAPI.start():c.features.GameplayAPI.stop()}catch{}},interstitial(M,w){try{c.adv.showFullscreenAdv({callbacks:{onOpen:w,onClose:S=>M(S!==!1),onError:()=>M(!1)}})}catch{M(!1)}},rewarded(M,w){let S=!1,I=!1;try{c.adv.showRewardedVideo({callbacks:{onOpen:()=>{I=!0,w&&w()},onRewarded:()=>{S=!0},onClose:()=>M(S,S?null:"closed"),onError:()=>M(S,I?"closed":"nofill")}})}catch{M(!1,"nofill")}},showBanner(M){try{M?Promise.resolve(c.adv.showBannerAdv()).then(w=>{w&&w.stickyAdvIsShowing===!1&&r(!1,w.reason||"fail")}).catch(()=>r(!1,"fail")):Promise.resolve(c.adv.hideBannerAdv()).catch(()=>{})}catch{r(!1,"fail")}},fullscreen(M){try{const w=c.screen&&c.screen.fullscreen;if(!w)return;M?w.request().catch(()=>{}):w.exit().catch(()=>{})}catch{}},askReview(){try{c.feedback.canReview().then(M=>{M&&M.value&&c.feedback.requestReview().catch(()=>{})}).catch(()=>{})}catch{}},addShortcut(){try{c.shortcut.canShowPrompt().then(M=>{M&&M.canShow&&c.shortcut.showPrompt().catch(()=>{})}).catch(()=>{})}catch{}},setScore(M,w){try{if(c.leaderboards&&c.leaderboards.setScore){c.leaderboards.setScore(M,w).catch(()=>{});return}c.getLeaderboards().then(S=>{S.setLeaderboardScore(M,w).catch(()=>{})}).catch(()=>{})}catch{}}},vkok:{banner:!0,waitShort:6e4,waitLong:1e5,init(M){const w=window.vkBridge;w&&w.send("VKWebAppInit").then(()=>{c=w;try{w.send("VKWebAppCheckNativeAds",{ad_format:"reward"}).then(S=>{h=!!(S&&S.result)}).catch(()=>{})}catch{}w.subscribe(S=>{const I=S&&S.detail&&S.detail.type;I==="VKWebAppViewHide"?n(!1):I==="VKWebAppViewRestore"?n(!0):I==="VKWebAppBannerAdClosedByUser"?(p(null),r(!1,"closed")):I==="VKWebAppBannerAdUpdated"&&p(S.detail.data)}),M(!0)}).catch(()=>{})},ready(){},gameplay(){},interstitial(M,w){try{c.send("VKWebAppCheckNativeAds",{ad_format:"interstitial"}).then(S=>!S||!S.result?M(!1):c.send("VKWebAppShowNativeAds",{ad_format:"interstitial"}).then(I=>{I&&I.result&&w(),M(!!(I&&I.result))})).catch(()=>M(!1))}catch{M(!1)}},rewarded(M){try{c.send("VKWebAppCheckNativeAds",{ad_format:"reward"}).then(w=>!w||!w.result?(h=!1,M(!1,"nofill")):c.send("VKWebAppShowNativeAds",{ad_format:"reward"}).then(S=>M(!!(S&&S.result),S&&S.result?null:"closed"))).catch(()=>M(!1,"nofill"))}catch{M(!1,"nofill")}},showBanner(M){try{M?c.send("VKWebAppShowBannerAd",{banner_location:"bottom",layout_type:"resize",height_type:"compact"}).then(w=>{if(!w||!w.result){r(!1,"fail");return}p(w)}).catch(()=>r(!1,"fail")):c.send("VKWebAppHideBannerAd").then(()=>{p(null)}).catch(()=>{})}catch{r(!1,"fail")}},share(M){return c.send("VKWebAppShowStoryBox",{background_type:"image",blob:M,attachment:{text:"play",type:"url",url:T()}}).then(()=>!0).catch(()=>!1)},recommend(){try{c.send("VKWebAppRecommend").catch(()=>{})}catch{}},invite(){try{c.send("VKWebAppShowInviteBox").catch(()=>{})}catch{}},haptic(M){try{M==="select"?c.send("VKWebAppTapticSelectionChanged").catch(()=>{}):c.send("VKWebAppTapticImpactOccurred",{style:M==="heavy"?"heavy":"light"}).catch(()=>{})}catch{}},addShortcut(){try{if(new URLSearchParams(location.search).get("vk_is_favorite")==="1")return;const w=(window.__SAVE_SCOPE||"")+"gk_vk_fav";if(sessionStorage.getItem(w))return;sessionStorage.setItem(w,"1"),c.send("VKWebAppAddToFavorites").catch(()=>{})}catch{}}},android:{banner:!1,init(M){if(window.AndroidAds){try{if(!window.AndroidAds.adsEnabled())return}catch{return}window.__adDone=(w,S)=>{const I=u[w];I&&(delete u[w],I.done(!!S,S?null:I.opened?"closed":"nofill"))},window.__adShown=w=>{const S=u[w];S&&(S.opened=!0,S.started&&S.started())},c=window.AndroidAds,M(!1)}},ready(){try{c.gameReady()}catch{}},gameplay(){},interstitial(M,w){try{const S=String(++d);u[S]={done:M,started:w,opened:!1},c.showInterstitial(S)}catch{M(!1)}},rewarded(M,w){try{const S=String(++d);u[S]={done:M,started:w,opened:!1},c.showRewarded(S)}catch{M(!1,"nofill")}},showBanner(){},askReview(){try{window.AndroidStore&&window.AndroidStore.askReview()}catch{}}},crazy:{banner:!0,mutesOnStart:!0,init(M){if(t())return;const w=document.createElement("script");w.src=e(),w.onload=()=>{try{window.CrazyGames.SDK.init().then(()=>{c=window.CrazyGames.SDK;try{const S=c.user&&c.user.systemInfo,I=S&&S.locale;I&&s(String(I).slice(0,2).toLowerCase())}catch{}try{const S=c.game&&c.game.settings;S&&(o(!!S.muteAudio),c.game.addSettingsChangeListener&&c.game.addSettingsChangeListener(I=>o(!!(I&&I.muteAudio))))}catch{}try{c.game.loadingStart()}catch{}M(!0)}).catch(()=>{})}catch{}},w.onerror=()=>{},document.head.appendChild(w)},ready(){try{c.game.loadingStop()}catch{}},gameplay(M){try{M?c.game.gameplayStart():c.game.gameplayStop()}catch{}},interstitial(M,w){let S=!1;const I=B=>{S||(S=!0,M(B))};try{c.ad.requestAd("midgame",{adStarted:w,adFinished:()=>I(!0),adError:()=>I(!1)})}catch{I(!1)}},rewarded(M,w){let S=!1,I=!1;const B=(X,U)=>{S||(S=!0,U==="nofill"?h=!1:X&&(h=!0),M(X,U))};try{c.ad.requestAd("rewarded",{adStarted:()=>{I=!0,w&&w()},adFinished:()=>B(!0),adError:()=>B(!1,I?"closed":"nofill")})}catch{B(!1,"nofill")}},showBanner(M){const w="cg-banner";if(!M)return A(w);try{if(!E(w))return;c.banner.requestResponsiveBanner([w]).catch(()=>{x(w),r(!1,"fail")})}catch{x(w),r(!1,"fail")}},delight(){try{c.game.happytime()}catch{}},reportProgress(M){try{c.game.reportGameCompletedPercentage(Math.max(0,Math.min(100,M|0)))}catch{}}},gamedist:{banner:!0,waitShort:45e3,waitLong:75e3,init(M){if(t())return;const w=window.GD_OPTIONS;if(!w||!w.gameId)return;let S=!1;const I=()=>{S||(S=!0,c=window.gdsdk||null,X(),M(!0))};w.onEvent=U=>{const G=U&&U.name;G==="SDK_READY"?I():G==="SDK_ERROR"?(h=!1,I()):G==="SDK_GAME_PAUSE"?(a(!0),n(!1),f&&f()):G==="SDK_GAME_START"?(a(!1),n(!0)):G==="SDK_REWARDED_WATCH_COMPLETE"&&(m=!0)};const B=document.createElement("script");B.src=e();const X=()=>{try{const U=y();if(!(U&&U.preloadAd))return;U.preloadAd("rewarded").then(()=>{h=!0}).catch(()=>{h=!1})}catch{}};B.onload=I,B.onerror=()=>{},document.head.appendChild(B)},ready(){},gameplay(){},interstitial(M,w){let S=!1;const I=B=>{S||(S=!0,f=null,M(B))};f=w;try{const B=y();if(!B)return I(!1);B.showAd().then(()=>I(!0)).catch(()=>I(!1))}catch{I(!1)}},rewarded(M,w){let S=!1,I=!1;const B=(X,U)=>{if(!S){S=!0,f=null,M(X,U);try{const G=y();G&&G.preloadAd&&G.preloadAd("rewarded").catch(()=>{})}catch{}}};f=()=>{I=!0,w&&w()},m=!1;try{const X=y();if(!X)return B(!1,"nofill");X.showAd("rewarded").then(()=>B(m,m?null:"closed")).catch(()=>B(!1,I?"closed":"nofill"))}catch{B(!1,"nofill")}},showBanner(M){const w="gd-banner";if(!M)return A(w);try{const S=y();if(!S||!S.showAd){r(!1,"fail");return}if(!E(w))return;Promise.resolve(S.showAd("display",{containerId:w})).catch(()=>{x(w),r(!1,"fail")})}catch{x(w),r(!1,"fail")}}}},state:{get sdk(){return c},get rewardWarm(){return h},reset(){c=null,h=!1,f=null,m=!1}}}}function Ou(){if(typeof window.__PLATFORM__=="string"&&window.__PLATFORM__)return window.__PLATFORM__;if(location.protocol==="file:")return"none";const i=location.hostname;return!i||/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(i),"none"}function _h(){return location.protocol==="file:"||!location.hostname||/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname)||/(^|\.)github\.io$/i.test(location.hostname)}const xh=i=>i+(typeof window<"u"&&window.__SAVE_SCOPE||""),Mh=()=>{try{return typeof localStorage<"u"?localStorage:null}catch{return null}},Bu=(i,t)=>{try{window.__cloudPut&&window.__cloudPut(i,t)}catch{}};function xr(i,t=null){const e=Mh();if(!e)return t;try{const n=e.getItem(xh(i));return n===null?t:JSON.parse(n)}catch{return t}}function Ia(i,t){const e=Mh(),n=JSON.stringify(t);try{e&&e.setItem(xh(i),n)}catch{}return Bu(i,n),t}function ku(){try{if(typeof window<"u"&&window.__PLATFORM_READY)return window.__PLATFORM_READY}catch{}return Promise.resolve(!1)}let ye={sourceLang:"ru",sourcePattern:/[А-Яа-яЁё]/,names:{ru:"Русский",en:"English"},dictUrl:i=>`assets/text/${i}.json`,defaultFor:(i,t)=>i==="crazy"||i==="gamedist"?t.en?"en":ye.sourceLang:i?ye.sourceLang:/^ru\b/i.test(navigator.language||"")?"ru":t.en?"en":ye.sourceLang,title:null,onChange:null},Gi={},ze=null,Hi=null;const Hr={};function Vl(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function N(i){if(typeof i!="string"||!i||(window.__trCollect&&((window.__trSeen||(window.__trSeen={}))[Vl(i)]=i),!Hi))return i;const t=Hi[Vl(i)];return t===void 0?i:t}let ur=0;async function Da(i,t=ur){if(i===ye.sourceLang)return Hi=null,!0;if(Hr[i])return Hi=Hr[i],!0;if(location.protocol==="file:")return!1;try{const e=await fetch(ye.dictUrl(i));if(!e.ok)throw new Error("HTTP "+e.status);const n=await e.json();return Hr[i]=n,t!==ur?null:(Hi=n,!0)}catch(e){return t!==ur?null:(console.warn(`[язык] словарь ${i} не загрузился, остаёмся на ${ye.sourceLang}:`,e.message),Hi=null,!1)}}function yh(){document.documentElement.lang=ze,ye.title&&(document.title=ye.title(N))}function Mr(i=document.body){const t={SCRIPT:1,STYLE:1,TEXTAREA:1},e=document.createTreeWalker(i,NodeFilter.SHOW_TEXT,{acceptNode:r=>t[r.parentNode&&r.parentNode.nodeName]?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),n=[];for(;e.nextNode();)n.push(e.currentNode);for(const r of n){const a=r.nodeValue,o=a.trim(),l=r.__src!==void 0?r.__src:o;if(!l||!ye.sourcePattern.test(l))continue;r.__src===void 0&&(r.__src=o);const c=N(r.__src);c!==o&&(r.nodeValue=o?a.replace(o,c):c)}const s=["title","placeholder","aria-label"];i.querySelectorAll?.("[title],[placeholder],[aria-label]").forEach(r=>{const a=r.__srcAttr||(r.__srcAttr={});for(const o of s){const l=r.getAttribute(o);l!==null&&(a[o]===void 0&&(a[o]=l),ye.sourcePattern.test(a[o])&&r.setAttribute(o,N(a[o])))}}),i.querySelectorAll?.("[data-tr-value]").forEach(r=>{r.__trValue!==void 0&&r.value!==r.__trValue||(r.__srcValue===void 0&&(r.__srcValue=r.value),r.value=r.__trValue=N(r.__srcValue))})}async function bh(i){if(!Gi[i]||i===ze)return ze;const t=ze;ze=i;const e=++ur,n=await Da(i,e);return n===null?ze:!n&&i!==ye.sourceLang?(ze=t,await Da(t,e),ze):(yh(),Mr(),ye.onChange?.(ze),ze)}const yr=()=>ze,zu=()=>({...Gi});async function Vu(i={}){ye={...ye,...i},Gi={[ye.sourceLang]:ye.names[ye.sourceLang]};for(const t of i.available||[])ye.names[t]&&(Gi[t]=ye.names[t]);return ze=i.saved&&Gi[i.saved]?i.saved:ye.defaultFor(i.platform||"",Gi),await Da(ze),yh(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>Mr(),{once:!0}):Mr(),ze}const Na="rl_lang";async function Gu(i){const t=Array.isArray(window.__LANGS)?window.__LANGS:[];return window.__platformLang=e=>{const n=(e||"").slice(0,2);xr(Na,null)||n!==yr()&&(n==="ru"||t.includes(n))&&bh(n)},Vu({available:t,saved:xr(Na,null)??Hu(t),platform:i,sourceLang:"ru",names:{ru:"Русский",en:"English"},title:e=>e("Свалка чемпионов"),onChange:null})}function Hu(i){const t=typeof window.__LANG_HINT=="string"?window.__LANG_HINT.slice(0,2):"";return t==="ru"?"ru":t&&i.includes(t)?t:null}async function Wu(){const i=Object.keys(zu());if(i.length<2)return yr()??"ru";const t=i.indexOf(yr()??"ru"),e=await bh(i[(t+1)%i.length]);return Ia(Na,e),e}const Sh=typeof window<"u"&&window.__PLATFORM__||"none",Ua=new Set,Xu=i=>(Ua.add(i),()=>Ua.delete(i)),Fa=new Set,qu=i=>(Fa.add(i),()=>Fa.delete(i)),{DRIVERS:Gl,state:Yu}=Fu({offPlatform:_h,sdkUrl:()=>window.__SDK_URL||"",appFocus:i=>{for(const t of Ua)try{t(i)}catch{}},platformLang:i=>{window.__LANG_HINT=i;try{window.__platformLang&&window.__platformLang(i)}catch{}},bannerState:(i,t)=>{Oa=!!i,!i&&(t==="closed"||++Ku>=3)&&(Ba=!0)},platformPause:i=>{Ln=!!i,za(),br(!i&&!!qo())},platformMute:i=>{for(const t of Fa)try{t(!!i)}catch{}}});let Ue=Gl[Sh]||Gl.none,_n=!1,wh=!1,Oa=!1,Ku=0,Ba=!1,Hl=!1,Eh=!1,Wl=null,Ln=!1;const ka=new Set,za=()=>{for(const i of ka)try{i(Ln)}catch{}},Zu=()=>Ln,Ju=i=>(ka.add(i),()=>ka.delete(i)),Va=()=>_n,Xo=()=>Sh,$u=()=>Yu.rewardWarm;let qo=()=>!0;function Qu(i){typeof i=="function"&&(qo=i)}function Th(i,t,e){return new Promise(n=>{let s=!1,r=setTimeout(()=>a(!1),t);function a(l){s||(s=!0,clearTimeout(r),Ln=!1,za(),br(!!qo()),n(l))}const o=()=>{clearTimeout(r),r=setTimeout(()=>a(!!e),Uu)};Ln=!0,za(),br(!1);try{i(a,o)}catch{a(!1)}})}function ju(){try{Ue.init(i=>{_n=!0,wh=!!i,Eh&&Ah()})}catch{}}function Ah(){if(Eh=!0,!(!_n||Hl)){Hl=!0;try{Ue.ready()}catch{}}}function br(i){if(Ln&&(i=!1),i!==Wl){Wl=i;try{Ue.gameplay(i)}catch{}}}function Rh(){return!_n||Ln?Promise.resolve(!1):Th((i,t)=>Ue.interstitial(i,t),Ue.waitShort||12e3,!0)}function td(){return _n?Ln?Promise.resolve(!1):Th((i,t)=>Ue.rewarded(i,t),Ue.waitLong||4e4,!1):Promise.resolve(!0)}function ns(){if(_n)try{Ue.delight&&Ue.delight()}catch{}}function ed(){if(_n)try{Ue.askReview&&Ue.askReview()}catch{}}function nd(){if(_n)try{Ue.addShortcut&&Ue.addShortcut()}catch{}}function Xl(i,t){if(_n)try{Ue.setScore&&Ue.setScore(i,t)}catch{}}function Ch(i){if(!(!_n||!wh||i===Oa)&&!(i&&Ba)&&!(Ln&&i)){Oa=i;try{Ue.showBanner(i)}catch{}}}const id=Xo()==="crazy"?185e3:15e4,sd=1;let Sr=0;function rd(i){Sr=Date.now(),Qu(i),ju()}const ad=Ah,Ph=br;function cn(){const i=Xo();return i==="none"||_h()||i==="android"?!0:i==="vkok"?Va()&&$u():Va()}function od(){Sr=0}async function Ga(i){return i<sd||Date.now()-Sr<id?!1:(Sr=Date.now(),Rh())}function hn(){return cn()?td():Promise.resolve(!1)}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yo="185",ld=0,ql=1,cd=2,dr=1,hd=2,fs=3,Jn=0,Ne=1,Tn=2,Cn=0,hi=1,Ha=2,Yl=3,Kl=4,ud=5,ai=100,dd=101,fd=102,pd=103,md=104,gd=200,vd=201,_d=202,xd=203,Wa=204,Xa=205,Md=206,yd=207,bd=208,Sd=209,wd=210,Ed=211,Td=212,Ad=213,Rd=214,qa=0,Ya=1,Ka=2,Yi=3,Za=4,Ja=5,$a=6,Qa=7,Ko=0,Cd=1,Pd=2,pn=0,Lh=1,Ih=2,Dh=3,Zo=4,Nh=5,Uh=6,Fh=7,Oh=300,di=301,Ki=302,Wr=303,Xr=304,Ur=306,ja=1e3,An=1001,to=1002,Ce=1003,Ld=1004,Is=1005,De=1006,qr=1007,li=1008,qe=1009,Bh=1010,kh=1011,ys=1012,Jo=1013,gn=1014,tn=1015,In=1016,$o=1017,Qo=1018,bs=1020,zh=35902,Vh=35899,Gh=1021,Hh=1022,en=1023,Dn=1026,ci=1027,jo=1028,tl=1029,fi=1030,el=1031,nl=1033,fr=33776,pr=33777,mr=33778,gr=33779,eo=35840,no=35841,io=35842,so=35843,ro=36196,ao=37492,oo=37496,lo=37488,co=37489,wr=37490,ho=37491,uo=37808,fo=37809,po=37810,mo=37811,go=37812,vo=37813,_o=37814,xo=37815,Mo=37816,yo=37817,bo=37818,So=37819,wo=37820,Eo=37821,To=36492,Ao=36494,Ro=36495,Co=36283,Po=36284,Er=36285,Lo=36286,Id=3200,Tr=0,Dd=1,Kn="",We="srgb",Ar="srgb-linear",Rr="linear",re="srgb",Si=7680,Zl=519,Nd=512,Ud=513,Fd=514,il=515,Od=516,Bd=517,sl=518,kd=519,Jl=35044,$l="300 es",fn=2e3,Ss=2001;function zd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Vd(){const i=Cr("canvas");return i.style.display="block",i}const Ql={};function jl(...i){const t="THREE."+i.shift();console.log(t,...i)}function Wh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Vt(...i){i=Wh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function jt(...i){i=Wh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Xi(...i){const t=i.join(" ");t in Ql||(Ql[t]=!0,Vt(...i))}function Gd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Hd={[qa]:Ya,[Ka]:$a,[Za]:Qa,[Yi]:Ja,[Ya]:qa,[$a]:Ka,[Qa]:Za,[Ja]:Yi};class gi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tc=1234567;const gs=Math.PI/180,ws=180/Math.PI;function vi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function rl(i,t){return(i%t+t)%t}function Wd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Xd(i,t,e){return i!==t?(e-i)/(t-i):0}function vs(i,t,e){return(1-e)*i+e*t}function qd(i,t,e,n){return vs(i,t,1-Math.exp(-e*n))}function Yd(i,t=1){return t-Math.abs(rl(i,t*2)-t)}function Kd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Zd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Jd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function $d(i,t){return i+Math.random()*(t-i)}function Qd(i){return i*(.5-Math.random())}function jd(i){i!==void 0&&(tc=i);let t=tc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function tf(i){return i*gs}function ef(i){return i*ws}function nf(i){return(i&i-1)===0&&i!==0}function sf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function rf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function af(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*h,o*c);break;default:Vt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Vi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Fe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const of={DEG2RAD:gs,RAD2DEG:ws,generateUUID:vi,clamp:$t,euclideanModulo:rl,mapLinear:Wd,inverseLerp:Xd,lerp:vs,damp:qd,pingpong:Yd,smoothstep:Kd,smootherstep:Zd,randInt:Jd,randFloat:$d,randFloatSpread:Qd,seededRandom:jd,degToRad:tf,radToDeg:ef,isPowerOfTwo:nf,ceilPowerOfTwo:sf,floorPowerOfTwo:rf,setQuaternionFromProperEuler:af,normalize:Fe,denormalize:Vi},Tl=class Tl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Tl.prototype.isVector2=!0;let rt=Tl;class $n{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],m=r[a+2],y=r[a+3];if(d!==y||l!==u||c!==f||h!==m){let g=l*u+c*f+h*m+d*y;g<0&&(u=-u,f=-f,m=-m,y=-y,g=-g);let p=1-o;if(g<.9995){const E=Math.acos(g),A=Math.sin(E);p=Math.sin(p*E)/A,o=Math.sin(o*E)/A,l=l*p+u*o,c=c*p+f*o,h=h*p+m*o,d=d*p+y*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+m*o,d=d*p+y*o;const E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+h*d+l*f-c*u,t[e+1]=l*m+h*u+c*d-o*f,t[e+2]=c*m+h*f+o*u-l*d,t[e+3]=h*m-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Al=class Al{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ec.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ec.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Yr.copy(this).projectOnVector(t),this.sub(Yr)}reflect(t){return this.sub(Yr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Al.prototype.isVector3=!0;let L=Al;const Yr=new L,ec=new $n,Rl=class Rl{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],E=s[1],A=s[4],x=s[7],R=s[2],T=s[5],P=s[8];return r[0]=a*y+o*E+l*R,r[3]=a*g+o*A+l*T,r[6]=a*p+o*x+l*P,r[1]=c*y+h*E+d*R,r[4]=c*g+h*A+d*T,r[7]=c*p+h*x+d*P,r[2]=u*y+f*E+m*R,r[5]=u*g+f*A+m*T,r[8]=u*p+f*x+m*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=e*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/m;return t[0]=d*y,t[1]=(s*c-h*n)*y,t[2]=(o*n-s*a)*y,t[3]=u*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Xi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Kr.makeScale(t,e)),this}rotate(t){return Xi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Kr.makeRotation(-t)),this}translate(t,e){return Xi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Rl.prototype.isMatrix3=!0;let Xt=Rl;const Kr=new Xt,nc=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ic=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lf(){const i={enabled:!0,workingColorSpace:Ar,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===re&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===re&&(s.r=qi(s.r),s.g=qi(s.g),s.b=qi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Kn?Rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ar]:{primaries:t,whitePoint:n,transfer:Rr,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:n,transfer:re,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),i}const te=lf();function Pn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let wi;class cf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{wi===void 0&&(wi=Cr("canvas")),wi.width=t.width,wi.height=t.height;const s=wi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=wi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Cr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pn(e[n]/255)*255):e[n]=Pn(e[n]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let hf=0;class al{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=vi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Zr(s[a].image)):r.push(Zr(s[a]))}else r=Zr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?cf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}let uf=0;const Jr=new L;class Be extends gi{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=An,s=An,r=De,a=li,o=en,l=qe,c=Be.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=vi(),this.name="",this.source=new al(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jr).x}get height(){return this.source.getSize(Jr).y}get depth(){return this.source.getSize(Jr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Oh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ja:t.x=t.x-Math.floor(t.x);break;case An:t.x=t.x<0?0:1;break;case to:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ja:t.y=t.y-Math.floor(t.y);break;case An:t.y=t.y<0?0:1;break;case to:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=Oh;Be.DEFAULT_ANISOTROPY=1;const Cl=class Cl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(c+1)/2,x=(f+1)/2,R=(p+1)/2,T=(h+u)/4,P=(d+y)/4,_=(m+g)/4;return A>x&&A>R?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=T/n,r=P/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=_/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=P/r,s=_/r),this.set(n,s,r,e),this}let E=Math.sqrt((g-m)*(g-m)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(d-y)/E,this.z=(u-h)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Cl.prototype.isVector4=!0;let fe=Cl;class df extends gi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new Be(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new al(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mn extends df{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Xh extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ff extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Nr=class Nr{constructor(t,e,n,s,r,a,o,l,c,h,d,u,f,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,f,m,y,g)}set(t,e,n,s,r,a,o,l,c,h,d,u,f,m,y,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Nr().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Ei.setFromMatrixColumn(t,0).length(),r=1/Ei.setFromMatrixColumn(t,1).length(),a=1/Ei.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,m=o*h,y=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=u-y*c,e[9]=-o*l,e[2]=y-u*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,m=c*h,y=c*d;e[0]=u+y*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=y+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,m=c*h,y=c*d;e[0]=u-y*o,e[4]=-a*d,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=y-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,m=o*h,y=o*d;e[0]=l*h,e[4]=m*c-f,e[8]=u*c+y,e[1]=l*d,e[5]=y*c+u,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,m=o*l,y=o*c;e[0]=l*h,e[4]=y-u*d,e[8]=m*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+m,e[10]=u-y*d}else if(t.order==="XZY"){const u=a*l,f=a*c,m=o*l,y=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+y,e[5]=a*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=o*h,e[10]=y*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pf,t,mf)}lookAt(t,e,n){const s=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),Bn.crossVectors(n,Ge),Bn.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),Bn.crossVectors(n,Ge)),Bn.normalize(),Ds.crossVectors(Ge,Bn),s[0]=Bn.x,s[4]=Ds.x,s[8]=Ge.x,s[1]=Bn.y,s[5]=Ds.y,s[9]=Ge.y,s[2]=Bn.z,s[6]=Ds.z,s[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],E=n[3],A=n[7],x=n[11],R=n[15],T=s[0],P=s[4],_=s[8],M=s[12],w=s[1],S=s[5],I=s[9],B=s[13],X=s[2],U=s[6],G=s[10],z=s[14],J=s[3],it=s[7],ht=s[11],ct=s[15];return r[0]=a*T+o*w+l*X+c*J,r[4]=a*P+o*S+l*U+c*it,r[8]=a*_+o*I+l*G+c*ht,r[12]=a*M+o*B+l*z+c*ct,r[1]=h*T+d*w+u*X+f*J,r[5]=h*P+d*S+u*U+f*it,r[9]=h*_+d*I+u*G+f*ht,r[13]=h*M+d*B+u*z+f*ct,r[2]=m*T+y*w+g*X+p*J,r[6]=m*P+y*S+g*U+p*it,r[10]=m*_+y*I+g*G+p*ht,r[14]=m*M+y*B+g*z+p*ct,r[3]=E*T+A*w+x*X+R*J,r[7]=E*P+A*S+x*U+R*it,r[11]=E*_+A*I+x*G+R*ht,r[15]=E*M+A*B+x*z+R*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],y=t[7],g=t[11],p=t[15],E=l*f-c*u,A=o*f-c*d,x=o*u-l*d,R=a*f-c*h,T=a*u-l*h,P=a*d-o*h;return e*(y*E-g*A+p*x)-n*(m*E-g*R+p*T)+s*(m*A-y*R+p*P)-r*(m*x-y*T+g*P)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],y=t[13],g=t[14],p=t[15],E=e*o-n*a,A=e*l-s*a,x=e*c-r*a,R=n*l-s*o,T=n*c-r*o,P=s*c-r*l,_=h*y-d*m,M=h*g-u*m,w=h*p-f*m,S=d*g-u*y,I=d*p-f*y,B=u*p-f*g,X=E*B-A*I+x*S+R*w-T*M+P*_;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/X;return t[0]=(o*B-l*I+c*S)*U,t[1]=(s*I-n*B-r*S)*U,t[2]=(y*P-g*T+p*R)*U,t[3]=(u*T-d*P-f*R)*U,t[4]=(l*w-a*B-c*M)*U,t[5]=(e*B-s*w+r*M)*U,t[6]=(g*x-m*P-p*A)*U,t[7]=(h*P-u*x+f*A)*U,t[8]=(a*I-o*w+c*_)*U,t[9]=(n*w-e*I-r*_)*U,t[10]=(m*T-y*x+p*E)*U,t[11]=(d*x-h*T-f*E)*U,t[12]=(o*M-a*S-l*_)*U,t[13]=(e*S-n*M+s*_)*U,t[14]=(y*A-m*R-g*E)*U,t[15]=(h*R-d*A+u*E)*U,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,y=a*h,g=a*d,p=o*d,E=l*c,A=l*h,x=l*d,R=n.x,T=n.y,P=n.z;return s[0]=(1-(y+p))*R,s[1]=(f+x)*R,s[2]=(m-A)*R,s[3]=0,s[4]=(f-x)*T,s[5]=(1-(u+p))*T,s[6]=(g+E)*T,s[7]=0,s[8]=(m+A)*P,s[9]=(g-E)*P,s[10]=(1-(u+y))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ei.set(s[0],s[1],s[2]).length();const o=Ei.set(s[4],s[5],s[6]).length(),l=Ei.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Je.copy(this);const c=1/a,h=1/o,d=1/l;return Je.elements[0]*=c,Je.elements[1]*=c,Je.elements[2]*=c,Je.elements[4]*=h,Je.elements[5]*=h,Je.elements[6]*=h,Je.elements[8]*=d,Je.elements[9]*=d,Je.elements[10]*=d,e.setFromRotationMatrix(Je),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=fn,l=!1){const c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let m,y;if(l)m=r/(a-r),y=a*r/(a-r);else if(o===fn)m=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Ss)m=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=fn,l=!1){const c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,y;if(l)m=1/(a-r),y=a/(a-r);else if(o===fn)m=-2/(a-r),y=-(a+r)/(a-r);else if(o===Ss)m=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Nr.prototype.isMatrix4=!0;let ne=Nr;const Ei=new L,Je=new ne,pf=new L(0,0,0),mf=new L(1,1,1),Bn=new L,Ds=new L,Ge=new L,sc=new ne,rc=new $n;class Me{constructor(t=0,e=0,n=0,s=Me.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin($t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-$t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return sc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rc.setFromEuler(this),this.setFromQuaternion(rc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Me.DEFAULT_ORDER="XYZ";class ol{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let gf=0;const ac=new L,Ti=new $n,Mn=new ne,Ns=new L,is=new L,vf=new L,_f=new $n,oc=new L(1,0,0),lc=new L(0,1,0),cc=new L(0,0,1),hc={type:"added"},xf={type:"removed"},Ai={type:"childadded",child:null},$r={type:"childremoved",child:null};class Ee extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ee.DEFAULT_UP.clone();const t=new L,e=new Me,n=new $n,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new Xt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=Ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ol,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ti.setFromAxisAngle(t,e),this.quaternion.multiply(Ti),this}rotateOnWorldAxis(t,e){return Ti.setFromAxisAngle(t,e),this.quaternion.premultiply(Ti),this}rotateX(t){return this.rotateOnAxis(oc,t)}rotateY(t){return this.rotateOnAxis(lc,t)}rotateZ(t){return this.rotateOnAxis(cc,t)}translateOnAxis(t,e){return ac.copy(t).applyQuaternion(this.quaternion),this.position.add(ac.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oc,t)}translateY(t){return this.translateOnAxis(lc,t)}translateZ(t){return this.translateOnAxis(cc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ns.copy(t):Ns.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(is,Ns,this.up):Mn.lookAt(Ns,is,this.up),this.quaternion.setFromRotationMatrix(Mn),s&&(Mn.extractRotation(s.matrixWorld),Ti.setFromRotationMatrix(Mn),this.quaternion.premultiply(Ti.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(hc),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xf),$r.child=t,this.dispatchEvent($r),$r.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Mn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Mn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(hc),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,t,vf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,_f,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ee.DEFAULT_UP=new L(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class nn extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mf={type:"move"};class Qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const y of t.hand.values()){const g=e.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new nn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const qh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},Us={h:0,s:0,l:0};function jr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=rl(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=jr(a,r,t+1/3),this.g=jr(a,r,t),this.b=jr(a,r,t-1/3)}return te.colorSpaceToWorking(this,s),this}setStyle(t,e=We){function n(r){r!==void 0&&parseFloat(r)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){const n=qh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pn(t.r),this.g=Pn(t.g),this.b=Pn(t.b),this}copyLinearToSRGB(t){return this.r=qi(t.r),this.g=qi(t.g),this.b=qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return te.workingToColorSpace(Ie.copy(this),t),Math.round($t(Ie.r*255,0,255))*65536+Math.round($t(Ie.g*255,0,255))*256+Math.round($t(Ie.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(Ie.copy(this),e);const n=Ie.r,s=Ie.g,r=Ie.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=We){te.workingToColorSpace(Ie.copy(this),t);const e=Ie.r,n=Ie.g,s=Ie.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(kn),this.setHSL(kn.h+t,kn.s+e,kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(kn),t.getHSL(Us);const n=vs(kn.h,Us.h,e),s=vs(kn.s,Us.s,e),r=vs(kn.l,Us.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new Dt;Dt.NAMES=qh;class Yh extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Me,this.environmentIntensity=1,this.environmentRotation=new Me,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const $e=new L,yn=new L,ta=new L,bn=new L,Ri=new L,Ci=new L,uc=new L,ea=new L,na=new L,ia=new L,sa=new fe,ra=new fe,aa=new fe;class je{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),$e.subVectors(t,e),s.cross($e);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){$e.subVectors(s,e),yn.subVectors(n,e),ta.subVectors(t,e);const a=$e.dot($e),o=$e.dot(yn),l=$e.dot(ta),c=yn.dot(yn),h=yn.dot(ta),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,bn.x),l.addScaledVector(a,bn.y),l.addScaledVector(o,bn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return sa.setScalar(0),ra.setScalar(0),aa.setScalar(0),sa.fromBufferAttribute(t,e),ra.fromBufferAttribute(t,n),aa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(sa,r.x),a.addScaledVector(ra,r.y),a.addScaledVector(aa,r.z),a}static isFrontFacing(t,e,n,s){return $e.subVectors(n,e),yn.subVectors(t,e),$e.cross(yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $e.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),$e.cross(yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return je.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ri.subVectors(s,n),Ci.subVectors(r,n),ea.subVectors(t,n);const l=Ri.dot(ea),c=Ci.dot(ea);if(l<=0&&c<=0)return e.copy(n);na.subVectors(t,s);const h=Ri.dot(na),d=Ci.dot(na);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ri,a);ia.subVectors(t,r);const f=Ri.dot(ia),m=Ci.dot(ia);if(m>=0&&f<=m)return e.copy(r);const y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Ci,o);const g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return uc.subVectors(r,s),o=(d-h)/(d-h+(f-m)),e.copy(s).addScaledVector(uc,o);const p=1/(g+y+u);return a=y*p,o=u*p,e.copy(n).addScaledVector(Ri,a).addScaledVector(Ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class _i{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Qe):Qe.fromBufferAttribute(r,a),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Fs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fs.copy(n.boundingBox)),Fs.applyMatrix4(t.matrixWorld),this.union(Fs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),Os.subVectors(this.max,ss),Pi.subVectors(t.a,ss),Li.subVectors(t.b,ss),Ii.subVectors(t.c,ss),zn.subVectors(Li,Pi),Vn.subVectors(Ii,Li),jn.subVectors(Pi,Ii);let e=[0,-zn.z,zn.y,0,-Vn.z,Vn.y,0,-jn.z,jn.y,zn.z,0,-zn.x,Vn.z,0,-Vn.x,jn.z,0,-jn.x,-zn.y,zn.x,0,-Vn.y,Vn.x,0,-jn.y,jn.x,0];return!oa(e,Pi,Li,Ii,Os)||(e=[1,0,0,0,1,0,0,0,1],!oa(e,Pi,Li,Ii,Os))?!1:(Bs.crossVectors(zn,Vn),e=[Bs.x,Bs.y,Bs.z],oa(e,Pi,Li,Ii,Os))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Sn=[new L,new L,new L,new L,new L,new L,new L,new L],Qe=new L,Fs=new _i,Pi=new L,Li=new L,Ii=new L,zn=new L,Vn=new L,jn=new L,ss=new L,Os=new L,Bs=new L,ti=new L;function oa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ti.fromArray(i,r);const o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),l=t.dot(ti),c=e.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const xe=new L,ks=new rt;let yf=0;class we extends gi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Jl,this.updateRanges=[],this.gpuType=tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ks.fromBufferAttribute(this,e),ks.applyMatrix3(t),this.setXY(e,ks.x,ks.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Vi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Vi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Vi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Vi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Vi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array),r=Fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Jl&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Kh extends we{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Zh extends we{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ee extends we{constructor(t,e,n){super(new Float32Array(t),e,n)}}const bf=new _i,rs=new L,la=new L;class ts{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):bf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rs.subVectors(t,this.center);const e=rs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(la.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rs.copy(t.center).add(la)),this.expandByPoint(rs.copy(t.center).sub(la))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Sf=0;const Ze=new ne,ca=new Ee,Di=new L,He=new _i,as=new _i,Re=new L;class be extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zd(t)?Zh:Kh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return ca.lookAt(t),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ee(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];He.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,He.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,He.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(He.min),this.boundingBox.expandByPoint(He.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ts);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(He.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];as.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(He.min,as.min),He.expandByPoint(Re),Re.addVectors(He.max,as.max),He.expandByPoint(Re)):(He.expandByPoint(as.min),He.expandByPoint(as.max))}He.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Re));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Re.fromBufferAttribute(o,c),l&&(Di.fromBufferAttribute(t,c),Re.add(Di)),s=Math.max(s,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new we(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new L,l[_]=new L;const c=new L,h=new L,d=new L,u=new rt,f=new rt,m=new rt,y=new L,g=new L;function p(_,M,w){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,w),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,M),m.fromBufferAttribute(r,w),h.sub(c),d.sub(c),f.sub(u),m.sub(u);const S=1/(f.x*m.y-m.x*f.y);isFinite(S)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(S),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(S),o[_].add(y),o[M].add(y),o[w].add(y),l[_].add(g),l[M].add(g),l[w].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let _=0,M=E.length;_<M;++_){const w=E[_],S=w.start,I=w.count;for(let B=S,X=S+I;B<X;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const A=new L,x=new L,R=new L,T=new L;function P(_){R.fromBufferAttribute(s,_),T.copy(R);const M=o[_];A.copy(M),A.sub(R.multiplyScalar(R.dot(M))).normalize(),x.crossVectors(T,M);const S=x.dot(l[_])<0?-1:1;a.setXYZW(_,A.x,A.y,A.z,S)}for(let _=0,M=E.length;_<M;++_){const w=E[_],S=w.start,I=w.count;for(let B=S,X=S+I;B<X;B+=3)P(t.getX(B+0)),P(t.getX(B+1)),P(t.getX(B+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new we(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,f=t.count;u<f;u+=3){const m=t.getX(u+0),y=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,m=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new we(u,h,d)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new be,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let wf=0;class xi extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=hi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=Xa,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=Yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Xa&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Dt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new rt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new rt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const wn=new L,ha=new L,zs=new L,Gn=new L,ua=new L,Vs=new L,da=new L;class ll{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(wn.copy(this.origin).addScaledVector(this.direction,e),wn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ha.copy(t).add(e).multiplyScalar(.5),zs.copy(e).sub(t).normalize(),Gn.copy(this.origin).sub(ha);const r=t.distanceTo(e)*.5,a=-this.direction.dot(zs),o=Gn.dot(this.direction),l=-Gn.dot(zs),c=Gn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){const y=1/h;d*=y,u*=y,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ha).addScaledVector(zs,u),f}intersectSphere(t,e){wn.subVectors(t.center,this.origin);const n=wn.dot(this.direction),s=wn.dot(wn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,wn)!==null}intersectTriangle(t,e,n,s,r){ua.subVectors(e,t),Vs.subVectors(n,t),da.crossVectors(ua,Vs);let a=this.direction.dot(da),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Gn.subVectors(this.origin,t);const l=o*this.direction.dot(Vs.crossVectors(Gn,Vs));if(l<0)return null;const c=o*this.direction.dot(ua.cross(Gn));if(c<0||l+c>a)return null;const h=-o*Gn.dot(da);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class cl extends xi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Me,this.combine=Ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const dc=new ne,ei=new ll,Gs=new ts,fc=new L,Hs=new L,Ws=new L,Xs=new L,fa=new L,qs=new L,pc=new L,Ys=new L;class de extends Ee{constructor(t=new be,e=new cl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(fa.fromBufferAttribute(d,t),a?qs.addScaledVector(fa,h):qs.addScaledVector(fa.sub(e),h))}e.add(qs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(r),ei.copy(t.ray).recast(t.near),!(Gs.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Gs,fc)===null||ei.origin.distanceToSquared(fc)>(t.far-t.near)**2))&&(dc.copy(r).invert(),ei.copy(t.ray).applyMatrix4(dc),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){const g=u[m],p=a[g.materialIndex],E=Math.max(g.start,f.start),A=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=E,R=A;x<R;x+=3){const T=o.getX(x),P=o.getX(x+1),_=o.getX(x+2);s=Ks(this,p,t,n,c,h,d,T,P,_),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){const E=o.getX(g),A=o.getX(g+1),x=o.getX(g+2);s=Ks(this,a,t,n,c,h,d,E,A,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){const g=u[m],p=a[g.materialIndex],E=Math.max(g.start,f.start),A=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=E,R=A;x<R;x+=3){const T=x,P=x+1,_=x+2;s=Ks(this,p,t,n,c,h,d,T,P,_),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){const E=g,A=g+1,x=g+2;s=Ks(this,a,t,n,c,h,d,E,A,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Ef(i,t,e,n,s,r,a,o){let l;if(t.side===Ne?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Jn,o),l===null)return null;Ys.copy(o),Ys.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ys);return c<e.near||c>e.far?null:{distance:c,point:Ys.clone(),object:i}}function Ks(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Hs),i.getVertexPosition(l,Ws),i.getVertexPosition(c,Xs);const h=Ef(i,t,e,n,Hs,Ws,Xs,pc);if(h){const d=new L;je.getBarycoord(pc,Hs,Ws,Xs,d),s&&(h.uv=je.getInterpolatedAttribute(s,o,l,c,d,new rt)),r&&(h.uv1=je.getInterpolatedAttribute(r,o,l,c,d,new rt)),a&&(h.normal=je.getInterpolatedAttribute(a,o,l,c,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new L,materialIndex:0};je.getNormal(Hs,Ws,Xs,u.normal),h.face=u,h.barycoord=d}return h}class Jh extends Be{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ce,h=Ce,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mc extends we{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ni=new ne,gc=new ne,Zs=[],vc=new _i,Tf=new ne,os=new de,ls=new ts;class Af extends de{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new mc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Tf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new _i),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ni),vc.copy(t.boundingBox).applyMatrix4(Ni),this.boundingBox.union(vc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ts),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ni),ls.copy(t.boundingSphere).applyMatrix4(Ni),this.boundingSphere.union(ls)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(os.geometry=this.geometry,os.material=this.material,os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ls.copy(this.boundingSphere),ls.applyMatrix4(n),t.ray.intersectsSphere(ls)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ni),gc.multiplyMatrices(n,Ni),os.matrixWorld=gc,os.raycast(t,Zs);for(let a=0,o=Zs.length;a<o;a++){const l=Zs[a];l.instanceId=r,l.object=this,e.push(l)}Zs.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new mc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Jh(new Float32Array(s*this.count),s,this.count,jo,tn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const pa=new L,Rf=new L,Cf=new Xt;class si{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=pa.subVectors(n,e).cross(Rf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(pa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Cf.getNormalMatrix(t),s=this.coplanarPoint(pa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new ts,Pf=new rt(.5,.5),Js=new L;class hl{constructor(t=new si,e=new si,n=new si,s=new si,r=new si,a=new si){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=fn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],y=r[9],g=r[10],p=r[11],E=r[12],A=r[13],x=r[14],R=r[15];if(s[0].setComponents(c-a,f-h,p-m,R-E).normalize(),s[1].setComponents(c+a,f+h,p+m,R+E).normalize(),s[2].setComponents(c+o,f+d,p+y,R+A).normalize(),s[3].setComponents(c-o,f-d,p-y,R-A).normalize(),n)s[4].setComponents(l,u,g,x).normalize(),s[5].setComponents(c-l,f-u,p-g,R-x).normalize();else if(s[4].setComponents(c-l,f-u,p-g,R-x).normalize(),e===fn)s[5].setComponents(c+l,f+u,p+g,R+x).normalize();else if(e===Ss)s[5].setComponents(l,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){ni.center.set(0,0,0);const e=Pf.distanceTo(t.center);return ni.radius=.7071067811865476+e,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Js.x=s.normal.x>0?t.max.x:t.min.x,Js.y=s.normal.y>0?t.max.y:t.min.y,Js.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Js)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Lf extends xi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const _c=new ne,Io=new ll,$s=new ts,Qs=new L;class If extends Ee{constructor(t=new be,e=new Lf){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(s),$s.radius+=r,t.ray.intersectsSphere($s)===!1)return;_c.copy(s).invert(),Io.copy(t.ray).applyMatrix4(_c);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,y=f;m<y;m++){const g=c.getX(m);Qs.fromBufferAttribute(d,g),xc(Qs,g,l,s,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,y=f;m<y;m++)Qs.fromBufferAttribute(d,m),xc(Qs,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function xc(i,t,e,n,s,r,a){const o=Io.distanceSqToPoint(i);if(o<e){const l=new L;Io.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class $h extends Be{constructor(t=[],e=di,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zi extends Be{constructor(t,e,n=gn,s,r,a,o=Ce,l=Ce,c,h=Dn,d=1){if(h!==Dn&&h!==ci)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new al(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Df extends Zi{constructor(t,e=gn,n=di,s,r,a=Ce,o=Ce,l,c=Dn){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Qh extends Be{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Mi extends be{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(d,2));function m(y,g,p,E,A,x,R,T,P,_,M){const w=x/P,S=R/_,I=x/2,B=R/2,X=T/2,U=P+1,G=_+1;let z=0,J=0;const it=new L;for(let ht=0;ht<G;ht++){const ct=ht*S-B;for(let xt=0;xt<U;xt++){const Ht=xt*w-I;it[y]=Ht*E,it[g]=ct*A,it[p]=X,c.push(it.x,it.y,it.z),it[y]=0,it[g]=0,it[p]=T>0?1:-1,h.push(it.x,it.y,it.z),d.push(xt/P),d.push(1-ht/_),z+=1}}for(let ht=0;ht<_;ht++)for(let ct=0;ct<P;ct++){const xt=u+ct+U*ht,Ht=u+ct+U*(ht+1),ie=u+(ct+1)+U*(ht+1),Kt=u+(ct+1)+U*ht;l.push(xt,Ht,Kt),l.push(Ht,ie,Kt),J+=6}o.addGroup(f,J,M),f+=J,u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ul extends be{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new L,h=new rt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(o,3)),this.setAttribute("uv",new ee(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ul(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class dl extends be{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let m=0;const y=[],g=n/2;let p=0;E(),a===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new ee(d,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2));function E(){const x=new L,R=new L;let T=0;const P=(e-t)/n;for(let _=0;_<=r;_++){const M=[],w=_/r,S=w*(e-t)+t;for(let I=0;I<=s;I++){const B=I/s,X=B*l+o,U=Math.sin(X),G=Math.cos(X);R.x=S*U,R.y=-w*n+g,R.z=S*G,d.push(R.x,R.y,R.z),x.set(U,P,G).normalize(),u.push(x.x,x.y,x.z),f.push(B,1-w),M.push(m++)}y.push(M)}for(let _=0;_<s;_++)for(let M=0;M<r;M++){const w=y[M][_],S=y[M+1][_],I=y[M+1][_+1],B=y[M][_+1];(t>0||M!==0)&&(h.push(w,S,B),T+=3),(e>0||M!==r-1)&&(h.push(S,I,B),T+=3)}c.addGroup(p,T,0),p+=T}function A(x){const R=m,T=new rt,P=new L;let _=0;const M=x===!0?t:e,w=x===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,g*w,0),u.push(0,w,0),f.push(.5,.5),m++;const S=m;for(let I=0;I<=s;I++){const X=I/s*l+o,U=Math.cos(X),G=Math.sin(X);P.x=M*G,P.y=g*w,P.z=M*U,d.push(P.x,P.y,P.z),u.push(0,w,0),T.x=U*.5+.5,T.y=G*.5*w+.5,f.push(T.x,T.y),m++}for(let I=0;I<s;I++){const B=R+I,X=S+I;x===!0?h.push(X,X+1,B):h.push(X+1,X,B),_+=3}c.addGroup(p,_,x===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Vt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new rt:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],a=[],o=new L,l=new ne;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos($t(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos($t(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class fl extends xn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new rt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Nf extends fl{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function pl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Mc=new L,yc=new L,ma=new pl,ga=new pl,va=new pl;class Uf extends xn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(yc.subVectors(s[0],s[1]).add(s[0]),c=yc);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Mc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Mc),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),ma.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,y,g),ga.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,y,g),va.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(ma.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),ga.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),va.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(ma.calc(l),ga.calc(l),va.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function bc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Ff(i,t){const e=1-i;return e*e*t}function Of(i,t){return 2*(1-i)*i*t}function Bf(i,t){return i*i*t}function _s(i,t,e,n){return Ff(i,t)+Of(i,e)+Bf(i,n)}function kf(i,t){const e=1-i;return e*e*e*t}function zf(i,t){const e=1-i;return 3*e*e*i*t}function Vf(i,t){return 3*(1-i)*i*i*t}function Gf(i,t){return i*i*i*t}function xs(i,t,e,n,s){return kf(i,t)+zf(i,e)+Vf(i,n)+Gf(i,s)}class jh extends xn{constructor(t=new rt,e=new rt,n=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(xs(t,s.x,r.x,a.x,o.x),xs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Hf extends xn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(xs(t,s.x,r.x,a.x,o.x),xs(t,s.y,r.y,a.y,o.y),xs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class tu extends xn{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wf extends xn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class eu extends xn{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(_s(t,s.x,r.x,a.x),_s(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ml extends xn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(_s(t,s.x,r.x,a.x),_s(t,s.y,r.y,a.y),_s(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nu extends xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(bc(o,l.x,c.x,h.x,d.x),bc(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new rt().fromArray(s))}return this}}var Pr=Object.freeze({__proto__:null,ArcCurve:Nf,CatmullRomCurve3:Uf,CubicBezierCurve:jh,CubicBezierCurve3:Hf,EllipseCurve:fl,LineCurve:tu,LineCurve3:Wf,QuadraticBezierCurve:eu,QuadraticBezierCurve3:ml,SplineCurve:nu});class Xf extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Pr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Pr[s.type]().fromJSON(s))}return this}}class Ji extends Xf{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new tu(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new eu(this.currentPoint.clone(),new rt(t,e),new rt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new jh(this.currentPoint.clone(),new rt(t,e),new rt(n,s),new rt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new nu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new fl(t,e,n,s,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Fr extends Ji{constructor(t){super(t),this.uuid=vi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Ji().fromJSON(s))}return this}}function qf(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=iu(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=$f(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,d=l;for(let u=e;u<s;u+=e){const f=i[u],m=i[u+1];f<o&&(o=f),m<l&&(l=m),f>h&&(h=f),m>d&&(d=m)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Es(r,a,e,o,l,c,0),a}function iu(i,t,e,n,s){let r;if(s===lp(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=Sc(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Sc(a/n|0,i[a],i[a+1],r);return r&&$i(r,r.next)&&(As(r),r=r.next),r}function pi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&($i(e,e.next)||pe(e.prev,e,e.next)===0)){if(As(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Es(i,t,e,n,s,r,a){if(!i)return;!a&&r&&np(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Kf(i,n,s,r):Yf(i)){t.push(l.i,i.i,c.i),As(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Zf(pi(i),t),Es(i,t,e,n,s,r,2)):a===2&&Jf(i,t,e,n,s,r):Es(pi(i),t,e,n,s,r,1);break}}}function Yf(i){const t=i.prev,e=i,n=i.next;if(pe(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c);let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&ps(s,o,r,l,a,c,m.x,m.y)&&pe(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Kf(i,t,e,n){const s=i.prev,r=i,a=i.next;if(pe(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),m=Math.min(h,d,u),y=Math.max(o,l,c),g=Math.max(h,d,u),p=Do(f,m,t,e,n),E=Do(y,g,t,e,n);let A=i.prevZ,x=i.nextZ;for(;A&&A.z>=p&&x&&x.z<=E;){if(A.x>=f&&A.x<=y&&A.y>=m&&A.y<=g&&A!==s&&A!==a&&ps(o,h,l,d,c,u,A.x,A.y)&&pe(A.prev,A,A.next)>=0||(A=A.prevZ,x.x>=f&&x.x<=y&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&ps(o,h,l,d,c,u,x.x,x.y)&&pe(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;A&&A.z>=p;){if(A.x>=f&&A.x<=y&&A.y>=m&&A.y<=g&&A!==s&&A!==a&&ps(o,h,l,d,c,u,A.x,A.y)&&pe(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;x&&x.z<=E;){if(x.x>=f&&x.x<=y&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&ps(o,h,l,d,c,u,x.x,x.y)&&pe(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Zf(i,t){let e=i;do{const n=e.prev,s=e.next.next;!$i(n,s)&&ru(n,e,e.next,s)&&Ts(n,s)&&Ts(s,n)&&(t.push(n.i,e.i,s.i),As(e),As(e.next),e=i=s),e=e.next}while(e!==i);return pi(e)}function Jf(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&rp(a,o)){let l=au(a,o);a=pi(a,a.next),l=pi(l,l.next),Es(a,t,e,n,s,r,0),Es(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function $f(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=iu(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(sp(c))}s.sort(Qf);for(let r=0;r<s.length;r++)e=jf(s[r],e);return e}function Qf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function jf(i,t){const e=tp(i,t);if(!e)return t;const n=au(e,i);return pi(n,n.next),pi(e,e.next)}function tp(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if($i(i,e))return e;do{if($i(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&su(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const d=Math.abs(s-e.y)/(n-e.x);Ts(e,i)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&ep(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function ep(i,t){return pe(i.prev,i,t.prev)<0&&pe(t.next,i,i.next)<0}function np(i,t,e,n){let s=i;do s.z===0&&(s.z=Do(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,ip(s)}function ip(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Do(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function sp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function su(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function ps(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&su(i,t,e,n,s,r,a,o)}function rp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!ap(i,t)&&(Ts(i,t)&&Ts(t,i)&&op(i,t)&&(pe(i.prev,i,t.prev)||pe(i,t.prev,t))||$i(i,t)&&pe(i.prev,i,i.next)>0&&pe(t.prev,t,t.next)>0)}function pe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function $i(i,t){return i.x===t.x&&i.y===t.y}function ru(i,t,e,n){const s=tr(pe(i,t,e)),r=tr(pe(i,t,n)),a=tr(pe(e,n,i)),o=tr(pe(e,n,t));return!!(s!==r&&a!==o||s===0&&js(i,e,t)||r===0&&js(i,n,t)||a===0&&js(e,i,n)||o===0&&js(e,t,n))}function js(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function tr(i){return i>0?1:i<0?-1:0}function ap(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ru(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ts(i,t){return pe(i.prev,i,i.next)<0?pe(i,t,i.next)>=0&&pe(i,i.prev,t)>=0:pe(i,t,i.prev)<0||pe(i,i.next,t)<0}function op(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function au(i,t){const e=No(i.i,i.x,i.y),n=No(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Sc(i,t,e,n){const s=No(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function As(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function No(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function lp(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class cp{static triangulate(t,e,n=2){return qf(t,e,n)}}class Wi{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Wi.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];wc(t),Ec(n,t);let a=t.length;e.forEach(wc);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Ec(n,e[l]);const o=cp.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function wc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ec(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class gl extends be{constructor(t=new Fr([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new ee(s,3)),this.setAttribute("uv",new ee(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:hp;let A,x=!1,R,T,P,_;if(p){A=p.getSpacedPoints(h),x=!0,u=!1;const j=p.isCatmullRomCurve3?p.closed:!1;R=p.computeFrenetFrames(h,j),T=new L,P=new L,_=new L}u||(g=0,f=0,m=0,y=0);const M=o.extractPoints(c);let w=M.shape;const S=M.holes;if(!Wi.isClockWise(w)){w=w.reverse();for(let j=0,et=S.length;j<et;j++){const tt=S[j];Wi.isClockWise(tt)&&(S[j]=tt.reverse())}}function B(j){const tt=10000000000000001e-36;let ut=j[0];for(let at=1;at<=j.length;at++){const Tt=at%j.length,St=j[Tt],Gt=St.x-ut.x,Wt=St.y-ut.y,D=Gt*Gt+Wt*Wt,ae=Math.max(Math.abs(St.x),Math.abs(St.y),Math.abs(ut.x),Math.abs(ut.y)),Qt=tt*ae*ae;if(D<=Qt){j.splice(Tt,1),at--;continue}ut=St}}B(w),S.forEach(B);const X=S.length,U=w;for(let j=0;j<X;j++){const et=S[j];w=w.concat(et)}function G(j,et,tt){return et||jt("ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(et,tt)}const z=w.length;function J(j,et,tt){let ut,at,Tt;const St=j.x-et.x,Gt=j.y-et.y,Wt=tt.x-j.x,D=tt.y-j.y,ae=St*St+Gt*Gt,Qt=St*D-Gt*Wt;if(Math.abs(Qt)>Number.EPSILON){const C=Math.sqrt(ae),v=Math.sqrt(Wt*Wt+D*D),k=et.x-Gt/C,W=et.y+St/C,Y=tt.x-D/v,lt=tt.y+Wt/v,dt=((Y-k)*D-(lt-W)*Wt)/(St*D-Gt*Wt);ut=k+St*dt-j.x,at=W+Gt*dt-j.y;const K=ut*ut+at*at;if(K<=2)return new rt(ut,at);Tt=Math.sqrt(K/2)}else{let C=!1;St>Number.EPSILON?Wt>Number.EPSILON&&(C=!0):St<-Number.EPSILON?Wt<-Number.EPSILON&&(C=!0):Math.sign(Gt)===Math.sign(D)&&(C=!0),C?(ut=-Gt,at=St,Tt=Math.sqrt(ae)):(ut=St,at=Gt,Tt=Math.sqrt(ae/2))}return new rt(ut/Tt,at/Tt)}const it=[];for(let j=0,et=U.length,tt=et-1,ut=j+1;j<et;j++,tt++,ut++)tt===et&&(tt=0),ut===et&&(ut=0),it[j]=J(U[j],U[tt],U[ut]);const ht=[];let ct,xt=it.concat();for(let j=0,et=X;j<et;j++){const tt=S[j];ct=[];for(let ut=0,at=tt.length,Tt=at-1,St=ut+1;ut<at;ut++,Tt++,St++)Tt===at&&(Tt=0),St===at&&(St=0),ct[ut]=J(tt[ut],tt[Tt],tt[St]);ht.push(ct),xt=xt.concat(ct)}let Ht;if(g===0)Ht=Wi.triangulateShape(U,S);else{const j=[],et=[];for(let tt=0;tt<g;tt++){const ut=tt/g,at=f*Math.cos(ut*Math.PI/2),Tt=m*Math.sin(ut*Math.PI/2)+y;for(let St=0,Gt=U.length;St<Gt;St++){const Wt=G(U[St],it[St],Tt);Rt(Wt.x,Wt.y,-at),ut===0&&j.push(Wt)}for(let St=0,Gt=X;St<Gt;St++){const Wt=S[St];ct=ht[St];const D=[];for(let ae=0,Qt=Wt.length;ae<Qt;ae++){const C=G(Wt[ae],ct[ae],Tt);Rt(C.x,C.y,-at),ut===0&&D.push(C)}ut===0&&et.push(D)}}Ht=Wi.triangulateShape(j,et)}const ie=Ht.length,Kt=m+y;for(let j=0;j<z;j++){const et=u?G(w[j],xt[j],Kt):w[j];x?(P.copy(R.normals[0]).multiplyScalar(et.x),T.copy(R.binormals[0]).multiplyScalar(et.y),_.copy(A[0]).add(P).add(T),Rt(_.x,_.y,_.z)):Rt(et.x,et.y,0)}for(let j=1;j<=h;j++)for(let et=0;et<z;et++){const tt=u?G(w[et],xt[et],Kt):w[et];x?(P.copy(R.normals[j]).multiplyScalar(tt.x),T.copy(R.binormals[j]).multiplyScalar(tt.y),_.copy(A[j]).add(P).add(T),Rt(_.x,_.y,_.z)):Rt(tt.x,tt.y,d/h*j)}for(let j=g-1;j>=0;j--){const et=j/g,tt=f*Math.cos(et*Math.PI/2),ut=m*Math.sin(et*Math.PI/2)+y;for(let at=0,Tt=U.length;at<Tt;at++){const St=G(U[at],it[at],ut);Rt(St.x,St.y,d+tt)}for(let at=0,Tt=S.length;at<Tt;at++){const St=S[at];ct=ht[at];for(let Gt=0,Wt=St.length;Gt<Wt;Gt++){const D=G(St[Gt],ct[Gt],ut);x?Rt(D.x,D.y+A[h-1].y,A[h-1].x+tt):Rt(D.x,D.y,d+tt)}}}Z(),ot();function Z(){const j=s.length/3;if(u){let et=0,tt=z*et;for(let ut=0;ut<ie;ut++){const at=Ht[ut];Ot(at[2]+tt,at[1]+tt,at[0]+tt)}et=h+g*2,tt=z*et;for(let ut=0;ut<ie;ut++){const at=Ht[ut];Ot(at[0]+tt,at[1]+tt,at[2]+tt)}}else{for(let et=0;et<ie;et++){const tt=Ht[et];Ot(tt[2],tt[1],tt[0])}for(let et=0;et<ie;et++){const tt=Ht[et];Ot(tt[0]+z*h,tt[1]+z*h,tt[2]+z*h)}}n.addGroup(j,s.length/3-j,0)}function ot(){const j=s.length/3;let et=0;st(U,et),et+=U.length;for(let tt=0,ut=S.length;tt<ut;tt++){const at=S[tt];st(at,et),et+=at.length}n.addGroup(j,s.length/3-j,1)}function st(j,et){let tt=j.length;for(;--tt>=0;){const ut=tt;let at=tt-1;at<0&&(at=j.length-1);for(let Tt=0,St=h+g*2;Tt<St;Tt++){const Gt=z*Tt,Wt=z*(Tt+1),D=et+ut+Gt,ae=et+at+Gt,Qt=et+at+Wt,C=et+ut+Wt;Lt(D,ae,Qt,C)}}}function Rt(j,et,tt){l.push(j),l.push(et),l.push(tt)}function Ot(j,et,tt){zt(j),zt(et),zt(tt);const ut=s.length/3,at=E.generateTopUV(n,s,ut-3,ut-2,ut-1);Ct(at[0]),Ct(at[1]),Ct(at[2])}function Lt(j,et,tt,ut){zt(j),zt(et),zt(ut),zt(et),zt(tt),zt(ut);const at=s.length/3,Tt=E.generateSideWallUV(n,s,at-6,at-3,at-2,at-1);Ct(Tt[0]),Ct(Tt[1]),Ct(Tt[3]),Ct(Tt[1]),Ct(Tt[2]),Ct(Tt[3])}function zt(j){s.push(l[j*3+0]),s.push(l[j*3+1]),s.push(l[j*3+2])}function Ct(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return up(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Pr[s.type]().fromJSON(s)),new gl(n,t.options)}}const hp={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new rt(r,a),new rt(o,l),new rt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],m=t[s*3+2],y=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new rt(a,1-l),new rt(c,1-d),new rt(u,1-m),new rt(y,1-p)]:[new rt(o,1-l),new rt(h,1-d),new rt(f,1-m),new rt(g,1-p)]}};function up(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class vl extends be{constructor(t=[new rt(0,-.5),new rt(.5,0),new rt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=$t(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,d=new L,u=new rt,f=new L,m=new L,y=new L;let g=0,p=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:g=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-g,f.z=p*0,y.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(y.x,y.y,y.z);break;default:g=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=y.x,f.y+=y.y,f.z+=y.z,f.normalize(),l.push(f.x,f.y,f.z),y.copy(m)}for(let E=0;E<=e;E++){const A=n+E*h*s,x=Math.sin(A),R=Math.cos(A);for(let T=0;T<=t.length-1;T++){d.x=t[T].x*x,d.y=t[T].y,d.z=t[T].x*R,a.push(d.x,d.y,d.z),u.x=E/e,u.y=T/(t.length-1),o.push(u.x,u.y);const P=l[3*T+0]*x,_=l[3*T+1],M=l[3*T+0]*R;c.push(P,_,M)}}for(let E=0;E<e;E++)for(let A=0;A<t.length-1;A++){const x=A+E*t.length,R=x,T=x+t.length,P=x+t.length+1,_=x+1;r.push(R,T,_),r.push(P,_,T)}this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("uv",new ee(o,2)),this.setAttribute("normal",new ee(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vl(t.points,t.segments,t.phiStart,t.phiLength)}}class Cs extends be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){const E=p*u-a;for(let A=0;A<c;A++){const x=A*d-r;m.push(x,-E,0),y.push(0,0,1),g.push(A/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const A=E+c*p,x=E+c*(p+1),R=E+1+c*(p+1),T=E+1+c*p;f.push(A,x,T),f.push(x,R,T)}this.setIndex(f),this.setAttribute("position",new ee(m,3)),this.setAttribute("normal",new ee(y,3)),this.setAttribute("uv",new ee(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Or extends be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new L,u=new L,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){const E=[],A=p/n,x=a+A*o,R=t*Math.cos(x),T=Math.sqrt(t*t-R*R);let P=0;p===0&&a===0?P=.5/e:p===n&&l===Math.PI&&(P=-.5/e);for(let _=0;_<=e;_++){const M=_/e,w=s+M*r;d.x=-T*Math.cos(w),d.y=R,d.z=T*Math.sin(w),m.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),g.push(M+P,1-A),E.push(c++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){const A=h[p][E+1],x=h[p][E],R=h[p+1][E],T=h[p+1][E+1];(p!==0||a>0)&&f.push(A,x,T),(p!==n-1||l<Math.PI)&&f.push(x,R,T)}this.setIndex(f),this.setAttribute("position",new ee(m,3)),this.setAttribute("normal",new ee(y,3)),this.setAttribute("uv",new ee(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Or(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class _l extends be{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],u=new L,f=new L,m=new L;for(let y=0;y<=n;y++){const g=a+y/n*o;for(let p=0;p<=s;p++){const E=p/s*r;f.x=(t+e*Math.cos(g))*Math.cos(E),f.y=(t+e*Math.cos(g))*Math.sin(E),f.z=e*Math.sin(g),c.push(f.x,f.y,f.z),u.x=t*Math.cos(E),u.y=t*Math.sin(E),m.subVectors(f,u).normalize(),h.push(m.x,m.y,m.z),d.push(p/s),d.push(y/n)}}for(let y=1;y<=n;y++)for(let g=1;g<=s;g++){const p=(s+1)*y+g-1,E=(s+1)*(y-1)+g-1,A=(s+1)*(y-1)+g,x=(s+1)*y+g;l.push(p,E,x),l.push(E,A,x)}this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _l(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class xl extends be{constructor(t=new ml(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new L,l=new L,c=new rt;let h=new L;const d=[],u=[],f=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new ee(d,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2));function y(){for(let A=0;A<e;A++)g(A);g(r===!1?e:0),E(),p()}function g(A){h=t.getPointAt(A/e,h);const x=a.normals[A],R=a.binormals[A];for(let T=0;T<=s;T++){const P=T/s*Math.PI*2,_=Math.sin(P),M=-Math.cos(P);l.x=M*x.x+_*R.x,l.y=M*x.y+_*R.y,l.z=M*x.z+_*R.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let A=1;A<=e;A++)for(let x=1;x<=s;x++){const R=(s+1)*(A-1)+(x-1),T=(s+1)*A+(x-1),P=(s+1)*A+x,_=(s+1)*(A-1)+x;m.push(R,T,_),m.push(T,P,_)}}function E(){for(let A=0;A<=e;A++)for(let x=0;x<=s;x++)c.x=A/e,c.y=x/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new xl(new Pr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Qi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Tc(s))s.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Tc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Oe(i){const t={};for(let e=0;e<i.length;e++){const n=Qi(i[e]);for(const s in n)t[s]=n[s]}return t}function Tc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function dp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ou(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const fp={clone:Qi,merge:Oe};var pp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ye extends xi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pp,this.fragmentShader=mp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qi(t.uniforms),this.uniformsGroups=dp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Dt().setHex(s.value);break;case"v2":this.uniforms[n].value=new rt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new fe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ne().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class gp extends Ye{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Lr extends xi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Me,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class vp extends xi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Me,this.combine=Ko,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _p extends xi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xp extends xi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ml extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Mp extends Ml{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const _a=new ne,Ac=new L,Rc=new L;class lu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=qe,this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hl,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ac.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ac),Rc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rc),e.updateMatrixWorld(),_a.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_a,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Ss||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_a)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const er=new L,nr=new $n,on=new L;class cu extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(er,nr,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(er,nr,on.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(er,nr,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(er,nr,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Hn=new L,Cc=new rt,Pc=new rt;class Xe extends cu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z)}getViewSize(t,e){return this.getViewBounds(t,Cc,Pc),e.subVectors(Pc,Cc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(gs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class yp extends lu{constructor(){super(new Xe(90,1,.5,500)),this.isPointLightShadow=!0}}class bp extends Ml{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new yp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class yl extends cu{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Sp extends lu{constructor(){super(new yl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lc extends Ml{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new Sp}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Ui=-90,Fi=1;class wp extends Ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Xe(Ui,Fi,t,e);s.layers=this.layers,this.add(s);const r=new Xe(Ui,Fi,t,e);r.layers=this.layers,this.add(r);const a=new Xe(Ui,Fi,t,e);a.layers=this.layers,this.add(a);const o=new Xe(Ui,Fi,t,e);o.layers=this.layers,this.add(o);const l=new Xe(Ui,Fi,t,e);l.layers=this.layers,this.add(l);const c=new Xe(Ui,Fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Ep extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Ic=new ne;class Uo{constructor(t,e,n=0,s=1/0){this.ray=new ll(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ol,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):jt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ic.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ic),this}intersectObject(t,e=!0,n=[]){return Fo(t,this,n,e),n.sort(Dc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Fo(t[s],this,n,e);return n.sort(Dc),n}}function Dc(i,t){return i.distance-t.distance}function Fo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Fo(r[a],t,e,!0)}}const Pl=class Pl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Pl.prototype.isMatrix2=!0;let Nc=Pl;function Uc(i,t,e,n){const s=Tp(n);switch(e){case Gh:return i*t;case jo:return i*t/s.components*s.byteLength;case tl:return i*t/s.components*s.byteLength;case fi:return i*t*2/s.components*s.byteLength;case el:return i*t*2/s.components*s.byteLength;case Hh:return i*t*3/s.components*s.byteLength;case en:return i*t*4/s.components*s.byteLength;case nl:return i*t*4/s.components*s.byteLength;case fr:case pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case mr:case gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case no:case so:return Math.max(i,16)*Math.max(t,8)/4;case eo:case io:return Math.max(i,8)*Math.max(t,8)/2;case ro:case ao:case lo:case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case oo:case wr:case ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case po:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case mo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case go:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case vo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case _o:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case xo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case yo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case bo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case So:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case wo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case To:case Ao:case Ro:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Co:case Po:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Er:case Lo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Tp(i){switch(i){case qe:case Bh:return{byteLength:1,components:1};case ys:case kh:case In:return{byteLength:2,components:1};case $o:case Qo:return{byteLength:2,components:4};case gn:case Jo:case tn:return{byteLength:4,components:1};case zh:case Vh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yo}}));typeof window<"u"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function hu(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ap(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],y=d[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const y=d[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Rp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cp=`#ifdef USE_ALPHAHASH
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
#endif`,Pp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ip=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Np=`#ifdef USE_AOMAP
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
#endif`,Up=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fp=`#ifdef USE_BATCHING
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
#endif`,Op=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vp=`#ifdef USE_IRIDESCENCE
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
#endif`,Gp=`#ifdef USE_BUMPMAP
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
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,$p=`#define PI 3.141592653589793
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
} // validated`,Qp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jp=`vec3 transformedNormal = objectNormal;
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
#endif`,tm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,em=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,im=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sm="gl_FragColor = linearToOutputTexel( gl_FragColor );",rm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,am=`#ifdef USE_ENVMAP
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
#endif`,om=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hm=`#ifdef USE_ENVMAP
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
#endif`,um=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mm=`#ifdef USE_GRADIENTMAP
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
}`,gm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_m=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Mm=`#ifdef USE_ENVMAP
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
#endif`,ym=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Em=`PhysicalMaterial material;
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
#endif`,Tm=`uniform sampler2D dfgLUT;
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
}`,Am=`
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
#endif`,Rm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Lm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Um=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Om=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bm=`#if defined( USE_POINTS_UV )
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
#endif`,km=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wm=`#ifdef USE_MORPHTARGETS
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
#endif`,Xm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ym=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,$m=`#ifdef USE_NORMALMAP
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
#endif`,Qm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,e0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,n0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,i0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,s0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,r0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,o0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,l0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,c0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,h0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,u0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,d0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,f0=`float getShadowMask() {
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
}`,p0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,m0=`#ifdef USE_SKINNING
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
#endif`,g0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,v0=`#ifdef USE_SKINNING
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
#endif`,_0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,x0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,M0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,y0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,b0=`#ifdef USE_TRANSMISSION
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
#endif`,S0=`#ifdef USE_TRANSMISSION
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
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const R0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,C0=`uniform sampler2D t2D;
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
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,I0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`#include <common>
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
}`,U0=`#if DEPTH_PACKING == 3200
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
}`,F0=`#define DISTANCE
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
}`,O0=`#define DISTANCE
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
}`,B0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z0=`uniform float scale;
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
}`,V0=`uniform vec3 diffuse;
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
}`,G0=`#include <common>
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
}`,H0=`uniform vec3 diffuse;
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
}`,W0=`#define LAMBERT
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
}`,X0=`#define LAMBERT
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
}`,q0=`#define MATCAP
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
}`,Y0=`#define MATCAP
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
}`,K0=`#define NORMAL
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
}`,Z0=`#define NORMAL
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
}`,J0=`#define PHONG
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
}`,$0=`#define PHONG
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
}`,Q0=`#define STANDARD
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
}`,j0=`#define STANDARD
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
}`,tg=`#define TOON
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
}`,eg=`#define TOON
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
}`,ng=`uniform float size;
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
}`,ig=`uniform vec3 diffuse;
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
}`,sg=`#include <common>
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
}`,rg=`uniform vec3 color;
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
}`,ag=`uniform float rotation;
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
}`,og=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:Rp,alphahash_pars_fragment:Cp,alphamap_fragment:Pp,alphamap_pars_fragment:Lp,alphatest_fragment:Ip,alphatest_pars_fragment:Dp,aomap_fragment:Np,aomap_pars_fragment:Up,batching_pars_vertex:Fp,batching_vertex:Op,begin_vertex:Bp,beginnormal_vertex:kp,bsdfs:zp,iridescence_fragment:Vp,bumpmap_pars_fragment:Gp,clipping_planes_fragment:Hp,clipping_planes_pars_fragment:Wp,clipping_planes_pars_vertex:Xp,clipping_planes_vertex:qp,color_fragment:Yp,color_pars_fragment:Kp,color_pars_vertex:Zp,color_vertex:Jp,common:$p,cube_uv_reflection_fragment:Qp,defaultnormal_vertex:jp,displacementmap_pars_vertex:tm,displacementmap_vertex:em,emissivemap_fragment:nm,emissivemap_pars_fragment:im,colorspace_fragment:sm,colorspace_pars_fragment:rm,envmap_fragment:am,envmap_common_pars_fragment:om,envmap_pars_fragment:lm,envmap_pars_vertex:cm,envmap_physical_pars_fragment:Mm,envmap_vertex:hm,fog_vertex:um,fog_pars_vertex:dm,fog_fragment:fm,fog_pars_fragment:pm,gradientmap_pars_fragment:mm,lightmap_pars_fragment:gm,lights_lambert_fragment:vm,lights_lambert_pars_fragment:_m,lights_pars_begin:xm,lights_toon_fragment:ym,lights_toon_pars_fragment:bm,lights_phong_fragment:Sm,lights_phong_pars_fragment:wm,lights_physical_fragment:Em,lights_physical_pars_fragment:Tm,lights_fragment_begin:Am,lights_fragment_maps:Rm,lights_fragment_end:Cm,lightprobes_pars_fragment:Pm,logdepthbuf_fragment:Lm,logdepthbuf_pars_fragment:Im,logdepthbuf_pars_vertex:Dm,logdepthbuf_vertex:Nm,map_fragment:Um,map_pars_fragment:Fm,map_particle_fragment:Om,map_particle_pars_fragment:Bm,metalnessmap_fragment:km,metalnessmap_pars_fragment:zm,morphinstance_vertex:Vm,morphcolor_vertex:Gm,morphnormal_vertex:Hm,morphtarget_pars_vertex:Wm,morphtarget_vertex:Xm,normal_fragment_begin:qm,normal_fragment_maps:Ym,normal_pars_fragment:Km,normal_pars_vertex:Zm,normal_vertex:Jm,normalmap_pars_fragment:$m,clearcoat_normal_fragment_begin:Qm,clearcoat_normal_fragment_maps:jm,clearcoat_pars_fragment:t0,iridescence_pars_fragment:e0,opaque_fragment:n0,packing:i0,premultiplied_alpha_fragment:s0,project_vertex:r0,dithering_fragment:a0,dithering_pars_fragment:o0,roughnessmap_fragment:l0,roughnessmap_pars_fragment:c0,shadowmap_pars_fragment:h0,shadowmap_pars_vertex:u0,shadowmap_vertex:d0,shadowmask_pars_fragment:f0,skinbase_vertex:p0,skinning_pars_vertex:m0,skinning_vertex:g0,skinnormal_vertex:v0,specularmap_fragment:_0,specularmap_pars_fragment:x0,tonemapping_fragment:M0,tonemapping_pars_fragment:y0,transmission_fragment:b0,transmission_pars_fragment:S0,uv_pars_fragment:w0,uv_pars_vertex:E0,uv_vertex:T0,worldpos_vertex:A0,background_vert:R0,background_frag:C0,backgroundCube_vert:P0,backgroundCube_frag:L0,cube_vert:I0,cube_frag:D0,depth_vert:N0,depth_frag:U0,distance_vert:F0,distance_frag:O0,equirect_vert:B0,equirect_frag:k0,linedashed_vert:z0,linedashed_frag:V0,meshbasic_vert:G0,meshbasic_frag:H0,meshlambert_vert:W0,meshlambert_frag:X0,meshmatcap_vert:q0,meshmatcap_frag:Y0,meshnormal_vert:K0,meshnormal_frag:Z0,meshphong_vert:J0,meshphong_frag:$0,meshphysical_vert:Q0,meshphysical_frag:j0,meshtoon_vert:tg,meshtoon_frag:eg,points_vert:ng,points_frag:ig,shadow_vert:sg,shadow_frag:rg,sprite_vert:ag,sprite_frag:og},_t={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},dn={basic:{uniforms:Oe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Oe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Dt(0)},envMapIntensity:{value:1}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Oe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Oe([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Oe([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Oe([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Oe([_t.points,_t.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Oe([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Oe([_t.common,_t.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Oe([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Oe([_t.sprite,_t.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distance:{uniforms:Oe([_t.common,_t.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distance_vert,fragmentShader:Zt.distance_frag},shadow:{uniforms:Oe([_t.lights,_t.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};dn.physical={uniforms:Oe([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const ir={r:0,b:0,g:0},lg=new ne,uu=new Xt;uu.set(-1,0,0,0,1,0,0,0,1);function cg(i,t,e,n,s,r){const a=new Dt(0);let o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(E){let A=E.isScene===!0?E.background:null;if(A&&A.isTexture){const x=E.backgroundBlurriness>0;A=t.get(A,x)}return A}function m(E){let A=!1;const x=f(E);x===null?g(a,o):x&&x.isColor&&(g(x,1),A=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?e.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(E,A){const x=f(A);x&&(x.isCubeTexture||x.mapping===Ur)?(c===void 0&&(c=new de(new Mi(1,1,1),new Ye({name:"BackgroundCubeMaterial",uniforms:Qi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(lg.makeRotationFromEuler(A.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(uu),c.material.toneMapped=te.getTransfer(x.colorSpace)!==re,(h!==x||d!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new de(new Cs(2,2),new Ye({name:"BackgroundMaterial",uniforms:Qi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=te.getTransfer(x.colorSpace)!==re,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function g(E,A){E.getRGB(ir,ou(i)),e.buffers.color.setClear(ir.r,ir.g,ir.b,A,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,A=1){a.set(E),o=A,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(a,o)},render:m,addToRenderList:y,dispose:p}}function hg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(S,I,B,X,U){let G=!1;const z=d(S,X,B,I);r!==z&&(r=z,c(r.object)),G=f(S,X,B,U),G&&m(S,X,B,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,x(S,I,B,X),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function d(S,I,B,X){const U=X.wireframe===!0;let G=n[I.id];G===void 0&&(G={},n[I.id]=G);const z=S.isInstancedMesh===!0?S.id:0;let J=G[z];J===void 0&&(J={},G[z]=J);let it=J[B.id];it===void 0&&(it={},J[B.id]=it);let ht=it[U];return ht===void 0&&(ht=u(l()),it[U]=ht),ht}function u(S){const I=[],B=[],X=[];for(let U=0;U<e;U++)I[U]=0,B[U]=0,X[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:X,object:S,attributes:{},index:null}}function f(S,I,B,X){const U=r.attributes,G=I.attributes;let z=0;const J=B.getAttributes();for(const it in J)if(J[it].location>=0){const ct=U[it];let xt=G[it];if(xt===void 0&&(it==="instanceMatrix"&&S.instanceMatrix&&(xt=S.instanceMatrix),it==="instanceColor"&&S.instanceColor&&(xt=S.instanceColor)),ct===void 0||ct.attribute!==xt||xt&&ct.data!==xt.data)return!0;z++}return r.attributesNum!==z||r.index!==X}function m(S,I,B,X){const U={},G=I.attributes;let z=0;const J=B.getAttributes();for(const it in J)if(J[it].location>=0){let ct=G[it];ct===void 0&&(it==="instanceMatrix"&&S.instanceMatrix&&(ct=S.instanceMatrix),it==="instanceColor"&&S.instanceColor&&(ct=S.instanceColor));const xt={};xt.attribute=ct,ct&&ct.data&&(xt.data=ct.data),U[it]=xt,z++}r.attributes=U,r.attributesNum=z,r.index=X}function y(){const S=r.newAttributes;for(let I=0,B=S.length;I<B;I++)S[I]=0}function g(S){p(S,0)}function p(S,I){const B=r.newAttributes,X=r.enabledAttributes,U=r.attributeDivisors;B[S]=1,X[S]===0&&(i.enableVertexAttribArray(S),X[S]=1),U[S]!==I&&(i.vertexAttribDivisor(S,I),U[S]=I)}function E(){const S=r.newAttributes,I=r.enabledAttributes;for(let B=0,X=I.length;B<X;B++)I[B]!==S[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function A(S,I,B,X,U,G,z){z===!0?i.vertexAttribIPointer(S,I,B,U,G):i.vertexAttribPointer(S,I,B,X,U,G)}function x(S,I,B,X){y();const U=X.attributes,G=B.getAttributes(),z=I.defaultAttributeValues;for(const J in G){const it=G[J];if(it.location>=0){let ht=U[J];if(ht===void 0&&(J==="instanceMatrix"&&S.instanceMatrix&&(ht=S.instanceMatrix),J==="instanceColor"&&S.instanceColor&&(ht=S.instanceColor)),ht!==void 0){const ct=ht.normalized,xt=ht.itemSize,Ht=t.get(ht);if(Ht===void 0)continue;const ie=Ht.buffer,Kt=Ht.type,Z=Ht.bytesPerElement,ot=Kt===i.INT||Kt===i.UNSIGNED_INT||ht.gpuType===Jo;if(ht.isInterleavedBufferAttribute){const st=ht.data,Rt=st.stride,Ot=ht.offset;if(st.isInstancedInterleavedBuffer){for(let Lt=0;Lt<it.locationSize;Lt++)p(it.location+Lt,st.meshPerAttribute);S.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Lt=0;Lt<it.locationSize;Lt++)g(it.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Lt=0;Lt<it.locationSize;Lt++)A(it.location+Lt,xt/it.locationSize,Kt,ct,Rt*Z,(Ot+xt/it.locationSize*Lt)*Z,ot)}else{if(ht.isInstancedBufferAttribute){for(let st=0;st<it.locationSize;st++)p(it.location+st,ht.meshPerAttribute);S.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let st=0;st<it.locationSize;st++)g(it.location+st);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let st=0;st<it.locationSize;st++)A(it.location+st,xt/it.locationSize,Kt,ct,xt*Z,xt/it.locationSize*st*Z,ot)}}else if(z!==void 0){const ct=z[J];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(it.location,ct);break;case 3:i.vertexAttrib3fv(it.location,ct);break;case 4:i.vertexAttrib4fv(it.location,ct);break;default:i.vertexAttrib1fv(it.location,ct)}}}}E()}function R(){M();for(const S in n){const I=n[S];for(const B in I){const X=I[B];for(const U in X){const G=X[U];for(const z in G)h(G[z].object),delete G[z];delete X[U]}}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const I=n[S.id];for(const B in I){const X=I[B];for(const U in X){const G=X[U];for(const z in G)h(G[z].object),delete G[z];delete X[U]}}delete n[S.id]}function P(S){for(const I in n){const B=n[I];for(const X in B){const U=B[X];if(U[S.id]===void 0)continue;const G=U[S.id];for(const z in G)h(G[z].object),delete G[z];delete U[S.id]}}}function _(S){for(const I in n){const B=n[I],X=S.isInstancedMesh===!0?S.id:0,U=B[X];if(U!==void 0){for(const G in U){const z=U[G];for(const J in z)h(z[J].object),delete z[J];delete U[G]}delete B[X],Object.keys(B).length===0&&delete n[I]}}}function M(){w(),a=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:M,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:P,initAttributes:y,enableAttribute:g,disableUnusedAttributes:E}}function ug(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function dg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==en&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const _=P===In&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==qe&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==tn&&!_)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Vt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:A,maxFragmentUniforms:x,maxSamples:R,samples:T}}function fg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new si,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const E=r?0:n,A=E*4;let x=p.clippingState||null;l.value=x,x=h(m,u,A,f);for(let R=0;R!==A;++R)x[R]=e[R];p.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){const y=d!==null?d.length:0;let g=null;if(y!==0){if(g=l.value,m!==!0||g===null){const p=f+y*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let A=0,x=f;A!==y;++A,x+=4)a.copy(d[A]).applyMatrix4(E,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}const Zn=4,Fc=[.125,.215,.35,.446,.526,.582],oi=20,pg=256,cs=new yl,Oc=new Dt;let xa=null,Ma=0,ya=0,ba=!1;const mg=new L;class Oo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=mg}=r;xa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(xa,Ma,ya),this._renderer.xr.enabled=ba,t.scissorTest=!1,Oi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===di||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:De,minFilter:De,generateMipmaps:!1,type:In,format:en,colorSpace:Ar,depthBuffer:!1},s=Bc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=gg(r)),this._blurMaterial=_g(r,t,e),this._ggxMaterial=vg(r,t,e)}return s}_compileMaterial(t){const e=new de(new be,t);this._renderer.compile(e,cs)}_sceneToCubeUV(t,e,n,s,r){const l=new Xe(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Oc),d.toneMapping=pn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new de(new Mi,new cl({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,g=y.material;let p=!1;const E=t.background;E?E.isColor&&(g.color.copy(E),t.background=null,p=!0):(g.color.copy(Oc),p=!0);for(let A=0;A<6;A++){const x=A%3;x===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[A],r.y,r.z)):x===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[A]));const R=this._cubeSize;Oi(s,x*R,A>2?R:0,R,R),d.setRenderTarget(s),p&&d.render(y,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=E}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===di||t.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Oi(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,cs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-Zn?n-m+Zn:0),p=4*(this._cubeSize-y);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=m-e,Oi(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(o,cs),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,Oi(t,g,p,3*y,2*y),s.setRenderTarget(t),s.render(o,cs)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&jt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*oi-1),y=r/m,g=isFinite(r)?1+Math.floor(h*y):oi;g>oi&&Vt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${oi}`);const p=[];let E=0;for(let P=0;P<oi;++P){const _=P/y,M=Math.exp(-_*_/2);p.push(M),P===0?E+=M:P<g&&(E+=2*M)}for(let P=0;P<p.length;P++)p[P]=p[P]/E;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:A}=this;u.dTheta.value=m,u.mipInt.value=A-n;const x=this._sizeLods[s],R=3*x*(s>A-Zn?s-A+Zn:0),T=4*(this._cubeSize-x);Oi(e,R,T,3*x,2*x),l.setRenderTarget(e),l.render(d,cs)}}function gg(i){const t=[],e=[],n=[];let s=i;const r=i-Zn+1+Fc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Zn?l=Fc[a-i+Zn-1]:a===0&&(l=0),e.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,y=3,g=2,p=1,E=new Float32Array(y*m*f),A=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let T=0;T<f;T++){const P=T%3*2/3-1,_=T>2?0:-1,M=[P,_,0,P+2/3,_,0,P+2/3,_+1,0,P,_,0,P+2/3,_+1,0,P,_+1,0];E.set(M,y*m*T),A.set(u,g*m*T);const w=[T,T,T,T,T,T];x.set(w,p*m*T)}const R=new be;R.setAttribute("position",new we(E,y)),R.setAttribute("uv",new we(A,g)),R.setAttribute("faceIndex",new we(x,p)),n.push(new de(R,null)),s>Zn&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Bc(i,t,e){const n=new mn(i,t,e);return n.texture.mapping=Ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Oi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function vg(i,t,e){return new Ye({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Br(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function _g(i,t,e){const n=new Float32Array(oi),s=new L(0,1,0);return new Ye({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Br(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function kc(){return new Ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Br(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function zc(){return new Ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Br(){return`

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
	`}class du extends mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new $h(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Mi(5,5,5),r=new Ye({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:Cn});r.uniforms.tEquirect.value=e;const a=new de(s,r),o=e.minFilter;return e.minFilter===li&&(e.minFilter=De),new wp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function xg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Wr||f===Xr)if(t.has(u)){const m=t.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const y=new du(m.height);return y.fromEquirectangularTexture(i,u),t.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,m=f===Wr||f===Xr,y=f===di||f===Ki;if(m||y){let g=e.get(u);const p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Oo(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{const E=u.image;return m&&E&&E.height>0||y&&E&&l(E)?(n===null&&(n=new Oo(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===Wr?u.mapping=di:f===Xr&&(u.mapping=Ki),u}function l(u){let f=0;const m=6;for(let y=0;y<m;y++)u[y]!==void 0&&f++;return f===m}function c(u){const f=u.target;f.removeEventListener("dispose",c);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Mg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Xi("WebGLRenderer: "+n+" extension not supported."),s}}}function yg(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,m=d.attributes.position;let y=0;if(m===void 0)return;if(f!==null){const E=f.array;y=f.version;for(let A=0,x=E.length;A<x;A+=3){const R=E[A+0],T=E[A+1],P=E[A+2];u.push(R,T,T,P,P,R)}}else{const E=m.array;y=m.version;for(let A=0,x=E.length/3-1;A<x;A+=3){const R=A+0,T=A+1,P=A+2;u.push(R,T,T,P,P,R)}}const g=new(m.count>=65535?Zh:Kh)(u,1);g.version=y;const p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function bg(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let g=0;g<f;g++)y+=u[g];e.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Sg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function wg(i,t,e){const n=new WeakMap,s=new fe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let w=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",w)};var f=w;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let x=0;m===!0&&(x=1),y===!0&&(x=2),g===!0&&(x=3);let R=o.attributes.position.count*x,T=1;R>t.maxTextureSize&&(T=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const P=new Float32Array(R*T*4*d),_=new Xh(P,R,T,d);_.type=tn,_.needsUpdate=!0;const M=x*4;for(let S=0;S<d;S++){const I=p[S],B=E[S],X=A[S],U=R*T*4*S;for(let G=0;G<I.count;G++){const z=G*M;m===!0&&(s.fromBufferAttribute(I,G),P[U+z+0]=s.x,P[U+z+1]=s.y,P[U+z+2]=s.z,P[U+z+3]=0),y===!0&&(s.fromBufferAttribute(B,G),P[U+z+4]=s.x,P[U+z+5]=s.y,P[U+z+6]=s.z,P[U+z+7]=0),g===!0&&(s.fromBufferAttribute(X,G),P[U+z+8]=s.x,P[U+z+9]=s.y,P[U+z+10]=s.z,P[U+z+11]=X.itemSize===4?s.w:1)}}u={count:d,texture:_,size:new rt(R,T)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const y=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Eg(i,t,e,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Tg={[Lh]:"LINEAR_TONE_MAPPING",[Ih]:"REINHARD_TONE_MAPPING",[Dh]:"CINEON_TONE_MAPPING",[Zo]:"ACES_FILMIC_TONE_MAPPING",[Uh]:"AGX_TONE_MAPPING",[Fh]:"NEUTRAL_TONE_MAPPING",[Nh]:"CUSTOM_TONE_MAPPING"};function Ag(i,t,e,n,s,r){const a=new mn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Zi(t,e):void 0}),o=new mn(t,e,{type:In,depthBuffer:!1,stencilBuffer:!1}),l=new be;l.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ee([0,2,0,0,2,0],2));const c=new gp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new de(l,c),d=new yl(-1,1,1,-1,0,1);let u=null,f=null,m=!1,y,g=null,p=[],E=!1;this.setSize=function(A,x){a.setSize(A,x),o.setSize(A,x);for(let R=0;R<p.length;R++){const T=p[R];T.setSize&&T.setSize(A,x)}},this.setEffects=function(A){p=A,E=p.length>0&&p[0].isRenderPass===!0;const x=a.width,R=a.height;for(let T=0;T<p.length;T++){const P=p[T];P.setSize&&P.setSize(x,R)}},this.begin=function(A,x){if(m||A.toneMapping===pn&&p.length===0)return!1;if(g=x,x!==null){const R=x.width,T=x.height;(a.width!==R||a.height!==T)&&this.setSize(R,T)}return E===!1&&A.setRenderTarget(a),y=A.toneMapping,A.toneMapping=pn,!0},this.hasRenderPass=function(){return E},this.end=function(A,x){A.toneMapping=y,m=!0;let R=a,T=o;for(let P=0;P<p.length;P++){const _=p[P];if(_.enabled!==!1&&(_.render(A,T,R,x),_.needsSwap!==!1)){const M=R;R=T,T=M}}if(u!==A.outputColorSpace||f!==A.toneMapping){u=A.outputColorSpace,f=A.toneMapping,c.defines={},te.getTransfer(u)===re&&(c.defines.SRGB_TRANSFER="");const P=Tg[f];P&&(c.defines[P]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=R.texture,A.setRenderTarget(g),A.render(h,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const fu=new Be,Bo=new Zi(1,1),pu=new Xh,mu=new ff,gu=new $h,Vc=[],Gc=[],Hc=new Float32Array(16),Wc=new Float32Array(9),Xc=new Float32Array(4);function es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Vc[s];if(r===void 0&&(r=new Float32Array(s),Vc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Te(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ae(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function kr(i,t){let e=Gc[t];e===void 0&&(e=new Int32Array(t),Gc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Rg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2fv(this.addr,t),Ae(e,t)}}function Pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;i.uniform3fv(this.addr,t),Ae(e,t)}}function Lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4fv(this.addr,t),Ae(e,t)}}function Ig(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Xc.set(n),i.uniformMatrix2fv(this.addr,!1,Xc),Ae(e,n)}}function Dg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Wc.set(n),i.uniformMatrix3fv(this.addr,!1,Wc),Ae(e,n)}}function Ng(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Hc.set(n),i.uniformMatrix4fv(this.addr,!1,Hc),Ae(e,n)}}function Ug(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2iv(this.addr,t),Ae(e,t)}}function Og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3iv(this.addr,t),Ae(e,t)}}function Bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4iv(this.addr,t),Ae(e,t)}}function kg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2uiv(this.addr,t),Ae(e,t)}}function Vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3uiv(this.addr,t),Ae(e,t)}}function Gg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4uiv(this.addr,t),Ae(e,t)}}function Hg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Bo.compareFunction=e.isReversedDepthBuffer()?sl:il,r=Bo):r=fu,e.setTexture2D(t||r,s)}function Wg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||mu,s)}function Xg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||gu,s)}function qg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||pu,s)}function Yg(i){switch(i){case 5126:return Rg;case 35664:return Cg;case 35665:return Pg;case 35666:return Lg;case 35674:return Ig;case 35675:return Dg;case 35676:return Ng;case 5124:case 35670:return Ug;case 35667:case 35671:return Fg;case 35668:case 35672:return Og;case 35669:case 35673:return Bg;case 5125:return kg;case 36294:return zg;case 36295:return Vg;case 36296:return Gg;case 35678:case 36198:case 36298:case 36306:case 35682:return Hg;case 35679:case 36299:case 36307:return Wg;case 35680:case 36300:case 36308:case 36293:return Xg;case 36289:case 36303:case 36311:case 36292:return qg}}function Kg(i,t){i.uniform1fv(this.addr,t)}function Zg(i,t){const e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function Jg(i,t){const e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function $g(i,t){const e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function Qg(i,t){const e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function jg(i,t){const e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function tv(i,t){const e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ev(i,t){i.uniform1iv(this.addr,t)}function nv(i,t){i.uniform2iv(this.addr,t)}function iv(i,t){i.uniform3iv(this.addr,t)}function sv(i,t){i.uniform4iv(this.addr,t)}function rv(i,t){i.uniform1uiv(this.addr,t)}function av(i,t){i.uniform2uiv(this.addr,t)}function ov(i,t){i.uniform3uiv(this.addr,t)}function lv(i,t){i.uniform4uiv(this.addr,t)}function cv(i,t,e){const n=this.cache,s=t.length,r=kr(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Bo:a=fu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function hv(i,t,e){const n=this.cache,s=t.length,r=kr(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||mu,r[a])}function uv(i,t,e){const n=this.cache,s=t.length,r=kr(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||gu,r[a])}function dv(i,t,e){const n=this.cache,s=t.length,r=kr(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||pu,r[a])}function fv(i){switch(i){case 5126:return Kg;case 35664:return Zg;case 35665:return Jg;case 35666:return $g;case 35674:return Qg;case 35675:return jg;case 35676:return tv;case 5124:case 35670:return ev;case 35667:case 35671:return nv;case 35668:case 35672:return iv;case 35669:case 35673:return sv;case 5125:return rv;case 36294:return av;case 36295:return ov;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return cv;case 35679:case 36299:case 36307:return hv;case 35680:case 36300:case 36308:case 36293:return uv;case 36289:case 36303:case 36311:case 36292:return dv}}class pv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Yg(e.type)}}class mv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=fv(e.type)}}class gv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Sa=/(\w+)(\])?(\[|\.)?/g;function qc(i,t){i.seq.push(t),i.map[t.id]=t}function vv(i,t,e){const n=i.name,s=n.length;for(Sa.lastIndex=0;;){const r=Sa.exec(n),a=Sa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){qc(e,c===void 0?new pv(o,i,t):new mv(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new gv(o),qc(e,d)),e=d}}}class vr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);vv(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Yc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const _v=37297;let xv=0;function Mv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Kc=new Xt;function yv(i){te._getMatrix(Kc,te.workingColorSpace,i);const t=`mat3( ${Kc.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case Rr:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Zc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Mv(i.getShaderSource(t),o)}else return r}function bv(i,t){const e=yv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Sv={[Lh]:"Linear",[Ih]:"Reinhard",[Dh]:"Cineon",[Zo]:"ACESFilmic",[Uh]:"AgX",[Fh]:"Neutral",[Nh]:"Custom"};function wv(i,t){const e=Sv[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const sr=new L;function Ev(){te.getLuminanceCoefficients(sr);const i=sr.x.toFixed(4),t=sr.y.toFixed(4),e=sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ms).join(`
`)}function Av(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ms(i){return i!==""}function Jc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $c(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Cv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ko(i){return i.replace(Cv,Lv)}const Pv=new Map;function Lv(i,t){let e=Zt[t];if(e===void 0){const n=Pv.get(t);if(n!==void 0)e=Zt[n],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ko(e)}const Iv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qc(i){return i.replace(Iv,Dv)}function Dv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function jc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const Nv={[dr]:"SHADOWMAP_TYPE_PCF",[fs]:"SHADOWMAP_TYPE_VSM"};function Uv(i){return Nv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Fv={[di]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Ur]:"ENVMAP_TYPE_CUBE_UV"};function Ov(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Fv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Bv={[Ki]:"ENVMAP_MODE_REFRACTION"};function kv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Bv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const zv={[Ko]:"ENVMAP_BLENDING_MULTIPLY",[Cd]:"ENVMAP_BLENDING_MIX",[Pd]:"ENVMAP_BLENDING_ADD"};function Vv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":zv[i.combine]||"ENVMAP_BLENDING_NONE"}function Gv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Hv(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Uv(e),c=Ov(e),h=kv(e),d=Vv(e),u=Gv(e),f=Tv(e),m=Av(r),y=s.createProgram();let g,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ms).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ms).join(`
`),p.length>0&&(p+=`
`)):(g=[jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ms).join(`
`),p=[jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==pn?"#define TONE_MAPPING":"",e.toneMapping!==pn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==pn?wv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,bv("linearToOutputTexel",e.outputColorSpace),Ev(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ms).join(`
`)),a=ko(a),a=Jc(a,e),a=$c(a,e),o=ko(o),o=Jc(o,e),o=$c(o,e),a=Qc(a),o=Qc(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===$l?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const A=E+g+a,x=E+p+o,R=Yc(s,s.VERTEX_SHADER,A),T=Yc(s,s.FRAGMENT_SHADER,x);s.attachShader(y,R),s.attachShader(y,T),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function P(S){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(y)||"",B=s.getShaderInfoLog(R)||"",X=s.getShaderInfoLog(T)||"",U=I.trim(),G=B.trim(),z=X.trim();let J=!0,it=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,R,T);else{const ht=Zc(s,R,"vertex"),ct=Zc(s,T,"fragment");jt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+U+`
`+ht+`
`+ct)}else U!==""?Vt("WebGLProgram: Program Info Log:",U):(G===""||z==="")&&(it=!1);it&&(S.diagnostics={runnable:J,programLog:U,vertexShader:{log:G,prefix:g},fragmentShader:{log:z,prefix:p}})}s.deleteShader(R),s.deleteShader(T),_=new vr(s,y),M=Rv(s,y)}let _;this.getUniforms=function(){return _===void 0&&P(this),_};let M;this.getAttributes=function(){return M===void 0&&P(this),M};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(y,_v)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xv++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=T,this}let Wv=0;class Xv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new qv(t),e.set(t,n)),n}}class qv{constructor(t){this.id=Wv++,this.code=t,this.usedTimes=0}}function Yv(i){return i===fi||i===wr||i===Er}function Kv(i,t,e,n,s,r){const a=new ol,o=new Xv,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function y(_,M,w,S,I,B){const X=S.fog,U=I.geometry,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?S.environment:null,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,J=t.get(_.envMap||G,z),it=J&&J.mapping===Ur?J.image.height:null,ht=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Vt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const ct=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,xt=ct!==void 0?ct.length:0;let Ht=0;U.morphAttributes.position!==void 0&&(Ht=1),U.morphAttributes.normal!==void 0&&(Ht=2),U.morphAttributes.color!==void 0&&(Ht=3);let ie,Kt,Z,ot;if(ht){const At=dn[ht];ie=At.vertexShader,Kt=At.fragmentShader}else{ie=_.vertexShader,Kt=_.fragmentShader;const At=o.getVertexShaderStage(_),me=o.getFragmentShaderStage(_);o.update(_,At,me),Z=At.id,ot=me.id}const st=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Ot=I.isInstancedMesh===!0,Lt=I.isBatchedMesh===!0,zt=!!_.map,Ct=!!_.matcap,j=!!J,et=!!_.aoMap,tt=!!_.lightMap,ut=!!_.bumpMap&&_.wireframe===!1,at=!!_.normalMap,Tt=!!_.displacementMap,St=!!_.emissiveMap,Gt=!!_.metalnessMap,Wt=!!_.roughnessMap,D=_.anisotropy>0,ae=_.clearcoat>0,Qt=_.dispersion>0,C=_.iridescence>0,v=_.sheen>0,k=_.transmission>0,W=D&&!!_.anisotropyMap,Y=ae&&!!_.clearcoatMap,lt=ae&&!!_.clearcoatNormalMap,dt=ae&&!!_.clearcoatRoughnessMap,K=C&&!!_.iridescenceMap,Q=C&&!!_.iridescenceThicknessMap,pt=v&&!!_.sheenColorMap,Nt=v&&!!_.sheenRoughnessMap,vt=!!_.specularMap,mt=!!_.specularColorMap,Bt=!!_.specularIntensityMap,kt=k&&!!_.transmissionMap,qt=k&&!!_.thicknessMap,F=!!_.gradientMap,ft=!!_.alphaMap,$=_.alphaTest>0,gt=!!_.alphaHash,bt=!!_.extensions;let nt=pn;_.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(nt=i.toneMapping);const It={shaderID:ht,shaderType:_.type,shaderName:_.name,vertexShader:ie,fragmentShader:Kt,defines:_.defines,customVertexShaderID:Z,customFragmentShaderID:ot,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Lt,batchingColor:Lt&&I._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&I.instanceColor!==null,instancingMorph:Ot&&I.morphTexture!==null,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:te.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:zt,matcap:Ct,envMap:j,envMapMode:j&&J.mapping,envMapCubeUVHeight:it,aoMap:et,lightMap:tt,bumpMap:ut,normalMap:at,displacementMap:Tt,emissiveMap:St,normalMapObjectSpace:at&&_.normalMapType===Dd,normalMapTangentSpace:at&&_.normalMapType===Tr,packedNormalMap:at&&_.normalMapType===Tr&&Yv(_.normalMap.format),metalnessMap:Gt,roughnessMap:Wt,anisotropy:D,anisotropyMap:W,clearcoat:ae,clearcoatMap:Y,clearcoatNormalMap:lt,clearcoatRoughnessMap:dt,dispersion:Qt,iridescence:C,iridescenceMap:K,iridescenceThicknessMap:Q,sheen:v,sheenColorMap:pt,sheenRoughnessMap:Nt,specularMap:vt,specularColorMap:mt,specularIntensityMap:Bt,transmission:k,transmissionMap:kt,thicknessMap:qt,gradientMap:F,opaque:_.transparent===!1&&_.blending===hi&&_.alphaToCoverage===!1,alphaMap:ft,alphaTest:$,alphaHash:gt,combine:_.combine,mapUv:zt&&m(_.map.channel),aoMapUv:et&&m(_.aoMap.channel),lightMapUv:tt&&m(_.lightMap.channel),bumpMapUv:ut&&m(_.bumpMap.channel),normalMapUv:at&&m(_.normalMap.channel),displacementMapUv:Tt&&m(_.displacementMap.channel),emissiveMapUv:St&&m(_.emissiveMap.channel),metalnessMapUv:Gt&&m(_.metalnessMap.channel),roughnessMapUv:Wt&&m(_.roughnessMap.channel),anisotropyMapUv:W&&m(_.anisotropyMap.channel),clearcoatMapUv:Y&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:lt&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&m(_.sheenRoughnessMap.channel),specularMapUv:vt&&m(_.specularMap.channel),specularColorMapUv:mt&&m(_.specularColorMap.channel),specularIntensityMapUv:Bt&&m(_.specularIntensityMap.channel),transmissionMapUv:kt&&m(_.transmissionMap.channel),thicknessMapUv:qt&&m(_.thicknessMap.channel),alphaMapUv:ft&&m(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(at||D),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!U.attributes.uv&&(zt||ft),fog:!!X,useFog:_.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&at===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Rt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Ht,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:nt,decodeVideoTexture:zt&&_.map.isVideoTexture===!0&&te.getTransfer(_.map.colorSpace)===re,decodeVideoTextureEmissive:St&&_.emissiveMap.isVideoTexture===!0&&te.getTransfer(_.emissiveMap.colorSpace)===re,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Tn,flipSided:_.side===Ne,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:bt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&_.extensions.multiDraw===!0||Lt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return It.vertexUv1s=l.has(1),It.vertexUv2s=l.has(2),It.vertexUv3s=l.has(3),l.clear(),It}function g(_){const M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(const w in _.defines)M.push(w),M.push(_.defines[w]);return _.isRawShaderMaterial===!1&&(p(M,_),E(M,_),M.push(i.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function p(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function E(_,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function A(_){const M=f[_.type];let w;if(M){const S=dn[M];w=fp.clone(S.uniforms)}else w=_.uniforms;return w}function x(_,M){let w=h.get(M);return w!==void 0?++w.usedTimes:(w=new Hv(i,M,_,s),c.push(w),h.set(M,w)),w}function R(_){if(--_.usedTimes===0){const M=c.indexOf(_);c[M]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function P(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:A,acquireProgram:x,releaseProgram:R,releaseShaderCache:T,programs:c,dispose:P}}function Zv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Jv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function th(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function eh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,y,g,p){let E=i[t];return E===void 0?(E={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:g,group:p},i[t]=E):(E.id=u.id,E.object=u,E.geometry=f,E.material=m,E.materialVariant=a(u),E.groupOrder=y,E.renderOrder=u.renderOrder,E.z=g,E.group=p),t++,E}function l(u,f,m,y,g,p){const E=o(u,f,m,y,g,p);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):e.push(E)}function c(u,f,m,y,g,p){const E=o(u,f,m,y,g,p);m.transmission>0?n.unshift(E):m.transparent===!0?s.unshift(E):e.unshift(E)}function h(u,f,m){e.length>1&&e.sort(u||Jv),n.length>1&&n.sort(f||th),s.length>1&&s.sort(f||th),m&&(e.reverse(),n.reverse(),s.reverse())}function d(){for(let u=t,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function $v(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new eh,i.set(n,[a])):s>=r.length?(a=new eh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Qv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Dt};break;case"SpotLight":e={position:new L,direction:new L,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function jv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let t_=0;function e_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function n_(i){const t=new Qv,e=jv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new ne,a=new ne;function o(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,E=0,A=0,x=0,R=0,T=0,P=0;c.sort(e_);for(let M=0,w=c.length;M<w;M++){const S=c[M],I=S.color,B=S.intensity,X=S.distance;let U=null;if(S.shadow&&S.shadow.map&&(S.shadow.map.texture.format===fi?U=S.shadow.map.texture:U=S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)h+=I.r*B,d+=I.g*B,u+=I.b*B;else if(S.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(S.sh.coefficients[G],B);P++}else if(S.isDirectionalLight){const G=t.get(S);if(G.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const z=S.shadow,J=e.get(S);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=S.shadow.matrix,E++}n.directional[f]=G,f++}else if(S.isSpotLight){const G=t.get(S);G.position.setFromMatrixPosition(S.matrixWorld),G.color.copy(I).multiplyScalar(B),G.distance=X,G.coneCos=Math.cos(S.angle),G.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),G.decay=S.decay,n.spot[y]=G;const z=S.shadow;if(S.map&&(n.spotLightMap[R]=S.map,R++,z.updateMatrices(S),S.castShadow&&T++),n.spotLightMatrix[y]=z.matrix,S.castShadow){const J=e.get(S);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,n.spotShadow[y]=J,n.spotShadowMap[y]=U,x++}y++}else if(S.isRectAreaLight){const G=t.get(S);G.color.copy(I).multiplyScalar(B),G.halfWidth.set(S.width*.5,0,0),G.halfHeight.set(0,S.height*.5,0),n.rectArea[g]=G,g++}else if(S.isPointLight){const G=t.get(S);if(G.color.copy(S.color).multiplyScalar(S.intensity),G.distance=S.distance,G.decay=S.decay,S.castShadow){const z=S.shadow,J=e.get(S);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,J.shadowCameraNear=z.camera.near,J.shadowCameraFar=z.camera.far,n.pointShadow[m]=J,n.pointShadowMap[m]=U,n.pointShadowMatrix[m]=S.shadow.matrix,A++}n.point[m]=G,m++}else if(S.isHemisphereLight){const G=t.get(S);G.skyColor.copy(S.color).multiplyScalar(B),G.groundColor.copy(S.groundColor).multiplyScalar(B),n.hemi[p]=G,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const _=n.hash;(_.directionalLength!==f||_.pointLength!==m||_.spotLength!==y||_.rectAreaLength!==g||_.hemiLength!==p||_.numDirectionalShadows!==E||_.numPointShadows!==A||_.numSpotShadows!==x||_.numSpotMaps!==R||_.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=x+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,_.directionalLength=f,_.pointLength=m,_.spotLength=y,_.rectAreaLength=g,_.hemiLength=p,_.numDirectionalShadows=E,_.numPointShadows=A,_.numSpotShadows=x,_.numSpotMaps=R,_.numLightProbes=P,n.version=t_++)}function l(c,h){let d=0,u=0,f=0,m=0,y=0;const g=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const A=c[p];if(A.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),d++}else if(A.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(A.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(A.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(A.width*.5,0,0),x.halfHeight.set(0,A.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(A.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(g),u++}else if(A.isHemisphereLight){const x=n.hemi[y];x.direction.setFromMatrixPosition(A.matrixWorld),x.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:n}}function nh(i){const t=new n_(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function i_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new nh(i),t.set(s,[o])):r>=a.length?(o=new nh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const s_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r_=`uniform sampler2D shadow_pass;
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
}`,a_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],o_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],ih=new ne,hs=new L,wa=new L;function l_(i,t,e){let n=new hl;const s=new rt,r=new rt,a=new fe,o=new _p,l=new xp,c={},h=e.maxTextureSize,d={[Jn]:Ne,[Ne]:Jn,[Tn]:Tn},u=new Ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:s_,fragmentShader:r_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new be;m.setAttribute("position",new we(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new de(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dr;let p=this.type;this.render=function(T,P,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===hd&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=dr);const M=i.getRenderTarget(),w=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Cn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const B=p!==this.type;B&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(U=>U.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,U=T.length;X<U;X++){const G=T[X],z=G.shadow;if(z===void 0){Vt("WebGLShadowMap:",G,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const J=z.getFrameExtents();s.multiply(J),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,z.mapSize.y=r.y));const it=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=it,z.map===null||B===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===fs){if(G.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new mn(s.x,s.y,{format:fi,type:In,minFilter:De,magFilter:De,generateMipmaps:!1}),z.map.texture.name=G.name+".shadowMap",z.map.depthTexture=new Zi(s.x,s.y,tn),z.map.depthTexture.name=G.name+".shadowMapDepth",z.map.depthTexture.format=Dn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ce,z.map.depthTexture.magFilter=Ce}else G.isPointLight?(z.map=new du(s.x),z.map.depthTexture=new Df(s.x,gn)):(z.map=new mn(s.x,s.y),z.map.depthTexture=new Zi(s.x,s.y,gn)),z.map.depthTexture.name=G.name+".shadowMap",z.map.depthTexture.format=Dn,this.type===dr?(z.map.depthTexture.compareFunction=it?sl:il,z.map.depthTexture.minFilter=De,z.map.depthTexture.magFilter=De):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ce,z.map.depthTexture.magFilter=Ce);z.camera.updateProjectionMatrix()}const ht=z.map.isWebGLCubeRenderTarget?6:1;for(let ct=0;ct<ht;ct++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,ct),i.clear();else{ct===0&&(i.setRenderTarget(z.map),i.clear());const xt=z.getViewport(ct);a.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),I.viewport(a)}if(G.isPointLight){const xt=z.camera,Ht=z.matrix,ie=G.distance||xt.far;ie!==xt.far&&(xt.far=ie,xt.updateProjectionMatrix()),hs.setFromMatrixPosition(G.matrixWorld),xt.position.copy(hs),wa.copy(xt.position),wa.add(a_[ct]),xt.up.copy(o_[ct]),xt.lookAt(wa),xt.updateMatrixWorld(),Ht.makeTranslation(-hs.x,-hs.y,-hs.z),ih.multiplyMatrices(xt.projectionMatrix,xt.matrixWorldInverse),z._frustum.setFromProjectionMatrix(ih,xt.coordinateSystem,xt.reversedDepth)}else z.updateMatrices(G);n=z.getFrustum(),x(P,_,z.camera,G,this.type)}z.isPointLightShadow!==!0&&this.type===fs&&E(z,_),z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(M,w,S)};function E(T,P){const _=t.update(y);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new mn(s.x,s.y,{format:fi,type:In})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(P,null,_,u,y,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(P,null,_,f,y,null)}function A(T,P,_,M){let w=null;const S=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(S!==void 0)w=S;else if(w=_.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const I=w.uuid,B=P.uuid;let X=c[I];X===void 0&&(X={},c[I]=X);let U=X[B];U===void 0&&(U=w.clone(),X[B]=U,P.addEventListener("dispose",R)),w=U}if(w.visible=P.visible,w.wireframe=P.wireframe,M===fs?w.side=P.shadowSide!==null?P.shadowSide:P.side:w.side=P.shadowSide!==null?P.shadowSide:d[P.side],w.alphaMap=P.alphaMap,w.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,w.map=P.map,w.clipShadows=P.clipShadows,w.clippingPlanes=P.clippingPlanes,w.clipIntersection=P.clipIntersection,w.displacementMap=P.displacementMap,w.displacementScale=P.displacementScale,w.displacementBias=P.displacementBias,w.wireframeLinewidth=P.wireframeLinewidth,w.linewidth=P.linewidth,_.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const I=i.properties.get(w);I.light=_}return w}function x(T,P,_,M,w){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===fs)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);const B=t.update(T),X=T.material;if(Array.isArray(X)){const U=B.groups;for(let G=0,z=U.length;G<z;G++){const J=U[G],it=X[J.materialIndex];if(it&&it.visible){const ht=A(T,it,M,w);T.onBeforeShadow(i,T,P,_,B,ht,J),i.renderBufferDirect(_,null,B,ht,T,J),T.onAfterShadow(i,T,P,_,B,ht,J)}}}else if(X.visible){const U=A(T,X,M,w);T.onBeforeShadow(i,T,P,_,B,U,null),i.renderBufferDirect(_,null,B,U,T,null),T.onAfterShadow(i,T,P,_,B,U,null)}}const I=T.children;for(let B=0,X=I.length;B<X;B++)x(I[B],P,_,M,w)}function R(T){T.target.removeEventListener("dispose",R);for(const _ in c){const M=c[_],w=T.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function c_(i,t){function e(){let F=!1;const ft=new fe;let $=null;const gt=new fe(0,0,0,0);return{setMask:function(bt){$!==bt&&!F&&(i.colorMask(bt,bt,bt,bt),$=bt)},setLocked:function(bt){F=bt},setClear:function(bt,nt,It,At,me){me===!0&&(bt*=At,nt*=At,It*=At),ft.set(bt,nt,It,At),gt.equals(ft)===!1&&(i.clearColor(bt,nt,It,At),gt.copy(ft))},reset:function(){F=!1,$=null,gt.set(-1,0,0,0)}}}function n(){let F=!1,ft=!1,$=null,gt=null,bt=null;return{setReversed:function(nt){if(ft!==nt){const It=t.get("EXT_clip_control");nt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),ft=nt;const At=bt;bt=null,this.setClear(At)}},getReversed:function(){return ft},setTest:function(nt){nt?st(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(nt){$!==nt&&!F&&(i.depthMask(nt),$=nt)},setFunc:function(nt){if(ft&&(nt=Hd[nt]),gt!==nt){switch(nt){case qa:i.depthFunc(i.NEVER);break;case Ya:i.depthFunc(i.ALWAYS);break;case Ka:i.depthFunc(i.LESS);break;case Yi:i.depthFunc(i.LEQUAL);break;case Za:i.depthFunc(i.EQUAL);break;case Ja:i.depthFunc(i.GEQUAL);break;case $a:i.depthFunc(i.GREATER);break;case Qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}gt=nt}},setLocked:function(nt){F=nt},setClear:function(nt){bt!==nt&&(bt=nt,ft&&(nt=1-nt),i.clearDepth(nt))},reset:function(){F=!1,$=null,gt=null,bt=null,ft=!1}}}function s(){let F=!1,ft=null,$=null,gt=null,bt=null,nt=null,It=null,At=null,me=null;return{setTest:function(he){F||(he?st(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(he){ft!==he&&!F&&(i.stencilMask(he),ft=he)},setFunc:function(he,sn,rn){($!==he||gt!==sn||bt!==rn)&&(i.stencilFunc(he,sn,rn),$=he,gt=sn,bt=rn)},setOp:function(he,sn,rn){(nt!==he||It!==sn||At!==rn)&&(i.stencilOp(he,sn,rn),nt=he,It=sn,At=rn)},setLocked:function(he){F=he},setClear:function(he){me!==he&&(i.clearStencil(he),me=he)},reset:function(){F=!1,ft=null,$=null,gt=null,bt=null,nt=null,It=null,At=null,me=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,E=null,A=null,x=null,R=null,T=null,P=null,_=new Dt(0,0,0),M=0,w=!1,S=null,I=null,B=null,X=null,U=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,J=0;const it=i.getParameter(i.VERSION);it.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(it)[1]),z=J>=1):it.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),z=J>=2);let ht=null,ct={};const xt=i.getParameter(i.SCISSOR_BOX),Ht=i.getParameter(i.VIEWPORT),ie=new fe().fromArray(xt),Kt=new fe().fromArray(Ht);function Z(F,ft,$,gt){const bt=new Uint8Array(4),nt=i.createTexture();i.bindTexture(F,nt),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let It=0;It<$;It++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,gt,0,i.RGBA,i.UNSIGNED_BYTE,bt):i.texImage2D(ft+It,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,bt);return nt}const ot={};ot[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),ot[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ot[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(i.DEPTH_TEST),a.setFunc(Yi),ut(!1),at(ql),st(i.CULL_FACE),et(Cn);function st(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function Rt(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function Ot(F,ft){return u[F]!==ft?(i.bindFramebuffer(F,ft),u[F]=ft,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function Lt(F,ft){let $=m,gt=!1;if(F){$=f.get(ft),$===void 0&&($=[],f.set(ft,$));const bt=F.textures;if($.length!==bt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let nt=0,It=bt.length;nt<It;nt++)$[nt]=i.COLOR_ATTACHMENT0+nt;$.length=bt.length,gt=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,gt=!0);gt&&i.drawBuffers($)}function zt(F){return y!==F?(i.useProgram(F),y=F,!0):!1}const Ct={[ai]:i.FUNC_ADD,[dd]:i.FUNC_SUBTRACT,[fd]:i.FUNC_REVERSE_SUBTRACT};Ct[pd]=i.MIN,Ct[md]=i.MAX;const j={[gd]:i.ZERO,[vd]:i.ONE,[_d]:i.SRC_COLOR,[Wa]:i.SRC_ALPHA,[wd]:i.SRC_ALPHA_SATURATE,[bd]:i.DST_COLOR,[Md]:i.DST_ALPHA,[xd]:i.ONE_MINUS_SRC_COLOR,[Xa]:i.ONE_MINUS_SRC_ALPHA,[Sd]:i.ONE_MINUS_DST_COLOR,[yd]:i.ONE_MINUS_DST_ALPHA,[Ed]:i.CONSTANT_COLOR,[Td]:i.ONE_MINUS_CONSTANT_COLOR,[Ad]:i.CONSTANT_ALPHA,[Rd]:i.ONE_MINUS_CONSTANT_ALPHA};function et(F,ft,$,gt,bt,nt,It,At,me,he){if(F===Cn){g===!0&&(Rt(i.BLEND),g=!1);return}if(g===!1&&(st(i.BLEND),g=!0),F!==ud){if(F!==p||he!==w){if((E!==ai||R!==ai)&&(i.blendEquation(i.FUNC_ADD),E=ai,R=ai),he)switch(F){case hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ha:i.blendFunc(i.ONE,i.ONE);break;case Yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:jt("WebGLState: Invalid blending: ",F);break}else switch(F){case hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ha:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Yl:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kl:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",F);break}A=null,x=null,T=null,P=null,_.set(0,0,0),M=0,p=F,w=he}return}bt=bt||ft,nt=nt||$,It=It||gt,(ft!==E||bt!==R)&&(i.blendEquationSeparate(Ct[ft],Ct[bt]),E=ft,R=bt),($!==A||gt!==x||nt!==T||It!==P)&&(i.blendFuncSeparate(j[$],j[gt],j[nt],j[It]),A=$,x=gt,T=nt,P=It),(At.equals(_)===!1||me!==M)&&(i.blendColor(At.r,At.g,At.b,me),_.copy(At),M=me),p=F,w=!1}function tt(F,ft){F.side===Tn?Rt(i.CULL_FACE):st(i.CULL_FACE);let $=F.side===Ne;ft&&($=!$),ut($),F.blending===hi&&F.transparent===!1?et(Cn):et(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const gt=F.stencilWrite;o.setTest(gt),gt&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),St(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ut(F){S!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),S=F)}function at(F){F!==ld?(st(i.CULL_FACE),F!==I&&(F===ql?i.cullFace(i.BACK):F===cd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),I=F}function Tt(F){F!==B&&(z&&i.lineWidth(F),B=F)}function St(F,ft,$){F?(st(i.POLYGON_OFFSET_FILL),(X!==ft||U!==$)&&(X=ft,U=$,a.getReversed()&&(ft=-ft),i.polygonOffset(ft,$))):Rt(i.POLYGON_OFFSET_FILL)}function Gt(F){F?st(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function Wt(F){F===void 0&&(F=i.TEXTURE0+G-1),ht!==F&&(i.activeTexture(F),ht=F)}function D(F,ft,$){$===void 0&&(ht===null?$=i.TEXTURE0+G-1:$=ht);let gt=ct[$];gt===void 0&&(gt={type:void 0,texture:void 0},ct[$]=gt),(gt.type!==F||gt.texture!==ft)&&(ht!==$&&(i.activeTexture($),ht=$),i.bindTexture(F,ft||ot[F]),gt.type=F,gt.texture=ft)}function ae(){const F=ct[ht];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Qt(){try{i.compressedTexImage2D(...arguments)}catch(F){jt("WebGLState:",F)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(F){jt("WebGLState:",F)}}function v(){try{i.texSubImage2D(...arguments)}catch(F){jt("WebGLState:",F)}}function k(){try{i.texSubImage3D(...arguments)}catch(F){jt("WebGLState:",F)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(F){jt("WebGLState:",F)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(F){jt("WebGLState:",F)}}function lt(){try{i.texStorage2D(...arguments)}catch(F){jt("WebGLState:",F)}}function dt(){try{i.texStorage3D(...arguments)}catch(F){jt("WebGLState:",F)}}function K(){try{i.texImage2D(...arguments)}catch(F){jt("WebGLState:",F)}}function Q(){try{i.texImage3D(...arguments)}catch(F){jt("WebGLState:",F)}}function pt(F){return d[F]!==void 0?d[F]:i.getParameter(F)}function Nt(F,ft){d[F]!==ft&&(i.pixelStorei(F,ft),d[F]=ft)}function vt(F){ie.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),ie.copy(F))}function mt(F){Kt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Kt.copy(F))}function Bt(F,ft){let $=c.get(ft);$===void 0&&($=new WeakMap,c.set(ft,$));let gt=$.get(F);gt===void 0&&(gt=i.getUniformBlockIndex(ft,F.name),$.set(F,gt))}function kt(F,ft){const gt=c.get(ft).get(F);l.get(ft)!==gt&&(i.uniformBlockBinding(ft,gt,F.__bindingPointIndex),l.set(ft,gt))}function qt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ht=null,ct={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,E=null,A=null,x=null,R=null,T=null,P=null,_=new Dt(0,0,0),M=0,w=!1,S=null,I=null,B=null,X=null,U=null,ie.set(0,0,i.canvas.width,i.canvas.height),Kt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:st,disable:Rt,bindFramebuffer:Ot,drawBuffers:Lt,useProgram:zt,setBlending:et,setMaterial:tt,setFlipSided:ut,setCullFace:at,setLineWidth:Tt,setPolygonOffset:St,setScissorTest:Gt,activeTexture:Wt,bindTexture:D,unbindTexture:ae,compressedTexImage2D:Qt,compressedTexImage3D:C,texImage2D:K,texImage3D:Q,pixelStorei:Nt,getParameter:pt,updateUBOMapping:Bt,uniformBlockBinding:kt,texStorage2D:lt,texStorage3D:dt,texSubImage2D:v,texSubImage3D:k,compressedTexSubImage2D:W,compressedTexSubImage3D:Y,scissor:vt,viewport:mt,reset:qt}}function h_(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,v){return m?new OffscreenCanvas(C,v):Cr("canvas")}function g(C,v,k){let W=1;const Y=Qt(C);if((Y.width>k||Y.height>k)&&(W=k/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const lt=Math.floor(W*Y.width),dt=Math.floor(W*Y.height);u===void 0&&(u=y(lt,dt));const K=v?y(lt,dt):u;return K.width=lt,K.height=dt,K.getContext("2d").drawImage(C,0,0,lt,dt),Vt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+lt+"x"+dt+")."),K}else return"data"in C&&Vt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),C;return C}function p(C){return C.generateMipmaps}function E(C){i.generateMipmap(C)}function A(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(C,v,k,W,Y,lt=!1){if(C!==null){if(i[C]!==void 0)return i[C];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let dt;W&&(dt=t.get("EXT_texture_norm16"),dt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=v;if(v===i.RED&&(k===i.FLOAT&&(K=i.R32F),k===i.HALF_FLOAT&&(K=i.R16F),k===i.UNSIGNED_BYTE&&(K=i.R8),k===i.UNSIGNED_SHORT&&dt&&(K=dt.R16_EXT),k===i.SHORT&&dt&&(K=dt.R16_SNORM_EXT)),v===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.R8UI),k===i.UNSIGNED_SHORT&&(K=i.R16UI),k===i.UNSIGNED_INT&&(K=i.R32UI),k===i.BYTE&&(K=i.R8I),k===i.SHORT&&(K=i.R16I),k===i.INT&&(K=i.R32I)),v===i.RG&&(k===i.FLOAT&&(K=i.RG32F),k===i.HALF_FLOAT&&(K=i.RG16F),k===i.UNSIGNED_BYTE&&(K=i.RG8),k===i.UNSIGNED_SHORT&&dt&&(K=dt.RG16_EXT),k===i.SHORT&&dt&&(K=dt.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RG8UI),k===i.UNSIGNED_SHORT&&(K=i.RG16UI),k===i.UNSIGNED_INT&&(K=i.RG32UI),k===i.BYTE&&(K=i.RG8I),k===i.SHORT&&(K=i.RG16I),k===i.INT&&(K=i.RG32I)),v===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGB8UI),k===i.UNSIGNED_SHORT&&(K=i.RGB16UI),k===i.UNSIGNED_INT&&(K=i.RGB32UI),k===i.BYTE&&(K=i.RGB8I),k===i.SHORT&&(K=i.RGB16I),k===i.INT&&(K=i.RGB32I)),v===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),k===i.UNSIGNED_INT&&(K=i.RGBA32UI),k===i.BYTE&&(K=i.RGBA8I),k===i.SHORT&&(K=i.RGBA16I),k===i.INT&&(K=i.RGBA32I)),v===i.RGB&&(k===i.UNSIGNED_SHORT&&dt&&(K=dt.RGB16_EXT),k===i.SHORT&&dt&&(K=dt.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),v===i.RGBA){const Q=lt?Rr:te.getTransfer(Y);k===i.FLOAT&&(K=i.RGBA32F),k===i.HALF_FLOAT&&(K=i.RGBA16F),k===i.UNSIGNED_BYTE&&(K=Q===re?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&dt&&(K=dt.RGBA16_EXT),k===i.SHORT&&dt&&(K=dt.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function R(C,v){let k;return C?v===null||v===gn||v===bs?k=i.DEPTH24_STENCIL8:v===tn?k=i.DEPTH32F_STENCIL8:v===ys&&(k=i.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===gn||v===bs?k=i.DEPTH_COMPONENT24:v===tn?k=i.DEPTH_COMPONENT32F:v===ys&&(k=i.DEPTH_COMPONENT16),k}function T(C,v){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ce&&C.minFilter!==De?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function P(C){const v=C.target;v.removeEventListener("dispose",P),M(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function _(C){const v=C.target;v.removeEventListener("dispose",_),S(v)}function M(C){const v=n.get(C);if(v.__webglInit===void 0)return;const k=C.source,W=f.get(k);if(W){const Y=W[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&w(C),Object.keys(W).length===0&&f.delete(k)}n.remove(C)}function w(C){const v=n.get(C);i.deleteTexture(v.__webglTexture);const k=C.source,W=f.get(k);delete W[v.__cacheKey],a.memory.textures--}function S(C){const v=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let Y=0;Y<v.__webglFramebuffer[W].length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[W][Y]);else i.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)i.deleteFramebuffer(v.__webglFramebuffer[W]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const k=C.textures;for(let W=0,Y=k.length;W<Y;W++){const lt=n.get(k[W]);lt.__webglTexture&&(i.deleteTexture(lt.__webglTexture),a.memory.textures--),n.remove(k[W])}n.remove(C)}let I=0;function B(){I=0}function X(){return I}function U(C){I=C}function G(){const C=I;return C>=s.maxTextures&&Vt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function z(C){const v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function J(C,v){const k=n.get(C);if(C.isVideoTexture&&D(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){const W=C.image;if(W===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{Rt(k,C,v);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+v)}function it(C,v){const k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){Rt(k,C,v);return}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+v)}function ht(C,v){const k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){Rt(k,C,v);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+v)}function ct(C,v){const k=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&k.__version!==C.version){Ot(k,C,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+v)}const xt={[ja]:i.REPEAT,[An]:i.CLAMP_TO_EDGE,[to]:i.MIRRORED_REPEAT},Ht={[Ce]:i.NEAREST,[Ld]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[De]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},ie={[Nd]:i.NEVER,[kd]:i.ALWAYS,[Ud]:i.LESS,[il]:i.LEQUAL,[Fd]:i.EQUAL,[sl]:i.GEQUAL,[Od]:i.GREATER,[Bd]:i.NOTEQUAL};function Kt(C,v){if(v.type===tn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===De||v.magFilter===qr||v.magFilter===Is||v.magFilter===li||v.minFilter===De||v.minFilter===qr||v.minFilter===Is||v.minFilter===li)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,xt[v.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,xt[v.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,xt[v.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Ht[v.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Ht[v.minFilter]),v.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,ie[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ce||v.minFilter!==Is&&v.minFilter!==li||v.type===tn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Z(C,v){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",P));const W=v.source;let Y=f.get(W);Y===void 0&&(Y={},f.set(W,Y));const lt=z(v);if(lt!==C.__cacheKey){Y[lt]===void 0&&(Y[lt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Y[lt].usedTimes++;const dt=Y[C.__cacheKey];dt!==void 0&&(Y[C.__cacheKey].usedTimes--,dt.usedTimes===0&&w(v)),C.__cacheKey=lt,C.__webglTexture=Y[lt].texture}return k}function ot(C,v,k){return Math.floor(Math.floor(C/k)/v)}function st(C,v,k,W){const lt=C.updateRanges;if(lt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,k,W,v.data);else{lt.sort((Nt,vt)=>Nt.start-vt.start);let dt=0;for(let Nt=1;Nt<lt.length;Nt++){const vt=lt[dt],mt=lt[Nt],Bt=vt.start+vt.count,kt=ot(mt.start,v.width,4),qt=ot(vt.start,v.width,4);mt.start<=Bt+1&&kt===qt&&ot(mt.start+mt.count-1,v.width,4)===kt?vt.count=Math.max(vt.count,mt.start+mt.count-vt.start):(++dt,lt[dt]=mt)}lt.length=dt+1;const K=e.getParameter(i.UNPACK_ROW_LENGTH),Q=e.getParameter(i.UNPACK_SKIP_PIXELS),pt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Nt=0,vt=lt.length;Nt<vt;Nt++){const mt=lt[Nt],Bt=Math.floor(mt.start/4),kt=Math.ceil(mt.count/4),qt=Bt%v.width,F=Math.floor(Bt/v.width),ft=kt,$=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,qt),e.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,qt,F,ft,$,k,W,v.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,K),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(i.UNPACK_SKIP_ROWS,pt)}}function Rt(C,v,k){let W=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=i.TEXTURE_3D);const Y=Z(C,v),lt=v.source;e.bindTexture(W,C.__webglTexture,i.TEXTURE0+k);const dt=n.get(lt);if(lt.version!==dt.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const $=te.getPrimaries(te.workingColorSpace),gt=v.colorSpace===Kn?null:te.getPrimaries(v.colorSpace),bt=v.colorSpace===Kn||$===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt)}e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let Q=g(v.image,!1,s.maxTextureSize);Q=ae(v,Q);const pt=r.convert(v.format,v.colorSpace),Nt=r.convert(v.type);let vt=x(v.internalFormat,pt,Nt,v.normalized,v.colorSpace,v.isVideoTexture);Kt(W,v);let mt;const Bt=v.mipmaps,kt=v.isVideoTexture!==!0,qt=dt.__version===void 0||Y===!0,F=lt.dataReady,ft=T(v,Q);if(v.isDepthTexture)vt=R(v.format===ci,v.type),qt&&(kt?e.texStorage2D(i.TEXTURE_2D,1,vt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,vt,Q.width,Q.height,0,pt,Nt,null));else if(v.isDataTexture)if(Bt.length>0){kt&&qt&&e.texStorage2D(i.TEXTURE_2D,ft,vt,Bt[0].width,Bt[0].height);for(let $=0,gt=Bt.length;$<gt;$++)mt=Bt[$],kt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,pt,Nt,mt.data):e.texImage2D(i.TEXTURE_2D,$,vt,mt.width,mt.height,0,pt,Nt,mt.data);v.generateMipmaps=!1}else kt?(qt&&e.texStorage2D(i.TEXTURE_2D,ft,vt,Q.width,Q.height),F&&st(v,Q,pt,Nt)):e.texImage2D(i.TEXTURE_2D,0,vt,Q.width,Q.height,0,pt,Nt,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){kt&&qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,vt,Bt[0].width,Bt[0].height,Q.depth);for(let $=0,gt=Bt.length;$<gt;$++)if(mt=Bt[$],v.format!==en)if(pt!==null)if(kt){if(F)if(v.layerUpdates.size>0){const bt=Uc(mt.width,mt.height,v.format,v.type);for(const nt of v.layerUpdates){const It=mt.data.subarray(nt*bt/mt.data.BYTES_PER_ELEMENT,(nt+1)*bt/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,nt,mt.width,mt.height,1,pt,It)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,mt.width,mt.height,Q.depth,pt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,vt,mt.width,mt.height,Q.depth,0,mt.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,mt.width,mt.height,Q.depth,pt,Nt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,vt,mt.width,mt.height,Q.depth,0,pt,Nt,mt.data)}else{kt&&qt&&e.texStorage2D(i.TEXTURE_2D,ft,vt,Bt[0].width,Bt[0].height);for(let $=0,gt=Bt.length;$<gt;$++)mt=Bt[$],v.format!==en?pt!==null?kt?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,$,vt,mt.width,mt.height,0,mt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,pt,Nt,mt.data):e.texImage2D(i.TEXTURE_2D,$,vt,mt.width,mt.height,0,pt,Nt,mt.data)}else if(v.isDataArrayTexture)if(kt){if(qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,vt,Q.width,Q.height,Q.depth),F)if(v.layerUpdates.size>0){const $=Uc(Q.width,Q.height,v.format,v.type);for(const gt of v.layerUpdates){const bt=Q.data.subarray(gt*$/Q.data.BYTES_PER_ELEMENT,(gt+1)*$/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,gt,Q.width,Q.height,1,pt,Nt,bt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,pt,Nt,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,Q.width,Q.height,Q.depth,0,pt,Nt,Q.data);else if(v.isData3DTexture)kt?(qt&&e.texStorage3D(i.TEXTURE_3D,ft,vt,Q.width,Q.height,Q.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,pt,Nt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,vt,Q.width,Q.height,Q.depth,0,pt,Nt,Q.data);else if(v.isFramebufferTexture){if(qt)if(kt)e.texStorage2D(i.TEXTURE_2D,ft,vt,Q.width,Q.height);else{let $=Q.width,gt=Q.height;for(let bt=0;bt<ft;bt++)e.texImage2D(i.TEXTURE_2D,bt,vt,$,gt,0,pt,Nt,null),$>>=1,gt>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Q.parentNode!==$){$.appendChild(Q),d.add(v),$.onpaint=gt=>{const bt=gt.changedElements;for(const nt of d)bt.includes(nt.image)&&(nt.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{const bt=i.RGBA,nt=i.RGBA,It=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,bt,nt,It,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(kt&&qt){const $=Qt(Bt[0]);e.texStorage2D(i.TEXTURE_2D,ft,vt,$.width,$.height)}for(let $=0,gt=Bt.length;$<gt;$++)mt=Bt[$],kt?F&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,pt,Nt,mt):e.texImage2D(i.TEXTURE_2D,$,vt,pt,Nt,mt);v.generateMipmaps=!1}else if(kt){if(qt){const $=Qt(Q);e.texStorage2D(i.TEXTURE_2D,ft,vt,$.width,$.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,Nt,Q)}else e.texImage2D(i.TEXTURE_2D,0,vt,pt,Nt,Q);p(v)&&E(W),dt.__version=lt.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function Ot(C,v,k){if(v.image.length!==6)return;const W=Z(C,v),Y=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+k);const lt=n.get(Y);if(Y.version!==lt.__version||W===!0){e.activeTexture(i.TEXTURE0+k);const dt=te.getPrimaries(te.workingColorSpace),K=v.colorSpace===Kn?null:te.getPrimaries(v.colorSpace),Q=v.colorSpace===Kn||dt===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const pt=v.isCompressedTexture||v.image[0].isCompressedTexture,Nt=v.image[0]&&v.image[0].isDataTexture,vt=[];for(let nt=0;nt<6;nt++)!pt&&!Nt?vt[nt]=g(v.image[nt],!0,s.maxCubemapSize):vt[nt]=Nt?v.image[nt].image:v.image[nt],vt[nt]=ae(v,vt[nt]);const mt=vt[0],Bt=r.convert(v.format,v.colorSpace),kt=r.convert(v.type),qt=x(v.internalFormat,Bt,kt,v.normalized,v.colorSpace),F=v.isVideoTexture!==!0,ft=lt.__version===void 0||W===!0,$=Y.dataReady;let gt=T(v,mt);Kt(i.TEXTURE_CUBE_MAP,v);let bt;if(pt){F&&ft&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,qt,mt.width,mt.height);for(let nt=0;nt<6;nt++){bt=vt[nt].mipmaps;for(let It=0;It<bt.length;It++){const At=bt[It];v.format!==en?Bt!==null?F?$&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,0,0,At.width,At.height,Bt,At.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,qt,At.width,At.height,0,At.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,0,0,At.width,At.height,Bt,kt,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It,qt,At.width,At.height,0,Bt,kt,At.data)}}}else{if(bt=v.mipmaps,F&&ft){bt.length>0&&gt++;const nt=Qt(vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,qt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Nt){F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,vt[nt].width,vt[nt].height,Bt,kt,vt[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,qt,vt[nt].width,vt[nt].height,0,Bt,kt,vt[nt].data);for(let It=0;It<bt.length;It++){const me=bt[It].image[nt].image;F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,0,0,me.width,me.height,Bt,kt,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,qt,me.width,me.height,0,Bt,kt,me.data)}}else{F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Bt,kt,vt[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,qt,Bt,kt,vt[nt]);for(let It=0;It<bt.length;It++){const At=bt[It];F?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,0,0,Bt,kt,At.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,It+1,qt,Bt,kt,At.image[nt])}}}p(v)&&E(i.TEXTURE_CUBE_MAP),lt.__version=Y.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function Lt(C,v,k,W,Y,lt){const dt=r.convert(k.format,k.colorSpace),K=r.convert(k.type),Q=x(k.internalFormat,dt,K,k.normalized,k.colorSpace),pt=n.get(v),Nt=n.get(k);if(Nt.__renderTarget=v,!pt.__hasExternalTextures){const vt=Math.max(1,v.width>>lt),mt=Math.max(1,v.height>>lt);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,lt,Q,vt,mt,v.depth,0,dt,K,null):e.texImage2D(Y,lt,Q,vt,mt,0,dt,K,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Wt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,Y,Nt.__webglTexture,0,Gt(v)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,Y,Nt.__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(C,v,k){if(i.bindRenderbuffer(i.RENDERBUFFER,C),v.depthBuffer){const W=v.depthTexture,Y=W&&W.isDepthTexture?W.type:null,lt=R(v.stencilBuffer,Y),dt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Wt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt(v),lt,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt(v),lt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,lt,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,C)}else{const W=v.textures;for(let Y=0;Y<W.length;Y++){const lt=W[Y],dt=r.convert(lt.format,lt.colorSpace),K=r.convert(lt.type),Q=x(lt.internalFormat,dt,K,lt.normalized,lt.colorSpace);Wt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt(v),Q,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt(v),Q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Q,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(C,v,k){const W=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Kt(i.TEXTURE_CUBE_MAP,v.depthTexture);const pt=r.convert(v.depthTexture.format),Nt=r.convert(v.depthTexture.type);let vt;v.depthTexture.format===Dn?vt=i.DEPTH_COMPONENT24:v.depthTexture.format===ci&&(vt=i.DEPTH24_STENCIL8);for(let mt=0;mt<6;mt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,vt,v.width,v.height,0,pt,Nt,null)}}else J(v.depthTexture,0);const lt=Y.__webglTexture,dt=Gt(v),K=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,Q=v.depthTexture.format===ci?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Dn)Wt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,lt,0,dt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,lt,0);else if(v.depthTexture.format===ci)Wt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,lt,0,dt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function j(C){const v=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){const W=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",Y)};W.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=W}if(C.depthTexture&&!v.__autoAllocateDepthBuffer)if(k)for(let W=0;W<6;W++)Ct(v.__webglFramebuffer[W],C,W);else{const W=C.texture.mipmaps;W&&W.length>0?Ct(v.__webglFramebuffer[0],C,0):Ct(v.__webglFramebuffer,C,0)}else if(k){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=i.createRenderbuffer(),zt(v.__webglDepthbuffer[W],C,!1);else{const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=v.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,lt)}}else{const W=C.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),zt(v.__webglDepthbuffer,C,!1);else{const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,lt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function et(C,v,k){const W=n.get(C);v!==void 0&&Lt(W.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&j(C)}function tt(C){const v=C.texture,k=n.get(C),W=n.get(v);C.addEventListener("dispose",_);const Y=C.textures,lt=C.isWebGLCubeRenderTarget===!0,dt=Y.length>1;if(dt||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=v.version,a.memory.textures++),lt){k.__webglFramebuffer=[];for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[K]=[];for(let Q=0;Q<v.mipmaps.length;Q++)k.__webglFramebuffer[K][Q]=i.createFramebuffer()}else k.__webglFramebuffer[K]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let K=0;K<v.mipmaps.length;K++)k.__webglFramebuffer[K]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(dt)for(let K=0,Q=Y.length;K<Q;K++){const pt=n.get(Y[K]);pt.__webglTexture===void 0&&(pt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Wt(C)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){const Q=Y[K];k.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[K]);const pt=r.convert(Q.format,Q.colorSpace),Nt=r.convert(Q.type),vt=x(Q.internalFormat,pt,Nt,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),mt=Gt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,vt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,k.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),zt(k.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(lt){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Kt(i.TEXTURE_CUBE_MAP,v);for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)Lt(k.__webglFramebuffer[K][Q],C,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Q);else Lt(k.__webglFramebuffer[K],C,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);p(v)&&E(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let K=0,Q=Y.length;K<Q;K++){const pt=Y[K],Nt=n.get(pt);let vt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(vt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,Nt.__webglTexture),Kt(vt,pt),Lt(k.__webglFramebuffer,C,pt,i.COLOR_ATTACHMENT0+K,vt,0),p(pt)&&E(vt)}e.unbindTexture()}else{let K=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,W.__webglTexture),Kt(K,v),v.mipmaps&&v.mipmaps.length>0)for(let Q=0;Q<v.mipmaps.length;Q++)Lt(k.__webglFramebuffer[Q],C,v,i.COLOR_ATTACHMENT0,K,Q);else Lt(k.__webglFramebuffer,C,v,i.COLOR_ATTACHMENT0,K,0);p(v)&&E(K),e.unbindTexture()}C.depthBuffer&&j(C)}function ut(C){const v=C.textures;for(let k=0,W=v.length;k<W;k++){const Y=v[k];if(p(Y)){const lt=A(C),dt=n.get(Y).__webglTexture;e.bindTexture(lt,dt),E(lt),e.unbindTexture()}}}const at=[],Tt=[];function St(C){if(C.samples>0){if(Wt(C)===!1){const v=C.textures,k=C.width,W=C.height;let Y=i.COLOR_BUFFER_BIT;const lt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=n.get(C),K=v.length>1;if(K)for(let pt=0;pt<v.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer);const Q=C.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let pt=0;pt<v.length;pt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,dt.__webglColorRenderbuffer[pt]);const Nt=n.get(v[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Nt,0)}i.blitFramebuffer(0,0,k,W,0,0,k,W,Y,i.NEAREST),l===!0&&(at.length=0,Tt.length=0,at.push(i.COLOR_ATTACHMENT0+pt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(at.push(lt),Tt.push(lt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Tt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let pt=0;pt<v.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,dt.__webglColorRenderbuffer[pt]);const Nt=n.get(v[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,Nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const v=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Gt(C){return Math.min(s.maxSamples,C.samples)}function Wt(C){const v=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function D(C){const v=a.render.frame;h.get(C)!==v&&(h.set(C,v),C.update())}function ae(C,v){const k=C.colorSpace,W=C.format,Y=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Ar&&k!==Kn&&(te.getTransfer(k)===re?(W!==en||Y!==qe)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",k)),v}function Qt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=B,this.getTextureUnits=X,this.setTextureUnits=U,this.setTexture2D=J,this.setTexture2DArray=it,this.setTexture3D=ht,this.setTextureCube=ct,this.rebindTextures=et,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=j,this.setupFrameBufferTexture=Lt,this.useMultisampledRTT=Wt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function u_(i,t){function e(n,s=Kn){let r;const a=te.getTransfer(s);if(n===qe)return i.UNSIGNED_BYTE;if(n===$o)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===zh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Vh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Bh)return i.BYTE;if(n===kh)return i.SHORT;if(n===ys)return i.UNSIGNED_SHORT;if(n===Jo)return i.INT;if(n===gn)return i.UNSIGNED_INT;if(n===tn)return i.FLOAT;if(n===In)return i.HALF_FLOAT;if(n===Gh)return i.ALPHA;if(n===Hh)return i.RGB;if(n===en)return i.RGBA;if(n===Dn)return i.DEPTH_COMPONENT;if(n===ci)return i.DEPTH_STENCIL;if(n===jo)return i.RED;if(n===tl)return i.RED_INTEGER;if(n===fi)return i.RG;if(n===el)return i.RG_INTEGER;if(n===nl)return i.RGBA_INTEGER;if(n===fr||n===pr||n===mr||n===gr)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===eo||n===no||n===io||n===so)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===eo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===no)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===io)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===so)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ro||n===ao||n===oo||n===lo||n===co||n===wr||n===ho)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ro||n===ao)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===oo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===lo)return r.COMPRESSED_R11_EAC;if(n===co)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wr)return r.COMPRESSED_RG11_EAC;if(n===ho)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===uo||n===fo||n===po||n===mo||n===go||n===vo||n===_o||n===xo||n===Mo||n===yo||n===bo||n===So||n===wo||n===Eo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===po)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===mo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===go)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_o)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Mo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===So)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===To||n===Ao||n===Ro)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===To)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ao)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ro)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Co||n===Po||n===Er||n===Lo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Co)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Po)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Er)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const d_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,f_=`
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

}`;class p_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Qh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ye({vertexShader:d_,fragmentShader:f_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new de(new Cs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class m_ extends gi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null;const y=typeof XRWebGLBinding<"u",g=new p_,p={},E=e.getContextAttributes();let A=null,x=null;const R=[],T=[],P=new rt;let _=null;const M=new Xe;M.viewport=new fe;const w=new Xe;w.viewport=new fe;const S=[M,w],I=new Ep;let B=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ot=R[Z];return ot===void 0&&(ot=new Qr,R[Z]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(Z){let ot=R[Z];return ot===void 0&&(ot=new Qr,R[Z]=ot),ot.getGripSpace()},this.getHand=function(Z){let ot=R[Z];return ot===void 0&&(ot=new Qr,R[Z]=ot),ot.getHandSpace()};function U(Z){const ot=T.indexOf(Z.inputSource);if(ot===-1)return;const st=R[ot];st!==void 0&&(st.update(Z.inputSource,Z.frame,c||a),st.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",z);for(let Z=0;Z<R.length;Z++){const ot=T[Z];ot!==null&&(T[Z]=null,R[Z].disconnect(ot))}B=null,X=null,g.reset();for(const Z in p)delete p[Z];t.setRenderTarget(A),f=null,u=null,d=null,s=null,x=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",G),s.addEventListener("inputsourceschange",z),E.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(P),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let st=null,Rt=null,Ot=null;E.depth&&(Ot=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=E.stencil?ci:Dn,Rt=E.stencil?bs:gn);const Lt={colorFormat:e.RGBA8,depthFormat:Ot,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Lt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new mn(u.textureWidth,u.textureHeight,{format:en,type:qe,depthTexture:new Zi(u.textureWidth,u.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const st={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new mn(f.framebufferWidth,f.framebufferHeight,{format:en,type:qe,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(Z){for(let ot=0;ot<Z.removed.length;ot++){const st=Z.removed[ot],Rt=T.indexOf(st);Rt>=0&&(T[Rt]=null,R[Rt].disconnect(st))}for(let ot=0;ot<Z.added.length;ot++){const st=Z.added[ot];let Rt=T.indexOf(st);if(Rt===-1){for(let Lt=0;Lt<R.length;Lt++)if(Lt>=T.length){T.push(st),Rt=Lt;break}else if(T[Lt]===null){T[Lt]=st,Rt=Lt;break}if(Rt===-1)break}const Ot=R[Rt];Ot&&Ot.connect(st)}}const J=new L,it=new L;function ht(Z,ot,st){J.setFromMatrixPosition(ot.matrixWorld),it.setFromMatrixPosition(st.matrixWorld);const Rt=J.distanceTo(it),Ot=ot.projectionMatrix.elements,Lt=st.projectionMatrix.elements,zt=Ot[14]/(Ot[10]-1),Ct=Ot[14]/(Ot[10]+1),j=(Ot[9]+1)/Ot[5],et=(Ot[9]-1)/Ot[5],tt=(Ot[8]-1)/Ot[0],ut=(Lt[8]+1)/Lt[0],at=zt*tt,Tt=zt*ut,St=Rt/(-tt+ut),Gt=St*-tt;if(ot.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Gt),Z.translateZ(St),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ot[10]===-1)Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const Wt=zt+St,D=Ct+St,ae=at-Gt,Qt=Tt+(Rt-Gt),C=j*Ct/D*Wt,v=et*Ct/D*Wt;Z.projectionMatrix.makePerspective(ae,Qt,C,v,Wt,D),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ct(Z,ot){ot===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ot.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ot=Z.near,st=Z.far;g.texture!==null&&(g.depthNear>0&&(ot=g.depthNear),g.depthFar>0&&(st=g.depthFar)),I.near=w.near=M.near=ot,I.far=w.far=M.far=st,(B!==I.near||X!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),B=I.near,X=I.far),I.layers.mask=Z.layers.mask|6,M.layers.mask=I.layers.mask&-5,w.layers.mask=I.layers.mask&-3;const Rt=Z.parent,Ot=I.cameras;ct(I,Rt);for(let Lt=0;Lt<Ot.length;Lt++)ct(Ot[Lt],Rt);Ot.length===2?ht(I,M,w):I.projectionMatrix.copy(M.projectionMatrix),xt(Z,I,Rt)};function xt(Z,ot,st){st===null?Z.matrix.copy(ot.matrixWorld):(Z.matrix.copy(st.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ot.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ws*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(Z){return p[Z]};let Ht=null;function ie(Z,ot){if(h=ot.getViewerPose(c||a),m=ot,h!==null){const st=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let Rt=!1;st.length!==I.cameras.length&&(I.cameras.length=0,Rt=!0);for(let Ct=0;Ct<st.length;Ct++){const j=st[Ct];let et=null;if(f!==null)et=f.getViewport(j);else{const ut=d.getViewSubImage(u,j);et=ut.viewport,Ct===0&&(t.setRenderTargetTextures(x,ut.colorTexture,ut.depthStencilTexture),t.setRenderTarget(x))}let tt=S[Ct];tt===void 0&&(tt=new Xe,tt.layers.enable(Ct),tt.viewport=new fe,S[Ct]=tt),tt.matrix.fromArray(j.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(j.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(et.x,et.y,et.width,et.height),Ct===0&&(I.matrix.copy(tt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Rt===!0&&I.cameras.push(tt)}const Ot=s.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const Ct=d.getDepthInformation(st[0]);Ct&&Ct.isValid&&Ct.texture&&g.init(Ct,s.renderState)}if(Ot&&Ot.includes("camera-access")&&y){t.state.unbindTexture(),d=n.getBinding();for(let Ct=0;Ct<st.length;Ct++){const j=st[Ct].camera;if(j){let et=p[j];et||(et=new Qh,p[j]=et);const tt=d.getCameraImage(j);et.sourceTexture=tt}}}}for(let st=0;st<R.length;st++){const Rt=T[st],Ot=R[st];Rt!==null&&Ot!==void 0&&Ot.update(Rt,ot,c||a)}Ht&&Ht(Z,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),m=null}const Kt=new hu;Kt.setAnimationLoop(ie),this.setAnimationLoop=function(Z){Ht=Z},this.dispose=function(){}}}const g_=new ne,vu=new Xt;vu.set(-1,0,0,0,1,0,0,0,1);function v_(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,ou(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,E,A,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,E,A):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ne&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ne&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const E=t.get(p),A=E.envMap,x=E.envMapRotation;A&&(g.envMap.value=A,g.envMapRotation.value.setFromMatrix4(g_.makeRotationFromEuler(x)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(vu),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,E,A){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=A*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ne&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){const E=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function __(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,R){const T=R.program;n.uniformBlockBinding(x,T)}function c(x,R){let T=s[x.id];T===void 0&&(g(x),T=h(x),s[x.id]=T,x.addEventListener("dispose",E));const P=R.program;n.updateUBOMapping(x,P);const _=t.render.frame;r[x.id]!==_&&(u(x),r[x.id]=_)}function h(x){const R=d();x.__bindingPointIndex=R;const T=i.createBuffer(),P=x.__size,_=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,P,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,R,T),T}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const R=s[x.id],T=x.uniforms,P=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,R);for(let _=0,M=T.length;_<M;_++){const w=T[_];if(Array.isArray(w))for(let S=0,I=w.length;S<I;S++)f(w[S],_,S,P);else f(w,_,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,R,T,P){if(y(x,R,T,P)===!0){const _=x.__offset,M=x.value;if(Array.isArray(M)){let w=0;for(let S=0;S<M.length;S++){const I=M[S],B=p(I);m(I,x.__data,w),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(w+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(M,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,x.__data)}}function m(x,R,T){typeof x=="number"||typeof x=="boolean"?R[0]=x:x.isMatrix3?(R[0]=x.elements[0],R[1]=x.elements[1],R[2]=x.elements[2],R[3]=0,R[4]=x.elements[3],R[5]=x.elements[4],R[6]=x.elements[5],R[7]=0,R[8]=x.elements[6],R[9]=x.elements[7],R[10]=x.elements[8],R[11]=0):ArrayBuffer.isView(x)?R.set(new x.constructor(x.buffer,x.byteOffset,R.length)):x.toArray(R,T)}function y(x,R,T,P){const _=x.value,M=R+"_"+T;if(P[M]===void 0)return typeof _=="number"||typeof _=="boolean"?P[M]=_:ArrayBuffer.isView(_)?P[M]=_.slice():P[M]=_.clone(),!0;{const w=P[M];if(typeof _=="number"||typeof _=="boolean"){if(w!==_)return P[M]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(w.equals(_)===!1)return w.copy(_),!0}}return!1}function g(x){const R=x.uniforms;let T=0;const P=16;for(let M=0,w=R.length;M<w;M++){const S=Array.isArray(R[M])?R[M]:[R[M]];for(let I=0,B=S.length;I<B;I++){const X=S[I],U=Array.isArray(X.value)?X.value:[X.value];for(let G=0,z=U.length;G<z;G++){const J=U[G],it=p(J),ht=T%P,ct=ht%it.boundary,xt=ht+ct;T+=ct,xt!==0&&P-xt<it.storage&&(T+=P-xt),X.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=T,T+=it.storage}}}const _=T%P;return _>0&&(T+=P-_),x.__size=T,x.__cache={},this}function p(x){const R={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(R.boundary=4,R.storage=4):x.isVector2?(R.boundary=8,R.storage=8):x.isVector3||x.isColor?(R.boundary=16,R.storage=12):x.isVector4?(R.boundary=16,R.storage=16):x.isMatrix3?(R.boundary=48,R.storage=48):x.isMatrix4?(R.boundary=64,R.storage=64):x.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(R.boundary=16,R.storage=x.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",x),R}function E(x){const R=x.target;R.removeEventListener("dispose",E);const T=a.indexOf(R.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function A(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:A}}const x_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function M_(){return ln===null&&(ln=new Jh(x_,16,16,fi,In),ln.name="DFG_LUT",ln.minFilter=De,ln.magFilter=De,ln.wrapS=An,ln.wrapT=An,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class y_{constructor(t={}){const{canvas:e=Vd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=qe}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const y=f,g=new Set([nl,el,tl]),p=new Set([qe,gn,ys,bs,$o,Qo]),E=new Uint32Array(4),A=new Int32Array(4),x=new L;let R=null,T=null;const P=[],_=[];let M=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let S=!1,I=null,B=null,X=null,U=null;this._outputColorSpace=We;let G=0,z=0,J=null,it=-1,ht=null;const ct=new fe,xt=new fe;let Ht=null;const ie=new Dt(0);let Kt=0,Z=e.width,ot=e.height,st=1,Rt=null,Ot=null;const Lt=new fe(0,0,Z,ot),zt=new fe(0,0,Z,ot);let Ct=!1;const j=new hl;let et=!1,tt=!1;const ut=new ne,at=new L,Tt=new fe,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Wt(){return J===null?st:1}let D=n;function ae(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Yo}`),e.addEventListener("webglcontextlost",me,!1),e.addEventListener("webglcontextrestored",he,!1),e.addEventListener("webglcontextcreationerror",sn,!1),D===null){const O="webgl2";if(D=ae(O,b),D===null)throw ae(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw jt("WebGLRenderer: "+b.message),b}let Qt,C,v,k,W,Y,lt,dt,K,Q,pt,Nt,vt,mt,Bt,kt,qt,F,ft,$,gt,bt,nt;function It(){Qt=new Mg(D),Qt.init(),gt=new u_(D,Qt),C=new dg(D,Qt,t,gt),v=new c_(D,Qt),C.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),B=D.createFramebuffer(),X=D.createFramebuffer(),U=D.createFramebuffer(),k=new Sg(D),W=new Zv,Y=new h_(D,Qt,v,W,C,gt,k),lt=new xg(w),dt=new Ap(D),bt=new hg(D,dt),K=new yg(D,dt,k,bt),Q=new Eg(D,K,dt,bt,k),F=new wg(D,C,Y),Bt=new fg(W),pt=new Kv(w,lt,Qt,C,bt,Bt),Nt=new v_(w,W),vt=new $v,mt=new i_(Qt),qt=new cg(w,lt,v,Q,m,l),kt=new l_(w,Q,C),nt=new __(D,k,C,v),ft=new ug(D,Qt,k),$=new bg(D,Qt,k),k.programs=pt.programs,w.capabilities=C,w.extensions=Qt,w.properties=W,w.renderLists=vt,w.shadowMap=kt,w.state=v,w.info=k}It(),y!==qe&&(M=new Ag(y,e.width,e.height,o,s,r));const At=new m_(w,D);this.xr=At,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=Qt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Qt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return st},this.setPixelRatio=function(b){b!==void 0&&(st=b,this.setSize(Z,ot,!1))},this.getSize=function(b){return b.set(Z,ot)},this.setSize=function(b,O,q=!0){if(At.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=b,ot=O,e.width=Math.floor(b*st),e.height=Math.floor(O*st),q===!0&&(e.style.width=b+"px",e.style.height=O+"px"),M!==null&&M.setSize(e.width,e.height),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(Z*st,ot*st).floor()},this.setDrawingBufferSize=function(b,O,q){Z=b,ot=O,st=q,e.width=Math.floor(b*q),e.height=Math.floor(O*q),this.setViewport(0,0,b,O)},this.setEffects=function(b){if(y===qe){jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let O=0;O<b.length;O++)if(b[O].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ct)},this.getViewport=function(b){return b.copy(Lt)},this.setViewport=function(b,O,q,V){b.isVector4?Lt.set(b.x,b.y,b.z,b.w):Lt.set(b,O,q,V),v.viewport(ct.copy(Lt).multiplyScalar(st).round())},this.getScissor=function(b){return b.copy(zt)},this.setScissor=function(b,O,q,V){b.isVector4?zt.set(b.x,b.y,b.z,b.w):zt.set(b,O,q,V),v.scissor(xt.copy(zt).multiplyScalar(st).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(b){v.setScissorTest(Ct=b)},this.setOpaqueSort=function(b){Rt=b},this.setTransparentSort=function(b){Ot=b},this.getClearColor=function(b){return b.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor(...arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,q=!0){let V=0;if(b){let H=!1;if(J!==null){const yt=J.texture.format;H=g.has(yt)}if(H){const yt=J.texture.type,Et=p.has(yt),Mt=qt.getClearColor(),Pt=qt.getClearAlpha(),Ut=Mt.r,Yt=Mt.g,Jt=Mt.b;Et?(E[0]=Ut,E[1]=Yt,E[2]=Jt,E[3]=Pt,D.clearBufferuiv(D.COLOR,0,E)):(A[0]=Ut,A[1]=Yt,A[2]=Jt,A[3]=Pt,D.clearBufferiv(D.COLOR,0,A))}else V|=D.COLOR_BUFFER_BIT}O&&(V|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),I=b},this.dispose=function(){e.removeEventListener("webglcontextlost",me,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",sn,!1),qt.dispose(),vt.dispose(),mt.dispose(),W.dispose(),lt.dispose(),Q.dispose(),bt.dispose(),nt.dispose(),pt.dispose(),At.dispose(),At.removeEventListener("sessionstart",Dl),At.removeEventListener("sessionend",Nl),Qn.stop()};function me(b){b.preventDefault(),jl("WebGLRenderer: Context Lost."),S=!0}function he(){jl("WebGLRenderer: Context Restored."),S=!1;const b=k.autoReset,O=kt.enabled,q=kt.autoUpdate,V=kt.needsUpdate,H=kt.type;It(),k.autoReset=b,kt.enabled=O,kt.autoUpdate=q,kt.needsUpdate=V,kt.type=H}function sn(b){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function rn(b){const O=b.target;O.removeEventListener("dispose",rn),Ru(O)}function Ru(b){Cu(b),W.remove(b)}function Cu(b){const O=W.get(b).programs;O!==void 0&&(O.forEach(function(q){pt.releaseProgram(q)}),b.isShaderMaterial&&pt.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,q,V,H,yt){O===null&&(O=St);const Et=H.isMesh&&H.matrixWorld.determinantAffine()<0,Mt=Iu(b,O,q,V,H);v.setMaterial(V,Et);let Pt=q.index,Ut=1;if(V.wireframe===!0){if(Pt=K.getWireframeAttribute(q),Pt===void 0)return;Ut=2}const Yt=q.drawRange,Jt=q.attributes.position;let Ft=Yt.start*Ut,oe=(Yt.start+Yt.count)*Ut;yt!==null&&(Ft=Math.max(Ft,yt.start*Ut),oe=Math.min(oe,(yt.start+yt.count)*Ut)),Pt!==null?(Ft=Math.max(Ft,0),oe=Math.min(oe,Pt.count)):Jt!=null&&(Ft=Math.max(Ft,0),oe=Math.min(oe,Jt.count));const ve=oe-Ft;if(ve<0||ve===1/0)return;bt.setup(H,V,Mt,q,Pt);let ge,le=ft;if(Pt!==null&&(ge=dt.get(Pt),le=$,le.setIndex(ge)),H.isMesh)V.wireframe===!0?(v.setLineWidth(V.wireframeLinewidth*Wt()),le.setMode(D.LINES)):le.setMode(D.TRIANGLES);else if(H.isLine){let Pe=V.linewidth;Pe===void 0&&(Pe=1),v.setLineWidth(Pe*Wt()),H.isLineSegments?le.setMode(D.LINES):H.isLineLoop?le.setMode(D.LINE_LOOP):le.setMode(D.LINE_STRIP)}else H.isPoints?le.setMode(D.POINTS):H.isSprite&&le.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))le.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Pe=H._multiDrawStarts,wt=H._multiDrawCounts,Ve=H._multiDrawCount,se=Pt?dt.get(Pt).bytesPerElement:1,Ke=W.get(V).currentProgram.getUniforms();for(let an=0;an<Ve;an++)Ke.setValue(D,"_gl_DrawID",an),le.render(Pe[an]/se,wt[an])}else if(H.isInstancedMesh)le.renderInstances(Ft,ve,H.count);else if(q.isInstancedBufferGeometry){const Pe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,wt=Math.min(q.instanceCount,Pe);le.renderInstances(Ft,ve,wt)}else le.render(Ft,ve)};function Il(b,O,q){b.transparent===!0&&b.side===Tn&&b.forceSinglePass===!1?(b.side=Ne,b.needsUpdate=!0,Ls(b,O,q),b.side=Jn,b.needsUpdate=!0,Ls(b,O,q),b.side=Tn):Ls(b,O,q)}this.compile=function(b,O,q=null){q===null&&(q=b),T=mt.get(q),T.init(O),_.push(T),q.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),b!==q&&b.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),T.setupLights();const V=new Set;return b.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const yt=H.material;if(yt)if(Array.isArray(yt))for(let Et=0;Et<yt.length;Et++){const Mt=yt[Et];Il(Mt,q,H),V.add(Mt)}else Il(yt,q,H),V.add(yt)}),T=_.pop(),V},this.compileAsync=function(b,O,q=null){const V=this.compile(b,O,q);return new Promise(H=>{function yt(){if(V.forEach(function(Et){W.get(Et).currentProgram.isReady()&&V.delete(Et)}),V.size===0){H(b);return}setTimeout(yt,10)}Qt.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let Vr=null;function Pu(b){Vr&&Vr(b)}function Dl(){Qn.stop()}function Nl(){Qn.start()}const Qn=new hu;Qn.setAnimationLoop(Pu),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(b){Vr=b,At.setAnimationLoop(b),b===null?Qn.stop():Qn.start()},At.addEventListener("sessionstart",Dl),At.addEventListener("sessionend",Nl),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;I!==null&&I.renderStart(b,O);const q=At.enabled===!0&&At.isPresenting===!0,V=M!==null&&(J===null||q)&&M.begin(w,J);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),At.enabled===!0&&At.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(At.cameraAutoUpdate===!0&&At.updateCamera(O),O=At.getCamera()),b.isScene===!0&&b.onBeforeRender(w,b,O,J),T=mt.get(b,_.length),T.init(O),T.state.textureUnits=Y.getTextureUnits(),_.push(T),ut.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),j.setFromProjectionMatrix(ut,fn,O.reversedDepth),tt=this.localClippingEnabled,et=Bt.init(this.clippingPlanes,tt),R=vt.get(b,P.length),R.init(),P.push(R),At.enabled===!0&&At.isPresenting===!0){const Et=w.xr.getDepthSensingMesh();Et!==null&&Gr(Et,O,-1/0,w.sortObjects)}Gr(b,O,0,w.sortObjects),R.finish(),w.sortObjects===!0&&R.sort(Rt,Ot,O.reversedDepth),Gt=At.enabled===!1||At.isPresenting===!1||At.hasDepthSensing()===!1,Gt&&qt.addToRenderList(R,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),et===!0&&Bt.beginShadows();const H=T.state.shadowsArray;if(kt.render(H,b,O),et===!0&&Bt.endShadows(),(V&&M.hasRenderPass())===!1){const Et=R.opaque,Mt=R.transmissive;if(T.setupLights(),O.isArrayCamera){const Pt=O.cameras;if(Mt.length>0)for(let Ut=0,Yt=Pt.length;Ut<Yt;Ut++){const Jt=Pt[Ut];Fl(Et,Mt,b,Jt)}Gt&&qt.render(b);for(let Ut=0,Yt=Pt.length;Ut<Yt;Ut++){const Jt=Pt[Ut];Ul(R,b,Jt,Jt.viewport)}}else Mt.length>0&&Fl(Et,Mt,b,O),Gt&&qt.render(b),Ul(R,b,O)}J!==null&&z===0&&(Y.updateMultisampleRenderTarget(J),Y.updateRenderTargetMipmap(J)),V&&M.end(w),b.isScene===!0&&b.onAfterRender(w,b,O),bt.resetDefaultState(),it=-1,ht=null,_.pop(),_.length>0?(T=_[_.length-1],Y.setTextureUnits(T.state.textureUnits),et===!0&&Bt.setGlobalState(w.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?R=P[P.length-1]:R=null,I!==null&&I.renderEnd()};function Gr(b,O,q,V){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLightProbeGrid)T.pushLightProbeGrid(b);else if(b.isLight)T.pushLight(b),b.castShadow&&T.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||j.intersectsSprite(b)){V&&Tt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ut);const Et=Q.update(b),Mt=b.material;Mt.visible&&R.push(b,Et,Mt,q,Tt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||j.intersectsObject(b))){const Et=Q.update(b),Mt=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Tt.copy(b.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Tt.copy(Et.boundingSphere.center)),Tt.applyMatrix4(b.matrixWorld).applyMatrix4(ut)),Array.isArray(Mt)){const Pt=Et.groups;for(let Ut=0,Yt=Pt.length;Ut<Yt;Ut++){const Jt=Pt[Ut],Ft=Mt[Jt.materialIndex];Ft&&Ft.visible&&R.push(b,Et,Ft,q,Tt.z,Jt)}}else Mt.visible&&R.push(b,Et,Mt,q,Tt.z,null)}}const yt=b.children;for(let Et=0,Mt=yt.length;Et<Mt;Et++)Gr(yt[Et],O,q,V)}function Ul(b,O,q,V){const{opaque:H,transmissive:yt,transparent:Et}=b;T.setupLightsView(q),et===!0&&Bt.setGlobalState(w.clippingPlanes,q),V&&v.viewport(ct.copy(V)),H.length>0&&Ps(H,O,q),yt.length>0&&Ps(yt,O,q),Et.length>0&&Ps(Et,O,q),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Fl(b,O,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[V.id]===void 0){const Ft=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[V.id]=new mn(1,1,{generateMipmaps:!0,type:Ft?In:qe,minFilter:li,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace})}const yt=T.state.transmissionRenderTarget[V.id],Et=V.viewport||ct;yt.setSize(Et.z*w.transmissionResolutionScale,Et.w*w.transmissionResolutionScale);const Mt=w.getRenderTarget(),Pt=w.getActiveCubeFace(),Ut=w.getActiveMipmapLevel();w.setRenderTarget(yt),w.getClearColor(ie),Kt=w.getClearAlpha(),Kt<1&&w.setClearColor(16777215,.5),w.clear(),Gt&&qt.render(q);const Yt=w.toneMapping;w.toneMapping=pn;const Jt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),T.setupLightsView(V),et===!0&&Bt.setGlobalState(w.clippingPlanes,V),Ps(b,q,V),Y.updateMultisampleRenderTarget(yt),Y.updateRenderTargetMipmap(yt),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let oe=0,ve=O.length;oe<ve;oe++){const ge=O[oe],{object:le,geometry:Pe,material:wt,group:Ve}=ge;if(wt.side===Tn&&le.layers.test(V.layers)){const se=wt.side;wt.side=Ne,wt.needsUpdate=!0,Ol(le,q,V,Pe,wt,Ve),wt.side=se,wt.needsUpdate=!0,Ft=!0}}Ft===!0&&(Y.updateMultisampleRenderTarget(yt),Y.updateRenderTargetMipmap(yt))}w.setRenderTarget(Mt,Pt,Ut),w.setClearColor(ie,Kt),Jt!==void 0&&(V.viewport=Jt),w.toneMapping=Yt}function Ps(b,O,q){const V=O.isScene===!0?O.overrideMaterial:null;for(let H=0,yt=b.length;H<yt;H++){const Et=b[H],{object:Mt,geometry:Pt,group:Ut}=Et;let Yt=Et.material;Yt.allowOverride===!0&&V!==null&&(Yt=V),Mt.layers.test(q.layers)&&Ol(Mt,O,q,Pt,Yt,Ut)}}function Ol(b,O,q,V,H,yt){b.onBeforeRender(w,O,q,V,H,yt),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(w,O,q,V,b,yt),H.transparent===!0&&H.side===Tn&&H.forceSinglePass===!1?(H.side=Ne,H.needsUpdate=!0,w.renderBufferDirect(q,O,V,H,b,yt),H.side=Jn,H.needsUpdate=!0,w.renderBufferDirect(q,O,V,H,b,yt),H.side=Tn):w.renderBufferDirect(q,O,V,H,b,yt),b.onAfterRender(w,O,q,V,H,yt)}function Ls(b,O,q){O.isScene!==!0&&(O=St);const V=W.get(b),H=T.state.lights,yt=T.state.shadowsArray,Et=H.state.version,Mt=pt.getParameters(b,H.state,yt,O,q,T.state.lightProbeGridArray),Pt=pt.getProgramCacheKey(Mt);let Ut=V.programs;V.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?O.environment:null,V.fog=O.fog;const Yt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;V.envMap=lt.get(b.envMap||V.environment,Yt),V.envMapRotation=V.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Ut===void 0&&(b.addEventListener("dispose",rn),Ut=new Map,V.programs=Ut);let Jt=Ut.get(Pt);if(Jt!==void 0){if(V.currentProgram===Jt&&V.lightsStateVersion===Et)return kl(b,Mt),Jt}else Mt.uniforms=pt.getUniforms(b),I!==null&&b.isNodeMaterial&&I.build(b,q,Mt),b.onBeforeCompile(Mt,w),Jt=pt.acquireProgram(Mt,Pt),Ut.set(Pt,Jt),V.uniforms=Mt.uniforms;const Ft=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ft.clippingPlanes=Bt.uniform),kl(b,Mt),V.needsLights=Nu(b),V.lightsStateVersion=Et,V.needsLights&&(Ft.ambientLightColor.value=H.state.ambient,Ft.lightProbe.value=H.state.probe,Ft.directionalLights.value=H.state.directional,Ft.directionalLightShadows.value=H.state.directionalShadow,Ft.spotLights.value=H.state.spot,Ft.spotLightShadows.value=H.state.spotShadow,Ft.rectAreaLights.value=H.state.rectArea,Ft.ltc_1.value=H.state.rectAreaLTC1,Ft.ltc_2.value=H.state.rectAreaLTC2,Ft.pointLights.value=H.state.point,Ft.pointLightShadows.value=H.state.pointShadow,Ft.hemisphereLights.value=H.state.hemi,Ft.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ft.spotLightMatrix.value=H.state.spotLightMatrix,Ft.spotLightMap.value=H.state.spotLightMap,Ft.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=T.state.lightProbeGridArray.length>0,V.currentProgram=Jt,V.uniformsList=null,Jt}function Bl(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=vr.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function kl(b,O){const q=W.get(b);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function Lu(b,O){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let q=0,V=b.length;q<V;q++){const H=b[q];if(H.texture!==null&&H.boundingBox.containsPoint(x))return H}return null}function Iu(b,O,q,V,H){O.isScene!==!0&&(O=St),Y.resetTextureUnits();const yt=O.fog,Et=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?O.environment:null,Mt=J===null?w.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:te.workingColorSpace,Pt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ut=lt.get(V.envMap||Et,Pt),Yt=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Jt=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ft=!!q.morphAttributes.position,oe=!!q.morphAttributes.normal,ve=!!q.morphAttributes.color;let ge=pn;V.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ge=w.toneMapping);const le=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Pe=le!==void 0?le.length:0,wt=W.get(V),Ve=T.state.lights;if(et===!0&&(tt===!0||b!==ht)){const ue=b===ht&&V.id===it;Bt.setState(V,b,ue)}let se=!1;V.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==Ve.state.version||wt.outputColorSpace!==Mt||H.isBatchedMesh&&wt.batching===!1||!H.isBatchedMesh&&wt.batching===!0||H.isBatchedMesh&&wt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&wt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&wt.instancing===!1||!H.isInstancedMesh&&wt.instancing===!0||H.isSkinnedMesh&&wt.skinning===!1||!H.isSkinnedMesh&&wt.skinning===!0||H.isInstancedMesh&&wt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&wt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&wt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&wt.instancingMorph===!1&&H.morphTexture!==null||wt.envMap!==Ut||V.fog===!0&&wt.fog!==yt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==Bt.numPlanes||wt.numIntersection!==Bt.numIntersection)||wt.vertexAlphas!==Yt||wt.vertexTangents!==Jt||wt.morphTargets!==Ft||wt.morphNormals!==oe||wt.morphColors!==ve||wt.toneMapping!==ge||wt.morphTargetsCount!==Pe||!!wt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(se=!0):(se=!0,wt.__version=V.version);let Ke=wt.currentProgram;se===!0&&(Ke=Ls(V,O,H),I&&V.isNodeMaterial&&I.onUpdateProgram(V,Ke,wt));let an=!1,Un=!1,yi=!1;const ce=Ke.getUniforms(),_e=wt.uniforms;if(v.useProgram(Ke.program)&&(an=!0,Un=!0,yi=!0),V.id!==it&&(it=V.id,Un=!0),wt.needsLights){const ue=Lu(T.state.lightProbeGridArray,H);wt.lightProbeGrid!==ue&&(wt.lightProbeGrid=ue,Un=!0)}if(an||ht!==b){v.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ce.setValue(D,"projectionMatrix",b.projectionMatrix),ce.setValue(D,"viewMatrix",b.matrixWorldInverse);const On=ce.map.cameraPosition;On!==void 0&&On.setValue(D,at.setFromMatrixPosition(b.matrixWorld)),C.logarithmicDepthBuffer&&ce.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ce.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),ht!==b&&(ht=b,Un=!0,yi=!0)}if(wt.needsLights&&(Ve.state.directionalShadowMap.length>0&&ce.setValue(D,"directionalShadowMap",Ve.state.directionalShadowMap,Y),Ve.state.spotShadowMap.length>0&&ce.setValue(D,"spotShadowMap",Ve.state.spotShadowMap,Y),Ve.state.pointShadowMap.length>0&&ce.setValue(D,"pointShadowMap",Ve.state.pointShadowMap,Y)),H.isSkinnedMesh){ce.setOptional(D,H,"bindMatrix"),ce.setOptional(D,H,"bindMatrixInverse");const ue=H.skeleton;ue&&(ue.boneTexture===null&&ue.computeBoneTexture(),ce.setValue(D,"boneTexture",ue.boneTexture,Y))}H.isBatchedMesh&&(ce.setOptional(D,H,"batchingTexture"),ce.setValue(D,"batchingTexture",H._matricesTexture,Y),ce.setOptional(D,H,"batchingIdTexture"),ce.setValue(D,"batchingIdTexture",H._indirectTexture,Y),ce.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&ce.setValue(D,"batchingColorTexture",H._colorsTexture,Y));const Fn=q.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&F.update(H,q,Ke),(Un||wt.receiveShadow!==H.receiveShadow)&&(wt.receiveShadow=H.receiveShadow,ce.setValue(D,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&O.environment!==null&&(_e.envMapIntensity.value=O.environmentIntensity),_e.dfgLUT!==void 0&&(_e.dfgLUT.value=M_()),Un){if(ce.setValue(D,"toneMappingExposure",w.toneMappingExposure),wt.needsLights&&Du(_e,yi),yt&&V.fog===!0&&Nt.refreshFogUniforms(_e,yt),Nt.refreshMaterialUniforms(_e,V,st,ot,T.state.transmissionRenderTarget[b.id]),wt.needsLights&&wt.lightProbeGrid){const ue=wt.lightProbeGrid;_e.probesSH.value=ue.texture,_e.probesMin.value.copy(ue.boundingBox.min),_e.probesMax.value.copy(ue.boundingBox.max),_e.probesResolution.value.copy(ue.resolution)}vr.upload(D,Bl(wt),_e,Y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(vr.upload(D,Bl(wt),_e,Y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ce.setValue(D,"center",H.center),ce.setValue(D,"modelViewMatrix",H.modelViewMatrix),ce.setValue(D,"normalMatrix",H.normalMatrix),ce.setValue(D,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){const ue=V.uniformsGroups;for(let On=0,bi=ue.length;On<bi;On++){const zl=ue[On];nt.update(zl,Ke),nt.bind(zl,Ke)}}return Ke}function Du(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Nu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(b,O,q){const V=W.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),W.get(b.texture).__webglTexture=O,W.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){const q=W.get(b);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,q=0){J=b,G=O,z=q;let V=null,H=!1,yt=!1;if(b){const Mt=W.get(b);if(Mt.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(D.FRAMEBUFFER,Mt.__webglFramebuffer),ct.copy(b.viewport),xt.copy(b.scissor),Ht=b.scissorTest,v.viewport(ct),v.scissor(xt),v.setScissorTest(Ht),it=-1;return}else if(Mt.__webglFramebuffer===void 0)Y.setupRenderTarget(b);else if(Mt.__hasExternalTextures)Y.rebindTextures(b,W.get(b.texture).__webglTexture,W.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Yt=b.depthTexture;if(Mt.__boundDepthTexture!==Yt){if(Yt!==null&&W.has(Yt)&&(b.width!==Yt.image.width||b.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(b)}}const Pt=b.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(yt=!0);const Ut=W.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ut[O])?V=Ut[O][q]:V=Ut[O],H=!0):b.samples>0&&Y.useMultisampledRTT(b)===!1?V=W.get(b).__webglMultisampledFramebuffer:Array.isArray(Ut)?V=Ut[q]:V=Ut,ct.copy(b.viewport),xt.copy(b.scissor),Ht=b.scissorTest}else ct.copy(Lt).multiplyScalar(st).floor(),xt.copy(zt).multiplyScalar(st).floor(),Ht=Ct;if(q!==0&&(V=B),v.bindFramebuffer(D.FRAMEBUFFER,V)&&v.drawBuffers(b,V),v.viewport(ct),v.scissor(xt),v.setScissorTest(Ht),H){const Mt=W.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,Mt.__webglTexture,q)}else if(yt){const Mt=O;for(let Pt=0;Pt<b.textures.length;Pt++){const Ut=W.get(b.textures[Pt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Pt,Ut.__webglTexture,q,Mt)}}else if(b!==null&&q!==0){const Mt=W.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Mt.__webglTexture,q)}it=-1},this.readRenderTargetPixels=function(b,O,q,V,H,yt,Et,Mt=0){if(!(b&&b.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=W.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Et!==void 0&&(Pt=Pt[Et]),Pt){v.bindFramebuffer(D.FRAMEBUFFER,Pt);try{const Ut=b.textures[Mt],Yt=Ut.format,Jt=Ut.type;if(b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Mt),!C.textureFormatReadable(Yt)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Jt)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-V&&q>=0&&q<=b.height-H&&D.readPixels(O,q,V,H,gt.convert(Yt),gt.convert(Jt),yt)}finally{const Ut=J!==null?W.get(J).__webglFramebuffer:null;v.bindFramebuffer(D.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(b,O,q,V,H,yt,Et,Mt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=W.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Et!==void 0&&(Pt=Pt[Et]),Pt)if(O>=0&&O<=b.width-V&&q>=0&&q<=b.height-H){v.bindFramebuffer(D.FRAMEBUFFER,Pt);const Ut=b.textures[Mt],Yt=Ut.format,Jt=Ut.type;if(b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Mt),!C.textureFormatReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ft=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ft),D.bufferData(D.PIXEL_PACK_BUFFER,yt.byteLength,D.STREAM_READ),D.readPixels(O,q,V,H,gt.convert(Yt),gt.convert(Jt),0);const oe=J!==null?W.get(J).__webglFramebuffer:null;v.bindFramebuffer(D.FRAMEBUFFER,oe);const ve=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Gd(D,ve,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ft),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,yt),D.deleteBuffer(Ft),D.deleteSync(ve),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,q=0){const V=Math.pow(2,-q),H=Math.floor(b.image.width*V),yt=Math.floor(b.image.height*V),Et=O!==null?O.x:0,Mt=O!==null?O.y:0;Y.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,Et,Mt,H,yt),v.unbindTexture()},this.copyTextureToTexture=function(b,O,q=null,V=null,H=0,yt=0){let Et,Mt,Pt,Ut,Yt,Jt,Ft,oe,ve;const ge=b.isCompressedTexture?b.mipmaps[yt]:b.image;if(q!==null)Et=q.max.x-q.min.x,Mt=q.max.y-q.min.y,Pt=q.isBox3?q.max.z-q.min.z:1,Ut=q.min.x,Yt=q.min.y,Jt=q.isBox3?q.min.z:0;else{const _e=Math.pow(2,-H);Et=Math.floor(ge.width*_e),Mt=Math.floor(ge.height*_e),b.isDataArrayTexture?Pt=ge.depth:b.isData3DTexture?Pt=Math.floor(ge.depth*_e):Pt=1,Ut=0,Yt=0,Jt=0}V!==null?(Ft=V.x,oe=V.y,ve=V.z):(Ft=0,oe=0,ve=0);const le=gt.convert(O.format),Pe=gt.convert(O.type);let wt;O.isData3DTexture?(Y.setTexture3D(O,0),wt=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Y.setTexture2DArray(O,0),wt=D.TEXTURE_2D_ARRAY):(Y.setTexture2D(O,0),wt=D.TEXTURE_2D),v.activeTexture(D.TEXTURE0),v.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),v.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),v.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const Ve=v.getParameter(D.UNPACK_ROW_LENGTH),se=v.getParameter(D.UNPACK_IMAGE_HEIGHT),Ke=v.getParameter(D.UNPACK_SKIP_PIXELS),an=v.getParameter(D.UNPACK_SKIP_ROWS),Un=v.getParameter(D.UNPACK_SKIP_IMAGES);v.pixelStorei(D.UNPACK_ROW_LENGTH,ge.width),v.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ge.height),v.pixelStorei(D.UNPACK_SKIP_PIXELS,Ut),v.pixelStorei(D.UNPACK_SKIP_ROWS,Yt),v.pixelStorei(D.UNPACK_SKIP_IMAGES,Jt);const yi=b.isDataArrayTexture||b.isData3DTexture,ce=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const _e=W.get(b),Fn=W.get(O),ue=W.get(_e.__renderTarget),On=W.get(Fn.__renderTarget);v.bindFramebuffer(D.READ_FRAMEBUFFER,ue.__webglFramebuffer),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let bi=0;bi<Pt;bi++)yi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,W.get(b).__webglTexture,H,Jt+bi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,W.get(O).__webglTexture,yt,ve+bi)),D.blitFramebuffer(Ut,Yt,Et,Mt,Ft,oe,Et,Mt,D.DEPTH_BUFFER_BIT,D.NEAREST);v.bindFramebuffer(D.READ_FRAMEBUFFER,null),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(H!==0||b.isRenderTargetTexture||W.has(b)){const _e=W.get(b),Fn=W.get(O);v.bindFramebuffer(D.READ_FRAMEBUFFER,X),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,U);for(let ue=0;ue<Pt;ue++)yi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,_e.__webglTexture,H,Jt+ue):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,_e.__webglTexture,H),ce?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Fn.__webglTexture,yt,ve+ue):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Fn.__webglTexture,yt),H!==0?D.blitFramebuffer(Ut,Yt,Et,Mt,Ft,oe,Et,Mt,D.COLOR_BUFFER_BIT,D.NEAREST):ce?D.copyTexSubImage3D(wt,yt,Ft,oe,ve+ue,Ut,Yt,Et,Mt):D.copyTexSubImage2D(wt,yt,Ft,oe,Ut,Yt,Et,Mt);v.bindFramebuffer(D.READ_FRAMEBUFFER,null),v.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ce?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(wt,yt,Ft,oe,ve,Et,Mt,Pt,le,Pe,ge.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(wt,yt,Ft,oe,ve,Et,Mt,Pt,le,ge.data):D.texSubImage3D(wt,yt,Ft,oe,ve,Et,Mt,Pt,le,Pe,ge):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,yt,Ft,oe,Et,Mt,le,Pe,ge.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,yt,Ft,oe,ge.width,ge.height,le,ge.data):D.texSubImage2D(D.TEXTURE_2D,yt,Ft,oe,Et,Mt,le,Pe,ge);v.pixelStorei(D.UNPACK_ROW_LENGTH,Ve),v.pixelStorei(D.UNPACK_IMAGE_HEIGHT,se),v.pixelStorei(D.UNPACK_SKIP_PIXELS,Ke),v.pixelStorei(D.UNPACK_SKIP_ROWS,an),v.pixelStorei(D.UNPACK_SKIP_IMAGES,Un),yt===0&&O.generateMipmaps&&D.generateMipmap(wt),v.unbindTexture()},this.initRenderTarget=function(b){W.get(b).__webglFramebuffer===void 0&&Y.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Y.setTextureCube(b,0):b.isData3DTexture?Y.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Y.setTexture2DArray(b,0):Y.setTexture2D(b,0),v.unbindTexture()},this.resetState=function(){G=0,z=0,J=null,v.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}class b_ extends Yh{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new Mi;t.deleteAttribute("uv");const e=new Lr({side:Ne}),n=new Lr,s=new bp(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new de(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Af(t,n,6),o=new Ee;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new de(t,Bi(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new de(t,Bi(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new de(t,Bi(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new de(t,Bi(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new de(t,Bi(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new de(t,Bi(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Bi(i){return new vp({color:0,emissive:16777215,emissiveIntensity:i})}const S_=`
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
  }`,w_=`
  varying vec3 vColor;
  varying float vLife;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.05, d) * vLife;
    gl_FragColor = vec4(vColor, a);
  }`;class zo{constructor(t=400,e=!1){this.head=0,this.n=t,this.pos=new Float32Array(t*3).fill(1e4),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.maxLife=new Float32Array(t).fill(1),this.col=new Float32Array(t*3),this.size=new Float32Array(t),this.gravity=new Float32Array(t),this.geom=new be,this.geom.setAttribute("position",new we(this.pos,3)),this.geom.setAttribute("aColor",new we(this.col,3)),this.geom.setAttribute("aSize",new we(this.size,1)),this.geom.setAttribute("aLife",new we(this.life,1));const n=new Ye({vertexShader:S_,fragmentShader:w_,transparent:!0,depthWrite:!1,blending:e?Ha:hi});this.points=new If(this.geom,n),this.points.frustumCulled=!1}emit(t,e,n,s,r={}){const a=r.speed??1,o=r.spread??.6,l=r.life??.7,c=r.size??.05,h=r.gravity??2,d=r.jitter??.3;for(let u=0;u<n;u++){const f=this.head;this.head=(this.head+1)%this.n;const m=f*3;this.pos[m]=t.x,this.pos[m+1]=t.y,this.pos[m+2]=t.z;const y=(Math.random()-.5)*2,g=(Math.random()-.5)*2,p=(Math.random()-.5)*2,E=a*(.5+Math.random());this.vel[m]=(e.x+y*o)*E,this.vel[m+1]=(e.y+g*o)*E,this.vel[m+2]=(e.z+p*o)*E;const A=l*(.6+Math.random()*.8);this.life[f]=1,this.maxLife[f]=A;const x=1-d+Math.random()*d*2;this.col[m]=s.r*x,this.col[m+1]=s.g*x,this.col[m+2]=s.b*x,this.size[f]=c*(.6+Math.random()*.8),this.gravity[f]=h}}update(t){const{pos:e,vel:n,life:s}=this;let r=!1;for(let a=0;a<this.n;a++){if(s[a]<=0)continue;r=!0;const o=a*3;n[o+1]-=this.gravity[a]*t,n[o]*=.98,n[o+2]*=.98,e[o]+=n[o]*t,e[o+1]+=n[o+1]*t,e[o+2]+=n[o+2]*t,s[a]-=t/this.maxLife[a],s[a]<=0&&(s[a]=0,e[o]=1e4)}r&&(this.geom.attributes.position.needsUpdate=!0,this.geom.attributes.aLife.needsUpdate=!0,this.geom.attributes.aColor.needsUpdate=!0,this.geom.attributes.aSize.needsUpdate=!0)}dispose(){this.geom.dispose(),this.points.material.dispose()}}const E_=`
  varying vec3 vPos;
  void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,T_=`
  varying vec3 vPos;
  uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uBottom;
  void main() {
    float h = normalize(vPos).y;
    vec3 c = h > 0.0 ? mix(uMid, uTop, smoothstep(0.0, 0.8, h)) : mix(uMid, uBottom, smoothstep(0.0, -0.6, h));
    gl_FragColor = vec4(c, 1.0);
  }`,A_=`
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
  }`,R_=`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;class C_{constructor(t){this.scene=new Yh,this.root=new nn,this.flakes=new zo(500,!1),this.view="none",this.width=1,this.height=1,this.camTarget=new L,this.camPos=new L(0,1,6),this.lookAt=new L,this.snap=!0,this.cueTarget=new L,this.cuePull=0,this.cueLook=new L,this.renderer=new y_({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.renderer.toneMapping=Zo,this.renderer.toneMappingExposure=.95,this.renderer.outputColorSpace=We,this.camera=new Xe(46,1,.1,100);const e=new Oo(this.renderer);this.scene.environment=e.fromScene(new b_,.04).texture,e.dispose(),this.key=new Lc(16773340,1.7),this.key.position.set(2.5,5,3),this.rim=new Lc(10406143,1.2),this.rim.position.set(-3,3,-3);const n=new Mp(12568792,3811870,.55);this.scene.add(this.key,this.rim,n,this.root,this.flakes.points),this.backMat=new Ye({vertexShader:E_,fragmentShader:T_,side:Ne,depthWrite:!1,uniforms:{uTop:{value:new Dt(723984)},uMid:{value:new Dt(2367775)},uBottom:{value:new Dt(920844)}}}),this.backdrop=new de(new Or(40,24,16),this.backMat),this.scene.add(this.backdrop),this.floorMat=new Ye({vertexShader:R_,fragmentShader:A_,uniforms:{uColor:{value:new Dt(6971738)},uRing:{value:0}}}),this.floor=new de(new Cs(16,16),this.floorMat),this.floor.rotation.x=-Math.PI/2,this.scene.add(this.floor),this.resize(),window.addEventListener("resize",()=>this.resize())}resize(){const t=window.innerWidth||1,e=window.innerHeight||1;this.width=t,this.height=e,this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.applyView(!0)}get aspect(){return this.width/this.height}fit(t){const n=Math.tan(of.degToRad(this.camera.fov/2))*Math.min(1,this.aspect);return t/n}setView(t){this.view!==t&&(this.view=t,this.applyView(!1))}applyView(t){switch(this.snap=t||this.snap,this.view){case"work":{const e=this.fit(.8);this.camPos.set(0,.35,e),this.camTarget.set(0,-.28*Math.min(1,1/this.aspect),0),this.floor.position.y=-1.6,this.floorMat.uniforms.uRing.value=0,this.backMat.uniforms.uMid.value.set(2827811);break}case"hub":{const e=Math.max(4.4,this.fit(1.3));this.camPos.set(0,2.1,e),this.camTarget.set(0,.75,0),this.floor.position.y=0,this.floorMat.uniforms.uRing.value=0,this.backMat.uniforms.uMid.value.set(2367775);break}case"title":{const e=Math.max(4.6,this.fit(1.3));this.camPos.set(.6,1.6,e),this.camTarget.set(0,-.2,0),this.floor.position.y=0,this.floorMat.uniforms.uRing.value=0,this.backMat.uniforms.uMid.value.set(2367775);break}case"cover":{const e=Math.max(3.6,this.fit(1.2));this.camPos.set(.9,1.8,e),this.camTarget.set(0,1.2,0),this.floor.position.y=0,this.floorMat.uniforms.uRing.value=0,this.backMat.uniforms.uMid.value.set(2762018);break}case"arena":{const e=Math.max(5.4,this.fit(2));this.camPos.set(.2,2.4,e),this.camTarget.set(0,1,0),this.floor.position.y=0,this.floorMat.uniforms.uRing.value=1,this.backMat.uniforms.uMid.value.set(1711142);break}}}updateCamera(t){if(this.snap)this.camera.position.copy(this.camPos),this.lookAt.copy(this.camTarget),this.snap=!1;else{const n=1-Math.exp(-t*6);this.camera.position.lerp(this.camPos,n),this.lookAt.lerp(this.camTarget,n)}const e=this.cuePull*.3;this.cueLook.lerpVectors(this.lookAt,this.cueTarget,e),e>0&&this.camera.position.lerp(this.cueTarget,e*.12),this.camera.lookAt(this.cueLook)}shake(t){this.camera.position.x+=(Math.random()-.5)*t,this.camera.position.y+=(Math.random()-.5)*t}render(){this.renderer.render(this.scene,this.camera)}ndc(t,e,n){return n.set(t/this.width*2-1,-(e/this.height)*2+1),n}}class P_{constructor(){this.blocked=!1,this.handlers=new Map,this.toastTimer=0}on(t,e){this.handlers.set(t,e);const n=document.getElementById("btn-"+t);if(!n)throw new Error("no button btn-"+t);n.addEventListener("click",s=>{s.preventDefault(),this.click(t)})}click(t){if(this.blocked)return!1;const e=document.getElementById("btn-"+t);if(!e||e.hidden||e.closest("[hidden]")||e.disabled)return!1;const n=this.handlers.get(t);return n?(n(),!0):!1}el(t){return document.getElementById(t)}show(t,e=!0){const n=document.getElementById(t);n&&(n.hidden=!e)}text(t,e){const n=document.getElementById(t);n&&n.textContent!==e&&(n.textContent=e)}screen(t,e){for(const n of e)this.show(n,n===t)}toast(t,e=2400){const n=this.el("toast");n.textContent=t,n.hidden=!1,clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>{n.hidden=!0},e)}float(t,e,n,s=""){const r=this.el("float-layer"),a=document.createElement("div");a.className="float "+s,a.textContent=t,a.style.left=(e*100).toFixed(1)+"%",a.style.top=(n*100).toFixed(1)+"%",r.appendChild(a),setTimeout(()=>a.remove(),950)}flash(){const t=this.el("flash");t.classList.remove("on"),t.offsetWidth,t.classList.add("on")}meta(t,e){for(const n of document.querySelectorAll(".lang-btn"))n.textContent=N("Язык:")+" "+t;for(const n of document.querySelectorAll(".sound-btn:not(.icon-btn)"))n.textContent=N(e?"Звук: вкл":"Звук: выкл");for(const n of document.querySelectorAll(".icon-btn.sound-btn"))n.textContent=e?"♪":"✕",n.setAttribute("aria-label",N(e?"Звук: вкл":"Звук: выкл"))}retranslate(){Mr()}card(t){const e=document.createElement("div");e.className="card"+(t.sel?" sel":"");const n=document.createElement("div");n.className="ico",n.textContent=t.icon,t.iconBg&&(n.style.background=t.iconBg),e.appendChild(n);const s=document.createElement("div");s.className="body";const r=document.createElement("div");if(r.className="name",r.textContent=t.name,s.appendChild(r),t.sub){const a=document.createElement("div");a.className="sub",a.textContent=t.sub,s.appendChild(a)}if(t.mini&&t.mini.length){const a=document.createElement("div");a.className="mini";for(const o of t.mini){const l=document.createElement("span");l.textContent=o,a.appendChild(l)}s.appendChild(a)}if(e.appendChild(s),t.button2&&t.onClick2){const a=document.createElement("button");a.className="ghost",a.textContent=t.button2,a.addEventListener("click",o=>{o.preventDefault(),this.blocked||t.onClick2()}),e.appendChild(a)}if(t.button){const a=document.createElement("button");a.className=t.buttonCls??"",a.textContent=t.button,a.disabled=!!t.buttonDisabled,t.onClick&&a.addEventListener("click",o=>{o.preventDefault(),this.blocked||t.onClick()}),e.appendChild(a)}return e}stats(t,e){t.textContent="";for(const n of e){const s=document.createElement("div");s.className="stat";const r=document.createElement("div");r.className="v",r.textContent=String(Math.round(n.v));const a=document.createElement("div");a.className="k",a.textContent=n.k;const o=document.createElement("div");o.className="bar";const l=document.createElement("div");l.style.width=Math.round(Math.min(1,n.v/n.max)*100)+"%",o.appendChild(l),s.append(r,a,o),t.appendChild(s)}}}function rr(i){const t=i/1e3,e=Math.floor(t/60),n=t-e*60;return e+":"+(n<10?"0":"")+n.toFixed(1)}class L_{constructor(){this.ctx=null,this.master=null,this.noise=null,this.scrapeGain=null,this.scrapeFilter=null,this.hum=null,this.lastHaptic=0,this.beatOn=!1,this.beatGain=null,this.beatNext=0,this.beatStep=0,this.beatTimer=0,this.muted=!1,this.focus=!0,this.ad=!1,this.platform=!1}get ready(){return!!this.ctx}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const e=new t;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.level(),this.master.connect(e.destination);const n=e.sampleRate*2,s=e.createBuffer(1,n,e.sampleRate),r=s.getChannelData(0);for(let h=0;h<n;h++)r[h]=Math.random()*2-1;this.noise=s;const a=e.createBufferSource();a.buffer=s,a.loop=!0;const o=e.createBiquadFilter();o.type="bandpass",o.frequency.value=1800,o.Q.value=1.2;const l=e.createGain();l.gain.value=0,a.connect(o),o.connect(l),l.connect(this.master),a.start(),this.scrapeFilter=o,this.scrapeGain=l;const c=e.createGain();c.gain.value=0,c.connect(this.master);for(const h of[55,55.7,110]){const d=e.createOscillator();d.type="sine",d.frequency.value=h;const u=e.createGain();u.gain.value=h>100?.05:.12,d.connect(u),u.connect(c),d.start()}this.hum=c,this.beatOn&&(this.beatOn=!1,this.arena(!0))}level(){return this.muted||!this.focus||this.ad||this.platform?0:.9}ramp(){!this.master||!this.ctx||this.master.gain.setTargetAtTime(this.level(),this.ctx.currentTime,.05)}toggleMute(){return this.muted=!this.muted,this.ramp(),this.muted}setMuted(t){this.muted=t,this.ramp()}setFocus(t){this.focus=t,this.ramp(),t&&this.ctx?.state==="suspended"&&this.ctx.resume()}adMute(t){this.ad=t,this.ramp()}platformMute(t){this.platform=t,this.ramp()}arena(t){if(!this.ctx||!this.master){this.beatOn=t;return}if(t===this.beatOn&&(!t||this.beatGain))return;if(this.beatOn=t,!t){this.beatGain&&this.beatGain.gain.setTargetAtTime(0,this.ctx.currentTime,.3),clearInterval(this.beatTimer);const n=this.beatGain;this.beatGain=null,setTimeout(()=>n?.disconnect(),1500);return}const e=this.ctx.createGain();e.gain.value=0,e.connect(this.master),e.gain.setTargetAtTime(.55,this.ctx.currentTime,.5),this.beatGain=e,this.beatNext=this.ctx.currentTime+.1,this.beatStep=0,clearInterval(this.beatTimer),this.beatTimer=window.setInterval(()=>this.scheduleBeat(),120)}scheduleBeat(){const t=this.ctx,e=this.beatGain,n=this.noise;if(!t||!e||!n)return;const s=60/140/4,r=[55,55,0,55,65.4,0,55,0,73.4,0,55,0,82.4,0,65.4,0];for(;this.beatNext<t.currentTime+.4;){const a=this.beatNext,o=this.beatStep%16;if(o%4===0){const c=t.createOscillator();c.type="sine",c.frequency.setValueAtTime(150,a),c.frequency.exponentialRampToValueAtTime(40,a+.12);const h=t.createGain();h.gain.setValueAtTime(.9,a),h.gain.exponentialRampToValueAtTime(.001,a+.22),c.connect(h),h.connect(e),c.start(a),c.stop(a+.25)}if(o%2===1){const c=t.createBufferSource();c.buffer=n;const h=t.createBiquadFilter();h.type="highpass",h.frequency.value=6e3;const d=t.createGain();d.gain.setValueAtTime(o%4===3?.22:.12,a),d.gain.exponentialRampToValueAtTime(.001,a+.05),c.connect(h),h.connect(d),d.connect(e),c.start(a),c.stop(a+.06)}if(o===4||o===12){const c=t.createBufferSource();c.buffer=n;const h=t.createBiquadFilter();h.type="bandpass",h.frequency.value=1800,h.Q.value=.7;const d=t.createGain();d.gain.setValueAtTime(.5,a),d.gain.exponentialRampToValueAtTime(.001,a+.16),c.connect(h),h.connect(d),d.connect(e),c.start(a),c.stop(a+.18)}const l=r[o];if(l){const c=t.createOscillator();c.type="square",c.frequency.value=l;const h=t.createBiquadFilter();h.type="lowpass",h.frequency.setValueAtTime(900,a),h.frequency.exponentialRampToValueAtTime(200,a+s*.9);const d=t.createGain();d.gain.setValueAtTime(.35,a),d.gain.exponentialRampToValueAtTime(.001,a+s*.95),c.connect(h),h.connect(d),d.connect(e),c.start(a),c.stop(a+s)}this.beatNext+=s,this.beatStep++}}milestone(t){this.tone(660+t*700,.25,.14,"triangle"),this.tone((660+t*700)*1.5,.3,.06,"sine",.05)}ambient(t){!this.hum||!this.ctx||this.hum.gain.setTargetAtTime(t?.35:0,this.ctx.currentTime,.4)}scrape(t,e,n){if(!this.ctx||!this.scrapeGain||!this.scrapeFilter)return;const s=this.ctx.currentTime,r=Math.min(.5,t*.02+(t>0?.05:0));let a=1400+Math.min(e,3)*900,o=1.2;if(n==="sand"&&(a=3200+Math.min(e,3)*400,o=.5),n==="spray"&&(a=2600,o=.4),n==="solvent"&&(a=900+Math.min(e,3)*300,o=2.5),this.scrapeGain.gain.setTargetAtTime(r,s,.03),this.scrapeFilter.frequency.setTargetAtTime(a,s,.05),this.scrapeFilter.Q.setTargetAtTime(o,s,.05),t>.5&&navigator.vibrate&&performance.now()-this.lastHaptic>90){this.lastHaptic=performance.now();try{navigator.vibrate(6)}catch{}}}scrapeStop(){!this.ctx||!this.scrapeGain||this.scrapeGain.gain.setTargetAtTime(0,this.ctx.currentTime,.04)}burst(t,e,n,s,r=0){if(!this.ctx||!this.noise||!this.master)return;const a=this.ctx.currentTime+r,o=this.ctx.createBufferSource();o.buffer=this.noise;const l=this.ctx.createBiquadFilter();l.type="bandpass",l.frequency.value=t,l.Q.value=e;const c=this.ctx.createGain();c.gain.setValueAtTime(s,a),c.gain.exponentialRampToValueAtTime(.001,a+n),o.connect(l),l.connect(c),c.connect(this.master),o.start(a),o.stop(a+n+.05)}tone(t,e,n,s="sine",r=0,a=1){if(!this.ctx||!this.master)return;const o=this.ctx.currentTime+r,l=this.ctx.createOscillator();l.type=s,l.frequency.setValueAtTime(t,o),a!==1&&l.frequency.exponentialRampToValueAtTime(t*a,o+e);const c=this.ctx.createGain();c.gain.setValueAtTime(n,o),c.gain.exponentialRampToValueAtTime(.001,o+e),l.connect(c),c.connect(this.master),l.start(o),l.stop(o+e+.05)}click(){this.burst(2400,3,.05,.25)}clank(){this.burst(600,6,.25,.5),this.tone(880,.5,.18,"triangle",.01,.98),this.tone(1320,.7,.1,"sine",.02,.99)}shine(){this.tone(1200,.6,.12,"sine",0,2.2),this.tone(1800,.5,.06,"sine",.12,1.6)}coin(){this.tone(1568,.09,.2,"square"),this.tone(2093,.16,.2,"square",.08)}hit(t){this.burst(t?250:500,2,t?.35:.18,t?.7:.45),this.tone(t?160:320,t?.4:.2,t?.3:.15,"triangle",0,.6)}dodge(){this.burst(3e3,1,.12,.2)}charge(){this.tone(300,.5,.15,"sawtooth",0,4)}bell(){this.tone(660,.9,.25,"triangle"),this.tone(1320,.9,.1,"sine")}win(){for(const[t,e]of[523,659,784,1046].entries())this.tone(e,.35,.18,"triangle",t*.12);this.burst(800,1,.5,.2,.45)}lose(){for(const[t,e]of[392,349,311].entries())this.tone(e,.5,.16,"sawtooth",t*.2,.9)}spark(){this.burst(5e3,.8,.06,.12)}}class I_{constructor(t){this.mode="clean",this.ray=new Uo,this.tmpN=new L,this.inv=new ne,this.local=new L,this.lastLocal=null,this.tool=t}begin(){this.lastLocal=null}stroke(t,e,n,s,r,a){a.hit=!1,a.removed=0,this.ray.setFromCamera(t,e);const o=this.ray.intersectObject(n,!1);if(!o.length){this.lastLocal=null;return}const l=o[0];this.inv.copy(n.matrixWorld).invert(),this.local.copy(l.point).applyMatrix4(this.inv),a.hit=!0,a.point.copy(this.local),a.normal.copy(l.face?l.face.normal:this.tmpN.set(0,1,0));const c=(Math.min(s,.08)*12+.12)*this.tool.rate*Math.min(r,.05)*26,h=n.geometry,d=this.tool.radius;if(this.lastLocal&&this.lastLocal.distanceTo(this.local)<d*6){const u=this.lastLocal.distanceTo(this.local),f=Math.max(1,Math.min(5,Math.ceil(u/(d*.6))));for(let m=1;m<=f;m++){const y=this.tmpN.copy(this.lastLocal).lerp(this.local,m/f);a.removed+=this.apply(h,y,d,c/f)}}else a.removed+=this.apply(h,this.local,d,c);this.lastLocal||(this.lastLocal=new L),this.lastLocal.copy(this.local)}apply(t,e,n,s){const r=t.attributes.position.array,a=this.mode==="clean"?t.attributes.aClean:t.attributes.aPaint,o=a.array,l=t.attributes.aGrit.array,c=a.count,h=n*n,d=e.x,u=e.y,f=e.z;let m=0;const y=this.mode==="paint",g=this.tool.gritPenalty,p=this.tool.dissolves;for(let E=0;E<c;E++){const A=r[E*3]-d;if(A>n||A<-n)continue;const x=r[E*3+1]-u;if(x>n||x<-n)continue;const R=r[E*3+2]-f,T=A*A+x*x+R*R;if(T>h)continue;const P=o[E];if(P>=1)continue;const _=1-T/h;let M=s*_*_;if(!y){const S=l[E];S>0&&(M/=1+S*(g-1),p&&(l[E]=Math.max(0,S-s*_)))}const w=P+M>1?1:P+M;m+=w-P,o[E]=w}return m>0&&(a.needsUpdate=!0),m}}class vn{constructor(t){this.s=t>>>0||2654435769}next(){this.s=this.s+1831565813>>>0;let t=this.s;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return t+Math.floor(this.next()*(e-t+1))}pick(t){return t[Math.floor(this.next()*t.length)]}chance(t){return this.next()<t}fork(t){return new vn(_u(this.s^Math.imul(t+1,2246822507)))}}function En(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function _u(i){return i=Math.imul(i^i>>>16,73244475),i=Math.imul(i^i>>>16,73244475),(i^i>>>16)>>>0}function D_(i,t,e,n){let s=_u(i*73856093^t*19349663^e*83492791^n);return s=s>>>0,(s&65535)/65535}const Ea=i=>i*i*(3-2*i);function sh(i,t,e,n=0){const s=Math.floor(i),r=Math.floor(t),a=Math.floor(e),o=Ea(i-s),l=Ea(t-r),c=Ea(e-a),h=(p,E,A)=>D_(s+p,r+E,a+A,n),d=h(0,0,0)+(h(1,0,0)-h(0,0,0))*o,u=h(0,1,0)+(h(1,1,0)-h(0,1,0))*o,f=h(0,0,1)+(h(1,0,1)-h(0,0,1))*o,m=h(0,1,1)+(h(1,1,1)-h(0,1,1))*o,y=d+(u-d)*l,g=f+(m-f)*l;return y+(g-y)*c}function Vo(i,t,e,n=0){return sh(i,t,e,n)*.65+sh(i*2.3+7.1,t*2.3+3.7,e*2.3+1.9,n)*.35}function N_(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new be;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=rh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let y=0;y<a[h].length;++y)f.push(a[h][y][u]);const m=rh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function rh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new we(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/e;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<e;m++){const y=h.getComponent(u,m);o.setComponent(u+d,m,y)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}function U_(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let a=0;const o=Object.keys(i.attributes),l={},c={},h=[],d=["getX","getY","getZ","getW"],u=["setX","setY","setZ","setW"];for(let E=0,A=o.length;E<A;E++){const x=o[E],R=i.attributes[x];l[x]=new R.constructor(new R.array.constructor(R.count*R.itemSize),R.itemSize,R.normalized);const T=i.morphAttributes[x];T&&(c[x]||(c[x]=[]),T.forEach((P,_)=>{const M=new P.array.constructor(P.count*P.itemSize);c[x][_]=new P.constructor(M,P.itemSize,P.normalized)}))}const f=t*.5,m=Math.log10(1/t),y=Math.pow(10,m),g=f*y;for(let E=0;E<r;E++){const A=n?n.getX(E):E;let x="";for(let R=0,T=o.length;R<T;R++){const P=o[R],_=i.getAttribute(P),M=_.itemSize;for(let w=0;w<M;w++)x+=`${~~(_[d[w]](A)*y+g)},`}if(x in e)h.push(e[x]);else{for(let R=0,T=o.length;R<T;R++){const P=o[R],_=i.getAttribute(P),M=i.morphAttributes[P],w=_.itemSize,S=l[P],I=c[P];for(let B=0;B<w;B++){const X=d[B],U=u[B];if(S[U](a,_[X](A)),M)for(let G=0,z=M.length;G<z;G++)I[G][U](a,M[G][X](A))}}e[x]=a,h.push(a),a++}}const p=i.clone();for(const E in i.attributes){const A=l[E];if(p.setAttribute(E,new A.constructor(A.array.slice(0,a*A.itemSize),A.itemSize,A.normalized)),E in c)for(let x=0;x<c[E].length;x++){const R=c[E][x];p.morphAttributes[E][x]=new R.constructor(R.array.slice(0,a*R.itemSize),R.itemSize,R.normalized)}}return p.setIndex(h),p}class F_{constructor(t=.1,e=6){this.maxEdgeLength=t,this.maxIterations=e}modify(t){t.index!==null&&(t=t.toNonIndexed());const e=this.maxIterations,n=this.maxEdgeLength*this.maxEdgeLength,s=new L,r=new L,a=new L,o=new L,l=[s,r,a,o],c=new L,h=new L,d=new L,u=new L,f=[c,h,d,u],m=new Dt,y=new Dt,g=new Dt,p=new Dt,E=[m,y,g,p],A=new rt,x=new rt,R=new rt,T=new rt,P=[A,x,R,T],_=new rt,M=new rt,w=new rt,S=new rt,I=[_,M,w,S],B=t.attributes,X=B.normal!==void 0,U=B.color!==void 0,G=B.uv!==void 0,z=B.uv1!==void 0;let J=B.position.array,it=X?B.normal.array:null,ht=U?B.color.array:null,ct=G?B.uv.array:null,xt=z?B.uv1.array:null,Ht=J,ie=it,Kt=ht,Z=ct,ot=xt,st=0,Rt=!0;function Ot(zt,Ct,j){const et=l[zt],tt=l[Ct],ut=l[j];if(Ht.push(et.x,et.y,et.z),Ht.push(tt.x,tt.y,tt.z),Ht.push(ut.x,ut.y,ut.z),X){const at=f[zt],Tt=f[Ct],St=f[j];ie.push(at.x,at.y,at.z),ie.push(Tt.x,Tt.y,Tt.z),ie.push(St.x,St.y,St.z)}if(U){const at=E[zt],Tt=E[Ct],St=E[j];Kt.push(at.r,at.g,at.b),Kt.push(Tt.r,Tt.g,Tt.b),Kt.push(St.r,St.g,St.b)}if(G){const at=P[zt],Tt=P[Ct],St=P[j];Z.push(at.x,at.y),Z.push(Tt.x,Tt.y),Z.push(St.x,St.y)}if(z){const at=I[zt],Tt=I[Ct],St=I[j];ot.push(at.x,at.y),ot.push(Tt.x,Tt.y),ot.push(St.x,St.y)}}for(;Rt&&st<e;){st++,Rt=!1,J=Ht,Ht=[],X&&(it=ie,ie=[]),U&&(ht=Kt,Kt=[]),G&&(ct=Z,Z=[]),z&&(xt=ot,ot=[]);for(let zt=0,Ct=0,j=J.length;zt<j;zt+=9,Ct+=6){s.fromArray(J,zt+0),r.fromArray(J,zt+3),a.fromArray(J,zt+6),X&&(c.fromArray(it,zt+0),h.fromArray(it,zt+3),d.fromArray(it,zt+6)),U&&(m.fromArray(ht,zt+0),y.fromArray(ht,zt+3),g.fromArray(ht,zt+6)),G&&(A.fromArray(ct,Ct+0),x.fromArray(ct,Ct+2),R.fromArray(ct,Ct+4)),z&&(_.fromArray(xt,Ct+0),M.fromArray(xt,Ct+2),w.fromArray(xt,Ct+4));const et=s.distanceToSquared(r),tt=r.distanceToSquared(a),ut=s.distanceToSquared(a);et>n||tt>n||ut>n?(Rt=!0,et>=tt&&et>=ut?(o.lerpVectors(s,r,.5),X&&u.lerpVectors(c,h,.5),U&&p.lerpColors(m,y,.5),G&&T.lerpVectors(A,x,.5),z&&S.lerpVectors(_,M,.5),Ot(0,3,2),Ot(3,1,2)):tt>=et&&tt>=ut?(o.lerpVectors(r,a,.5),X&&u.lerpVectors(h,d,.5),U&&p.lerpColors(y,g,.5),G&&T.lerpVectors(x,R,.5),z&&S.lerpVectors(M,w,.5),Ot(0,1,3),Ot(3,2,0)):(o.lerpVectors(s,a,.5),X&&u.lerpVectors(c,d,.5),U&&p.lerpColors(m,g,.5),G&&T.lerpVectors(A,R,.5),z&&S.lerpVectors(_,w,.5),Ot(0,1,3),Ot(3,1,2))):Ot(0,1,2)}}const Lt=new be;return Lt.setAttribute("position",new ee(Ht,3)),X&&Lt.setAttribute("normal",new ee(ie,3)),U&&Lt.setAttribute("color",new ee(Kt,3)),G&&Lt.setAttribute("uv",new ee(Z,2)),z&&Lt.setAttribute("uv1",new ee(ot,2)),Lt}}const ui=["body","limbL","limbR","joint","core"],ji={body:["plate","bracket","dome","flange"],limbL:["piston","claw","exhaust","crank"],limbR:["piston","claw","exhaust","crank"],joint:["gear","flange","crank","turbine"],core:["dome","turbine","gear","exhaust"]},O_=i=>{const t=i.map(n=>{const s=n.index?n.toNonIndexed():n;for(const r of Object.keys(s.attributes))r!=="position"&&r!=="normal"&&r!=="uv"&&s.deleteAttribute(r);return s.attributes.uv||s.setAttribute("uv",new ee(new Float32Array(s.attributes.position.count*2),2)),s}),e=N_(t,!1);if(!e)throw new Error("mergeGeometries failed");return e},Se=(i,t,e,n=32,s=1,r=!1)=>new dl(i,t,e,n,s,r),Nn=(i,t,e)=>new Mi(i,t,e,2,2,2),mi=(i,t,e=32,n=12)=>new _l(i,t,n,e),bl=(i,t=24)=>new Or(i,t,Math.max(8,t>>1)),Sl=(i,t)=>Se(i,i,t,6),Rs=(i,t=48)=>new vl(i.map(([e,n])=>new rt(e,n)),t),wl=(i,t,e=.02,n=12)=>{const s=new gl(i,{depth:t,bevelEnabled:e>0,bevelThickness:e,bevelSize:e,bevelSegments:2,curveSegments:n});return s.translate(0,0,-t/2),s},xu=(i,t,e)=>{const n=[];for(let s=0;s<i;s++){const r=s/i*Math.PI*2;n.push(e(Math.cos(r)*t,Math.sin(r)*t,r,s))}return n};function B_(i){const t=i.int(9,16),e=.5,n=e-i.range(.06,.1),s=new Fr,r=Math.PI*2/t;for(let h=0;h<t;h++){const d=h*r,u=[[d,n],[d+r*.18,e],[d+r*.5,e],[d+r*.68,n]];for(const[f,m]of u){const y=Math.cos(f)*m,g=Math.sin(f)*m;h===0&&f===d?s.moveTo(y,g):s.lineTo(y,g)}}s.closePath();const a=new Ji;a.absarc(0,0,i.range(.1,.15),0,Math.PI*2,!0),s.holes.push(a);const o=i.int(0,5);for(let h=0;h<o;h++){const d=h/o*Math.PI*2,u=new Ji;u.absarc(Math.cos(d)*.29,Math.sin(d)*.29,.07,0,Math.PI*2,!0),s.holes.push(u)}const l=i.range(.12,.2),c=i.range(.16,.22);return[wl(s,l,.015,6),Se(c,c,l+.16,32).rotateX(Math.PI/2),Se(.1,.1,l+.3,24).rotateX(Math.PI/2)]}function k_(i){const t=i.range(.22,.3),e=i.range(.6,.8),n=i.range(.07,.1),s=[Se(t,t,e,40,4),Se(t+.03,t+.03,.08,40).translate(0,e/2-.02,0),Se(t+.03,t+.03,.08,40).translate(0,-e/2+.02,0),Se(n,n,e*.9,24).translate(0,e*.9,0),mi(.16,.05,32,12).translate(0,e*1.35,0),Se(.2,.2,.3,24).rotateZ(Math.PI/2).translate(0,-e/2-.1,0)],r=i.int(0,3);for(let a=0;a<r;a++)s.push(mi(t+.01,.025,40,8).rotateX(Math.PI/2).translate(0,-e*.3+a*.16,0));return i.chance(.6)&&s.push(Nn(.12,.2,.08).translate(t+.02,0,0)),s}function z_(i){const e=i.range(.08,.14),n=i.range(.1,.18),s=i.range(.12,.2),r=Rs([[s,-n/2],[.5,-n/2],[.5,n/2],[.5-e,n/2],[.5-e,n/2+i.range(.1,.22)],[s+.1,n/2+.25],[s,n/2+.25],[s,-n/2]],56),a=i.int(6,10),o=xu(a,.5-e/2,(l,c)=>Sl(.045,.06).translate(l,n/2+.03,c));return[r,...o]}function V_(i){const t=i.range(.9,1.1),e=i.range(.5,.7),n=.1,s=new Fr,r=.08;s.moveTo(-t/2+r,-e/2),s.lineTo(t/2-r,-e/2),s.quadraticCurveTo(t/2,-e/2,t/2,-e/2+r),s.lineTo(t/2,e/2-r),s.quadraticCurveTo(t/2,e/2,t/2-r,e/2),s.lineTo(-t/2+r,e/2),s.quadraticCurveTo(-t/2,e/2,-t/2,e/2-r),s.lineTo(-t/2,-e/2+r),s.quadraticCurveTo(-t/2,-e/2,-t/2+r,-e/2);const a=i.int(2,4);for(let c=0;c<a;c++){const h=new Ji;h.absarc(-t/2+(c+.5)*(t/a),0,i.range(.05,.09),0,Math.PI*2,!0),s.holes.push(h)}const o=[wl(s,n,.015,8)];o.push(Nn(t,n,i.range(.3,.45)).translate(0,-e/2-n/2,-.15)),i.chance(.7)&&o.push(Nn(n,e*.8,.3).translate(i.pick([-1,1])*(t/2-n/2),0,-.12));const l=i.int(3,6);for(let c=0;c<l;c++)o.push(bl(.03,10).translate(-t/2+(c+.5)*(t/l),e/2-.08,n/2));return o}function G_(i){const t=i.int(2,3),e=.28,n=.09,s=i.range(.16,.22),r=[];let a=-((t*2+1)*e)/2;r.push(Se(n,n,e,24).rotateZ(Math.PI/2).translate(a+e/2,0,0)),a+=e;for(let o=0;o<t;o++){const l=o%2===0?1:-1;r.push(Nn(.08,s*2+.12,.3).translate(a+.04,l*s/2,0)),r.push(Se(n*.9,n*.9,e,24).rotateZ(Math.PI/2).translate(a+e/2+.04,l*s,0)),r.push(Nn(.08,s*2+.12,.3).translate(a+e+.04,l*s/2,0)),a+=e+.08,r.push(Se(n,n,e*.8,24).rotateZ(Math.PI/2).translate(a+e*.4+.04,0,0)),a+=e*.8+.04}return r.push(Se(n*1.4,n*1.4,.1,24).rotateZ(Math.PI/2).translate(a,0,0)),r}function H_(i){const t=i.pick([5,6,6,8]),e=new Fr,n=i.range(0,.08);for(let o=0;o<t;o++){const l=o/t*Math.PI*2-Math.PI/2,c=.55+(o%2?-n:n),h=Math.cos(l)*c,d=Math.sin(l)*c*i.range(.95,1.05);o===0?e.moveTo(h,d):e.lineTo(h,d)}if(e.closePath(),i.chance(.5)){const o=new Ji;o.moveTo(-.15,.22),o.lineTo(.15,.22),o.lineTo(.15,.28),o.lineTo(-.15,.28),o.closePath(),e.holes.push(o)}const s=i.range(.1,.16),r=[wl(e,s,.03,4)];i.chance(.7)&&r.push(Nn(.1,.7,.06).translate(0,-.05,s/2+.03));const a=i.int(t,t*2);for(let o=0;o<a;o++){const l=o/a*Math.PI*2;r.push(Sl(.035,.05).rotateX(Math.PI/2).translate(Math.cos(l)*.42,Math.sin(l)*.42,s/2+.02))}return r.push(Nn(.7,.6,.35).translate(0,0,-s/2-.17)),r}function W_(i){const t=i.int(7,12),e=[Rs([[0,-.12],[.2,-.12],[.2,0],[.16,.18],[.08,.28],[0,.3]],40),mi(.52,.045,48,10).rotateX(Math.PI/2)],n=i.range(.3,.6);for(let s=0;s<t;s++){const r=s/t*Math.PI*2,a=Nn(.3,.02,.14);a.applyMatrix4(new ne().makeRotationX(n)),a.applyMatrix4(new ne().makeTranslation(.34,0,0)),a.applyMatrix4(new ne().makeRotationY(r)),e.push(a)}return e}function X_(i){const t=i.int(3,4),e=i.range(.22,.3),n=[Se(.24,.3,.22,32).translate(0,.1,0),Se(.12,.12,.5,24).translate(0,.45,0),mi(.18,.04,32,10).rotateX(Math.PI/2).translate(0,.25,0)];for(let s=0;s<t;s++){const r=s/t*Math.PI*2,a=new ml(new L(e*.6,0,0),new L(e*1.2,-.35,0),new L(e*.5,-.65,0)),o=new xl(a,14,.055,12,!1);o.applyMatrix4(new ne().makeRotationY(r)),n.push(o),n.push(bl(.07,12).translate(Math.cos(r)*e*.6,0,-Math.sin(r)*e*.6))}return n}function q_(i){const e=[];for(let o=0;o<=14;o++){const l=o/14*Math.PI/2;e.push([Math.cos(l)*.5,Math.sin(l)*.5*i.range(.85,1)])}e.push([.001,e[e.length-1][1]]);const r=[Rs(e,48),Rs([[.15,-.16],[.5+.06,-.16],[.5+.06,0],[.5,0],[.5,-.02],[.15,-.02]],48)],a=i.int(6,10);return r.push(...xu(a,.5+.02,(o,l)=>Sl(.04,.05).translate(o,-.08,l))),i.chance(.6)&&r.push(mi(.16,.035,32,10).translate(0,.28,.5*.8).rotateX(-.6)),i.chance(.5)&&r.push(Se(.02,.02,.35,8).translate(.3,.5+.1,0)),r}function Y_(i){const t=i.range(.13,.18),e=i.range(.9,1.1),n=[Se(t,t,e,32,6).rotateZ(Math.PI/2),Rs([[t,0],[t+.02,.1],[t+.08,.25],[t+.14,.3],[t+.1,.3],[t+.02,.22],[t-.02,.1],[t-.02,0]],40).rotateZ(-Math.PI/2).translate(e/2,0,0),Se(t+.08,t+.08,e*.5,32,1,!0).rotateZ(Math.PI/2)],s=i.int(2,4);for(let r=0;r<s;r++)n.push(mi(t+.02,.03,32,8).rotateY(Math.PI/2).translate(-e/2+(r+.5)*(e/s),0,0));return n.push(Nn(.14,.12,.08).translate(-e/2+.1,-t-.05,0)),n}const K_={gear:B_,piston:k_,flange:z_,bracket:V_,crank:G_,plate:H_,turbine:W_,claw:X_,dome:q_,exhaust:Y_};function Z_(i,t){switch(i){case"dome":return bl(.22,24).translate(0,.16,0);case"turbine":return Se(.19,.19,.06,32).translate(0,-.14,0);case"gear":return mi(.13,.03,32,8).rotateX(0);case"exhaust":return Se(.1,.1,t.range(.3,.5),20).rotateZ(Math.PI/2).translate(.3,0,0);default:return null}}const J_=new F_(.032,8);function $_(i,t,e,n){const s=new vn(t),r=K_[i](s.fork(1));let a=O_(r);a.computeBoundingBox();const o=a.boundingBox,l=new L;o.getSize(l);const c=new L;o.getCenter(c);const h=1/Math.max(l.x,l.y,l.z);a.translate(-c.x,-c.y,-c.z),a.scale(h,h,h),a=J_.modify(a),a=U_(a,1e-4),a.computeBoundingBox(),a.computeBoundingSphere();const d=a.attributes.position.count,u=a.attributes.position.array,f=new Float32Array(d),m=new Float32Array(d),y=new Float32Array(d),g=t&65535;for(let E=0;E<d;E++){const A=u[E*3],x=u[E*3+1],R=u[E*3+2],P=(Vo(A*2.4+5,x*2.4+9,R*2.4+3,g)-e)/.25;f[E]=P<=0?0:P>=1?1:P*P*(3-2*P);const M=(Vo(A*3.1+17,x*3.1+11,R*3.1+29,g+77)-(.62-n*.2))/.15;y[E]=M<=0?0:M>=1?1:M}a.setAttribute("aClean",new we(f,1)),a.setAttribute("aPaint",new we(m,1)),a.setAttribute("aGrit",new we(y,1));let p=Z_(i,s.fork(2));return p?(p.translate(-c.x,-c.y,-c.z),p.scale(h,h,h)):p=null,{geom:a,glow:p,vertexCount:d}}function us(i){const t=i.attributes.aClean.array;let e=0;for(let n=0;n<t.length;n++)e+=t[n];return t.length?e/t.length:0}function ah(i){const t=i.attributes.aPaint.array;let e=0;for(let n=0;n<t.length;n++)e+=t[n];return t.length?e/t.length:0}const Q_=`
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
`;function j_(i,t){const e=new Lr({color:16777215,metalness:1,roughness:.35,envMapIntensity:1}),n={uMetal:{value:new Dt(i)},uPaint:{value:new Dt(16777215)},uPaintMetal:{value:0},uBrushPos:{value:new L(0,99,0)},uBrushR:{value:.1},uBrushOn:{value:0},uSweep:{value:-1},uSeed:{value:t%1e3/37},uRough:{value:.35},uStampPos:{value:new L(0,99,0)},uStampR:{value:.11},uStampOn:{value:0},uAccent:{value:new Dt(16755251)}};return e.rust=n,e.onBeforeCompile=s=>{Object.assign(s.uniforms,n),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
        attribute float aClean;
        attribute float aPaint;
        attribute float aGrit;
        varying float vClean;
        varying float vPaint;
        varying float vGrit;
        varying vec3 vObj;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vClean = aClean; vPaint = aPaint; vGrit = aGrit; vObj = position;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
        ${Q_}
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
        }`)},e.customProgramCacheKey=()=>"rust-legion-rust",e}function tx(i){return new Lr({color:new Dt(i).multiplyScalar(.3),emissive:new Dt(i),emissiveIntensity:1.6,roughness:.4,metalness:0})}const Rn=[{id:"red",name:"Алая",color:14170666,metallic:0,price:60,bonus:{},hint:"Просто красиво"},{id:"blue",name:"Кобальт",color:2776024,metallic:0,price:60,bonus:{},hint:"Просто красиво"},{id:"ochre",name:"Охра",color:14262571,metallic:0,price:60,bonus:{},hint:"Просто красиво"},{id:"khaki",name:"Хаки",color:7305788,metallic:0,price:80,bonus:{},hint:"Просто красиво"},{id:"white",name:"Белая",color:15263970,metallic:0,price:80,bonus:{},hint:"Просто красиво"},{id:"black",name:"Графит",color:2303274,metallic:0,price:100,bonus:{},hint:"Просто красиво"},{id:"thermal",name:"Термостойкая",color:14834972,metallic:0,price:320,bonus:{armor:.12},hint:"Броня +12 %"},{id:"matte",name:"Матовая",color:3817287,metallic:0,price:340,bonus:{speed:.12},hint:"Скорость +12 %"},{id:"armored",name:"Армированная",color:5070394,metallic:0,price:420,bonus:{armor:.18,speed:-.05},hint:"Броня +18 %, скорость −5 %"},{id:"conductive",name:"Токопроводящая",color:2278102,metallic:.3,price:380,bonus:{energy:.16},hint:"Энергия +16 %"},{id:"chrome",name:"Хром",color:15922424,metallic:1,price:0,bonus:{armor:.06,damage:.06,speed:.06,energy:.06},rare:!0,hint:"Всё +6 %. Только за ролик"}],Ir=i=>Rn.find(t=>t.id===i),Ms=[{id:"brush",name:"Щётка",price:0,radius:.1,rate:1,gritPenalty:4,dissolves:!1,hint:"Всегда с собой",icon:"🪥"},{id:"wide",name:"Широкая щётка",price:200,radius:.16,rate:.9,gritPenalty:4,dissolves:!1,hint:"Вдвое шире",icon:"🧹"},{id:"solvent",name:"Растворитель",price:400,radius:.11,rate:.7,gritPenalty:1,dissolves:!0,hint:"Берёт въевшиеся пятна",icon:"🧪"},{id:"sand",name:"Пескоструй",price:650,radius:.13,rate:2.2,gritPenalty:1.6,dissolves:!1,hint:"Быстро и почти без пятен",icon:"💨"}],ar=i=>Ms.find(t=>t.id===i)??Ms[0],Mu=3,or=i=>400+(i-Mu)*450,Ta=6,ki=10,lr=(i,t,e=!1)=>Math.round((18+i*9)*(.4+t)*(e?3:1)),Wn=5,_r=["Свалка","Гараж","Цех","Завод","Полигон","Легион"],ds=[{id:"acid",name:"Кислотник",hint:"Каждый удар ржавит твою деталь"},{id:"grinder",name:"Дробилка",hint:"Бьёт быстро и метит в конечности"},{id:"hammer",name:"Молотобоец",hint:"Медленный, но каждый удар вдвое тяжелее"},{id:"king",name:"Ржавый король",hint:"Кислота и сила разом"}],ex=i=>90+i*45,nx=i=>15+i*5,Aa=180,Ra=40,oh=.18,Go=["Вепрь","Кузнец","Молот","Скрежет","Бивень","Ковш","Шатун","Лязг","Домкрат","Гвоздь","Тягач","Клещ","Грохот","Ротор","Стропа","Кувалда","Шкив","Патрон","Багор","Штырь","Зубило","Рашпиль","Кран","Пыж"],ix=[12106946,10134445,13218426,9411238,13812635,11055288,11901546,10332339],sx=[3787007,16742954,8257370,16765498,16730746,10120191];function ri(i,t,e={}){const n=new vn(i),s=[];for(const r of ui){const a=n.fork(r.length+r.charCodeAt(0)),o=a.pick(ji[r]),l=a.int(1,2147483647);s.push(zr(r,o,l,t,{clean:e.enemy?Math.min(1,.55+t*.035+a.range(0,.2)):0,paint:e.enemy&&a.chance(.6)?a.range(.5,1):0,paintId:e.enemy&&a.chance(.6)?a.pick(Rn).id:null}))}return{id:(e.daily?"d":e.enemy?"e":"r")+i.toString(36),seed:i,tier:t,nameIdx:n.int(0,Go.length-1),nameNum:n.int(1,99),metal:n.pick(ix),accent:n.pick(sx),parts:s,done:!!e.enemy,daily:!!e.daily}}function zr(i,t,e,n,s={}){const r=new vn(e^1540483477),a=r.chance(.35),o=s.trophy?0:Math.round(Math.min(1,Math.min(.95,.55+n*.05)+r.range(-.08,.08))*100)/100,l=s.trophy?0:Math.round(Math.min(1,Math.min(1,.15+n*.08)+r.range(-.1,.1))*100)/100;return{id:"p"+e.toString(36),role:i,arch:t,seed:e,tier:n,rust:o,grit:l,stamp:a,stampFound:!1,clean:s.clean??0,paint:s.paint??0,paintId:s.paintId??null,trophy:s.trophy}}function rx(i,t,e){const n=new vn(t);return zr(i,n.pick(ji[i]),n.int(1,2147483647),e,{clean:1,paint:1,paintId:"chrome",trophy:!0})}const ax={gear:1.12,piston:1,flange:1.05,bracket:.94,crank:1.04,plate:1.12,turbine:1.08,claw:1.15,dome:1.08,exhaust:1};function yu(i){let e=(10+i.tier*3)*(.25+.75*i.clean)*ax[i.arch];return i.stampFound&&(e*=1.08),i.trophy&&(e*=1.15),e}function Ho(i){const t=10+i.tier*3,e=i.role==="body"?4.4:i.role==="core"?3.5:i.role==="joint"?2.2:1.8;return Math.round(t*e*(.45+.55*i.clean))}const ox={body:"armor",limbL:"damage",limbR:"damage",joint:"speed",core:"energy"};function ke(i,t=0){const e={armor:0,damage:0,speed:0,energy:0},n={armor:0,damage:0,speed:0,energy:0};let s=0;for(const d of i.parts){const u=yu(d),f=ox[d.role];if(f==="damage"?(e.damage+=u,s++):e[f]+=u,d.paintId&&d.paint>0){const m=Ir(d.paintId);if(m)for(const[y,g]of Object.entries(m.bonus))n[y]+=g*d.paint/i.parts.length}}s>1&&(e.damage/=s);const r=1+t,a=e.armor*(1+n.armor)*r,o=e.damage*(1+n.damage)*r,l=e.speed*(1+n.speed)*r,c=e.energy*(1+n.energy)*r,h=i.parts.reduce((d,u)=>d+Ho(u),0);return{armor:a,damage:o,speed:l,energy:c,hp:h,power:Math.round(a+o+l+c)}}function Ca(i){return i.parts.reduce((t,e)=>t+e.clean,0)/i.parts.length}function lx(i,t){return i==="joint"?t==="gear"?new Me(0,Math.PI/2,0):t==="turbine"?new Me(0,0,Math.PI/2):new Me(0,0,0):i==="limbL"||i==="limbR"?t==="exhaust"||t==="crank"?new Me(0,0,Math.PI/2):t==="piston"?new Me(Math.PI,0,0):new Me(0,0,0):i==="core"?t==="gear"?new Me(0,0,0):t==="exhaust"?new Me(0,Math.PI/2,0):new Me(0,0,0):t==="flange"?new Me(Math.PI/2,0,0):new Me(0,0,0)}function bu(i,t,e){const n=$_(i.arch,i.seed,i.rust,i.grit);if(i.stamp){const l=cx(n.geom,i.seed);n.stamp=l}Eu(n.geom,i.clean,i.seed),ux(n.geom,i.paint,i.seed);const s=j_(t,i.seed),r=i.paintId?Ir(i.paintId):null;r&&(s.rust.uPaint.value.set(r.color),s.rust.uPaintMetal.value=r.metallic);const a=new de(n.geom,s);a.castShadow=!0,a.receiveShadow=!0;let o=null;return n.glow&&i.role==="core"&&(o=new de(n.glow,tx(e)),a.add(o)),{state:i,mesh:a,glow:o,material:s,geometry:n}}function Pa(i){const t=new nn,e=[],n=new nn,s=new nn,r=new nn;t.add(n,s,r);const a={joint:.9,body:1.15,core:.55,limbL:.85,limbR:.85},o=new Map,l=new Map;for(const R of i.parts){const T=bu(R,i.metal,i.accent);T.mesh.rotation.copy(lx(R.role,R.arch)),R.role==="limbR"&&(T.mesh.rotation.y+=Math.PI),T.mesh.scale.setScalar(a[R.role]),T.mesh.updateMatrix();const P=T.geometry.geom.boundingBox.clone().applyMatrix4(T.mesh.matrix);l.set(R.role,P),o.set(R.role,T),e.push(T)}const c=(R,T,P,_)=>{const M=o.get(R);M.mesh.position.set(T,P,0),M.mesh.userData.base=new L(T,P,0),_.add(M.mesh)},h=.06,d=l.get("joint"),u=l.get("body"),f=l.get("core"),m=-d.min.y+.02,g=m+d.max.y-h-u.min.y,E=g+u.max.y-h-f.min.y;c("joint",0,m,t),c("body",0,g,r),c("core",0,E,r);const A=g+u.min.y+(u.max.y-u.min.y)*.7;for(const R of["limbL","limbR"]){const T=l.get(R),P=R==="limbL"?-1:1,_=R==="limbL"?n:s,M=(T.max.x-T.min.x)/2;_.position.set(P*(Math.max(u.max.x,-u.min.x)+M*.7),A,0),_.userData.base=_.position.clone(),c(R,-(T.min.x+M),-T.max.y,_)}const x=new de(new ul(.9,32),new cl({color:0,transparent:!0,opacity:.45,depthWrite:!1}));return x.rotation.x=-Math.PI/2,x.position.y=.01,t.add(x),{data:i,group:t,parts:e,limbL:n,limbR:s,torso:r,height:E+f.max.y,dispose(){for(const R of e)R.geometry.geom.dispose(),R.geometry.glow?.dispose(),R.material.dispose(),R.glow?.material?.dispose();x.geometry.dispose(),x.material.dispose()}}}function cx(i,t){const e=i.attributes.position,n=i.attributes.normal,s=new vn(t^668265263);let r=0;for(let a=0;a<24;a++){const o=s.int(0,e.count-1),l=e.getX(o),c=e.getY(o),h=e.getZ(o);if((l*n.getX(o)+c*n.getY(o)+h*n.getZ(o))/(Math.hypot(l,c,h)||1)>.6){r=o;break}a===0&&(r=o)}return{pos:new L(e.getX(r),e.getY(r),e.getZ(r)),r:.11}}function hx(i,t){const e=i.attributes.position.array,n=i.attributes.aClean.array,s=t.r*t.r;let r=0,a=0;for(let o=0;o<n.length;o++){const l=e[o*3]-t.pos.x,c=e[o*3+1]-t.pos.y,h=e[o*3+2]-t.pos.z;l*l+c*c+h*h>s||(r+=n[o],a++)}return a?r/a:1}function Su(i,t,e,n){const s=i.attributes.position.array,r=i.attributes.position.count,a=new Float32Array(r),o=(t&65535)+e;for(let l=0;l<r;l++)a[l]=Vo(s[l*3]*n+5,s[l*3+1]*n+9,s[l*3+2]*n+3,o);return a}function wu(i,t,e,n){if(e<=.001){t.fill(0);return}if(e>=.999){t.fill(1);return}let s=-.5,r=1.5;for(let o=0;o<22;o++){const l=(s+r)/2;let c=0;for(let h=0;h<i.length;h++){const d=(i[h]-l)/n;c+=d<=0?0:d>=1?1:d*d*(3-2*d)}c/i.length>e?s=l:r=l}const a=(s+r)/2;for(let o=0;o<i.length;o++){const l=(i[o]-a)/n;t[o]=l<=0?0:l>=1?1:l*l*(3-2*l)}}function Eu(i,t,e){const n=i.attributes.aClean;wu(Su(i,e,0,2.4),n.array,t,.25),n.needsUpdate=!0}function ux(i,t,e){const n=i.attributes.aPaint;wu(Su(i,e,131,1.8),n.array,t,.12),n.needsUpdate=!0}const dx=22;class lh{constructor(t,e,n){this.energy=0,this.windowUntil=-1,this.crit=!1,this.hits=0,this.dir=new L,this.stats=t.stats,this.model=t.model,this.boss=t.boss??null,this.player=t.player,this.side=e,this.base=Dr.POS[e].clone(),this.parts=t.model.parts.map(s=>({role:s.state.role,state:s.state,pm:s,hp:Ho(s.state),max:Ho(s.state),alive:!0,clean:s.state.clean,taken:0,vel:new L,ang:new L,rest:!1,socket:new L,flinch:0}));for(const s of this.parts)s.pm.mesh.userData.rz=s.pm.mesh.rotation.z;this.hp0=this.parts.reduce((s,r)=>s+r.max,0),this.nextAttack=this.interval()*.6+n.range(0,.4)}get alive(){return this.part("body").alive&&this.part("core").alive}part(t){return this.parts.find(e=>e.role===t)}get hp(){return this.parts.reduce((t,e)=>t+(e.alive?e.hp:0),0)}get limbs(){return(this.part("limbL").alive?1:0)+(this.part("limbR").alive?1:0)}damageOut(){const t=this.limbs;let e=this.stats.damage*(t===2?1:t===1?.62:.3);return this.boss==="hammer"&&(e*=1.5),this.boss==="grinder"&&(e*=.7),this.boss==="king"&&(e*=1.2),e}interval(){let t=1.55-.75*(this.stats.speed/(this.stats.speed+30));return this.part("joint").alive||(t*=1.5),this.boss==="hammer"&&(t*=1.35),this.boss==="grinder"&&(t*=.7),t}dodgeVs(t){return this.part("joint").alive?Math.min(.38,Math.max(.03,.06+.35*(this.stats.speed-t.stats.speed)/(this.stats.speed+t.stats.speed+10))):0}armorRed(){return this.part("body").alive?this.stats.armor/(this.stats.armor+45):0}pickTarget(t,e){const n=this.parts.filter(a=>a.alive),s=n.map(a=>{let o=a.role==="body"?3:a.role==="core"?1.4:(a.role==="joint",2);return o*=1.3-a.clean*.6,e&&(a.role==="limbL"||a.role==="limbR"||a.role==="joint")&&(o*=3),o});let r=t.next()*s.reduce((a,o)=>a+o,0);for(let a=0;a<n.length;a++)if(r-=s[a],r<=0)return n[a];return n[n.length-1]}}const Ll=class Ll{constructor(t,e,n){this.group=new nn,this.sparks=new zo(400,!0),this.smoke=new zo(300,!1),this.speed=1,this.slow=1,this.slowUntil=0,this.cue={target:new L,pull:0},this.clock=0,this.tweens=[],this.swing=[0,0],this.done=!1,this.endAt=-1,this.winner=null,this.crits=0,this.tmp=new L,this.smokeT=0,this.floorY=.05,this.lost=[[],[]],this.hooks=n,this.rng=new vn(e),this.f=[new lh(t[0],0,this.rng),new lh(t[1],1,this.rng)];for(const s of[0,1]){const r=this.f[s],a=this.f[s===0?1:0];r.model.group.position.copy(r.base),r.dir.subVectors(a.base,r.base).normalize(),r.model.group.rotation.y=Math.atan2(r.dir.x,r.dir.z),this.group.add(r.model.group)}this.group.add(this.sparks.points,this.smoke.points),this.emitHp()}get finished(){return this.done}get time(){return this.clock}requestSpecial(){const t=this.f[0];return!t.player||t.windowUntil<0||this.clock>t.windowUntil||this.done?!1:(t.crit=!0,t.windowUntil=-1,t.nextAttack=this.clock,this.hooks.onSpecialReady(!1),!0)}emitHp(){this.hooks.onHp([this.f[0].hp/this.f[0].hp0,this.f[1].hp/this.f[1].hp0],[Math.min(1,this.f[0].energy),Math.min(1,this.f[1].energy)])}screen(t,e){return t.clone().project(e)}update(t,e){this.clock>=this.slowUntil&&(this.slow=1);const n=t*this.speed*this.slow;if(this.clock+=n,!this.done&&this.endAt<0){for(const s of[0,1]){const r=this.f[s];if(r.player&&r.windowUntil>=0&&this.clock>r.windowUntil&&(r.windowUntil=-1,this.hooks.onSpecialReady(!1)),this.clock>=r.nextAttack&&this.attack(s,e),this.endAt>=0)break}if(this.endAt<0&&this.clock>=dx){const s=this.f[0].hp/this.f[0].hp0>=this.f[1].hp/this.f[1].hp0?0:1;this.finish(s)}}for(let s=this.tweens.length-1;s>=0;s--){const r=this.tweens[s];r.t+=n;const a=Math.min(1,r.t/r.dur);r.obj.position.lerpVectors(r.from,r.to,Math.sin(a*Math.PI)),a>=1&&(r.obj.position.copy(r.from),this.tweens.splice(s,1))}for(const s of[0,1]){const r=this.f[s],a=r.model;this.swing[s]=Math.max(0,this.swing[s]-n*4);const o=this.swing[s],l=o>.5?(1-o)*2*.9:-(o*2)*1.6;a.limbR.rotation.x=-l,a.limbL.rotation.x=l*.4;let c=0;for(const d of r.parts)if(d.flinch=Math.max(0,d.flinch-n*5),d.alive){const u=d.flinch;d.pm.mesh.rotation.z=(d.pm.mesh.userData.rz??0)+Math.sin(u*24)*u*.25,d.role==="body"&&(c=u)}else d.rest||this.fallStep(d,n);a.torso.rotation.z=Math.sin(c*20)*c*.1,a.torso.position.y=c*.08;const h=Math.min(1,r.energy);for(const d of a.parts)d.glow&&(d.glow.material.emissiveIntensity=1.2+h*3+(r.windowUntil>=0?Math.sin(this.clock*20)*1.5+1.5:0));if((this.winner===null||this.winner===s)&&(a.group.position.y=Math.sin(this.clock*3+s*2)*.03),this.winner===s){const d=1-Math.exp(-n*4);a.limbL.rotation.x+=(-2.4-a.limbL.rotation.x)*d,a.limbR.rotation.x+=(-2.4-a.limbR.rotation.x)*d}}if(this.smokeT+=n,this.smokeT>.12){this.smokeT=0;for(const s of this.f)for(const r of s.parts)r.alive||(this.tmp.copy(r.socket).applyMatrix4(s.model.group.matrixWorld),this.smoke.emit(this.tmp,new L(0,1,0),1,new Dt(7829367),{speed:.5,spread:.3,life:1.6,size:.16,gravity:-.35,jitter:.2}))}if(this.endAt>=0&&this.winner!==null){const s=this.f[this.winner===0?1:0],r=Math.min(1,(this.clock-this.endAt)/1.6);s.model.group.rotation.x=r*r*1.3,s.model.group.position.y=-r*.2,!this.done&&this.clock-this.endAt>2.4&&this.tweens.length===0&&(this.done=!0,this.hooks.onEnd(this.report()))}this.sparks.update(n),this.smoke.update(n),this.cue.pull=Math.max(0,this.cue.pull-t*1.5)}fallStep(t,e){const n=t.pm.mesh;t.vel.y-=9*e,n.position.addScaledVector(t.vel,e),n.rotation.x+=t.ang.x*e,n.rotation.y+=t.ang.y*e,n.rotation.z+=t.ang.z*e;const s=this.floorY+.28;if(n.position.y<s){if(n.position.y=s,Math.abs(t.vel.y)<.6){t.rest=!0,t.vel.set(0,0,0);return}t.vel.y=-t.vel.y*.35,t.vel.x*=.6,t.vel.z*=.6,t.ang.multiplyScalar(.5),this.tmp.copy(n.position),this.sparks.emit(this.tmp,new L(0,1,0),8,new Dt(16760928),{speed:1.5,spread:1,life:.3,size:.04,gravity:5})}}attack(t,e){const n=this.f[t],s=this.f[t===0?1:0],r=this.rng;if(n.nextAttack=this.clock+n.interval()*r.range(.9,1.1),r.chance(s.dodgeVs(n))){const E=r.chance(.5)?1:-1,A=s.base.clone().add(new L(s.dir.z,0,-s.dir.x).multiplyScalar(E*.65));this.tweens.push({obj:s.model.group,from:s.base.clone(),to:A,t:0,dur:.5}),this.lunge(n,.8,.3),s.energy=Math.min(1,s.energy+s.stats.energy*.004),this.tmp.copy(s.base),this.tmp.y=1.6,this.hooks.onCallout(s.side,"dodge",this.screen(this.tmp,e)),this.checkSpecialReady(s),this.emitHp();return}let a=1,o=!1;n.energy>=1&&(n.player?n.crit?(a=2.3,o=!0,this.crits++):n.windowUntil<0&&(a=1.7,o=!0):(a=n.boss==="hammer"||n.boss==="king"?2.2:1.7,o=!0));const l=s.pickTarget(r,n.boss==="grinder"),c=n.damageOut()*r.range(.85,1.15)*a,h=s.armorRed(),d=1+(1-l.clean)*.8;let u=Math.max(1,Math.round(c*(1-h)*d));l.hp-=u,l.taken+=u,l.flinch=1,n.hits++,n.energy=Math.min(1,o?0:n.energy+n.stats.energy*.01),s.energy=Math.min(1,s.energy+s.stats.energy*.016),o&&(n.crit=!1,n.windowUntil=-1),this.lunge(n,o?1.5:1.15,o?.4:.32),this.swing[t]=1;const f=l.pm.mesh.getWorldPosition(new L),m=n.dir.clone().multiplyScalar(-1);m.y=1.1;const y=l.clean<.6;this.sparks.emit(f,m,o?70:26,new Dt(o?16773808:16760928),{speed:o?4.5:2.8,spread:.9,life:.45,size:o?.08:.05,gravity:6}),y&&this.smoke.emit(f,m,10,new Dt(9062938),{speed:1.6,spread:.9,life:.7,size:.05,gravity:3,jitter:.4});const g=s.dir.clone().multiplyScalar(-(o?.5:.18));this.tweens.push({obj:s.model.group,from:s.base.clone(),to:s.base.clone().add(g),t:0,dur:o?.5:.3});const p=this.screen(f,e);this.hooks.onHit(s.side,u,o,p),o?(this.slow=n.crit||a>=2.6?.25:.4,this.slowUntil=this.clock+.35,this.cue.target.copy(f),this.cue.pull=1,this.hooks.onCallout(s.side,n.crit||a>=2.3?"crit":"special",p)):h>.4&&r.chance(.5)&&this.hooks.onCallout(s.side,"armor",p),(n.boss==="acid"||n.boss==="king")&&l.clean>0&&(l.clean=Math.max(0,l.clean-.07),this.hooks.onRust(s.side,l.role,l.clean),this.hooks.onCallout(s.side,"rust",p)),l.hp<=0&&l.alive&&this.losePart(s,l,n.dir,e),s.alive||this.finish(t),this.checkSpecialReady(n),this.checkSpecialReady(s),this.emitHp()}checkSpecialReady(t){!t.player||t.energy<1||t.windowUntil>=0||this.endAt>=0||(t.windowUntil=this.clock+2.2,this.hooks.onSpecialReady(!0))}lunge(t,e,n){const s=t.base.clone().addScaledVector(t.dir,e);this.tweens.push({obj:t.model.group,from:t.base.clone(),to:s,t:0,dur:n})}losePart(t,e,n,s){e.alive=!1,e.hp=0,this.lost[t.side].push(e.role);const r=e.pm.mesh;r.getWorldPosition(this.tmp),e.socket.copy(this.tmp).applyMatrix4(t.model.group.matrixWorld.clone().invert());const a=new ne().copy(r.matrixWorld);r.parent?.remove(r),this.group.add(r),a.decompose(r.position,r.quaternion,r.scale),e.vel.copy(n).multiplyScalar(2.2+this.rng.range(0,1.2)),e.vel.y=3+this.rng.range(0,1.5),e.vel.x+=this.rng.range(-.8,.8),e.vel.z+=this.rng.range(-.8,.8),e.ang.set(this.rng.range(-6,6),this.rng.range(-6,6),this.rng.range(-6,6)),this.sparks.emit(this.tmp,new L(0,1,0),60,new Dt(16765056),{speed:4,spread:1,life:.6,size:.07,gravity:6}),this.smoke.emit(this.tmp,new L(0,1,0),12,new Dt(5592405),{speed:1.2,spread:.8,life:1.4,size:.2,gravity:-.3}),this.hooks.onPartLost(t.side,e.role),this.hooks.onCallout(t.side,"lost",this.screen(this.tmp,s)),this.slow=.3,this.slowUntil=this.clock+.3,this.cue.target.copy(this.tmp),this.cue.pull=1,e.role==="limbL"&&(t.model.limbL.rotation.x=0),e.role==="limbR"&&(t.model.limbR.rotation.x=0)}finish(t){if(this.endAt>=0)return;this.winner=t,this.endAt=this.clock,this.hooks.onSpecialReady(!1),this.slow=.22,this.slowUntil=this.clock+.9;const e=this.f[t===0?1:0];for(const n of e.parts)if(n.alive&&n.role!=="body"){const s=n.pm.mesh;s.getWorldPosition(this.tmp),this.lost[e.side].push(n.role),n.alive=!1;const r=new ne().copy(s.matrixWorld);s.parent?.remove(s),this.group.add(s),r.decompose(s.position,s.quaternion,s.scale),n.socket.copy(this.tmp).applyMatrix4(e.model.group.matrixWorld.clone().invert()),n.vel.set(this.rng.range(-1.5,1.5),2.5+this.rng.range(0,1.5),this.rng.range(-1.5,1.5)),n.ang.set(this.rng.range(-5,5),this.rng.range(-5,5),this.rng.range(-5,5)),this.sparks.emit(this.tmp,new L(0,1,0),30,new Dt(16765056),{speed:3,spread:1,life:.5,size:.06,gravity:6})}e.model.limbL.rotation.x=0,e.model.limbR.rotation.x=0,this.tmp.copy(e.base),this.tmp.y=1.2,this.cue.target.copy(this.tmp),this.cue.pull=1}report(){const t=this.winner??0,e=n=>{const s={body:0,limbL:0,limbR:0,joint:0,core:0};for(const r of n.parts)s[r.role]=r.taken;return s};return{winner:t,duration:this.endAt,margin:this.f[t].hp/this.f[t].hp0,lostParts:this.lost,damageTaken:[e(this.f[0]),e(this.f[1])],hits:[this.f[0].hits,this.f[1].hits],crits:this.crits}}aliveParts(t){const e={body:!0,limbL:!0,limbR:!0,joint:!0,core:!0};for(const n of this.f[t].parts)e[n.role]=n.alive;return e}dispose(){this.sparks.dispose(),this.smoke.dispose()}};Ll.POS=[new L(-1.05,0,1),new L(1.05,0,-1)];let Dr=Ll;const El={intro:[{who:"none",text:"Ржавый Яр. Двадцать лет после Большой ржавчины — кислотных дождей, что съели лиги боевых роботов и половину города."},{who:"spark",text:"Ты… новый хозяин? Я — Искра, ИИ этой мастерской. Память у меня, прости, в дырах — ржавчина."},{who:"spark",text:"Зато руки у тебя есть. Со свалки привезли робота. Сотри с него ржавчину — сколько сотрёшь, столько силы и останется."}],firstAssembled:[{who:"spark",text:"Стоит! Кривой, ржавый — но стоит. На арене Свалки такие и дерутся."},{who:"spark",text:"Помни: ржавая деталь в бою отваливается первой. Не хочешь терять руку — отчисти её."}],firstWin:[{who:"spark",text:"Победа. За неё платят и привозят следующего — ещё ржавее. Так всегда было в лигах… кажется. Что-то вспоминаю."}],firstLoss:[{who:"spark",text:"Не беда. Посмотри вердикт: противник бил туда, где ржавчина. Дочисти — или поставь деталь получше из запаса."}],firstStamp:[{who:"spark",text:"Клеймо! Под ржавчиной — знак мастера. Такие ставил… ставил кто-то, кого я знала. Деталь с клеймом крепче."}],league1:[{who:"spark",text:"Гараж. Здесь дрались за бензин и запчасти, пока дожди не начались. Память подсказывает: у меня был напарник. Робот. Чемпион."}],boss1:[{who:"spark",text:"Кислотник. Его ядро течёт той самой кислотой. Каждый его удар ржавит тебя прямо в бою — бей быстро."}],bossWin1:[{who:"spark",text:"Кислота… Я узнала её состав. Это не дождь. Это течёт из одного ядра, и оно где-то в городе."}],league2:[{who:"spark",text:"Цех. Тут собирали чемпионов. И меня тоже — я была ядром одного из них, пока меня не вынули и не поставили в стену мастерской."}],boss2:[{who:"spark",text:"Дробилка. Быстрая, метит в конечности. Береги сустав: без него ты не увернёшься."}],bossWin2:[{who:"spark",text:"В памяти всплыло имя. Король. Так звали нашего чемпиона. Того, у кого я была ядром."}],league3:[{who:"spark",text:"Завод. Отсюда Большая ржавчина и пошла. Кто-то заставил ядро чемпиона работать на пределе — и оно потекло."}],boss3:[{who:"spark",text:"Молотобоец. Медленный, но каждый удар — как пресс. Броня решает. Отчисти корпус."}],bossWin3:[{who:"spark",text:"Теперь я помню всё. Меня вынули из Короля, потому что я отказалась жечь ядро на износ. Вставили другое. Оно и потекло."}],league4:[{who:"spark",text:"Полигон. Последняя лига перед Легионом. Король ждёт там. Он всё ещё чемпион — и всё ещё течёт."}],boss4:[{who:"king",text:"Ядро. Моё старое ядро. Ты собрал её обратно в железо, мастер?"},{who:"spark",text:"Он узнал меня. Бей, не слушай. Кислота и сила разом — ничего не жалей."}],bossWin4:[{who:"king",text:"…Тихо. Впервые за двадцать лет — тихо. Спасибо."},{who:"spark",text:"Ядро остыло. Дожди кончатся. А лига… лига продолжается. Легион ждёт — теперь ты в нём чемпион."},{who:"none",text:"Ржавчина ещё будет приходить со свалки. Но теперь известно, чем её стирают."}],league5:[{who:"spark",text:"Легион. Бесконечная лестница: каждый следующий ржавее, каждый пятый — босс. Мастерская твоя. Скреби."}]},Wo={0:"Глава 1. Свалка",1:"Глава 2. Гараж",2:"Глава 3. Цех",3:"Глава 4. Завод",4:"Глава 5. Полигон",5:"Глава 6. Легион"},Yn=[{id:"c0a",chapter:0,text:"Собрать первого робота",count:i=>i.assembled,need:1,reward:60},{id:"c0b",chapter:0,text:"Отчистить деталь до блеска",count:i=>i.perfect,need:1,reward:80},{id:"c0c",chapter:0,text:"Победить трижды",count:i=>i.wins,need:3,reward:120},{id:"c1a",chapter:1,text:"Найти клеймо мастера",count:i=>i.stamps,need:1,reward:120},{id:"c1b",chapter:1,text:"Пересадить деталь с другого робота или из запаса",count:i=>i.mounted,need:1,reward:100},{id:"c1c",chapter:1,text:"Победить восемь раз",count:i=>i.wins,need:8,reward:160},{id:"c2a",chapter:2,text:"Отчистить до блеска пять деталей",count:i=>i.perfect,need:5,reward:180},{id:"c2b",chapter:2,text:"Купить краску со свойством",count:i=>i.paints,need:1,reward:120},{id:"c2c",chapter:2,text:"Собрать робота дня",count:i=>i.daily,need:1,reward:200},{id:"c3a",chapter:3,text:"Найти три клейма",count:i=>i.stamps,need:3,reward:220},{id:"c3b",chapter:3,text:"Собрать пять роботов",count:i=>i.assembled,need:5,reward:200},{id:"c3c",chapter:3,text:"Победить пятнадцать раз",count:i=>i.wins,need:15,reward:260},{id:"c4a",chapter:4,text:"Поставить на робота хромовую деталь",count:i=>i.chromeParts,need:1,reward:260},{id:"c4b",chapter:4,text:"Отчистить до блеска двенадцать деталей",count:i=>i.perfect,need:12,reward:300},{id:"c4c",chapter:4,text:"Победить двадцать раз",count:i=>i.wins,need:20,reward:320},{id:"c5a",chapter:5,text:"Победить тридцать раз",count:i=>i.wins,need:30,reward:400},{id:"c5b",chapter:5,text:"Одолеть трёх боссов Легиона",count:i=>Math.max(0,i.bosses-4),need:3,reward:500},{id:"c5c",chapter:5,text:"Открыть десять ящиков со свалки",count:i=>i.cratesOpened,need:10,reward:300}],Xn=_r.length;function fx(){const i=[];for(const t of Object.values(El))for(const e of t)i.push(e.text);return i.push(...Object.values(Wo),...Yn.map(t=>t.text)),i}const px=["title","hub","work","collection","picker","prefight","fight","result","shop","daily","quests","pause"],ch="rl_save",hh="rl_sound_off",uh="rl_parts",cr=()=>({v:1,coins:0,arrived:0,robots:[],focus:null,champion:null,slots:Mu,tools:["brush"],paints:["red"],wins:0,losses:0,battles:0,enemySeed:0,pending:0,daily:{day:"",done:!1,best:null,elapsed:0,robot:null},bin:[],bossDue:!1,chapter:0,chapterWins:0,seen:[],claimed:[],counters:{wins:0,bosses:0,assembled:0,perfect:0,stamps:0,mounted:0,paints:0,daily:0,cratesOpened:0,chromeParts:0},crates:{day:"",n:0},loan:null,dailyDoubled:!1,bossLosses:0,streak:{day:"",n:0},lastSeen:0,album:0,albumPaid:0,crateFree:!0}),zi={body:"Корпус",limbL:"Левая конечность",limbR:"Правая конечность",joint:"Сустав",core:"Ядро"},La={body:"Броня",limbL:"Урон",limbR:"Урон",joint:"Скорость",core:"Энергия"},mx={body:"▣",limbL:"◀",limbR:"▶",joint:"◎",core:"✦"},ii={body:"Корпус",limbL:"Л. рука",limbR:"П. рука",joint:"Сустав",core:"Ядро"},qn={gear:"шестерня",piston:"поршень",flange:"фланец",bracket:"кронштейн",crank:"коленвал",plate:"броневая пластина",turbine:"турбина",claw:"клешня",dome:"купол",exhaust:"выхлоп"},un=Object.keys(ji).flatMap(i=>ji[i]).filter((i,t,e)=>e.indexOf(i)===t);function Tu(i){const t=(i.stampFound?1:0)|(i.trophy?2:0)|(i.perfectPaid?4:0),e=i.paintId?Rn.findIndex(n=>n.id===i.paintId):-1;return[ui.indexOf(i.role),un.indexOf(i.arch),i.seed.toString(36),i.tier,Math.round(i.clean*100),Math.round(i.paint*100),t*16+e+1]}function Au(i){const t=ui[i[0]]??"body",e=un[i[1]]??ji[t][0],n=i[6]||0,s=Math.floor(n/16),r=n%16-1,a=zr(t,e,parseInt(i[2],36)||1,i[3]||1,{clean:Math.min(1,Math.max(0,(i[4]||0)/100)),paint:Math.min(1,Math.max(0,(i[5]||0)/100)),paintId:r>=0&&Rn[r]?Rn[r].id:null,trophy:!!(s&2)});return a.stampFound=!!(s&1),a.perfectPaid=!!(s&4),a}function dh(i){return{s:i.seed,t:i.tier,d:i.done,k:i.daily?"d":void 0,P:i.parts.map(Tu)}}function fh(i){const t=ri(i.s,i.t,{daily:i.k==="d"});return t.done=!!i.d,Array.isArray(i.P)&&i.P.length===ui.length&&(t.parts=i.P.map(Au)),t}const ph=Object.keys(El),mh=["wins","bosses","assembled","perfect","stamps","mounted","paints","daily","cratesOpened","chromeParts"],gh=(i,t)=>t.reduce((e,n,s)=>i.includes(n)?e|1<<s:e,0),vh=(i,t)=>t.filter((e,n)=>i&1<<n);function hr(){const i=new Date(Date.now()+108e5);return i.getUTCFullYear()+"-"+String(i.getUTCMonth()+1).padStart(2,"0")+"-"+String(i.getUTCDate()).padStart(2,"0")}class gx{constructor(t){this.ui=new P_,this.audio=new L_,this.phase="title",this.frames=0,this.prevPhase="hub",this.hubModel=null,this.hubExplode=1,this.hubSpin=0,this.assembling=!1,this.work=null,this.partSpin=new rt,this.pointers=new Map,this.strokeOut={removed:0,point:new L,normal:new L,hit:!1},this.pendingStroke=null,this.brushOn=0,this.sweepT=-1,this.hintShown=!0,this.dirtyT=0,this.lastClean=0,this.arena=null,this.fightModels=null,this.fight=null,this.boostNext=0,this.tmpV=new L,this.tmpN=new rt,this.flakeColor=new Dt,this.dialog=[],this.dialogAfter=null,this.showcaseRobot=null,this.picker=null,this.verdictIndex=-1,this.resultScene=null,this.pendingScene=null,this.hitCount=0,this.stage=new C_(t),this.save=this.load(),this.audio.setMuted(!!xr(hh,!1)),this.bind(t),window.__cloudArrived=()=>{this.save=this.load(),this.refreshMeta(),this.renderScreen()},this.setPhase("title"),this.refreshMeta()}load(){const t=xr(ch,null),e=cr();return t&&typeof t=="object"&&Object.assign(e,t),Array.isArray(t?.R)&&(e.robots=t.R.map(fh)),Array.isArray(e.robots)||(e.robots=[]),e.daily||(e.daily=cr().daily),t?.D?e.daily.robot=fh(t.D):t&&"D"in t&&(e.daily.robot=null),e.bin=Array.isArray(t?.B)?t.B.map(Au):[],(!Array.isArray(e.tools)||!e.tools.includes("brush"))&&(e.tools=["brush",...e.tools||[]]),(!Array.isArray(e.paints)||!e.paints.includes("red"))&&(e.paints=["red",...e.paints||[]]),e.counters={...cr().counters,...e.counters||{}},Array.isArray(t?.N)&&mh.forEach((n,s)=>{e.counters[n]=t.N[s]||0}),Array.isArray(e.seen)||(e.seen=[]),Array.isArray(e.claimed)||(e.claimed=[]),typeof t?.S=="number"&&(e.seen=vh(t.S,ph)),typeof t?.Q=="number"&&(e.claimed=vh(t.Q,Yn.map(n=>n.id))),e.crates||(e.crates={day:"",n:0}),e.streak||(e.streak={day:"",n:0}),typeof e.crateFree!="boolean"&&(e.crateFree=!0),e}persist(){const t=this.save;t.robots.length&&(t.lastSeen=Date.now());const{robots:e,daily:n,bin:s,seen:r,claimed:a,counters:o,...l}=t,c={...l,daily:{...n,robot:null},R:e.map(dh),D:n.robot?dh(n.robot):null,B:s.map(Tu),S:gh(r,ph),Q:gh(a,Yn.map(h=>h.id)),N:mh.map(h=>o[h]||0)};Ia(ch,c),this.persistParts()}persistParts(){if(!this.work)return;const t={};for(const[,e]of this.work.meshes){const n=e.geometry.geom.attributes.aClean.array,s=e.geometry.geom.attributes.aPaint.array,r=e.geometry.geom.attributes.aGrit.array,a=new Uint8Array(n.length*3);for(let l=0;l<n.length;l++)a[l*3]=n[l]*255,a[l*3+1]=s[l]*255,a[l*3+2]=r[l]*255;let o="";for(let l=0;l<a.length;l+=32768)o+=String.fromCharCode.apply(null,Array.from(a.subarray(l,l+32768)));t[e.state.id]=btoa(o)}try{localStorage.setItem(uh,JSON.stringify({id:this.work.robot.id,parts:t}))}catch{}}restoreParts(t,e){try{const n=localStorage.getItem(uh);if(!n)return!1;const s=JSON.parse(n);if(s.id!==e||!s.parts[t.state.id])return!1;const r=atob(s.parts[t.state.id]),a=t.geometry.geom.attributes.aClean.array;if(r.length!==a.length*3)return!1;const o=t.geometry.geom.attributes.aPaint.array,l=t.geometry.geom.attributes.aGrit.array;for(let c=0;c<a.length;c++)a[c]=r.charCodeAt(c*3)/255,o[c]=r.charCodeAt(c*3+1)/255,l[c]=r.charCodeAt(c*3+2)/255;return t.geometry.geom.attributes.aClean.needsUpdate=!0,t.geometry.geom.attributes.aPaint.needsUpdate=!0,t.geometry.geom.attributes.aGrit.needsUpdate=!0,!0}catch{return!1}}robotName(t){return N(Go[t.nameIdx])+"-"+t.nameNum}robotById(t){return t?this.save.robots.find(e=>e.id===t)??null:null}get focusRobot(){return this.robotById(this.save.focus)??this.save.robots[0]??null}get champion(){const t=this.robotById(this.save.champion);return t&&t.done?t:this.save.robots.find(e=>e.done)??null}arriveRobot(){if(this.save.robots.length>=this.save.slots)return null;const t=this.save.arrived+1,e=En("wreck-"+t+"-"+(this.save.enemySeed||0)+"-"+Date.now())>>>0||1,n=ri(e,t);return this.save.arrived=t,this.save.robots.push(n),this.save.focus=n.id,n}league(){return Math.min(_r.length-1,this.save.chapter)}bossFor(){if(!this.save.bossDue)return null;const t=this.save.chapter;return t>=Xn-1?ds[Math.floor(this.save.counters.bosses)%ds.length]:ds[Math.min(ds.length-1,Math.max(0,t-1))]}contractsDone(t){return Yn.filter(e=>e.chapter===t&&e.count(this.save.counters)>=e.need).length}checkProgress(){const t=this.save;if(t.bossDue)return;const e=this.contractsDone(t.chapter),n=t.chapterWins>=Wn*2;if(t.chapter===0){t.chapterWins>=3&&(e>=2||t.chapterWins>=6)&&this.advanceChapter();return}if(t.chapter>=Xn-1){t.chapterWins>=Wn&&(t.bossDue=!0,t.chapterWins=0);return}t.chapterWins>=Wn&&(e>=2||n)&&(t.bossDue=!0)}advanceChapter(){const t=this.save;t.chapter=Math.min(Xn-1,t.chapter+1),t.chapterWins=0,t.bossDue=!1,this.phase==="hub"?this.story("league"+t.chapter):this.pendingScene="league"+t.chapter}nextGoal(){const t=this.save,e=this.contractsDone(t.chapter);return t.bossDue?N("Босс ждёт на арене!"):t.chapter===0?N("До следующей главы: побед")+" "+Math.min(3,t.chapterWins)+"/3 · "+N("заданий")+" "+Math.min(2,e)+"/2 · "+N("или побед")+" "+Math.min(6,t.chapterWins)+"/6":t.chapter>=Xn-1?N("До босса Легиона: побед")+" "+t.chapterWins+"/"+Wn:N("До босса главы: побед")+" "+Math.min(Wn,t.chapterWins)+"/"+Wn+" · "+N("заданий")+" "+Math.min(2,e)+"/2 · "+N("или побед")+" "+Math.min(Wn*2,t.chapterWins)+"/"+Wn*2}get storyOpen(){return!this.ui.el("dialog").hidden}story(t,e){const n=El[t];if(!n||this.save.seen.includes(t))return e?.(),!1;if(this.save.seen.push(t),this.persist(),this.storyOpen){this.dialog.push(...n);const s=this.dialogAfter;return this.dialogAfter=()=>{s?.(),e?.()},!0}return this.dialog=[...n],this.dialogAfter=e??null,this.nextLine(),!0}nextLine(){const t=this.dialog.shift(),e=this.ui.el("dialog");if(!t){e.hidden=!0;const s=this.dialogAfter;this.dialogAfter=null,s?.();return}e.hidden=!1,this.audio.click();const n=this.ui.el("dialog-who");n.textContent=t.who==="spark"?N("Искра"):t.who==="king"?N("Ржавый король"):"",n.hidden=t.who==="none",e.classList.toggle("king",t.who==="king"),e.classList.toggle("narr",t.who==="none"),this.ui.text("dialog-text",N(t.text))}renderQuests(){const t=this.save;this.ui.text("quests-chapter",N(Wo[t.chapter]??Wo[Xn-1])),this.ui.text("quests-goal",this.nextGoal());const e=this.ui.el("quests-list");e.textContent="";const n=Yn.filter(r=>r.chapter===t.chapter);for(const r of n){const a=Math.min(r.need,r.count(t.counters)),o=a>=r.need,l=t.claimed.includes(r.id);e.appendChild(this.ui.card({icon:l?"✓":o?"★":"◻",name:N(r.text),sub:a+"/"+r.need+" · "+N("награда")+" "+r.reward,sel:o&&!l,button:l?N("Получено"):o?N("Забрать"):void 0,buttonCls:l?"owned":"",buttonDisabled:l,onClick:()=>this.claim(r.id,1),button2:o&&!l&&cn()?N("×2 (реклама)"):void 0,onClick2:()=>void this.claimAd(r.id)}))}const s=Yn.filter(r=>r.chapter<t.chapter&&!t.claimed.includes(r.id)&&r.count(t.counters)>=r.need);for(const r of s)e.appendChild(this.ui.card({icon:"★",name:N(r.text),sub:N("прошлая глава")+" · "+r.reward,sel:!0,button:N("Забрать"),onClick:()=>this.claim(r.id,1)}))}claim(t,e){const n=Yn.find(s=>s.id===t);!n||this.save.claimed.includes(t)||n.count(this.save.counters)<n.need||(this.save.claimed.push(t),this.save.coins+=n.reward*e,this.audio.coin(),this.ui.toast(N("Награда за задание:")+" +"+n.reward*e),this.ui.text("coins",String(this.save.coins)),this.persist(),this.renderQuests())}async claimAd(t){if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}this.claim(t,2)}claimable(){return Yn.filter(t=>!this.save.claimed.includes(t.id)&&t.count(this.save.counters)>=t.need).length}cratesLeft(){const t=hr();return this.save.crates.day!==t&&(this.save.crates={day:t,n:0}),3-this.save.crates.n}async crateAd(){if(!(this.cratesLeft()<=0||this.save.bin.length>=ki)){if(this.save.crateFree)this.save.crateFree=!1;else if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}this.save.crates.n++,this.save.counters.cratesOpened++,this.giveCratePart(En("crate-"+Date.now()),N("Из ящика:")),this.persist(),this.renderHub()}}giveCratePart(t,e){if(this.save.bin.length>=ki)return null;const n=new vn(t),s=n.pick(ui),r=Math.max(1,this.save.arrived+n.int(0,1)),a=zr(s,n.pick(ji[s]),n.int(1,2147483647),r,{clean:n.range(.55,.9)});return this.save.bin.push(a),this.audio.clank(),this.ui.toast(e+" "+N(zi[a.role]).toLowerCase()+" · "+N(qn[a.arch])+" · "+Math.round(a.clean*100)+"%"),a}greet(){const t=this.save,e=hr(),n=Date.now(),s=[];if(t.streak.day!==e){const r=new Date(n+108e5-864e5),a=r.getUTCFullYear()+"-"+String(r.getUTCMonth()+1).padStart(2,"0")+"-"+String(r.getUTCDate()).padStart(2,"0");if(t.streak={day:e,n:t.streak.day===a?t.streak.n+1:1},t.streak.n>1){const o=Math.min(350,50*t.streak.n);t.coins+=o,s.push(N("День подряд:")+" "+t.streak.n+" · +"+o),(t.streak.n===3||t.streak.n===7)&&this.giveCratePart(En("streak-"+e),N("Подарок за серию:"))}}else t.lastSeen&&n-t.lastSeen>8*3600*1e3&&t.counters.assembled>0&&this.giveCratePart(En("comeback-"+n),N("Пока тебя не было, привезли:"))&&s.push("");t.lastSeen=n,s.length&&(this.audio.coin(),this.ui.text("coins",String(t.coins)),s[0]&&this.ui.toast(s[0],3200)),this.persist()}async loanAd(){if(!this.work||this.save.tools.includes("sand"))return;const t=this.work.robot.parts[this.work.index];if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}this.save.loan=t.id,this.work.brush.tool=ar("sand"),this.work.brush.mode="clean",this.ui.toast(N("Пескоструй на эту деталь — твой.")),this.persist(),this.renderTools(),this.renderWorkHead()}ensureEnemy(){const t=this.champion,e=t?t.tier:1;this.save.enemySeed||(this.save.enemySeed=En("enemy-"+Date.now())>>>0||7);const n=this.bossFor();if(n){const a=(t?ke(t).power:33)*Math.max(.85,1.12-.06*(this.save.bossLosses||0));let o=null;for(let l=Math.max(1,e-1);l<=e+3;l++){const c=ri(this.save.enemySeed^625341585+l*131,l,{enemy:!0});for(const h of c.parts)h.clean=Math.min(1,h.clean+.15),n.id==="king"&&(h.paintId="chrome",h.paint=1);(!o||Math.abs(ke(c).power-a)<Math.abs(ke(o).power-a))&&(o=c)}return o.id="b"+o.seed.toString(36),o}const s=(t?ke(t).power:33)*(.88+this.save.chapter*.04);let r=null;for(let a=Math.max(1,e-2);a<=e+4;a++){const o=ri(this.save.enemySeed+a*7919,a,{enemy:!0}),l=ke(o).power;(!r||Math.abs(l-s)<Math.abs(ke(r).power-s))&&(r=o)}return r}setPhase(t){switch(t==="pause"&&this.phase!=="pause"&&(this.prevPhase=this.phase),this.phase==="work"&&t!=="work"&&t!=="pause"&&this.leaveWork(),this.phase==="fight"&&t!=="fight"&&t!=="pause"&&this.leaveArena(),this.phase=t,this.ui.screen(t,px),this.ui.show("top",t!=="title"&&t!=="fight"&&t!=="pause"),Ph(t==="work"||t==="fight"),Ch(t==="collection"||t==="shop"||t==="result"||t==="pause"),this.audio.ambient(t==="work"||t==="hub"),this.audio.arena(t==="fight"),t){case"title":this.stage.setView("title"),this.showHubModel(),this.renderTitle();break;case"hub":if(this.checkProgress(),this.stage.setView("hub"),this.showHubModel(),this.renderHub(),this.pendingScene){const e=this.pendingScene;this.pendingScene=null,this.story(e)}break;case"work":this.stage.setView("work");break;case"collection":this.renderCollection();break;case"picker":this.renderPicker();break;case"quests":this.checkProgress(),this.renderQuests();break;case"prefight":this.checkProgress(),this.renderPrefight();break;case"shop":this.renderShop();break;case"daily":this.renderDaily();break}}renderScreen(){this.setPhase(this.phase)}refreshMeta(){const t=window,e=t.__lang?t.__lang():"ru";this.ui.meta(e==="en"?"English":"Русский",!this.audio.muted),this.ui.text("coins",String(this.save.coins)),this.ui.retranslate(),this.phase!=="work"&&this.phase!=="fight"?this.renderScreen():this.phase==="work"&&this.renderWorkHead()}renderTitle(){const t=this.save.robots.length;this.ui.show("title-progress",t>0),t>0&&this.ui.text("title-progress",N("Роботов в коллекции:")+" "+t+" · "+N("Побед:")+" "+this.save.wins),this.ui.text("btn-play",t>0?N("Продолжить"):N("В мастерскую"))}showHubModel(){const t=this.focusRobot??this.showcase();if(!t){this.clearHubModel();return}if(this.hubModel&&this.hubModel.data.id===t.id&&this.hubModel.data.parts.every((e,n)=>e.id===t.parts[n].id&&e.clean===t.parts[n].clean&&e.paint===t.parts[n].paint)){this.hubModel.data=t;return}this.clearHubModel(),this.hubModel=Pa(t),this.stage.root.add(this.hubModel.group),this.hubExplode=t.done?0:1}showcase(){if(!this.showcaseRobot){const t=ri(En("showcase-rust-legion"),3,{enemy:!0});for(const e of t.parts)e.clean=.35+(e.role==="core"?.5:0),e.paint=0,e.paintId=null;this.showcaseRobot=t}return this.showcaseRobot}clearHubModel(){this.hubModel&&(this.stage.root.remove(this.hubModel.group),this.hubModel.dispose(),this.hubModel=null)}renderHub(){const t=this.focusRobot;if(this.ui.text("coins",String(this.save.coins)),!t){this.ui.text("hub-name",N("Свалка пуста")),this.ui.text("hub-sub",this.save.pending>0?N("Робот ждёт на свалке — освободи слот в коллекции"):N("Выиграй бой на арене — привезут нового")),this.ui.show("btn-restore",!1),this.ui.show("btn-assemble",!1),this.ui.el("hub-stats").textContent="";return}this.ui.text("hub-name",this.robotName(t));const e=Math.round(Ca(t)*100);this.ui.text("hub-sub",N("Уровень")+" "+t.tier+" · "+N("чистота")+" "+e+"%"+(t.done?" · "+N("собран"):" · "+N("не собран"))),this.ui.show("btn-restore",!0),this.ui.text("btn-restore",t.done?N("Дочистить"):N("Восстанавливать")),this.ui.show("btn-assemble",!t.done),this.renderStats(this.ui.el("hub-stats"),ke(t),t.tier),this.renderChips(this.ui.el("hub-parts"),t,n=>this.openPicker(t,n)),this.renderHubExtras()}renderHubExtras(){const t=this.claimable();this.ui.text("btn-quests",N("Задания")+(t?" ●"+t:""));const e=this.cratesLeft(),n=this.save.bin.length>=ki,s=this.save.crateFree;this.ui.show("btn-crate",e>0&&this.save.counters.assembled>0&&(s||cn()));const r=this.ui.el("btn-crate");r.disabled=n,r.textContent=n?N("Ящик со свалки — запас полон"):s?N("Ящик со свалки — первый бесплатно"):N("Ящик со свалки (реклама)")+" "+e+"/3",this.ui.text("hub-goal",this.nextGoal())}renderChips(t,e,n){t.textContent="",e.parts.forEach((s,r)=>{const a=document.createElement("button");a.className="chip"+(s.clean>=.995?" full":s.clean<.4?" weak":"");const o=document.createElement("span");o.className="chip-k",o.textContent=N(ii[s.role]);const l=document.createElement("span");l.className="chip-v",l.textContent=Math.round(s.clean*100)+"%"+(s.stampFound?" ✦":"")+(s.trophy?" ★":""),a.append(o,l),a.dataset.part=String(r),a.addEventListener("click",c=>{c.preventDefault(),this.ui.blocked||n(r)}),t.appendChild(a)})}openPicker(t,e){this.audio.click(),this.picker={robot:t,index:e},this.setPhase("picker")}renderPicker(){const t=this.picker;if(!t){this.setPhase("hub");return}const e=t.robot.parts[t.index];this.ui.text("picker-title",N(zi[e.role])+" · "+this.robotName(t.robot));const n=this.ui.el("picker-list");n.textContent="";const s=(r,a,o,l)=>{n.appendChild(this.ui.card({icon:r.trophy?"★":"⚙",iconBg:o?"#3a2a1a":void 0,name:N(qn[r.arch])+" · "+Math.round(r.clean*100)+"%"+(r.stampFound?" ✦":""),sub:a+" · "+N("Уровень")+" "+r.tier+" · "+N(La[r.role])+" "+Math.round(yu(r)),sel:o,button:N(o?"Чистить":"Поставить"),buttonCls:o?"ghost":"",onClick:o?()=>{this.save.focus=t.robot.id,this.enterWork(t.robot,!1,t.index)}:l}))};s(e,N("Стоит сейчас"),!0,null),this.save.bin.filter(r=>r.role===e.role).forEach(r=>s(r,N("Запас"),!1,()=>this.mountPart(t.robot,t.index,r,null)));for(const r of this.save.robots){if(r.id===t.robot.id)continue;const a=r.parts.find(o=>o.role===e.role);a&&s(a,this.robotName(r),!1,()=>this.mountPart(t.robot,t.index,a,r))}}mountPart(t,e,n,s){this.audio.init();const r=t.parts[e];if(s){const a=s.parts.findIndex(o=>o.id===n.id);s.parts[a]=r}else this.save.bin=this.save.bin.filter(a=>a.id!==n.id),this.save.bin.push(r);t.parts[e]=n,this.save.counters.mounted++,n.trophy&&this.save.counters.chromeParts++,this.audio.clank(),this.ui.toast(N("Деталь поставлена:")+" "+N(qn[n.arch])),this.clearHubModel(),this.persist(),this.save.focus=t.id,this.setPhase("hub")}renderStats(t,e,n){const s=10+n*3;this.ui.stats(t,[{k:N("Броня"),v:e.armor,max:s},{k:N("Урон"),v:e.damage,max:s},{k:N("Скорость"),v:e.speed,max:s},{k:N("Энергия"),v:e.energy,max:s}])}assemble(){const t=this.focusRobot;if(!t||t.done||this.assembling)return;t.done=!0;const e=this.champion;let n=!1;(!e||ke(t).power>ke(e).power)&&(this.save.champion=t.id,n=!!e),this.assembling=!0,this.audio.init(),this.audio.charge(),setTimeout(()=>{this.assembling=!1,this.audio.clank(),this.ui.flash(),this.save.counters.assembled++,ns(),this.persist(),this.renderHub(),this.story("firstAssembled")||this.ui.toast(N(n?"Робот собран и сильнее прежнего — теперь он чемпион.":"Робот собран! Теперь его можно выставить на арену."))},1100)}enterWork(t,e,n=0){this.leaveWork();const s=new nn;this.stage.root.add(s),this.clearHubModel(),this.work={robot:t,index:0,meshes:new Map,daily:e,startedAt:e?performance.now()-this.save.daily.elapsed:0,group:s,brush:new I_(ar(this.save.tools[this.save.tools.length-1]??"brush"))};const r=["sand","wide","brush"].find(a=>this.save.tools.includes(a))??"brush";this.work.brush.tool=ar(r),this.hintShown=!this.save.robots.some(a=>a.done)&&this.save.arrived<=1,this.ui.el("work-hint").classList.toggle("gone",!this.hintShown),this.setPhase("work"),this.showPart(n),this.renderTools()}currentPart(){return this.work?this.work.meshes.get(this.work.robot.parts[this.work.index].role)??null:null}showPart(t){if(!this.work)return;this.syncPartState();const e=this.work;e.index=(t+e.robot.parts.length)%e.robot.parts.length;const n=e.robot.parts[e.index];let s=e.meshes.get(n.role);s||(s=bu(n,e.robot.metal,e.robot.accent),this.restoreParts(s,e.robot.id),e.meshes.set(n.role,s));for(const[,r]of e.meshes)r.mesh.visible=r===s;s.geometry.stamp&&(s.material.rust.uStampPos.value.copy(s.geometry.stamp.pos),s.material.rust.uStampR.value=s.geometry.stamp.r,s.material.rust.uStampOn.value=1,s.material.rust.uAccent.value.set(e.robot.accent)),e.group.add(s.mesh),s.mesh.rotation.set(.35,-.6,0),e.brush.tool.id==="sand"&&!this.save.tools.includes("sand")&&this.save.loan!==n.id&&(e.brush.tool=ar("brush")),this.partSpin.set(0,0),this.lastClean=us(s.geometry.geom),this.renderWorkHead(),this.renderPaints()}syncPartState(){if(this.work)for(const[t,e]of this.work.meshes){const n=this.work.robot.parts.find(s=>s.role===t);n.clean=us(e.geometry.geom),n.paint=ah(e.geometry.geom)}}renderWorkHead(){if(!this.work)return;const t=this.work,e=t.robot.parts[t.index];this.ui.text("part-name",N(zi[e.role])),this.ui.text("part-idx",t.index+1+"/"+t.robot.parts.length+" · "+N(qn[e.arch]));const n=this.currentPart(),s=n?us(n.geometry.geom):e.clean,r=10+t.robot.tier*3,a=Math.round(r*(.25+.75*s));this.ui.text("part-stat",N(La[e.role])+": "+a+" / "+r);const o=Math.floor(s*100+1e-6);this.ui.text("part-pct",o+"%");const l=this.ui.el("ring-fill");l.style.strokeDashoffset=String(106.8*(1-s)),l.classList.toggle("full",s>=.995),this.ui.el("part-pct").setAttribute("aria-valuenow",String(o)),this.ui.text("btn-part-done",t.daily?N("Следующая"):N("Готово")),this.ui.show("btn-corners",!t.daily&&s>=.6&&s<.995&&cn()),this.ui.show("btn-loan",!t.daily&&!this.save.tools.includes("sand")&&this.save.loan!==e.id&&s<.995&&cn()),this.ui.show("daily-timer",t.daily),this.ui.show("btn-paint-mode",!t.daily),t.daily&&this.ui.text("daily-timer",rr(performance.now()-t.startedAt)),this.ui.text("btn-paint-mode",t.brush.mode==="paint"?N("Чистка"):N("Краска"))}renderTools(){if(!this.work)return;const t=this.ui.el("tools");t.textContent="";const e=this.work.robot.parts[this.work.index];for(const n of Ms){const s=this.save.tools.includes(n.id)||n.id==="sand"&&this.save.loan===e.id,r=document.createElement("button");if(r.className="tool"+(this.work.brush.tool.id===n.id&&this.work.brush.mode==="clean"?" on":"")+(s?"":" locked"),r.textContent=n.icon,r.setAttribute("aria-label",N(n.name)),r.dataset.tool=n.id,!s){const a=document.createElement("span");a.className="price",a.textContent=String(n.price),r.appendChild(a)}r.addEventListener("click",a=>{a.preventDefault(),this.ui.blocked||this.pickTool(n)}),t.appendChild(r)}}pickTool(t){if(!this.work)return;this.audio.init();const e=t.id==="sand"&&this.save.loan===this.work.robot.parts[this.work.index].id;if(!this.save.tools.includes(t.id)&&!e){if(this.save.coins<t.price){this.ui.toast(N("Не хватает денег. Побеждай на арене."));return}this.save.coins-=t.price,this.save.tools.push(t.id),this.audio.coin(),this.ui.toast(N("Куплено:")+" "+N(t.name)),this.ui.text("coins",String(this.save.coins)),this.persist()}this.work.brush.tool=t,this.work.brush.mode="clean",this.ui.show("paints",!1),this.ui.show("tools",!0),this.audio.click(),this.renderTools(),this.renderWorkHead()}renderPaints(){if(!this.work)return;const t=this.ui.el("paints");t.textContent="";const e=this.work.robot.parts[this.work.index];for(const n of Rn){const s=this.save.paints.includes(n.id);if(n.rare&&!s)continue;const r=document.createElement("button");r.className="swatch"+(e.paintId===n.id&&this.work.brush.mode==="paint"?" on":"")+(s?"":" locked"),r.style.background="#"+n.color.toString(16).padStart(6,"0"),r.setAttribute("aria-label",N(n.name)+(s?"":" · "+n.price)),r.dataset.paint=n.id,r.addEventListener("click",a=>{a.preventDefault(),this.ui.blocked||this.pickPaint(n)}),t.appendChild(r)}}pickPaint(t){if(!this.work)return;if(this.audio.init(),!this.save.paints.includes(t.id)){if(this.save.coins<t.price){this.ui.toast(N("Не хватает денег. Побеждай на арене."));return}this.save.coins-=t.price,this.save.paints.push(t.id),this.audio.coin(),this.ui.toast(N("Куплено:")+" "+N(t.name)),this.ui.text("coins",String(this.save.coins)),this.persist()}const e=this.currentPart(),n=this.work.robot.parts[this.work.index];if(e&&n.paintId!==t.id){n.paintId=t.id;const s=e.geometry.geom.attributes.aPaint;s.array.fill(0),s.needsUpdate=!0,e.material.rust.uPaint.value.set(t.color),e.material.rust.uPaintMetal.value=t.metallic}this.work.brush.mode="paint",this.audio.click(),this.renderPaints(),this.renderTools(),this.renderWorkHead()}togglePaintMode(){if(!this.work)return;if(this.audio.init(),this.work.brush.mode!=="paint"){const e=Rn.filter(r=>this.save.paints.includes(r.id)),n=this.work.robot.parts[this.work.index],s=n.paintId?Ir(n.paintId):null;if(!e.length){this.ui.toast(N("Красок пока нет — загляни в магазин."));return}!s||!e.includes(s)?this.pickPaint(e[0]):this.work.brush.mode="paint"}else this.work.brush.mode="clean";this.ui.show("paints",this.work.brush.mode==="paint"),this.ui.show("tools",this.work.brush.mode!=="paint"),this.renderPaints(),this.renderTools(),this.renderWorkHead()}partDone(){if(!this.work)return;this.syncPartState();const t=this.work;if(t.daily){if(t.robot.parts.every(r=>r.clean>=.995)){this.finishDaily();return}const n=t.robot.parts.findIndex((r,a)=>a>t.index&&r.clean<.995),s=n>=0?n:t.robot.parts.findIndex(r=>r.clean<.995);this.showPart(s),this.audio.click();return}this.audio.clank(),this.persist(),this.save.focus=t.robot.id,this.setPhase("hub")}leaveWork(){if(this.work){this.syncPartState(),this.work.daily&&(this.save.daily.elapsed=performance.now()-this.work.startedAt,this.save.daily.robot=this.work.robot),this.persist(),this.audio.scrapeStop(),this.stage.root.remove(this.work.group);for(const[,t]of this.work.meshes)t.geometry.geom.dispose(),t.geometry.glow?.dispose(),t.material.dispose();this.work=null,this.pointers.clear(),this.pendingStroke=null}}async cornersAd(){const t=this.currentPart();if(!t||!this.work||this.work.daily)return;if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}const n=t.geometry.geom.attributes.aClean;n.array.fill(1),n.needsUpdate=!0,this.onPartPerfect(t),this.renderWorkHead()}onPartPerfect(t){this.sweepT=0,this.audio.shine();const e=un.indexOf(t.state.arch);if(e>=0&&!(this.save.album&1<<e)){this.save.album|=1<<e;const n=un.filter((s,r)=>this.save.album&1<<r).length;n===Math.ceil(un.length/2)&&!(this.save.albumPaid&1)?(this.save.albumPaid|=1,this.save.coins+=300,this.ui.toast(N("Альбом: половина архетипов до блеска! +300"))):n===un.length&&!(this.save.albumPaid&2)?(this.save.albumPaid|=2,this.save.coins+=1e3,this.save.paints.includes("chrome")||this.save.paints.push("chrome"),this.ui.toast(N("Альбом полон! +1000 и хромовая краска"))):this.ui.toast(N("В альбом:")+" "+N(qn[t.state.arch])+" · "+n+"/"+un.length)}!this.work.daily&&!t.state.perfectPaid?(t.state.perfectPaid=!0,this.save.counters.perfect++,this.save.coins+=Ra,this.ui.text("coins",String(this.save.coins)),this.ui.float("+"+Ra,.5,.3,"big"),this.ui.toast(N("Идеально чисто!")+" +"+Ra),this.audio.coin(),ns()):this.work.daily&&this.ui.toast(N("Деталь блестит. Следующая!")),this.persist()}bind(t){t.addEventListener("pointerdown",n=>this.onDown(n)),t.addEventListener("pointermove",n=>this.onMove(n)),t.addEventListener("pointerup",n=>this.onUp(n)),t.addEventListener("pointercancel",n=>this.onUp(n)),t.addEventListener("contextmenu",n=>n.preventDefault());const e=this.ui;e.on("play",()=>{this.audio.init(),this.start()}),e.on("daily-title",()=>{this.audio.init(),this.setPhase("daily")}),e.on("lang",()=>this.toggleLang()),e.on("lang2",()=>this.toggleLang()),e.on("sound",()=>this.toggleSound()),e.on("sound2",()=>this.toggleSound()),e.on("sound-top",()=>this.toggleSound()),e.on("back",()=>this.back()),e.on("restore",()=>{const n=this.focusRobot;n&&this.enterWork(n,!1)}),e.on("assemble",()=>this.assemble()),e.on("collection",()=>this.setPhase("collection")),e.on("arena",()=>this.setPhase("prefight")),e.on("shop",()=>this.setPhase("shop")),e.on("daily",()=>this.setPhase("daily")),e.on("prev",()=>{this.audio.click(),this.showPart((this.work?.index??0)-1)}),e.on("next",()=>{this.audio.click(),this.showPart((this.work?.index??0)+1)}),e.on("paint-mode",()=>this.togglePaintMode()),e.on("part-done",()=>this.partDone()),e.on("corners",()=>void this.cornersAd()),e.on("buy-slot",()=>this.buySlot()),e.on("boost",()=>void this.boostAd()),e.on("fight",()=>this.startFight()),e.on("fast",()=>{this.arena&&(this.arena.speed=this.arena.speed>1?1:3,this.ui.text("btn-fast",this.arena.speed>1?N("Обычно ×1"):N("Быстрее ×3")))}),e.on("double",()=>void this.doubleAd()),e.on("verdict",()=>void this.verdictGo()),e.on("dialog-next",()=>this.nextLine()),e.on("quests",()=>this.setPhase("quests")),e.on("crate",()=>void this.crateAd()),e.on("loan",()=>void this.loanAd()),e.on("daily-double",()=>void this.dailyDoubleAd()),e.on("special",()=>this.special()),e.on("picker-back",()=>this.setPhase("hub")),e.on("rematch",()=>void this.rematchAd()),e.on("result-next",()=>void this.afterResult()),e.on("result-shop",()=>this.setPhase("shop")),e.on("rare-paint",()=>void this.rarePaintAd()),e.on("daily-start",()=>this.startDaily()),e.on("daily-back",()=>this.back()),e.on("resume",()=>this.setPhase(this.prevPhase)),e.on("quit",()=>{this.setPhase("title")}),window.addEventListener("keydown",n=>{this.ui.blocked||n.code==="Escape"&&(this.phase==="work"||this.phase==="fight"?this.setPhase("pause"):this.phase==="pause"&&this.setPhase(this.prevPhase))})}start(){if(!this.save.robots.length){this.arriveRobot(),this.save.lastSeen=Date.now(),this.save.streak={day:hr(),n:1},this.persist(),this.setPhase("hub"),this.story("intro",()=>this.ui.toast(N("Первый робот со свалки. Начни с любой детали.")));return}this.setPhase("hub"),this.greet()}back(){switch(this.audio.click(),this.phase){case"work":this.work?.daily?this.setPhase("daily"):this.partDone();break;case"hub":this.setPhase("title");break;case"result":this.afterResult();break;case"fight":break;default:this.setPhase("hub")}}toggleLang(){const t=window;t.__toggleLang&&t.__toggleLang().then(()=>this.refreshMeta())}toggleSound(){this.audio.init();const t=this.audio.toggleMute();Ia(hh,t),this.refreshMeta()}onDown(t){if(this.ui.blocked||this.phase!=="work"||!this.work||this.storyOpen)return;this.audio.init();try{t.target.setPointerCapture?.(t.pointerId)}catch{}const e=this.currentPart();let n=!1;if(e&&this.pointers.size===0){const s=this.stage.ndc(t.clientX,t.clientY,this.tmpN),r=new Uo;r.setFromCamera(s,this.stage.camera),n=r.intersectObject(e.mesh,!1).length>0}this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,scrub:n}),n&&(this.work.brush.begin(),this.pendingStroke={x:t.clientX,y:t.clientY,px:t.clientX,py:t.clientY},this.hintShown&&(this.hintShown=!1,this.ui.el("work-hint").classList.add("gone")))}onMove(t){const e=this.pointers.get(t.pointerId);if(!e||this.ui.blocked||!this.work)return;const n=t.clientX-e.x,s=t.clientY-e.y;if(e.scrub&&this.pointers.size===1)this.pendingStroke?(this.pendingStroke.x=t.clientX,this.pendingStroke.y=t.clientY):this.pendingStroke={x:t.clientX,y:t.clientY,px:e.x,py:e.y};else{this.partSpin.x+=n*.0085,this.partSpin.y+=s*.0085;const a=this.currentPart();a&&this.rotatePart(a.mesh,n*.0085,s*.0085)}e.x=t.clientX,e.y=t.clientY}onUp(t){const e=this.pointers.get(t.pointerId);this.pointers.delete(t.pointerId),e?.scrub&&(this.pendingStroke=null,this.audio.scrapeStop(),this.brushOn=0)}rotatePart(t,e,n){const s=new $n().setFromAxisAngle(new L(0,1,0),e),r=new $n().setFromAxisAngle(new L(1,0,0),n);t.quaternion.premultiply(s).premultiply(r)}updateWork(t){const e=this.work,n=this.currentPart();if(!e||!n)return;const s=this.pendingStroke,r=this.pointers.size===0;r&&this.partSpin.lengthSq()>1e-6?(this.rotatePart(n.mesh,this.partSpin.x*t*8,this.partSpin.y*t*8),this.partSpin.multiplyScalar(Math.exp(-t*4))):r||this.partSpin.set(0,0),n.mesh.updateMatrixWorld();let a=0;if(s){const o=Math.hypot(s.x-s.px,s.y-s.py)/Math.max(1,Math.min(window.innerWidth,window.innerHeight)),l=this.stage.ndc(s.x,s.y,this.tmpN);e.brush.stroke(l,this.stage.camera,n.mesh,o,t,this.strokeOut),s.px=s.x,s.py=s.y;const c=this.strokeOut;if(c.hit){if(this.brushOn=1,n.material.rust.uBrushPos.value.copy(c.point),n.material.rust.uBrushR.value=e.brush.tool.radius,a=c.removed,a>.05){this.tmpV.copy(c.point).applyMatrix4(n.mesh.matrixWorld);const d=c.normal.clone().transformDirection(n.mesh.matrixWorld);d.y+=.6;const u=e.brush.mode==="paint",f=Math.min(12,Math.ceil(a*(u?1.5:3)));if(u){const m=Ir(e.robot.parts[e.index].paintId??"");this.flakeColor.set(m?m.color:16777215)}else this.flakeColor.set(9062938);this.stage.flakes.emit(this.tmpV,d,f,this.flakeColor,{speed:u?.6:1.1,spread:.8,life:u?.5:.8,size:u?.03:.035,gravity:u?1.5:2.5,jitter:.45})}const h=e.brush.mode==="paint"?"spray":e.brush.tool.id==="sand"?"sand":e.brush.tool.id==="solvent"?"solvent":"brush";this.audio.scrape(a,o/Math.max(t,.001),h)}else this.brushOn=Math.max(0,this.brushOn-t*8),this.audio.scrape(0,0,"brush")}else this.brushOn=Math.max(0,this.brushOn-t*8);if(n.material.rust.uBrushOn.value=this.brushOn,this.dirtyT+=t,a>0&&this.dirtyT>.12){this.dirtyT=0;const o=us(n.geometry.geom);e.brush.mode==="clean"&&o>=.995&&this.lastClean<.995&&this.onPartPerfect(n);for(const c of[.25,.5,.75])this.lastClean<c&&o>=c&&this.audio.milestone(c);this.lastClean=o,this.renderWorkHead();const l=e.robot.parts[e.index];n.geometry.stamp&&!l.stampFound&&hx(n.geometry.geom,n.geometry.stamp)>=.85&&(l.stampFound=!0,this.save.counters.stamps++,this.audio.shine(),this.ui.flash(),this.ui.toast(N("Клеймо мастера! Деталь получает +8 %.")),ns(),this.persist(),this.story("firstStamp"))}else e.daily&&this.frames%6===0&&this.ui.text("daily-timer",rr(performance.now()-e.startedAt));this.sweepT>=0&&(this.sweepT+=t*1.4,n.material.rust.uSweep.value=this.sweepT>1.2?-1:this.sweepT,this.sweepT>1.2&&(this.sweepT=-1))}renderCollection(){const t=this.ui.el("collection-list");t.textContent="",this.ui.text("slots-line",N("Слотов:")+" "+this.save.robots.length+"/"+this.save.slots+(this.save.pending>0?" · "+N("на свалке ждут:")+" "+this.save.pending:""));for(const a of this.save.robots){const o=ke(a),l=this.champion?.id===a.id;t.appendChild(this.ui.card({icon:a.done?"🤖":"🔩",iconBg:"#"+a.metal.toString(16).padStart(6,"0")+"33",name:this.robotName(a)+(l?" ★":""),sub:N("Уровень")+" "+a.tier+" · "+N("чистота")+" "+Math.round(Ca(a)*100)+"%"+(a.done?"":" · "+N("не собран")),mini:[N("Броня")+" "+Math.round(o.armor),N("Урон")+" "+Math.round(o.damage),N("Скорость")+" "+Math.round(o.speed),N("Энергия")+" "+Math.round(o.energy)],sel:l,button:a.done?N(l?"Чемпион":"Выставить"):N("В мастерскую"),buttonCls:a.done&&l?"owned":"",onClick:()=>{if(this.audio.click(),!a.done){this.save.focus=a.id,this.enterWork(a,!1);return}this.save.champion=a.id,this.save.focus=a.id,this.persist(),this.renderCollection()},button2:this.save.robots.length>1?N("Разобрать"):void 0,onClick2:()=>this.scrap(a)}))}const e=this.save.slots<Ta;this.ui.show("btn-buy-slot",e),e&&this.ui.text("btn-buy-slot",N("Купить слот")+" · "+or(this.save.slots));const n=this.ui.el("album");n.textContent="";const s=un.filter((a,o)=>this.save.album&1<<o).length;this.ui.text("album-line",N("Альбом:")+" "+s+"/"+un.length+" · "+N("награды за половину и за все")),un.forEach((a,o)=>{const l=document.createElement("span");l.className="chip album-chip"+(this.save.album&1<<o?" full":""),l.textContent=N(qn[a]),n.appendChild(l)});const r=this.ui.el("bin-list");r.textContent="",this.ui.text("bin-line",N("Деталей в запасе:")+" "+this.save.bin.length+"/"+ki);for(const a of this.save.bin)r.appendChild(this.ui.card({icon:a.trophy?"★":"⚙",name:N(zi[a.role])+" · "+N(qn[a.arch]),sub:N("Уровень")+" "+a.tier+" · "+N("чистота")+" "+Math.round(a.clean*100)+"%"+(a.stampFound?" ✦":""),button:N("Продать")+" +"+lr(a.tier,a.clean,a.trophy),buttonCls:"ghost",onClick:()=>this.sellPart(a)}))}sellPart(t){this.audio.init();const e=lr(t.tier,t.clean,t.trophy);this.save.bin=this.save.bin.filter(n=>n.id!==t.id),this.save.coins+=e,this.audio.coin(),this.ui.toast(N("Продано:")+" +"+e),this.ui.text("coins",String(this.save.coins)),this.persist(),this.renderCollection()}scrap(t){if(this.save.robots.length<=1)return;this.audio.init(),this.save.robots=this.save.robots.filter(n=>n.id!==t.id),this.save.champion===t.id&&(this.save.champion=null),this.save.focus===t.id&&(this.save.focus=this.save.robots[0]?.id??null);let e=0;for(const n of t.parts)this.save.bin.length<ki?this.save.bin.push(n):e+=lr(n.tier,n.clean,n.trophy);if(this.save.coins+=e,this.audio.clank(),this.ui.toast(e?N("Разобран: детали в запасе, лишние проданы:")+" +"+e:N("Разобран: детали в запасе.")),this.clearHubModel(),this.save.pending>0&&this.save.robots.length<this.save.slots){this.save.pending--;const n=this.arriveRobot();n&&this.ui.toast(N("Со свалки привезли нового робота:")+" "+this.robotName(n))}this.ui.text("coins",String(this.save.coins)),this.persist(),this.renderCollection()}buySlot(){this.audio.init();const t=or(this.save.slots);if(!(this.save.slots>=Ta)){if(this.save.coins<t){this.ui.toast(N("Не хватает денег. Побеждай на арене."));return}if(this.save.coins-=t,this.save.slots++,this.audio.coin(),this.save.pending>0){this.save.pending--;const e=this.arriveRobot();e&&this.ui.toast(N("Со свалки привезли нового робота:")+" "+this.robotName(e))}this.ui.text("coins",String(this.save.coins)),this.persist(),this.phase==="collection"?this.renderCollection():this.renderShop()}}renderPrefight(){const t=this.champion,e=this.ui.el("prefight-cards");e.textContent="",this.ui.show("prefight-empty",!t),this.ui.show("btn-fight",!!t),this.ui.show("btn-boost",!!t&&this.boostNext===0&&cn()),this.ui.show("prefight-odds",!!t);const n=this.bossFor();if(n&&this.save.chapter<Xn-1&&this.story("boss"+this.save.chapter),this.ui.text("prefight-league",N("Лига:")+" "+N(_r[this.league()])+" · "+N("побед")+" "+this.save.wins+(n?" · "+N("БОСС"):"")),this.ui.show("prefight-boss",!!n),n&&this.ui.text("prefight-boss",N(n.name)+": "+N(n.hint)),!t)return;const s=this.ensureEnemy(),r=ke(t,this.boostNext),a=ke(s),o=(d,u,f)=>{const m=document.createElement("div");m.className="card"+(f?" sel":"");const y=document.createElement("div");y.className="name",y.textContent=d,m.appendChild(y);for(const[g,p]of[[N("Броня"),u.armor],[N("Урон"),u.damage],[N("Скорость"),u.speed],[N("Энергия"),u.energy],[N("Прочность"),u.hp]]){const E=document.createElement("div");E.className="stat-row";const A=document.createElement("span");A.textContent=g;const x=document.createElement("b");x.textContent=String(Math.round(p)),E.append(A,x),m.appendChild(E)}return m};e.appendChild(o(this.robotName(t)+(this.boostNext>0?" ⚡":""),r,!0));const l=document.createElement("div");l.className="vs",l.textContent="VS",e.appendChild(l),e.appendChild(o(n?N(n.name):this.robotName(s),a,!1));const c=r.power/Math.max(1,a.power),h=c>1.25?N("Шансы: уверенная победа"):c>1.05?N("Шансы: скорее победа"):c>.9?N("Шансы: равный бой"):N("Шансы: лучше дочистить");this.ui.text("prefight-odds",h)}async boostAd(){if(this.boostNext>0)return;if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}this.boostNext=oh,this.audio.charge(),this.ui.toast(N("Робот усилен на один бой!")),this.renderPrefight()}startFight(){const t=this.champion;if(!t)return;this.audio.init();const e=this.ensureEnemy(),n=this.bossFor(),s=this.boostNext;this.boostNext=0;const r=En("fight-"+this.save.battles+"-"+t.id+"-"+e.id+"-"+Math.floor(Date.now()/1e3))>>>0||3;this.fight={enemy:e,boss:n,report:null,boost:s,reward:0,doubled:!1},this.clearHubModel();const a=[Pa(t),Pa(e)];this.fightModels=a;const o=l=>[(l.x+1)/2,(1-l.y)/2];this.arena=new Dr([{stats:ke(t,s),model:a[0],player:!0},{stats:ke(e),model:a[1],player:!1,boss:n?.id??null}],r,{onHp:(l,c)=>{this.ui.el("f0-hp").style.width=Math.max(0,l[0]*100)+"%",this.ui.el("f1-hp").style.width=Math.max(0,l[1]*100)+"%",this.ui.el("f0-en").style.width=c[0]*100+"%",this.ui.el("f1-en").style.width=c[1]*100+"%"},onHit:(l,c,h,d)=>{this.hitCount++,this.audio.hit(h),h?(this.stage.shake(l===0?.3:.22),this.ui.flash()):l===0&&this.stage.shake(.08);const[u,f]=o(d);this.ui.float("-"+c,u,f,h?"big":"")},onCallout:(l,c,h)=>{const[d,u]=o(h),f={dodge:N("УВОРОТ"),crit:N("КРИТ!"),armor:N("БРОНЯ ВЫДЕРЖАЛА"),lost:N("ДЕТАЛЬ ОТОРВАНА!"),special:N("СПЕЦУДАР"),rust:N("РЖАВЕЕТ")};this.ui.float(f[c],d,u-.1,"callout "+c),c==="dodge"&&this.audio.dodge(),c==="lost"&&(this.audio.clank(),this.stage.shake(.35)),c==="crit"&&this.audio.charge()},onPartLost:()=>this.renderFightParts(),onSpecialReady:l=>{this.ui.show("btn-special",l),l&&this.audio.bell()},onRust:(l,c,h)=>{const u=this.fightModels?.[l]?.parts.find(f=>f.state.role===c);u&&Eu(u.geometry.geom,h,u.state.seed)},onEnd:l=>this.endFight(l)}),this.stage.root.add(this.arena.group),this.ui.text("f0-name",this.robotName(t)),this.ui.text("f1-name",n?N(n.name):this.robotName(e)),this.ui.text("btn-fast",N("Быстрее ×3")),this.ui.show("btn-special",!1),this.renderFightParts(),this.setPhase("fight"),this.audio.bell()}renderFightParts(){if(this.arena)for(const t of[0,1]){const e=this.ui.el("f"+t+"-parts");e.textContent="";const n=this.arena.aliveParts(t);for(const s of ui){const r=document.createElement("span");r.className="pmini"+(n[s]?"":" dead"),r.textContent=mx[s],r.setAttribute("aria-label",N(ii[s])),e.appendChild(r)}}}special(){this.arena&&this.arena.requestSpecial()&&(this.audio.charge(),this.ui.show("btn-special",!1))}leaveArena(){if(this.stage.cuePull=0,this.arena&&(this.stage.root.remove(this.arena.group),this.arena.dispose(),this.arena=null),this.fightModels){for(const t of this.fightModels)t.dispose();this.fightModels=null}}endFight(t){const e=this.fight,n=this.champion;if(!e||!n){this.setPhase("hub");return}e.report=t,this.save.battles++;const s=t.winner===0;let r=null,a=null;if(s){if(this.save.wins++,this.save.counters.wins++,e.reward=ex(e.enemy.tier)*(e.boss?2:1),this.save.coins+=e.reward,this.save.enemySeed=En("enemy-"+this.save.battles+"-"+Date.now())>>>0||11,e.boss){this.save.bossDue=!1,this.save.bossLosses=0,this.save.counters.bosses++;const f=[...n.parts].sort((m,y)=>m.clean-y.clean)[0];if(r=rx(f.role,e.enemy.seed,e.enemy.tier),this.save.bin.length<ki?this.save.bin.push(r):this.save.coins+=lr(r.tier,1,!0),this.save.paints.includes("chrome")||this.save.paints.push("chrome"),this.save.chapter<Xn-1){a="bossWin"+this.save.chapter;const m=this.save;m.chapter=Math.min(Xn-1,m.chapter+1),m.chapterWins=0,this.pendingScene="league"+m.chapter}}else this.save.chapterWins++,this.checkProgress(),this.save.wins===1&&(a="firstWin");this.arriveRobot()||this.save.pending++,this.audio.win(),ns(),Xl("wins",this.save.wins),(this.save.wins===3||this.save.wins===10)&&ed(),this.save.wins===2&&nd()}else this.save.losses++,e.boss&&(this.save.bossLosses=(this.save.bossLosses||0)+1),e.reward=nx(e.enemy.tier),this.save.coins+=e.reward,this.audio.lose(),this.save.losses===1&&(a="firstLoss");this.resultScene=a,this.persist();const o=n.parts;let l=0;for(let u=1;u<o.length;u++)o[u].clean<o[l].clean&&(l=u);const c=t.damageTaken[0];let h="body";for(const u of ui)c[u]>c[h]&&(h=u);const d=t.lostParts[0];this.verdictIndex=o[l].clean<.995?l:-1,setTimeout(()=>{if(this.phase!=="fight")return;this.ui.text("result-title",s?e.boss?N("Босс повержен!"):N("Победа"):N("Поражение"));const u=Math.round(t.margin*100);this.ui.text("result-text",s?u>60?N("Разгром. Противник даже не понял, что произошло."):N("Победа на последнем издыхании."):N("Ржавчина подвела."));let f="";if(d.length&&(f+=N("Оторвано:")+" "+d.map(m=>N(ii[m]).toLowerCase()).join(", ")+". "),f+=N("Противник бил в:")+" "+N(ii[h]).toLowerCase()+". ",this.verdictIndex>=0&&(f+=N("Слабое место:")+" "+N(ii[o[l].role]).toLowerCase()+" — "+N("чистота")+" "+Math.round(o[l].clean*100)+"%."),r&&(f+=" "+N("Трофей босса — хромовая деталь в запасе:")+" "+N(zi[r.role]).toLowerCase()+"."),this.ui.text("result-verdict",f),this.ui.show("btn-verdict",this.verdictIndex>=0),this.verdictIndex>=0&&this.ui.text("btn-verdict",N("Дочистить:")+" "+N(ii[o[l].role]).toLowerCase()),this.ui.text("result-coins","+"+e.reward),this.ui.show("btn-double",s&&cn()),this.ui.show("btn-rematch",!s&&cn()),this.ui.text("btn-result-next",N(s?"Дальше":"В мастерскую")),this.ui.text("coins",String(this.save.coins)),this.setPhase("result"),s&&this.save.robots.length>=this.save.slots&&this.save.pending>0&&this.ui.toast(N("Новый робот ждёт на свалке — освободи слот в коллекции.")),this.resultScene){const m=this.resultScene;this.resultScene=null,this.story(m)}},700)}async verdictGo(){const t=this.champion,e=this.verdictIndex;this.fight=null,await Ga(this.save.battles-1),!this.ui.blocked&&(t&&e>=0?(this.save.focus=t.id,this.enterWork(t,!1,e)):this.setPhase("hub"))}async doubleAd(){const t=this.fight;if(!t||t.doubled)return;if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}t.doubled=!0,this.save.coins+=t.reward,this.ui.text("result-coins","+"+t.reward*2),this.ui.text("coins",String(this.save.coins)),this.ui.show("btn-double",!1),this.audio.coin(),this.persist()}async rematchAd(){if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}this.boostNext=oh,this.ui.toast(N("Робот усилен на один бой!")),this.startFight()}async afterResult(){const t=this.fight?.report?this.fight.report.winner===0:!1;if(this.fight=null,await Ga(this.save.battles-1),!this.ui.blocked)if(t){const e=this.save.robots[this.save.robots.length-1];e&&!e.done&&(this.save.focus=e.id),this.setPhase("hub"),e&&!e.done&&this.ui.toast(N("Со свалки привезли нового робота:")+" "+this.robotName(e))}else{const e=this.champion;e?(this.save.focus=e.id,this.enterWork(e,!1)):this.setPhase("hub")}}renderShop(){this.ui.text("coins",String(this.save.coins));const t=this.ui.el("shop-tools");t.textContent="";for(const r of Ms){if(!r.price)continue;const a=this.save.tools.includes(r.id);t.appendChild(this.ui.card({icon:r.icon,name:N(r.name),sub:N(r.hint),button:a?N("Куплено"):String(r.price),buttonCls:a?"owned":"",buttonDisabled:a||this.save.coins<r.price,onClick:()=>this.buyTool(r)}))}const e=this.ui.el("shop-paints");e.textContent="";for(const r of Rn){if(r.rare)continue;const a=this.save.paints.includes(r.id);e.appendChild(this.ui.card({icon:"●",iconBg:"#"+r.color.toString(16).padStart(6,"0"),name:N(r.name),sub:N(r.hint),button:a?N("Куплено"):String(r.price),buttonCls:a?"owned":"",buttonDisabled:a||this.save.coins<r.price,onClick:()=>this.buyPaint(r)}))}const n=this.ui.el("shop-slots");n.textContent="";const s=this.save.slots<Ta;n.appendChild(this.ui.card({icon:"▣",name:N("Слот коллекции"),sub:N("Слотов:")+" "+this.save.robots.length+"/"+this.save.slots,button:s?String(or(this.save.slots)):N("Максимум"),buttonDisabled:!s||this.save.coins<or(this.save.slots),onClick:()=>this.buySlot()})),this.ui.show("btn-rare-paint",!this.save.paints.includes("chrome")&&cn())}buyTool(t){this.audio.init(),!(this.save.tools.includes(t.id)||this.save.coins<t.price)&&(this.save.coins-=t.price,this.save.tools.push(t.id),this.audio.coin(),this.ui.toast(N("Куплено:")+" "+N(t.name)),this.persist(),this.renderShop())}buyPaint(t){this.audio.init(),!(this.save.paints.includes(t.id)||this.save.coins<t.price)&&(this.save.coins-=t.price,this.save.paints.push(t.id),Object.keys(t.bonus).length&&this.save.counters.paints++,this.audio.coin(),this.ui.toast(N("Куплено:")+" "+N(t.name)),this.persist(),this.renderShop())}async rarePaintAd(){if(this.save.paints.includes("chrome"))return;if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}this.save.paints.push("chrome"),this.audio.coin(),this.ui.toast(N("Редкая краска получена:")+" "+N("Хром")),this.persist(),this.renderShop()}dailyRobot(){const t=hr();return this.save.daily.day!==t&&(this.save.daily={day:t,done:!1,best:this.save.daily.best,elapsed:0,robot:null}),this.save.daily.robot||(this.save.daily.robot=ri(En("daily-"+t)||5,4,{daily:!0})),this.save.daily.robot}renderDaily(){this.dailyRobot();const t=this.save.daily;this.ui.text("daily-best",t.best!=null?N("Лучшее время:")+" "+rr(t.best):N("Лучшего времени пока нет.")),this.ui.show("daily-done",t.done),this.ui.show("btn-daily-start",!t.done),this.ui.show("btn-daily-double",t.done&&!this.save.dailyDoubled&&cn()),this.ui.text("btn-daily-start",t.elapsed>0?N("Продолжить"):N("Начать"))}startDaily(){this.audio.init();const t=this.dailyRobot();this.save.daily.done||(this.enterWork(t,!0),this.ui.toast(N("Время пошло. Все пять деталей — до блеска.")))}finishDaily(){if(!this.work)return;const t=Math.round(performance.now()-this.work.startedAt),e=this.save.daily;e.done=!0,e.elapsed=t,(e.best==null||t<e.best)&&(e.best=t),this.save.coins+=Aa,this.save.counters.daily++,this.save.dailyDoubled=!1,Xl("daily",t),this.audio.win(),this.ui.flash(),this.ui.toast(N("Робот дня собран!")+" "+rr(t)+" · +"+Aa);const n=this.work.robot;this.save.robots.length<this.save.slots&&!this.save.robots.some(s=>s.id===n.id)&&(n.done=!0,this.save.robots.push(n)),this.ui.text("coins",String(this.save.coins)),ns(),this.persist(),this.setPhase("daily")}async dailyDoubleAd(){if(!this.save.daily.done||this.save.dailyDoubled)return;if(!await hn()){this.ui.toast(N("Ролик не досмотрен — награды нет."));return}this.save.dailyDoubled=!0,this.save.coins+=Aa,this.audio.coin(),this.ui.text("coins",String(this.save.coins)),this.persist(),this.renderDaily()}frame(t){const e=Math.min(.05,t/1e3);if(this.frames++,this.ui.blocked){this.pendingStroke=null,this.pointers.clear(),this.audio.scrapeStop(),this.stage.flakes.update(e),this.stage.updateCamera(e),this.stage.render();return}switch(this.phase){case"work":this.updateWork(e);break;case"fight":this.arena&&(this.arena.update(e,this.stage.camera),this.stage.cueTarget.copy(this.arena.cue.target),this.stage.cuePull=this.arena.cue.pull);break}if(this.hubModel&&this.phase!=="work"&&this.phase!=="fight"){this.hubSpin+=e*.35,this.hubModel.group.rotation.y=this.hubSpin;const n=this.hubModel.data.done?0:1,s=this.assembling?1-Math.exp(-e*6):1-Math.exp(-e*3);this.hubExplode+=(n-this.hubExplode)*s;const r=this.hubExplode,a=this.hubModel;a.torso.position.y=r*.35;for(const o of[a.limbL,a.limbR]){const l=o.userData.base;o.position.set(l.x+Math.sign(l.x)*r*.5,l.y+r*.3,0)}for(const o of a.parts){const l=o.mesh.userData.base;o.state.role==="core"&&(o.mesh.position.y=l.y+r*.3),o.state.role==="joint"&&(o.mesh.position.y=l.y-r*.15),o.state.role!=="joint"&&(o.mesh.rotation.y+=e*r*.3)}}this.stage.flakes.update(e),this.stage.updateCamera(e),this.stage.render()}uiClick(t){return this.ui.click(t)}debugDump(){const t=this.currentPart();return{phase:this.phase,coins:this.save.coins,robots:this.save.robots.length,wins:this.save.wins,losses:this.save.losses,battles:this.save.battles,slots:this.save.slots,tools:this.save.tools,paints:this.save.paints,part:t?{role:t.state.role,arch:t.state.arch,clean:us(t.geometry.geom),paint:ah(t.geometry.geom),vertices:t.geometry.vertexCount}:null,partIndex:this.work?.index??-1,champion:this.champion?.id??null,focus:this.focusRobot?{id:this.focusRobot.id,done:this.focusRobot.done,clean:Ca(this.focusRobot)}:null,fight:this.fight?{boss:this.fight.boss?.id??null,report:this.fight.report}:null,bin:this.save.bin.length,bossDue:this.save.bossDue,league:this.league(),chapter:this.save.chapter,chapterWins:this.save.chapterWins,seen:this.save.seen.length,counters:this.save.counters,storyOpen:this.storyOpen,streak:this.save.streak,album:this.save.album,crateFree:this.save.crateFree,arenaTime:this.arena?.time??0,daily:{day:this.save.daily.day,done:this.save.daily.done,best:this.save.daily.best}}}debugAllStrings(){return[...Go,...Object.values(zi),...Object.values(La),...Object.values(qn),...Rn.flatMap(t=>[t.name,t.hint]),...Ms.flatMap(t=>[t.name,t.hint]),...Object.values(ii),..._r,...ds.flatMap(t=>[t.name,t.hint]),...fx()]}debugStroke(t,e,n,s,r=20){if(!this.work)return;const a=this.currentPart();if(a){this.work.brush.begin();for(let o=0;o<=r;o++){const l=t+(n-t)*o/r,c=e+(s-e)*o/r,h=this.stage.ndc(l,c,this.tmpN);a.mesh.updateMatrixWorld(),this.work.brush.stroke(h,this.stage.camera,a.mesh,.02,1/60,this.strokeOut)}this.renderWorkHead()}}debugSetClean(t){const e=this.currentPart();if(!e)return;const n=e.geometry.geom.attributes.aClean;n.array.fill(t),n.needsUpdate=!0,this.syncPartState(),this.renderWorkHead()}debugPartScreen(){const t=this.currentPart();if(!t)return null;t.mesh.updateMatrixWorld();const e=t.geometry.geom.boundingSphere,n=e.center.clone().applyMatrix4(t.mesh.matrixWorld),s=n.clone().project(this.stage.camera),r=n.clone().add(new L(e.radius*t.mesh.scale.x,0,0)).project(this.stage.camera),a=window.innerWidth,o=window.innerHeight;return{x:(s.x+1)/2*a,y:(1-s.y)/2*o,r:Math.abs(r.x-s.x)/2*a}}debugSeedRobots(t,e){this.save.robots=t.map((n,s)=>{const r=ri(n,s+2);return r.done=e.done[s],r.parts.forEach((a,o)=>{a.clean=e.clean[s][o];const l=e.paint[s];l&&(a.paintId=l[0],a.paint=l[1])}),r}),this.save.arrived=t.length,this.save.champion=this.save.robots.find(n=>n.done)?.id??null,this.save.focus=this.save.robots[0].id,this.clearHubModel(),this.persist()}debugFocus(t){const e=this.save.robots[t];e&&(this.save.focus=e.id,this.clearHubModel())}debugBrushRing(t,e){const n=this.currentPart();if(!n||!this.work)return;const s=this.stage.ndc(t,e,this.tmpN),r=new Uo;r.setFromCamera(s,this.stage.camera),n.mesh.updateMatrixWorld();const a=r.intersectObject(n.mesh,!1)[0];if(!a)return;n.material.rust.uBrushPos.value.copy(a.point.clone().applyMatrix4(n.mesh.matrixWorld.clone().invert())),n.material.rust.uBrushR.value=this.work.brush.tool.radius,this.brushOn=1,n.material.rust.uBrushOn.value=1;const o=(a.face?a.face.normal.clone():new L(0,1,0)).transformDirection(n.mesh.matrixWorld);o.y+=.6,this.flakeColor.set(9062938),this.stage.flakes.emit(a.point,o,14,this.flakeColor,{speed:1.1,spread:.8,life:.8,size:.035,gravity:2.5,jitter:.45})}debugStepToHit(t){if(!this.arena)return;let e=0;const n=this.hitCount;for(;this.hitCount===n&&e++<600;)this.frame(t);for(let s=0;s<3;s++)this.frame(t)}debugLoadSave(t){this.save=Object.assign(cr(),t),this.persist(),this.refreshMeta()}debugView(t){this.stage.setView(t)}debugGrant(t){this.save.coins+=t,this.ui.text("coins",String(this.save.coins)),this.persist()}debugPartState(){return this.work?this.work.robot.parts[this.work.index]:null}debugRng(t){return new vn(t).next()}debugFinishFight(){this.arena&&(this.arena.speed=40)}debugBin(){return this.save.bin}debugSetBossDue(t){this.save.bossDue=t,t&&this.save.chapter===0&&(this.save.chapter=1)}debugStory(t){return this.story(t)}debugSetChapter(t,e){this.save.chapter=t,this.save.chapterWins=e,this.checkProgress()}debugCounters(){return this.save.counters}debugTimeTravel(t,e){const n=new Date(Date.now()+108e5-t*86400*1e3);this.save.streak.day=n.getUTCFullYear()+"-"+String(n.getUTCMonth()+1).padStart(2,"0")+"-"+String(n.getUTCDate()).padStart(2,"0"),this.save.lastSeen=Date.now()-e*3600*1e3}debugGreet(){this.greet()}}const vx=document.getElementById("game"),_x=Ou();async function xx(){await Promise.race([ku(),new Promise(c=>setTimeout(c,4e3))]),await Gu(_x);let i;try{i=new gx(vx)}catch(c){console.error("[boot] WebGL unavailable",c);const h=document.getElementById("boot-fail");h&&(h.hidden=!1),document.querySelector("#boot .dot")?.remove();return}const t=window.__platformLang;window.__platformLang=c=>{t?.(c),setTimeout(()=>i.refreshMeta(),700)},rd(()=>i.phase==="work"||i.phase==="fight"),Ju(c=>{i.ui.blocked=c,document.body.classList.toggle("ad-busy",c),i.audio.adMute(c),Ph(!c&&(i.phase==="work"||i.phase==="fight")),Ch(!c&&(i.phase==="pause"||i.phase==="collection"||i.phase==="shop"||i.phase==="result"))}),qu(c=>i.audio.platformMute(c));const e=c=>{i.audio.setFocus(c),!c&&((i.phase==="work"||i.phase==="fight")&&!Zu()&&i.setPhase("pause"),i.persist())};Xu(e),document.addEventListener("visibilitychange",()=>e(!document.hidden));const n=window;n.__toggleLang=Wu,n.__lang=yr,n.__appFocus=e,n.__androidBack=()=>i.ui.blocked?!0:i.phase==="title"?!1:(i.phase==="fight"||i.uiClick("back")||i.uiClick("resume")||i.setPhase("hub"),!0);const s=/(?:^|[?&])debug(?:[=&]|$)/.test(location.search);s&&(n.__game=i,n.__ads={platform:()=>({platform:Xo(),ready:Va()}),interstitial:()=>Rh(),rewarded:()=>hn(),seam:c=>Ga(c),resetPacing:()=>od()});let r=performance.now(),a=!1,o=!1;s&&(n.__stepMode=c=>{o=c},n.__step=c=>{i.frame(c)},n.__cinema=c=>{document.body.classList.toggle("cinema",c)});const l=c=>{if(!o)try{i.frame(c-r)}catch(h){console.error("[fatal]",h)}r=c,n.__frameCount=i.frames,!a&&i.frames>0&&(a=!0,document.getElementById("boot")?.remove(),document.getElementById("app").style.visibility="visible",ad()),requestAnimationFrame(l)};requestAnimationFrame(l)}xx();
