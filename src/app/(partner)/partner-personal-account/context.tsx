import { PartnerPersonalAccountFormData } from '@/types/PartnerPesonalAccount';

export const faqCategoryOptionsPartner = [
	{ id: 1, name: 'Изменение данных организации' },
	{ id: 2, name: 'Изменение публичной страницы' },
	{ id: 3, name: 'Проблема со статистикой' },
	{ id: 4, name: 'Запрос документов' },
	{ id: 5, name: 'Другой вопрос' },
];
export const industryOptions = [
	{ id: 1, name: 'ИТ-услуги' },
	{ id: 2, name: 'Финансы' },
];

export const countryOptions = [
	{ id: 1, name: 'Россия' },
	{ id: 2, name: 'США' },
	{ id: 3, name: 'ОАЭ' },
];

export const regionOptions = [
	{ id: 1, name: 'НСК' },
	{ id: 2, name: 'СПБ' },
	{ id: 3, name: 'МСК' },
	{ id: 4, name: 'ЕКБ' },
];

export const validateField = (
	name: string,
	value: string | boolean | string[],
	fullFormData: PartnerPersonalAccountFormData,
): string | string[] | undefined => {
	switch (name) {
		case 'personalEmail':
			return /^\s*[\w\-+_']+(\.[\w\-+_']+)*@[A-Za-z0-9]([\w.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z.]*[A-Za-z]$/.test(
				value as string,
			)
				? undefined
				: 'Некорректный email';

		case 'companyName':
			return /^[a-zA-Zа-яА-Я0-9\s'-]+$/.test(value as string)
				? undefined
				: 'Некорректное название компании';

		case 'site':
			return /^(https?:\/\/)?(www\.)?(([\w-]+\.)+[\w-]+|localhost)(\.\w{2,})?(:[0-9]{1,5})?(\/[^\s<>]*)?(\?[^\s<>]*)?$/.test(
				value as string,
			)
				? undefined
				: 'Некорректный URL';

		case 'phoneNumber':
			return /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value as string)
				? undefined
				: 'Некорректный номер телефона';

		case 'companyEmail':
			return /^\s*[\w\-+_']+(\.[\w\-+_']+)*@[A-Za-z0-9]([\w.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z.]*[A-Za-z]$/.test(
				value as string,
			)
				? undefined
				: 'Некорректный email компании';

		case 'country':
			return value ? undefined : 'Выберите страну';
		// if (!value) return "Выберите страну";
		// return undefined;

		case 'industry':
			if (!value) return ['Выберите отрасль'];
			return undefined;

		case 'inn':
			return /^\d{10}$/.test(value as string) ? undefined : 'Некорректный ИНН';

		case 'currentAccount':
		case 'corAccount':
			return /^\d{20}$/.test(value as string)
				? undefined
				: `Некорректный ${name === 'currentAccount' ? 'расчетный' : 'корреспондентский'} счет`;

		case 'bic':
			return /^\d{9}$/.test(value as string) ? undefined : 'Некорректный БИК';

		case 'regions':
			if (fullFormData.specificRegions && (!Array.isArray(value) || value?.length < 1)) {
				return ['Выберите хотя бы один регион'];
			}
			return undefined;

		default:
			return undefined;
	}
};

export const testData = {
	id: 'e3af4b6c-0b8a-4c15-8ea8-61ead3a11825',
	name: 'ИП Голенищев Олег Константинович',
	subtitle: 'Доставка',
	description:
		"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
	priority: 100,
	email: 'oleggoleni@gmail.com',
	site: 'http://ipgolenischev.ru',
	inn: 5037011336,
	phone: '+79833129179',
	category: {
		id: 1,
		name: 'Рестораны и доставка',
	},
	country: {
		id: 1,
		name: 'Россия',
	},
	paymentInformation: {
		bik: '123456789',
		accountNumber: '40702810500000000001',
		correspondentAccountNumber: '30101810400000000225',
	},
	hasAllRegions: false,
	regions: [
		{
			id: 1,
			name: 'Новосибирская область',
		},
		{
			id: 2,
			name: 'Иркутская область',
		},
	],
};

export const defaultUser = {
	id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
	firstName: 'Vlad',
	lastName: 'Pivnenko',
	email: 'test@example.com',
	partner: {
		id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		name: 'OOOO',
		subtitle: 'string',
		description: 'string',
		priority: 0,
		email: 'string',
		site: 'string',
		inn: 0,
		phone: 'string',
		category: {
			id: 0,
			name: 'string',
		},
		country: {
			id: 0,
			name: 'string',
		},
		paymentInformation: {
			bik: 'string',
			accountNumber: 'string',
			correspondentAccountNumber: 'string',
		},
		hasAllRegions: true,
		regions: [
			{
				id: 0,
				name: 'string',
			},
		],
	},
};

