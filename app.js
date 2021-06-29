const express = require("express")

// подключение отдельного middleware из папки
const useMiddleware = require("./middleware")

// подключение обработчика ошибок
const useErrorHandlers = require("./middleware/error-handlers")

// подключение роутов
const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const item =require ("./routes/food")

const app = express()

// использование middleware (основная конфигурция)
useMiddleware(app)

// подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/food", item)
// использование middleware (обработчик ошибок)
useErrorHandlers(app)

// экспортируем 
module.exports = app
