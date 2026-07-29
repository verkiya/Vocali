(function(){"use strict";const o={WIDGET_URL:"https://vocaliwidget.vercel.app",DEFAULT_POSITION:"bottom-right"},p=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
</svg>`,x=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`;(function(){let n=null,t=null,e=null,l=!1,r=null,a=o.DEFAULT_POSITION;const c=document.currentScript;if(c)r=c.getAttribute("data-organization-id"),a=c.getAttribute("data-position")||o.DEFAULT_POSITION;else{const i=document.querySelectorAll('script[src*="embed"]'),s=Array.from(i).find(d=>d.hasAttribute("data-organization-id"));s&&(r=s.getAttribute("data-organization-id"),a=s.getAttribute("data-position")||o.DEFAULT_POSITION)}if(!r){console.error("Vocali Widget: data-organization-id attribute is required");return}function g(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f()}function f(){e=document.createElement("button"),e.id="vocali-widget-button",e.innerHTML=p,e.style.cssText=`
      position: fixed;
      ${a==="bottom-right"?"right: 20px;":"left: 20px;"}
      bottom: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7266ff, #5143ff);
      color: white;
      border: none;
      cursor: pointer;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(114, 102, 255, 0.4);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `,e.addEventListener("click",y),e.addEventListener("mouseenter",()=>{e&&(e.style.transform="scale(1.05)")}),e.addEventListener("mouseleave",()=>{e&&(e.style.transform="scale(1)")}),document.body.appendChild(e),t=document.createElement("div"),t.id="vocali-widget-container",t.style.cssText=`
      position: fixed;
      ${a==="bottom-right"?"right: 20px;":"left: 20px;"}
      bottom: 90px;
      width: 400px;
      height: 600px;
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 110px);
      z-index: 999998;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
      display: none;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `,n=document.createElement("iframe"),n.src=w(),n.style.cssText=`
      width: 100%;
      height: 100%;
      border: none;
    `,n.allow="microphone; clipboard-read; clipboard-write",t.appendChild(n),document.body.appendChild(t),window.addEventListener("message",h)}function w(){const i=new URLSearchParams;return i.append("organizationId",r),`${o.WIDGET_URL}?${i.toString()}`}function h(i){if(i.origin!==new URL(o.WIDGET_URL).origin)return;const{type:s,payload:d}=i.data;switch(s){case"close":u();break;case"resize":d.height&&t&&(t.style.height=`${d.height}px`);break}}function y(){l?u():m()}function m(){t&&e&&(l=!0,t.style.display="block",setTimeout(()=>{t&&(t.style.opacity="1",t.style.transform="translateY(0) scale(1)")},10),e.innerHTML=x)}function u(){t&&e&&(l=!1,t.style.opacity="0",t.style.transform="translateY(20px) scale(0.95)",setTimeout(()=>{t&&(t.style.display="none")},400),e.innerHTML=p,e.style.background="linear-gradient(135deg, #7266ff, #5143ff)")}function b(){window.removeEventListener("message",h),t&&(t.remove(),t=null,n=null),e&&(e.remove(),e=null),l=!1}function v(i){b(),i.organizationId&&(r=i.organizationId),i.position&&(a=i.position),g()}window.VocaliWidget={init:v,show:m,hide:u,destroy:b},g()})()})();
