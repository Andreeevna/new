export const usersDict = [
	{
		field: `id`,
		headerName: `ID`,
	},
	{
		field: `bitrix_id`,
		headerName: `bitrix_ID`,
	},
	{
		field: `username`,
		headerName: `Пользователь`,
	},
	{
		field: `creation_date`,
		headerName: `Дата создания`,
	},
	{
		field: 'action',
		headerName: 'Действия',
	},
]

export const clientsDict = [
	{ field: `id`, headerName: `ID` },
	{ field: `name`, headerName: `Клиент` },
	{ field: `max_accounts`, headerName: `Максимальное кол-во аккаунтов` },
	{ field: `creation_date`, headerName: `Дата создания` },
	{
		field: `instruction`,
		headerName: `Инструкция`,
	},
	{
		field: `login_type_id`,
		headerName: `Тип логина`,
	},
	{
		field: 'action',
		headerName: 'Действия',
	},
]

export const LoginDict = [
	{ field: `id`, headerName: `ID` },
	{ field: `client`, headerName: `ID Клиента` },
	{ field: `user`, headerName: `ID  Пользователя` },
	{
		field: `login_type_id`,
		headerName: `Тип логина`,
	},
	{
		field: `secret`,
		headerName: `Секретный ключ`,
	},
	{ field: `login`, headerName: `Логин` },
	{ field: `password`, headerName: `Пароль` },
	{
		field: `login_two_fa`,
		headerName: `Логин на PUSH сервере`,
	},
	{
		field: `password_two_fa`,
		headerName: `Пароль на PUSH сервере`,
	},
	{ field: `creation_date`, headerName: `Дата создания` },
	{ field: `last_used`, headerName: `Дата последнего использования` },
	{ field: 'action', headerName: 'Действия' },
]

export const codeLoginsDict = [
	{ field: `id`, headerName: `ID` },
	{ field: `user_id`, headerName: `ID пользователя` },
	{ field: `client_id`, headerName: `ID клиента` },
	{ field: `secret`, headerName: `Внутренний ключ` },
	{ field: `login`, headerName: `Логин` },
	{ field: `password`, headerName: `Пароль` },
	{ field: `instruction`, headerName: `Инструкция` },
	{ field: `creation_date`, headerName: `Дата создания` },
	{ field: `last_used`, headerName: `Дата последнего использования` },
	{ field: `FOREIGN_KEY_user_id`, headerName: `Внешний ключ ID пользователя` },
	{ field: `FOREIGN_KEY_client_id`, headerName: `Внешний ключ ID клиента` },
]

export const callLoginsDict = [
	{ field: `id`, headerName: `ID` },
	{ field: `user_id`, headerName: `ID пользователя` },
	{ field: `client_id`, headerName: `ID клиента` },
	{ field: `login`, headerName: `Логин` },
	{ field: `password`, headerName: `Пароль` },
	{ field: `instruction`, headerName: `Инструкция` },
	{ field: `creation_date`, headerName: `Дата создания` },
	{ field: `last_used`, headerName: `Дата последнего использования` },
	{ field: `FOREIGN_KEY_user_id`, headerName: `Внешний ключ ID пользователя` },
	{ field: `FOREIGN_KEY_client_id`, headerName: `Внешний ключ ID клиента` },
]

export const pushLoginsDict = [
	{ field: `id`, headerName: `ID` },
	{ field: `user_id`, headerName: `ID пользователя` },
	{ field: `client_id`, headerName: `ID клиента` },
	{ field: `login`, headerName: `Логин` },
	{ field: `password`, headerName: `Пароль` },
	{ field: `login_two_fa`, headerName: `Клиентский логин` },
	{ field: `password_two_fa`, headerName: `Клиентский пароль` },
	{ field: `instruction`, headerName: `Инструкция` },
	{ field: `creation_date`, headerName: `Дата создания` },
	{ field: `last_used`, headerName: `Дата последнего использования` },
	{ field: `FOREIGN_KEY_user_id`, headerName: `Внешний ключ ID пользователя` },
	{ field: `FOREIGN_KEY_client_id`, headerName: `Внешний ключ ID клиента` },
]

const loginRow = [
	{
		login: {
			id: 17,
			login_type_id: 1,
			secret: null,
			login: 'string',
			password: 'string1',
			login_two_fa: null,
			password_two_fa: null,
			creation_date: '30-10-2024 17:56:41',
			last_used: '30-10-2024 17:56:41',
		},
		client: {
			id: 1,
			name: 'NinaNinaNinaNinaNinaNina',
			max_accounts: 5,
			creation_date: '01.10.2021 11:33',
		},
		user: {
			id: 1222,
			bitrix_id: '24',
			username: 'lana',
			creation_date: '24.10.2024 10:53',
		},
	},
	{
		login: {
			id: 35,
			login_type_id: 1,
			secret: null,
			login: 'string',
			password: 'string1',
			login_two_fa: null,
			password_two_fa: null,
			creation_date: '30-10-2024 17:56:41',
			last_used: '30-10-2024 17:56:41',
		},
		client: {
			id: 1,
			name: 'NinaNinaNinaNinaNinaNina',
			max_accounts: 5,
			creation_date: '01.10.2021 11:33',
		},
		user: {
			id: 1222,
			bitrix_id: '24',
			username: 'lana',
			creation_date: '24.10.2024 10:53',
		},
	},
	{
		login: {
			id: 0,
			login_type_id: 1,
			secret: null,
			login: 'string',
			password: 'string1',
			login_two_fa: null,
			password_two_fa: null,
			creation_date: '30-10-2024 17:56:41',
			last_used: '30-10-2024 17:56:41',
		},
		client: {
			id: 1,
			name: 'NinaNinaNinaNinaNinaNina',
			max_accounts: 5,
			creation_date: '01.10.2021 11:33',
		},
		user: {
			id: 1222,
			bitrix_id: '24',
			username: 'lana',
			creation_date: '24.10.2024 10:53',
		},
	},
]
