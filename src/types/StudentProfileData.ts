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
  email: string | undefined;
  password: string | undefined;
  firstName: string | undefined,
  lastName: string | undefined,
  date: Date | undefined;
  gender: Option | undefined;
  region: Option | undefined;
  city: Option | undefined;
  familyStatus: Option | undefined;
  isWork: Option | undefined
  languageProfiency: Option[] | undefined;
  university: Option | undefined;
  profession: string | undefined;
  course: Option | undefined;
}