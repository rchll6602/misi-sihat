(()=>{'use strict';
const game=document.getElementById('game');const hint=document.getElementById('rotateHint');
function fit(){const w=window.innerWidth,h=window.innerHeight;const scale=Math.min(w/1200,h/700);game.style.transform=`translate(${Math.max(0,(w-1200*scale)/2)}px,${Math.max(0,(h-700*scale)/2)}px) scale(${scale})`;}
window.addEventListener('resize',fit);window.addEventListener('orientationchange',()=>setTimeout(fit,150));
if(window.visualViewport)window.visualViewport.addEventListener('resize',fit);fit();
document.getElementById('rotateContinue').addEventListener('click',()=>hint.classList.add('dismissed'));
document.getElementById('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();if(screen.orientation&&screen.orientation.lock){try{await screen.orientation.lock('landscape')}catch(e){}}}catch(e){}fit()});
// The game already exposes stage-specific touch buttons in the bottom dock.
// Also support intuitive swipe movement inside the game world on touchscreens.
const canvas=document.getElementById('world');let touchStart=null;
canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')touchStart={x:e.clientX,y:e.clientY};},{passive:true});
canvas.addEventListener('pointerup',e=>{if(e.pointerType!=='touch'||!touchStart)return;const dx=e.clientX-touchStart.x,dy=e.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)<25||Math.abs(dx)<Math.abs(dy)*1.2)return;
// Trigger existing keyboard logic without modifying the four chapter mechanics.
const key=dx<0?'ArrowLeft':'ArrowRight';window.dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true}));},{passive:true});
document.addEventListener('touchmove',e=>{if(!e.target.closest('.panel'))e.preventDefault()},{passive:false});
})();