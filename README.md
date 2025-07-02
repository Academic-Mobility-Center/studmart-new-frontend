This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Руководство по фронтенд-разработке

## Обзор проекта

Это фронтенд-приложение на Next.js с кастомной обработкой API и реализацией аутентификации. Проект следует современным практикам веб-разработки с акцентом на поддерживаемость и масштабируемость.

## Начало работы

### Требования

- Node.js (рекомендуется версия 16 или выше)
- npm (версия 8 или выше)
- Git (для контроля версий)

### Установка

1. Клонируйте репозиторий
2. Перейдите в директорию проекта
3. Установите зависимости:

```bash
npm install
```

### Запуск сервера разработки

```bash
npm run dev
```

Сервер разработки запустится на порту 3000. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
src/
├── app/                    # Основные страницы и маршруты приложения
│   ├── api/                # Прокси-эндпоинты API
│   │   └── [domain]/       # Динамическая маршрутизация API
│   └── (другие маршруты)   # Страницы приложения
├── lib/                    # Вспомогательные функции
│   └── api/                # Обработчики API-запросов
└── (другие директории)     # Дополнительный исходный код
```

## Процесс разработки

### Стратегия ветвления

- Используйте ветку `main` для активной разработки
- Мержьте завершённые функции в ветку `master` после ревью
- Создавайте feature-ветки от `main` для новой разработки

### Интеграция с API

#### Выполнение запросов

Из-за ограничений CORS в Next.js прямые запросы к внешним доменам блокируются. Мы используем прокси-решение:

1. Прокси-эндпоинты находятся в: `src/app/api/[domain]/[resource]/route.ts`
2. Обработчики API-запросов находятся в: `src/lib/api`
3. Пример использования: `api/domain/resource`

#### Пример API-вызова

```javascript
// Пример использования API-прокси
const response = await fetch('/api/example-domain/users');
const data = await response.json();
```

## Система аутентификации

Процесс аутентификации включает:

1. **Логин**: POST-запрос для проверки учётных данных

   - Валидные пользователи получают JWT-токен
   - Неверные учётные данные возвращают ошибку

2. **Верификация**: Эндпоинт проверки токена
   - Сейчас реализован как заглушка
   - В будущем будет реализована настоящая проверка токенов

### Файлы аутентификации

- Логин: `src/app/api/auth/login`
- Верификация: `src/app/api/auth/verify`

Для более продвинутой аутентификации рассмотрите интеграцию [NextAuth.js](https://next-auth.js.org/).

## Лучшие практики

1. **Организация кода**:

   - Храните страницы в директории `app`
   - Следуйте файловой структуре на основе маршрутов
   - Разделяйте UI и логику

2. **Разработка API**:

   - Используйте прокси-паттерн для внешних API-вызовов
   - Чётко разделяйте фронтенд и API-код

3. **Аутентификация**:
   - Всегда проверяйте токены на защищённых маршрутах
   - Реализуйте правильную обработку ошибок аутентификации

## Решение проблем

### Частые проблемы

1. **Ошибки CORS**:

   - Убедитесь, что используете API-прокси для внешних запросов
   - Проверьте, что маршрут прокси совпадает с запрашиваемым доменом/ресурсом

2. **Проблемы аутентификации**:

   - Проверьте генерацию и валидацию токенов
   - Убедитесь, что пользователь существует в базе данных

3. **Сервер разработки**:
   - Если сервер не запускается, проверьте конфликты портов
   - Убедитесь, что все зависимости установлены

## Планы по улучшению

1. Реализовать полную аутентификацию с NextAuth.js
2. Добавить документацию API через Swagger/OpenAPI
3. Улучшить обработку ошибок и обратную связь для пользователей
4. Реализовать систему тестирования

Для дополнительных вопросов обратитесь к документации проекта или свяжитесь с командой разработки.
