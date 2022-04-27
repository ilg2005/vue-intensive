export default function dateFilter(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(new Date(date));
}
