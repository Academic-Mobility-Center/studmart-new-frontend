// //api/auth/login
// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // обязательно в .env в реальных проектах

// export async function POST(request: Request) {
//   const { email, password } = await request.json();

//   const token = jwt.sign(
//     {
//       email: email,
//       password: password
//     },
//     SECRET_KEY,
//     { expiresIn: '7d' }
//   );

//   return NextResponse.json({
//     success: true,
//     token,
//   });
// }
// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// export async function POST(request: Request) {
//   const { email, password, role } = await request.json();

//   const token = jwt.sign(
//     { email, password, role },
//     SECRET_KEY,
//     { expiresIn: '7d' }
//   );

//   const response = NextResponse.json({ success: true });
//   // Устанавливаем HTTP-only cookie с токеном
//   response.cookies.set('Studmart', token, {
//     httpOnly: true,
//     maxAge: 60 * 60 * 24 * 7, // 7 дней
//     path: '/',
//     sameSite: 'lax',
//     secure: process.env.NODE_ENV === 'production',
//   });

//   return response;
// }

// /api/auth/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: Request) {
  const credentials = await request.json();

  // Запрос на настоящий API
  const externalResponse = await fetch(`https://auth.${process.env.NEXT_PUBLIC_API_URL}/login?useCookies=true`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!externalResponse.ok) {
    const error = await externalResponse.json();
    return NextResponse.json({ error: error.message || 'Ошибка авторизации' }, { status: 401 });
  }

  const data = await externalResponse.json(); // ожидаем { id, role }

  // Создание собственного JWT (опционально)
  const token = jwt.sign(
    { id: data.id, role: data.role },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({
    id: data.id,
    role: data.role,
    token,
  });

  response.cookies.set('Studmart', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
