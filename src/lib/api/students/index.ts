export const getStudent = async () => {
    try {
      const res = await fetch("/api/students/Students");
  
      if (!res.ok) {
        throw new Error(`Ошибка при получении партнеров: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Ошибка в getStudent:", error);
      return null;
    }
};

export const getStudentById = async (id: string) => {
    try {
        const res = await fetch(`/api/students/Students?Id=${id}`);
    
        if (!res.ok) {
          throw new Error(`Ошибка при получении студента по id: ${res.status}`);
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.log("Ошибка в getStudentById:", error);
        return null;
      }
}
export const getStudentByEmail = async (email: string) => {
  try {
    const res = await fetch(`/api/students/Students?Email=${encodeURIComponent(email)}`);

    if (!res.ok) {
      console.warn(`getStudentByEmail: студент не найден или ошибка ответа (${res.status})`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка в getStudentByEmail:", error);
    return null;
  }
};

export const getStudentCourses = async () => {
  try {
    const res = await fetch("/api/students/Courses");

    if (!res.ok) {
      throw new Error(`Ошибка при получении курсов: ${res.status}`);
    }
    const data = await res.json();
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
    return data;
  } catch (error) {
    console.error("Ошибка в getStudentUniversities:", error);
    return null;
  }
}
export const StudentEmailDomain = async(email: string, universityId: string) => {
  try {
    const res = await fetch(`/api/students/EmailDomains?Email=${email}&UniversityId=${universityId}`);

    if (!res.ok) {
      throw new Error(`Ошибка при получении университетов: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const studentRegistration = async (
  firstName: string, 
  lastName: string,
  sex: boolean,
  birthDate: string,
  email: string,
  specialisation: string,
  password: string,
  promocode: string,
  universityId: number,
  courseId: number
) => {
  try {
    const res = await fetch(`/api/students/Students`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        firstName, 
        lastName, 
        sex, 
        birthDate, 
        email, 
        specialisation, 
        password, 
        promocode, 
        universityId,
        courseId
      }),
    });

    if (!res.ok) {
      throw new Error(`Ошибка при получении университетов: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error)
    return null;
  }
}
export const sendStudentFile = async(id: string, image: string, contentType: string) => {
  try{
    const response = await fetch(`/api/files/Verifications`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "accept": "*/*"
       },
      body: JSON.stringify({
        id,
        image,
        contentType
      })
    })
    if (!response.ok) {
      console.log(`Ошибка при отправлении файла: ${response.status}`);
    }
    const text = await response.text();
    const data = text ? JSON.parse(text) : { status: response.status };
    
    return data;
  } catch (error) {
    console.log(error)
    return null;
  }
}
// export const sendStudentFile = (id: string, image: string, contentType: string) => {
//   try {
//     fetch(`/api/files/Verifications`, {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//         "accept": "*/*"
//       },
//       body: JSON.stringify({
//         id,
//         image,
//         contentType
//       })
//     }).catch(error => {
//       console.log("Ошибка при отправке файла:", error);
//     });
//   } catch (error) {
//     console.log("Ошибка в sendStudentFile:", error);
//   }
// };
