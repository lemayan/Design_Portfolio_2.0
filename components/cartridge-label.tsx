'use client';
import {useEffect,useMemo} from 'react';
import * as THREE from 'three';
import {projects} from '@/lib/projects';
export default function CartridgeLabel({index}:{index:number}){
 const texture=useMemo(()=>{const p=projects[index];const canvas=document.createElement('canvas');canvas.width=512;canvas.height=580;const c=canvas.getContext('2d')!;c.fillStyle='#f0eada';c.fillRect(0,0,512,580);c.strokeStyle='#c5c4ac';c.lineWidth=4;c.strokeRect(5,5,502,570);c.fillStyle='#263123';c.font='500 28px "IBM Plex Mono", monospace';c.fillText(String(index+1).padStart(2,'0'),35,49);c.font='750 57px "Manrope Variable", sans-serif';let line='',y=112;for(const word of p.name.split(' ')){const candidate=line?line+' '+word:word;if(c.measureText(candidate).width>440&&line){c.fillText(line,33,y);y+=63;line=word;}else line=candidate;}c.fillText(line,33,y);c.fillStyle=p.color;c.beginPath();c.moveTo(145,506);c.lineTo(398,250);c.lineTo(479,506);c.fill();c.fillStyle='#354a32';c.beginPath();c.moveTo(40,506);c.lineTo(213,334);c.lineTo(381,506);c.fill();c.fillStyle='#cc774b';c.beginPath();c.arc(405,291,48,0,Math.PI*2);c.fill();c.fillStyle='#273222';c.font='500 14px "IBM Plex Mono", monospace';c.fillText(p.short,32,548);for(let k=0;k<4;k++){c.beginPath();c.arc(458+(k%2)*15,528+Math.floor(k/2)*15,6,0,Math.PI*2);c.fill();}const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;},[index]);
 useEffect(()=>()=>texture.dispose(),[texture]);
 return <mesh position={[0,-.025,.105]}><planeGeometry args={[.67,.76]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>;
}
