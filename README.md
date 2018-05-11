#Messenger.JuniorLab

1/ Установка:
- run 'npm install' in folder 'frontend'
- run 'npm install' in folder 'server-ext'
- run 'npm install' in folder 'server-in'
- run 'composer update' in folder 'symfony'

2/ Запуск:
- run 'npm start' in folder 'frontend'
- run 'npm start' in folder 'server-ext'
- run 'npm start' in folder 'server-in'
- run 'php bin/console messenger:server' in an one console
- run 'php bin/console server:run' in an another console

* Для запуска скриптов миграции БД:
-   run 'node server-ext/symfony-api/routes usersfmtp.js' (from MongoDB to PostgreSQL)
-   run 'node server-ext/symfony-api/routes usersfptm.js' (from PosthreSQL to MongoDB)
