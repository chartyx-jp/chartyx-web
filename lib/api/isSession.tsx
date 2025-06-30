// lib/api/isSession.ts
import { getSession } from '@/lib/utils/getCookie';

export class isSession {
    
    public static async checkSession(): Promise<void> {
        const session = await getSession();
        console.log('Session:', session);
        const options: RequestInit = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'session': session },
            cache: 'no-store',
            credentials: 'include', // 認証クッキーが必要なら
        };
        const response = await fetch('/api/users/auth/user-info/', options);
        console.log('Response:', response);
        return response.json()
    };
}