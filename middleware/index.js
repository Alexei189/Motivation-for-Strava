module.exports = function (app) {
  const express = require("express");
  const morgan = require("morgan");
  const hbs = require("hbs");

  // модуль для работы с куками (удаление, установка и чтение кук)
  const cookieParser = require("cookie-parser");

  // модуль для работы с сессиями
  const session = require("express-session");
  const path = require("path");

  // модуль для хранения сессий в виде файлов на сервере (см. папку sessions)
  const FileStore = require("session-file-store")(session);

  // самописная функция очистки кук
  const { cookiesCleaner } = require("./auth");
  const dbConnection = require("./db-connect");

  // запуск логирования в терминале
  app.use(morgan("dev"));

  // body POST парсер
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // использование cookieParser (доступ к кукам которые хранятся в браузере)
  app.use(cookieParser());

  // через middleware (app.use), используем функцию session с нужными нам настройками
  app.use(
    session({
      store: new FileStore(), // тип хранилища - FileStore, который создаёт нам папку с файлами
      key: "user_sid", // ключ - название куки
      secret: "anything here", // слово используемое для шифрования, может быть любым
      resave: false, // настройка пересохранения куки, при каждом запросе
      saveUninitialized: false, // настройка создания сессии, даже без авторизации
      cookie: {
        expires: 600000, // время "протухания" куки
        httpOnly: false, // по умолчанию true
      },
    })
  );

  // Возможность очищать куки
  app.use(cookiesCleaner);

  // Подключаем статику
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Подключаем views(hbs)
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  hbs.registerPartials(path.join(__dirname, "..", "views", "partials"));
};
