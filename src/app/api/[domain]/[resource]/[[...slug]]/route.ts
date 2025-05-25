import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string; resource: string; slug?: string[] }> }
) {
  const { domain, resource, slug } = await params;

  const allowedDomains = ["promocodes", "students", "partners", "files"];
  const allowedResources = [
    "Categories", "Discounts", "Regions", "Partners", 
    "Countries", "Employees", "Students", "Favourites", "Courses", "Universities",
    "EmailDomains", "Verifications", "Cities"
  ];

  if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
    return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
  }

  const pathSuffix = slug?.length ? `/${slug.join("/")}` : "";
  const url = new URL(request.url);
  const query = url.search ? `?${url.searchParams.toString()}` : "";

  const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}${pathSuffix}${query}`;

  try {
    const response = await fetch(externalUrl, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Ошибка при получении данных" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Ошибка при запросе к ${externalUrl}:`, error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
export async function POST(
  request: Request,
  { params }: { params: Promise<{ domain: string; resource: string; slug?: string[] }> }
) {
  const { domain, resource, slug } = await params;

  const allowedDomains = ["promocodes", "students", "partners", "files"];
  const allowedResources = [
    "Categories", "Discounts", "Regions", "Partners", 
    "Countries", "Employees", "Students", "Favourites", "Courses", "Universities",
    "EmailDomains", "Verifications", "Cities"
  ];

  if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
    return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Ошибка парсинга JSON:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const pathSuffix = slug?.length ? `/${slug.join("/")}` : "";
  const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}${pathSuffix}`;

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
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ domain: string; resource: string; slug?: string[] }> }
) {
  const { domain, resource, slug } = await params;

  const allowedDomains = ["promocodes", "students", "partners", "files"];
  const allowedResources = [
    "Categories", "Discounts", "Regions", "Partners", 
    "Countries", "Employees", "Students", "Favourites", "Courses", "Universities",
    "EmailDomains", "Verifications", "Cities"
  ];

  if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
    return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Ошибка парсинга JSON в DELETE:", error);
    return NextResponse.json({ error: "Invalid JSON in DELETE body" }, { status: 400 });
  }

  const pathSuffix = slug?.length ? `/${slug.join("/")}` : "";
  const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}${pathSuffix}`;

  try {
    const response = await fetch(externalUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Ошибка при DELETE-запросе" }, { status: response.status });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Ошибка DELETE-запроса к ${externalUrl}:`, error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

