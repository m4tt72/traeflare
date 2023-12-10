import {
  createDNSRecords,
  getDNSRecords,
  removeDNSRecords,
} from './api/cloudflare.js';
import { getRoutes } from './api/traefik.js';
import Environment from './env.js';
import { CreateDNSRecordData } from './interfaces/cloudflare.js';

console.log(`Starting Traeflare at ${new Date().toISOString()}`);

const main = async () => {
  console.log(`Running cron job at ${new Date().toISOString()}`);

  try {
    const records = await getDNSRecords();
    const routes = await getRoutes();

    const dnsRecordsToCreate = routes
      .filter((route) => !records.some((record) => record.name === route.rule))
      .map(
        (route) =>
          ({
            type: Environment.RECORD_TYPE,
            name: route.rule,
            content: Environment.DOMAIN_NAME,
            proxied: false,
            comment: `Created by Traeflare at ${new Date().toISOString()}`,
          }) as CreateDNSRecordData,
      );

    if (dnsRecordsToCreate.length === 0) {
      console.log('No DNS records to create');
    } else {
      const responses = await createDNSRecords(dnsRecordsToCreate);

      console.log(`Created ${responses.length} DNS records`);
    }

    if (Environment.PRUNE_RECORDS) {
      const dnsRecordsToRemove = records
        .filter((record) => !routes.some((route) => route.rule === record.name))
        .map((record) => record.id);

      if (dnsRecordsToRemove.length === 0) {
        console.log('No DNS records to remove');
      } else {
        const responses = await removeDNSRecords(dnsRecordsToRemove);

        console.log(`Removed ${responses.length} DNS records`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const start = () => {
  main().then(() => {
    setTimeout(start, 1000 * 30);
  });
};

start();
