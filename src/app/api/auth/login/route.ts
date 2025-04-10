// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // обязательно в .env в реальных проектах

const USERS = [
  {
    email: 'test@example.com',
    password: 'password',
    role: 'student',
  },
  {
    email: 'partner@example.com',
    password: 'password',
    role: 'partner',
  },
];

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json(
      { error: 'Неверные учетные данные' },
      { status: 401 }
    );
  }

  // Генерация JWT
  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  return NextResponse.json({
    success: true,
    token,
  });
}
