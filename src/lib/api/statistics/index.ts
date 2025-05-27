export const getEvents = async (From?: string, To?: string, RegionId?: string, UniversityId?: string) => {
    try {
      const res = await fetch(`/api/statistics/Students?Events?From=${From}&To=${To}}&RegionId=${RegionId}&UniversityId=${UniversityId}`);
  
      if (!res.ok) {
        console.warn(`getEvents: статистика не найдена (${res.status})`);
        return null;
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Ошибка в getEvents:", error);
      return null;
    }
  };