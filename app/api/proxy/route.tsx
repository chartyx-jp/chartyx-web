import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from '@/lib/utils/getCookie';

// -----POST-----
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Req:',req);
    console.log('Req:', req.method, req.url);
    const { endPoint, ...rest } = body;
    console.log('rest:', rest);
    console.log('endPoint:', endPoint);

    // DjangoのAPIエンドポイント
    const url = `http://127.0.0.1:8000/api${endPoint}`;
    console.log('Django API URL:', url);
    const cookie = await getCookie('all'); // Cookieを取得
    console.log('Cookie:', cookie);
    const csrfToken = await getCookie('csrftoken'); // CSRFトークンを取得
    console.log('CSRF Token:', csrfToken);
    const sessionId = await getCookie('sessionid'); // セッションIDを取得

    const djangoRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
        'sessionid': sessionId, // セッションIDをヘッダーに追加
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(rest), // エンドポイントとそれ以外のデータをDjangoに渡す
    });

    // レスポンスのボディとヘッダーを取得
    if (djangoRes.status === 204) {
      // No Content の場合はボディがないので、そのまま空の成功レスポンスを返す
      return new NextResponse(null, { status: 204 });
    }
    const data = await djangoRes.status === 204 ? {}: djangoRes.json();
    const response = NextResponse.json(data, { status: djangoRes.status });
    console.log('Django response:', response);
    if (djangoRes.ok) {
      const setCookie = djangoRes.headers.get('set-cookie');
      console.log('Set-Cookie header:', setCookie);

      if (setCookie) {
        response.headers.set('set-cookie', setCookie);
      }
    } else {
      console.error('Django error response:', data);
    }

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// -----GET-----
// GET リクエストを処理する関数 (例: データを取得する場合)
export async function GET(req: NextRequest) {
  console.log('get request run');
  try {
    // デフォルトのヘッダーを設定
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'cookie': await getCookie('all'),
      'X-CSRFToken': await getCookie('csrftoken'),
    };

    // 1. クエリパラメータの`URLSearchParams`オブジェクトを取得
    const searchParams = req.nextUrl.searchParams;

    // 2. 'endpoint'という名前のパラメータの値を取得し、デコードする
    const endpointParam = searchParams.get('endPoint');
    if (!endpointParam) {
      return NextResponse.json({ error: "Query parameter 'endpoint' is required." }, { status: 400 });
    }
    const endPointPath = decodeURIComponent(endpointParam); // %2F などを / に戻す

    // 3. Djangoに渡すための、'endpoint'以外のクエリパラメータを再構築する
    const forwardedParams = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'endpoint') {
        forwardedParams.append(key, value);
      }
    }
    const queryString = forwardedParams.toString();

    // 4. 正しいURLを組み立てる
    const djangoBaseUrl = 'http://127.0.0.1:8000/api'; // ここに /api は含めない
    const finalUrl = new URL(djangoBaseUrl + endPointPath); // ベースURLとデコードしたパスを結合
    console.log('Final URL:', finalUrl.href);
    
    // 5. 転送するクエリがあればセットする
    if (queryString) {
      finalUrl.search = queryString;
    }

    console.log('Forwarding request to:', finalUrl.href);

    // GET リクエストなので body は不要
    const djangoRes = await fetch(finalUrl.href, {
      method: 'GET',
      headers: headers,
    });

    console.log('Django response status (GET):', djangoRes.status);

    let data;
    try {
      data = await djangoRes.json();
    } catch (e) {
      console.error('Could not parse Django response as JSON (GET):', e);
      data = { message: 'Django response was not valid JSON.' };
    }
    console.log('Django response data (GET):', data);

    const setCookie = djangoRes.headers.get('set-cookie');
    const response = NextResponse.json(data, { status: djangoRes.status });
    if (setCookie) {
      response.headers.set('set-cookie', setCookie);
      console.log('Set-Cookie header received and set (GET):', setCookie);
    }

    return response;

  } catch (error) {
    console.error('Error in GET /api/proxy:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}