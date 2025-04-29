import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount";

export const industryOptions = [
    { id: 1, name: "ИТ-услуги" },
    { id: 2, name: "Финансы" },
];

export const countryOptions = [
    { id: 1, name: "Россия" },
    { id: 2, name: "США" },
    { id: 3, name: "ОАЭ" },
];

export const regionOptions = [
    { id: 1, name: "НСК" },
    { id: 2, name: "СПБ" },
    { id: 3, name: "МСК" },
    { id: 4, name: "ЕКБ" },
];

export const validateField = (
    name: string,
    value: string | boolean | string[],
    fullFormData: PartnerPersonalAccountFormData
): string | string[] | undefined => {
    switch (name) {
        case "personalEmail":
            return /^\s*[\w\-+_']+(\.[\w\-+_']+)*@[A-Za-z0-9]([\w.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z.]*[A-Za-z]$/.test(value as string)
                ? undefined : "Некорректный email";

        case "password":
            return (value as string).length >= 6 ? undefined : "Пароль должен содержать минимум 6 символов";

        case "companyName":
            return /^[a-zA-Zа-яА-Я0-9\s'-]+$/.test(value as string) ? undefined : "Некорректное название компании";

        case "site":
            return /^(https?:\/\/)?(www\.)?(([\w-]+\.)+[\w-]+|localhost)(\.\w{2,})?(:[0-9]{1,5})?(\/[^\s<>]*)?(\?[^\s<>]*)?$/.test(value as string)
                ? undefined : "Некорректный URL";

        case "phoneNumber":
            return /^(\+7|8)?[\s-]?\(?9\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value as string)
                ? undefined : "Некорректный номер телефона";

        case "companyEmail":
            return /^\s*[\w\-+_']+(\.[\w\-+_']+)*@[A-Za-z0-9]([\w.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z.]*[A-Za-z]$/.test(value as string)
                ? undefined : "Некорректный email компании";

        case "country":
            if (!value) return "Выберите страну";
            return undefined;

        case "industry":
            if (!value) return ["Выберите отрасль"];
            return undefined;

        case "inn":
            return /^\d{10}$/.test(value as string) ? undefined : "Некорректный ИНН";

        case "currentAccount":
        case "corAccount":
            return /^\d{20}$/.test(value as string) ? undefined : `Некорректный ${name === "currentAccount" ? "расчетный" : "корреспондентский"} счет`;

        case "bic":
            return /^\d{9}$/.test(value as string) ? undefined : "Некорректный БИК";

        case "regions":
            if (fullFormData.specificRegions && (!Array.isArray(value) || value?.length < 1))
                {
                return ["Выберите хотя бы один регион"];
            }
            return undefined;             

        default:
            return undefined;
    }
};

export const testData = {
    "id": "e3af4b6c-0b8a-4c15-8ea8-61ead3a11825",
    "name": "ИП Голенищев Олег Константинович",
    "subtitle": "Доставка",
    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    "priority": 100,
    "email": "oleggoleni@gmail.com",
    "site": "http://ipgolenischev.ru",
    "inn": 5037011336,
    "phone": "+79833129179",
    "category": {
      "id": 1,
      "name": "Рестораны и доставка"
    },
    "country": {
      "id": 1,
      "name": "Россия"
    },
    "paymentInformation": {
      "bik": "123456789",
      "accountNumber": "40702810500000000001",
      "correspondentAccountNumber": "30101810400000000225"
    },
    "hasAllRegions": false,
    "regions": [
      {
        "id": 1,
        "name": "Новосибирская область"
      },
      {
        "id": 2,
        "name": "Иркутская область"
      }
    ]
}

export const defaultUser = {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "firstName": "Vlad",
    "lastName": "Pivnenko",
    "email": "test@example.com",
    "partner": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "OOOO",
      "subtitle": "string",
      "description": "string",
      "priority": 0,
      "email": "string",
      "site": "string",
      "inn": 0,
      "phone": "string",
      "category": {
        "id": 0,
        "name": "string"
      },
      "country": {
        "id": 0,
        "name": "string"
      },
      "paymentInformation": {
        "bik": "string",
        "accountNumber": "string",
        "correspondentAccountNumber": "string"
      },
      "hasAllRegions": true,
      "regions": [
        {
          "id": 0,
          "name": "string"
        }
      ]
    }
}

export const profileCardClasses = "border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]";
export const profileTitleClasses = "font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
export const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]";

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

export const defaultPartner = {
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "subtitle": "string",
  "description": "string",
  "priority": 0,
  "email": "string",
  "site": "string",
  "inn": 0,
  "phone": "string",
  "country": {
    "id": 0,
    "name": "string"
  },
  "category": {
    "id": 0,
    "name": "string"
  },
  "paymentInformation": {
    "bik": "string",
    "accountNumber": "string",
    "correspondentAccountNumber": "string"
  },
  "employees": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    }
  ],
  "hasAllRegions": true,
  "regions": [
    {
      "id": 0,
      "name": "string",
      "country": {
        "id": 0,
        "name": "string"
      }
    }
  ]
}

export const defaultPartnerWithId = {
  "id": "1a9b52cc-719c-4e46-b6a5-ba0918c0e1a2",
  "companyName": "Яндекс",
  "subtitle": "ИТ компания",
  "description": "\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dui leo, tincidunt in cursus nec, luctus eu arcu. Suspendisse placerat vehicula lectus ac faucibus. Etiam vulputate ligula vel elit sollicitudin, dapibus ornare lacus ullamcorper. Vestibulum libero magna, cursus vitae placerat vel, facilisis sed nulla. Duis aliquet lorem ligula. Phasellus vitae luctus ex. Sed ex est, lobortis vel varius ut, dignissim et enim.\n\nNunc condimentum urna sapien, id ultricies dui dapibus ac. Fusce facilisis dictum quam, eget commodo ex faucibus quis. Sed varius ligula auctor massa ultricies, eu dapibus nam. ",
  "site": "https://yandex.ru",
  "category": {
    "id": 9,
    "name": "Рестораны и доставка"
  },
  "hasAllRegions": true,
  "discounts": [
    {
      "id": "991fb1e2-d33b-4262-ac4d-037218f4d189",
      "name": "Скидка на доставку еды по городу 10%",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis varius libero sed. ",
      "size": 10,
      "promocodeValue": "SPRING2025",
      "partner": {
        "id": "1a9b52cc-719c-4e46-b6a5-ba0918c0e1a2",
        "companyName": "Яндекс",
        "subtitle": "ИТ компания",
        "maxDiscount": 10,
        "isFixed": true
      },
      "hasAllRegions": true,
      "regions": []
    }
  ],
  "regions": []
}
export interface PartnerType  {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  priority: number;
  email: string;
  site: string;
  inn: number;
  phone: string;
  category: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
  paymentInformation: {
    bik: string;
    accountNumber: string;
    correspondentAccountNumber: string;
  };
  hasAllRegions: boolean;
  regions: {
    id: number;
    name: string;
  }[]; 
};

type Partner = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  priority: number;
  email: string;
  site: string;
  inn: number;
  phone: string;
  category: {
    id: number;
    name: string;
  } | null;
  country: {
    id: number;
    name: string;
  } | null;
  paymentInformation: {
    bik: string;
    accountNumber: string;
    correspondentAccountNumber: string;
  };
  hasAllRegions: boolean;
  regions: {
    id: number;
    name: string;
  }[]; 
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  partner: Partner; 
};