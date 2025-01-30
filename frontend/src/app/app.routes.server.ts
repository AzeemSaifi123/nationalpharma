import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  { path: 'ssr-route', renderMode: RenderMode.Server },
  { path: 'csr-route', renderMode: RenderMode.Client },
];
