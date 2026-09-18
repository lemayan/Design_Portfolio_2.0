export const BODY_WIDTH=2.64;
export const BODY_HEIGHT=4.6;
export const WORLD_HEIGHT=6.9;
export const WORLD_WIDTH=8.5;
export const cartridgeRests:[number,number,number][]=[
 [-3.25,.9,.15],[-2.15,.5,.15],[-3.15,-.5,.15],[-2.15,-1.05,.15],[-3.1,-1.95,.15],
 [2.15,.5,.15],[3.25,.9,.15],[2.15,-1.05,.15],[3.15,-.5,.15],[3.1,-1.95,.15],
];
// Shared by the camera and HTML controls so hit areas stay on the hardware.
export function consoleZoom(width:number,height:number,compact:boolean){return Math.min(width/(compact?3.25:WORLD_WIDTH),height/(compact?5.5:WORLD_HEIGHT));}
