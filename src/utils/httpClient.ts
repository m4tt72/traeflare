export interface HttpClientOptions {
  baseURL: string;
  headers?: Record<string, string>;
}

export class HttpClient {
  constructor(private readonly options: HttpClientOptions) {}

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.options.baseURL}${url}`, {
      headers: this.options.headers || {},
    });

    return (await response.json()) as T;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${this.options.baseURL}${url}`, {
      method: 'POST',
      headers: this.options.headers || {},
      body: JSON.stringify(data),
    });

    return (await response.json()) as T;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.options.baseURL}${url}`, {
      method: 'DELETE',
      headers: this.options.headers || {},
    });

    return (await response.json()) as T;
  }
}
