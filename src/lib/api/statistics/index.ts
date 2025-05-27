export const getEvents = async (From?: string, To?: string, RegionId?: string, UniversityId?: string) => {
    try {
      const res = await fetch(`/api/statistics/Events?From=${From}&To=${To}&RegionId=${RegionId}&UniversityId=${UniversityId}`);
  
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

  export const getUsersCities = async () => {
    try {
      const res = await fetch(`/api/statistics/Users?IsCities=true`);
  
      if (!res.ok) {
        console.warn(`getUsersCities: статистика не найдена (${res.status})`);
        return null;
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Ошибка в getUsersCities:", error);
      return null;
    }
  }
  export const getUsersDemography = async () => {
    try {
      const res = await fetch(`/api/statistics/Users?IsSex=true`);
  
      if (!res.ok) {
        console.warn(`getUsersDemography: статистика не найдена (${res.status})`);
        return null;
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Ошибка в getUsersDemography:", error);
      return null;
    }
  }
  export const getUsersDevices= async () => {
    try {
      const res = await fetch(`/api/statistics/Users?IsDevices=true`);
  
      if (!res.ok) {
        console.warn(`getUsersDevices: статистика не найдена (${res.status})`);
        return null;
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Ошибка в getUsersDevices:", error);
      return null;
    }
  }
