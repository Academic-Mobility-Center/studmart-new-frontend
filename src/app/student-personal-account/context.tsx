import { StudentFormData } from "@/types/StudentProfileData"

export const genderOptions= [
    {id: 1, name: "Мужской"},
    {id: 2, name: "Женский"}
]

export const familyStatusOptions = [
    {id: 1, name: "Состоит в браке"},
    {id: 2, name: "Не состоит в браке" }
]

export const isWorkOptions = [
    {id: 1, name: "Не работает"},
    {id: 2, name: "Работает"}
]

export const languageProfiencyOptions = [
    {id: 1, name: "A уровень"},
    {id: 2, name: "B уровень"}
]

export const courseOptions = [
    {id: 1, name: "1 курс"},
    {id: 2, name: "2 курс"},
    {id: 3, name: "3 курс"}
]

export const validateField = (
    name: string,
    value: string | boolean | string[],
    fullFormData: StudentFormData
): string | string[] | undefined => {
    switch (name) {
        case "email":
            return /^\s*[\w\-\+_']+(\.[\w\-\+_']+)*\@[A-Za-z0-9]([\w\.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z\.]*[A-Za-z]$/.test(value as string)
                ? undefined : "Некорректный email";

        case "password":
            return (value as string).length >= 6 ? undefined : "Пароль должен содержать минимум 6 символов";

        case "firstName":
        case "lastName":
            return /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/.test(value as string)
                ? undefined : "Некорректное имя или фамилия";

        case "date":
            return value ? undefined : "Укажите дату рождения";

        case "gender":
            return value ? undefined : ["Выберите пол"];

        case "region":
            return value ? undefined : ["Выберите регион"];

        case "city":
            return value ? undefined : ["Выберите город"];

        case "familyStatus":
            return value ? undefined : ["Выберите семейное положение"];

        case "isWork":
            return value ? undefined : ["Выберите статус занятости"];

        case "languageProfiency":
            return value ? undefined : ["Выберите уровень владения языком"];

        case "university":
            return value ? undefined : ["Выберите университет"];

        case "profession":
            return (value as string).length >= 2 ? undefined : "Укажите профессию";

        case "course":
            return value ? undefined : ["Выберите курс"];

        default:
            return undefined;
    }
};

