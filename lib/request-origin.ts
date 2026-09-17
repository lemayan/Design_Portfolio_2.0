export function validRequestOrigin(origin:string|null,host:string|null):boolean{
 if(!origin)return true;
 if(!host)return false;
 try{const url=new URL(origin);return (url.protocol==='http:'||url.protocol==='https:')&&url.host.toLowerCase()===host.toLowerCase();}catch{return false;}
}
