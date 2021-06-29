const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("food");
});

router.post("/foodmarket", (req, res) => {
  const count = req.body;
  console.log(count.kkal);
  if (count.kkal < 100){res.render('partials/fooditem1', {layout:false})}
    else if (count.kkal > 100 && count.kkal < 300) {res.render('partials/fooditem2', {layout:false})}
      else if (count.kkal > 300 ) {res.render('partials/fooditem3', {layout:false})}
  //res.render('partials/fooditem2', {layout:false});
 
});

// router.get("/gal", (req, res) => {
//   res.render("gal");
// });
module.exports = router;
