import { NextResponse } from "next/server";
interface BodyData {
  [key: string]: unknown;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string, resource: string }> }
) {
  const { domain, resource } = await params;

  const allowedDomains = ["promocodes", "students", "partners"];
  const allowedResources = ["Categories", "Discounts", "Regions", "Partners", "Countries", "Employees", "Students"];

  // Проверка на допустимость домена и ресурса
  if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
    return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
  }
  const url = new URL(request.url);
  
  // Получаем все параметры запроса
  const queryParams = new URLSearchParams(url.search);

  let externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

  // Если есть параметры, добавляем их к URL
  if (queryParams.toString()) {
    externalUrl += `?${queryParams.toString()}`;
  }


  // return NextResponse.json({ externalUrl });

  try {
    const response = await fetch(externalUrl, {
      headers: {
        Accept: "application/json",
      },
    });
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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ domain: string; resource: string }> }
) {
  const { domain, resource } = await params;

  const allowedDomains = ["promocodes", "students", "partners"];
  const allowedResources = ["Categories", "Discounts", "Regions", "Partners", "Countries", "Employees", "Students"];

  if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
    return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
  }

  let body: BodyData;
  try {
    body = await request.json();
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

  try {
    const response = await fetch(externalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Ошибка при отправке POST-запроса" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Ошибка POST-запроса к ${externalUrl}:`, error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}


  // const url = new URL(request.url);
  // const id = url.searchParams.get("Id");
  // const regionId = url.searchParams.get("RegionId");

  // let externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

  // // Добавляем параметры к URL, если они есть
  // const queryParams = new URLSearchParams();
  // if (id) {
  //   queryParams.append("id", id);
  // }
  // if (regionId) {
  //   queryParams.append("RegionId", regionId);
  // }

  // if (queryParams.toString()) {
  //   externalUrl += `?${queryParams.toString()}`;
  // }