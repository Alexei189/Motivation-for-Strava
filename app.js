const express = require("express")


const useMiddleware = require("./middleware")


const useErrorHandlers = require("./middleware/error-handlers")


const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const item =require ("./routes/food")

const app = express()


useMiddleware(app)


app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/food", item)

useErrorHandlers(app)


module.exports = app
