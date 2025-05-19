export const getPromocodeCategories = async () => {
    try {
      const res = await fetch("/api/promocodes/Categories");
  
      if (!res.ok) {
        throw new Error(`Ошибка при получении категорий: ${res.status}`);
      }
      const data = await res.json();
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
    return data;
  } catch (error) {
    console.error("Ошибка в getPromocodePartnersByRegionId:", error);
    return null;
  }
}
export const getPromocodePartnerByIdAndRegionId = async(partnerId: string, regionId: string) => {
  try {
    const res = await fetch(`/api/promocodes/Partners?Id=${partnerId}&RegionId=${regionId}`);
    if (!res.ok) {
      throw new Error(`Ошибка при получении партнеров по региону: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка в getPromocodePartnersByRegionId:", error);
    return null;
  }
}
export const getPromocodeDiscountByDiscountIdAndStudentId = async (
  discountId: string,
  studentId: string
) => {
  try {
    const res = await fetch(
      `/api/promocodes/discount/${discountId}/giveToStudent/${studentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка в getPromocodeDiscountByDiscountIdAndStudentId:", error);
    return null;
  }
};
