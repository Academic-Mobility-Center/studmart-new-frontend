import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string, resource: string }> }
) {
  const { domain, resource } = await params;

  const allowedDomains = ["promocodes", "students", "partners"];
  const allowedResources = ["Categories", "Discounts", "Regions", "Partners", "Countries"];

  // Проверка на допустимость домена и ресурса
  if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
    return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("Id"); // <--- ВАЖНО: получаем id из query

  let externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

  if (id) {
    externalUrl += `?id=${id}`; // Если есть id, добавляем его к урлу
  }
  // return NextResponse.json({ externalUrl });
  try {
    console.log(externalUrl)
    const response = await fetch(externalUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    // Проверка на успешность ответа от внешнего API
    if (!response.ok) {
      return NextResponse.json({ error: "Ошибка при получении данных" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Ошибка запроса к ${externalUrl}:`, error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
