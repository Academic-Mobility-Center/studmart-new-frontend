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
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const token = jwt.sign(
    { email, password },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({ success: true });
  // Устанавливаем HTTP-only cookie с токеном
  response.cookies.set('Studmart', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
