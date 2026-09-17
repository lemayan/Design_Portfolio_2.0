export type Pose={position:[number,number,number];rotation:[number,number,number];scale:number};
export type CartridgeMotion={from:number|null;to:number|null;started:number};
export const FLIGHT_MS=1600;
export const seatedPose:Pose={position:[0,2.15,-.04],rotation:[0,0,0],scale:.86};
const above:Pose={position:[0,3.04,-.04],rotation:[0,0,0],scale:.86};
const clamp=(t:number)=>Math.max(0,Math.min(1,t));
const ease=(t:number)=>{t=clamp(t);return t*t*(3-2*t);};
function mix(a:Pose,b:Pose,t:number):Pose{return {position:a.position.map((v,i)=>v+(b.position[i]-v)*t) as Pose['position'],rotation:a.rotation.map((v,i)=>v+(b.rotation[i]-v)*t) as Pose['rotation'],scale:a.scale+(b.scale-a.scale)*t};}
// All transforms come from one clock. React never resets a cartridge mid-flight.
export function flightPose(rest:Pose,elapsed:number,incoming:boolean):Pose{
 if(!incoming){if(elapsed<220)return mix(seatedPose,above,ease(elapsed/220));const t=clamp((elapsed-220)/440);const p=mix(above,rest,ease(t));p.position[1]+=Math.sin(t*Math.PI)*.45;p.position[2]+=Math.sin(t*Math.PI)*1.2;return p;}
 if(elapsed<300)return rest;
 if(elapsed<570){const t=ease((elapsed-300)/270);return mix(rest,{position:[rest.position[0],rest.position[1]+.5,1.5],rotation:[-.12,rest.position[0]<0?-.35:.35,rest.rotation[2]-.15],scale:1.08},t);}
 const lift=flightPose(rest,569.999,true);
 if(elapsed<1180){const t=clamp((elapsed-570)/610);const p=mix(lift,above,ease(t));p.position[1]+=Math.sin(t*Math.PI)*.6;p.position[2]+=Math.sin(t*Math.PI)*.55;p.rotation[2]+=Math.sin(t*Math.PI)*.22;return p;}
 if(elapsed<1280)return above;
 return mix(above,seatedPose,ease((elapsed-1280)/320));
}
