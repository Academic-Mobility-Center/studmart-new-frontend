
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  context: { params: { domain: string; resource: string } }
) {
  const { domain, resource } = context.params;

  const allowedDomains = ["promocodes", "students", "partners"];
  const allowedResources = ["Categories", "Discounts", "Regions", "Partners"];

  if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
    return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
  }

  const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

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
