import { cookies } from "next/headers";

export const getCookie = async (type: 'all' | 'sessionid' | 'csrftoken'): Promise<string> => {
  const cookieStore = await cookies();

  switch (type) {
    case 'all':
      // すべてのCookieを "key=value; key2=value2" 形式で結合して返す
      return cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "); // セミコロンとスペースで結合するのが一般的です

    case 'sessionid':
      // 'sessionid' という名前のCookieの値を探して返す
      const sessionCookie = cookieStore.get('sessionid');
      return sessionCookie ? sessionCookie.value : '';

    case 'csrftoken':
      // 'csrftoken' という名前のCookieの値を探して返す
      const csrfCookie = cookieStore.get('csrftoken');
      return csrfCookie ? csrfCookie.value : '';

    default:
      // 未知のタイプが指定された場合は空文字列を返すか、エラーをスローすることも検討
      console.warn(`Unknown cookie type requested: ${type}. Returning empty string.`);
      return '';
  }
};