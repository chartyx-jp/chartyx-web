export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = '/api') { // Next.jsのAPI Route向け
        this.baseUrl = baseUrl;
    }

    // 汎用リクエストメソッド
    public async request(
        endpoint: string,
        method: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body?: any,
        customHeaders?: HeadersInit
    ): Promise<Response> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(customHeaders || {}),
        };

        const options: RequestInit = {
            method,
            headers,
            credentials: 'include', // 認証クッキーが必要なら
        };

        if (body && method.toUpperCase() !== 'GET') {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            // エラーハンドリングも一箇所に
            throw new Error(`HTTP error: ${response.status}`);
        }
        // 必要なら .text() や .blob() も選択可
        return response;
    }
}