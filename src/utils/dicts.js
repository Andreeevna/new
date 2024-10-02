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
		headerName: `Имя пользователя`,
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
	{ field: `name`, headerName: `Имя клиента` },
	{ field: `max_accounts`, headerName: `Максимальное количество аккаунтов` },
	{ field: `creation_date`, headerName: `Дата создания` },
	{
		field: 'action',
		headerName: 'Действия',
	},
]

export const smsLoginsDict = [
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
