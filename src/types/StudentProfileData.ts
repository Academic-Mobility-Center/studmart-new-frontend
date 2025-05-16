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
  email?: string;
  password?: string;
  firstName?: string,
  lastName?: string,
  date?: Date;
  gender?: Option;
  region?: Option;
  city?: Option;
  familyStatus?: Option;
  isWork?: Option
  languageProfiency?: Option[];
  university?: Option;
  profession?: string;
  course?: Option;
}