import { httpClient } from "../httpClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_STUDENTS_SERVICE

export const getStudentCities = httpClient.get("/Cities", API_BASE_URL);
export const getStudentCityById = (id: string) => httpClient.get(`/Cities/${id}`, API_BASE_URL);
export const updateStudentCity = (data: any) =>  httpClient.post("/Cities", data, API_BASE_URL);

export const getStudentCourses = httpClient.get("/Courses", API_BASE_URL);
export const getStudentCourseById = (id: string) => httpClient.get(`/Courses/${id}`, API_BASE_URL);
export const updateStudentCourse = (data: any) =>  httpClient.post("/Courses", data, API_BASE_URL);

export const getStudents = httpClient.get("/Students", API_BASE_URL);
export const getStudentById = (id: string) => httpClient.get(`/Students/${id}`, API_BASE_URL);
export const updateStudents = (data: any) =>  httpClient.post("/Students", data, API_BASE_URL);

export const getStudentsUniversities = httpClient.get("/Universities", API_BASE_URL);
export const getStudentUniversityById = (id: string) => httpClient.get(`/Universities/${id}`, API_BASE_URL);
export const updateStudentUniversity = (data: any) =>  httpClient.post("/Students", data, API_BASE_URL);