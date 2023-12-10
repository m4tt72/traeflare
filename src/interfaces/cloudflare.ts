export interface VerificationResponse {
  result: {
    id: string;
    status: string;
  };
  success: boolean;
  errors: Array<any>;
  messages: Array<any>;
}

export interface DNSRecordsResponse {
  errors: any[];
  messages: any[];
  result: Result[];
  success: boolean;
  result_info: ResultInfo;
}

export interface Result {
  content: string;
  name: string;
  proxied: boolean;
  type: string;
  comment: string;
  created_on: string;
  id: string;
  locked: boolean;
  meta: Meta;
  modified_on: string;
  proxiable: boolean;
  tags: string[];
  ttl: number;
  zone_id: string;
  zone_name: string;
}

export interface Meta {
  auto_added: boolean;
  source: string;
}

export interface ResultInfo {
  count: number;
  page: number;
  per_page: number;
  total_count: number;
}

export interface CreateDNSRecordData {
  content: string;
  name: string;
  proxied: boolean;
  type: string;
  comment?: string;
  tags?: string[];
  ttl?: number;
}


export interface CreateDNSRecordData {
  errors: any[];
  messages: any[];
  result: Result;
  success: boolean;
}

export interface Result {
  content: string;
  name: string;
  proxied: boolean;
  type: string;
  comment: string;
  created_on: string;
  id: string;
  locked: boolean;
  meta: Meta;
  modified_on: string;
  proxiable: boolean;
  tags: string[];
  ttl: number;
  zone_id: string;
  zone_name: string;
}

export interface Meta {
  auto_added: boolean;
  source: string;
}
