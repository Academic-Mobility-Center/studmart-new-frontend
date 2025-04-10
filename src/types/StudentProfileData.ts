export interface UserData {
    firstName: string,
    lastName: string,
    university: {
      name: string
    },
    course: {
      name:string
    }
  };

import { Option } from "./Option";

export interface StudentFormData{
  email: string;
  password: string;
  firstName: string,
  lastName: string,
  date: Date | null;
  gender: Option | undefined;
  region: Option | undefined;
  city: Option | undefined;
  familyStatus: Option | undefined;
  isWork: Option | undefined
  languageProfiency: Option | undefined;
  university: Option | undefined;
  profession: string;
  course: Option | undefined;
}