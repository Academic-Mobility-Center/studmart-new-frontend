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

  const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

  try {
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

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { domain: string; resource: string } }
// ) {
//   const { domain, resource } = params;

//   const allowedDomains = ["promocodes", "students", "partners"];
//   const allowedResources = ["Categories", "Discounts", "Regions", "Partners", "Countries"];

//   if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
//     return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
//   }

//   const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

//   try {
//     const response = await fetch(externalUrl, {
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!response.ok) {
//       return NextResponse.json({ error: "Ошибка при получении данных" }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error(`Ошибка запроса к ${externalUrl}:`, error);
//     return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
//   }
// }


// // src/app/api/[domain]/[resource]/route.ts
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   context: { params: Record<string, string> }
// ) {
//   // Ждём получения параметров
//   const { domain, resource } = await context.params;

//   const allowedDomains = ["promocodes", "students", "partners"];
//   const allowedResources = ["Categories", "Discounts", "Regions", "Partners", "Countries"];

//   if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
//     return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
//   }

//   const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

//   try {
//     const response = await fetch(externalUrl, {
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!response.ok) {
//       return NextResponse.json({ error: "Ошибка при получении данных" }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error(`Ошибка запроса к ${externalUrl}:`, error);
//     return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Record<string, string> }
// ) {
//   const { domain, resource } = params as { domain: string; resource: string }

//   const allowedDomains = ["promocodes", "students", "partners"];
//   const allowedResources = ["Categories", "Discounts", "Regions", "Partners", "Countries"];

//   if (!allowedDomains.includes(domain) || !allowedResources.includes(resource)) {
//     return NextResponse.json({ error: "Invalid domain or resource" }, { status: 400 });
//   }

//   const externalUrl = `https://${domain}.studmart-dev.inxan.ru/${resource}`;

//   try {
//     const response = await fetch(externalUrl, {
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!response.ok) {
//       return NextResponse.json({ error: "Ошибка при получении данных" }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error(`Ошибка запроса к ${externalUrl}:`, error);
//     return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
//   }
// }