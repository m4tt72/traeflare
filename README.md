# Traefik Cloudflare DNS Updater

This is a simple script to update Cloudflare DNS records with Traefik's existing records. Making it automatic to update your DNS records when you add a new service to Traefik.

## Usage

### Docker Compose

```yaml
version: "3"

services:
  ...
  traeflare:
    image: docker.lan.fathi.me/traeflare:latest
    container_name: traeflare
    env_file: .env
    restart: unless-stopped
    depends_on:
      - traefik
    ...
```

### Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `TRAEFIK_API_URL` | Traefik API URL | `http://traefik:8080` |
| `CF_API_URL` | Cloudflare API URL | `https://api.cloudflare.com/client/v4` |
| `CF_ZONE_ID` | Cloudflare Zone ID | ` ` |
| `CF_API_EMAIL` | Cloudflare API Email | ` ` |
| `CF_API_KEY` | Cloudflare API Key | ` ` |
| `CF_DNS_API_TOKEN` | Cloudflare DNS API Token | ` ` |
| `DOMAIN_NAME` | Domain Name | ` ` |
| `RECORD_TYPE` | Cloudflare Record Type | `A` |
| `PROXIED` | Cloudflare Proxied | `true` |
| `PRUNE_RECORDS` | Prune Records | `true` |