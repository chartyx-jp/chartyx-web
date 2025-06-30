import { NextRequest, NextResponse } from 'next/server';
// import { getCookie } from '@/lib/utils/getCookie';

// -----POST-----
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Req:', req.method, req.url);
    const { endPoint, ...rest } = body;

    console.log('Received request:', rest);

    // DjangoのAPIエンドポイント
    const url = `http://127.0.0.1:8000/api${endPoint}`;

    // cookie取得
    // const cookie = await getCookie();

    const djangoRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Cookie': cookie,
      },
      body: JSON.stringify(rest),
      credentials: 'include', // Cookieを横持ちしたいなら
    });

    // レスポンスのボディとヘッダーを取得
    const data = await djangoRes.json();
    console.log('Django response:', data);
    const setCookie = djangoRes.headers.get('set-cookie');

    const response = NextResponse.json(data, { status: djangoRes.status });

    if (setCookie) {
      response.headers.set('set-cookie', setCookie);
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
  try {
    console.log('--- GET /api/proxy received request from client/server ---');
    
    // クエリパラメータを取得
    // NextRequestからURLSearchParamsを直接取得できる
    const searchParams = req.nextUrl.searchParams; 
    const endPoint = searchParams.get('endPoint');
    const param1 = searchParams.get('param1'); // 例: 他のクエリパラメータ

    console.log('Received endPoint from query:', endPoint);
    console.log('Received param1 from query:', param1);

    if (!endPoint || typeof endPoint !== 'string' || !endPoint.startsWith('/')) {
      console.error('Validation Error (GET): Missing or invalid "endPoint" in query parameters.');
      return NextResponse.json(
        { message: 'Query parameter "endPoint" is required and must start with /.' },
        { status: 400 }
      );
    }

    const djangoBaseUrl = 'http://127.0.0.1:8000/api'; 
    const url = `${djangoBaseUrl}${endPoint}`; 
    console.log('-----request------', req);

    const cookie = req.headers.get('cookie') || ''; // リクエストヘッダーからCookieを取得
    if (!cookie) {
      console.warn('No cookie found in request headers (GET).');
    } else {
      console.log('Cookie found in request headers (GET):', cookie);
    }
    console.log('cookie (GET):', cookie);

    // GET リクエストなので body は不要
    const djangoRes = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookie,
      },
      // credentials: 'include', // サーバーサイドでは通常不要
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

    // GETリクエストでSet-Cookieを受け取ることは稀だが、もしあれば処理
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