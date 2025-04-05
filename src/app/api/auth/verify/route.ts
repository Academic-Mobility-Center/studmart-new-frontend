import { NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
//   const cookieStore = cookies();
//   const token = getAuthToken({ req: { cookies: cookieStore } });

//   if (!token) {
//     return NextResponse.json(
//       { error: 'Токен отсутствует' },
//       { status: 401 }
//     );
//   }

  // Здесь ваша логика проверки токена
  // Например, проверка JWT или запрос к вашему auth-сервису
 
  return NextResponse.json({ valid: true });
}