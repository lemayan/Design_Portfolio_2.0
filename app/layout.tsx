import type { Metadata } from 'next';
import './fonts.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './globals.css';
import './experience.css';
import './handset.css';
import './mobile-motion.css';
import { PreferencesProvider, SiteHeader, SiteFooter } from '@/components/site';
export const metadata:Metadata={metadataBase:new URL('https://www.lemayanleleina.engineer'),title:{default:'NOMAD / PLAY — Lemayan Leleina',template:'%s · NOMAD / PLAY'},description:'Explore the work of Lemayan Leleina, a full-stack developer in Nairobi. Web applications, AI tools and Web3 experiences, one cartridge at a time.',openGraph:{title:'NOMAD / PLAY — Lemayan Leleina',description:'Ideas into working software. A portfolio you can play.',type:'website'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><PreferencesProvider><a className="skip-link" href="#main">Skip to content</a><SiteHeader/>{children}<SiteFooter/></PreferencesProvider></body></html>;}
