const mongoose = require("mongoose")

// соединение с БД
mongoose.connect("mongodb://localhost:27017/learnAuth", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// экспортируем 
module.exports = mongoose.connection