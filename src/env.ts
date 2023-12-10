const Environment = {
  TRAEFIK_API_URL: process.env.TRAEFIK_API_URL || 'http://traefik:8080/api',
  CF_API_URL: process.env.CF_API_URL || 'https://api.cloudflare.com/client/v4',
  CF_ZONE_ID: process.env.CF_ZONE_ID as string,
  CF_API_EMAIL: process.env.CF_API_EMAIL as string,
  CF_API_KEY: process.env.CF_API_KEY as string,
  CF_DNS_API_TOKEN: process.env.CF_DNS_API_TOKEN as string,
  DOMAIN_NAME: process.env.DOMAIN_NAME as string,
  RECORD_TYPE: process.env.RECORD_TYPE || 'A',
  PROXIED: process.env.PROXIED === 'true',
  PRUNE_RECORDS: process.env.PRUNE_RECORDS === 'true',
};

Object.entries(Environment).forEach(([key, value]) => {
  if (value === undefined || value === null || value === '') {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

console.log(
  Object.entries(Environment)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n'),
);

export default Environment;
