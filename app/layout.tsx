import type { Metadata } from 'next';
import './fonts.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './globals.css';
import './experience.css';
import './handset.css';
import './mobile-motion.css';
import { PreferencesProvider, SiteHeader, SiteFooter } from '@/components/site';
export const metadata:Metadata={metadataBase:new URL('https://lemayanleleina.tech'),title:{default:'NOMAD / PLAY — Lemayan Leleina',template:'%s · NOMAD / PLAY'},description:'Explore the work of Lemayan Leleina, a full-stack developer in Nairobi. Web applications, AI tools and Web3 experiences, one cartridge at a time.',openGraph:{title:'NOMAD / PLAY — Lemayan Leleina',description:'Ideas into working software. A portfolio you can play.',type:'website',siteName:'NOMAD / PLAY',images:[{url:'/og.png',width:1200,height:630,alt:'Lemayan Leleina — NOMAD / PLAY'}]},twitter:{card:'summary_large_image',title:'NOMAD / PLAY — Lemayan Leleina',description:'Ideas into working software. A portfolio you can play.',images:['/og.png']}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Person',name:'Lemayan Leleina',url:'https://lemayanleleina.tech',jobTitle:'Full-stack developer',sameAs:['https://github.com/lemayan']}).replace(/</g,'\u003c')}}/><PreferencesProvider><a className="skip-link" href="#main">Skip to content</a><SiteHeader/>{children}<SiteFooter/></PreferencesProvider></body></html>;}
