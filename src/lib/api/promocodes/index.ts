export const getPromocodeCategories = async () => {
    try {
      const res = await fetch("/api/promocodes/Categories");
  
      if (!res.ok) {
        throw new Error(`Ошибка при получении категорий: ${res.status}`);
      }
      const data = await res.json();
      console.log("Категории промокодов:", data);
      return data;
    } catch (error) {
      console.error("Ошибка в getPromocodeCategories:", error);
      return null;
    }
};
export const getCategoryById = async (id: string) => {
  try {
    const res = await fetch(`/api/promocodes/Categories/${id}`);

    if (!res.ok) {
      throw new Error(`Ошибка при получении категорий: ${res.status}`);
    }
    const data = await res.json();
    console.log("Категория по id:", data);
    return data;
  } catch (error) {
    console.error("Ошибка в getPromocodeCategories:", error);
    return null;
  }
}
export const getPromocodePartners = async () => {
    try {
      const res = await fetch("/api/promocodes/Partners");
      if (!res.ok) {
        throw new Error(`Ошибка при получении партнеров: ${res.status}`);
      }
      const data = await res.json();
      console.log("Партнеры:", data);
      return data;
    } catch (error) {
      console.error("Ошибка в getPromocodePartners:", error);
      return null;
    }
};
export const getPromocodeDiscounts = async () => {
    try {
        const res = await fetch("/api/promocodes/Discounts");
        if (!res.ok) {
          throw new Error(`Ошибка при получении купонов партнера: ${res.status}`);
        }
        const data = await res.json();
        console.log("Купоны:", data);
        return data;
      } catch (error) {
        console.error("Ошибка в getPromocodeDiscounts:", error);
        return null;
    }
}
export const getPromocodeRegions = async () => {
    try {
        const res = await fetch("/api/promocodes/Regions");
        if (!res.ok) {
          throw new Error(`Ошибка при получении городов: ${res.status}`);
        }
        const data = await res.json();
        console.log("Регионы:", data);
        return data;
      } catch (error) {
        console.error("Ошибка в getPromocodeRegions:", error);
        return null;
    }
}
export const getPromocodePartnerById = async (id: string) => {
  try {
    const res = await fetch(`/api/promocodes/Partners?Id=${id}`);
    if (!res.ok) {
      throw new Error(`Ошибка при получении городов: ${res.status}`);
    }
    const data = await res.json();
    console.log("Партнер:", data);
    return data;
  } catch (error) {
    console.error("Ошибка в getPromocodeRegions:", error);
    return null;
}
}
export const getPromocodePartnersByRegionId = async (id: string) => {
  try {
    const res = await fetch(`/api/promocodes/Partners?RegionId=${id}`);
    if (!res.ok) {
      throw new Error(`Ошибка при получении партнеров по региону: ${res.status}`);
    }
    const data = await res.json();
    console.log("Партнеры по региону:", data);
    return data;
  } catch (error) {
    console.error("Ошибка в getPromocodePartnersByRegionId:", error);
    return null;
}
}
