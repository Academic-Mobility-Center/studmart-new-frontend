export const getStudent = async () => {
    try {
      const res = await fetch("/api/students/Students");
  
      if (!res.ok) {
        throw new Error(`Ошибка при получении партнеров: ${res.status}`);
      }
      const data = await res.json();
      console.log("Студент:", data);
      return data;
    } catch (error) {
      console.error("Ошибка в getStudent:", error);
      return null;
    }
};

export const getStudentById = async (id: string) => {
    try {
        const res = await fetch(`/api/students/Students?id=${id}`);
    
        if (!res.ok) {
          throw new Error(`Ошибка при получении студента по id: ${res.status}`);
        }
        const data = await res.json();
        console.log("Студент:", data);
        return data;
      } catch (error) {
        console.error("Ошибка в getStudentById:", error);
        return null;
      }
}
export const getStudentCourses = async () => {
  try {
    const res = await fetch("/api/students/Courses");

    if (!res.ok) {
      throw new Error(`Ошибка при получении курсов: ${res.status}`);
    }
    const data = await res.json();
    console.log("Курсы:", data);
    return data;
  } catch (error) {
    console.error("Ошибка в getStudentCourses:", error);
    return null;
  }
}
export const getStudentCities = async () => {
  try {
    const res = await fetch("/api/students/Cities");

    if (!res.ok) {
      throw new Error(`Ошибка при получении городов: ${res.status}`);
    }
    const data = await res.json();
    console.log("Города:", data);
    return data;
  } catch (error) {
    console.error("Ошибка в getStudentCities:", error);
    return null;
  }
}
export const getStudentUniversities = async () => {
  try {
    const res = await fetch("/api/students/Universities");

    if (!res.ok) {
      throw new Error(`Ошибка при получении университетов: ${res.status}`);
    }
    const data = await res.json();
    console.log("Студент:", data);
    return data;
  } catch (error) {
    console.error("Ошибка в getStudentUniversities:", error);
    return null;
  }
}