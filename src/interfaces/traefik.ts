export interface Route {
  entryPoints: string[];
  service: string;
  rule: string;
  priority?: number;
  status: string;
  using: string[];
  name: string;
  provider: string;
  middlewares?: string[];
  tls?: Tls;
}

export interface Tls {
  options: string;
  certResolver: string;
}
