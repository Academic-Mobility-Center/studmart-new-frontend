import { NextResponse } from 'next/server';

interface BodyData {
	[key: string]: unknown;
}
export async function POST(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ discountId: string; studentId: string }>;
	},
) {
	const { discountId, studentId } = await params;

	let body: BodyData;
	try {
		body = await request.json();
	} catch (e) {
		console.log(e);
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	// Здесь можешь собрать внешний URL:
	const externalUrl = `https://promocodes.${process.env.NEXT_PUBLIC_API_URL}/discount/${discountId}/giveToStudent/${studentId}`;

	try {
		const response = await fetch(externalUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				discountId,
				studentId,
				...body,
			}),
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Ошибка при запросе к внешнему серверу' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Ошибка при обработке запроса:', error);
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
	}
}

// export async function GET() {
//   return NextResponse.json(
//     { error: "Метод GET не поддерживается, используйте POST" },
//     { status: 405 }
//   );
// }

//   return NextResponse.json({ externalUrl });
