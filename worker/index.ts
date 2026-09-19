import app from 'vinext/server/fetch-handler';
export * from 'vinext/server/fetch-handler';

type WorkerEnv = Record<string, unknown>;
type WorkerContext = {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
};

const CANONICAL_HOST = 'lemayanleleina.tech';

export default {
  async fetch(request: Request, env: WorkerEnv, ctx: WorkerContext): Promise<Response> {
    const url = new URL(request.url);
    if (
      url.hostname === `www.${CANONICAL_HOST}` ||
      (url.hostname === CANONICAL_HOST && url.protocol === 'http:')
    ) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      url.port = '';
      return new Response(null, {
        status: 308,
        headers: { Location: url.toString() },
      });
    }

    const response: Response = await app.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    headers.set('Content-Security-Policy', "base-uri 'self'; object-src 'none'; frame-ancestors 'none'");
    headers.set('Strict-Transport-Security', 'max-age=86400');
    if (url.hostname.endsWith('.workers.dev')) headers.set('X-Robots-Tag', 'noindex, nofollow');
    if (url.pathname.startsWith('/api/')) headers.set('Cache-Control', 'no-store');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
