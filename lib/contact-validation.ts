export function validateContact(value:unknown):{ok:true;data:{name:string;email:string;message:string;id:string}}|{ok:false;error:string} {
 if(!value||typeof value!=='object')return {ok:false,error:'Please complete the message form.'};
 const v=value as Record<string,unknown>;
 if(v.website)return {ok:false,error:'Unable to accept this message.'};
 if(typeof v.name!=='string'||v.name.trim().length<1||v.name.length>80)return {ok:false,error:'Enter your name (up to 80 characters).'};
 if(typeof v.email!=='string'||v.email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(v.email)||/[\r\n]/.test(v.email))return {ok:false,error:'Enter a valid reply email address.'};
 if(typeof v.message!=='string'||v.message.trim().length<10||v.message.length>5000)return {ok:false,error:'Write a message between 10 and 5,000 characters.'};
 if(typeof v.id!=='string'||!/^[a-f0-9-]{36}$/i.test(v.id))return {ok:false,error:'Please refresh the page and try again.'};
 return {ok:true,data:{name:v.name.trim(),email:v.email.trim(),message:v.message.trim(),id:v.id}};
}
