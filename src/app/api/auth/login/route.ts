import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Здесь должна быть ваша реальная логика аутентификации
  // Например, проверка в базе данных
  
  if (email === 'test@example.com' && password === 'password') {
    // В реальном приложении генерируйте JWT токен
    const fakeToken = 'your_generated_jwt_token_here';
    
    return NextResponse.json({ 
      success: true,
      token: fakeToken
    });
  }

  return NextResponse.json(
    { error: 'Неверные учетные данные' },
    { status: 401 }
  );
}