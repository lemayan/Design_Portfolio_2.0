import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  experimental: { workerThreads: true, useTypeScriptCli: false },
  async redirects() { const slugs=['rethinking-full-stack','ai-in-my-workflow','building-on-solana','edge-deployment','designing-with-ai','exploring-webassembly']; return slugs.map((slug,i)=>({ source: '/blog/'+(i+1), destination: '/blog/'+slug, permanent: true })); },
};
export default config;
