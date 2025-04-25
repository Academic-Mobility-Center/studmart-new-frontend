export const getPartner = async () => {
    try {
      const res = await fetch("/api/partners/Partners");
  
      if (!res.ok) {
        throw new Error(`Ошибка при получении партнеров: ${res.status}`);
      }
      const data = await res.json();
      console.log("Категории промокодов:", data);
      return data;
    } catch (error) {
      console.error("Ошибка в getPartner:", error);
      return null;
    }
};
export const getPartnerCategories = async () => {
    try {
      const res = await fetch("/api/partners/Categories");
  
      if (!res.ok) {
        throw new Error(`Ошибка при получении категорий партнеров: ${res.status}`);
      }
      const data = await res.json();
      console.log("Категории промокодов:", data);
      return data;
    } catch (error) {
      console.error("Ошибка в getPartnerCategories:", error);
      return null;
    }
};
export const getPartnerCountries = async () => {
    try {
      const res = await fetch("/api/partners/Countries");
  
      if (!res.ok) {
        throw new Error(`Ошибка при получении стран: ${res.status}`);
      }
      const data = await res.json();
      console.log("Страны:", data);
      return data;
    } catch (error) {
      console.error("Ошибка в getPartnerCountries:", error);
      return null;
    }
};
export const getPartnerRegions = async () => {
    try {
      const res = await fetch("/api/partners/Regions");
  
      if (!res.ok) {
        throw new Error(`Ошибка при получении регионов партнеров: ${res.status}`);
      }
      const data = await res.json();
      console.log("Регионы:", data);
      return data;
    } catch (error) {
      console.error("Ошибка в getPartnerRegions:", error);
      return null;
    }
};
export const getPartnerInfo = async (id: string) => {
  try {
    const res = await fetch(`/api/partners/Employees?id=${id}`);

    if (!res.ok) {
      throw new Error(`Ошибка при получении партнера: ${res.status}`);
    }
    const data = await res.json();
    console.log("Партнер:", data);
    return data;
  } catch (error) {
    console.error("Ошибка в getPartnerInfo:", error);
    return null;
  }  
}