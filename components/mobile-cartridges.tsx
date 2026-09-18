'use client';
import {useLayoutEffect,useRef,type RefObject,type CSSProperties} from 'react';
import {projects} from '@/lib/projects';
import type {CartridgeMotion} from '@/lib/cartridge-motion';
import {Sleeve} from './project-art';
export const MOBILE_FLIGHT_MS=1100;
const transform=(x:number,y:number,s:number,r=0)=>`translate3d(${x-41}px,${y-49.5}px,0) rotate(${r}deg) scale(${s})`;
function Cartridge({index,motion,stage,zoom}:{index:number;motion:CartridgeMotion|null;stage:RefObject<HTMLDivElement|null>;zoom:number}){const ref=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{const el=ref.current,root=stage.current;if(!el||!root)return;const stageRect=root.getBoundingClientRect(),body=root.querySelector('.console-dom')!.getBoundingClientRect();const x=body.x+body.width/2-stageRect.x,y=body.y-stageRect.y+18;const scale=body.width*.28/82;const seated=transform(x,y,scale);el.style.transform=seated;
 if(!motion)return;
 const source=root.parentElement?.querySelector(`[data-project-index="${index}"] .cartridge-card`)?.getBoundingClientRect();const sx=source?Math.max(42,Math.min(stageRect.width-42,source.x+source.width/2-stageRect.x)):42;const sy=source?source.y+source.height/2-stageRect.y:stageRect.height+60;const ss=source?source.width/82:1;const edge=sx<x?38:stageRect.width-38;const above=y-98;
 const incoming=motion.to===index;
 const frames:Keyframe[]=incoming?[
 {transform:transform(sx,sy,ss,-4),offset:0},
 {transform:transform(sx,sy-30,ss*1.04,-10),offset:.16},
 {transform:transform(edge,above+90,scale*1.08,sx<x?-13:13),offset:.48},
 {transform:transform(x,above,scale,0),offset:.73},
 {transform:transform(x,above,scale,0),offset:.83},
 {transform:seated,offset:1},
 ]:[{transform:seated,offset:0},{transform:transform(x,above,scale),offset:.2},{transform:transform(edge,above+40,scale,-10),offset:.45},{transform:transform(sx,sy,ss,-4),opacity:1,offset:.65},{transform:transform(sx,sy,ss,-4),opacity:0,offset:.66},{transform:transform(sx,sy,ss,-4),opacity:0,offset:1}];
 const animation=el.animate(frames,{duration:MOBILE_FLIGHT_MS,easing:'cubic-bezier(.3,0,.2,1)',fill:'both'});animation.currentTime=Math.max(0,performance.now()-motion.started);return()=>animation.cancel();
 },[index,motion,stage,zoom]);
 return <div ref={ref} className={'cartridge-card mobile-flight-card'+(motion?' is-flying':'')} style={{'--case':projects[index].color} as CSSProperties}><span className="cartridge-ridge"/><Sleeve project={projects[index]} index={index}/><span className="gold-contacts"/></div>;
}
export default function MobileCartridges({active,motion,stage,zoom}:{active:number|null;motion:CartridgeMotion|null;stage:RefObject<HTMLDivElement|null>;zoom:number}){const indices=motion?[motion.from,motion.to]:[active];return <div className="mobile-cartridges" aria-hidden="true">{[...new Set(indices)].filter((i):i is number=>i!==null).map(index=><Cartridge key={index} index={index} motion={motion} stage={stage} zoom={zoom}/>)}</div>;}
