
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
): string | string[] | undefined => {
    switch (name) {
        case "email":
            return /^\s*[\w\-+_']+(\.[\w\-+_']+)*@[A-Za-z0-9]([\w.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z.]*[A-Za-z]$/.test(value as string)
                ? undefined : "Некорректный email";

        case "password":
            return (value as string).length >= 6 ? undefined : "Пароль должен содержать минимум 6 символов";

        case "firstName":
        case "lastName":
            return /^[a-zA-Zа-яА-ЯёЁ\s-']+$/.test(value as string)
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
export const personalDataItems = [
    "Университет",
    "Специальность",
    "Курс",
    "Наличие места работы",
    "Регион проживания",
    "Город проживания",
    "Дата рождения",
    "Пол",
    "Семейное положение",
    "Владение иностранными языками"
];

export const notificationsItems = [
    "Обучение",
    "Онлайн сервисы",
    "Здоровье и спорт",
    "Развлечения",
    "Одежда и аксессуары",
    "Красота и уход",
    "Мобильная связь и интернет",
    "Электроника и технологии"
]

export const categoriesAndServices = [
    {
        heading: "Основные файлы cookies",
        p: "Эти файлы необходимы для обеспечения работы платформы Студмарт и не могут быть отключены нашими системами. Они срабатывают, когда вы предпринимаете определенные действия, которые являются запросами, относящимися к сервисам платформы, — например, меняете параметры конфиденциальности, входите в систему или заполняете формы. Вы можете настроить ваш браузер так, чтобы он блокировал или предупреждал вас об этих необходимых файлах cookie, но это может привести к тому, что некоторые функции платформы Студмарт перестанут работать. Обязательные файлы cookie не хранят никакой идентифицирующей вас информации.",
        p_array: {
            p1: "Usercentrics Consent",
            p2: "cloudfront.com",
            p3: "gstatic.com"
        }
    },
    {
        heading: "Функциональные данные",
        p: "Эти файлы позволяют платформе Студмарт предоставлять расширенные функциональные возможности для сбора статистики и конверсии. Счетчики сбора таких файлов могут быть разработаны нами или сторонними партнерами. Если вы не разрешите использование этих данных, некоторые сервисы платформы Студмарт могут работать некорректно.",
        p_array: {
            p1: "Usercentrics Consent",
            p2: "cloudfront.com",
        }
    },
    {
        heading: "Эксплуатационные данные",
        p: "Эти файлы позволяют нам подсчитывать, сколько участников посещают платформу Студмарт, что позволяет нам собирать статистику и совершенствовать платформу и качество услуг. Данные позволяют нам определить как Вы используете платформу, какие страницы посещаете. Если вы не разрешите использование этих данных, мы не сможем отслеживать ваши посещения на нашей платформе.",
        p_array: {
            p1: "Usercentrics Consent",
            p2: "cloudfront.com",
            p3: "gstatic.com"
        }
    },
    {
        heading: "Целевые данные",
        p: "Эти данные собираются нами и нашими партнерами для того, чтобы понять ваши интересы и показывать вам релевантную рекламу на сторонних интернет-ресурсах, которые вы посещаете. Если вы решите не разрешать использование этих данных, вы все равно будете видеть рекламу на сторонних сайтах, но, возможно, она будет нерелевантной",
        p_array: {
            p1: "cloudfront.com",
        }
    }
];

export const faqCategoryOptions = [
    {id: 1, name: "Первая категория"},
    {id: 2, name: "Вторая категория"},
    {id: 3, name: "Третья категория"},
    {id: 4, name: "Четвертая категория"},
    {id: 5, name: "Пятая категория"}
]

export const FaqQuestions = [
    {
        title: "Вопрос 1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus, dui a ultricies commodo, erat ligula placerat lorem, at dictum purus sapien vel risus. Fusce faucibus, arcu id lacinia finibus, tortor risus facilisis eros, a viverra sapien tortor vitae justo. Duis rhoncus enim vel sapien viverra luctus. Donec vel rutrum turpis. Praesent ac risus enim. Nam vestibulum tempus finibus. Phasellus augue nulla, vulputate sit amet malesuada a, fringilla eu felis. Phasellus ullamcorper quam sit amet eros tristique tempor. Pellentesque nulla risus, pulvinar nec elit a, varius bibendum massa. Vivamus eu enim eu turpis euismod efficitur vel eu neque. Duis eget efficitur eros. Donec nec magna massa. Donec a vulputate augue, ac egestas nisi. Nulla mattis egestas turpis id condimentum."       
    },
    {
        title: "Вопрос 2",
        text: "Phasellus nibh nibh, mattis sed convallis eget, lacinia porta mauris. Proin congue sed nisi sit amet finibus. Vivamus cursus dapibus rutrum. Nulla justo ligula, rutrum vel lacus non, semper condimentum enim. Nunc nec finibus arcu. Mauris quis imperdiet leo, a posuere elit. Pellentesque nec maximus elit, ut eleifend est. Nullam tincidunt augue eget nunc accumsan, sit amet volutpat ex fringilla. Fusce et mi sit amet sapien porta euismod. Curabitur diam mi, tempus et eleifend id, ullamcorper ut nunc. Nulla eu lectus ut augue consequat ultricies. Nullam eget sodales nulla."       
    },
    {
        title: "Вопрос 3",
        text: "Proin pretium massa vel sapien scelerisque consequat. Proin iaculis egestas erat, non condimentum ex sagittis et. Duis posuere vitae nisi sit amet tristique. Suspendisse ut vehicula diam, at convallis turpis. Phasellus massa diam, pharetra feugiat risus non, ultricies blandit nunc. Suspendisse potenti. Donec maximus erat ex, nec ultricies nisl lobortis vitae."       
    },
    {
        title: "Вопрос 4",
        text: "Etiam porta dolor mauris, sit amet finibus dui varius sit amet. Nunc vel dapibus dui, ultrices condimentum libero. Suspendisse potenti. Donec felis diam, accumsan nec feugiat quis, cursus non metus. Aliquam nec ex pharetra, pellentesque felis sit amet, interdum massa. Vivamus fringilla, diam vel interdum efficitur, dolor ipsum molestie ex, vitae auctor sem nunc a velit. Proin lacinia nibh vel purus mattis, dictum maximus nisi scelerisque."       
    },
    {
        title: "Вопрос 5",
        text: "Ut nec urna quis lacus convallis porttitor quis quis dui. Donec aliquet, neque vel venenatis consequat, massa arcu bibendum magna, et hendrerit enim velit sit amet nibh. Cras ut lorem enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum, tellus pretium imperdiet pharetra, ipsum dolor rutrum risus, sit amet ullamcorper ligula nulla ut enim. Maecenas luctus orci a venenatis condimentum. Nulla accumsan nec lacus vel placerat. Sed finibus porttitor diam at fringilla. Praesent eget risus dolor. Suspendisse malesuada commodo diam ut eleifend. Vivamus at egestas justo, ac sollicitudin justo. Vivamus eu nisi diam. Integer vel ligula at leo convallis condimentum."       
    },

]
