'use client';
import dynamic from 'next/dynamic';
import {Component,useEffect,useRef,useState,type ReactNode,type CSSProperties} from 'react';
import {MessageCircle,Power} from 'lucide-react';
import type {PhoneView} from './phone-scene';
const Scene=dynamic(()=>import('./phone-scene'),{ssr:false});
class Boundary extends Component<{children:ReactNode;onError:()=>void},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true};}componentDidCatch(){this.props.onError();}render(){return this.state.failed?null:this.props.children;}}
export default function ContactHandset({children,reduced}:{children:ReactNode;reduced:boolean}){const [view,setView]=useState<PhoneView>('front'),[ready,setReady]=useState(false),[settled,setSettled]=useState(true),[awake,setAwake]=useState(false),[failed,setFailed]=useState(false),[zoom,setZoom]=useState(110),[isMobile,setIsMobile]=useState(false),[enhance,setEnhance]=useState(false);const stage=useRef<HTMLDivElement>(null);
 useEffect(()=>{const mq=matchMedia('(max-width:760px)');const check=()=>setIsMobile(mq.matches);check();mq.addEventListener('change',check);return()=>mq.removeEventListener('change',check);},[]);
 useEffect(()=>{if(isMobile||matchMedia('(max-width:760px)').matches||!stage.current)return;const element=stage.current;const resize=new ResizeObserver(()=>setZoom(Math.min(element.clientWidth/3.15,element.clientHeight/6.2)));resize.observe(element);const intersection=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setEnhance(true);intersection.disconnect();}},{rootMargin:'150px'});intersection.observe(element);return()=>{resize.disconnect();intersection.disconnect();};},[isMobile]);
 function change(next:PhoneView){if(view===next)return;setSettled(false);setView(next);if(next==='front')setAwake(true);}
 if(isMobile)return <div className="handset-mobile-form">{children}</div>;
 return <div className="handset-experience"><div className="handset-viewer" ref={stage} style={{'--handset-width':zoom*2.7+'px','--handset-height':zoom*5.65+'px'} as CSSProperties}>
 <div className="handset-shadow"/>
 {!ready&&<div className="handset-fallback" aria-hidden="true"/>}
 {enhance&&!failed&&<div className={'handset-canvas'+(ready?' ready':'')}><Boundary onError={()=>{setFailed(true);setReady(false);setView('front');setSettled(true);}}><Scene view={view} reduced={reduced} onReady={()=>setReady(true)} onSettled={()=>setSettled(true)} onPower={()=>setAwake(a=>!a)}/></Boundary></div>}
 <div className={'handset-front'+(view==='front'&&settled?' visible':'')} inert={view!=='front'||!settled} aria-hidden={view!=='front'||!settled}>
 <div className="handset-camera" aria-hidden="true"/>
 <div className="handset-display" hidden={!awake}>{children}</div>
 {!awake&&<button className="handset-sleep" onClick={()=>setAwake(true)}><span>NOMAD / CONNECT</span><Power size={26}/><strong>Ready when you are.</strong><span>Tap to wake</span></button>}
 <span className="handset-glass" aria-hidden="true"/>
 </div>
 </div><div className="handset-tools" aria-label="Phone controls"><button onClick={()=>change('front')} aria-pressed={view==='front'}><MessageCircle size={16}/>Message</button><button aria-label={awake?'Sleep phone':'Wake phone'} onClick={()=>{change('front');setAwake(a=>!a);}}><Power size={16}/></button></div><p className="handset-caption">{awake?'Your words. A real connection.':'Tap power to wake the phone.'}</p></div>;
}
