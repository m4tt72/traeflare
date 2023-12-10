import Environment from '../env.js';
import {
  CreateDNSRecordData,
  DNSRecordsResponse,
} from '../interfaces/cloudflare.js';
import { HttpClient } from '../utils/httpClient.js';

const httpClient = new HttpClient({
  baseURL: Environment.CF_API_URL,
  headers: {
    'X-Auth-Email': Environment.CF_API_EMAIL,
    'X-Auth-Key': Environment.CF_API_KEY,
  },
});

export const getDNSRecords = async () => {
  const data = await httpClient.get<DNSRecordsResponse>(
    `/zones/${Environment.CF_ZONE_ID}/dns_records`,
  );

  return data.result.filter(
    (record) => record.content === Environment.DOMAIN_NAME,
  );
};

export const createDNSRecords = async (records: Array<CreateDNSRecordData>) => {
  const responses = await Promise.all(
    records.map((record) =>
      httpClient.post<DNSRecordsResponse>(
        `/zones/${Environment.CF_ZONE_ID}/dns_records`,
        record,
      ),
    ),
  );

  return responses.map((response) => response);
};

export const removeDNSRecords = async (records: Array<string>) => {
  const responses = await Promise.all(
    records.map((record) =>
      httpClient.delete<DNSRecordsResponse>(
        `/zones/${Environment.CF_ZONE_ID}/dns_records/${record}`,
      ),
    ),
  );

  return responses.map((response) => response);
};
