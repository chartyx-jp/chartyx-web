export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = '/api') { // Next.jsのAPI Route向け
        this.baseUrl = baseUrl;
    }

    // 汎用リクエストメソッド
    public async request(
        endpoint: string,
        method: string,
        headers: HeadersInit = { 'Content-Type': 'application/json' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body?: any,
    ): Promise<Response> {
        const url = `${this.baseUrl}${endpoint}`;

        const options: RequestInit = {
            method,
            headers,
            credentials: 'include', // 認証クッキーが必要なら
        };

        console.log(`Request URL: ${url}`);
        console.log(`Request Method: ${method}`);

        if (body) {
            options.body = JSON.stringify(body);
            console.log(`Request Body: ${JSON.stringify(body)}`);
        }

        const response = await fetch(url, options);
        // 必要なら .text() や .blob() も選択可
        return response;
    }
}