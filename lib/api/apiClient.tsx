// apiclient
// 基本的なフェッチ要求

export class ApiClient {
    private baseUrl: string;
    private defaultHeaders = {'Content-Type': 'application/json'};
    constructor(baseUrl: string = 'http://10.192.95.39:8000') {
        this.baseUrl = baseUrl;
    }

    private async getSessionIdFromCookie(): Promise<{ sessionId: number } | null> {
        if (typeof window === 'undefined') {
            const { headers } = await import('next/headers');
            const headerList = await headers();
            const cookieHeader = headerList.get('cookie');
            console.log()

            if (cookieHeader) {
                const cookies = cookieHeader.split('; ').map(c => c.split('='));
                const foundCookie = cookies.find((c: string[]) => c[0].trim() === 'sessionid');
                const sessionIdCookie: [string, string] | undefined = (foundCookie && foundCookie.length === 2) ? [foundCookie[0], foundCookie[1]] : undefined;
                
                if (sessionIdCookie) {
                    const sessionId = parseInt(sessionIdCookie[1], 10);
                    if (!isNaN(sessionId)) {
                        console.log(`User ID found in cookie: ${sessionId}`);
                        const session = {sessionId: sessionId}
                        return session;
                    }
                }
            }
            // セッションIDがない場合
            console.log(`User ID cookie (sessionid) not found or invalid.`);
            return null;
        }else {
            return null
        }
    }

private async getCsrfToken(cookieName: string = 'csrftoken'): Promise<string> {
    // サーバーサイド (Node.js) 環境の場合
    if (typeof window === 'undefined') {
        try {
            const { headers } = await import('next/headers');
            const headerList = await headers();
            const cookieHeader = headerList.get('cookie');
            if (cookieHeader) {
                const cookies = cookieHeader.split('; ').map(c => c.split('='));
                const csrfCookie = cookies.find(c => c[0].trim() === cookieName);
                if (csrfCookie) {
                    return csrfCookie[1];
                }
            }
        } catch (error) {
            // headers()が利用できない環境（クライアントサイドでの初回評価など）の場合
            console.warn("Server-side CSRF token acquisition failed or not applicable:", error);
        }
        return '';
        } else {
            // クライアントサイド (ブラウザ) 環境の場合
            const cookies = document.cookie.split('; ').map(c => c.split('='));
            const csrfCookie = cookies.find(c => c[0].trim() === cookieName);
            if (csrfCookie) {
                return csrfCookie[1];
            }
            return '';
        }
    }

   
    public async request<T>(
        endpoint: string,
        methodType: string,
        body?: T,
    ): Promise<Response> {
        console.log('ApiClient run')
        const url = `${this.baseUrl}${endpoint}`;
        const useMethod = methodType.toUpperCase();
        const sessionIdObj = await this.getSessionIdFromCookie();
        console.log(sessionIdObj)
        const csrfToken = await this.getCsrfToken();
        const options: RequestInit = {
            method: useMethod,
            headers: {
                ...this.defaultHeaders,
                ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
                ...(sessionIdObj && sessionIdObj.sessionId ? { 'sessionid': String(sessionIdObj.sessionId) } : {})
            },
            credentials: 'include',
        };

        if (useMethod !== 'GET' && body) {
            // GET以外のメソッドでデータがある場合はリクエストボディに設定
            options.body = JSON.stringify(body);
        }
        return fetch(url, options)
    }
}