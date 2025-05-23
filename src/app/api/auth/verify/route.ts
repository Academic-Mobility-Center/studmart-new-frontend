// import { NextResponse } from 'next/server';
// export async function GET() {
 
//   return NextResponse.json({ valid: true });
// }
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie');
  if (!cookie) {
    return NextResponse.json({ error: 'Токен отсутствует' }, { status: 401 });
  }

  const match = cookie.match(/auth_token=([^;]+)/);
  if (!match) {
    return NextResponse.json({ error: 'Токен отсутствует' }, { status: 401 });
  }

  const token = match[1];

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ valid: true, payload });
  } catch (e) {
    console.warn(e)
    return NextResponse.json({ error: 'Неверный или просроченный токен' }, { status: 401 });
  }
}