export const profileCardClasses =
	'border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]';
export const profileTitleClasses =
	"font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
export const saveButtonClasses =
	'bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]';

export const faqCategoryOptions = [
	{ id: 1, name: 'Первая категория' },
	{ id: 2, name: 'Вторая категория' },
	{ id: 3, name: 'Третья категория' },
	{ id: 4, name: 'Четвертая категория' },
	{ id: 5, name: 'Пятая категория' },
];

export const FaqQuestions = [
	{
		title: 'Как я могу изменить данные организации?',
		text: 'Для изменения данных организации, необходимо обратиться к вашему персональному менеджеру или на support@studmart.ru',
	},
	{
		title: 'Как я могу внести изменения на персональную страницу?',
		text: 'Вы можете направить новый логотип и описание через ваш личный кабинет. Если вам необходимо полностью изменить описание, пожалуйста, обратитесь на support@studmart.ru',
	},
	{
		title: 'Как можно получить закрывающие документы?',
		text: 'Если обмен документами производился через ЭДО, все закрывающие документы будут направлены в ЭДО. Если они не пришли, пожалуйста, обратитесь на support@studmart.ru \n\n Если обмен документами производился на бумаге, пожалуйста, отправьте запрос на недостающие документы на head@studmart.ru',
	},
];

export const defaultPartner = {
	id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
	name: 'string',
	subtitle: 'string',
	description: 'string',
	priority: 0,
	email: 'string',
	site: 'string',
	inn: 0,
	phone: 'string',
	country: {
		id: 0,
		name: 'string',
	},
	category: {
		id: 0,
		name: 'string',
	},
	paymentInformation: {
		bik: 'string',
		accountNumber: 'string',
		correspondentAccountNumber: 'string',
	},
	employees: [
		{
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			firstName: 'string',
			lastName: 'string',
			email: 'string',
		},
	],
	hasAllRegions: true,
	regions: [
		{
			id: 0,
			name: 'string',
			country: {
				id: 0,
				name: 'string',
			},
		},
	],
};
export type PartnerWithIdType = {
	id: string;
	companyName: string;
	subtitle: string;
	description: string;
	site: string;
	category: {
		id: number;
		name: string;
	};
	hasAllRegions: boolean;
	discounts: {
		id: string;
		name: string;
		description: string;
		size: number;
		promocodeValue: string;
		partner: {
			id: string;
			companyName: string;
			subtitle: string;
			maxDiscount: number;
			isFixed: boolean;
		};
		hasAllRegions: boolean;
		regions: [];
	}[];
	regions: [];
};
export const defaultPartnerWithId = {
	id: '1a9b52cc-719c-4e46-b6a5-ba0918c0e1a2',
	companyName: 'Яндекс',
	subtitle: 'ИТ компания',
	description:
		'\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dui leo, tincidunt in cursus nec, luctus eu arcu. Suspendisse placerat vehicula lectus ac faucibus. Etiam vulputate ligula vel elit sollicitudin, dapibus ornare lacus ullamcorper. Vestibulum libero magna, cursus vitae placerat vel, facilisis sed nulla. Duis aliquet lorem ligula. Phasellus vitae luctus ex. Sed ex est, lobortis vel varius ut, dignissim et enim.\n\nNunc condimentum urna sapien, id ultricies dui dapibus ac. Fusce facilisis dictum quam, eget commodo ex faucibus quis. Sed varius ligula auctor massa ultricies, eu dapibus nam. ',
	site: 'https://yandex.ru',
	category: {
		id: 9,
		name: 'Рестораны и доставка',
	},
	hasAllRegions: true,
	discounts: [
		{
			id: '991fb1e2-d33b-4262-ac4d-037218f4d189',
			name: 'Скидка на доставку еды по городу 10%',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis varius libero sed. ',
			size: 10,
			promocodeValue: 'SPRING2025',
			partner: {
				id: '1a9b52cc-719c-4e46-b6a5-ba0918c0e1a2',
				companyName: 'Яндекс',
				subtitle: 'ИТ компания',
				maxDiscount: 10,
				isFixed: true,
			},
			hasAllRegions: true,
			regions: [],
		},
	],
	regions: [],
};
export interface PartnerType {
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
}

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

export type PartnerProfileData = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	partner: {
		category: { id: number; name: string };
		country: { id: number; name: string };
		description: string;
		email: string;
		hasAllRegions: boolean;
		id: string;
		inn: number;
		name: string;
		paymentInformation: {
			bik: string;
			accountNumber: string;
			correspondentAccountNumber: string;
		};
		phone: string;
		priority: number;
		regions: { id: number; name: string }[];
		site: string;
		subtitle: string;
	};
};
