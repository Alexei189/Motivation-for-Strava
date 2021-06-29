const express = require("express")
const bcrypt = require("bcrypt")
const { sessionChecker } = require("../middleware/auth")
const User = require("../models/users")

const saltRounds = 10 // количество "путающих" символов (соль)
const router = express.Router()

// при переходе на "корень", запускается функция sessionChecker
// router.get("/", sessionChecker, (req, res) => {
//   res.redirect("/login")
// })

router.get("/", sessionChecker, (req, res) => {
  res.render("home")
})
// оптимизированный вид написания маршрутизации
router.route("/signup")

  // GET запрос с промежуточной функцией sessionChecker, вариант 1
  // .get(sessionChecker, (req, res) => {
  //   res.render("signup")
  // })

  
  // варинат 2 (без промежуточной функции)
  .get((req, res) => {
    if (req.session.user) {
      res.redirect("/dashboard")
    } else {
      res.render("signup")
    }
  })

  // POST запрос с функцией next, для передачи ошибки
  .post(async (req, res, next) => {
    try {
      const { username, email, password } = req.body
      const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, saltRounds)
      })
      await user.save()

      req.session.user = user // формирование сессии, user добавляется в неё как объект
      // console.log(req.session);
      // console.log(req.session.user);
      res.redirect("/dashboard")
    } catch (error) {
      next(error)
    }
  })

router.route("/login")

  .get(sessionChecker, (req, res) => {
    res.render("login")
  })

  .post(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    // bcrypt - шифровальщик паролей, сравнивает пароль из POST запроса и пароль из БД
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user // формирование сессии, user добавляется в неё как объект
      res.redirect("/dashboard")
    } else {
      res.redirect("/login")
    }
  })

router.get("/dashboard", (req, res) => {
  // если сессия есть вытаскиваем user, чтобы его рендерить на странице
  if (req.session.user) {
    const { user } = req.session
    res.render("dashboard", { name: user.username })
  } else {
    res.redirect("/login")
  }
})

router.get("/logout", async (req, res, next) => {
  // если сессия существует, то выполняем код через try catch
  if (req.session.user) {
    try {
      // уничтожает сессию (удаление файла)
      await req.session.destroy()
      // чистит куку (удаление в браузере)
      res.clearCookie("user_sid")
      // редиректит на корень
      res.redirect("/")
    } catch (error) {
      // "улетаем" в обработчик ошибок (см. /middleware/error-handlers)
      next(error)
    }
  } else {
    res.redirect("/login")
  }
})

module.exports = router
