import {NextRequest,NextResponse} from 'next/server';
import {validateContact} from '@/lib/contact-validation';
import {validRequestOrigin} from '@/lib/request-origin';
const hits=new Map<string,{count:number;expires:number}>();
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');if(!validRequestOrigin(origin,request.headers.get('host')))return NextResponse.json({error:'Please send your message from this website.'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json'))return NextResponse.json({error:'Unsupported request format.'},{status:415});
 const raw=await request.text();if(raw.length>12000)return NextResponse.json({error:'This message is too long.'},{status:413});
 let body:unknown;try{body=JSON.parse(raw);}catch{return NextResponse.json({error:'Unable to read your message.'},{status:400});}
 const validation=validateContact(body);if(!validation.ok)return NextResponse.json({error:validation.error},{status:400});
 const key=process.env.RESEND_API_KEY,from=process.env.CONTACT_FROM;
 if(!key||!from)return NextResponse.json({error:'Direct delivery is not connected yet. Your draft is safe—use the email link below to send it.'},{status:503});
 const now=Date.now();for(const [key,value] of hits){if(value.expires<now)hits.delete(key);}
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'local';const record=hits.get(ip)||{count:0,expires:now+600000};if(record.count>=5)return NextResponse.json({error:'A few too many messages. Please try again in ten minutes.'},{status:429});record.count++;hits.set(ip,record);
 const {name,email,message,id}=validation.data;
 try{const response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(15000),headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify({from,to:[process.env.CONTACT_TO||'lemayanleleina@gmail.com'],reply_to:email,subject:`NOMAD / PLAY — Message from ${name.replace(/[\r\n]/g,' ')}`,text:`Name: ${name}\nReply email: ${email}\n\n${message}`})});if(!response.ok)throw new Error('Delivery provider rejected the message');return NextResponse.json({ok:true});}catch{return NextResponse.json({error:'Your message couldn’t be sent. Your draft is safe. Please try again or send it by email.'},{status:502});}
}
