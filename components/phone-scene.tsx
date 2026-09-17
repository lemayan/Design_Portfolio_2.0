'use client';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {RoundedBox} from '@react-three/drei/core/RoundedBox';
import {Environment} from '@react-three/drei/core/Environment';
import {Lightformer} from '@react-three/drei/core/Lightformer';
import {useRef,useEffect,useLayoutEffect,useMemo} from 'react';
import * as THREE from 'three';
export type PhoneView='front'|'back'|'edge';
type Props={view:PhoneView;reduced:boolean;onReady:()=>void;onSettled:()=>void;onPower:()=>void};
function Part({size,position=[0,0,0],color='#c9c9c4',radius=.025,metal=.8,rough=.24}:{size:[number,number,number];position?:[number,number,number];color?:string;radius?:number;metal?:number;rough?:number}){return <RoundedBox args={size} position={position} radius={radius} smoothness={3}><meshPhysicalMaterial color={color} metalness={metal} roughness={rough} clearcoat={.45}/></RoundedBox>;}
function Lens({x,y,r=.23}:{x:number;y:number;r?:number}){return <group position={[x,y,-.205]} rotation={[0,Math.PI,0]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[r,r,.14,48]}/><meshStandardMaterial color="#33373b" metalness={1} roughness={.18}/></mesh><mesh position={[0,0,.079]}><torusGeometry args={[r-.025,.016,10,48]}/><meshStandardMaterial color="#8a8c8b" metalness={1} roughness={.2}/></mesh><mesh position={[0,0,.08]}><circleGeometry args={[r-.046,48]}/><meshPhysicalMaterial color="#020407" metalness={.12} roughness={.08} clearcoat={1}/></mesh><mesh position={[0,0,.082]}><ringGeometry args={[r*.25,r*.51,40]}/><meshStandardMaterial color="#080e19" metalness={.25} roughness={.2}/></mesh><mesh position={[-r*.22,r*.2,.084]}><circleGeometry args={[r*.16,24]}/><meshBasicMaterial color="#617182" transparent opacity={.45}/></mesh></group>;}
function Branding(){const texture=useMemo(()=>{const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d')!;g.fillStyle='#8d9291';g.font='500 51px Arial';g.textAlign='center';g.fillText('SAMSUNG',256,79);return new THREE.CanvasTexture(c);},[]);useEffect(()=>()=>texture.dispose(),[texture]);return <mesh position={[0,-1.85,-.148]} rotation={[0,Math.PI,0]}><planeGeometry args={[1.1,.275]}/><meshBasicMaterial map={texture} transparent depthWrite={false}/></mesh>;}
function Handset({view,reduced,onReady,onSettled,onPower}:Props){const body=useRef<THREE.Group>(null);const {camera,size,invalidate}=useThree();const notified=useRef(false),settled=useRef(false);const destination=view==='front'?0:view==='back'?Math.PI-.28:1.15;
 useLayoutEffect(()=>{if(camera instanceof THREE.OrthographicCamera){camera.zoom=Math.min(size.width/3.15,size.height/6.2);camera.updateProjectionMatrix();invalidate();}},[camera,size,invalidate]);
 useEffect(()=>{settled.current=false;invalidate();},[view,reduced,invalidate]);
 useFrame((_,dt)=>{if(!body.current)return;const g=body.current;g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,destination,reduced?1:1-Math.exp(-Math.min(dt,.05)*8));g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,view==='front'?0:-.08,.12);if(Math.abs(g.rotation.y-destination)>.001)invalidate();else if(!settled.current){g.rotation.y=destination;settled.current=true;onSettled();}if(!notified.current){notified.current=true;requestAnimationFrame(onReady);}});
 return <group ref={body}>
  <Part size={[2.7,5.65,.27]} radius={.19} color="#b7bab9"/>
  <Part size={[2.657,5.606,.032]} position={[0,0,-.13]} radius={.18} color="#e0e1db" metal={.22} rough={.36}/>
  <Part size={[2.663,5.613,.026]} position={[0,0,.137]} radius={.175} color="#161a1b" metal={.65} rough={.12}/>
  <Part size={[2.55,5.48,.012]} position={[0,0,.155]} radius={.14} color="#f7f6ec" metal={0} rough={.16}/>
  {/* Ambient camera island and four individually layered optical assemblies. */}
  <Part size={[.69,1.96,.085]} position={[.85,1.55,-.178]} radius={.27} color="#c8cec9" metal={.25} rough={.24}/>
  {[2.17,1.55,.93].map(y=><Lens key={y} x={.85} y={y}/>)}<Lens x={.08} y={1.48} r={.15}/>
  <mesh position={[.08,2.1,-.153]} rotation={[0,Math.PI,0]}><circleGeometry args={[.078,32]}/><meshStandardMaterial color="#ffefd0" roughness={.2}/></mesh>
  <mesh position={[.08,1.83,-.154]} rotation={[0,Math.PI,0]}><circleGeometry args={[.042,24]}/><meshStandardMaterial color="#373c40"/></mesh>
  {/* Power and volume keys, antenna breaks, earpiece, USB-C, speaker and pen silo. */}
  <group onClick={e=>{e.stopPropagation();onPower();}}><Part size={[.032,.48,.115]} position={[1.363,.55,0]} radius={.012}/></group>
  <Part size={[.032,.78,.115]} position={[1.363,1.5,0]} radius={.012}/>
  {[-1,1].map(side=>[-2.27,2.25].map(y=><Part key={side+':'+y} size={[.018,.034,.25]} position={[side*1.35,y,0]} color="#737975" radius={.006} metal={0}/>))}
  <Part size={[.5,.019,.012]} position={[0,2.772,.16]} color="#303735" radius={.006}/>
  <Part size={[.35,.012,.105]} position={[0,-2.826,0]} color="#1e2426" radius={.006}/>
  <Part size={[.23,.014,.085]} position={[-.99,-2.823,0]} color="#969d99" radius={.006}/>
  {Array.from({length:6},(_,i)=><Part key={i} size={[.028,.012,.08]} position={[.48+i*.074,-2.828,0]} color="#303637" radius={.005}/>)}
  <Branding/>
 </group>;
}
export default function PhoneScene(props:Props){return <Canvas orthographic camera={{position:[0,0,12],zoom:110,near:.1,far:30}} dpr={[1,1.5]} frameloop="demand" gl={{antialias:true,alpha:true}} onCreated={({gl})=>gl.domElement.setAttribute('aria-label','Interactive 3D Samsung-inspired handset')}><ambientLight intensity={.8}/><directionalLight position={[-4,5,7]} intensity={2.5} color="#fff5e5"/><directionalLight position={[4,-2,-5]} intensity={2}/><Environment resolution={128} frames={1}><Lightformer position={[-4,2,4]} scale={[3,8,1]} intensity={3}/><Lightformer position={[5,0,-2]} scale={[2,7,1]} intensity={4}/><Lightformer position={[0,5,0]} rotation={[Math.PI/2,0,0]} scale={[6,3,1]} intensity={2}/></Environment><Handset {...props}/></Canvas>;}
