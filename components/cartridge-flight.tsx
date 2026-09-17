'use client';
import {useEffect,useRef,type RefObject,type CSSProperties} from 'react';
import {projects} from '@/lib/projects';
import type {CartridgeMotion} from '@/lib/cartridge-motion';
import {Sleeve} from './project-art';
// The mobile shelf is outside the canvas. Carry its actual sleeve across that
// boundary, then hand over to the mesh at the exact insertion pose.
export default function CartridgeFlight({motion,stage,zoom}:{motion:CartridgeMotion;stage:RefObject<HTMLDivElement|null>;zoom:number}){const ghost=useRef<HTMLDivElement>(null);const index=motion.to;
 useEffect(()=>{if(index===null||!ghost.current||!stage.current)return;const source=stage.current.parentElement?.querySelector(`[data-project-index="${index}"] .cartridge-card`);const rect=source?.getBoundingClientRect();if(!rect)return;const start={x:Math.max(rect.width/2,Math.min(innerWidth-rect.width/2,rect.x+rect.width/2)),y:rect.y+rect.height/2};let frame=0;
 const update=()=>{if(!ghost.current||!stage.current)return;const elapsed=performance.now()-motion.started;const t=Math.max(0,Math.min(1,(elapsed-300)/880));const r=stage.current.getBoundingClientRect();const end={x:r.x+r.width/2,y:r.y+r.height/2-(3.04-.45)*zoom};const smooth=t*t*(3-2*t);const x=start.x+(end.x-start.x)*smooth;const y=start.y+(end.y-start.y)*smooth-Math.sin(t*Math.PI)*90;const width=rect.width+(.82*.86*zoom-rect.width)*smooth;const height=rect.height+(.99*.86*zoom-rect.height)*smooth;
 Object.assign(ghost.current.style,{left:x+'px',top:y+'px',width:width+'px',height:height+'px',transform:`translate(-50%,-50%) perspective(600px) rotateX(${(1-smooth)*-20}deg) rotateZ(${Math.sin(t*Math.PI)*-18}deg)`,visibility:elapsed<1180?'visible':'hidden'});if(elapsed<1180)frame=requestAnimationFrame(update);};frame=requestAnimationFrame(update);return()=>cancelAnimationFrame(frame);
 },[index,motion,stage,zoom]);
 if(index===null)return null;return <div ref={ghost} className="cartridge-card cartridge-flight" aria-hidden="true" style={{'--case':projects[index].color} as CSSProperties}><span className="cartridge-ridge"/><Sleeve project={projects[index]} index={index}/><span className="gold-contacts"/></div>;
}
