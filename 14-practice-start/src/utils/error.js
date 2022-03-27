const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
    INVALID_PASSWORD: 'Неправильный пароль',
    'API key not valid. Please pass a valid API key.': 'Неверный API_KEY',
}

export function error(code) {
    return ERROR_CODES[code] ?? 'Неизвестная ошибка';
}
