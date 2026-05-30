# Calls Table

Страница списка звонков по тестовому заданию Skilla.

## Стек

- React
- TypeScript
- SCSS Modules
- Redux Toolkit
- RTK Query
- Vite
- Vitest

## Возможности

- Загрузка списка звонков из `https://api.skilla.ru/mango/getList` (POST, см. [документацию](https://api.skilla.ru/testapi))
- Фильтр по типу звонка: все, входящие, исходящие
- Сортировка по клику на заголовки «Время» и «Длительность» (`sort_by`: `date` | `duration`, `order`: `ASC` | `DESC`, оба необязательные)
- Переключение периода: 3 дня, неделя, месяц, год
- Таблица звонков по структуре Figma
- Hover-плеер записи звонка
- Получение аудиозаписи через API
- Скачивание записи
- Ограничение воспроизведения одной записью
- Loading, error и empty states

## Переменные окружения

Скопируйте пример и при необходимости измените значения:

```bash
cp .env.example .env
```

| Переменная | Описание |
|------------|----------|
| `VITE_API_BASE_URL` | Базовый URL API (`https://api.skilla.ru`) |
| `VITE_API_TOKEN` | Токен для заголовка `Authorization: Bearer …` |
| `VITE_API_CALLS_LIMIT` | Лимит записей в запросе списка (по умолчанию `50`) |

## Запуск

```bash
npm install
cp .env.example .env
npm run dev
```

## Проверки

```bash
npm test
npm run build
```

## Деплой

Проект готов для деплоя на Vercel, Netlify или аналогичный сервис. После публикации добавьте ссылку на деплой в этот раздел.
