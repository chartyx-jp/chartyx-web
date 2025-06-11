// apiclient

// 基本的なフェッチ要求
export class ApiClient {
    private baseUrl: string;
    private headers = {'Content-Type': 'application/json'};
    constructor(baseUrl: string = 'http://10.192.94.199:8000') {
        this.baseUrl = baseUrl;
    }

    public request<T>(endpoint: string, methodType: string, body?: T): Promise<Response> {
        const url = `${this.baseUrl}${endpoint}`;
        const useMethod = methodType.toUpperCase();
        const options: RequestInit = {
            method: useMethod,
            headers: this.headers,
            credentials: 'include',
        };

      // GETメソッドの場合はbodyを積まずにリクエスト
        if (useMethod === 'GET') {
            return fetch(url, options); 
        } else if (useMethod !== 'GET' && body) {
            // GET以外のメソッドでデータがある場合はリクエストボディに設定
            options.body = JSON.stringify(body);
        }
        return fetch(url, options);     
    }
}